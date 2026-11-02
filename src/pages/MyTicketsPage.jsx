import { Link } from 'react-router'
import TicketCard from '../components/TicketCard.jsx'
import { useAppData } from '../context/AppDataContext.jsx'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function MyTicketsPage() {
  const { events, registrations, loading, error } = useAppData()

  return (
    <section aria-labelledby="my-tickets-title">
      <header className="mb-8 rounded-2xl border border-teal-100 bg-teal-50 p-6 sm:p-8">
        <p className="mb-2 text-sm font-semibold text-teal-700">Tiket digital</p>
        <h1 id="my-tickets-title" className="text-3xl tracking-tight sm:text-4xl">Tiket Saya</h1>
        <p className="leading-relaxed">Daftar tiket dari registrasi event kamu.</p>
      </header>
      {loading && <p role="status" className="rounded-xl border border-slate-200 bg-white p-6">Memuat tiket...</p>}
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800 break-words">{error}</p>}
      {!loading && !error && (registrations.length === 0 ? (
        <Card className="gap-0 px-6 py-12 text-center shadow-none">
          <h2 className="text-lg font-semibold text-slate-900">Belum ada tiket.</h2>
          <p className="mt-2">Jelajahi event untuk menemukan kegiatan pilihanmu.</p>
          <Button asChild className="mx-auto mt-6 min-h-11"><Link to="/events">Jelajahi Event</Link></Button>
        </Card>
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
