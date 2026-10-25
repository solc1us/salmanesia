import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { useAppData } from '../context/AppDataContext.jsx'

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
        <Link to="/events" className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-teal-700 px-5 py-2 font-semibold text-white hover:bg-teal-800">Kembali ke event</Link>
      </section>
    )
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {event.image ? (
          <img src={event.image} alt={`Poster ${event.title}`} className="h-64 w-full object-cover sm:h-80" />
        ) : (
          <div className="flex h-64 items-end bg-gradient-to-br from-teal-700 via-cyan-700 to-sky-500 p-8 sm:h-80">
            <span className="rounded-full bg-white/20 px-4 py-2 font-semibold text-white backdrop-blur">{event.category}</span>
          </div>
        )}
        <div className="p-6 sm:p-8">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-800">{event.category}</span>
          <h1 className="mt-4 tracking-tight">{event.title}</h1>
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
            <p className="mt-3 leading-7">{event.description}</p>
          </div>
        </div>
      </article>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
        {registered ? (
          <div role="status">
            <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-800">Pendaftaran berhasil</span>
            <h2 className="mt-4 text-xl font-bold text-slate-900">Tiketmu sudah terbit.</h2>
            <p className="mt-2">Lihat tiket digital dan QR code-mu di halaman Tiket Saya.</p>
            <Link to="/tickets" className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-teal-700 px-5 py-2 font-semibold text-white hover:bg-teal-800">Lihat Tiket Saya</Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">Tiket</p>
                <p className="text-xl font-bold text-slate-900">Gratis</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${isFull ? 'bg-red-50 text-red-700' : 'bg-teal-50 text-teal-800'}`}>
                {isFull ? 'Penuh' : `${remainingCapacity} kursi`}
              </span>
            </div>
            <form className="mt-6 border-t border-slate-200 pt-6" onSubmit={submitRegistration} noValidate>
              <h2 className="text-lg font-bold text-slate-900">Daftar event</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="participant-name" className="mb-1.5 block text-sm font-medium text-slate-700">Nama lengkap</label>
                  <input id="participant-name" required value={form.participantName} onChange={(inputEvent) => setForm({ ...form, participantName: inputEvent.target.value })} className="min-h-11 w-full rounded-lg border border-slate-300 px-3 focus:border-teal-700 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="participant-email" className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                  <input id="participant-email" type="email" required value={form.participantEmail} onChange={(inputEvent) => setForm({ ...form, participantEmail: inputEvent.target.value })} className="min-h-11 w-full rounded-lg border border-slate-300 px-3 focus:border-teal-700 focus:outline-none" />
                </div>
              </div>
              {formError && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{formError}</p>}
              <button type="submit" disabled={isFull || isRegistering} className="mt-6 min-h-11 w-full rounded-lg bg-teal-700 px-5 py-2 font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300">
                {isFull ? 'Event Penuh' : isRegistering ? 'Mendaftarkan...' : 'Daftar Gratis'}
              </button>
            </form>
          </>
        )}
      </aside>
    </section>
  )
}
