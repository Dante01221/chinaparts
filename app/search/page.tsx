'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import AddToCartButton from '@/components/AddToCartButton'
import { products } from '@/data/products'

export default function SearchPage() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.partNumber.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pt-24 pb-32 px-container-margin max-w-2xl mx-auto">
        <h2 className="text-headline-md font-semibold text-primary-container mb-stack-md" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Поиск запчастей
        </h2>

        <div className="relative mb-stack-lg">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Название, марка, артикул..."
            className="w-full h-14 pl-12 pr-4 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-orange-500 transition-all text-body-md placeholder:text-outline-variant"
            autoFocus
          />
        </div>

        {query.trim() === '' && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-outline mb-4 block">search</span>
            <p className="text-on-surface-variant">Введите название запчасти или марку авто</p>
          </div>
        )}

        {query.trim() !== '' && results.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-outline mb-4 block">sentiment_dissatisfied</span>
            <p className="text-on-surface-variant mb-4">Ничего не нашли по запросу «{query}»</p>
            <a
              href={`https://wa.me/996704226587?text=${encodeURIComponent(`Здравствуйте! Ищу запчасть: ${query}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg text-[13px] font-bold uppercase hover:bg-orange-600 transition-colors inline-block"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Запросить в WhatsApp
            </a>
          </div>
        )}

        {results.length > 0 && (
          <div className="flex flex-col gap-gutter">
            <p className="text-[13px] text-on-surface-variant">Найдено: {results.length}</p>
            {results.map((product) => (
              <div key={product.id} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden flex hover:shadow-md transition-shadow">
                <Link href={`/product/${product.id}`} className="w-32 h-32 shrink-0 bg-surface-container">
                  <Image src={product.image} alt={product.name} width={128} height={128} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 p-stack-md flex flex-col justify-between">
                  <div>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-[14px] font-bold text-primary leading-snug" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-[11px] text-secondary mt-1">{product.partNumber}</p>
                    <p className="text-[11px] text-on-surface-variant mt-1">{product.brand} · {product.category}</p>
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
      </main>
      <BottomNav />
    </div>
  )
}
