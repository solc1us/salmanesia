import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Button } from '@/components/ui/button'

export default function Navbar({ isAdmin, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)
  const linkClass = ({ isActive }) =>
    `inline-flex min-h-11 w-full items-center rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap lg:w-auto ${isActive ? 'bg-teal-50 text-teal-900' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`

  const menu = (
    <>
      <NavLink to="/" end onClick={closeMenu} className={linkClass}>Beranda</NavLink>
      <NavLink to="/events" onClick={closeMenu} className={linkClass}>Jelajahi Event</NavLink>
      <NavLink to="/tickets" onClick={closeMenu} className={linkClass}>Tiket Saya</NavLink>
      {isAdmin ? (
        <>
          <NavLink to="/creator" onClick={closeMenu} className={linkClass}>Creator Dashboard</NavLink>
          <Button type="button" variant="outline" onClick={() => { closeMenu(); onLogout() }} className="min-h-11 w-full justify-start bg-white lg:w-auto lg:justify-center">Logout</Button>
        </>
      ) : (
        <Button asChild variant="outline" className="min-h-11 w-full justify-start bg-white lg:w-auto lg:justify-center"><NavLink to="/login" onClick={closeMenu}>Login Admin</NavLink></Button>
      )}
    </>
  )

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav aria-label="Navigasi utama" className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8 xl:px-10">
        <Link to="/" onClick={closeMenu} className="flex shrink-0 items-center">
          <img src="/branding/salmanesia-logo.png" alt="Salmanesia" width="1747" height="440" className="h-10 w-auto sm:h-11" />
        </Link>
        <div className="hidden items-center gap-1 lg:flex">{menu}</div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={isMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="size-11 shrink-0 bg-white lg:hidden"
        >
          <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d={isMenuOpen ? 'M6 6l12 12M6 18 18 6' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </Button>
        {isMenuOpen && (
          <div id="mobile-navigation" className="flex w-full flex-col gap-1 border-t border-slate-200 pt-3 lg:hidden">{menu}</div>
        )}
      </nav>
    </header>
  )
}
