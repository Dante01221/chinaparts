'use client'

import { useState, useEffect } from 'react'
import { checkAdminPassword } from './actions'
import AdminPanel from './AdminPanel'

export default function AdminRoot() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setAuthed(sessionStorage.getItem('admin_authed') === 'yes')
  }, [])

  if (!mounted) return null

  if (authed) return <AdminPanel onLogout={() => { sessionStorage.removeItem('admin_authed'); setAuthed(false) }} />

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const ok = await checkAdminPassword(password)
    if (ok) {
      sessionStorage.setItem('admin_authed', 'yes')
      sessionStorage.setItem('admin_password', password)
      setAuthed(true)
    } else {
      setError(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 w-full max-w-sm shadow-lg">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-white">settings_applications</span>
          </div>
          <div>
            <h1 className="font-bold text-primary-container text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Панель управления
            </h1>
            <p className="text-[12px] text-secondary">Запчасти из Китая</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-widest text-on-surface-variant mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-primary-container text-body-md"
              autoFocus
            />
            {error && (
              <p className="text-error text-[12px] mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">error</span>
                Неверный пароль
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold uppercase tracking-widest text-[13px] hover:bg-orange-600 transition-colors disabled:opacity-50"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {loading ? 'Проверка...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}
