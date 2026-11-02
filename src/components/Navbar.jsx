import { Link, NavLink } from 'react-router'

export default function Navbar({ isAdmin, onLogout }) {
  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-teal-100 text-teal-900' : 'text-slate-600 hover:bg-slate-100'}`

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav aria-label="Navigasi utama" className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="text-xl font-bold text-teal-800">Salmanesia</Link>
        <div className="flex flex-wrap gap-1">
          <NavLink to="/" end className={linkClass}>Beranda</NavLink>
          <NavLink to="/events" className={linkClass}>Jelajahi Event</NavLink>
          <NavLink to="/tickets" className={linkClass}>Tiket Saya</NavLink>
          {isAdmin ? (
            <>
              <NavLink to="/creator" className={linkClass}>Creator Dashboard</NavLink>
              <button type="button" onClick={onLogout} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">Logout</button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass}>Login Admin</NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}
