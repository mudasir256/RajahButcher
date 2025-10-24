/**
 * Product Mapping Utility for Rajah's Supermarket
 * 
 * This utility provides easy access to product data with various mapping functions
 */

import productsData from '../../products-complete.json';

export interface Product {
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

export interface ProductVariant {
  id: string;
  weight: string;
  cut: string | null;
  marinade: string;
  stock: number;
  sku: string;
  price_modifier: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  image_url: string;
  product_count: number;
}

export class ProductMapper {
  private products: Product[];
  private categories: Category[];
  private mappings: any;

  constructor() {
    this.products = productsData.products;
    this.categories = productsData.categories;
    this.mappings = productsData.mappings;
  }

  // Get all products
  getAllProducts(): Product[] {
    return this.products;
  }

  // Get all categories
  getAllCategories(): Category[] {
    return this.categories;
  }

  // Get product by ID
  getProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  // Get product by slug
  getProductBySlug(slug: string): Product | undefined {
    return this.products.find(product => product.slug === slug);
  }

  // Get products by category
  getProductsByCategory(categorySlug: string): Product[] {
    const productIds = this.mappings.by_category[categorySlug] || [];
    return productIds.map((id: string) => this.getProductById(id)).filter(Boolean) as Product[];
  }

  // Get featured products
  getFeaturedProducts(): Product[] {
    const productIds = this.mappings.by_featured.featured;
    return productIds.map((id: string) => this.getProductById(id)).filter(Boolean) as Product[];
  }

  // Get products by price range
  getProductsByPriceRange(range: 'under_10' | '10_20' | '20_50' | 'over_50'): Product[] {
    const productIds = this.mappings.by_price_range[range] || [];
    return productIds.map((id: string) => this.getProductById(id)).filter(Boolean) as Product[];
  }

  // Get products by origin
  getProductsByOrigin(origin: string): Product[] {
    const productIds = this.mappings.by_origin[origin] || [];
    return productIds.map((id: string) => this.getProductById(id)).filter(Boolean) as Product[];
  }

  // Get products by badge
  getProductsByBadge(badge: string): Product[] {
    const productIds = this.mappings.by_badges[badge] || [];
    return productIds.map((id: string) => this.getProductById(id)).filter(Boolean) as Product[];
  }

