# Salmanesia — Phase 1

Fondasi Event Management System untuk tugas kelompok: React + Vite (JavaScript), Tailwind melalui `@tailwindcss/vite`, React Router Declarative Mode, Fetch, Context + useState, dan localStorage. Halaman masih placeholder; UI fitur dikerjakan pada Phase 2.

## Setup

Gunakan Node.js 22.12+ (disarankan Node 24 LTS) dan npm. Pertahankan `package-lock.json`.

```sh
npm ci
npm run dev
npm run build
npm run lint
npm run preview
```

Pada PowerShell yang memblokir `npm.ps1`, gunakan `npm.cmd` sebagai pengganti `npm`.

## Struktur

```text
public/mock/data.json
src/
  components/Navbar.jsx
  context/AppDataContext.jsx
  pages/
    LandingPage.jsx
    ExploreEventsPage.jsx
    EventDetailPage.jsx
    MyTicketsPage.jsx
    CreatorDashboardPage.jsx
    EventEditorPage.jsx
    ParticipantsPage.jsx
    NotFoundPage.jsx
  assets/                   # aset starter yang sudah ada
  App.jsx
  main.jsx
  index.css
```

## Routes

| Route                                   | Halaman                                      |
| --------------------------------------- | -------------------------------------------- |
| `/`                                     | LandingPage                                  |
| `/events`                               | ExploreEventsPage; daftar judul dari Context |
| `/events/:eventId`                      | EventDetailPage                              |
| `/tickets`                              | MyTicketsPage                                |
| `/creator`                              | CreatorDashboardPage                         |
| `/creator/events/new`                   | EventEditorPage (create)                     |
| `/creator/events/:eventId/edit`         | EventEditorPage (edit)                       |
| `/creator/events/:eventId/participants` | ParticipantsPage                             |
| URL lainnya                             | NotFoundPage                                 |

Attendee dan Creator hanya navigasi, tanpa role state atau autentikasi. Hosting produksi perlu mengarahkan route frontend ke `index.html` agar direct URL/refresh bekerja.

## Kontrak data bersama

Root JSON dan localStorage: `{ events: [], registrations: [] }`. Seed berisi 8 event dengan tanggal November 2026–Januari 2027 dan 2 registrasi contoh.

```js
// Event: seluruh field berikut digunakan bersama.
{
  id: 'evt-001', title: 'Workshop React Dasar', category: 'Workshop',
  description: 'Belajar React dasar', location: 'Telkom University',
  city: 'Bandung', date: '2026-11-15', startTime: '09:00', image: '', capacity: 100
}

// Registration / Ticket
{
  id: 'reg-001', eventId: 'evt-001', ticketId: 'tkt-001',
  participantName: 'Budi', participantEmail: 'budi@example.com',
  registeredAt: '2026-10-20T10:00:00+07:00', checkedInAt: null
}
```

ID data baru menggunakan `crypto.randomUUID()`; jangan mengasumsikan prefix ID. Timestamp baru memakai ISO UTC. `date` dan `startTime` adalah waktu lokal; registrasi masih diizinkan pada hari event dan ditolak jika tanggal sudah lewat menurut browser. QR nantinya memakai `ticketId`. Status check-in diturunkan dari `checkedInAt !== null`. Jumlah peserta dan sisa kapasitas dihitung dari registrasi, tidak disimpan di event.

## Context dan actions

`AppDataProvider` sudah terpasang di `main.jsx`. Seluruh fitur membaca data melalui hook ini:

```jsx
import { useAppData } from "../context/AppDataContext.jsx";

function Feature() {
	const { events, registrations, loading, error, registerAttendee } =
		useAppData();
	// Panggil action dari handler UI setelah loading selesai dan error kosong.
	function handleRegister(eventId) {
		try {
			const ticket = registerAttendee(eventId, {
				participantName: "Budi",
				participantEmail: "budi@example.com",
			});
			console.log(ticket.ticketId);
		} catch (actionError) {
			// Tampilkan actionError.message di state UI fitur masing-masing.
			console.error(actionError.message);
		}
	}
	// Render UI fitur menggunakan data bersama.
}
```

| Action sinkron                                                     | Perilaku / hasil                                                                                                      |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `createEvent(eventData)`                                           | Semua field event kecuali ID; capacity harus number integer positif; mengembalikan event baru.                        |
| `updateEvent(eventId, eventData)`                                  | Mendukung sebagian field, mempertahankan ID, menolak kapasitas di bawah jumlah peserta; mengembalikan event.          |
| `deleteEvent(eventId)`                                             | Menghapus event beserta registrasinya; hasil `undefined`. Dialog konfirmasi dibuat oleh UI.                           |
| `registerAttendee(eventId, { participantName, participantEmail })` | Validasi event/tanggal, nama/email, duplikasi email trim + case-insensitive, dan kapasitas; mengembalikan registrasi. |
| `checkInTicket(eventId, ticketId)`                                 | Validasi tiket, event yang sesuai, dan check-in ganda; mengembalikan registrasi dengan timestamp check-in.            |

Semua kegagalan action melempar `Error` dengan pesan yang dapat ditampilkan UI. `loading`/`error` Context khusus inisialisasi. Field event berupa string; ubah nilai input kapasitas dengan `Number(...)` sebelum memanggil action. Jangan mengubah array/objek Context langsung.

## Persistence

Satu key: `salmanesia-data-v1`, menyimpan events dan registrations bersama. Inisialisasi selalu mencoba fetch `/mock/data.json`; data localStorage yang sesuai kontrak diprioritaskan, termasuk array kosong. JSON/kontrak tersimpan yang rusak diganti seed. Fetch gagal tetap dapat memakai storage valid; tanpa data valid, UI menampilkan error. Penulisan awal menunggu inisialisasi selesai; setiap action menyimpan sebelum memperbarui state dan menolak jika penyimpanan gagal.

Untuk reset demo, hapus **hanya** key `salmanesia-data-v1` melalui browser DevTools lalu refresh. Data tersimpan tidak otomatis mengikuti perubahan seed. Persistence berlaku pada browser/origin yang sama, tanpa sinkronisasi antar-tab atau backend.

## Pemeriksaan sederhana

Build dan lint: `npm run build` dan `npm run lint`.

Untuk memeriksa Context tanpa menambahkan framework testing:

```sh
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

Cek UI: buka semua route pada tabel (gunakan `evt-001`), klik navigasi Attendee/Creator, refresh `/events`, dan periksa tampilan pada layar sempit. `/events` harus menampilkan 8 judul pada origin baru. Setelah perubahan melalui actions, refresh dan pastikan nilai tersimpan tetap sama.

## Kerja paralel Phase 2

Kerjakan fitur di file halaman masing-masing dan gunakan Context yang sama. Sepakati perubahan kontrak data, routes, Navbar, atau Context sebelum mengubah file bersama. Editor create/edit tetap satu komponen. Jangan menambah localStorage per halaman, role/auth, backend, atau statistik tersimpan. UI formulir, dashboard, tiket QR, dan scanner belum diimplementasikan.

Referensi setup: [Tailwind Vite](https://tailwindcss.com/docs/installation/using-vite) dan [React Router Declarative](https://reactrouter.com/start/declarative/installation).
