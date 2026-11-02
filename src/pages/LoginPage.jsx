import { useState } from 'react'

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (username !== 'admin' || password !== 'admin123') {
      setError('Username atau password salah')
      return
    }
    setError('')
    onLogin()
  }

  return (
    <section className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h1>Login Admin</h1>
      <p>Masuk untuk mengelola event Salmanesia.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <div>
          <label htmlFor="admin-username" className="mb-2 block text-sm font-medium text-slate-700">Username</label>
          <input id="admin-username" name="username" autoComplete="username" required value={username} onChange={(event) => setUsername(event.target.value)} className="min-h-11 w-full rounded-lg border border-slate-300 px-3 focus:border-teal-700 focus:outline-2 focus:outline-teal-700" />
        </div>
        <div>
          <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
          <input id="admin-password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="min-h-11 w-full rounded-lg border border-slate-300 px-3 focus:border-teal-700 focus:outline-2 focus:outline-teal-700" />
        </div>
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        <button type="submit" className="min-h-11 w-full rounded-lg bg-teal-700 px-5 py-2 font-semibold text-white hover:bg-teal-800">Login</button>
      </form>
      <p className="mt-6 text-sm">Login ini hanya simulasi frontend.</p>
    </section>
  )
}
