import { Link } from 'react-router'
import TicketCard from '../components/TicketCard.jsx'
import { useAppData } from '../context/AppDataContext.jsx'

export default function MyTicketsPage() {
  const { events, registrations, loading, error } = useAppData()

  return (
    <section aria-labelledby="my-tickets-title">
      <header className="mb-8">
        <h1 id="my-tickets-title" className="tracking-tight">Tiket Saya</h1>
        <p className="leading-relaxed">Daftar tiket dari registrasi event kamu.</p>
      </header>
      {loading && <p role="status" className="rounded-xl border border-slate-200 bg-white p-6">Memuat tiket...</p>}
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800 break-words">{error}</p>}
      {!loading && !error && (registrations.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-10 text-center">
          <h2 className="text-lg font-semibold text-slate-900">Belum ada tiket.</h2>
          <p className="mt-2">Jelajahi event untuk menemukan kegiatan pilihanmu.</p>
          <Link to="/events" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-5 py-2 font-medium text-white hover:bg-teal-800">Jelajahi Event</Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {registrations.map((registration) => {
            const event = events.find((item) => item.id === registration.eventId)

            return (
              <li key={registration.id} className="min-w-0">
                <TicketCard registration={registration} event={event} />
              </li>
            )
          })}
        </ul>
      ))}
    </section>
  )
}
