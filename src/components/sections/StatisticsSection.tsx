'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function StatisticsSection() {
  const statsRef = useScrollAnimation();

  return (
    <motion.section 
      ref={statsRef.ref}
      className="py-20 bg-gradient-to-br from-emerald-50 to-emerald-100"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: statsRef.isVisible ? 1 : 0, y: statsRef.isVisible ? 0 : 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: statsRef.isVisible ? 1 : 0, y: statsRef.isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Trusted by Thousands</h2>
          <p className="text-lg text-gray-600">Join our community of satisfied customers</p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "5000+", label: "Happy Customers" },
            { number: "25+", label: "Years Experience" },
            { number: "100%", label: "Halal Certified" },
            { number: "24/7", label: "Fresh Daily" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center bg-white p-6 rounded-2xl shadow-sm"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ 
                opacity: statsRef.isVisible ? 1 : 0, 
                y: statsRef.isVisible ? 0 : 30,
                scale: statsRef.isVisible ? 1 : 0.8
              }}
              transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
            >
              <motion.div 
                className="text-4xl font-bold text-emerald-600 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: statsRef.isVisible ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.5 + (index * 0.1), type: "spring", stiffness: 200 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-700 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
