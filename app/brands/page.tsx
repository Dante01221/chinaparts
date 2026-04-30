import Link from 'next/link'
import Image from 'next/image'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import { brands } from '@/data/products'
import { getProducts } from '@/lib/products-store'

export const revalidate = 0

export default async function BrandsPage() {
  const products = await getProducts()

  const brandsWithCount = brands.map((b) => ({
    ...b,
    count: products.filter((p) => p.brandSlug === b.slug).length,
  }))

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="flex-grow pt-24 pb-32 px-container-margin max-w-2xl mx-auto w-full">
        <section className="mb-stack-lg">
          <div className="mb-stack-md">
            <h2 className="text-headline-md font-bold text-primary-container mb-stack-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Выберите марку автомобиля
            </h2>
            <p className="text-secondary text-body-md">Профессиональные комплектующие для ведущих производителей.</p>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-gutter">
          {brandsWithCount.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="bg-white border border-[#E2E8F0] p-6 flex flex-col items-center justify-center gap-4 hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer group rounded-lg"
            >
              <div className="w-20 h-20 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                <Image src={brand.image} alt={brand.name} width={80} height={80} className="w-full object-contain" />
              </div>
              <div className="text-center">
                <span className="block text-[12px] font-medium uppercase tracking-widest text-primary" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {brand.name}
                </span>
                <span className="text-[13px] font-semibold text-secondary">{brand.count} запчастей</span>
              </div>
            </Link>
          ))}

          <div className="bg-slate-50 border-2 border-dashed border-[#E2E8F0] p-6 flex flex-col items-center justify-center gap-4 hover:border-orange-500 hover:bg-orange-50 transition-all cursor-pointer group rounded-lg">
            <div className="w-12 h-12 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">add</span>
            </div>
            <div className="text-center">
              <span className="block text-[12px] font-medium uppercase tracking-widest text-primary-container" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Другая марка
              </span>
              <span className="text-[13px] font-semibold text-secondary">Запросить каталог</span>
            </div>
          </div>
        </div>

        <section className="mt-stack-lg">
          <div className="bg-primary-container text-white p-8 rounded-lg relative overflow-hidden flex flex-col justify-between min-h-[180px]">
            <div className="relative z-10">
              <h3 className="text-headline-md font-semibold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>VIN Поиск</h3>
              <p className="text-primary-fixed-dim text-body-md">Напишите нам в WhatsApp — найдём деталь по VIN за 24 часа.</p>
            </div>
            <div className="relative z-10 mt-4">
              <a
                href="https://wa.me/996704226587?text=Здравствуйте!+Хочу+найти+запчасть+по+VIN."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-container text-[13px] font-semibold px-6 py-3 rounded uppercase tracking-wider hover:bg-slate-100 transition-colors inline-block"
              >
                Написать в WhatsApp
              </a>
            </div>
            <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-white/10 text-[180px]">construction</span>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
