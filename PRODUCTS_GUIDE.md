# 🥩 Adding Products to Rajah's Supermarket

This guide will help you add products with images to your Next.js e-commerce website.

## 📋 Prerequisites

1. **Supabase Project Setup**: Make sure you have your Supabase credentials in `.env.local`
2. **Database Schema**: Ensure your database migrations have been run
3. **Environment Variables**: Verify your Supabase connection is working

## 🚀 Quick Start

### Option 1: Use the Migration File (Recommended)

1. **Run the migration**:
   ```bash
   npm run db:migrate
   ```

2. **This will add**:
   - 25+ products across all categories
   - High-quality product images from Pexels
   - Product variants with different weights and marinades
   - Proper pricing and descriptions

### Option 2: Use the Seeding Script

1. **Run the product seeder**:
   ```bash
   npm run seed
   ```

2. **This will add**:
   - Sample products with variants
   - Proper categorization
   - Stock quantities and SKUs

## 📸 Product Images

All products use high-quality images from Pexels:

- **Meat Products**: Professional food photography
- **Spices**: Authentic spice blend images
- **Ready-to-Cook**: Appetizing prepared food photos
- **BBQ Packs**: Grilling and BBQ imagery

### Image Sources:
- `https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg` - Lamb/Meat
- `https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg` - Chicken
- `https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg` - Beef
- `https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg` - BBQ/Grilling
- `https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg` - Spices/Groceries

## 🛍️ Product Categories

The migration adds products to these categories:

1. **Lamb** - Premium cuts, legs, ribs, chops
2. **Chicken** - Breast, thighs, wings, whole chicken
3. **Beef** - Steaks, mince, cubes, ribs
4. **Mutton** - Traditional cuts for curries
5. **BBQ Packs** - Family, couples, and party packs
6. **Ready-to-Cook** - Pre-marinated items
7. **Spices & Masalas** - Authentic spice blends
8. **Rice & Staples** - Basmati rice, lentils
9. **Frozen Foods** - Samosas, nuggets
10. **Oriental Groceries** - Asian cooking essentials

## 🔧 Adding Custom Products

### Method 1: Direct Database Insert

```sql
INSERT INTO products (
  category_id,
  name,
  slug,
  description,
  cooking_tips,
  price_per_kg,
  images,
  halal_flag,
  origin,
  badges,
  min_order_weight,
  is_active,
  featured
) VALUES (
  (SELECT id FROM categories WHERE slug = 'lamb'),
  'Your Product Name',
  'your-product-slug',
  'Product description here',
  ARRAY['Cooking tip 1', 'Cooking tip 2'],
  15.99,
  ARRAY['https://your-image-url.com/image.jpg'],
  true,
  'UK',
  ARRAY['Fresh Cut Daily'],
  '500g',
  true,
  true
);
```

### Method 2: Using the Seeding Script

Add your product to the `products` array in `scripts/seed-products.js`:

```javascript
{
  category: 'lamb',
  name: 'Your Product Name',
  slug: 'your-product-slug',
  description: 'Product description',
  cooking_tips: ['Tip 1', 'Tip 2'],
  price_per_kg: 15.99,
  images: ['https://your-image-url.com/image.jpg'],
  halal_flag: true,
  origin: 'UK',
  badges: ['Fresh Cut Daily'],
  min_order_weight: '500g',
  featured: true,
  variants: [
    { weight: '500g', cut: 'Standard', marinade: 'None', stock: 20 }
  ]
}
```

## 🏷️ Product Variants

Each product can have multiple variants with:

- **Weight Options**: 500g, 1kg, 1.5kg, 2kg
- **Cut Options**: Standard, Thick Cut, Boneless, Whole
- **Marinade Options**: None, Tandoori, BBQ, Garlic & Herb, Extra Spicy
- **Stock Quantities**: Real-time inventory tracking
- **SKUs**: Automatic generation (e.g., LS-500-STD-NONE)

## 🎯 Featured Products

Products marked as `featured: true` will appear on:
- Homepage featured section
- Category highlights
- Special promotions

## 📊 Product Data Structure

```typescript
interface Product {
  id: string;
  category_id: string;
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
  is_active: boolean;
  featured: boolean;
}
```

## 🔍 Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Check your `.env.local` file has correct credentials
   - Restart your development server

2. **"Invalid supabaseUrl"**
   - Ensure your Supabase URL starts with `https://`
   - Check for typos in the URL

3. **"Product not found"**
   - Verify the product slug exists in the database
   - Check if the product is marked as `is_active: true`

### Database Commands:

```bash
# Reset database (WARNING: This will delete all data)
npm run db:reset

# Push migrations
npm run db:migrate

# Seed products
npm run seed
```

## 🎨 Customizing Images

To use your own images:

1. **Upload to a CDN** (recommended):
   - Use services like Cloudinary, AWS S3, or Supabase Storage
   - Get the public URL
   - Add to the `images` array

2. **Use Pexels/Unsplash**:
   - Find high-quality food images
   - Copy the direct image URL
   - Ensure images are properly licensed

3. **Local Images** (for development):
   - Add images to `public/images/`
   - Reference as `/images/your-image.jpg`

## 📈 Next Steps

After adding products:

1. **Test the website** - Browse products, add to cart, checkout
2. **Customize styling** - Adjust product cards, layouts
3. **Add more categories** - Expand your product range
4. **Implement search** - Add product search functionality
5. **Add reviews** - Let customers review products

## 🆘 Need Help?

- Check the Supabase dashboard for data
- Verify your environment variables
- Test the database connection
- Review the migration files for reference

Happy selling! 🛒
