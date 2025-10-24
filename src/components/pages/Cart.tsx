'use client';

import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';


export default function Cart() {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Sign in to view your cart</h2>
          <p className="text-gray-600 mb-6">Create an account or sign in to start shopping</p>
          <Link
            href="/"
            className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious halal meats to get started</p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-emerald-100 text-sm sm:text-base">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-emerald-200">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="w-full sm:w-28 h-32 sm:h-28 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 shadow-sm mx-auto sm:mx-0">
                    <Image
                      src={item.product_image}
                      alt={item.product_name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-3">
                      <div className="flex-1 mb-3 sm:mb-0">
                        <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2">{item.product_name}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            <span>Weight: <span className="font-semibold text-gray-900">{item.selected_weight}</span></span>
                          </div>
                          {item.selected_cut && (
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                              <span>Cut: <span className="font-semibold text-gray-900">{item.selected_cut}</span></span>
                            </div>
                          )}
                          {item.selected_marinade !== 'None' && (
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                              <span>Marinade: <span className="font-semibold text-gray-900">{item.selected_marinade}</span></span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 sm:p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:shadow-md self-end sm:self-auto"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center justify-center sm:justify-start gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 hover:text-emerald-800 rounded-xl font-bold transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <div className="w-16 h-10 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-emerald-200">
                          <span className="text-lg font-bold text-gray-900">{item.quantity}</span>
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="text-center sm:text-right">
                        <div className="text-xl sm:text-2xl font-bold text-emerald-600 mb-1">£{item.item_total.toFixed(2)}</div>
                        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-lg inline-block">£{item.price_per_kg.toFixed(2)}/kg</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 sticky top-4 sm:top-24">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                </div>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">£{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-semibold text-gray-900">Calculated at checkout</span>
                </div>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-gray-200 mb-6 sm:mb-8">
                <div className="flex items-center justify-between text-lg sm:text-xl">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-2xl sm:text-3xl text-emerald-600">£{cartTotal.toFixed(2)}</span>
                </div>
              </div>

<div className='flex flex-col gap-3'>

              <Link
                href="/checkout"
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-xl sm:rounded-2xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>

              <Link
                href="/shop"
                className="w-full py-3 text-center bg-gray-100 text-gray-700 font-semibold rounded-xl sm:rounded-2xl hover:bg-gray-200 transition-all duration-200 border border-gray-200 hover:border-gray-300"
              >
                Continue Shopping
              </Link>
</div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-200">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <p className="font-bold text-emerald-800 text-sm sm:text-base">Free Delivery Available</p>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-700 ml-7 sm:ml-9">
                    On orders over £60 within Edinburgh EH postcodes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
