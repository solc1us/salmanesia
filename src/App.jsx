import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ExploreEventsPage from './pages/ExploreEventsPage.jsx'
import EventDetailPage from './pages/EventDetailPage.jsx'
import MyTicketsPage from './pages/MyTicketsPage.jsx'
import CreatorDashboardPage from './pages/CreatorDashboardPage.jsx'
import EventEditorPage from './pages/EventEditorPage.jsx'
import ParticipantsPage from './pages/ParticipantsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/events" element={<ExploreEventsPage />} />
          <Route path="/events/:eventId" element={<EventDetailPage />} />
          <Route path="/tickets" element={<MyTicketsPage />} />
          <Route path="/creator" element={<CreatorDashboardPage />} />
          <Route path="/creator/events/new" element={<EventEditorPage />} />
          <Route path="/creator/events/:eventId/edit" element={<EventEditorPage />} />
          <Route path="/creator/events/:eventId/participants" element={<ParticipantsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}
