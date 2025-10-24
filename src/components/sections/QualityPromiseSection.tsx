'use client';

import { CheckCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function QualityPromiseSection() {
  const qualityRef = useScrollAnimation();

  const qualityPoints = [
    { title: "Halal Certified", description: "All our meats are certified halal by trusted Islamic authorities" },
    { title: "Fresh Daily", description: "Cut fresh every morning, never frozen or pre-packaged" },
    { title: "Expert Butchers", description: "Skilled craftsmen with decades of experience in halal butchery" },
    { title: "Traceable Sources", description: "Know exactly where your meat comes from with full traceability" }
  ];

  return (
    <motion.section 
      ref={qualityRef.ref}
      className="py-20 bg-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: qualityRef.isVisible ? 1 : 0, y: qualityRef.isVisible ? 0 : 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: qualityRef.isVisible ? 1 : 0, x: qualityRef.isVisible ? 0 : -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Quality Promise</h2>
            <p className="text-lg text-gray-600 mb-8">
              We're committed to providing the highest quality halal meats with complete transparency 
              about our sourcing and preparation methods.
            </p>

            <div className="space-y-4">
              {qualityPoints.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: qualityRef.isVisible ? 1 : 0, x: qualityRef.isVisible ? 0 : -30 }}
                  transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ 
                      scale: qualityRef.isVisible ? 1 : 0, 
                      rotate: qualityRef.isVisible ? 0 : -180 
                    }}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  >
                    <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: qualityRef.isVisible ? 1 : 0, x: qualityRef.isVisible ? 0 : 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg"
                alt="Quality halal meat preparation"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl"
              initial={{ opacity: 0, scale: 0, rotate: 45 }}
              animate={{ 
                opacity: qualityRef.isVisible ? 1 : 0, 
                scale: qualityRef.isVisible ? 1 : 0,
                rotate: qualityRef.isVisible ? 0 : 45
              }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Quality</div>
                  <div className="font-bold text-gray-900">Guaranteed</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
