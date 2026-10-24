import { Link } from 'react-router'

export default function LandingPage() {
  return (
    <section>
      <h1>Selamat datang di Salmanesia</h1>
      <p>Temukan kegiatan pilihanmu dan kelola event dalam satu tempat.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/events" className="rounded-lg bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800">Jelajahi Event</Link>
        <Link to="/creator" className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium hover:bg-slate-100">Masuk sebagai Creator</Link>
      </div>
    </section>
  )
}
