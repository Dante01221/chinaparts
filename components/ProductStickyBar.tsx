'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/data/products'

export default function ProductStickyBar({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="fixed bottom-[60px] left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-100">
      <div className="flex items-center gap-3 px-5 py-3 max-w-2xl mx-auto">
        <div className="shrink-0">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest block" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Цена</span>
          <span className="text-[26px] font-black text-[#00234B] leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>${product.price}</span>
        </div>
        <a
          href={`https://wa.me/996704226587?text=${encodeURIComponent(`Здравствуйте! Интересует:\n\n${product.name}\nАртикул: ${product.partNumber}\nЦена: $${product.price}\n\nМожно уточнить детали?`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 border-2 border-[#00234B] text-[#00234B] rounded-xl font-bold text-[13px] flex items-center gap-1.5 hover:bg-[#00234B] hover:text-white transition-all shrink-0"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
          WhatsApp
        </a>
        <button
          onClick={handleAdd}
          className={`flex-1 py-3 rounded-xl font-bold text-[13px] uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-orange-500 text-white hover:bg-orange-600 active:scale-95'
          }`}
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <span className="material-symbols-outlined text-[16px]">{added ? 'check' : 'add_shopping_cart'}</span>
          {added ? 'Добавлено!' : 'В корзину'}
        </button>
      </div>
    </div>
  )
}
