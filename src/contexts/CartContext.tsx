'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price_per_kg: number;
  selected_weight: string;
  selected_cut: string | null;
  selected_marinade: string;
  quantity: number;
  item_total: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (item: Omit<CartItem, 'id' | 'item_total'>) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user } = useAuth();

  const calculateItemTotal = (pricePerKg: number, weight: string, quantity: number) => {
    const weightInKg = parseFloat(weight.replace('kg', '').replace('g', '')) / (weight.includes('kg') ? 1 : 1000);
    return pricePerKg * weightInKg * quantity;
  };

  const refreshCart = useCallback(async () => {
    if (!user) {
      setCart([]);
      return;
    }

    // Store cart in localStorage for local-only mode
    const savedCart = localStorage.getItem('dummy-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      setCart([]);
    }
  }, [user]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = async (item: Omit<CartItem, 'id' | 'item_total'>) => {
    if (!user) {
      alert('Please sign in to add items to cart');
      return;
    }

    const existingItem = cart.find(cartItem => 
      cartItem.product_id === item.product_id &&
      cartItem.selected_weight === item.selected_weight &&
      cartItem.selected_cut === item.selected_cut &&
      cartItem.selected_marinade === item.selected_marinade
    );

    if (existingItem) {
      // Update quantity of existing item
      const updatedCart = cart.map(cartItem => 
        cartItem.id === existingItem.id 
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity, item_total: calculateItemTotal(cartItem.price_per_kg, cartItem.selected_weight, cartItem.quantity + item.quantity) }
          : cartItem
      );
      setCart(updatedCart);
      localStorage.setItem('dummy-cart', JSON.stringify(updatedCart));
    } else {
      // Add new item to cart
      const newItem: CartItem = {
        id: `dummy-${Date.now()}-${Math.random()}`,
        ...item,
        item_total: calculateItemTotal(item.price_per_kg, item.selected_weight, item.quantity),
      };
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      localStorage.setItem('dummy-cart', JSON.stringify(updatedCart));
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    const updatedCart = cart.map(item => 
      item.id === itemId 
        ? { ...item, quantity, item_total: calculateItemTotal(item.price_per_kg, item.selected_weight, quantity) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('dummy-cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = async (itemId: string) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('dummy-cart', JSON.stringify(updatedCart));
  };

  const clearCart = async () => {
    if (!user) return;

    setCart([]);
    localStorage.removeItem('dummy-cart');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.item_total, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
