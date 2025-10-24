'use client';

import { Award, Users, Heart, Truck } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Scotland's Leading Halal Butcher</h1>
          <p className="text-xl text-emerald-100">
            Fresh cuts and global flavours from the heart of Edinburgh
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Rajah's Supermarket, we've been serving Edinburgh's community for years with the finest halal meats and authentic oriental groceries. Located at 33 Albert Street, we're proud to be known as Scotland's leading halal butcher.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our commitment is simple: provide fresh, quality halal meat cut daily by expert butchers, alongside a curated selection of spices, rice, and Asian essentials. No fake trays, no shortcuts—just proper butcher quality.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you're planning a family BBQ, preparing a traditional curry, or simply want the best halal meat in Edinburgh, we've got you covered with same-day delivery and click & collect options.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <Award className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">100% Halal Certified</h3>
              <p className="text-gray-600">
                All our meat is sourced from trusted, certified halal suppliers and butchered according to Islamic principles.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <Users className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Butchers</h3>
              <p className="text-gray-600">
                Our skilled butchers cut fresh to order with precision and care, ensuring you get exactly what you need.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <Heart className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community First</h3>
              <p className="text-gray-600">
                We're more than a shop—we're part of the Edinburgh community, serving families with quality and care.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <Truck className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Same-day delivery across Edinburgh EH postcodes, or collect from our Albert Street location in just 1 hour.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
