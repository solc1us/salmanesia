import { QRCodeSVG } from 'qrcode.react'

export default function TicketCard({ registration, event }) {
  const isCheckedIn = registration.checkedInAt !== null

  return (
    <article className="h-full rounded-lg border border-slate-200 bg-white p-4 break-words">
      <h2 className="font-semibold text-teal-800">{event?.title ?? 'Event tidak tersedia'}</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-slate-500">Nama peserta</dt>
          <dd>{registration.participantName}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Tanggal event</dt>
          <dd>{event?.date ?? 'Tanggal tidak tersedia'}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Lokasi event</dt>
          <dd>{event?.location ?? 'Lokasi tidak tersedia'}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Ticket ID</dt>
          <dd className="font-mono break-all">{registration.ticketId}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Status tiket</dt>
          <dd className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-medium ${isCheckedIn ? 'bg-teal-100 text-teal-900' : 'bg-slate-100 text-slate-700'}`}>
            {isCheckedIn ? 'Checked In' : 'Registered'}
          </dd>
        </div>
      </dl>
      <div className="mt-5 flex justify-center rounded-lg bg-white p-3">
        <QRCodeSVG
          value={registration.ticketId}
          size={160}
          marginSize={4}
          title="QR code tiket"
        />
      </div>
    </article>
  )
}
