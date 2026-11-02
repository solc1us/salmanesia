import { Link } from 'react-router'
import EventCard from '../components/EventCard.jsx'
import { useAppData } from '../context/AppDataContext.jsx'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function LandingPage() {
  const { events, registrations, loading, error } = useAppData()
  const featuredEvents = events.slice(0, 3)
  const heroEvent = featuredEvents[0]
  const categories = [...new Set(events.map((event) => event.category))].slice(0, 6)

  return (
    <div className="space-y-8 pb-4 sm:space-y-10">
      <section className="grid items-center gap-6 rounded-2xl border border-teal-100 bg-teal-50 p-5 sm:p-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:p-8">
        <div className="min-w-0">
          <Badge variant="outline" className="border-teal-200 bg-white px-3 py-1 text-teal-800">Event kampus & komunitas</Badge>
          <h1 className="mt-4 max-w-xl text-3xl leading-tight font-bold tracking-tight text-slate-950 sm:text-4xl">
            Temukan event.<br />Mulai cerita baru.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
            Cari kegiatan yang kamu suka, daftar gratis, dan simpan tiket digitalmu di Salmanesia.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="min-h-11"><Link to="/events">
              Jelajahi Event
            </Link></Button>
            <Button asChild size="lg" variant="outline" className="min-h-11 bg-white"><Link to="/creator">
              Saya Event Creator
            </Link></Button>
          </div>
        </div>
        {heroEvent ? (
          <article className="mx-auto w-full min-w-0 max-w-sm">
            <Card className="gap-0 overflow-hidden py-0 shadow-sm">
              <Link to={`/events/${heroEvent.id}`} className="group block rounded-xl focus-visible:outline-offset-[-4px]">
                {heroEvent.image ? (
                  <img src={heroEvent.image} alt="" className="h-32 w-full object-cover sm:h-36" />
                ) : (
                  <div aria-hidden="true" className="flex h-32 items-center justify-center bg-gradient-to-br from-teal-900 to-teal-600 p-4 sm:h-36">
                    <span className="text-center text-2xl font-bold text-white break-words">{heroEvent.category}</span>
                  </div>
                )}
                <CardContent className="p-4 sm:p-5">
                  <Badge variant="secondary">{heroEvent.category}</Badge>
                  <h2 className="mt-3 text-lg leading-snug font-bold text-slate-900 group-hover:text-teal-800 break-words">{heroEvent.title}</h2>
                  <p className="mt-2 text-sm font-medium text-teal-800">
                    {new Date(`${heroEvent.date}T${heroEvent.startTime}`).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 break-words">{heroEvent.location}, {heroEvent.city}</p>
                </CardContent>
              </Link>
            </Card>
          </article>
        ) : (
          <div className="rounded-xl border border-dashed border-teal-200 bg-white/70 p-6">
            <h2 className="text-xl font-semibold text-teal-900">Pengalaman baru menantimu</h2>
            <p className="mt-3 text-sm leading-6">Temukan kegiatan kampus dan komunitas yang sesuai dengan minatmu.</p>
          </div>
        )}
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
