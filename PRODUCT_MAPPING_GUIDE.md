# 🗂️ Complete Product JSON & Mapping System

This comprehensive system provides easy access to all your product data with powerful mapping and filtering capabilities.

## 📁 Files Created

### 1. **`products-complete.json`** - Complete Product Database
- **25 Products** across 10 categories
- **85+ Product Variants** with different weights, cuts, and marinades
- **High-quality images** from Pexels
- **Comprehensive mappings** for easy filtering
- **Delivery zones** and site settings

### 2. **`src/utils/productMapper.ts`** - Mapping Utility
- **ProductMapper class** with 20+ methods
- **Easy filtering** by category, price, origin, badges
- **Search functionality** across names and descriptions
- **Statistics and analytics** functions
- **TypeScript support** with full type definitions

### 3. **`src/hooks/useProducts.ts`** - React Hooks
- **Custom hooks** for React components
- **Loading states** and error handling
- **Cart management** functionality
- **Real-time filtering** and search
- **Optimized performance** with memoization

### 4. **`src/components/ProductShowcase.tsx`** - Example Component
- **Complete demo** of the mapping system
- **Statistics dashboard** with key metrics
- **Category overview** with product counts
- **Featured products** showcase
- **Search demonstrations** with different filters

## 🚀 Quick Start

### Basic Usage

```typescript
import { productMapper } from './src/utils/productMapper';

// Get all products
const allProducts = productMapper.getAllProducts();

// Get products by category
const lambProducts = productMapper.getProductsByCategory('lamb');

// Get featured products
const featured = productMapper.getFeaturedProducts();

// Search products
const searchResults = productMapper.searchProducts('steak');

// Get product statistics
const stats = productMapper.getProductStats();
```

### React Hook Usage

```typescript
import { useProducts, useFeaturedProducts, useProductSearch } from './src/hooks/useProducts';

function MyComponent() {
  const { products, loading } = useProducts();
  const { products: featured } = useFeaturedProducts();
  const { products: searchResults } = useProductSearch('chicken');

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## 📊 Product Data Structure

### Product Object
```typescript
interface Product {
  id: string;                    // Unique identifier
  category: string;              // Category slug
  name: string;                  // Product name
  slug: string;                  // URL-friendly slug
  description: string;           // Product description
  cooking_tips: string[];       // Cooking instructions
  price_per_kg: number;         // Base price per kg
  images: string[];             // Image URLs
  halal_flag: boolean;          // Halal certification
  origin: string;               // Country of origin
  badges: string[];             // Product badges
  min_order_weight: string;     // Minimum order weight
  featured: boolean;            // Featured product flag
  is_active: boolean;           // Active status
  variants: ProductVariant[];   // Product variants
}
```

### Product Variant Object
```typescript
interface ProductVariant {
  id: string;                   // Variant ID
  weight: string;               // Weight option (500g, 1kg, etc.)
  cut: string | null;          // Cut option (Standard, Thick Cut, etc.)
  marinade: string;            // Marinade option (None, Tandoori, etc.)
  stock: number;               // Stock quantity
  sku: string;                 // Stock keeping unit
  price_modifier: number;      // Price adjustment
}
```

## 🔍 Mapping Functions

### Category Mappings
```typescript
// Get products by category
const lambProducts = productMapper.getProductsByCategory('lamb');
const chickenProducts = productMapper.getProductsByCategory('chicken');
const beefProducts = productMapper.getProductsByCategory('beef');

// Available categories: lamb, chicken, beef, mutton, bbq-packs, 
// ready-to-cook, spices-masalas, rice-staples, frozen-foods, oriental-groceries
```

### Price Range Mappings
```typescript
// Get products by price range
const under10 = productMapper.getProductsByPriceRange('under_10');
const range10_20 = productMapper.getProductsByPriceRange('10_20');
const range20_50 = productMapper.getProductsByPriceRange('20_50');
const over50 = productMapper.getProductsByPriceRange('over_50');
```

### Feature Mappings
```typescript
// Get featured products
const featured = productMapper.getFeaturedProducts();

// Get products by origin
const ukProducts = productMapper.getProductsByOrigin('UK');
const indiaProducts = productMapper.getProductsByOrigin('India');

// Get products by badge
const bbqReady = productMapper.getProductsByBadge('BBQ Ready');
const freshCut = productMapper.getProductsByBadge('Fresh Cut Daily');
```

### Search & Filter
```typescript
// Search products
const searchResults = productMapper.searchProducts('lamb steak');

// Get products with multiple filters
const filtered = productMapper.getProductsByFilters({
  category: 'lamb',
  priceRange: '10_20',
  featured: true,
  inStock: true
});

// Get products in stock
const inStock = productMapper.getProductsInStock();

