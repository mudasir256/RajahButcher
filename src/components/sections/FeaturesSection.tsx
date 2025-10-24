'use client';

import { Award, ShoppingBag, Truck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function FeaturesSection() {
  const featuresRef = useScrollAnimation();

  return (
    <motion.section 
      ref={featuresRef.ref}
      className="py-16 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: featuresRef.isVisible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">100% Halal</h3>
              <p className="text-sm text-gray-600">Certified halal meat from trusted sources</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Freshly Cut</h3>
              <p className="text-sm text-gray-600">Cut to order by expert butchers</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Same-day delivery across Edinburgh</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Click & Collect</h3>
              <p className="text-sm text-gray-600">Ready in 1 hour from Albert Street</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
