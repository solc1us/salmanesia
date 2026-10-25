import { Link } from 'react-router'
import EventCard from '../components/EventCard.jsx'
import { useAppData } from '../context/AppDataContext.jsx'

export default function LandingPage() {
  const { events, registrations, loading, error } = useAppData()
  const featuredEvents = events.slice(0, 3)
  const categories = [...new Set(events.map((event) => event.category))].slice(0, 6)

  return (
    <div className="space-y-16 pb-8">
      <section className="overflow-hidden rounded-3xl bg-slate-950 px-6 py-14 text-white sm:px-12 sm:py-20">
        <p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">Temukan pengalaman baru</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Semua event kampus dan komunitas, dalam satu tempat.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
          Cari kegiatan yang kamu suka, daftar gratis, dan simpan tiket digitalmu di Salmanesia.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/events" className="inline-flex min-h-11 items-center rounded-lg bg-teal-400 px-5 py-2 font-semibold text-slate-950 hover:bg-teal-300">
            Jelajahi Event
          </Link>
          <Link to="/creator" className="inline-flex min-h-11 items-center rounded-lg border border-slate-600 px-5 py-2 font-semibold text-white hover:bg-slate-800">
            Saya Event Creator
          </Link>
        </div>
      </section>

      <section aria-labelledby="featured-events-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-teal-700">Pilihan minggu ini</p>
            <h2 id="featured-events-title" className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Event unggulan</h2>
          </div>
          <Link to="/events" className="font-semibold text-teal-800 hover:underline">Lihat semua event</Link>
        </div>
        {loading && <p role="status" className="mt-6 rounded-xl bg-white p-6">Memuat event...</p>}
        {error && <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">{error}</p>}
        {!loading && !error && (
          featuredEvents.length === 0 ? (
            <p className="mt-6 rounded-xl bg-white p-6">Belum ada event untuk ditampilkan.</p>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-3">
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

      <section aria-labelledby="category-title" className="rounded-3xl bg-teal-50 p-6 sm:p-10">
        <p className="text-sm font-semibold text-teal-700">Mulai dari minatmu</p>
        <h2 id="category-title" className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Eksplor berdasarkan kategori</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link key={category} to={`/events?category=${encodeURIComponent(category)}`} className="rounded-full bg-white px-4 py-2 font-medium text-slate-700 shadow-sm hover:bg-teal-700 hover:text-white">
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-teal-700 p-8 text-white sm:flex-row sm:items-center sm:p-10">
        <div>
          <h2 className="text-2xl font-bold">Punya event untuk dibagikan?</h2>
          <p className="mt-2 text-teal-50">Kelola event dan peserta secara praktis dari satu dashboard.</p>
        </div>
        <Link to="/creator" className="inline-flex min-h-11 items-center rounded-lg bg-white px-5 py-2 font-semibold text-teal-800 hover:bg-teal-50">
          Buka Creator Dashboard
        </Link>
      </section>
    </div>
  )
}
