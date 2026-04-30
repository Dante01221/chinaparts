'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

export default function TopBar() {
  const { count } = useCart()

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="flex justify-between items-center h-16 px-5 max-w-2xl mx-auto">
        <Link href="/brands" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              directions_car
            </span>
          </div>
          <span className="text-[17px] font-black text-[#00234B] uppercase tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Запчасти<span className="text-orange-500">.</span>
          </span>
        </Link>

        <Link href="/cart" className="relative p-2 hover:bg-slate-50 rounded-xl transition-colors">
          <span className="material-symbols-outlined text-[#00234B]" style={{ fontVariationSettings: count > 0 ? "'FILL' 1" : "'FILL' 0" }}>
            shopping_cart
          </span>
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
