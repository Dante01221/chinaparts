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
  categoryName: string
}

export default function ProductFilters({ products, brandSlug, brandName, categoryName }: Props) {
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
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center">
        <span className="material-symbols-outlined text-4xl text-outline mb-4 block">inventory_2</span>
        <p className="text-on-surface-variant text-body-md mb-4">В этой категории пока нет товаров.</p>
        <a
          href={`https://wa.me/996704226587?text=${encodeURIComponent(`Здравствуйте! Ищу ${categoryName} для ${brandName}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg text-[13px] font-bold uppercase hover:bg-orange-600 transition-colors"
        >
          Запросить в WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-stack-md">
        <button
          onClick={() => setShowFilters((v) => !v)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[12px] font-bold uppercase transition-all shrink-0 ${
            activeFiltersCount > 0
              ? 'bg-primary-container text-white border-primary-container'
              : 'bg-white text-primary-container border-[#E2E8F0] hover:border-orange-500'
          }`}
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <span className="material-symbols-outlined text-sm">tune</span>
          Фильтры
          {activeFiltersCount > 0 && (
            <span className="bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center ml-1">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none flex-1">
          {/* Sort chips */}
          {(['default', 'price_asc', 'price_desc'] as SortKey[]).map((s) => {
            const labels = { default: 'По умолчанию', price_asc: 'Цена ↑', price_desc: 'Цена ↓' }
            return (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase border transition-all ${
                  sort === s
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-secondary border-[#E2E8F0] hover:border-orange-300'
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
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-gutter mb-stack-md">
          <div className="mb-stack-md">
            <p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Наличие
            </p>
            <div className="flex gap-2 flex-wrap">
              {(['all', 'В наличии', 'Под заказ'] as StatusFilter[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-all ${
                    status === s
                      ? 'bg-primary-container text-white border-primary-container'
                      : 'bg-surface-container-low text-secondary border-transparent hover:border-outline-variant'
                  }`}
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {s === 'all' ? 'Все' : s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Тип детали
            </p>
            <div className="flex gap-2 flex-wrap">
              {(['all', 'Оригинал', 'Аналог'] as TypeFilter[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-all ${
                    type === t
                      ? 'bg-primary-container text-white border-primary-container'
                      : 'bg-surface-container-low text-secondary border-transparent hover:border-outline-variant'
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
              className="mt-stack-md text-[12px] text-error font-bold flex items-center gap-1"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="material-symbols-outlined text-sm">close</span>
              Сбросить фильтры
            </button>
          )}
        </div>
      )}

      {/* Results count */}
      <p className="text-[13px] text-on-surface-variant mb-stack-md">
        {filtered.length} из {products.length} товаров
      </p>

      {filtered.length === 0 ? (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-10 text-center">
          <span className="material-symbols-outlined text-4xl text-outline mb-3 block">search_off</span>
          <p className="text-on-surface-variant text-body-md mb-3">Нет товаров с такими фильтрами</p>
          <button
            onClick={() => { setStatus('all'); setType('all'); setSort('default') }}
            className="text-orange-500 text-[13px] font-bold underline"
          >
            Сбросить
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-gutter">
          {filtered.map((product) => (
            <div key={product.id} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden flex hover:shadow-md transition-shadow">
              <Link href={`/product/${product.id}`} className="w-32 h-32 shrink-0 bg-surface-container">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="flex-1 p-stack-md flex flex-col justify-between overflow-hidden">
                <div>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-[14px] font-bold text-primary leading-snug truncate" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-[11px] text-secondary mt-0.5">{product.partNumber}</p>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      product.status === 'В наличии'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      product.type === 'Оригинал'
                        ? 'bg-primary-fixed text-on-primary-fixed-variant'
                        : 'bg-surface-container text-secondary'
                    }`}>
                      {product.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[20px] font-bold text-primary" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    ${product.price}
                  </span>
                  <AddToCartButton product={product} compact />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
