import Link from 'next/link'
import { notFound } from 'next/navigation'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import { brands, categories, products } from '@/data/products'

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }))
}

export default function BrandCategoriesPage({ params }: { params: { brand: string } }) {
  const brand = brands.find((b) => b.slug === params.brand)
  if (!brand) notFound()

  const availableCategories = categories.filter((cat) =>
    products.some((p) => p.brandSlug === params.brand && p.categorySlug === cat.slug)
  )

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pt-24 pb-32 px-container-margin max-w-2xl mx-auto">
        <div className="mb-gutter">
          <div className="flex items-center gap-2 mb-stack-sm">
            <Link href="/brands" className="text-on-surface-variant text-[12px] uppercase font-medium tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Каталог
            </Link>
            <span className="material-symbols-outlined text-outline text-sm">chevron_right</span>
            <span className="text-orange-500 text-[12px] uppercase font-bold tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {brand.name}
            </span>
          </div>
          <h2 className="text-display font-bold text-primary-container" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Категории запчастей
          </h2>
          <p className="text-on-surface-variant text-body-md mt-2">
            Высокоточные компоненты для вашего авто. Выберите систему.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter">
          {availableCategories.map((cat) => {
            const count = products.filter(
              (p) => p.brandSlug === params.brand && p.categorySlug === cat.slug
            ).length

            return (
              <Link
                key={cat.slug}
                href={`/brands/${params.brand}/${cat.slug}`}
                className="bg-white border border-[#E2E8F0] rounded-xl p-stack-lg flex items-center gap-4 hover:border-orange-500 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-surface-container-low rounded-lg flex items-center justify-center text-primary-container group-hover:bg-orange-50 transition-colors shrink-0">
                  <span className="material-symbols-outlined">{cat.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-headline-md font-semibold text-primary-container text-[18px]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {cat.name}
                  </h4>
                  <p className="text-on-surface-variant text-[13px]">{cat.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[12px] font-medium text-secondary bg-surface-container-low px-2 py-1 rounded" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {count} дет.
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-orange-500 transition-colors">chevron_right</span>
              </Link>
            )
          })}
        </div>

        <section className="mt-stack-lg bg-primary-container rounded-xl p-8 text-white flex flex-col gap-4">
          <div>
            <h3 className="text-headline-md font-semibold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Не нашли нужную деталь?</h3>
            <p className="text-on-primary-container text-body-md">Мы найдём детали напрямую с заводов в Китае.</p>
          </div>
          <a
            href={`https://wa.me/996704226587?text=${encodeURIComponent(`Здравствуйте! Ищу запчасть для ${brand.name}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white text-[13px] font-bold px-6 py-3 rounded-lg uppercase whitespace-nowrap text-center hover:bg-orange-600 transition-colors"
          >
            Связаться
          </a>
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
