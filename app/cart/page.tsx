'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()

  const handleCheckout = () => {
    if (items.length === 0) return
    const url = buildWhatsAppUrl(items, total)
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />
      <main className="pt-20 pb-40 px-5 max-w-lg mx-auto">

        <div className="pt-4 pb-4">
          <h2 className="text-[24px] font-black text-[#00234B]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Корзина
          </h2>
          <p className="text-[13px] text-slate-400 mt-0.5">
            {items.length === 0
              ? 'Корзина пуста'
              : `${items.reduce((s, i) => s + i.quantity, 0)} дет. готовы к заказу`}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm mt-2">
            <span className="material-symbols-outlined text-6xl text-slate-200 mb-4 block">shopping_cart</span>
            <p className="text-slate-400 text-[15px] mb-6">Добавьте запчасти из каталога</p>
            <Link
              href="/brands"
              className="bg-orange-500 text-white px-6 py-3 rounded-xl text-[13px] font-bold uppercase hover:bg-orange-600 transition-colors inline-block"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="flex gap-3 p-3">
                    <Link href={`/product/${product.id}`} className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/product/${product.id}`} className="flex-1">
                          <h3 className="text-[13px] font-bold text-[#00234B] leading-snug line-clamp-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {product.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-slate-300 hover:text-red-400 transition-colors shrink-0 mt-0.5"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{product.partNumber}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          product.type === 'Оригинал'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}>{product.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-3 pb-3">
                    {/* Quantity stepper */}
                    <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500 hover:text-[#00234B] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                      </button>
                      <span className="w-6 text-center text-[14px] font-bold text-[#00234B]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500 hover:text-[#00234B] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>

                    <span className="text-[20px] font-black text-[#00234B]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      ${(product.price * quantity).toFixed(0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="mt-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Итого
              </h3>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-[14px] text-slate-500">
                  <span>Сумма за товары</span>
                  <span className="font-semibold text-[#00234B]">${total.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-[14px] text-slate-500">
                  <span>Доставка (авиа)</span>
                  <span className="font-semibold text-amber-600">По запросу</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                  <span className="text-[15px] font-black text-[#00234B]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>К оплате</span>
                  <span className="text-[28px] font-black text-[#00234B]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    ${total.toFixed(0)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-orange-500 text-white font-black py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 active:scale-[0.98] transition-all text-[15px] uppercase tracking-wide"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                Оформить через WhatsApp
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

              <p className="text-center text-[11px] mt-3 text-slate-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Вы будете перенаправлены в WhatsApp
              </p>
            </div>
          </>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
