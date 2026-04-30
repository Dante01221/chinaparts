'use server'

export async function checkAdminPassword(password: string): Promise<boolean> {
  const correct = process.env.ADMIN_PASSWORD || 'admin123'
  return password === correct
}
