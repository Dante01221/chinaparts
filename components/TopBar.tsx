'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

export default function TopBar() {
  const { count } = useCart()

  return (
    <header className="bg-slate-50 flex justify-between items-center w-full px-5 h-16 fixed top-0 z-50 border-b border-[#E2E8F0]">
      <div className="flex items-center gap-4">
        <Link href="/brands">
          <h1 className="text-xl font-black text-[#00234B] uppercase tracking-wider" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Запчасти из Китая
          </h1>
        </Link>
      </div>
      <Link href="/cart" className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
        <span className="material-symbols-outlined text-[#00234B]">shopping_cart</span>
        {count > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </Link>
    </header>
  )
}
