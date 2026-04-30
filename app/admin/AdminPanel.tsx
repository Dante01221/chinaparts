'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { brands } from '@/data/products'
import type { Product } from '@/data/products'
import ProductModal from './ProductModal'

function useAdminPassword() {
  if (typeof window === 'undefined') return ''
  return sessionStorage.getItem('admin_password') || ''
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const password = sessionStorage.getItem('admin_password') || ''
  return fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-admin-password': password,
      ...options.headers,
    },
  })
}

export default function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [brandFilter, setBrandFilter] = useState('all')
  const [modal, setModal] = useState<{ mode: 'add' | 'edit'; product?: Product } | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    apiFetch('/api/admin/products')
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.partNumber.toLowerCase().includes(search.toLowerCase())
      const matchBrand = brandFilter === 'all' || p.brandSlug === brandFilter
      return matchSearch && matchBrand
    })
  }, [products, search, brandFilter])

  const handleSave = async (product: Product) => {
    setSaving(true)
    const isNew = !products.find((p) => p.id === product.id)
    let res: Response
    if (isNew) {
      res = await apiFetch('/api/admin/products', { method: 'POST', body: JSON.stringify(product) })
    } else {
      res = await apiFetch(`/api/admin/products/${product.id}`, { method: 'PUT', body: JSON.stringify(product) })
    }
    if (res.ok) {
      const updated = await res.json()
      setProducts(updated)
    }
    setSaving(false)
    setModal(null)
  }

  const handleDelete = async (id: string) => {
    setSaving(true)
    const res = await apiFetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    if (res.ok) {
      const updated = await res.json()
      setProducts(updated)
    }
    setSaving(false)
    setDeleteConfirm(null)
  }

  const handleToggleStatus = async (id: string) => {
    const product = products.find((p) => p.id === id)
    if (!product) return
    const newStatus = product.status === 'В наличии' ? 'Под заказ' : 'В наличии'
    const res = await apiFetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...product, status: newStatus }),
    })
    if (res.ok) {
      const updated = await res.json()
      setProducts(updated)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 flex justify-between items-center w-full px-6 py-4 bg-white border-b border-[#E2E8F0] shadow-sm">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary-container text-2xl">settings_applications</span>
          <h1 className="font-bold text-lg text-primary-container uppercase tracking-tighter" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Панель управления запчастями
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {saving && (
            <span className="text-[12px] text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
              Сохранение...
            </span>
          )}
          <button
            onClick={onLogout}
            className="text-[12px] text-secondary hover:text-error transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Выйти
          </button>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Search + Filter + Add */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 border border-[#E2E8F0] rounded-xl shadow-sm mb-6">
          <div className="relative flex-1 max-w-lg">
            <span className="absolute inset-y-0 left-3 flex items-center text-outline">
              <span className="material-symbols-outlined">search</span>
            </span>
            <input
              className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-primary-container text-sm"
              placeholder="Поиск по названию или артикулу..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              className="px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-secondary focus:outline-none focus:border-primary-container"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <option value="all">Все бренды</option>
              {brands.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
            </select>
            <button
              onClick={() => setModal({ mode: 'add' })}
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-[13px] font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-md"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Добавить деталь
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <span className="material-symbols-outlined text-4xl text-outline animate-spin">progress_activity</span>
          </div>
        ) : (
          <>
            <p className="text-[13px] text-on-surface-variant mb-4">
              Всего товаров: {products.length} · Показано: {filtered.length}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
              {filtered.map((product) => (
                <div key={product.id} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="h-48 bg-slate-50 relative overflow-hidden">
                    {product.image ? (
                      <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-outline">
                        <span className="material-symbols-outlined text-5xl">image</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <button
                        onClick={() => handleToggleStatus(product.id)}
                        className={`px-2 py-1 rounded text-[11px] font-bold uppercase cursor-pointer transition-colors ${
                          product.status === 'В наличии'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        {product.status}
                      </button>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                        product.type === 'Оригинал' ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'bg-surface-container text-secondary'
                      }`}>
                        {product.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-on-surface leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{product.name}</h3>
                      <p className="text-[11px] text-secondary mt-1 uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{product.partNumber}</p>
                    </div>
                    <div className="flex items-end justify-between border-t border-slate-50 pt-3">
                      <div>
                        <p className="text-[11px] text-slate-400 uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Цена</p>
                        <p className="text-[20px] font-bold text-primary" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>${product.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setModal({ mode: 'edit', product })}
                          className="p-2 text-slate-400 hover:text-primary-container transition-colors border border-slate-100 rounded-lg hover:border-primary-container"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          className="p-2 text-slate-400 hover:text-error transition-colors border border-slate-100 rounded-lg hover:border-error"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-on-surface-variant">
                <span className="material-symbols-outlined text-5xl mb-4 block text-outline">inventory_2</span>
                Нет товаров по заданным фильтрам
              </div>
            )}
          </>
        )}
      </main>

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-bold text-on-surface mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Удалить товар?</h3>
            <p className="text-secondary text-sm mb-6">Это действие нельзя отменить.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-outline-variant rounded-lg text-[13px] font-bold text-secondary hover:bg-surface-container transition-colors">
                Отмена
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-error text-white rounded-lg text-[13px] font-bold hover:brightness-110 transition-all">
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <ProductModal mode={modal.mode} product={modal.product} onSave={handleSave} onClose={() => setModal(null)} />
      )}
    </div>
  )
}
