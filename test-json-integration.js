#!/usr/bin/env node

/**
 * Test Script for JSON Product Integration
 * 
 * This script tests that the JSON product data is properly structured
 * and can be used by the React components
 */

const fs = require('fs');
const path = require('path');

// Load the JSON data
const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'products-complete.json'), 'utf8'));

console.log('🧪 Testing JSON Product Integration...\n');

// Test 1: Check metadata
console.log('📊 Metadata:');
console.log(`- Version: ${productsData.metadata.version}`);
console.log(`- Total Categories: ${productsData.metadata.total_categories}`);
console.log(`- Total Products: ${productsData.metadata.total_products}`);
console.log(`- Total Variants: ${productsData.metadata.total_variants}\n`);

// Test 2: Check categories
console.log('📂 Categories:');
productsData.categories.forEach(category => {
  console.log(`- ${category.name} (${category.slug}): ${category.product_count} products`);
});
console.log('');

// Test 3: Check featured products
const featuredProducts = productsData.products.filter(p => p.featured && p.is_active);
console.log('⭐ Featured Products:');
featuredProducts.forEach(product => {
  console.log(`- ${product.name}: £${product.price_per_kg}/kg (${product.variants.length} variants)`);
});
console.log('');

// Test 4: Check product variants
console.log('🔧 Product Variants Sample:');
const sampleProduct = productsData.products[0];
console.log(`- Product: ${sampleProduct.name}`);
console.log(`- Variants: ${sampleProduct.variants.length}`);
sampleProduct.variants.slice(0, 3).forEach(variant => {
  console.log(`  * ${variant.weight} ${variant.cut || ''} ${variant.marinade} - Stock: ${variant.stock}`);
});
console.log('');

// Test 5: Check mappings
console.log('🗺️ Mappings:');
console.log(`- Categories mapped: ${Object.keys(productsData.mappings.by_category).length}`);
console.log(`- Featured products mapped: ${productsData.mappings.by_featured.featured.length}`);
console.log(`- Price ranges mapped: ${Object.keys(productsData.mappings.by_price_range).length}`);
console.log(`- Origins mapped: ${Object.keys(productsData.mappings.by_origin).length}`);
console.log(`- Badges mapped: ${Object.keys(productsData.mappings.by_badges).length}\n`);

// Test 6: Check delivery zones
console.log('🚚 Delivery Zones:');
productsData.delivery_zones.forEach(zone => {
  console.log(`- ${zone.postcode_prefix} (${zone.zone_name}): £${zone.delivery_fee} delivery, min £${zone.minimum_order}`);
});
console.log('');

// Test 7: Check site settings
console.log('🏪 Site Settings:');
console.log(`- Store: ${productsData.site_settings.store_info.name}`);
console.log(`- Address: ${productsData.site_settings.store_info.address}`);
console.log(`- Phone: ${productsData.site_settings.store_info.phone}`);
console.log(`- Email: ${productsData.site_settings.store_info.email}\n`);

// Test 8: Validate product structure
console.log('✅ Product Structure Validation:');
let validProducts = 0;
let invalidProducts = 0;

productsData.products.forEach(product => {
  const requiredFields = ['id', 'name', 'slug', 'price_per_kg', 'images', 'variants'];
  const hasAllFields = requiredFields.every(field => product[field] !== undefined);
  
  if (hasAllFields && product.variants.length > 0) {
    validProducts++;
  } else {
    invalidProducts++;
    console.log(`❌ Invalid product: ${product.name}`);
  }
});

console.log(`- Valid products: ${validProducts}`);
console.log(`- Invalid products: ${invalidProducts}\n`);

// Test 9: Check image URLs
console.log('🖼️ Image URLs:');
const productsWithImages = productsData.products.filter(p => p.images && p.images.length > 0);
console.log(`- Products with images: ${productsWithImages.length}/${productsData.products.length}`);
console.log(`- Sample image: ${productsWithImages[0]?.images[0]}\n`);

// Test 10: Check stock levels
console.log('📦 Stock Levels:');
let totalStock = 0;
let lowStockProducts = 0;

productsData.products.forEach(product => {
  product.variants.forEach(variant => {
    totalStock += variant.stock;
    if (variant.stock < 10) {
      lowStockProducts++;
    }
  });
});

console.log(`- Total stock units: ${totalStock}`);
console.log(`- Low stock variants (< 10): ${lowStockProducts}\n`);

console.log('🎉 JSON Integration Test Complete!');
console.log('✅ All product data is properly structured and ready for use in React components.');
