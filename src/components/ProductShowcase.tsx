/**
 * Example Component: Product Showcase
 * 
 * Demonstrates how to use the product mapping system
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { useProducts, useFeaturedProducts, useCategories, useProductStats } from '../hooks/useProducts';
import { productMapper } from '../utils/productMapper';

export default function ProductShowcase() {
  const { products, loading: productsLoading } = useProducts();
  const { products: featuredProducts, loading: featuredLoading } = useFeaturedProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  const { stats, loading: statsLoading } = useProductStats();

  if (productsLoading || featuredLoading || categoriesLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Product Showcase</h1>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold text-emerald-600">{stats?.totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Categories</h3>
          <p className="text-2xl font-bold text-emerald-600">{stats?.totalCategories}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Featured</h3>
          <p className="text-2xl font-bold text-emerald-600">{stats?.featuredProducts}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">In Stock</h3>
          <p className="text-2xl font-bold text-emerald-600">{stats?.productsInStock}</p>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🥩</span>
              </div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.product_count} products</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.slice(0, 6).map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="aspect-square bg-gray-100">
                <Image
                  src={product.images[0] || '/images/lamb-steaks.jpg'}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-emerald-600 font-bold text-lg mb-2">
                  £{product.price_per_kg}/kg
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {product.badges.map((badge: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600">{product.variants.length} variants</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Search Demo */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Search Demo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2">Lamb Products</h3>
            <div className="space-y-1">
              {productMapper.getProductsByCategory('lamb').map((product) => (
                <div key={product.id} className="text-sm text-gray-600">
                  {product.name} - £{product.price_per_kg}/kg
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2">Under £10</h3>
            <div className="space-y-1">
              {productMapper.getProductsByPriceRange('under_10').map((product) => (
                <div key={product.id} className="text-sm text-gray-600">
                  {product.name} - £{product.price_per_kg}/kg
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2">BBQ Ready</h3>
            <div className="space-y-1">
              {productMapper.getProductsByBadge('BBQ Ready').map((product) => (
                <div key={product.id} className="text-sm text-gray-600">
                  {product.name} - £{product.price_per_kg}/kg
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* All Products Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All Products</h2>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Variants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-lg">🥩</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.origin}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 capitalize">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-emerald-600">
                        £{product.price_per_kg}/kg
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{product.variants.length}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.featured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          Featured
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
