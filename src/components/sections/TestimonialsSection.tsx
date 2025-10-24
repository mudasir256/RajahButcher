'use client';

import { Star, Quote, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function TestimonialsSection() {
  const testimonialsRef = useScrollAnimation();

  const testimonials = [
    {
      quote: "The quality of meat is exceptional. Fresh, halal, and delivered right to my door. Rajah's has become our family's go-to butcher.",
      name: "Ahmed Hassan",
      location: "Edinburgh"
    },
    {
      quote: "Amazing service! The lamb chops were perfect for our BBQ. Fast delivery and excellent packaging. Highly recommended!",
      name: "Fatima Ali",
      location: "Leith"
    },
    {
      quote: "Best halal butcher in Edinburgh! The meat is always fresh, properly cut, and the prices are very reasonable.",
      name: "Mohammed Khan",
      location: "Newington"
    }
  ];

  return (
    <motion.section 
      ref={testimonialsRef.ref}
      className="py-20 bg-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: testimonialsRef.isVisible ? 1 : 0, y: testimonialsRef.isVisible ? 0 : 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: testimonialsRef.isVisible ? 1 : 0, y: testimonialsRef.isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600">Real reviews from real customers</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 p-6 rounded-2xl"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ 
                opacity: testimonialsRef.isVisible ? 1 : 0, 
                y: testimonialsRef.isVisible ? 0 : 30,
                scale: testimonialsRef.isVisible ? 1 : 0.9
              }}
              transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: testimonialsRef.isVisible ? 1 : 0, 
                      scale: testimonialsRef.isVisible ? 1 : 0 
                    }}
                    transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) + (i * 0.1) }}
                  >
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>
              <Quote className="w-8 h-8 text-emerald-600 mb-4" />
              <p className="text-gray-700 mb-4">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
