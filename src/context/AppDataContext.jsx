import { createContext, useContext, useEffect, useRef, useState } from "react";

const AppDataContext = createContext(null);
const STORAGE_KEY = "salmanesia-data-v1";
const EVENT_TEXT_FIELDS = [
	"title",
	"category",
	"description",
	"location",
	"city",
	"date",
	"startTime",
];

function validateCapacity(capacity) {
	if (!Number.isSafeInteger(capacity) || capacity <= 0) {
		throw new Error("Kapasitas harus berupa bilangan bulat positif.");
	}
}

function prepareEvent(eventData) {
	validateCapacity(eventData.capacity);
	const event = {};
	for (const field of EVENT_TEXT_FIELDS) {
		if (typeof eventData[field] !== "string" || !eventData[field].trim()) {
			throw new Error(`Field ${field} wajib diisi.`);
		}
		event[field] = eventData[field].trim();
	}
	if (
		!/^\d{4}-\d{2}-\d{2}$/.test(event.date) ||
		!Number.isFinite(Date.parse(event.date)) ||
		new Date(event.date).toISOString().slice(0, 10) !== event.date
	) {
		throw new Error("Tanggal event harus valid dengan format YYYY-MM-DD.");
	}
	if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(event.startTime)) {
		throw new Error("Waktu mulai harus menggunakan format HH:mm.");
	}
	if (eventData.image != null && typeof eventData.image !== "string") {
		throw new Error("Gambar event harus berupa string URL.");
	}
	return {
		...event,
		image: eventData.image ?? "",
		capacity: eventData.capacity,
	};
}

function isValidData(data) {
	if (
		!data ||
		!Array.isArray(data.events) ||
		!Array.isArray(data.registrations)
	)
		return false;
	try {
		const eventIds = new Set();
		for (const event of data.events) {
			prepareEvent(event);
			if (typeof event.id !== "string" || !event.id || eventIds.has(event.id))
				return false;
			if (typeof event.image !== "string") return false;
			eventIds.add(event.id);
		}
		const registrationIds = new Set();
		const ticketIds = new Set();
		for (const registration of data.registrations) {
			if (
				!registration ||
				!eventIds.has(registration.eventId) ||
				typeof registration.id !== "string" ||
				!registration.id ||
				registrationIds.has(registration.id) ||
				typeof registration.ticketId !== "string" ||
				!registration.ticketId ||
				ticketIds.has(registration.ticketId) ||
				typeof registration.participantName !== "string" ||
				!registration.participantName.trim() ||
				typeof registration.participantEmail !== "string" ||
				!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
					registration.participantEmail.trim(),
				) ||
				typeof registration.registeredAt !== "string" ||
				!Number.isFinite(Date.parse(registration.registeredAt)) ||
				(registration.checkedInAt !== null &&
					(typeof registration.checkedInAt !== "string" ||
						!Number.isFinite(Date.parse(registration.checkedInAt))))
			)
				return false;
			registrationIds.add(registration.id);
			ticketIds.add(registration.ticketId);
		}
		return true;
	} catch {
		return false;
	}
}

