import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/ui/CartDrawer';
import { SearchModal } from './components/ui/SearchModal';
import { WishlistDrawer } from './components/ui/WishlistDrawer';
import { QuickViewModal } from './components/ui/QuickViewModal';
import { Toast } from './components/ui/Toast';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { MenPage } from './pages/MenPage';
import { WomenPage } from './pages/WomenPage';
import { SneakersPage } from './pages/SneakersPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogArticlePage } from './pages/BlogArticlePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

const AppContent = () => {
  const { currentPath } = useApp();

  // Dynamic SEO Page Title & Meta synchronization
  useEffect(() => {
    const basePath = currentPath.split('?')[0];

    if (currentPath.startsWith('/product/')) {
      document.title = 'STEPUP Product | Stylish Shoes for College Students';
    } else if (currentPath.startsWith('/journal/') || currentPath.startsWith('/blog/')) {
      document.title = 'Style Guide | The STEPUP Journal — Campus Footwear';
    } else {
      switch (basePath) {
        case '/shop':
          document.title = 'Shop All Footwear | STEPUP — Best Shoes for College Students';
          break;
        case '/men':
          document.title = "Men's Footwear | STEPUP — Streetwear & Campus Classics";
          break;
        case '/women':
          document.title = "Women's Footwear | STEPUP — Platform & Everyday Sneakers";
          break;
        case '/sneakers':
          document.title = 'College Sneakers | STEPUP — Trendy Sneakers for Students';
          break;
        case '/journal':
        case '/blog':
          document.title = 'The STEPUP Journal | Campus Footwear Tips & Style Guides';
          break;
        case '/about':
          document.title = 'About STEPUP — Built For Campus Life | Student Footwear Brand';
          break;
        case '/contact':
          document.title = "Let's Talk | STEPUP Studio Student Support";
          break;
        case '/privacy-policy':
          document.title = 'Privacy Policy | STEPUP Footwear';
          break;
        case '/terms':
          document.title = 'Terms of Service | STEPUP Footwear';
          break;
        case '/':
        default:
          document.title = 'STEPUP — Step Up Your Campus Style | Stylish Shoes for College Students';
          break;
      }
    }
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  const renderCurrentView = () => {
    // Dynamic Product Detail Route: /product/slug
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '').split('?')[0];
      return <ProductDetailPage slug={slug} />;
    }

    // Dynamic Journal Article Route: /journal/slug or /blog/slug
    if (currentPath.startsWith('/journal/')) {
      const slug = currentPath.replace('/journal/', '').split('?')[0];
      return <BlogArticlePage slug={slug} />;
    }
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').split('?')[0];
      return <BlogArticlePage slug={slug} />;
    }

    // Dedicated Pages
    const basePath = currentPath.split('?')[0];

    // Gender Category Routes
    if (basePath === '/men' || currentPath.includes('gender=men')) {
      return <MenPage />;
    }
    if (basePath === '/women' || currentPath.includes('gender=women')) {
      return <WomenPage />;
    }

    // Dedicated Sneakers Page
    if (basePath === '/sneakers') {
      return <SneakersPage />;
    }

    // Standard static routes
    switch (basePath) {
      case '/shop':
      case '/casual-shoes':
      case '/sports-running':
      case '/shoes-under-2000':
      case '/student-picks':
        return <ShopPage />;
      case '/journal':
      case '/blog':
        return <BlogPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/privacy-policy':
        return <PrivacyPolicyPage />;
      case '/terms':
        return <TermsPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#111111] font-sans selection:bg-[#A52A2A] selection:text-[#F7F5F0]">
      <Navbar />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
      <WishlistDrawer />
      <QuickViewModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