  // Search products by name or description
  searchProducts(query: string): Product[] {
    const lowercaseQuery = query.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.badges.some(badge => badge.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Get products with variants in stock
  getProductsInStock(): Product[] {
    return this.products.filter(product => 
      product.variants.some(variant => variant.stock > 0)
    );
  }

  // Get products with low stock (less than 10)
  getProductsLowStock(): Product[] {
    return this.products.filter(product => 
      product.variants.some(variant => variant.stock > 0 && variant.stock < 10)
    );
  }

  // Get category by slug
  getCategoryBySlug(slug: string): Category | undefined {
    return this.categories.find(category => category.slug === slug);
  }

  // Get all unique origins
  getAllOrigins(): string[] {
    return [...new Set(this.products.map(product => product.origin))];
  }

  // Get all unique badges
  getAllBadges(): string[] {
    const allBadges = this.products.flatMap(product => product.badges);
    return [...new Set(allBadges)];
  }

  // Get all unique marinades
  getAllMarinades(): string[] {
    const allMarinades = this.products.flatMap(product => 
      product.variants.map(variant => variant.marinade)
    );
    return [...new Set(allMarinades)].filter(marinade => marinade !== 'None');
  }

  // Get all unique cuts
  getAllCuts(): string[] {
    const allCuts = this.products.flatMap(product => 
      product.variants.map(variant => variant.cut).filter((cut): cut is string => cut !== null)
    );
    return [...new Set(allCuts)];
  }

  // Get all unique weights
  getAllWeights(): string[] {
    const allWeights = this.products.flatMap(product => 
      product.variants.map(variant => variant.weight)
    );
    return [...new Set(allWeights)];
  }

  // Calculate total inventory value
  getTotalInventoryValue(): number {
    return this.products.reduce((total, product) => {
      const productValue = product.variants.reduce((variantTotal, variant) => {
        const weightInKg = this.parseWeightToKg(variant.weight);
        const price = product.price_per_kg + variant.price_modifier;
        return variantTotal + (price * weightInKg * variant.stock);
      }, 0);
      return total + productValue;
    }, 0);
  }

  // Get product statistics
  getProductStats() {
    return {
      totalProducts: this.products.length,
      totalCategories: this.categories.length,
      totalVariants: this.products.reduce((sum, product) => sum + product.variants.length, 0),
      featuredProducts: this.getFeaturedProducts().length,
      totalInventoryValue: this.getTotalInventoryValue(),
      averagePrice: this.products.reduce((sum, product) => sum + product.price_per_kg, 0) / this.products.length,
      productsInStock: this.getProductsInStock().length,
      lowStockProducts: this.getProductsLowStock().length
    };
  }

  // Helper function to parse weight to kg
  private parseWeightToKg(weight: string): number {
    if (weight.includes('kg')) {
      return parseFloat(weight.replace('kg', ''));
    } else if (weight.includes('g')) {
      return parseFloat(weight.replace('g', '')) / 1000;
    } else if (weight.includes('pieces')) {
      return parseFloat(weight.replace(' pieces', '')) * 0.1; // Assume 100g per piece
    } else if (weight.includes('ml')) {
      return parseFloat(weight.replace('ml', '')) / 1000; // Convert ml to kg (approximate)
    }
    return 0;
  }

  // Get products with specific variant
  getProductsWithVariant(weight?: string, cut?: string, marinade?: string): Product[] {
    return this.products.filter(product => 
      product.variants.some(variant => 
        (!weight || variant.weight === weight) &&
        (!cut || variant.cut === cut) &&
        (!marinade || variant.marinade === marinade)
      )
    );
  }

  // Get random products
  getRandomProducts(count: number): Product[] {
    const shuffled = [...this.products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Get products by multiple filters
  getProductsByFilters(filters: {
    category?: string;
    priceRange?: 'under_10' | '10_20' | '20_50' | 'over_50';
    origin?: string;
    badge?: string;
    featured?: boolean;
    inStock?: boolean;
  }): Product[] {
    let filteredProducts = this.products;

    if (filters.category) {
      filteredProducts = this.getProductsByCategory(filters.category);
    }

    if (filters.priceRange) {
      const priceRangeProducts = this.getProductsByPriceRange(filters.priceRange);
      filteredProducts = filteredProducts.filter(product => 
        priceRangeProducts.some(p => p.id === product.id)
      );
    }

    if (filters.origin) {
      filteredProducts = filteredProducts.filter(product => product.origin === filters.origin);
    }

    if (filters.badge) {
      filteredProducts = filteredProducts.filter(product => 
        product.badges.includes(filters.badge!)
      );
    }

    if (filters.featured !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.featured === filters.featured);
    }

    if (filters.inStock) {
      filteredProducts = filteredProducts.filter(product => 
        product.variants.some(variant => variant.stock > 0)
      );
    }

    return filteredProducts;
  }
}

// Export singleton instance
export const productMapper = new ProductMapper();

// Export utility functions
export const getProductById = (id: string) => productMapper.getProductById(id);
export const getProductBySlug = (slug: string) => productMapper.getProductBySlug(slug);
export const getProductsByCategory = (categorySlug: string) => productMapper.getProductsByCategory(categorySlug);
export const getFeaturedProducts = () => productMapper.getFeaturedProducts();
export const searchProducts = (query: string) => productMapper.searchProducts(query);
export const getAllProducts = () => productMapper.getAllProducts();
export const getAllCategories = () => productMapper.getAllCategories();
export const getProductStats = () => productMapper.getProductStats();

