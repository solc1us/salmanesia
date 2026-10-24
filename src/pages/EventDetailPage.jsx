import { useParams } from 'react-router'

export default function EventDetailPage() {
  const { eventId } = useParams()
  return (
    <section>
      <h1>Detail Event</h1>
      <p>Informasi dan pendaftaran event {eventId} akan tersedia pada fase berikutnya.</p>
    </section>
  )
}