export function AppDataProvider({ children }) {
	const [data, setData] = useState({ events: [], registrations: [] });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	// Ref keeps sequential actions in the same render from using stale state.
	const dataRef = useRef(null);

	function saveData(nextData) {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
		} catch {
			throw new Error(
				"Data gagal disimpan. Periksa izin atau ruang penyimpanan browser.",
			);
		}
		dataRef.current = nextData;
		setData(nextData);
	}

	useEffect(() => {
		const controller = new AbortController();
		async function initialize() {
			try {
				let savedData = null;
				const saved = localStorage.getItem(STORAGE_KEY);
				if (saved !== null) {
					try {
						const parsed = JSON.parse(saved);
						if (isValidData(parsed)) savedData = parsed;
					} catch {
						// Invalid JSON falls back to the fetched seed data.
					}
				}

				let mockData;
				try {
					const response = await fetch(
						`${import.meta.env.BASE_URL}mock/data.json`,
						{ signal: controller.signal },
					);
					if (!response.ok) throw new Error("Mock data gagal dimuat.");
					mockData = await response.json();
					if (!isValidData(mockData))
						throw new Error("Format mock data tidak valid.");
				} catch (fetchError) {
					if (!savedData) throw fetchError;
				}

				if (controller.signal.aborted) return;
				// No writes happen before initialization; stored empty arrays stay empty.
				if (savedData) {
					dataRef.current = savedData;
					setData(savedData);
				} else {
					saveData(mockData);
				}
			} catch (initializationError) {
				if (!controller.signal.aborted) {
					setError(`Inisialisasi gagal: ${initializationError.message}`);
				}
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		}
		initialize();
		return () => controller.abort();
	}, []);

	function getData() {
		if (!dataRef.current)
			throw new Error("Data belum siap. Tunggu inisialisasi selesai.");
		return dataRef.current;
	}

	function findEvent(eventId) {
		const event = getData().events.find((item) => item.id === eventId);
		if (!event) throw new Error("Event tidak ditemukan.");
		return event;
	}

	function createEvent(eventData) {
		const current = getData();
		const event = { ...prepareEvent(eventData), id: crypto.randomUUID() };
		saveData({ ...current, events: [...current.events, event] });
		return event;
	}

	function updateEvent(eventId, eventData) {
		const current = getData();
		const existing = findEvent(eventId);
		const event = {
			...prepareEvent({ ...existing, ...eventData }),
			id: eventId,
		};
		const participantCount = current.registrations.filter(
			(item) => item.eventId === eventId,
		).length;
		if (event.capacity < participantCount) {
			throw new Error(
				"Kapasitas tidak boleh lebih kecil dari jumlah peserta terdaftar.",
			);
		}
		saveData({
			...current,
			events: current.events.map((item) =>
				item.id === eventId ? event : item,
			),
		});
		return event;
	}

	function deleteEvent(eventId) {
		const current = getData();
		findEvent(eventId);
		saveData({
			events: current.events.filter((item) => item.id !== eventId),
			registrations: current.registrations.filter(
				(item) => item.eventId !== eventId,
			),
		});
	}

	function registerAttendee(eventId, participantData) {
		const current = getData();
		const event = findEvent(eventId);
		const now = new Date();
		const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
		if (event.date < today)
			throw new Error("Pendaftaran ditutup karena tanggal event sudah lewat.");

		const participantName =
			typeof participantData?.participantName === "string"
				? participantData.participantName.trim()
				: "";
		const participantEmail =
			typeof participantData?.participantEmail === "string"
				? participantData.participantEmail.trim().toLowerCase()
				: "";
		if (!participantName) throw new Error("Nama peserta wajib diisi.");
		if (
			!participantEmail ||
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participantEmail)
		) {
			throw new Error("Email peserta tidak valid.");
		}
		const eventRegistrations = current.registrations.filter(
			(item) => item.eventId === eventId,
		);
		if (
			eventRegistrations.some(
				(item) =>
					item.participantEmail.trim().toLowerCase() === participantEmail,
			)
		) {
			throw new Error("Email sudah terdaftar pada event ini.");
		}
		if (eventRegistrations.length >= event.capacity)
			throw new Error("Kapasitas event sudah penuh.");

		const registration = {
			id: crypto.randomUUID(),
			eventId,
			ticketId: crypto.randomUUID(),
			participantName,
			participantEmail,
			registeredAt: now.toISOString(),
			checkedInAt: null,
		};
		saveData({
			...current,
			registrations: [...current.registrations, registration],
		});
		return registration;
	}

	function checkInTicket(eventId, ticketId) {
		const current = getData();
		findEvent(eventId);
		const existing = current.registrations.find(
			(item) => item.ticketId === ticketId,
		);
		if (!existing) throw new Error("Tiket tidak ditemukan.");
		if (existing.eventId !== eventId)
			throw new Error("Tiket bukan milik event yang dipilih.");
		if (existing.checkedInAt !== null)
			throw new Error("Tiket sudah digunakan untuk check-in.");
		const registration = { ...existing, checkedInAt: new Date().toISOString() };
		saveData({
			...current,
			registrations: current.registrations.map((item) =>
				item.id === existing.id ? registration : item,
			),
		});
		return registration;
	}

	return (
		<AppDataContext.Provider
			value={{
				...data,
				loading,
				error,
				createEvent,
				updateEvent,
				deleteEvent,
				registerAttendee,
				checkInTicket,
			}}
		>
			{children}
		</AppDataContext.Provider>
	);
}

// oxlint-disable-next-line react/only-export-components
export function useAppData() {
	const context = useContext(AppDataContext);
	if (!context)
		throw new Error("useAppData harus digunakan di dalam AppDataProvider.");
	return context;
}
