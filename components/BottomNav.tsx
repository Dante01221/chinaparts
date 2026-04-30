'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/lib/cart-context'

export default function BottomNav() {
  const pathname = usePathname()
  const { count } = useCart()

  const links = [
    { href: '/brands', icon: 'directions_car', label: 'Марки' },
    { href: '/search', icon: 'search', label: 'Поиск' },
    { href: '/cart', icon: 'shopping_cart', label: 'Корзина', badge: count },
    { href: '/orders', icon: 'history', label: 'Заказы' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 bg-white border-t border-[#E2E8F0] shadow-lg">
      {links.map(({ href, icon, label, badge }) => {
        const active = pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              active ? 'text-orange-500' : 'text-slate-400 hover:text-[#00234B]'
            }`}
          >
            <span className="relative">
              <span
                className="material-symbols-outlined"
                style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {icon}
              </span>
              {badge != null && badge > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-tighter" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
