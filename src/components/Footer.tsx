'use client';

import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">R</span>
              </div>
              <div>
                <div className="text-lg font-bold text-white">Rajah's</div>
                <div className="text-xs text-emerald-400 font-medium">Supermarket</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Scotland's Leading Halal Butcher — Fresh Cuts & Global Flavours
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/rajahs_supermarket"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-emerald-600 rounded-lg transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/RajahsSupermarket"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-emerald-600 rounded-lg transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/shop" className="text-sm hover:text-emerald-400 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/shop?category=specials" className="text-sm hover:text-emerald-400 transition-colors">
                  Butcher Specials
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-sm hover:text-emerald-400 transition-colors">
                  Delivery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-emerald-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:text-emerald-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  33 Albert Street<br />
                  Edinburgh, EH7 5LH
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a href="tel:+441315551619" className="text-sm hover:text-emerald-400 transition-colors">
                  +44 131 555 1619
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a
                  href="mailto:rajahs_supermarket@hotmail.co.uk"
                  className="text-sm hover:text-emerald-400 transition-colors"
                >
                  rajahs_supermarket@hotmail.co.uk
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Opening Hours</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-white mb-1">Mon - Thu</p>
                  <p>9:00 AM - 8:00 PM</p>
                </div>
              </div>
              <div className="text-sm pl-7">
                <p className="font-medium text-white mb-1">Fri - Sat</p>
                <p>9:00 AM - 9:00 PM</p>
              </div>
              <div className="text-sm pl-7">
                <p className="font-medium text-white mb-1">Sunday</p>
                <p>10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Rajah's Supermarket. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                Terms
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                Privacy
              </Link>
              <span className="text-gray-600">•</span>
              <span className="text-emerald-400 font-medium">100% Halal Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
