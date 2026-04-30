'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/lib/cart-context'

export default function BottomNav() {
  const pathname = usePathname()
  const { count } = useCart()

  const links = [
    { href: '/brands', icon: 'directions_car', label: 'Марки' },
    { href: '/categories', icon: 'grid_view', label: 'Категории' },
    { href: '/cart', icon: 'shopping_cart', label: 'Корзина', badge: count },
    { href: '/search', icon: 'search', label: 'Поиск' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-t border-slate-100">
      <div className="flex justify-around items-center h-[60px] max-w-2xl mx-auto px-1">
        {links.map(({ href, icon, label, badge }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-2"
            >
              <span className={`relative flex items-center justify-center w-12 h-6 rounded-full transition-all duration-200 ${
                active ? 'bg-orange-100' : ''
              }`}>
                <span
                  className={`material-symbols-outlined text-[22px] transition-colors duration-200 ${
                    active ? 'text-orange-500' : 'text-slate-400'
                  }`}
                  style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {icon}
                </span>
                {badge != null && badge > 0 && (
                  <span className="absolute -top-1.5 -right-0.5 min-w-[16px] h-[16px] bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                    {badge}
                  </span>
                )}
              </span>
              <span
                className={`text-[10px] font-semibold transition-colors duration-200 ${
                  active ? 'text-orange-500' : 'text-slate-400'
                }`}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
