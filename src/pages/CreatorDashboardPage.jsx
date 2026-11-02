import { useState } from 'react'
import { Link } from 'react-router'
import { useAppData } from '../context/AppDataContext.jsx'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

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

  if (loading) return <p role="status" className="rounded-xl border border-slate-200 bg-white p-6">Memuat dashboard...</p>
  if (error) return <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">{error}</p>

  return (
    <section aria-labelledby="dashboard-title">
      <header className="flex flex-col justify-between gap-5 rounded-2xl border border-teal-100 bg-teal-50 p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <p className="mb-2 text-sm font-semibold text-teal-700">Area Creator</p>
          <h1 id="dashboard-title" className="tracking-tight">Creator Dashboard</h1>
          <p>Kelola event dan pantau pendaftaran peserta.</p>
        </div>
        <Button asChild className="min-h-11"><Link to="/creator/events/new">
          + Buat Event
        </Link></Button>
      </header>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(([label, value]) => (
          <Card key={label} className="gap-2 p-5 shadow-none">
            <p className="text-sm">{label}</p>
            <p className="text-3xl font-bold tracking-tight text-teal-900 tabular-nums">{value}</p>
          </Card>
        ))}
      </div>

      {actionError && !deleteTarget && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-4 text-red-800">{actionError}</p>}
      <div className="mt-8">
        <h2 className="mb-3 text-xl font-semibold">Event Saya</h2>
        {events.length === 0 ? (
          <Card className="gap-0 border-dashed p-8 text-center shadow-none">
            <p>Belum ada event. Buat event pertama kamu.</p>
            <Button asChild className="mx-auto mt-5 min-h-11"><Link to="/creator/events/new">Buat Event</Link></Button>
          </Card>
        ) : (
          <Card role="region" aria-label="Daftar event" tabIndex={0} className="gap-0 overflow-x-auto py-0 shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="sr-only">Event, kapasitas, registrasi, dan tindakan pengelolaan.</caption>
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <tr>
                  <th scope="col" className="px-4 py-3">Event</th>
                  <th scope="col" className="px-4 py-3">Tanggal</th>
                  <th scope="col" className="px-4 py-3">Registrasi</th>
                  <th scope="col" className="px-4 py-3">Kapasitas</th>
                  <th scope="col" className="px-4 py-3">Check-in</th>
                  <th scope="col" className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.map((event) => {
                  const eventRegistrations = registrations.filter((item) => item.eventId === event.id)
                  const attendance = eventRegistrations.filter((item) => item.checkedInAt).length
                  return (
                    <tr key={event.id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-900">{event.title}</p>
                        <p className="mt-2 flex flex-wrap items-center gap-2 text-xs"><Badge variant="secondary">{event.category}</Badge>{event.city}</p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{dateLabel(event.date)}</td>
                      <td className="px-4 py-3">{eventRegistrations.length}</td>
                      <td className="px-4 py-3">{event.capacity}</td>
                      <td className="px-4 py-3">{attendance}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Button asChild variant="outline" size="sm" className="min-h-11 bg-white"><Link to={`/creator/events/${event.id}/edit`} aria-label={`Edit ${event.title}`}>Edit</Link></Button>
                          <Button asChild variant="outline" size="sm" className="min-h-11 bg-white"><Link to={`/creator/events/${event.id}/participants`} aria-label={`Peserta ${event.title}`}>Peserta</Link></Button>
                          <AlertDialog
                            open={deleteTarget?.id === event.id}
                            onOpenChange={(open) => {
                              setDeleteTarget(open ? event : null)
                              if (open) setActionError('')
                            }}
                          >
                            <AlertDialogTrigger asChild>
                              <Button type="button" variant="outline" size="sm" aria-label={`Hapus ${event.title}`} className="min-h-11 border-red-200 bg-white text-red-700 hover:bg-red-50 hover:text-red-800">Hapus</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus event?</AlertDialogTitle>
                                <AlertDialogDescription className="leading-6 break-words">
                                  Event <strong>{event.title}</strong> beserta data registrasi dan tiket terkait akan dihapus. Tindakan ini tidak dapat dibatalkan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              {actionError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{actionError}</p>}
                              <AlertDialogFooter>
                                <AlertDialogCancel className="min-h-11 bg-white">Batal</AlertDialogCancel>
                                <AlertDialogAction variant="destructive" className="min-h-11" onClick={(clickEvent) => {
                                  // confirmDelete menutup dialog hanya jika penghapusan berhasil.
                                  clickEvent.preventDefault()
                                  confirmDelete()
                                }}>Ya, hapus</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </section>
  )
}
