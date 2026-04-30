import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pt-24 pb-32 px-container-margin max-w-2xl mx-auto">
        <h2 className="text-headline-md font-semibold text-primary-container mb-stack-md" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Мои заказы
        </h2>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center">
          <span className="material-symbols-outlined text-6xl text-outline mb-4 block">inventory_2</span>
          <p className="text-on-surface-variant text-body-md mb-6">
            Заказы оформляются через WhatsApp.
            <br />
            Свяжитесь с нами для отслеживания.
          </p>
          <a
            href="https://wa.me/996704226587"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg text-[13px] font-bold uppercase hover:bg-orange-600 transition-colors inline-flex items-center gap-2"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            Написать в WhatsApp
          </a>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
