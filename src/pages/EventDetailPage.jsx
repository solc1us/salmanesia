import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { useAppData } from '../context/AppDataContext.jsx'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import EventCover from '../components/EventCover.jsx'

function formatDate(date, startTime) {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date(`${date}T${startTime}`))
}

export default function EventDetailPage() {
  const { eventId } = useParams()
  const { events, registrations, loading, error, registerAttendee } = useAppData()
  const event = events.find((item) => item.id === eventId)
  const [form, setForm] = useState({ participantName: '', participantEmail: '' })
  const [formError, setFormError] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [today] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  })
  const registeredCount = useMemo(
    () => registrations.filter((registration) => registration.eventId === eventId).length,
    [registrations, eventId],
  )
  const remainingCapacity = event ? Math.max(event.capacity - registeredCount, 0) : 0
  const isFull = remainingCapacity === 0

  function submitRegistration(submitEvent) {
    submitEvent.preventDefault()
    setFormError('')
    setIsRegistering(true)
    try {
      registerAttendee(eventId, form)
      setRegistered(true)
    } catch (registrationError) {
      setFormError(registrationError.message)
    } finally {
      setIsRegistering(false)
    }
  }

  if (loading) return <p role="status" className="rounded-xl bg-white p-6">Memuat detail event...</p>
  if (error) return <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">{error}</p>
  if (!event) {
    return (
      <section className="rounded-xl bg-white p-8 text-center">
        <h1>Event tidak ditemukan</h1>
        <p>Event ini mungkin sudah dihapus atau tautannya tidak valid.</p>
        <Button asChild className="mt-6 min-h-11"><Link to="/events">Kembali ke event</Link></Button>
      </section>
    )
  }

  const isPast = event.date < today

  return (
    <section className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <article className="min-w-0">
        <Card className="gap-0 overflow-hidden py-0 shadow-none">
          <EventCover event={event} className="h-80 sm:h-[32rem]" />
          <CardContent className="p-6 sm:p-8">
            <Badge variant="secondary" className="px-3 py-1">{event.category}</Badge>
            <h1 className="mt-4 text-3xl leading-tight tracking-tight break-words sm:text-4xl">{event.title}</h1>
            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-slate-500">Tanggal & waktu</dt>
                <dd className="mt-1 font-semibold text-slate-900">{formatDate(event.date, event.startTime)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Lokasi</dt>
                <dd className="mt-1 font-semibold text-slate-900">{event.location}, {event.city}</dd>
              </div>
            </dl>
            <div className="mt-8 border-t border-slate-200 pt-8">
              <h2 className="text-xl font-bold text-slate-900">Tentang event</h2>
              <p className="mt-3 max-w-prose leading-7 break-words">{event.description}</p>
            </div>
          </CardContent>
        </Card>
      </article>

      <aside className="min-w-0 lg:sticky lg:top-6">
        <Card className="gap-0 p-6 shadow-sm">
          {registered ? (
            <div role="status">
              <Badge variant="secondary" className="px-3 py-1">Pendaftaran berhasil</Badge>
              <h2 className="mt-4 text-xl font-bold text-slate-900">Tiketmu sudah terbit.</h2>
              <p className="mt-2">Lihat tiket digital dan QR code-mu di halaman Tiket Saya.</p>
              <Button asChild className="mt-6 min-h-11 w-full"><Link to="/tickets">Lihat Tiket Saya</Link></Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">Tiket</p>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Gratis</p>
                </div>
                <Badge variant={isFull ? 'destructive' : 'secondary'} className="px-3 py-1">
                  {isFull ? 'Penuh' : `${remainingCapacity} kursi`}
                </Badge>
              </div>
              <form className="mt-6 border-t border-slate-200 pt-6" onSubmit={submitRegistration} noValidate>
                <h2 className="text-lg font-bold text-slate-900">Daftar event</h2>
                {isPast && <p id="event-ended" className="mt-4 rounded-lg bg-slate-100 p-3 text-sm font-medium text-slate-700">Event sudah berakhir</p>}
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="participant-name" className="mb-2">Nama lengkap</Label>
                    <Input id="participant-name" autoComplete="name" required value={form.participantName} onChange={(inputEvent) => setForm({ ...form, participantName: inputEvent.target.value })} className="min-h-11 bg-white" />
                  </div>
                  <div>
                    <Label htmlFor="participant-email" className="mb-2">Email</Label>
                    <Input id="participant-email" type="email" autoComplete="email" required value={form.participantEmail} onChange={(inputEvent) => setForm({ ...form, participantEmail: inputEvent.target.value })} className="min-h-11 bg-white" />
                  </div>
                </div>
                {formError && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{formError}</p>}
                <Button type="submit" disabled={isPast || isFull || isRegistering} aria-describedby={isPast ? 'event-ended' : undefined} className="mt-6 min-h-11 w-full">
                  {isFull ? 'Event Penuh' : isRegistering ? 'Mendaftarkan...' : 'Daftar Gratis'}
                </Button>
              </form>
            </>
          )}
        </Card>
      </aside>
    </section>
  )
}
