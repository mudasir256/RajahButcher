/**
 * React Hook for Product Management
 * 
 * Provides easy access to product data in React components
 */

import { useState, useEffect, useMemo } from 'react';
import { productMapper, Product, ProductVariant, Category } from '../utils/productMapper';

export interface ProductFilters {
  category?: string;
  priceRange?: 'under_10' | '10_20' | '20_50' | 'over_50';
  origin?: string;
  badge?: string;
  featured?: boolean;
  inStock?: boolean;
  search?: string;
}

export interface ProductStats {
  totalProducts: number;
  totalCategories: number;
  totalVariants: number;
  featuredProducts: number;
  totalInventoryValue: number;
  averagePrice: number;
  productsInStock: number;
  lowStockProducts: number;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setProducts(productMapper.getAllProducts());
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { products, loading };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundProduct = productMapper.getProductById(id);
      setProduct(foundProduct || null);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [id]);

  return { product, loading };
}

export function useProductBySlug(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundProduct = productMapper.getProductBySlug(slug);
      setProduct(foundProduct || null);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [slug]);

  return { product, loading };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCategories(productMapper.getAllCategories());
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { categories, loading };
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(productMapper.getFeaturedProducts());
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { products, loading };
}

export function useProductSearch(query: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const results = productMapper.searchProducts(query);
      setProducts(results);
      setLoading(false);
    }, 300); // Debounce search

    return () => clearTimeout(timer);
  }, [query]);

  return { products, loading };
}

export function useFilteredProducts(filters: ProductFilters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let filteredProducts = productMapper.getProductsByFilters(filters);

      // Apply search filter if provided
      if (filters.search) {
        filteredProducts = productMapper.searchProducts(filters.search);
      }

      setProducts(filteredProducts);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [filters]);

  return { products, loading };
}

export function useProductStats() {
  const [stats, setStats] = useState<ProductStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(productMapper.getProductStats());
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { stats, loading };
}

export function useProductVariants(productId: string) {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const product = productMapper.getProductById(productId);
      setVariants(product?.variants || []);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [productId]);

  return { variants, loading };
}

export function useProductOptions() {
  const [options, setOptions] = useState({
    origins: [] as string[],
    badges: [] as string[],
    marinades: [] as string[],
    cuts: [] as string[],
    weights: [] as string[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOptions({
        origins: productMapper.getAllOrigins(),
        badges: productMapper.getAllBadges(),
        marinades: productMapper.getAllMarinades(),
        cuts: productMapper.getAllCuts(),
        weights: productMapper.getAllWeights()
      });
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { options, loading };
}

// Custom hook for product cart operations
export function useProductCart() {
  const [cartItems, setCartItems] = useState<Array<{
    product: Product;
    variant: ProductVariant;
    quantity: number;
  }>>([]);

  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    const existingItem = cartItems.find(
      item => item.product.id === product.id && item.variant.id === variant.id
    );

    if (existingItem) {
      setCartItems(prev => 
        prev.map(item => 
          item.product.id === product.id && item.variant.id === variant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems(prev => [...prev, { product, variant, quantity }]);
    }
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCartItems(prev => 
      prev.filter(item => 
        !(item.product.id === productId && item.variant.id === variantId)
      )
    );
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId && item.variant.id === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const weightInKg = parseWeightToKg(item.variant.weight);
      const price = item.product.price_per_kg + item.variant.price_modifier;
      return total + (price * weightInKg * item.quantity);
    }, 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  };
}

// Helper function to parse weight to kg
function parseWeightToKg(weight: string): number {
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

