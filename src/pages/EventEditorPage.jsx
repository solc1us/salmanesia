import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useAppData } from '../context/AppDataContext.jsx'

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

  if (loading) return <p role="status">Memuat data event...</p>
  if (error) return <p role="alert" className="text-red-700">{error}</p>
  if (eventId && !event) return (
    <section>
      <h1>Event tidak ditemukan</h1>
      <p>Event mungkin sudah dihapus atau tautannya tidak valid.</p>
      <Link to="/creator" className="mt-4 inline-block text-teal-800 hover:underline">Kembali ke dashboard</Link>
    </section>
  )

  const fieldClass = 'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2'
  return (
    <section className="mx-auto max-w-2xl">
      <Link to="/creator" className="text-sm font-medium text-teal-800 hover:underline">← Kembali ke dashboard</Link>
      <h1 className="mt-4">{eventId ? 'Edit Event' : 'Buat Event'}</h1>
      <p className="mb-6">{eventId ? 'Perbarui informasi event.' : 'Isi informasi untuk membuat event baru.'}</p>

      {formError && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{formError}</p>}
      <form onSubmit={submit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Judul event *</label>
          <input id="title" name="title" value={form.title} onChange={change} required maxLength={120} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium">Kategori *</label>
          <select id="category" name="category" value={form.category} onChange={change} required className={fieldClass}>
            <option value="">Pilih kategori</option>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">Deskripsi *</label>
          <textarea id="description" name="description" value={form.description} onChange={change} required rows={4} className={fieldClass} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="location" className="block text-sm font-medium">Lokasi / venue *</label>
            <input id="location" name="location" value={form.location} onChange={change} required className={fieldClass} />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium">Kota *</label>
            <input id="city" name="city" value={form.city} onChange={change} required className={fieldClass} />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium">Tanggal event *</label>
            <input id="date" type="date" name="date" min={today()} value={form.date} onChange={change} required className={fieldClass} />
          </div>
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium">Waktu mulai *</label>
            <input id="startTime" type="time" name="startTime" value={form.startTime} onChange={change} required className={fieldClass} />
          </div>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium">URL cover image <span className="font-normal text-slate-500">(opsional)</span></label>
          <input id="image" type="url" name="image" value={form.image} onChange={change} placeholder="https://..." className={fieldClass} />
        </div>
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium">Kapasitas peserta *</label>
          <input id="capacity" type="number" name="capacity" min={Math.max(1, participantCount)} step="1" value={form.capacity} onChange={change} required className={fieldClass} />
          {eventId && <p className="mt-1 text-xs">Peserta terdaftar saat ini: {participantCount}.</p>}
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
          <Link to="/creator" className="rounded-lg border border-slate-300 px-4 py-2 text-center font-medium hover:bg-slate-50">Batal</Link>
          <button type="submit" disabled={saving} className="rounded-lg bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? 'Menyimpan...' : eventId ? 'Simpan Perubahan' : 'Buat Event'}
          </button>
        </div>
      </form>
    </section>
  )
}
