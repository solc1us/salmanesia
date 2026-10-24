import { Link } from 'react-router'

export default function CreatorDashboardPage() {
  return (
    <section>
      <h1>Creator Dashboard</h1>
      <p>Pengelolaan event akan tersedia pada fase berikutnya.</p>
      <Link to="/creator/events/new" className="mt-6 inline-block rounded-lg bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800">Buat Event</Link>
    </section>
  )
}
