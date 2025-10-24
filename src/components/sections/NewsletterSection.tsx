'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function NewsletterSection() {
  const newsletterRef = useScrollAnimation();

  return (
    <motion.section 
      ref={newsletterRef.ref}
      className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: newsletterRef.isVisible ? 1 : 0, y: newsletterRef.isVisible ? 0 : 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: newsletterRef.isVisible ? 1 : 0, y: newsletterRef.isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl mb-8 text-emerald-50">
            Get the latest offers, new products, and cooking tips delivered to your inbox
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-md mx-auto flex gap-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: newsletterRef.isVisible ? 1 : 0, y: newsletterRef.isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <motion.button 
            className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.button>
        </motion.div>
        
        <motion.p 
          className="text-sm text-emerald-100 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: newsletterRef.isVisible ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          No spam, unsubscribe at any time
        </motion.p>
      </div>
    </motion.section>
  );
}
