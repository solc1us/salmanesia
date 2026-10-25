import { QRCodeSVG } from 'qrcode.react'

export default function TicketCard({ registration, event }) {
  const isCheckedIn = registration.checkedInAt !== null

  return (
    <article className="flex h-full min-w-0 flex-col gap-5 rounded-xl border border-slate-200 bg-white p-5 break-words shadow-sm sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="min-w-0 flex-1 text-lg leading-snug font-semibold text-teal-900">{event?.title ?? 'Event tidak tersedia'}</h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${isCheckedIn ? 'bg-teal-100 text-teal-900' : 'bg-slate-100 text-slate-700'}`}
        >
          <span className="sr-only">Status tiket: </span>
          {isCheckedIn ? 'Checked In' : 'Registered'}
        </span>
      </header>
      <dl className="grid grid-cols-1 gap-4 text-sm leading-relaxed sm:grid-cols-2">
        <div className="min-w-0 sm:col-span-2">
          <dt className="text-slate-600">Nama peserta</dt>
          <dd className="mt-1 font-medium text-slate-900">{registration.participantName}</dd>
        </div>
        <div>
          <dt className="text-slate-600">Tanggal event</dt>
          <dd className="mt-1 font-medium text-slate-900">{event?.date ?? 'Tanggal tidak tersedia'}</dd>
        </div>
        <div>
          <dt className="text-slate-600">Lokasi event</dt>
          <dd className="mt-1 font-medium text-slate-900">{event?.location ?? 'Lokasi tidak tersedia'}</dd>
        </div>
        <div className="min-w-0 sm:col-span-2">
          <dt className="text-slate-600">Ticket ID</dt>
          <dd className="mt-1 font-mono text-slate-900 break-all">{registration.ticketId}</dd>
        </div>
      </dl>
      <div className="mt-auto flex justify-center border-t border-slate-200 bg-white pt-5">
        <QRCodeSVG
          value={registration.ticketId}
          size={160}
          marginSize={4}
          role="img"
          aria-label={`QR code tiket ${registration.ticketId}`}
          title="QR code tiket"
        />
      </div>
    </article>
  )
}
