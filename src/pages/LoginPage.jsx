import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
    <section aria-labelledby="login-title" className="mx-auto max-w-md py-4 sm:py-8">
      <Card className="gap-6 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-6">
          <Badge variant="secondary" className="mb-2">Area Creator</Badge>
          <h1 id="login-title" className="mb-0 tracking-tight">Login Admin</h1>
          <p className="text-sm leading-6">Masuk untuk mengelola event Salmanesia.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <Label htmlFor="admin-username" className="mb-2">Username</Label>
              <Input id="admin-username" name="username" autoComplete="username" required aria-invalid={Boolean(error)} aria-describedby={error ? 'login-error' : undefined} value={username} onChange={(event) => setUsername(event.target.value)} className="min-h-11 bg-white" />
            </div>
            <div>
              <Label htmlFor="admin-password" className="mb-2">Password</Label>
              <Input id="admin-password" name="password" type="password" autoComplete="current-password" required aria-invalid={Boolean(error)} aria-describedby={error ? 'login-error' : undefined} value={password} onChange={(event) => setPassword(event.target.value)} className="min-h-11 bg-white" />
            </div>
            {error && <p id="login-error" role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
            <Button type="submit" className="min-h-11 w-full">Login</Button>
          </form>
          <p className="mt-6 border-t border-slate-100 pt-5 text-center text-xs leading-5">Login ini hanya simulasi frontend.</p>
        </CardContent>
      </Card>
    </section>
  )
}
