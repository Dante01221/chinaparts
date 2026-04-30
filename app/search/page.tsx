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
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />
      <main className="pt-20 pb-32 px-5 max-w-2xl mx-auto">

        <div className="pt-4 pb-4">
          <h2 className="text-[24px] font-black text-[#00234B]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Поиск
          </h2>
          <p className="text-[13px] text-slate-400 mt-0.5">Запчасти по названию, марке, артикулу</p>
        </div>

        <div className="relative mb-5">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Например: тормозные колодки Toyota..."
            className="w-full h-14 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all text-[14px] placeholder:text-slate-300 shadow-sm"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>

        {query.trim() === '' && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-[64px] text-slate-200 mb-4 block">search</span>
            <p className="text-slate-400 text-[15px]">Введите название запчасти или марку авто</p>
          </div>
        )}

        {query.trim() !== '' && results.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-[64px] text-slate-200 mb-4 block">sentiment_dissatisfied</span>
            <p className="text-slate-500 text-[15px] mb-5">Ничего не нашли по запросу «{query}»</p>
            <a
              href={`https://wa.me/996704226587?text=${encodeURIComponent(`Здравствуйте! Ищу запчасть: ${query}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white px-6 py-3 rounded-xl text-[13px] font-bold uppercase hover:bg-orange-600 transition-colors inline-flex items-center gap-2"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
              Запросить в WhatsApp
            </a>
          </div>
        )}

        {results.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-[12px] text-slate-400">Найдено: {results.length}</p>
            {results.map((product) => (
              <div key={product.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-orange-200 transition-all">
                <Link href={`/product/${product.id}`} className="flex">
                  <div className="w-28 h-[116px] shrink-0 bg-slate-50 overflow-hidden">
                    <Image src={product.image} alt={product.name} width={112} height={116} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-3 overflow-hidden">
                    <div className="flex gap-1.5 mb-1.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        product.status === 'В наличии' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>{product.status}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                        {product.brand}
                      </span>
                    </div>
                    <h3 className="text-[14px] font-bold text-[#00234B] leading-snug line-clamp-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{product.partNumber} · {product.category}</p>
                  </div>
                </Link>
                <div className="flex items-center justify-between px-3 pb-3 border-t border-slate-50">
                  <span className="text-[22px] font-black text-[#00234B]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    ${product.price}
                  </span>
                  <AddToCartButton product={product} compact />
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
