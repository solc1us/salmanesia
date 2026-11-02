import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useAppData } from '../context/AppDataContext.jsx'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const categories = ['Seminar', 'Workshop', 'Musik', 'Olahraga', 'Seni', 'Kuliner', 'Sosial', 'Kompetisi', 'Komunitas', 'Lainnya']
const today = () => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
const emptyForm = {
  title: '', category: '', description: '', location: '', city: '',
  date: '', startTime: '', image: '', capacity: '100',
}

export default function EventEditorPage() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const { events, registrations, loading, error, createEvent, updateEvent } = useAppData()
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const event = eventId ? events.find((item) => item.id === eventId) : null
  const participantCount = registrations.filter((item) => item.eventId === eventId).length

  useEffect(() => {
    if (!eventId || !event) return
    setForm({
      title: event.title,
      category: event.category,
      description: event.description,
      location: event.location,
      city: event.city,
      date: event.date,
      startTime: event.startTime,
      image: event.image || '',
      capacity: String(event.capacity),
    })
  }, [eventId, event])

  function change(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function submit(event) {
    event.preventDefault()
    setFormError('')
    const capacity = Number(form.capacity)
    if (!form.title.trim() || !form.category || !form.description.trim() ||
        !form.location.trim() || !form.city.trim() || !form.date || !form.startTime) {
      setFormError('Lengkapi semua field wajib terlebih dahulu.')
      return
    }
    if (form.date < today()) {
      setFormError('Tanggal event tidak boleh sudah lewat.')
      return
    }
    if (!Number.isSafeInteger(capacity) || capacity <= 0) {
      setFormError('Kapasitas harus berupa bilangan bulat positif.')
      return
    }
    if (eventId && capacity < participantCount) {
      setFormError(`Kapasitas tidak boleh kurang dari ${participantCount} peserta yang sudah terdaftar.`)
      return
    }
    if (form.image.trim()) {
      try {
        const url = new URL(form.image.trim())
        if (!['http:', 'https:'].includes(url.protocol)) throw new Error()
      } catch {
        setFormError('Cover image harus berupa URL HTTP atau HTTPS yang valid.')
        return
      }
    }

    setSaving(true)
    try {
      const payload = { ...form, title: form.title.trim(), description: form.description.trim(),
        location: form.location.trim(), city: form.city.trim(), image: form.image.trim(), capacity }
      if (eventId) updateEvent(eventId, payload)
      else createEvent(payload)
      navigate('/creator')
    } catch (err) {
      setFormError(err.message || 'Event gagal disimpan.')
      setSaving(false)
    }
  }

  if (loading) return <p role="status" className="rounded-xl border border-slate-200 bg-white p-6">Memuat data event...</p>
  if (error) return <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">{error}</p>
  if (eventId && !event) return (
    <section className="rounded-xl border border-slate-200 bg-white p-8 text-center">
      <h1>Event tidak ditemukan</h1>
      <p>Event mungkin sudah dihapus atau tautannya tidak valid.</p>
      <Button asChild variant="outline" className="mt-6 min-h-11"><Link to="/creator">Kembali ke dashboard</Link></Button>
    </section>
  )

  const fieldClass = 'mt-2 min-h-11 w-full rounded-md border border-input bg-white px-3 py-2 text-base outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm'
  return (
    <section aria-labelledby="editor-title" className="mx-auto max-w-3xl">
      <Button asChild variant="ghost" className="mb-4 min-h-11"><Link to="/creator">← Kembali ke dashboard</Link></Button>
      <h1 id="editor-title" className="tracking-tight">{eventId ? 'Edit Event' : 'Buat Event'}</h1>
      <p className="mb-8 leading-7">{eventId ? 'Perbarui informasi event.' : 'Isi informasi untuk membuat event baru.'}</p>

      {formError && <p id="event-form-error" role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">{formError}</p>}
      <Card className="gap-0 py-0 shadow-none">
        <form onSubmit={submit} aria-describedby={formError ? 'event-form-error' : undefined} className="space-y-5 p-5 sm:p-8">
          <div>
            <Label htmlFor="title">Judul event *</Label>
            <Input id="title" name="title" value={form.title} onChange={change} required maxLength={120} className={fieldClass} />
          </div>
          <div>
            <Label htmlFor="category">Kategori *</Label>
            <select id="category" name="category" value={form.category} onChange={change} required className={fieldClass}>
              <option value="">Pilih kategori</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="description">Deskripsi *</Label>
            <textarea id="description" name="description" value={form.description} onChange={change} required rows={4} className={fieldClass} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="location">Lokasi / venue *</Label>
              <Input id="location" name="location" value={form.location} onChange={change} required className={fieldClass} />
            </div>
            <div>
              <Label htmlFor="city">Kota *</Label>
              <Input id="city" name="city" value={form.city} onChange={change} required className={fieldClass} />
            </div>
            <div>
              <Label htmlFor="date">Tanggal event *</Label>
              <Input id="date" type="date" name="date" min={today()} value={form.date} onChange={change} required className={fieldClass} />
            </div>
            <div>
              <Label htmlFor="startTime">Waktu mulai *</Label>
              <Input id="startTime" type="time" name="startTime" value={form.startTime} onChange={change} required className={fieldClass} />
            </div>
          </div>
          <div>
            <Label htmlFor="image">URL cover image <span className="font-normal text-slate-500">(opsional)</span></Label>
            <Input id="image" type="url" name="image" value={form.image} onChange={change} placeholder="https://..." className={fieldClass} />
          </div>
          <div>
            <Label htmlFor="capacity">Kapasitas peserta *</Label>
            <Input id="capacity" type="number" name="capacity" min={Math.max(1, participantCount)} step="1" value={form.capacity} onChange={change} required aria-describedby={eventId ? 'capacity-help' : undefined} className={fieldClass} />
            {eventId && <p id="capacity-help" className="mt-2 text-xs">Peserta terdaftar saat ini: {participantCount}.</p>}
          </div>
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <Button asChild variant="outline" className="min-h-11 bg-white"><Link to="/creator">Batal</Link></Button>
            <Button type="submit" disabled={saving} className="min-h-11">
              {saving ? 'Menyimpan...' : eventId ? 'Simpan Perubahan' : 'Buat Event'}
            </Button>
          </div>
        </form>
      </Card>
    </section>
  )
}
