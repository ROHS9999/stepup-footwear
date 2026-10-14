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

const DEFAULT_TITLE =
  'STEPUP — Step Up Your Campus Style | Stylish Shoes for College Students';

const DEFAULT_DESCRIPTION =
  'Discover STEPUP footwear for campus life, including everyday shoes, streetwear sneakers and student-friendly styles. Explore the collection.';

const ensureMetaDescription = () => {
  let tag = document.querySelector('meta[name="description"]');

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', 'description');
    document.head.appendChild(tag);
  }

  return tag;
};

const ensureCanonical = () => {
  let tag = document.querySelector('link[rel="canonical"]');

  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }

  return tag;
};

const AppContent = () => {
  const { currentPath, allProducts, blogs } = useApp();

  useEffect(() => {
    const pathname = currentPath.split('?')[0] || '/';
    const productPrefix = '/product/';
    const journalPrefixes = ['/journal/', '/blog/'];

    let title = DEFAULT_TITLE;
    let description = DEFAULT_DESCRIPTION;

    if (pathname.startsWith(productPrefix)) {
      const slug = pathname.slice(productPrefix.length).split('/')[0];
      const product = allProducts.find((item) => item.slug === slug);

      if (product) {
        title = `${product.name} | STEPUP Footwear`;
        description = `${product.name}${product.descriptor ? ` — ${product.descriptor}` : ''}. Explore product details, available sizes and pricing at STEPUP.`;
      } else {
        title = 'Shop Footwear | STEPUP';
        description = 'Explore stylish everyday footwear and sneakers for campus life at STEPUP.';
      }
    } else if (journalPrefixes.some((prefix) => pathname.startsWith(prefix))) {
      const prefix = pathname.startsWith('/blog/') ? '/blog/' : '/journal/';
      const slug = pathname.slice(prefix.length).split('/')[0];
      const article = blogs.find((item) => item.slug === slug);

      if (article) {
        title = `${article.title} | STEPUP Journal`;
        description = article.excerpt || `Read ${article.title} on the STEPUP Journal for campus footwear and style tips.`;
      } else {
        title = 'Campus Footwear Tips & Style Guides | STEPUP Journal';
        description = 'Read footwear tips, campus outfit inspiration and sneaker style guides from the STEPUP Journal.';
      }
    } else {
      switch (pathname) {
        case '/shop':
          title = 'Shop All Footwear | STEPUP';
          description = 'Shop STEPUP footwear, everyday shoes and sneakers designed for campus life and student style.';
          break;
        case '/men':
          title = "Men's Footwear & Sneakers | STEPUP";
          description = 'Explore men’s everyday footwear, streetwear styles and campus sneakers from STEPUP.';
          break;
        case '/women':
          title = "Women's Footwear & Sneakers | STEPUP";
          description = 'Discover women’s everyday footwear, platform styles and campus sneakers from STEPUP.';
          break;
        case '/sneakers':
          title = 'Sneakers for College Students | STEPUP';
          description = 'Explore stylish sneakers for campus days, casual outfits and everyday wear at STEPUP.';
          break;
        case '/journal':
        case '/blog':
          title = 'Campus Footwear Tips & Style Guides | STEPUP Journal';
          description = 'Explore sneaker advice, footwear care tips and campus outfit inspiration in the STEPUP Journal.';
          break;
        case '/about':
          title = 'About STEPUP | Footwear Built for Campus Life';
          description = 'Learn about STEPUP and our focus on stylish, comfortable and student-friendly footwear.';
          break;
        case '/contact':
          title = 'Contact STEPUP | Customer Support';
          description = 'Contact STEPUP for questions about footwear, orders, sizing and customer support.';
          break;
        case '/privacy-policy':
          title = 'Privacy Policy | STEPUP Footwear';
          description = 'Read the STEPUP privacy policy to understand how website information is handled.';
          break;
        case '/terms':
          title = 'Terms of Service | STEPUP Footwear';
          description = 'Review the terms and conditions for using the STEPUP website.';
          break;
        case '/casual-shoes':
          title = 'Casual Shoes for Campus | STEPUP';
          description = 'Explore casual shoes for college, daily wear and relaxed campus outfits at STEPUP.';
          break;
        case '/sports-running':
          title = 'Sports & Running Shoes | STEPUP';
          description = 'Explore sports-inspired and running footwear styles at STEPUP.';
          break;
        case '/shoes-under-2000':
          title = 'Shoes Under ₹2,000 | STEPUP';
          description = 'Discover student-friendly footwear options under ₹2,000 at STEPUP.';
          break;
        case '/student-picks':
          title = 'Student Picks | STEPUP Footwear';
          description = 'Explore footwear picks for campus life, everyday outfits and student budgets at STEPUP.';
          break;
        default:
          title = DEFAULT_TITLE;
          description = DEFAULT_DESCRIPTION;
      }
    }

    document.title = title;
    ensureMetaDescription().setAttribute('content', description);
    ensureCanonical().setAttribute('href', `${window.location.origin}${pathname}`);

    // Keep the existing smooth scroll behaviour on route changes.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath, allProducts, blogs]);

  const renderCurrentView = () => {
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '').split('?')[0];
      return <ProductDetailPage slug={slug} />;
    }

    if (currentPath.startsWith('/journal/')) {
      const slug = currentPath.replace('/journal/', '').split('?')[0];
      return <BlogArticlePage slug={slug} />;
    }

    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').split('?')[0];
      return <BlogArticlePage slug={slug} />;
    }

    const basePath = currentPath.split('?')[0];

    if (basePath === '/men' || currentPath.includes('gender=men')) {
      return <MenPage />;
    }

    if (basePath === '/women' || currentPath.includes('gender=women')) {
      return <WomenPage />;
    }

    if (basePath === '/sneakers') {
      return <SneakersPage />;
    }

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
      <main className="flex-1">{renderCurrentView()}</main>
      <Footer />
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
