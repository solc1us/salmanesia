import { Link } from 'react-router'
import { useAppData } from '../context/AppDataContext.jsx'

export default function ExploreEventsPage() {
  const { events, loading, error } = useAppData()

  return (
    <section>
      <h1>Jelajahi Event</h1>
      <p>Daftar event dari data bersama Salmanesia.</p>
      {loading && <p role="status" className="mt-6">Memuat event...</p>}
      {error && <p role="alert" className="mt-6 text-red-700">{error}</p>}
      {!loading && !error && (events.length === 0 ? (
        <p className="mt-6">Belum ada event.</p>
      ) : (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {events.map((event) => (
            <li key={event.id} className="rounded-lg border border-slate-200 bg-white p-4">
              <Link to={`/events/${event.id}`} className="font-semibold text-teal-800 hover:underline">{event.title}</Link>
            </li>
          ))}
        </ul>
      ))}
    </section>
  )
}
