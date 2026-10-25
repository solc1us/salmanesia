
import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useAppData } from '../context/AppDataContext.jsx'
import QrScanner from '../components/QrScanner.jsx'

function formatDate(value) {
  if (!value) {
    return '-'
  }

  return new Date(value).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function ParticipantsPage() {
  const { eventId } = useParams()

  const {
    events,
    registrations,
    loading,
    error,
    checkInTicket,
  } = useAppData()

  const [search, setSearch] = useState('')
  const [ticketInput, setTicketInput] = useState('')
  const [feedback, setFeedback] = useState(null)

  if (loading) {
    return (
      <section>
        <h1>Participants & Check-in</h1>
        <p role="status">Memuat data peserta...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h1>Terjadi Kesalahan</h1>

        <p
          role="alert"
          className="rounded-lg bg-red-50 p-4 text-red-700"
        >
          {error}
        </p>
      </section>
    )
  }

  const event = events.find((item) => item.id === eventId)

  if (!event) {
    return (
      <section>
        <h1>Event Tidak Ditemukan</h1>

        <p>
          Event yang ingin dikelola tidak tersedia.
        </p>

        <Link
          to="/creator"
          className="mt-4 inline-block text-teal-700 hover:underline"
        >
          Kembali ke Dashboard
        </Link>
      </section>
    )
  }

  const participants = registrations.filter(
    (item) => item.eventId === eventId
  )

  const totalParticipants = participants.length

  const checkedInParticipants = participants.filter(
    (item) => item.checkedInAt !== null
  ).length

  const notCheckedInParticipants =
    totalParticipants - checkedInParticipants

  const keyword = search.toLowerCase().trim()

  const filteredParticipants = participants.filter(
    (participant) => {
      const name =
        participant.participantName.toLowerCase()

      const email =
        participant.participantEmail.toLowerCase()

      const ticket =
        participant.ticketId.toLowerCase()

      return (
        name.includes(keyword) ||
        email.includes(keyword) ||
        ticket.includes(keyword)
      )
    }
  )

  function handleCheckIn(ticketIdValue) {
    const ticketId = ticketIdValue.trim()

    if (!ticketId) {
      setFeedback({
        type: 'error',
        message: 'Ticket ID tidak boleh kosong.',
      })
      return
    }

    try {
      const result = checkInTicket(eventId, ticketId)

      setFeedback({
        type: 'success',
        message:
          `Check-in berhasil untuk ${result.participantName}!`,
      })

      setTicketInput('')
    } catch (checkInError) {
      setFeedback({
        type: 'error',
        message: checkInError.message,
      })
    }
  }

  function handleManualSubmit(e) {
    e.preventDefault()
    handleCheckIn(ticketInput)
  }

  return (
    <section className="space-y-8">
      <div>
        <Link
          to="/creator"
          className="text-sm font-medium text-teal-700 hover:underline"
        >
          ← Kembali ke Dashboard
        </Link>

        <h1 className="mt-4 text-3xl font-bold">
          Participants & Check-in
        </h1>

        <p className="text-slate-600">
          Kelola daftar peserta dan verifikasi kehadiran.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">
          {event.title}
        </h2>

        <p className="mt-2">
          Lokasi: {event.location}, {event.city}
        </p>

        <p className="mt-1">
          Tanggal: {event.date}
        </p>

        <p className="mt-1">
          Waktu: {event.startTime}
        </p>

        <p className="mt-1">
          Kapasitas: {event.capacity} peserta
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Peserta
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {totalParticipants}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Sudah Check-in
          </p>

          <p className="mt-2 text-3xl font-bold text-teal-700">
            {checkedInParticipants}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Belum Check-in
          </p>

          <p className="mt-2 text-3xl font-bold text-amber-600">
            {notCheckedInParticipants}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            QR Scanner
          </h2>

          <p className="mt-2 text-sm">
            Scan QR Code tiket peserta untuk check-in.
          </p>

          <div className="mt-5">
            <QrScanner onScan={handleCheckIn} />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Manual Check-in
          </h2>

          <p className="mt-2 text-sm">
            Masukkan Ticket ID jika scanner tidak tersedia.
          </p>

          <form
            onSubmit={handleManualSubmit}
            className="mt-5 space-y-4"
          >
            <div>
              <label
                htmlFor="ticket-id"
                className="mb-2 block text-sm font-medium"
              >
                Ticket ID
              </label>

              <input
                id="ticket-id"
                type="text"
                value={ticketInput}
                onChange={(e) =>
                  setTicketInput(e.target.value)
                }
                placeholder="Contoh: tkt-001"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-teal-700 focus:outline-2 focus:outline-teal-700"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800"
            >
              Verifikasi & Check-in
            </button>
          </form>
        </div>
      </div>

      {feedback && (
        <div
          role={
            feedback.type === 'error'
              ? 'alert'
              : 'status'
          }
          className={`rounded-xl border p-4 ${
            feedback.type === 'success'
              ? 'border-teal-200 bg-teal-50 text-teal-800'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Daftar Peserta
            </h2>

            <p className="text-sm text-slate-500">
              {filteredParticipants.length} dari {totalParticipants} peserta
            </p>
          </div>

          <div>
            <label
              htmlFor="participant-search"
              className="mb-2 block text-sm font-medium"
            >
              Cari Peserta
            </label>

            <input
              id="participant-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nama, email, atau Ticket ID"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm sm:w-64"
            />
          </div>
        </div>

        {totalParticipants === 0 ? (
          <p className="rounded-lg bg-slate-50 p-5 text-center">
            Belum ada peserta yang terdaftar pada event ini.
          </p>
        ) : filteredParticipants.length === 0 ? (
          <p className="rounded-lg bg-slate-50 p-5 text-center">
            Peserta tidak ditemukan.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3">
                    Nama
                  </th>

                  <th className="px-4 py-3">
                    Email
                  </th>

                  <th className="px-4 py-3">
                    Ticket ID
                  </th>

                  <th className="px-4 py-3">
                    Tanggal Daftar
                  </th>

                  <th className="px-4 py-3">
                    Status
                  </th>

                  <th className="px-4 py-3">
                    Waktu Check-in
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredParticipants.map((participant) => (
                  <tr
                    key={participant.id}
                    className="border-b border-slate-200"
                  >
                    <td className="px-4 py-3 font-medium">
                      {participant.participantName}
                    </td>

                    <td className="px-4 py-3">
                      {participant.participantEmail}
                    </td>

                    <td className="px-4 py-3 font-mono text-xs">
                      {participant.ticketId}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3">
                      {formatDate(participant.registeredAt)}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3">
                      {participant.checkedInAt ? (
                        <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                          Checked In
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                          Registered
                        </span>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3">
                      {formatDate(participant.checkedInAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-slate-500">
        Salmanesia Demo Mode - data disimpan secara lokal
        pada browser yang sama.
      </p>
    </section>
  )
}
