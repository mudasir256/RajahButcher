# Rajah's Supermarket - Premium Halal Meat & Groceries

A modern, responsive e-commerce website built with Next.js 14, featuring a complete online shopping experience for halal meat and grocery products.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Product Catalog**: Comprehensive product browsing with categories and filters
- **Shopping Cart**: Full cart functionality with quantity management
- **User Authentication**: Secure user login and registration
- **Product Details**: Detailed product pages with variants and pricing
- **Search & Filter**: Advanced filtering by category, price range, and more
- **Mobile Responsive**: Optimized for all device sizes
- **Fast Performance**: Built with Next.js 14 for optimal speed

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mudasir256/RajahButcher.git
   cd RajahButcher
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

1. **Set up Supabase project**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the migration files in `supabase/migrations/`

2. **Seed the database**
   ```bash
   npm run seed
   ```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/
│   ├── cart/
│   ├── checkout/
│   ├── contact/
│   ├── product/[slug]/
│   └── shop/
├── components/             # React components
│   ├── sections/          # Page sections
│   ├── pages/            # Page components
│   └── ui/               # UI components
├── contexts/              # React contexts
├── hooks/                 # Custom hooks
├── lib/                   # Utilities and configs
└── utils/                 # Helper functions
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Add environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Manual Deployment

```bash
npm run build
npm start
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks
- `npm run seed` - Seed database with sample data

## 📱 Pages

- **Home** (`/`) - Landing page with hero section and featured products
- **Shop** (`/shop`) - Product catalog with filtering
- **Product Detail** (`/product/[slug]`) - Individual product pages
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Order completion
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form and information
- **FAQ** (`/faq`) - Frequently asked questions

## 🎨 Design Features

- **Responsive Grid Layouts**
- **Smooth Animations** with Framer Motion
- **Modern Color Scheme** with Tailwind CSS
- **Interactive Components** with hover effects
- **Loading States** and error handling
- **Mobile-First Design**

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js` with:
- Custom color palette
- Extended spacing and typography
- Component-specific styles

### Next.js
Configuration in `next.config.js`:
- Image optimization settings
- Remote image patterns
- Build optimizations

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@rajahsupermarket.com or create an issue in this repository.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations

---

**Rajah's Supermarket** - Your trusted source for premium halal meat and groceries in Edinburgh.# RajahButcher
