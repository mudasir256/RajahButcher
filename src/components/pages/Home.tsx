'use client';

import { useEffect, useState } from 'react';
import productsData from '../../../products-complete.json';
import HeroSlider from '../HeroSlider';
import FeaturesSection from '../sections/FeaturesSection';
import CategoriesSection from '../sections/CategoriesSection';
import FeaturedProductsSection from '../sections/FeaturedProductsSection';
import StatisticsSection from '../sections/StatisticsSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import CookingTipsSection from '../sections/CookingTipsSection';
import QualityPromiseSection from '../sections/QualityPromiseSection';
import NewsletterSection from '../sections/NewsletterSection';
import ContactInfoSection from '../sections/ContactInfoSection';
import FinalCTASection from '../sections/FinalCTASection';
import { Suspense } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  image_url: string;
  product_count: number;
}

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

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [showMoreSections, setShowMoreSections] = useState(false);

  useEffect(() => {
    loadData();
    // Load additional sections after initial render
    const timer = setTimeout(() => {
      setShowMoreSections(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const loadData = () => {
    try {
      // Load categories from JSON
      const categoriesData = productsData.categories.sort((a, b) => a.display_order - b.display_order);
      setCategories(categoriesData);
      
      // Load featured products from JSON
      const featuredProductsData = productsData.products
        .filter(product => product.featured && product.is_active)
        .slice(0, 4);
      
      console.log('Featured products loaded:', featuredProductsData.length);
      setFeaturedProducts(featuredProductsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-amber-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <HeroSlider />
        </div>
      </section>

      <FeaturesSection />
      <CategoriesSection categories={categories} />
      <FeaturedProductsSection featuredProducts={featuredProducts} />

      {showMoreSections && (
        <Suspense fallback={<div className="h-20 bg-gray-50 animate-pulse" />}>
          <StatisticsSection />
          <TestimonialsSection />
          <CookingTipsSection />
          <QualityPromiseSection />
          <NewsletterSection />
          <ContactInfoSection />
          <FinalCTASection />
        </Suspense>
      )}
    </div>
  );
}
