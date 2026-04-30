import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import ProductStickyBar from '@/components/ProductStickyBar'
import { getProducts } from '@/lib/products-store'

export const revalidate = 0

export default async function ProductPage({ params }: { params: { id: string } }) {
  const products = await getProducts()
  const product = products.find((p) => p.id === params.id)
  if (!product) notFound()

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />

      <main className="pt-20 pb-[148px] max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 px-5 py-3 text-[11px] uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <Link href="/brands" className="text-slate-400 hover:text-orange-500 transition-colors">Каталог</Link>
          <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
          <Link href={`/brands/${product.brandSlug}`} className="text-slate-400 hover:text-orange-500 transition-colors">{product.brand}</Link>
          <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
          <Link href={`/brands/${product.brandSlug}/${product.categorySlug}`} className="text-slate-400 hover:text-orange-500 transition-colors">{product.category}</Link>
        </div>

        {/* Product image */}
        <div className="relative w-full aspect-[4/3] bg-white">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
          <div className="absolute top-4 left-4">
            <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
              product.status === 'В наличии'
                ? 'bg-green-500 text-white'
                : 'bg-amber-500 text-white'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              {product.status}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${
              product.type === 'Оригинал'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-white'
            }`}>
              {product.type}
            </span>
          </div>
        </div>

        {/* Product info */}
        <div className="px-5 pt-5">
          <p className="text-[11px] text-slate-400 uppercase tracking-widest mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Арт. {product.partNumber}
          </p>
          <h1 className="text-[22px] font-black text-[#00234B] leading-tight mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {product.name}
          </h1>

          {product.description && (
            <p className="text-slate-500 text-[14px] leading-relaxed mb-5">{product.description}</p>
          )}

          {/* Tech specs */}
          <div className="bg-[#00234B] text-white p-5 rounded-2xl mb-5">
            <h3 className="text-[11px] text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <span className="material-symbols-outlined text-sm">settings_input_component</span>
              Технические данные
            </h3>
            <div className="space-y-3">
              {product.weight && (
                <div className="flex justify-between text-[13px] border-b border-white/10 pb-3">
                  <span className="text-slate-400">Вес</span>
                  <span className="font-semibold">{product.weight}</span>
                </div>
              )}
              {product.material && (
                <div className="flex justify-between text-[13px] border-b border-white/10 pb-3">
                  <span className="text-slate-400">Материал</span>
                  <span className="font-semibold">{product.material}</span>
                </div>
              )}
              <div className="flex justify-between text-[13px] border-b border-white/10 pb-3">
                <span className="text-slate-400">Марка / Модель</span>
                <span className="font-semibold">{product.brand} {product.model}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-400">Производство</span>
                <span className="font-semibold">Guangdong, CN 🇨🇳</span>
              </div>
            </div>
          </div>

          {/* Guarantee card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-green-500 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#00234B] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Гарантия качества</h4>
              <p className="text-slate-400 text-[13px] leading-relaxed">Все запчасти проходят проверку перед отправкой. Гарантия совместимости. Возврат в течение 14 дней.</p>
            </div>
          </div>
        </div>
      </main>

      <ProductStickyBar product={product} />
      <BottomNav />
    </div>
  )
}
