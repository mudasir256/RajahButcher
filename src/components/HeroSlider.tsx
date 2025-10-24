'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Premium Halal Meats",
    subtitle: "Cut Fresh Daily",
    description: "Butcher-selected cuts + oriental essentials—delivered to your door or ready to collect.",
    image: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg",
    ctaText: "Shop Meat",
    ctaLink: "/shop"
  },
  {
    id: 2,
    title: "Fresh Oriental Groceries",
    subtitle: "Authentic Ingredients",
    description: "Discover our wide selection of authentic oriental spices, rice, and specialty ingredients.",
    image: "https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg",
    ctaText: "Browse Groceries",
    ctaLink: "/shop?category=groceries"
  },
  {
    id: 3,
    title: "Same Day Delivery",
    subtitle: "Edinburgh Wide",
    description: "Fast, reliable delivery across Edinburgh. Order by 2PM for same-day delivery.",
    image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
    ctaText: "Order Now",
    ctaLink: "/delivery"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <div className="relative h-[500px] lg:h-[600px] overflow-hidden rounded-3xl">
      {/* Smooth background crossfade - Fixed white flash */}
      <div className="absolute inset-0 bg-black">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority={currentSlide === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Consistent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
              <Play className="w-4 h-4" />
              Scotland's Leading Halal Butcher
            </div>

            <h1 className="text-2xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {slides[currentSlide].title}<br />
              <span className="text-emerald-400">{slides[currentSlide].subtitle}</span>
            </h1>

            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={slides[currentSlide].ctaLink}
                className="group px-8 py-4 bg-emerald-600 text-white font-semibold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  {slides[currentSlide].ctaText}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a
                href="/delivery"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-white/30 transition-colors border border-white/30"
              >
                Click & Collect
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Play / Pause */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20"
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-emerald-400 scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <motion.div
          key={currentSlide}
          className="h-full bg-emerald-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
        />
      </div>
    </div>
  );
}