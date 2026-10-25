import { Link } from 'react-router'

function formatDate(date, startTime) {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(`${date}T${startTime}`))
}

export default function EventCard({ event, registeredCount = 0 }) {
  const remainingCapacity = Math.max(event.capacity - registeredCount, 0)
  const isFull = remainingCapacity === 0

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link to={`/events/${event.id}`} className="block focus-visible:outline-offset-[-4px]">
        {event.image ? (
          <img src={event.image} alt="" className="h-40 w-full object-cover" />
        ) : (
          <div className="flex h-40 items-end bg-gradient-to-br from-teal-700 via-cyan-700 to-sky-500 p-5">
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur">
              {event.category}
            </span>
          </div>
        )}
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800">
              {event.category}
            </span>
            <span className="text-xs font-semibold text-teal-700">Gratis</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 group-hover:text-teal-800">{event.title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{formatDate(event.date, event.startTime)}</p>
          <p className="mt-1 text-sm text-slate-600">{event.location}, {event.city}</p>
          <p className={`mt-4 text-sm font-medium ${isFull ? 'text-red-700' : 'text-slate-700'}`}>
            {isFull ? 'Penuh' : `${remainingCapacity} kursi tersedia`}
          </p>
        </div>
      </Link>
    </article>
  )
}
