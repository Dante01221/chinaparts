import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { updateProduct, deleteProduct } from '@/lib/products-store'
import type { Product } from '@/data/products'

function checkAuth(req: NextRequest) {
  const password = req.headers.get('x-admin-password')
  const correct = process.env.ADMIN_PASSWORD || 'admin123'
  return password === correct
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = (await req.json()) as Partial<Product>
  const updated = await updateProduct(params.id, data)
  revalidatePath('/', 'layout')
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const updated = await deleteProduct(params.id)
  revalidatePath('/', 'layout')
  return NextResponse.json(updated)
}
