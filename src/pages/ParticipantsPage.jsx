
import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useAppData } from '../context/AppDataContext.jsx'
import QrScanner from '../components/QrScanner.jsx'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
        <p role="status" className="rounded-xl border border-slate-200 bg-white p-6">Memuat data peserta...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h1>Terjadi Kesalahan</h1>

        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800"
        >
          {error}
        </p>
      </section>
    )
  }

  const event = events.find((item) => item.id === eventId)

  if (!event) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <h1>Event Tidak Ditemukan</h1>

        <p>
          Event yang ingin dikelola tidak tersedia.
        </p>

        <Button asChild variant="outline" className="mt-6 min-h-11"><Link to="/creator">
          Kembali ke Dashboard
        </Link></Button>
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
    <section aria-labelledby="participants-title" className="space-y-6">
      <header>
        <Button asChild variant="ghost" className="min-h-11"><Link to="/creator">
          ← Kembali ke Dashboard
        </Link></Button>

        <h1 id="participants-title" className="mt-4 text-3xl font-bold tracking-tight">
          Participants & Check-in
        </h1>

        <p className="text-slate-600">
          Kelola daftar peserta dan verifikasi kehadiran.
        </p>
      </header>

      <Card className="gap-0 border-teal-100 bg-teal-50 p-6 shadow-none sm:p-8">
        <h2 className="text-2xl font-bold tracking-tight text-teal-900 break-words">
          {event.title}
        </h2>

        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-600">Lokasi</dt>
            <dd className="mt-1 font-medium break-words">{event.location}, {event.city}</dd>
          </div>
          <div>
            <dt className="text-slate-600">Tanggal</dt>
            <dd className="mt-1 font-medium">{event.date}</dd>
          </div>
          <div>
            <dt className="text-slate-600">Waktu</dt>
            <dd className="mt-1 font-medium">{event.startTime}</dd>
          </div>
          <div>
            <dt className="text-slate-600">Kapasitas</dt>
            <dd className="mt-1 font-medium">{event.capacity} peserta</dd>
          </div>
        </dl>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="gap-0 p-5 shadow-none">
          <p className="text-sm text-slate-600">
            Total Peserta
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
            {totalParticipants}
          </p>
        </Card>

        <Card className="gap-0 p-5 shadow-none">
          <p className="text-sm text-slate-600">
            Sudah Check-in
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-teal-800 tabular-nums">
            {checkedInParticipants}
          </p>
        </Card>

        <Card className="gap-0 p-5 shadow-none">
          <p className="text-sm text-slate-600">
            Belum Check-in
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
            {notCheckedInParticipants}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="min-w-0 gap-0 p-6 shadow-none">
          <h2 className="text-xl font-bold">
            QR Scanner
          </h2>

          <p className="mt-2 text-sm">
            Scan QR Code tiket peserta untuk check-in.
          </p>

          <div className="mt-5">
            <QrScanner onScan={handleCheckIn} />
          </div>
        </Card>

        <Card className="min-w-0 gap-0 p-6 shadow-none">
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
              <Label
                htmlFor="ticket-id"
                className="mb-2"
              >
                Ticket ID
              </Label>

              <Input
                id="ticket-id"
                type="text"
                value={ticketInput}
                onChange={(e) =>
                  setTicketInput(e.target.value)
                }
                placeholder="Contoh: tkt-001"
                className="min-h-11 bg-white"
              />
            </div>

            <Button
              type="submit"
              className="min-h-11 w-full sm:w-auto"
            >
              Verifikasi & Check-in
            </Button>
          </form>
        </Card>
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
              ? 'border-teal-200 bg-teal-50 text-teal-900'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {feedback.message}
        </div>
      )}

      <Card className="min-w-0 gap-0 p-5 shadow-none sm:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Daftar Peserta
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              {filteredParticipants.length} dari {totalParticipants} peserta
            </p>
          </div>

          <div>
            <Label
              htmlFor="participant-search"
              className="mb-2"
            >
              Cari Peserta
            </Label>

            <Input
              id="participant-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nama, email, atau Ticket ID"
              className="min-h-11 bg-white sm:w-64"
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
          <div role="region" aria-label="Tabel peserta" tabIndex={0} className="overflow-x-auto rounded-lg border border-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">
            <table className="w-full min-w-[800px] text-left text-sm">
              <caption className="sr-only">Daftar peserta dan status check-in untuk {event.title}.</caption>
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Nama
                  </th>

                  <th scope="col" className="px-4 py-3">
                    Email
                  </th>

                  <th scope="col" className="px-4 py-3">
                    Ticket ID
                  </th>

                  <th scope="col" className="px-4 py-3">
                    Tanggal Daftar
                  </th>

                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>

                  <th scope="col" className="px-4 py-3">
                    Waktu Check-in
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredParticipants.map((participant) => (
                  <tr
                    key={participant.id}
                    className="hover:bg-slate-50/70"
                  >
                    <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                      {participant.participantName}
                    </th>

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
                        <Badge variant="secondary">
                          Checked In
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-slate-600">
                          Registered
                        </Badge>
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
      </Card>

      <p className="text-center text-xs text-slate-500">
        Salmanesia Demo Mode - data disimpan secara lokal
        pada browser yang sama.
      </p>
    </section>
  )
}
