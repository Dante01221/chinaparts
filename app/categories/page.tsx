import Link from 'next/link'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import { categories, brands } from '@/data/products'
import { getProducts } from '@/lib/products-store'

export const revalidate = 0

export default async function CategoriesPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pt-24 pb-32 px-container-margin max-w-2xl mx-auto">
        <h2 className="text-display font-bold text-primary-container mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Все категории
        </h2>
        <p className="text-on-surface-variant text-body-md mb-stack-lg">Выберите категорию и марку автомобиля</p>

        <div className="flex flex-col gap-stack-md">
          {categories.map((cat) => {
            const totalCount = products.filter((p) => p.categorySlug === cat.slug).length
            const brandsWithCat = brands.filter((b) =>
              products.some((p) => p.brandSlug === b.slug && p.categorySlug === cat.slug)
            )
            if (totalCount === 0) return null
            return (
              <div key={cat.slug} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                <div className="flex items-center gap-4 p-gutter border-b border-[#E2E8F0]">
                  <div className="w-10 h-10 bg-surface-container-low rounded-lg flex items-center justify-center text-primary-container shrink-0">
                    <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[16px] font-bold text-primary-container" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {cat.name}
                    </h3>
                    <p className="text-[12px] text-on-surface-variant">{cat.description} · {totalCount} товаров</p>
                  </div>
                </div>
                <div className="p-stack-md flex flex-wrap gap-2">
                  {brandsWithCat.map((brand) => {
                    const count = products.filter(
                      (p) => p.brandSlug === brand.slug && p.categorySlug === cat.slug
                    ).length
                    return (
                      <Link
                        key={brand.slug}
                        href={`/brands/${brand.slug}/${cat.slug}`}
                        className="flex items-center gap-2 px-3 py-2 bg-surface-container-low hover:bg-orange-50 hover:border-orange-300 border border-transparent rounded-lg transition-all group"
                      >
                        <span className="text-[13px] font-bold text-primary-container group-hover:text-orange-600" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {brand.name}
                        </span>
                        <span className="text-[11px] text-secondary">{count} дет.</span>
                        <span className="material-symbols-outlined text-sm text-outline group-hover:text-orange-500 transition-colors">arrow_forward</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <section className="mt-stack-lg bg-primary-container rounded-xl p-8 text-white">
          <h3 className="text-headline-md font-semibold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Не нашли нужную деталь?</h3>
          <p className="text-on-primary-container text-body-md mb-4">Закажем напрямую с заводов Китая за 7-14 дней.</p>
          <a
            href="https://wa.me/996704226587?text=Здравствуйте!+Ищу+запчасть,+которой+нет+в+каталоге."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white text-[13px] font-bold px-6 py-3 rounded-lg uppercase inline-block hover:bg-orange-600 transition-colors"
          >
            Написать в WhatsApp
          </a>
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
