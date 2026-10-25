import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { useAppData } from "../context/AppDataContext.jsx";
import TicketValidationModal from "../components/TicketValidationModal.jsx";

export default function EventDetailPage() {
  const { eventId } = useParams();
  const { events, registrations, loading, error, registerAttendee } = useAppData();

  const [formData, setFormData] = useState({
    participantName: "",
    participantEmail: "",
  });
  
  const [successTicket, setSuccessTicket] = useState(null);
  const [formError, setFormError] = useState("");
  const [showValidationModal, setShowValidationModal] = useState(false);

  const event = events.find((item) => item.id === eventId);

  if (loading) return <div className="p-8 text-center">Memuat detail event...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (!event) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold">Event tidak ditemukan</h2>
        <Link to="/events" className="text-blue-600 underline mt-2 inline-block">
          Kembali ke Explore Events
        </Link>
      </div>
    );
  }

  const registeredCount = registrations.filter((r) => r.eventId === event.id).length;
  const remainingCapacity = event.capacity - registeredCount;

  const isFull = remainingCapacity <= 0;
  const isPast = new Date(event.date) < new Date(new Date().toDateString());

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.participantName.trim()) {
      setFormError("Nama lengkap wajib diisi.");
      return;
    }
    if (!formData.participantEmail.trim()) {
      setFormError("Email wajib diisi.");
      return;
    }

    try {
      const ticket = registerAttendee(event.id, {
        participantName: formData.participantName.trim(),
        participantEmail: formData.participantEmail.trim(),
      });
      setSuccessTicket(ticket);
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-gray-100 rounded-lg p-6">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded font-semibold mb-2">
          {event.category}
        </span>
        <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
        <p className="text-gray-600">
          📍 {event.location}, {event.city} | 📅 {event.date} {event.startTime} WIB
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Deskripsi Event</h2>
          <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
        </div>

        <div className="border rounded-lg p-5 shadow-sm space-y-4 bg-white h-fit">
          <h3 className="font-bold text-lg border-b pb-2">Status Pendaftaran</h3>
          <div>
            <p className="text-sm text-gray-500">Sisa Kapasitas</p>
            <p className="text-2xl font-bold text-blue-600">
              {remainingCapacity} <span className="text-sm text-gray-500 font-normal">/ {event.capacity} kursi</span>
            </p>
          </div>

          {isPast ? (
            <div className="p-3 bg-gray-100 text-gray-600 text-sm rounded">
              Event ini telah selesai diselenggarakan.
            </div>
          ) : isFull ? (
            <div className="p-3 bg-red-100 text-red-700 text-sm rounded font-medium">
              Kapasitas Penuh! Pendaftaran ditutup.
            </div>
          ) : successTicket ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded text-green-800 space-y-3">
              <p className="font-semibold text-sm">🎉 Pendaftaran Berhasil!</p>
              <p className="text-xs">Kode Tiket: <strong>{successTicket.ticketId}</strong></p>
              <Link
                to="/tickets"
                className="block text-center bg-green-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-green-700"
              >
                Lihat Tiket Saya
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              {formError && (
                <div className="p-2 bg-red-100 text-red-700 text-xs rounded">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="participantName"
                  value={formData.participantName}
                  onChange={handleChange}
                  placeholder="Masukkan nama Anda"
                  className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="participantEmail"
                  value={formData.participantEmail}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded font-medium text-sm hover:bg-blue-700 transition"
              >
                Daftar Sekarang (Gratis)
              </button>
            </form>
          )}

          <div className="pt-2 border-t">
            <button
              type="button"
              onClick={() => setShowValidationModal(true)}
              className="w-full border border-gray-300 text-gray-700 py-2 rounded text-xs font-medium hover:bg-gray-50"
            >
              🔍 Validasi Tiket Manual
            </button>
          </div>
        </div>
      </div>

      {showValidationModal && (
        <TicketValidationModal
          activeEventId={event.id}
          onClose={() => setShowValidationModal(false)}
        />
      )}
    </div>
  );
}