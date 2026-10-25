import { useState } from 'react'
import { Link } from 'react-router'
import { useAppData } from '../context/AppDataContext.jsx'

const dateLabel = (date) => new Date(`${date}T00:00:00`).toLocaleDateString('id-ID', {
  day: 'numeric', month: 'short', year: 'numeric',
})

export default function CreatorDashboardPage() {
  const { events, registrations, loading, error, deleteEvent } = useAppData()
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [actionError, setActionError] = useState('')

  const totalCapacity = events.reduce((sum, event) => sum + event.capacity, 0)
  const checkedIn = registrations.filter((item) => item.checkedInAt).length
  const stats = [
    ['Total Event', events.length],
    ['Total Registrasi', registrations.length],
    ['Total Check-in', checkedIn],
    ['Total Kapasitas', totalCapacity],
  ]

  function confirmDelete() {
    try {
      deleteEvent(deleteTarget.id)
      setDeleteTarget(null)
      setActionError('')
    } catch (err) {
      setActionError(err.message || 'Event gagal dihapus.')
    }
  }

  if (loading) return <p role="status">Memuat dashboard...</p>
  if (error) return <p role="alert" className="text-red-700">{error}</p>

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1>Creator Dashboard</h1>
          <p>Kelola event dan pantau pendaftaran peserta.</p>
        </div>
        <Link to="/creator/events/new" className="inline-flex justify-center rounded-lg bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800">
          + Buat Event
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm">{label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      {actionError && <p role="alert" className="mt-4 text-red-700">{actionError}</p>}
      <div className="mt-8">
        <h2 className="mb-3 text-xl font-semibold">Event Saya</h2>
        {events.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p>Belum ada event. Buat event pertama kamu.</p>
            <Link to="/creator/events/new" className="mt-3 inline-block font-semibold text-teal-800 hover:underline">Buat Event</Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Registrasi</th>
                  <th className="px-4 py-3">Kapasitas</th>
                  <th className="px-4 py-3">Check-in</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.map((event) => {
                  const eventRegistrations = registrations.filter((item) => item.eventId === event.id)
                  const attendance = eventRegistrations.filter((item) => item.checkedInAt).length
                  return (
                    <tr key={event.id}>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-900">{event.title}</p>
                        <p className="text-xs">{event.category} · {event.city}</p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{dateLabel(event.date)}</td>
                      <td className="px-4 py-3">{eventRegistrations.length}</td>
                      <td className="px-4 py-3">{event.capacity}</td>
                      <td className="px-4 py-3">{attendance}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-3">
                          <Link className="font-medium text-teal-800 hover:underline" to={`/creator/events/${event.id}/edit`}>Edit</Link>
                          <Link className="font-medium text-teal-800 hover:underline" to={`/creator/events/${event.id}/participants`}>Peserta</Link>
                          <button type="button" onClick={() => { setDeleteTarget(event); setActionError('') }} className="font-medium text-red-700 hover:underline">Hapus</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setDeleteTarget(null) }}>
          <section role="dialog" aria-modal="true" aria-labelledby="delete-title" className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 id="delete-title" className="text-xl font-bold">Hapus event?</h2>
            <p className="mt-2">Event <strong>{deleteTarget.title}</strong> beserta data registrasi dan tiket terkait akan dihapus. Tindakan ini tidak dapat dibatalkan.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setDeleteTarget(null)} className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-50">Batal</button>
              <button type="button" onClick={confirmDelete} className="rounded-lg bg-red-700 px-4 py-2 font-medium text-white hover:bg-red-800">Ya, hapus</button>
            </div>
          </section>
        </div>
      )}
    </section>
  )
}
