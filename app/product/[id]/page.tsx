import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import AddToCartButton from '@/components/AddToCartButton'
import { products } from '@/data/products'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)
  if (!product) notFound()

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pt-24 pb-32 px-container-margin max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-stack-md text-[12px] uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <Link href="/brands" className="text-on-surface-variant">Каталог</Link>
          <span className="material-symbols-outlined text-outline text-sm">chevron_right</span>
          <Link href={`/brands/${product.brandSlug}`} className="text-on-surface-variant">{product.brand}</Link>
          <span className="material-symbols-outlined text-outline text-sm">chevron_right</span>
          <Link href={`/brands/${product.brandSlug}/${product.categorySlug}`} className="text-on-surface-variant">{product.category}</Link>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden mb-gutter">
          <div className="relative w-full aspect-[4/3] bg-surface-container">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-widest ${
                product.status === 'В наличии'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${product.status === 'В наличии' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                {product.status}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-gutter mb-gutter">
          <div className="flex items-start justify-between mb-stack-md">
            <h1 className="text-headline-md font-semibold text-primary-container flex-1 pr-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {product.name}
            </h1>
            <span className="text-[12px] font-medium text-on-tertiary-fixed-variant bg-tertiary-fixed px-2 py-1 rounded shrink-0">
              {product.type}
            </span>
          </div>

          <p className="text-[12px] text-secondary mb-stack-md uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Артикул: {product.partNumber}
          </p>

          <p className="text-secondary text-body-md mb-stack-lg leading-relaxed">{product.description}</p>

          <div className="bg-slate-900 text-white p-gutter rounded-xl mb-stack-lg">
            <h3 className="text-[12px] text-slate-400 mb-stack-md flex items-center gap-2 uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <span className="material-symbols-outlined text-sm">settings_input_component</span>
              Технические данные
            </h3>
            <div className="space-y-3">
              {product.weight && (
                <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                  <span className="text-slate-400">Вес</span>
                  <span className="font-medium">{product.weight}</span>
                </div>
              )}
              {product.material && (
                <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                  <span className="text-slate-400">Материал</span>
                  <span className="font-medium">{product.material}</span>
                </div>
              )}
              <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                <span className="text-slate-400">Марка</span>
                <span className="font-medium">{product.brand} {product.model}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Производитель</span>
                <span className="font-medium">Guangdong, CN</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-stack-lg">
            <div>
              <span className="text-[12px] text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Цена</span>
              <div className="text-[32px] font-bold text-primary" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                ${product.price}
              </div>
              <span className="text-[12px] text-on-surface-variant">+ доставка</span>
            </div>
          </div>

          <div className="space-y-3">
            <AddToCartButton product={product} />
            <a
              href={`https://wa.me/996704226587?text=${encodeURIComponent(`Здравствуйте! Интересует:\n\n${product.name}\nАртикул: ${product.partNumber}\nЦена: $${product.price}\n\nМожно уточнить детали?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border-2 border-primary-container text-primary-container py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-primary-container hover:text-white transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              Спросить в WhatsApp
            </a>
          </div>
        </div>

        <div className="bg-secondary-container p-8 rounded-xl flex flex-col justify-center text-on-secondary-container">
          <span className="material-symbols-outlined text-4xl mb-4">verified</span>
          <h4 className="text-headline-md font-semibold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Гарантия качества</h4>
          <p className="text-sm opacity-80 leading-snug">
            Все запчасти проходят проверку перед отправкой. Гарантия совместимости с вашим автомобилем. Возврат в течение 14 дней.
          </p>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