// Get low stock products
const lowStock = productMapper.getProductsLowStock();
```

## 📈 Statistics & Analytics

```typescript
// Get comprehensive statistics
const stats = productMapper.getProductStats();
console.log(stats);
// {
//   totalProducts: 25,
//   totalCategories: 10,
//   totalVariants: 85,
//   featuredProducts: 12,
//   totalInventoryValue: 15420.50,
//   averagePrice: 12.45,
//   productsInStock: 24,
//   lowStockProducts: 3
// }

// Get all unique values
const origins = productMapper.getAllOrigins();      // ['UK', 'India', 'China']
const badges = productMapper.getAllBadges();        // ['Fresh Cut Daily', 'BBQ Ready', ...]
const marinades = productMapper.getAllMarinades();  // ['Tandoori', 'BBQ', 'Spicy', ...]
const cuts = productMapper.getAllCuts();            // ['Standard', 'Thick Cut', 'Boneless', ...]
const weights = productMapper.getAllWeights();     // ['500g', '1kg', '1.5kg', ...]
```

## 🛒 Cart Management

```typescript
import { useProductCart } from './src/hooks/useProducts';

function CartComponent() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  } = useProductCart();

  const handleAddToCart = (product, variant) => {
    addToCart(product, variant, 1);
  };

  return (
    <div>
      <p>Cart Items: {cartCount}</p>
      <p>Total: £{cartTotal.toFixed(2)}</p>
      {/* Cart UI */}
    </div>
  );
}
```

## 🎯 Advanced Usage

### Custom Filtering
```typescript
// Get products with specific variants
const thickCutProducts = productMapper.getProductsWithVariant(
  undefined,     // any weight
  'Thick Cut',   // specific cut
  undefined      // any marinade
);

// Get random products
const randomProducts = productMapper.getRandomProducts(5);

// Get products by multiple criteria
const premiumLamb = productMapper.getProductsByFilters({
  category: 'lamb',
  badge: 'Premium Cut',
  featured: true,
  inStock: true
});
```

### Performance Optimization
```typescript
// Use React hooks for automatic re-rendering
const { products } = useProducts();
const { products: featured } = useFeaturedProducts();

// Use memoization for expensive calculations
const expensiveCalculation = useMemo(() => {
  return productMapper.getTotalInventoryValue();
}, []);
```

## 🔧 Integration Examples

### Product List Component
```typescript
function ProductList({ category }: { category: string }) {
  const { products, loading } = useFilteredProducts({ category });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Search Component
```typescript
function SearchComponent() {
  const [query, setQuery] = useState('');
  const { products, loading } = useProductSearch(query);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      {loading && <div>Searching...</div>}
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Statistics Dashboard
```typescript
function StatsDashboard() {
  const { stats, loading } = useProductStats();

  if (loading) return <div>Loading stats...</div>;

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard title="Total Products" value={stats.totalProducts} />
      <StatCard title="Categories" value={stats.totalCategories} />
      <StatCard title="Featured" value={stats.featuredProducts} />
      <StatCard title="Inventory Value" value={`£${stats.totalInventoryValue.toFixed(2)}`} />
    </div>
  );
}
```

## 📝 Available Data

### Products (25 total)
- **Lamb**: 5 products (steaks, chops, leg, shoulder, ribs)
- **Chicken**: 4 products (breast, thighs, wings, whole)
- **Beef**: 3 products (mince, steaks, cubes)
- **Mutton**: 2 products (curry cut, chops)
- **BBQ Packs**: 3 products (family, couples, party)
- **Ready-to-Cook**: 2 products (tandoori chicken, seekh kebabs)
- **Spices**: 2 products (garam masala, tandoori masala)
- **Rice & Staples**: 2 products (basmati rice, red lentils)
- **Frozen Foods**: 1 product (samosas)
- **Oriental Groceries**: 1 product (soy sauce)

### Variants (85+ total)
- **Weight Options**: 500g, 1kg, 1.5kg, 2kg, 3kg, 5kg, 12 pieces, 24 pieces, 500ml, 1L
- **Cut Options**: Standard, Thick Cut, Boneless, Whole, Bone-in, Cubes, Curry Cut, Mixed
- **Marinade Options**: None, Tandoori, BBQ, Garlic & Herb, Extra Spicy, Traditional

### Features
- ✅ **High-quality images** from Pexels
- ✅ **Realistic pricing** (£3.99 - £59.90)
- ✅ **Stock management** with SKUs
- ✅ **Halal certification** flags
- ✅ **Product badges** and origins
- ✅ **Cooking tips** for each product
- ✅ **Featured product** system
- ✅ **Comprehensive filtering** and search

## 🎉 Benefits

1. **Easy Integration** - Simple hooks and utilities
2. **Type Safety** - Full TypeScript support
3. **Performance** - Optimized with memoization
4. **Flexibility** - Multiple filtering options
5. **Scalability** - Easy to extend and modify
6. **Developer Experience** - Clear documentation and examples

Your product system is now fully mapped and ready for use! 🚀
