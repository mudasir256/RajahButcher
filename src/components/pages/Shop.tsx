'use client';

import { useEffect, useState, useCallback } from 'react';
import { Filter, X } from 'lucide-react';
import ProductCard from '../ProductCard';
import { useSearchParams } from 'next/navigation';
import productsData from '../../../products-complete.json';

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

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  image_url: string;
  product_count: number;
}

export default function Shop() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams?.get('category') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter);
  const [priceRange, setPriceRange] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    
    // Load categories from JSON
    const categoriesData = productsData.categories.sort((a, b) => a.display_order - b.display_order);
    setCategories(categoriesData);
    
    // Load products from JSON
    const productsData_filtered = productsData.products.filter(product => product.is_active);
    setProducts(productsData_filtered);
    
    setLoading(false);
  };

  const filterProducts = useCallback(() => {
    setLoading(true);
    
    let filteredProducts = productsData.products.filter(product => product.is_active);

    // Filter by category
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange) {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.price_per_kg;
        switch (priceRange) {
          case 'under-10':
            return price < 10;
          case '10-20':
            return price >= 10 && price < 20;
          case '20-50':
            return price >= 20 && price < 50;
          case 'over-50':
            return price >= 50;
          default:
            return true;
        }
      });
    }

    setProducts(filteredProducts);
    setLoading(false);
  }, [selectedCategory, priceRange]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filterProducts, categoryFilter]);

  useEffect(() => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
  }, [categoryFilter]);

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange('');
  };

  const activeFiltersCount = [selectedCategory, priceRange].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Shop Halal Meats & Groceries</h1>
          <p className="text-emerald-100">Fresh cuts and authentic ingredients delivered to your door</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-emerald-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
          <div className="text-sm text-gray-600">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </div>
        </div>

        <div className="flex gap-8">
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block fixed lg:relative inset-0 lg:inset-auto z-40 lg:z-auto bg-white lg:bg-transparent lg:w-64 flex-shrink-0`}>
            <div className="lg:sticky lg:top-24 h-full lg:h-auto overflow-y-auto p-6 lg:p-0">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-white lg:bg-gray-50 rounded-2xl p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Filters</h3>
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === ''}
                            onChange={() => setSelectedCategory('')}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">All Products</span>
                        </label>
                        {categories.map((category) => (
                          <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="category"
                              checked={selectedCategory === category.slug}
                              onChange={() => setSelectedCategory(category.slug)}
                              className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-gray-700">{category.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="price"
                            checked={priceRange === ''}
                            onChange={() => setPriceRange('')}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">Any Price</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="price"
                            checked={priceRange === 'under-10'}
                            onChange={() => setPriceRange('under-10')}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">Under £10</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="price"
                            checked={priceRange === '10-20'}
                            onChange={() => setPriceRange('10-20')}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">£10 - £20</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="price"
                            checked={priceRange === '20-50'}
                            onChange={() => setPriceRange('20-50')}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">£20 - £50</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="price"
                            checked={priceRange === 'over-50'}
                            onChange={() => setPriceRange('over-50')}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">Over £50</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
