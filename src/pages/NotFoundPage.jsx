import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section>
      <h1>404 — Halaman Tidak Ditemukan</h1>
      <p>Alamat yang kamu kunjungi tidak tersedia.</p>
      <Link to="/" className="mt-6 inline-block font-medium text-teal-800 underline">Kembali ke Beranda</Link>
    </section>
  )
}
