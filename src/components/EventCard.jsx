import { Link } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

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
    <article className="group min-w-0">
      <Card className="h-full gap-0 overflow-hidden border-slate-200 py-0 shadow-none hover:border-teal-300 hover:shadow-sm">
        <Link to={`/events/${event.id}`} className="flex h-full flex-col rounded-xl focus-visible:outline-offset-[-4px]">
          {event.image ? (
            <img src={event.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-teal-900 to-teal-600 p-6">
              <span aria-hidden="true" className="text-center text-3xl font-bold tracking-tight text-white/90 break-words">{event.category}</span>
            </div>
          )}
          <CardContent className="flex flex-1 flex-col p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <Badge variant="secondary">
                {event.category}
              </Badge>
              <span className="text-xs font-semibold text-teal-700">Gratis</span>
            </div>
            <h2 className="text-lg leading-snug font-bold text-slate-900 group-hover:text-teal-800 break-words">{event.title}</h2>
            <p className="mt-3 text-sm leading-6 font-medium text-teal-800">{formatDate(event.date, event.startTime)}</p>
            <p className="mt-1 mb-4 text-sm leading-6 text-slate-600 break-words">{event.location}, {event.city}</p>
            <p className={`mt-auto border-t border-slate-100 pt-4 text-sm font-medium ${isFull ? 'text-red-700' : 'text-slate-600'}`}>
              {isFull ? 'Penuh' : `${remainingCapacity} kursi tersedia`}
            </p>
          </CardContent>
        </Link>
      </Card>
    </article>
  )
}
