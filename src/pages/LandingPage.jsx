import { Link } from 'react-router'
import EventCard from '../components/EventCard.jsx'
import EventCover from '../components/EventCover.jsx'
import { useAppData } from '../context/AppDataContext.jsx'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  const { events, registrations, loading, error } = useAppData()
  const featuredEvents = events.slice(0, 3)
  const heroEvent = featuredEvents[0]
  const categories = [...new Set(events.map((event) => event.category))].slice(0, 6)

  return (
    <div className="space-y-8 pb-4 sm:space-y-10">
      <section aria-labelledby="hero-title" className="relative isolate grid items-center gap-6 overflow-hidden rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-teal-100/80 p-5 sm:p-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10 lg:p-8 xl:px-10">
        <div className="hero-copy relative z-10 min-w-0">
          <Badge variant="outline" className="border-teal-200 bg-white/80 px-3 py-1 text-teal-800">Event kampus & komunitas</Badge>
          <h1 id="hero-title" className="mt-5 max-w-xl font-heading text-3xl leading-[1.15] font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl xl:text-[3.5rem]">
            Temukan event.<br /><span className="text-teal-800">Mulai cerita baru.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
            Cari kegiatan yang kamu suka, daftar gratis, dan simpan tiket digitalmu di Salmanesia.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="min-h-11 shadow-sm"><Link to="/events">
              Jelajahi Event
            </Link></Button>
            <Button asChild size="lg" variant="outline" className="min-h-11 bg-white"><Link to="/creator">
              Saya Event Creator
            </Link></Button>
          </div>
        </div>
        <div className="relative mx-auto w-full min-w-0 max-w-sm lg:max-w-md xl:max-w-lg">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 aspect-square -translate-y-1/2 rounded-full border border-teal-200/70 bg-teal-100/40" />
          {heroEvent ? (
            <ul aria-label="Pilihan event" className="relative aspect-[6/5]">
              {featuredEvents.map((event, index) => (
                <li key={event.id} className={`hero-poster hero-poster-${index} ${index === 2 ? 'hidden sm:block' : ''}`}>
                  <Link to={`/events/${event.id}`} aria-label={`Lihat event ${event.title}`} className="block rounded-xl border border-white bg-white p-1 focus-visible:outline-offset-4">
                    <EventCover event={event} className="aspect-[4/5] rounded-lg" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="relative flex aspect-[6/5] flex-col justify-center px-6 text-center">
              <h2 className="text-2xl leading-snug font-semibold text-teal-900">Pengalaman baru menantimu</h2>
              <p className="mt-3 text-sm leading-6">Temukan kegiatan kampus dan komunitas yang sesuai dengan minatmu.</p>
            </div>
          )}
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
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      <section aria-labelledby="category-title" className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <p className="text-sm font-semibold text-teal-700">Mulai dari minatmu</p>
        <h2 id="category-title" className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Eksplor berdasarkan kategori</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button key={category} asChild variant="outline" className="min-h-11 rounded-full bg-white"><Link to={`/events?category=${encodeURIComponent(category)}`}>
              {category}
            </Link></Button>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-teal-900 p-6 text-white lg:flex-row lg:items-center">
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
