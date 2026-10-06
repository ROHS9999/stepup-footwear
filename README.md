# STEPUP — Modern Campus Footwear E-Commerce

> **"Step Up Your Campus Style."**  
> Premium, editorial footwear engineered for college students and young adults aged 18–25.

---

## 🌟 Brand & Aesthetic Direction

- **Niche**: Stylish footwear for college, casual outings, social events, and everyday campus wear.
- **Audience**: College students & young adults (18–25) seeking footwear that balances trend-led aesthetics, 10,000-step durability, and student-accessible pricing.
- **Design Aesthetic**: Minimalist editorial fashion inspired by modern streetwear and sneaker ateliers (Aimé Leon Dore, Kith, Axel Arigato, Salomon, New Balance).
- **Core Avoidances**: No excessive neon colors, no cheap AI blobs or illustrations, no bulky Bootstrap cards, no bloated animations.

---

## 🎨 Color Palette & Typography Tokens

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Primary Background** | `#F7F5F0` | Warm off-white / ivory canvas |
| **Primary Text** | `#111111` | Near-black high-contrast editorial typography |
| **Secondary Text** | `#666666` | Muted charcoal for descriptors and metadata |
| **Brand Accent** | `#A52A2A` | Deep burgundy / heritage red (used sparingly) |
| **Secondary Accent** | `#D8CFC2` | Muted sand / beige for tags and subtle contrast |
| **Subtle Border** | `#E8E2D8` | Warm hairline borders replacing heavy drop shadows |

### Typography
- **Headings**: `Space Grotesk` (Weights: 500, 600, 700)
- **Body**: `Inter` (Weights: 400, 500, 600)
- **Hierarchy**: Strict 2-font system with large editorial titles and generous letter spacing.

---

## 🏛️ Homepage Structure (Section by Section)

1. **Navbar**
   - Typographic STEPUP wordmark
   - Sticky navigation with scroll-reactive opacity/backdrop transition
   - Navigation links: `Home`, `Shop`, `Men`, `Women`, `Sneakers`, `Journal`, `About`
   - Real-time Search overlay, Wishlist counter, and Slide-Out Shopping Bag with badge.
2. **Hero Section**
   - Headline: *"STEP INTO YOUR NEXT ERA."*
   - Subtitle: *"Stylish footwear made for campus days, late-night plans and everything in between."*
   - Dual CTAs: *"Shop Collection"* & *"Explore Sneakers"*
   - Full-width editorial footwear photography with entrance keyframe animations.
3. **Featured Collection ("BUILT FOR CAMPUS LIFE")**
   - 6 core student footwear styles with prices, badges (*"Trending"*, *"Campus Fave"*), and quick add size selectors.
4. **Curated Categories**
   - Three large visual categories with high-res editorial imagery:
     - **Everyday Sneakers**
     - **Campus Classics**
     - **Weekend Fits**
5. **Trending Section ("WHAT'S MOVING RIGHT NOW")**
   - Horizontal scrolling carousel with smooth navigation arrows and live item cards.
6. **Campus Style Guide (SEO Content Hub)**
   - Three full editorial guides with shoppable shoe integrations:
     1. *"5 Sneakers Every Student Should Own"*
     2. *"What Shoes Work With Baggy Jeans?"*
     3. *"How To Build A College Outfit Around Your Sneakers"*
7. **Why STEPUP**
   - 4-pillar minimal value layout: *Campus-tested comfort*, *Student-friendly prices*, *Everyday durability*, *Trend-led designs*.
8. **Final Call to Action ("YOUR NEXT PAIR IS WAITING.")**
   - Bold editorial statement section leading directly into the catalog.
9. **Footer**
   - Clean column layout: Shop, About, Journal, Support & Legal, Social Links, and a 15% Student Discount newsletter signup form.

---

## ⚡ Interactive E-Commerce Features

- **Slide-Out Cart Drawer**:
  - Live quantity adjustment & removal
  - Dynamic **Free Campus Shipping meter** ($65 threshold progress bar)
  - Student promo coupon validation (e.g. `CAMPUS15` for 15% off, `STEPUP10` for 10% off)
- **Quick Add Size Selector**:
  - Direct hover / quick view modal allowing size (US 6–12) and color choice without leaving the page.
- **Search Modal**:
  - Instant live filtering across footwear names, materials, descriptors, and style guides.
- **Wishlist Drawer**:
  - LocalStorage-persisted favorited footwear with one-click "Move to Bag".
- **Product Detail Views**:
  - Multi-angle gallery, OrthoCloud™ insole technology breakdown, and campus outfit pairing formulas.

---

## 🔍 SEO Strategy & Keyword Architecture

- **Primary Keyword**: `stylish shoes for college students`
- **Secondary Keywords**:
  - `best shoes for college students`
  - `college shoes for young adults`
  - `stylish footwear for college`
  - `trendy sneakers for students`
  - `affordable sneakers for college students`
  - `casual shoes for college`
  - `comfortable shoes for college students`
  - `college sneakers`
  - `budget shoes for students`
- **Structured Data**: Built-in Schema.org JSON-LD for `ClothingStore` and product offerings.

---

## 🛠️ Tech Stack & Development

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + `@theme` CSS Variables
- **Icons**: Lucide React + Custom Editorial SVGs
- **Fonts**: Google Fonts (`Space Grotesk` + `Inter`)

### Running Locally

```bash
# Navigate to project directory
cd "C:\Users\Rohan\.gemini\antigravity\scratch\stepup-footwear"

# Install dependencies (if not already installed)
npm install

# Start Vite Development Server
npm run dev

# Or Preview Production Build
npm run build
npm run preview
```

---

## 🌐 WordPress / WooCommerce Migration Guide

To convert this project into a custom WordPress theme:
1. **`index.html`** &rarr; maps to `header.php`, `footer.php`, and `functions.php` (enqueueing `Space Grotesk` and `Inter`).
2. **`HomePage.jsx`** &rarr; maps to `front-page.php`.
3. **`ShopPage.jsx`** &rarr; maps to `archive-product.php` (WooCommerce product loop).
4. **`ProductDetailPage.jsx`** &rarr; maps to `single-product.php`.
5. **`BlogArticlePage.jsx`** &rarr; maps to `single.php`.
6. Custom CSS classes in `src/index.css` can be compiled or imported directly into the WordPress theme's `style.css`.
