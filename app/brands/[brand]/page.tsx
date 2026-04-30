import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import { brands, models } from '@/data/products'
import { getProducts } from '@/lib/products-store'

export const revalidate = 0

export default async function BrandModelsPage({ params }: { params: { brand: string } }) {
  const brand = brands.find((b) => b.slug === params.brand)
  if (!brand) notFound()

  const products = await getProducts()
  const brandModels = models.filter((m) => m.brandSlug === params.brand)

  const modelsWithCount = brandModels.map((m) => ({
    ...m,
    count: products.filter((p) => p.brandSlug === params.brand && p.modelSlug === m.slug).length,
  }))

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />

      <div className="bg-[#00234B] pt-20 pb-8 px-5">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/brands" className="text-slate-400 text-[12px] uppercase font-medium tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Каталог
            </Link>
            <span className="material-symbols-outlined text-slate-600 text-sm">chevron_right</span>
            <span className="text-orange-400 text-[12px] uppercase font-bold tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {brand.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center p-2">
              <Image src={brand.image} alt={brand.name} width={48} height={48} className="w-full object-contain" />
            </div>
            <div>
              <h1 className="text-white text-[24px] font-black leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {brand.name}
              </h1>
              <p className="text-slate-400 text-[13px]">Выберите модель</p>
            </div>
          </div>
        </div>
      </div>

      <main className="pb-32 px-5 max-w-2xl mx-auto mt-5">
        <div className="flex flex-col gap-3">
          {modelsWithCount.map((model) => (
            <Link
              key={model.slug}
              href={`/brands/${params.brand}/${model.slug}`}
              className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:border-orange-400 hover:shadow-md transition-all group shadow-sm"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-[#00234B] group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors shrink-0">
                <span className="material-symbols-outlined">directions_car</span>
              </div>
              <div className="flex-1">
                <h4 className="text-[16px] font-bold text-[#00234B]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {brand.name} {model.name}
                </h4>
                <p className="text-slate-400 text-[12px] mt-0.5">
                  {model.bodyTypes.map((b) => b.name).join(' · ')}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {model.count > 0 && (
                  <span className="text-[12px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {model.count}
                  </span>
                )}
                <span className="material-symbols-outlined text-slate-300 group-hover:text-orange-500 transition-colors">chevron_right</span>
              </div>
            </Link>
          ))}

          <div className="bg-white border-2 border-dashed border-slate-200 p-4 flex items-center gap-4 hover:border-orange-400 hover:bg-orange-50 transition-all cursor-pointer group rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform shrink-0">
              <span className="material-symbols-outlined text-[20px]">add</span>
            </div>
            <div className="flex-1">
              <span className="block text-[14px] font-bold text-[#00234B]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Другая модель
              </span>
              <span className="text-[12px] text-slate-400">Запросить в WhatsApp</span>
            </div>
          </div>
        </div>

        <div className="mt-5 bg-gradient-to-br from-[#00234B] to-[#00408a] text-white p-6 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-[17px] font-black mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Не нашли свою модель?</h3>
            <p className="text-slate-300 text-[13px] mb-4">Закажем напрямую с заводов Китая за 7–14 дней.</p>
            <a
              href={`https://wa.me/996704226587?text=${encodeURIComponent(`Здравствуйте! Ищу запчасть для ${brand.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white text-[13px] font-bold px-5 py-2.5 rounded-xl inline-flex items-center gap-2 hover:bg-orange-600 transition-colors"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
              Связаться в WhatsApp
            </a>
          </div>
          <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-white/5 text-[160px]">build</span>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
