'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is all your meat halal certified?',
      answer: 'Yes, 100% of our meat is halal certified and sourced from trusted suppliers. We follow strict Islamic principles in our butchery practices.',
    },
    {
      question: 'What areas do you deliver to?',
      answer: 'We deliver across Edinburgh EH postcodes. Enter your postcode at checkout to check if we deliver to your area. Delivery fees vary by zone, with free delivery on orders over £60 for local areas.',
    },
    {
      question: 'How fresh is the meat?',
      answer: 'All our meat is cut fresh daily by expert butchers. We don\'t use pre-packaged trays—every order is prepared fresh when you place it.',
    },
    {
      question: 'Can I collect my order from the shop?',
      answer: 'Yes! Choose Click & Collect at checkout and your order will be ready in about 1 hour at our Albert Street location.',
    },
    {
      question: 'What is your minimum order value?',
      answer: 'Minimum orders vary by delivery zone. Typically £20 for local Edinburgh areas (EH6, EH7, EH8) and £25 for extended zones.',
    },
    {
      question: 'Do you offer same-day delivery?',
      answer: 'Yes! Orders placed before 2:00 PM qualify for same-day delivery. Next-day delivery is available for orders placed after the cut-off time.',
    },
    {
      question: 'Can I request special cuts or marinades?',
      answer: 'Absolutely! Many of our products offer cut options (thick cut, standard) and marinade choices (tandoori, garlic & herb, etc.). You can also add special instructions at checkout.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'Currently, we accept payment upon delivery or collection. Online payment options will be available soon.',
    },
    {
      question: 'What if I need to change or cancel my order?',
      answer: 'Please contact us as soon as possible at +44 131 555 1619 or rajahs_supermarket@hotmail.co.uk. We\'ll do our best to accommodate changes if the order hasn\'t been prepared yet.',
    },
    {
      question: 'Do you sell products other than meat?',
      answer: 'Yes! We stock a wide range of oriental and Asian groceries including spices, masalas, rice, lentils, sauces, noodles, and frozen foods.',
    },
    {
      question: 'Are there any allergens I should know about?',
      answer: 'Each product page lists any known allergens. If you have specific concerns, please contact us before ordering.',
    },
    {
      question: 'What is your refund policy for perishable items?',
      answer: 'We stand by the quality of our products. If you\'re not satisfied with your order, please contact us within 24 hours and we\'ll make it right.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-emerald-100">Everything you need to know about ordering from Rajah's</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            We're here to help! Contact us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+441315551619"
              className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors text-center"
            >
              Call Us
            </a>
            <a
              href="mailto:rajahs_supermarket@hotmail.co.uk"
              className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors border border-gray-300 text-center"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
