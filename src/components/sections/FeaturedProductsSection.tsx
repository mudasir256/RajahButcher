'use client';

import ProductCard from '../ProductCard';

interface Product {
  id: string;
  category: string;
  name: string;
  slug: string;
  description: string;
  cooking_tips: string[];
  price_per_kg: number;
  images: string[];
  halal_flag: boolean;
  origin: string;
  badges: string[];
  min_order_weight: string;
  featured: boolean;
  is_active: boolean;
  variants: ProductVariant[];
}

interface ProductVariant {
  id: string;
  weight: string;
  cut: string | null;
  marinade: string;
  stock: number;
  sku: string;
  price_modifier: number;
}

interface FeaturedProductsSectionProps {
  featuredProducts: Product[];
}

// Fallback products in case data loading fails
const fallbackProducts: Product[] = [
  {
    id: "lamb-steaks-fallback",
    category: "lamb",
    name: "Lamb Steaks",
    slug: "lamb-steaks",
    description: "Thick, juicy, and packed with flavour. Cooks fast on pan, grill, or BBQ.",
    cooking_tips: ["Pan-seared with garlic & butter", "Tandoori on the BBQ"],
    price_per_kg: 17.99,
    images: ["/images/lamb-steaks.jpg"],
    halal_flag: true,
    origin: "UK",
    badges: ["Fresh Cut Daily"],
    min_order_weight: "500g",
    featured: true,
    is_active: true,
    variants: [
      {
        id: "lamb-steaks-500g",
        weight: "500g",
        cut: null,
        marinade: "None",
        stock: 10,
        sku: "LS-500",
        price_modifier: 0
      }
    ]
  },
  {
    id: "chicken-breast-fallback",
    category: "chicken",
    name: "Chicken Breast",
    slug: "chicken-breast",
    description: "Premium chicken breast, perfect for grilling or pan-frying.",
    cooking_tips: ["Grilled with herbs", "Pan-fried with lemon"],
    price_per_kg: 12.99,
    images: ["/images/chicken-fillets.jpg"],
    halal_flag: true,
    origin: "UK",
    badges: ["Fresh Cut Daily"],
    min_order_weight: "500g",
    featured: true,
    is_active: true,
    variants: [
      {
        id: "chicken-breast-500g",
        weight: "500g",
        cut: null,
        marinade: "None",
        stock: 15,
        sku: "CB-500",
        price_modifier: 0
      }
    ]
  }
];

export default function FeaturedProductsSection({ featuredProducts }: FeaturedProductsSectionProps) {
  // Use fallback products if no featured products are available
  const productsToShow = featuredProducts && featuredProducts.length > 0 ? featuredProducts : fallbackProducts;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600">Our most popular cuts, fresh daily</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsToShow.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
