import { Link } from 'react-router'
import EventCard from '../components/EventCard.jsx'
import { useAppData } from '../context/AppDataContext.jsx'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  const { events, registrations, loading, error } = useAppData()
  const featuredEvents = events.slice(0, 3)
  const categories = [...new Set(events.map((event) => event.category))].slice(0, 6)

  return (
    <div className="space-y-14 pb-8 sm:space-y-20">
      <section className="grid items-center gap-10 overflow-hidden rounded-3xl border border-teal-100 bg-teal-50 px-6 py-10 sm:p-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <Badge variant="outline" className="border-teal-200 bg-white px-3 py-1 text-teal-800">Event kampus & komunitas</Badge>
          <h1 className="mt-5 max-w-2xl text-4xl leading-tight font-bold tracking-tight text-slate-950 sm:text-5xl">
            Temukan event.<br />Mulai cerita baru.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Cari kegiatan yang kamu suka, daftar gratis, dan simpan tiket digitalmu di Salmanesia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="min-h-11"><Link to="/events">
              Jelajahi Event
            </Link></Button>
            <Button asChild size="lg" variant="outline" className="min-h-11 bg-white"><Link to="/creator">
              Saya Event Creator
            </Link></Button>
          </div>
        </div>
        <div aria-hidden="true" className="hidden rounded-2xl bg-teal-900 p-8 lg:block">
          <p className="text-sm font-medium text-teal-200">Ada banyak cara untuk</p>
          <p className="mt-4 text-4xl leading-tight font-bold tracking-tight text-white">Bertemu.<br />Belajar.<br />Berbagi.</p>
          <p className="mt-8 border-t border-teal-700 pt-5 text-xs tracking-widest text-teal-200 uppercase">Salmanesia · Temukan minatmu</p>
        </div>
      </section>

      <section aria-labelledby="featured-events-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-teal-700">Pilihan minggu ini</p>
            <h2 id="featured-events-title" className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Event unggulan</h2>
          </div>
          <Button asChild variant="outline" className="min-h-11 bg-white"><Link to="/events">Lihat semua event</Link></Button>
        </div>
        {loading && <p role="status" className="mt-6 rounded-xl border border-slate-200 bg-white p-6">Memuat event...</p>}
        {error && <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">{error}</p>}
        {!loading && !error && (
          featuredEvents.length === 0 ? (
            <p className="mt-6 rounded-xl border border-slate-200 bg-white p-6">Belum ada event untuk ditampilkan.</p>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {featuredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  registeredCount={registrations.filter((registration) => registration.eventId === event.id).length}
                />
              ))}
            </div>
          )
        )}
      </section>

      <section aria-labelledby="category-title" className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <p className="text-sm font-semibold text-teal-700">Mulai dari minatmu</p>
        <h2 id="category-title" className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Eksplor berdasarkan kategori</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button key={category} asChild variant="outline" className="min-h-11 rounded-full bg-white"><Link to={`/events?category=${encodeURIComponent(category)}`}>
              {category}
            </Link></Button>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-teal-900 p-6 text-white sm:flex-row sm:items-center sm:p-8">
        <div>
          <h2 className="text-2xl font-bold">Punya event untuk dibagikan?</h2>
          <p className="mt-2 text-teal-50">Kelola event dan peserta secara praktis dari satu dashboard.</p>
        </div>
        <Button asChild variant="secondary" className="min-h-11"><Link to="/creator">
          Buka Creator Dashboard
        </Link></Button>
      </section>
    </div>
  )
}
