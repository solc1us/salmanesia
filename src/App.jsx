import { useState } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router'
import Navbar from './components/Navbar.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ExploreEventsPage from './pages/ExploreEventsPage.jsx'
import EventDetailPage from './pages/EventDetailPage.jsx'
import MyTicketsPage from './pages/MyTicketsPage.jsx'
import CreatorDashboardPage from './pages/CreatorDashboardPage.jsx'
import EventEditorPage from './pages/EventEditorPage.jsx'
import ParticipantsPage from './pages/ParticipantsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

const ADMIN_SESSION_KEY = 'salmanesia-admin'

export default function App() {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true')
  const navigate = useNavigate()

  function handleLogin() {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true')
    setIsAdmin(true)
    navigate('/creator', { replace: true })
  }

  function handleLogout() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
    setIsAdmin(false)
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar isAdmin={isAdmin} onLogout={handleLogout} />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/events" element={<ExploreEventsPage />} />
          <Route path="/events/:eventId" element={<EventDetailPage />} />
          <Route path="/tickets" element={<MyTicketsPage />} />
          <Route path="/login" element={isAdmin ? <Navigate to="/creator" replace /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/creator" element={isAdmin ? <Outlet /> : <Navigate to="/login" replace />}>
            <Route index element={<CreatorDashboardPage />} />
            <Route path="events/new" element={<EventEditorPage />} />
            <Route path="events/:eventId/edit" element={<EventEditorPage />} />
            <Route path="events/:eventId/participants" element={<ParticipantsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}
