import Shop from '@/components/pages/Shop'
import { Suspense } from 'react'

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-center">Loading...</div></div>}>
      <Shop />
    </Suspense>
  )
}
