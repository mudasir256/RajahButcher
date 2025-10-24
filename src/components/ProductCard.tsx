'use client';

import { Award, ShoppingCart, ChevronDown, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useLoginModal } from '../contexts/LoginModalContext';
import { Product, ProductVariant } from '../utils/productMapper';

export default function ProductCard({ product }: { product: Product }) {
  const [selectedWeight, setSelectedWeight] = useState(product.variants[0]?.weight || '500g');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { openLoginModal } = useLoginModal();

  // Get available weights
  const availableWeights = [...new Set(product.variants.map(v => v.weight))];
  
  // Calculate price for selected weight
  const selectedVariant = product.variants.find(v => v.weight === selectedWeight);
  const weightInKg = parseFloat(selectedWeight.replace('kg', '').replace('g', '')) / (selectedWeight.includes('kg') ? 1 : 1000);
  const totalPrice = (product.price_per_kg + (selectedVariant?.price_modifier || 0)) * weightInKg;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Add to cart clicked, user:', user);
    
    if (isAddingToCart) return;
    
    // Check if user is logged in
    if (!user) {
      console.log('User not logged in, opening login modal');
      openLoginModal();
      return;
    }
    
    console.log('User is logged in, proceeding with add to cart');
    setIsAddingToCart(true);
    
    try {
      const selectedVariant = product.variants.find(v => v.weight === selectedWeight);
      
      await addToCart({
        product_id: product.id,
        product_name: product.name,
        product_image: product.images[0] || '/images/lamb-steaks.jpg',
        price_per_kg: product.price_per_kg + (selectedVariant?.price_modifier || 0),
        selected_weight: selectedWeight,
        selected_cut: selectedVariant?.cut || null,
        selected_marinade: selectedVariant?.marinade || 'None',
        quantity: 1,
      });
      
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWeightSelect = (weight: string) => {
    setSelectedWeight(weight);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm text-left">
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={product.images[0] || '/images/lamb-steaks.jpg'}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
        
        {/* Halal Badge - Top Left */}
        {product.halal_flag && (
          <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            Halal
          </div>
        )}
        
        {/* Fresh Cut Daily Badge - Below Halal */}
        <div className="absolute top-12 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
          Fresh Cut Daily
        </div>
        
        {/* Special Badge - Top Right */}
        {product.badges.length > 0 && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-medium px-3 py-1.5 rounded-lg">
            {product.badges[0]}
          </div>
        )}
        
        {/* In Stock Badge - Bottom Right */}
        <div className="absolute bottom-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
          In Stock
        </div>
      </div>

      <div className="p-5 bg-[#f7fffb] border border-gray-200 rounded-b-2xl">
        {/* Category and Origin Labels */}
        <div className="flex justify-between items-center mb-2">
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
            {product.origin}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 mb-2 text-lg line-clamp-2">{product.name}</h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Custom Weight Selector */}
        <div className="mb-3">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer text-left flex items-center justify-between"
            >
              <span className="text-gray-700">{selectedWeight}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Custom Dropdown */}
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {availableWeights.map((weight) => (
                  <button
                    key={weight}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWeightSelect(weight);
                    }}
                    className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      selectedWeight === weight ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-emerald-600 font-bold text-xl">
              £{totalPrice.toFixed(2)}
            </span>
            <span className="text-gray-600 text-sm">
              (£{(product.price_per_kg + (selectedVariant?.price_modifier || 0)).toFixed(2)}/kg)
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className={`w-full font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
            addedToCart 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
        >
          {isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Adding...
            </>
          ) : addedToCart ? (
            <>
              <Check className="w-4 h-4" />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
