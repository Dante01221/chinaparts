'use client'

import { useState } from 'react'
import type { Product } from '@/data/products'
import { brands, models, categories } from '@/data/products'

interface Props {
  mode: 'add' | 'edit'
  product?: Product
  onSave: (product: Product) => void
  onClose: () => void
}

function generateId(name: string, brand: string): string {
  return `${brand}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const defaultModel = models.find((m) => m.brandSlug === 'byd')!
const defaultGen = defaultModel.generations[0]

const emptyProduct: Omit<Product, 'id'> = {
  brand: 'BYD',
  brandSlug: 'byd',
  model: defaultModel.name,
  modelSlug: defaultModel.slug,
  generation: defaultGen.name,
  generationSlug: defaultGen.slug,
  category: 'Кузовные детали',
  categorySlug: 'kuzov',
  name: '',
  partNumber: '',
  price: 0,
  currency: 'USD',
  status: 'В наличии',
  type: 'Оригинал',
  image: '',
  description: '',
  weight: '',
  material: '',
}

export default function ProductModal({ mode, product, onSave, onClose }: Props) {
  const [form, setForm] = useState<Omit<Product, 'id'>>(
    product ? { ...product } : { ...emptyProduct }
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (field: keyof typeof form, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => { const e = { ...prev }; delete e[field as string]; return e })
  }

  const brandModels = models.filter((m) => m.brandSlug === form.brandSlug)
  const currentModel = models.find((m) => m.slug === form.modelSlug && m.brandSlug === form.brandSlug)
  const generations = currentModel?.generations ?? []

  const handleBrandChange = (brandSlug: string) => {
    const brand = brands.find((b) => b.slug === brandSlug)
    if (!brand) return
    const firstModel = models.find((m) => m.brandSlug === brandSlug)
    const firstGen = firstModel?.generations[0]
    setForm((prev) => ({
      ...prev,
      brand: brand.name,
      brandSlug,
      model: firstModel?.name ?? '',
      modelSlug: firstModel?.slug ?? '',
      generation: firstGen?.name ?? '',
      generationSlug: firstGen?.slug ?? '',
    }))
  }

  const handleModelChange = (modelSlug: string) => {
    const m = models.find((x) => x.slug === modelSlug && x.brandSlug === form.brandSlug)
    if (!m) return
    const firstGen = m.generations[0]
    setForm((prev) => ({
      ...prev,
      model: m.name,
      modelSlug: m.slug,
      generation: firstGen?.name ?? '',
      generationSlug: firstGen?.slug ?? '',
    }))
  }

  const handleGenerationChange = (genSlug: string) => {
    const gen = currentModel?.generations.find((g) => g.slug === genSlug)
    if (!gen) return
    setForm((prev) => ({ ...prev, generation: gen.name, generationSlug: gen.slug }))
  }

  const handleCategoryChange = (catSlug: string) => {
    const cat = categories.find((c) => c.slug === catSlug)
    if (cat) setForm((prev) => ({ ...prev, category: cat.name, categorySlug: catSlug }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Обязательное поле'
    if (!form.partNumber.trim()) e.partNumber = 'Обязательное поле'
    if (!form.price || form.price <= 0) e.price = 'Укажите цену'
    if (!form.modelSlug) e.modelSlug = 'Укажите модель'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    const id = product?.id || generateId(form.name, form.brandSlug)
    onSave({ ...form, id } as Product)
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-3xl shadow-2xl my-4">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-[#E2E8F0] rounded-t-xl">
          <h2 className="font-bold text-primary-container flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="material-symbols-outlined">edit_note</span>
            {mode === 'add' ? 'Добавить деталь' : 'Редактирование товара'}
          </h2>
          {product && (
            <span className="text-[11px] text-slate-400 uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              ID: {product.id}
            </span>
          )}
          <button onClick={onClose} className="text-outline hover:text-on-surface transition-colors ml-auto">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Наименование детали *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#F8FAFC] border rounded-lg focus:outline-none focus:border-primary-container text-sm ${errors.name ? 'border-error' : 'border-[#E2E8F0]'}`}
                  placeholder="Бампер передний BYD Han"
                />
                {errors.name && <p className="text-error text-[11px] mt-1">{errors.name}</p>}
              </div>

              {/* Бренд */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Марка</label>
                <select
                  value={form.brandSlug}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  className="w-full px-3 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-primary-container"
                >
                  {brands.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
                </select>
              </div>

              {/* Модель */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Модель *</label>
                <select
                  value={form.modelSlug}
                  onChange={(e) => handleModelChange(e.target.value)}
                  className={`w-full px-3 py-3 bg-[#F8FAFC] border rounded-lg text-sm focus:outline-none focus:border-primary-container ${errors.modelSlug ? 'border-error' : 'border-[#E2E8F0]'}`}
                >
                  {brandModels.map((m) => <option key={m.slug} value={m.slug}>{m.name}</option>)}
                </select>
                {errors.modelSlug && <p className="text-error text-[11px] mt-1">{errors.modelSlug}</p>}
              </div>

              {/* Поколение */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Поколение</label>
                <select
                  value={form.generationSlug}
                  onChange={(e) => handleGenerationChange(e.target.value)}
                  className="w-full px-3 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-primary-container"
                >
                  {generations.map((g) => (
                    <option key={g.slug} value={g.slug}>{g.name} ({g.years})</option>
                  ))}
                </select>
              </div>

              {/* Категория */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Категория запчастей</label>
                <select
                  value={form.categorySlug}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-primary-container"
                >
                  {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
              </div>

              {/* Артикул */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Артикул *</label>
                <input
                  type="text"
                  value={form.partNumber}
                  onChange={(e) => set('partNumber', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#F8FAFC] border rounded-lg text-sm focus:outline-none focus:border-primary-container ${errors.partNumber ? 'border-error' : 'border-[#E2E8F0]'}`}
                  placeholder="BYD-HAN-11101"
                />
                {errors.partNumber && <p className="text-error text-[11px] mt-1">{errors.partNumber}</p>}
              </div>

              {/* Цена + Тип */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Цена (USD) *</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={form.price || ''}
                      onChange={(e) => set('price', parseFloat(e.target.value) || 0)}
                      className={`w-full pl-8 pr-3 py-3 bg-[#F8FAFC] border rounded-lg text-sm focus:outline-none focus:border-primary-container ${errors.price ? 'border-error' : 'border-[#E2E8F0]'}`}
                      placeholder="485"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                  </div>
                  {errors.price && <p className="text-error text-[11px] mt-1">{errors.price}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Тип</label>
                  <select
                    value={form.type}
                    onChange={(e) => set('type', e.target.value)}
                    className="w-full px-3 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-primary-container"
                  >
                    <option>Оригинал</option>
                    <option>Аналог</option>
                  </select>
                </div>
              </div>

              {/* Статус */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Статус наличия
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-primary-container">{form.status}</span>
                    <button
                      type="button"
                      onClick={() => set('status', form.status === 'В наличии' ? 'Под заказ' : 'В наличии')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.status === 'В наличии' ? 'bg-orange-500' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.status === 'В наличии' ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  URL фотографии
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => set('image', e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-primary-container"
                  placeholder="https://..."
                />
                {form.image && (
                  <div className="mt-2 h-32 rounded-lg overflow-hidden bg-surface-container border border-[#E2E8F0]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Описание</label>
                <textarea
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-primary-container resize-none"
                  placeholder="Оригинальная деталь для..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Материал</label>
                  <select
                    value={form.material || ''}
                    onChange={(e) => set('material', e.target.value)}
                    className="w-full px-3 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-primary-container"
                  >
                    <option value="">Выбрать</option>
                    <option>ABS-пластик</option>
                    <option>PP-пластик</option>
                    <option>Поликарбонат</option>
                    <option>ABS + хром</option>
                    <option>Сталь</option>
                    <option>Алюминий</option>
                    <option>Металл + бумага</option>
                    <option>Керамика</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Вес</label>
                  <input
                    type="text"
                    value={form.weight || ''}
                    onChange={(e) => set('weight', e.target.value)}
                    className="w-full px-3 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-primary-container"
                    placeholder="8.5 кг"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-6 mt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border-2 border-primary-container text-primary-container font-bold uppercase tracking-widest text-[12px] rounded-lg hover:bg-slate-50 transition-all"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 bg-orange-500 text-white font-bold uppercase tracking-widest text-[12px] rounded-lg shadow-lg hover:bg-orange-600 transition-all active:scale-95"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {mode === 'add' ? 'Добавить' : 'Сохранить изменения'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
