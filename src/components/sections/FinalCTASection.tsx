'use client';

import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function FinalCTASection() {
  const ctaRef = useScrollAnimation();

  return (
    <motion.section 
      ref={ctaRef.ref}
      className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: ctaRef.isVisible ? 1 : 0, y: ctaRef.isVisible ? 0 : 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: ctaRef.isVisible ? 1 : 0, y: ctaRef.isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Quality?</h2>
          <p className="text-xl mb-8 text-emerald-50">
            Join thousands of satisfied customers who trust Rajah's for their halal meat needs
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: ctaRef.isVisible ? 1 : 0, y: ctaRef.isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/shop"
              className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-2xl hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
            >
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent text-white font-bold rounded-2xl border-2 border-white hover:bg-white hover:text-emerald-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              Contact Us
              <Phone className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
