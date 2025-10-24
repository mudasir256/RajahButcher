'use client';

import Link from 'next/link';
import { ChefHat, Utensils, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function CookingTipsSection() {
  const cookingTipsRef = useScrollAnimation();

  const tips = [
    {
      icon: ChefHat,
      title: "Perfect Grilling",
      description: "Learn the secrets to perfectly grilled lamb chops and chicken. Temperature control and timing are key.",
      link: "/recipes"
    },
    {
      icon: Utensils,
      title: "Slow Cooking",
      description: "Discover how to create tender, flavorful dishes with our premium cuts using slow cooking methods.",
      link: "/recipes"
    },
    {
      icon: Leaf,
      title: "Marinades & Spices",
      description: "Explore traditional and modern marinades that enhance the natural flavors of halal meats.",
      link: "/recipes"
    }
  ];

  return (
    <motion.section 
      ref={cookingTipsRef.ref}
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: cookingTipsRef.isVisible ? 1 : 0, y: cookingTipsRef.isVisible ? 0 : 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: cookingTipsRef.isVisible ? 1 : 0, y: cookingTipsRef.isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Cooking Tips & Recipes</h2>
          <p className="text-lg text-gray-600">Get the most out of your premium halal meats</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ 
                opacity: cookingTipsRef.isVisible ? 1 : 0, 
                y: cookingTipsRef.isVisible ? 0 : 30,
                scale: cookingTipsRef.isVisible ? 1 : 0.9
              }}
              transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
            >
              <motion.div 
                className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ 
                  rotate: cookingTipsRef.isVisible ? 0 : -180, 
                  scale: cookingTipsRef.isVisible ? 1 : 0 
                }}
                transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
              >
                <tip.icon className="w-6 h-6 text-emerald-600" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{tip.title}</h3>
              <p className="text-gray-600 mb-4">
                {tip.description}
              </p>
              <Link href={tip.link} className="text-emerald-600 font-medium hover:text-emerald-700">
                Read More →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
