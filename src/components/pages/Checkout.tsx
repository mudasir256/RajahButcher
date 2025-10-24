'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Calendar, Package } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';

interface DeliveryZone {
  id: string;
  postcode_prefix: string;
  zone_name: string;
  delivery_fee: number;
  minimum_order: number;
  free_delivery_over: number;
}

// Mock delivery zones for local mode
const mockDeliveryZones: DeliveryZone[] = [
  {
    id: 'eh1',
    postcode_prefix: 'EH1',
    zone_name: 'Edinburgh City Centre',
    delivery_fee: 3.50,
    minimum_order: 25.00,
    free_delivery_over: 50.00,
  },
  {
    id: 'eh2',
    postcode_prefix: 'EH2',
    zone_name: 'New Town',
    delivery_fee: 3.50,
    minimum_order: 25.00,
    free_delivery_over: 50.00,
  },
  {
    id: 'eh3',
    postcode_prefix: 'EH3',
    zone_name: 'Stockbridge',
    delivery_fee: 4.00,
    minimum_order: 30.00,
    free_delivery_over: 60.00,
  },
  {
    id: 'eh4',
    postcode_prefix: 'EH4',
    zone_name: 'Cramond',
    delivery_fee: 4.50,
    minimum_order: 35.00,
    free_delivery_over: 70.00,
  },
  {
    id: 'eh5',
    postcode_prefix: 'EH5',
    zone_name: 'Granton',
    delivery_fee: 4.00,
    minimum_order: 30.00,
    free_delivery_over: 60.00,
  },
  {
    id: 'eh6',
    postcode_prefix: 'EH6',
    zone_name: 'Leith',
    delivery_fee: 3.50,
    minimum_order: 25.00,
    free_delivery_over: 50.00,
  },
  {
    id: 'eh7',
    postcode_prefix: 'EH7',
    zone_name: 'Leith Walk',
    delivery_fee: 3.50,
    minimum_order: 25.00,
    free_delivery_over: 50.00,
  },
];

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'collection'>('delivery');
  const [postcode, setPostcode] = useState('');
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone | null>(null);
  const [postcodeError, setPostcodeError] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('Edinburgh');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      window.location.href = '/cart';
    }
  }, [cart]);

  const checkPostcode = async () => {
    setPostcodeError('');
    setDeliveryZone(null);

    const cleanPostcode = postcode.trim().toUpperCase().replace(/\s/g, '');
    const prefix = cleanPostcode.substring(0, 3);

    const foundZone = mockDeliveryZones.find(zone => zone.postcode_prefix === prefix);

    if (foundZone) {
      if (cartTotal < foundZone.minimum_order) {
        setPostcodeError(`Minimum order for ${prefix} is £${foundZone.minimum_order.toFixed(2)}`);
      } else {
        setDeliveryZone(foundZone);
      }
    } else {
      setPostcodeError('Sorry, we don\'t deliver to this postcode yet');
    }
  };

  const calculateDeliveryFee = () => {
    if (!deliveryZone) return 0;
    if (cartTotal >= deliveryZone.free_delivery_over) return 0;
    return deliveryZone.delivery_fee;
  };

  const deliveryFee = deliveryType === 'delivery' ? calculateDeliveryFee() : 0;
  const total = cartTotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (deliveryType === 'delivery' && !deliveryZone) {
      alert('Please check your postcode for delivery');
      return;
    }

    setSubmitting(true);

    const orderNumber = `RJ${Date.now()}`;

    // For local mode, we'll just simulate order placement
    // In a real app, you might want to send this to a backend API
    const orderData = {
      order_number: orderNumber,
      user_id: user?.id,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      delivery_type: deliveryType,
      delivery_address: deliveryType === 'delivery' ? {
        line1: addressLine1,
        line2: addressLine2,
        city,
        postcode,
      } : null,
      delivery_postcode: deliveryType === 'delivery' ? postcode : null,
      subtotal: cartTotal,
      delivery_fee: deliveryFee,
      total,
      status: 'pending',
      payment_status: 'pending',
      special_instructions: specialInstructions || null,
      cart_items: cart,
    };

    // Store order in localStorage for demo purposes
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    await clearCart();
    alert(`Order ${orderNumber} placed successfully! We'll contact you shortly.`);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-emerald-100 hover:text-white mb-4 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </Link>
          <h1 className="text-4xl font-bold">Checkout</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Method</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      deliveryType === 'delivery'
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <MapPin className={`w-8 h-8 mb-3 ${deliveryType === 'delivery' ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <h3 className="font-bold text-gray-900 mb-1">Delivery</h3>
                    <p className="text-sm text-gray-600">Get it delivered to your door</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('collection')}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      deliveryType === 'collection'
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Package className={`w-8 h-8 mb-3 ${deliveryType === 'collection' ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <h3 className="font-bold text-gray-900 mb-1">Click & Collect</h3>
                    <p className="text-sm text-gray-600">Pick up from 33 Albert Street</p>
                  </button>
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Check Delivery Area</h2>
                  <div className="flex gap-3 mb-4">
                    <input
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                      placeholder="Enter postcode (e.g., EH7)"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={checkPostcode}
                      className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                    >
                      Check
                    </button>
                  </div>
                  {postcodeError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                      {postcodeError}
                    </div>
                  )}
                  {deliveryZone && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold text-emerald-900 mb-1">
                            Delivery available to {deliveryZone.zone_name}
                          </p>
                          <p className="text-emerald-700">
                            Delivery fee: £{deliveryZone.delivery_fee.toFixed(2)}
                            {cartTotal >= deliveryZone.free_delivery_over && ' (FREE - minimum met!)'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                      <input
                        type="text"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        required={deliveryType === 'delivery'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2 (Optional)</label>
                      <input
                        type="text"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required={deliveryType === 'delivery'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Special Instructions (Optional)</h2>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={4}
                  placeholder="Any special requests for your order?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 text-sm">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-gray-600">
                      <span className="flex-1">{item.product_name} ({item.selected_weight}) x{item.quantity}</span>
                      <span className="font-semibold text-gray-900">£{item.item_total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 py-4 border-t border-gray-200 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">£{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="font-semibold text-gray-900">
                      {deliveryFee === 0 ? 'FREE' : `£${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200 mb-6">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-2xl text-emerald-600">£{total.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting || (deliveryType === 'delivery' && !deliveryZone)}
                  className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Placing Order...' : 'Place Order'}
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Payment will be collected upon delivery or collection
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
