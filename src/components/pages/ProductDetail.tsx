'use client';

import { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Award, ShoppingCart, Check, Flame } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import productsData from '../../../products.json';

interface Product {
  category: string;
  name: string;
  slug: string;
  description: string;
  cooking_tips: string[];
  price_per_kg: number | null;
  fixed_price?: number | null;
  images: string[];
  halal_flag: boolean;
  origin: string;
  badges: string[];
  allergens?: string[];
  min_order_weight: string;
  featured: boolean;
  variants: Array<{
    weight: string;
    cut: string | null;
    marinade: string;
    stock: number;
    sku: string;
  }>;
}

interface Variant {
  weight: string;
  cut: string | null;
  marinade: string;
  stock: number;
  sku: string;
}

export default function ProductDetail() {
  const params = useParams();
  const productSlug = params?.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedWeight, setSelectedWeight] = useState('');
  const [selectedCut, setSelectedCut] = useState('');
  const [selectedMarinade, setSelectedMarinade] = useState('None');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useCart();
  const { user } = useAuth();

  const loadProduct = useCallback(async () => {
    const foundProduct = productsData.products.find((p: Product) => p.slug === productSlug);
    
    if (!foundProduct) {
      setLoading(false);
      return;
    }

    setProduct(foundProduct);
    setVariants(foundProduct.variants);

    if (foundProduct.variants.length > 0) {
      setSelectedWeight(foundProduct.variants[0].weight);
      setSelectedCut(foundProduct.variants[0].cut || '');
      setSelectedMarinade(foundProduct.variants[0].marinade || 'None');
    }

    setLoading(false);
  }, [productSlug]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const availableWeights = [...new Set(variants.map(v => v.weight))];
  const availableCuts = [...new Set(variants.filter(v => v.weight === selectedWeight).map(v => v.cut).filter(Boolean))];
  const availableMarinades = [...new Set(variants.filter(v => v.weight === selectedWeight).map(v => v.marinade))];

  const calculatePrice = () => {
    if (!product) return 0;
    if (product.fixed_price) return product.fixed_price * quantity;
    if (product.price_per_kg && selectedWeight) {
      const weightInKg = parseFloat(selectedWeight.replace('kg', '').replace('g', '')) / (selectedWeight.includes('kg') ? 1 : 1000);
      return product.price_per_kg * weightInKg * quantity;
    }
    return 0;
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please sign in to add items to cart');
      return;
    }

    if (!product || !selectedWeight) return;

    await addToCart({
      product_id: product.slug, // Using slug as ID for local mode
      product_name: product.name,
      product_image: product.images[0] || '/images/lamb-steaks.jpg',
      price_per_kg: product.price_per_kg || 0,
      selected_weight: selectedWeight,
      selected_cut: selectedCut || null,
      selected_marinade: selectedMarinade,
      quantity,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <Link
            href="/shop"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/shop"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-lg">
              <Image
                src={product.images[0] || '/images/lamb-steaks.jpg'}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1, 5).map((img, i) => (
                  <div key={i} className="aspect-square bg-white rounded-2xl overflow-hidden">
                    <Image src={img} alt={`${product.name} ${i + 2}`} width={150} height={150} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                {product.halal_flag && (
                  <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl flex items-center gap-2 font-medium">
                    <Award className="w-5 h-5" />
                    Halal
                  </div>
                )}
              </div>

              {product.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.badges.map((badge, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-xl text-gray-600 leading-relaxed">{product.description}</p>

              <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                <span>Origin: <span className="font-medium text-gray-900">{product.origin}</span></span>
                {product.allergens && product.allergens.length > 0 && (
                  <span>Allergens: <span className="font-medium text-gray-900">{product.allergens.join(', ')}</span></span>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Select Weight
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {availableWeights.map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`py-3 px-4 rounded-xl font-medium transition-all ${
                        selectedWeight === weight
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              {availableCuts.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Cut Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableCuts.map((cut) => (
                      <button
                        key={cut}
                        onClick={() => setSelectedCut(cut!)}
                        className={`py-3 px-4 rounded-xl font-medium transition-all ${
                          selectedCut === cut
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cut}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {availableMarinades.length > 1 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Marinade
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableMarinades.map((marinade) => (
                      <button
                        key={marinade}
                        onClick={() => setSelectedMarinade(marinade)}
                        className={`py-3 px-4 rounded-xl font-medium transition-all ${
                          selectedMarinade === marinade
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {marinade}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-xl transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 h-12 text-center border-2 border-gray-200 rounded-xl font-bold text-xl focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-xl transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-end justify-between pt-4 border-t border-gray-200">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total Price</div>
                  <div className="text-3xl font-bold text-emerald-600">
                    £{calculatePrice().toFixed(2)}
                  </div>
                  {product.price_per_kg && (
                    <div className="text-sm text-gray-500">
                      £{product.price_per_kg.toFixed(2)}/kg
                    </div>
                  )}
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>

            {product.cooking_tips.length > 0 && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-6 h-6 text-orange-600" />
                  <h3 className="text-lg font-bold text-gray-900">Best Ways to Enjoy</h3>
                </div>
                <ul className="space-y-2">
                  {product.cooking_tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
