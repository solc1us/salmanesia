import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import EventCard from '../components/EventCard.jsx'
import { useAppData } from '../context/AppDataContext.jsx'

export default function ExploreEventsPage() {
  const { events, registrations, loading, error } = useAppData()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const selectedCategory = searchParams.get('category') ?? ''
  const categories = useMemo(() => [...new Set(events.map((event) => event.category))], [events])
  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return events.filter((event) =>
      (!normalizedQuery || event.title.toLowerCase().includes(normalizedQuery)) &&
      (!selectedCategory || event.category === selectedCategory),
    )
  }, [events, query, selectedCategory])

  function updateFilters(nextQuery, nextCategory) {
    const nextParams = new URLSearchParams()
    if (nextQuery.trim()) nextParams.set('q', nextQuery.trim())
    if (nextCategory) nextParams.set('category', nextCategory)
    setSearchParams(nextParams)
  }

  return (
    <section aria-labelledby="explore-events-title">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold text-teal-700">Cari kegiatanmu</p>
        <h1 id="explore-events-title" className="mt-1 tracking-tight">Jelajahi Event</h1>
        <p>Temukan event gratis dari kampus dan komunitas pilihanmu.</p>
      </header>

      <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-[1fr_220px]">
        <div>
          <label htmlFor="event-search" className="sr-only">Cari berdasarkan judul event</label>
          <input
            id="event-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              updateFilters(event.target.value, selectedCategory)
            }}
            placeholder="Cari judul event..."
            className="min-h-11 w-full rounded-lg border border-slate-300 px-4 text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="event-category" className="sr-only">Filter kategori</label>
          <select
            id="event-category"
            value={selectedCategory}
            onChange={(event) => updateFilters(query, event.target.value)}
            className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-slate-900 focus:border-teal-700 focus:outline-none"
          >
            <option value="">Semua kategori</option>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </div>
      </div>

      {loading && <p role="status" className="mt-6 rounded-xl bg-white p-6">Memuat event...</p>}
      {error && <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">{error}</p>}
      {!loading && !error && (events.length === 0 ? (
        <p className="mt-6 rounded-xl bg-white p-6">Belum ada event.</p>
      ) : filteredEvents.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <h2 className="text-lg font-semibold text-slate-900">Event tidak ditemukan</h2>
          <p className="mt-2">Coba gunakan kata kunci atau kategori lain.</p>
          <button type="button" onClick={() => { setQuery(''); updateFilters('', '') }} className="mt-5 font-semibold text-teal-800 hover:underline">Reset filter</button>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-slate-600">{filteredEvents.length} event ditemukan</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                registeredCount={registrations.filter((registration) => registration.eventId === event.id).length}
              />
            ))}
          </div>
        </>
      ))}
    </section>
  )
}
