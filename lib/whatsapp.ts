import type { CartItem } from './cart-context'

const WHATSAPP_NUMBER = '996704226587'

export function buildWhatsAppUrl(items: CartItem[], total: number): string {
  const lines = items.map((item, i) => {
    const subtotal = (item.product.price * item.quantity).toFixed(0)
    return `${i + 1}. ${item.product.name}\n   Артикул: ${item.product.partNumber}\n   Кол-во: ${item.quantity} шт. — $${subtotal}`
  })

  const message = [
    'Здравствуйте! Хочу заказать запчасти:',
    '',
    ...lines,
    '',
    `💰 ИТОГО: $${total.toFixed(0)}`,
    '(доставка рассчитывается отдельно)',
  ].join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
