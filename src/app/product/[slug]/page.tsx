import ProductDetail from '@/components/pages/ProductDetail'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductDetail />
}
