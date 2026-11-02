import { Link, NavLink } from 'react-router'
import { Button } from '@/components/ui/button'

export default function Navbar({ isAdmin, onLogout }) {
  const linkClass = ({ isActive }) =>
    `inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-teal-50 text-teal-900' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav aria-label="Navigasi utama" className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link to="/" className="flex w-fit items-center gap-2.5 text-xl font-bold tracking-tight text-teal-900">
          <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-lg bg-teal-700 text-lg text-white">S</span>
          Salmanesia
        </Link>
        <div className="flex flex-wrap items-center gap-1">
          <NavLink to="/" end className={linkClass}>Beranda</NavLink>
          <NavLink to="/events" className={linkClass}>Jelajahi Event</NavLink>
          <NavLink to="/tickets" className={linkClass}>Tiket Saya</NavLink>
          {isAdmin ? (
            <>
              <NavLink to="/creator" className={linkClass}>Creator Dashboard</NavLink>
              <Button type="button" variant="outline" onClick={onLogout} className="min-h-11 bg-white">Logout</Button>
            </>
          ) : (
            <Button asChild variant="outline" className="min-h-11 bg-white"><NavLink to="/login">Login Admin</NavLink></Button>
          )}
        </div>
      </nav>
    </header>
  )
}
