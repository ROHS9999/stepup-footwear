import React, { lazy, Suspense, useEffect } from 'react';

import { AppProvider, useApp } from './context/AppContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/ui/CartDrawer';
import { SearchModal } from './components/ui/SearchModal';
import { WishlistDrawer } from './components/ui/WishlistDrawer';
import { QuickViewModal } from './components/ui/QuickViewModal';
import { Toast } from './components/ui/Toast';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then((module) => ({ default: module.ShopPage })));
const MenPage = lazy(() => import('./pages/MenPage').then((module) => ({ default: module.MenPage })));
const WomenPage = lazy(() => import('./pages/WomenPage').then((module) => ({ default: module.WomenPage })));
const SneakersPage = lazy(() => import('./pages/SneakersPage').then((module) => ({ default: module.SneakersPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then((module) => ({ default: module.ProductDetailPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then((module) => ({ default: module.BlogPage })));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage').then((module) => ({ default: module.BlogArticlePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((module) => ({ default: module.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((module) => ({ default: module.TermsPage })));

const DEFAULT_TITLE =
  'STEPUP — Step Up Your Campus Style | Stylish Shoes for College Students';

const DEFAULT_DESCRIPTION =
  'Discover STEPUP footwear for campus life, including everyday shoes, streetwear sneakers and student-friendly styles. Explore the collection.';

// Treat /men and /men/ as the same route to avoid duplicate URLs and false 404s.
const normalizePath = (path) => {
  const pathname = (path || '/').split('?')[0] || '/';
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
};

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
    const pathname = normalizePath(currentPath);
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
          if (pathname === '/') {
            title = DEFAULT_TITLE;
            description = DEFAULT_DESCRIPTION;
          } else {
            title = 'Page Not Found | STEPUP';
            description = 'The page you are looking for could not be found. Explore STEPUP footwear and campus sneaker collections.';
          }
      }
    }

    document.title = title;
    ensureMetaDescription().setAttribute('content', description);
    ensureCanonical().setAttribute('href', `${window.location.origin}${pathname}`);

    // Keep the existing smooth scroll behaviour on route changes.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath, allProducts, blogs]);

  const renderNotFound = () => (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.25em] text-[#A52A2A]">404 Error</p>
      <h1 className="mt-4 text-4xl md:text-6xl font-bold">Page not found</h1>
      <p className="mt-4 max-w-md text-[#555555]">Sorry, we couldn’t find that page. Explore our footwear collection instead.</p>
      <a href="/shop" onClick={(event) => { event.preventDefault(); window.history.pushState({}, '', '/shop'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="mt-8 inline-flex bg-[#111111] px-6 py-3 text-white hover:bg-[#A52A2A] transition-colors">Explore Shop</a>
    </section>
  );

  const renderCurrentView = () => {
    const normalizedPath = normalizePath(currentPath);

    if (normalizedPath.startsWith('/product/')) {
      const slug = normalizedPath.slice('/product/'.length);
      // Never show an unrelated product for a misspelled or outdated product URL.
      if (!allProducts.some((product) => product.slug === slug)) return renderNotFound();
      return <ProductDetailPage slug={slug} />;
    }

    if (normalizedPath.startsWith('/journal/') || normalizedPath.startsWith('/blog/')) {
      const prefix = normalizedPath.startsWith('/blog/') ? '/blog/' : '/journal/';
      const slug = normalizedPath.slice(prefix.length);
      // Keep journal and legacy blog URLs working, but reject unknown article slugs.
      if (!blogs.some((article) => article.slug === slug)) return renderNotFound();
      return <BlogArticlePage slug={slug} />;
    }

    const basePath = normalizedPath;

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
        return <HomePage />;
      default:
        return renderNotFound();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#111111] font-sans selection:bg-[#A52A2A] selection:text-[#F7F5F0]">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-[60vh] bg-[#F7F5F0]" aria-label="Loading page" />}>
          {renderCurrentView()}
        </Suspense>
      </main>
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
