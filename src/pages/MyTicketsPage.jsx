import { Link } from 'react-router'
import TicketCard from '../components/TicketCard.jsx'
import { useAppData } from '../context/AppDataContext.jsx'

export default function MyTicketsPage() {
  const { events, registrations, loading, error } = useAppData()

  return (
    <section>
      <h1>Tiket Saya</h1>
      <p>Daftar tiket dari registrasi event kamu.</p>
      {loading && <p role="status" className="mt-6">Memuat tiket...</p>}
      {error && <p role="alert" className="mt-6 text-red-700">{error}</p>}
      {!loading && !error && (registrations.length === 0 ? (
        <div className="mt-6">
          <p>Belum ada tiket.</p>
          <Link to="/events" className="mt-3 inline-block font-medium text-teal-800 hover:underline">Jelajahi Event</Link>
        </div>
      ) : (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
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
