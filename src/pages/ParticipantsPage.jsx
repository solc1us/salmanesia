import { useParams } from 'react-router'

export default function ParticipantsPage() {
  const { eventId } = useParams()
  return (
    <section>
      <h1>Peserta Event</h1>
      <p>Daftar peserta dan check-in event {eventId} akan tersedia pada fase berikutnya.</p>
    </section>
  )
}
