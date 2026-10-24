import { useParams } from 'react-router'

export default function EventEditorPage() {
  const { eventId } = useParams()
  return (
    <section>
      <h1>{eventId ? 'Edit Event' : 'Buat Event'}</h1>
      <p>Formulir {eventId ? `pengeditan event ${eventId}` : 'pembuatan event'} akan tersedia pada fase berikutnya.</p>
    </section>
  )
}
