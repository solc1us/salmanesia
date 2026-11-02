import { useState } from 'react'

const demoPosters = {
  'evt-001': { title: 'Workshop React Dasar', category: 'Workshop', file: 'workshop-react-dasar.webp' },
  'evt-002': { title: 'Seminar Karier Digital', category: 'Seminar', file: 'seminar-karier-digital.webp' },
  'evt-003': { title: 'Konser Musik Senja', category: 'Musik', file: 'konser-musik-senja.webp' },
  'evt-004': { title: 'Lari Pagi Bersama', category: 'Olahraga', file: 'lari-pagi-bersama.webp' },
  'evt-005': { title: 'Pameran Karya Mahasiswa', category: 'Seni', file: 'pameran-karya-mahasiswa.webp' },
  'evt-006': { title: 'Bazar Kuliner Nusantara', category: 'Kuliner', file: 'bazar-kuliner-nusantara.webp' },
  'evt-007': { title: 'Aksi Bersih Lingkungan', category: 'Sosial', file: 'aksi-bersih-lingkungan.webp' },
  'evt-008': { title: 'Kompetisi Ide Bisnis', category: 'Kompetisi', file: 'kompetisi-ide-bisnis.webp' },
}

const gradients = [
  'from-teal-900 to-teal-600',
  'from-cyan-900 to-sky-700',
  'from-indigo-900 to-violet-700',
  'from-rose-900 to-orange-700',
  'from-emerald-900 to-emerald-600',
  'from-slate-900 to-slate-600',
]

export default function EventCover({ event, className = 'aspect-[4/5]' }) {
  const [failedSource, setFailedSource] = useState(null)
  const poster = demoPosters[event.id]
  const matchesDemo = poster && event.title === poster.title && event.category === poster.category
  const source = event.image.trim() || (matchesDemo ? `${import.meta.env.BASE_URL}images/events/${poster.file}` : null)
  const colorSeed = [...`${event.category} ${event.title}`].reduce((sum, character) => sum + character.charCodeAt(0), 0)

  return (
    <div className={`relative w-full overflow-hidden bg-slate-100 ${className}`}>
      {source && source !== failedSource ? (
        <img
          key={source}
          src={source}
          alt={`Poster ${event.title}`}
          loading="lazy"
          onError={() => setFailedSource(source)}
          className="absolute inset-0 h-full w-full object-contain"
        />
      ) : (
        <div role="img" aria-label={`Sampul ${event.title}, kategori ${event.category}`} className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br p-5 text-center ${gradients[colorSeed % gradients.length]}`}>
          <span aria-hidden="true" className="text-sm font-medium text-white/80 break-words">{event.category}</span>
          <span aria-hidden="true" className="mt-2 font-heading text-xl leading-snug font-semibold text-white break-words">{event.title}</span>
        </div>
      )}
    </div>
  )
}
