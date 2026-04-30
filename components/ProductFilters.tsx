'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/data/products'
import AddToCartButton from './AddToCartButton'

type SortKey = 'default' | 'price_asc' | 'price_desc'
type StatusFilter = 'all' | 'В наличии' | 'Под заказ'
type TypeFilter = 'all' | 'Оригинал' | 'Аналог'

interface Props {
  products: Product[]
  brandSlug: string
  brandName: string
  modelName?: string
  categoryName: string
}

export default function ProductFilters({ products, brandSlug, brandName, modelName, categoryName }: Props) {
  const [sort, setSort] = useState<SortKey>('default')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [type, setType] = useState<TypeFilter>('all')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]
    if (status !== 'all') list = list.filter((p) => p.status === status)
    if (type !== 'all') list = list.filter((p) => p.type === type)
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') list.sort((a, b) => b.price - a.price)
    return list
  }, [products, sort, status, type])

  const activeFiltersCount = (status !== 'all' ? 1 : 0) + (type !== 'all' ? 1 : 0) + (sort !== 'default' ? 1 : 0)

  if (products.length === 0) {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
        <span className="material-symbols-outlined text-4xl text-slate-300 mb-4 block">inventory_2</span>
        <p className="text-slate-500 text-[15px] mb-5">В этой категории пока нет товаров.</p>
        <a
          href={`https://wa.me/996704226587?text=${encodeURIComponent(`Здравствуйте! Ищу ${categoryName} для ${brandName}${modelName ? ` ${modelName}` : ''}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl text-[13px] font-bold uppercase hover:bg-orange-600 transition-colors"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Запросить в WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setShowFilters((v) => !v)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[12px] font-bold uppercase transition-all shrink-0 ${
            activeFiltersCount > 0
              ? 'bg-[#00234B] text-white border-[#00234B]'
              : 'bg-white text-[#00234B] border-slate-200 hover:border-orange-400'
          }`}
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <span className="material-symbols-outlined text-sm">tune</span>
          Фильтры
          {activeFiltersCount > 0 && (
            <span className="bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center ml-0.5">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <div className="flex gap-2 overflow-x-auto pb-0.5 flex-1" style={{ scrollbarWidth: 'none' }}>
          {(['default', 'price_asc', 'price_desc'] as SortKey[]).map((s) => {
            const labels = { default: 'По умолч.', price_asc: 'Цена ↑', price_desc: 'Цена ↓' }
            return (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                  sort === s
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-orange-300'
                }`}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {labels[s]}
              </button>
            )
          })}
        </div>
      </div>

      {/* Expandable filter panel */}
      {showFilters && (
        <div className="bg-white border border-slate-100 rounded-2xl p-4 mb-4 shadow-sm">
          <div className="mb-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Наличие
            </p>
            <div className="flex gap-2 flex-wrap">
              {(['all', 'В наличии', 'Под заказ'] as StatusFilter[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-all ${
                    status === s
                      ? 'bg-[#00234B] text-white border-[#00234B]'
                      : 'bg-slate-50 text-slate-500 border-transparent hover:border-slate-300'
                  }`}
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {s === 'all' ? 'Все' : s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Тип детали
            </p>
            <div className="flex gap-2 flex-wrap">
              {(['all', 'Оригинал', 'Аналог'] as TypeFilter[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-all ${
                    type === t
                      ? 'bg-[#00234B] text-white border-[#00234B]'
                      : 'bg-slate-50 text-slate-500 border-transparent hover:border-slate-300'
                  }`}
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {t === 'all' ? 'Все' : t}
                </button>
              ))}
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={() => { setStatus('all'); setType('all'); setSort('default') }}
              className="mt-4 text-[12px] text-red-500 font-bold flex items-center gap-1"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="material-symbols-outlined text-sm">close</span>
              Сбросить фильтры
            </button>
          )}
        </div>
      )}

      {/* Results count */}
      <p className="text-[12px] text-slate-400 mb-3">
        {filtered.length} из {products.length} товаров
      </p>

      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center shadow-sm">
          <span className="material-symbols-outlined text-4xl text-slate-300 mb-3 block">search_off</span>
          <p className="text-slate-500 text-[15px] mb-3">Нет товаров с такими фильтрами</p>
          <button
            onClick={() => { setStatus('all'); setType('all'); setSort('default') }}
            className="text-orange-500 text-[13px] font-bold underline"
          >
            Сбросить
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((product) => (
            <div key={product.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-orange-200 transition-all">
              <Link href={`/product/${product.id}`} className="flex gap-0">
                <div className="w-28 h-[120px] shrink-0 bg-slate-50 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={112}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-3 overflow-hidden">
                  <div className="flex gap-1.5 mb-1.5">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      product.status === 'В наличии'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {product.status}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      product.type === 'Оригинал'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {product.type}
                    </span>
                  </div>
                  <h3 className="text-[14px] font-bold text-[#00234B] leading-snug line-clamp-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{product.partNumber}</p>
                </div>
              </Link>
              <div className="flex items-center justify-between px-3 pb-3 pt-0 border-t border-slate-50 mt-0">
                <span className="text-[22px] font-black text-[#00234B]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  ${product.price}
                </span>
                <AddToCartButton product={product} compact />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
