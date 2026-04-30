'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/data/products'

interface Props {
  product: Product
  compact?: boolean
}

export default function AddToCartButton({ product, compact }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (compact) {
    return (
      <button
        onClick={handleAdd}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[12px] font-bold uppercase transition-all ${
          added
            ? 'bg-green-500 text-white'
            : 'bg-orange-500 text-white hover:bg-orange-600 active:scale-95'
        }`}
        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
      >
        <span className="material-symbols-outlined text-sm">{added ? 'check' : 'add_shopping_cart'}</span>
        {added ? 'Добавлено' : 'В корзину'}
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm transition-all ${
        added
          ? 'bg-green-500 text-white'
          : 'bg-orange-500 text-white hover:bg-orange-600 active:scale-[0.98]'
      }`}
      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
    >
      {added ? '✓ Добавлено в корзину' : 'Добавить в корзину'}
    </button>
  )
}
