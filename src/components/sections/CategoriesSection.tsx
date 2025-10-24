'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  image_url: string;
  product_count: number;
}
interface CategoriesSectionProps {
  categories: Category[];
}

function CategoryCard({ category }: { category: Category }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div key={category.id}>
      <Link
        href={`/shop?category=${category.slug}`}
        className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-all transform hover:scale-105 block"
      >
        {!imageLoaded && !imageError && (
          <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        )}
        <img
          src={category.image_url || '/images/lamb-steaks.jpg'}
          alt={category.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        {imageError && (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-sm">Image not available</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg">{category.name}</h3>
        </div>
      </Link>
    </div>
  );
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  const categoriesRef = useScrollAnimation();

  return (
    <motion.section 
      ref={categoriesRef.ref}
      className="py-20 bg-gradient-to-b from-white to-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: categoriesRef.isVisible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600">Browse our selection of premium halal meats and groceries</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
