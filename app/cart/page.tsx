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
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pt-20 pb-40 px-container-margin max-w-lg mx-auto">
        <section className="mb-stack-lg pt-4">
          <h2 className="text-headline-md font-semibold text-primary mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Ваша корзина
          </h2>
          <p className="text-[13px] font-semibold text-on-surface-variant">
            {items.length === 0
              ? 'Корзина пуста'
              : `${items.reduce((s, i) => s + i.quantity, 0)} деталей готовы к заказу`}
          </p>
        </section>

        {items.length === 0 ? (
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-outline mb-4 block">shopping_cart</span>
            <p className="text-on-surface-variant text-body-md mb-6">Добавьте запчасти из каталога</p>
            <Link
              href="/brands"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg text-[13px] font-bold uppercase hover:bg-orange-600 transition-colors inline-block"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-stack-md">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="bg-surface-container-lowest border border-outline-variant p-stack-md flex gap-4">
                  <Link href={`/product/${product.id}`} className="w-24 h-24 bg-surface-container overflow-hidden border border-outline-variant shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="text-[12px] font-bold text-on-surface leading-snug" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {product.name}
                          </h3>
                        </Link>
                        <button onClick={() => removeItem(product.id)} className="text-error ml-2 shrink-0">
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                      <p className="text-[10px] text-secondary mt-1">{product.partNumber}</p>
                      <span className={`text-[10px] font-bold px-1 mt-1 inline-block ${
                        product.type === 'Оригинал'
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                          : 'bg-primary-fixed text-on-primary-fixed-variant'
                      }`}>
                        {product.type}
                      </span>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <div className="flex items-center border border-outline-variant overflow-hidden">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2 py-1 bg-surface-container hover:bg-surface-variant transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="px-3 text-sm font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2 py-1 bg-surface-container hover:bg-surface-variant transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-on-surface-variant">Subtotal</span>
                        <span className="text-[20px] font-bold text-primary" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          ${(product.price * quantity).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <section className="mt-stack-lg bg-surface-container-low border border-outline-variant p-stack-lg">
              <h3 className="text-[12px] font-bold text-primary mb-stack-md uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                ИТОГО
              </h3>
              <div className="space-y-base mb-stack-lg">
                <div className="flex justify-between text-[13px] font-semibold text-on-surface-variant">
                  <span>Сумма за товары</span>
                  <span>${total.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-[13px] font-semibold text-on-surface-variant">
                  <span>Доставка (Авиа)</span>
                  <span className="text-on-tertiary-fixed-variant">Рассчитывается отдельно</span>
                </div>
                <div className="border-t border-outline-variant pt-base flex justify-between items-center">
                  <span className="text-sm uppercase font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>К ОПЛАТЕ</span>
                  <span className="text-[24px] font-bold text-primary" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    ${total.toFixed(0)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#FF6B00] text-white font-bold py-4 px-6 flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all rounded"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <span className="material-symbols-outlined">chat</span>
                <span>Оформить через WhatsApp</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

              <p className="text-center text-[10px] mt-4 text-on-surface-variant uppercase tracking-tighter" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Вы будете перенаправлены в WhatsApp
              </p>
            </section>
          </>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
