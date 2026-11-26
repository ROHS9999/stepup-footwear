// Milestone 2 – On-page / technical SEO helpers (meta tags, JSON-LD schema, GA4 page views)

const BRAND = 'STEPUP';

const upsertMeta = (attr, key, content) => {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

// Social crawlers handle JPG/PNG best, so share previews use the JPG copy of each image.
const toAbsoluteShareImage = (origin, image) => {
  const path = (image || '/images/stepup_urban_classic.jpg').replace(/-sm\.webp$/, '.jpg').replace(/\.webp$/, '.jpg');
  return path.startsWith('http') ? path : `${origin}${path}`;
};

// const toIsoDate = (value) => {
//   const parsed = new Date(`1 ${value}`);
//   return Number.isNaN(parsed.getTime()) ? '2026-10-01' : parsed.toISOString().slice(0, 10);
// };

const breadcrumb = (origin, items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${origin}${item.path}`,
  })),
});

const itemList = (origin, name, products) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  itemListElement: products.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${origin}/product/${product.slug}`,
    name: product.name,
  })),
});

const productSchema = (origin, product) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description || product.descriptor,
  sku: product.id,
  image: [`${origin}${product.image}`],
  brand: { '@type': 'Brand', name: product.brand || BRAND },
  category: product.category,
  ...(product.rating && product.reviewsCount
    ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviewsCount } }
    : {}),
  offers: {
    '@type': 'Offer',
    url: `${origin}/product/${product.slug}`,
    priceCurrency: 'INR',
    price: product.price,
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
  },
});

const articleSchema = (origin, article) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: article.title,
  description: article.excerpt,
  image: [`${origin}${(article.image || '').replace(/\.webp$/, '.jpg')}`],
  // datePublished: toIsoDate(article.date),
  // dateModified: toIsoDate(article.date),
  ...(article.datePublished
  ? { datePublished: article.datePublished }
  : {}),

...(article.dateModified
  ? { dateModified: article.dateModified }
  : {}),
  keywords: [article.targetKeyword, ...(article.tags || [])].filter(Boolean).join(', '),
  author: { '@type': 'Person', name: article.author },
  publisher: { '@type': 'Organization', name: 'STEPUP STUDIO', logo: { '@type': 'ImageObject', url: `${origin}/favicon.svg` } },
  mainEntityOfPage: `${origin}/journal/${article.slug}`,
});

const LISTING_NAMES = {
  '/shop': 'Shop All Footwear',
  '/men': "Men's Footwear",
  '/women': "Women's Footwear",
  '/sneakers': 'Sneakers for College Students',
  '/casual-shoes': 'Casual Shoes',
  '/sports-running': 'Sports & Running Shoes',
  '/shoes-under-2000': 'Shoes Under ₹2,000',
  '/student-picks': 'Student Picks',
};

export const buildSchemas = ({ origin, pathname, product, article, allProducts }) => {
  const home = { name: 'Home', path: '/' };
  const schemas = [];

  if (product) {
    const gender = product.gender === 'women' ? { name: 'Women', path: '/women' } : { name: 'Men', path: '/men' };
    schemas.push(productSchema(origin, product));
    schemas.push(breadcrumb(origin, [home, gender, { name: product.name, path: `/product/${product.slug}` }]));
  } else if (article) {
    schemas.push(articleSchema(origin, article));
    schemas.push(breadcrumb(origin, [home, { name: 'Journal', path: '/journal' }, { name: article.title, path: `/journal/${article.slug}` }]));
  } else if (LISTING_NAMES[pathname]) {
    const list = pathname === '/men' ? allProducts.filter((p) => p.gender === 'men')
      : pathname === '/women' ? allProducts.filter((p) => p.gender === 'women')
      : allProducts;
    schemas.push(itemList(origin, LISTING_NAMES[pathname], list));
    schemas.push(breadcrumb(origin, [home, { name: LISTING_NAMES[pathname], path: pathname }]));
  } else if (pathname === '/journal' || pathname === '/blog') {
    schemas.push(breadcrumb(origin, [home, { name: 'Journal', path: '/journal' }]));
  } else if (['/about', '/contact', '/privacy-policy', '/terms'].includes(pathname)) {
    const names = { '/about': 'About', '/contact': 'Contact', '/privacy-policy': 'Privacy Policy', '/terms': 'Terms' };
    schemas.push(breadcrumb(origin, [home, { name: names[pathname], path: pathname }]));
  }
  return schemas;
};

export const applySeo = ({ origin, pathname, title, description, image, noindex, schemas }) => {
  const url = `${origin}${pathname === '/' ? '/' : pathname}`;
  upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  upsertMeta('property', 'og:type', pathname.startsWith('/product/') ? 'product' : pathname.startsWith('/journal/') || pathname.startsWith('/blog/') ? 'article' : 'website');
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:image', toAbsoluteShareImage(origin, image));
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', toAbsoluteShareImage(origin, image));

  document.head.querySelectorAll('script[data-page-schema]').forEach((node) => node.remove());
  schemas.forEach((schema) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page-schema', 'true');
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
};

// GA4 single-page-app page view (index.html sets send_page_view:false so each route is counted once)
export const trackPageView = (title, pathname) => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_title: title,
    page_location: window.location.href,
    page_path: pathname,
  });
};
