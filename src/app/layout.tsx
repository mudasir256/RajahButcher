import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import { LoginModalProvider } from '@/contexts/LoginModalContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Rajah's Supermarket - Premium Halal Meat & Groceries",
  description: 'Edinburgh\'s premier halal supermarket offering fresh meat, groceries, and specialty products with same-day delivery.',
  keywords: 'halal meat, supermarket, Edinburgh, groceries, delivery, halal butcher',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <LoginModalProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </LoginModalProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
