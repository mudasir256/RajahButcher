'use client';

import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function ContactInfoSection() {
  const contactRef = useScrollAnimation();

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: ["33 Albert Street", "Edinburgh, EH7 5LH"]
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+44 131 555 1619", "Mon-Sun: 9AM-9PM"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["rajahs_supermarket@hotmail.co.uk", "We reply within 2 hours"]
    }
  ];

  return (
    <motion.section 
      ref={contactRef.ref}
      className="py-20 bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: contactRef.isVisible ? 1 : 0, y: contactRef.isVisible ? 0 : 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: contactRef.isVisible ? 1 : 0, y: contactRef.isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Our Store</h2>
          <p className="text-lg text-gray-600">Come experience our quality firsthand</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((contact, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm text-center"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ 
                opacity: contactRef.isVisible ? 1 : 0, 
                y: contactRef.isVisible ? 0 : 30,
                scale: contactRef.isVisible ? 1 : 0.9
              }}
              transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
            >
              <motion.div 
                className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ 
                  rotate: contactRef.isVisible ? 0 : -180, 
                  scale: contactRef.isVisible ? 1 : 0 
                }}
                transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
              >
                <contact.icon className="w-6 h-6 text-emerald-600" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.title}</h3>
              <p className="text-gray-600">
                {contact.details[0]}<br />
                <span className="text-sm">{contact.details[1]}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
