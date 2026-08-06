# Shivansh Rose Nursery — Website Build Prompts (Phase-by-Phase)

**How to use this document:**
AI coding tools (Claude, Cursor, v0, Bolt, Lovable, etc.) produce much better results when given **one focused phase at a time** instead of the entire website in one shot. Copy **Phase 0** first and get it fully working, then move to Phase 1, and so on — in order. Each phase's prompt is self-contained and repeats the core design system so the AI stays visually consistent across every phase.

Do not skip Phase 0. It sets up the design tokens, fonts, and folder structure every later phase depends on.

---

## MASTER CONTEXT (Keep this pinned/visible in every chat with the AI tool)

```
PROJECT: Shivansh Rose Nursery — Premium Informational Website
TYPE: Informational / digital catalogue website. NOT an e-commerce store.
STRICT RULE: No prices anywhere. No "Add to Cart". No checkout. No payment gateway.
All product/service CTAs lead to a WhatsApp Enquiry, a Call, or a Contact/Inquiry Form — never a cart.

GOAL: Make the brand feel premium, trustworthy, and nature-inspired — not like a
small local shop. Every screen should push the visitor toward:
  1. Visiting the physical store, or
  2. Contacting via WhatsApp / Call / Inquiry Form.

TECH STACK (upgraded for SEO, speed, security & scale — see rationale below):
- Next.js (App Router) + TypeScript — React framework with server-side
  rendering / static generation, NOT a plain client-side SPA.
- Tailwind CSS
- Framer Motion (animations, page transitions, hover/micro-interactions)
- Lucide Icons
- Supabase (Postgres database + Auth) — backend for products, categories,
  stores, services, blogs, testimonials, gallery, FAQs, and inquiry
  submissions. Replaces "sample/static data" once Phase 10 is built.
  Supabase handles DATA ONLY — not images (see Cloudinary below).
- Cloudinary — handles ALL image storage, optimization, and CDN delivery
  (product photos, gallery photos, testimonial photos, store photos). Use
  the `next-cloudinary` package (CldImage component) instead of next/image
  for anything served from Cloudinary, so images get automatic resizing,
  format conversion (WebP/AVIF), and fast CDN delivery out of the box.
- Vercel (or similar) for hosting with edge caching + CDN.
- Zod (or similar) for schema validation on every form and API route.

WHY THIS SPLIT (Supabase for data, Cloudinary for images) — for the AI
tool's awareness, not to be shown to the end customer:
- Cloudinary is purpose-built for image delivery: it auto-generates
  thumbnail/medium/large versions, converts formats, compresses, and serves
  from its own global CDN — all through simple URL parameters, with no
  custom optimization code needed.
- Supabase stays lean and fast when it only handles structured data
  (products, categories, inquiries) rather than large binary image files —
  each image record in Supabase just stores its Cloudinary URL/public_id.
- This is the same overall pattern larger e-commerce/nursery sites follow:
  a database for structured data, plus a dedicated image CDN layer, rather
  than storing raw images inside the application database.

WHY THIS STACK INSTEAD OF PLAIN REACT (for the AI tool's awareness, not to
be shown to the end customer):
- Plain client-side React (Vite/CRA) renders content only after JS loads,
  which hurts SEO and initial load speed — bad for a business that wants to
  be found on Google for "nursery near Hinjawadi/Wakad" type searches.
  Next.js pre-renders pages (SSG/ISR) so search engines and first-time
  visitors get fast, fully-formed HTML immediately.
- "Admin adds hundreds of products with no limit" requires a real database
  with pagination — not local state or JSON files. Supabase (Postgres) gives
  this plus built-in Auth (for the admin login) without standing up a
  custom backend server.
- Cloudinary keeps hundreds of high-resolution nursery photos from slowing
  the site down, by serving properly resized, compressed, modern-format
  images from its own CDN instead of raw uploads.

NON-FUNCTIONAL REQUIREMENTS — every phase must respect these, not just
Phase 0. Treat them as acceptance criteria, same priority as visual design:

SECURITY
- All Supabase tables use Row Level Security (RLS): public/anon key can only
  READ published, non-hidden content; only an authenticated admin can
  write/update/delete.
- Admin auth via Supabase Auth (email/password or magic link) — no hardcoded
  credentials anywhere in the codebase.
- All environment variables/secrets (API keys, service role key) kept in
  `.env.local` / hosting-provider secrets — never committed to git, never
  exposed to the client bundle (only the public anon key goes client-side).
- All forms (Contact, Service Inquiry, Newsletter) validated on both client
  and server, with sanitized input, to prevent injection and spam abuse.
- Add basic rate-limiting/honeypot or a CAPTCHA (e.g. Cloudflare Turnstile)
  on public forms to block bots.
- File uploads (admin product images) go through Cloudinary's upload API
  with signed/authenticated uploads only (never unsigned public uploads),
  restricted by file type and size, so random files can't be pushed into
  the media library.
- HTTPS enforced everywhere; security headers set (CSP, X-Frame-Options,
  X-Content-Type-Options) via Next.js config.

PERFORMANCE
- Target Lighthouse scores of 90+ on Performance, SEO, Accessibility, and
  Best Practices.
- Static Generation (SSG) or Incremental Static Regeneration (ISR) for
  product/category pages so most requests are served from cache, not
  recomputed per visit.
- All images served via Cloudinary (through next-cloudinary/CldImage) with
  responsive sizes and modern formats (WebP/AVIF) — never a raw unoptimized
  upload rendered directly.
- Code-splitting per route; no single giant JS bundle.

SCALABILITY
- Database schema designed so adding hundreds/thousands of products,
  unlimited categories, and future new sections doesn't require a redesign
  (proper foreign keys between products ↔ categories ↔ subcategories,
  indexed columns for search/filter fields).
- Paginated/virtualized product listings and admin tables — never load
  "all products" into the DOM at once.
- Reusable component architecture (small, composable components) so new
  product types or sections can be added without duplicating code.

RELIABILITY
- Graceful error/loading states on every data-fetching component (skeleton
  loaders, friendly error messages, retry option) — never a blank white
  screen or raw error stack shown to a visitor.
- Form submissions confirmed with a success state, and stored reliably in
  Supabase (with basic logging) so no customer inquiry is silently lost.
- Automated backups on the Supabase database (check plan settings) and a
  documented process for restoring content if something is accidentally
  deleted from the admin panel.

BUSINESS DETAILS (use exactly as given, do not invent placeholder data):
- Brand name: Shivansh Rose Nursery
- Email: shivanshrosenursery.com@gmail.com
- WhatsApp / primary contact: 8007634856
- Additional phone numbers: 9175418744, 7499165488
- Business type: Retail and wholesale
- Opening hours (both stores, all 7 days): 8:00 AM – 10:30 PM

Store 1 — Shivansh Rose Nursery (main brand):
  Atlanta 2 Society, New Wakad – Hinjawadi Link Rd, opposite Pune, Hinjawadi,
  Pimpri-Chinchwad (Pune Area), Maharashtra 411057.
  Landmark: Opposite Pune, near the Atlanta 2 society cluster.

Store 2 — Shweta Matka Bhandar and Nursery:
  Hinjewadi Jakatnaka, Wakad Rd, opposite Madhuban Hotel, Pune, Maharashtra 411057.
  Landmark: Opposite Madhuban Family Restaurant And Bar, near Hinjewadi Jakatnaka;
  close to the Shivansh Rose Nursery neighbourhood on the same main stretch.
  Contact info: same as above.
```

---

## ESTIMATED MONTHLY HOSTING COSTS (for planning/budgeting — not for the AI tool)

```
Based on this finalized stack, rough monthly cost at business launch stage:

- Domain (.com)                : ~₹1,000/year  (~₹85/month)
- Vercel Pro (hosting)          : ~$20/month   (~₹1,680/month)
- Supabase Pro (database+auth)  : ~$25/month   (~₹2,100/month)
  (Pro is recommended over Free — free-tier projects auto-pause after
  ~7 days of no traffic, which is not acceptable for a live business site.)
- Cloudinary (images/CDN)       : Free tier initially (~₹0), likely upgrading
  to the Plus plan (~$89–99/month, ~₹7,500–8,300/month) once product photo
  volume and site traffic grow.

Launch-stage total : roughly ₹3,900 – ₹4,400/month
Growth-stage total  : roughly ₹11,500 – ₹12,800/month (once Cloudinary scales)

Prices change over time and depend on actual usage — confirm current rates
on each provider's pricing page before committing.
```

---



```
TYPOGRAPHY
- Display / Headline font (serif): "Playfair Display" — used for large hero
  headings and section headlines. Feels elegant.
- Body font (sans-serif): "Inter" — used for all paragraph text and captions.
- Button font (sans-serif): "Poppins" — used ONLY for button labels.

Type scale:
- Display Large     : 56px desktop / 40px mobile — Bold (700) — Playfair Display
- Headline Medium    : 32px — Semi-Bold (600) — Playfair Display
- Body Large         : 18px — Regular (400) — Inter
- Body Medium (base) : 16px — Regular (400) — Inter
- Button Label       : 15px — Semi-Bold (600) — Poppins
- Caption            : 12px — Medium (500) — Inter

COLOR TOKENS (define as Tailwind theme extension / CSS variables — do not hardcode hex in components)
Primary:
  --primary: #00450d;            /* main brand green */
  --primary-container: #1b5e20;
  --primary-fixed: #acf4a4;
  --on-primary: #ffffff;

Secondary:
  --secondary: #006e1c;
  --secondary-container: #98f994;
  --on-secondary: #ffffff;

Tertiary:
  --tertiary: #004516;
  --tertiary-container: #185e27;
  --on-tertiary: #ffffff;

Background / Surface:
  --background: #fcf9f8;
  --background-cream: #fffdf6;
  --surface: #fcf9f8;
  --surface-lowest: #ffffff;
  --surface-low: #f6f3f2;
  --surface-default: #f0eded;
  --surface-high: #eae7e7;
  --surface-highest: #e5e2e1;
  --surface-glass: rgba(255, 255, 255, 0.7);   /* glassmorphism cards */

Feedback / Borders:
  --error: #ba1a1a;
  --error-container: #ffdad6;
  --outline: #717a6d;
  --border-leaf: #e8f5e9;

VISUAL LANGUAGE
- Rounded corners on all cards/buttons/images (soft, not sharp).
- Soft, layered shadows — never harsh drop shadows.
- Glassmorphism on suitable elements: sticky nav bar, floating cards over hero image
  (use --surface-glass + backdrop-blur).
- Smooth Framer Motion transitions on scroll-in, page load, hover, and route change.
- Parallax scroll effect on hero and section background imagery.
- Hover animations + micro-interactions on every clickable element (buttons, cards, icons).
- A branded loading animation on first load (e.g. animated leaf/logo, not a generic spinner).
- Fully responsive: mobile-first, then tablet, then desktop breakpoints.
- SEO-friendly: semantic HTML, meta tags, alt text on all images, proper heading hierarchy.
- Fast-loading: lazy-load below-the-fold images, code-split routes.
- Accessibility: sufficient color contrast, keyboard navigable, aria-labels on icon buttons.

IMAGE STYLE (for any placeholder/AI-generated imagery until real photos are added)
Premium, realistic nursery photography, bright natural lighting. Subjects: healthy green
plants, luxury ceramic pots, modern fiber planters, nursery landscapes, close-up plant
photography, lifestyle home décor with plants, garden inspiration.
```

---

## PHASE 0 — Project Foundation, Database Schema & Design System Setup

```
Set up the foundation of a Next.js (App Router) + TypeScript + Tailwind CSS +
Supabase project called "Shivansh Rose Nursery Website". Do not build any
visible page content yet — this phase is only about the skeleton, database,
and security foundation everything else will sit on.

1. PROJECT STRUCTURE
   Initialize the project with folders: /app (routes), /components, /lib
   (supabase client, utils, validation schemas), /hooks, /types,
   /app/admin (protected admin routes), /app/api (server route handlers for
   form submissions).

2. DESIGN SYSTEM
   Configure Tailwind theme with the exact color tokens and font families from
   the DESIGN SYSTEM section above (as CSS variables + Tailwind theme.extend).
   Load "Playfair Display", "Inter", and "Poppins" via next/font (not a manual
   <link> tag — next/font self-hosts and optimizes them). Wire up Tailwind
   font utility classes: font-display, font-body, font-button.

3. SUPABASE SETUP (data + auth only — NOT images)
   - Create a Supabase project and connect it via environment variables
     (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY only on the
     client; SUPABASE_SERVICE_ROLE_KEY only in server-side code, never
     exposed to the browser).
   - Design and create these initial tables with proper foreign keys and
     indexes: categories (supports unlimited nested category/subcategory
     creation), products, stores, garden_services, gallery_images,
     testimonials, faqs, blog_posts, inquiries (contact + service inquiry
     submissions), admin_users (or use Supabase Auth's built-in users table).
     For any table that has images (products, gallery_images, testimonials,
     stores), store the Cloudinary `public_id` (and/or secure URL) as a text
     column — never store raw image binaries in Supabase.
   - Enable Row Level Security (RLS) on every table: public/anon role gets
     SELECT-only access to published/non-hidden rows; INSERT/UPDATE/DELETE
     restricted to the authenticated admin role. Write the actual RLS
     policies, don't leave tables open.

4. CLOUDINARY SETUP (all image storage, optimization, and CDN)
   - Create a Cloudinary account/environment and connect it via environment
     variables (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME on the client; the API key
     and API secret used only in server-side upload signing code, never
     exposed to the browser).
   - Install and configure `next-cloudinary` (CldImage component for display,
     CldUploadWidget or a signed-upload server action for the Admin Panel).
   - Set up organized Cloudinary folders, e.g. `products/`, `gallery/`,
     `testimonials/`, `stores/`, so assets stay easy to manage as the library
     grows to hundreds of images.
   - All admin uploads must use SIGNED uploads generated by a server-side
     route (never the unsigned/public upload preset) so random people can't
     upload arbitrary files to the account.
   - Define a default set of Cloudinary transformation presets (e.g.
     thumbnail, card, detail-large, gallery-masonry) so every part of the
     site requests an appropriately sized/cropped image instead of a full
     original.

5. LAYOUT SKELETON
   Create a base Layout with a placeholder sticky header slot, footer slot,
   and a global floating-buttons slot (built fully in Phase 9).

6. ROUTES
   Set up placeholder routes for: Home, Products (category + product detail,
   dynamic routes), Garden Services, Our Stores, About Us, Contact, and
   protected Admin routes — each public route using Static Generation or ISR
   where the content allows it (product/category pages are great ISR
   candidates), not pure client-side rendering.

7. SHARED COMPONENTS
   Add a reusable Button component (2 variants: primary filled, outline) using
   Poppins font and the color tokens, and a reusable Card component (rounded
   corners, soft shadow, optional glass variant).

8. LOADING & ERROR STATES
   Set up a simple branded loading animation for route/data loading (using
   Next.js loading.tsx conventions) and a shared friendly error boundary
   (error.tsx) so a failed data fetch never shows a blank page or raw stack
   trace.

9. SECURITY BASELINE
   Configure security headers (CSP, X-Frame-Options, X-Content-Type-Options)
   in next.config, confirm .env files (including Cloudinary and Supabase
   keys) are gitignored, and confirm the Supabase service role key and
   Cloudinary API secret are never imported into any client component.

Do NOT add real content, sample copywriting, or final imagery yet. This phase
is purely the architecture, database, and security scaffold every later phase
builds on top of.
```

---

## PHASE 1 — Header & Hero Section (Home Page)

```
Build the Header and Hero Section of the Home Page using the DESIGN SYSTEM and
MASTER CONTEXT above. Build on top of the Phase 0 scaffold — reuse the Button
and Card components already created.

HEADER (sticky navigation bar):
- Logo on the left (use "Shivansh Rose Nursery" text logo styled in Playfair
  Display for now if no logo file exists).
- Center/left nav links: Home, Products (has dropdown — build the dropdown
  structure now but leave it visually simple; full mega menu comes in Phase 2),
  Garden Services, Our Stores, About Us, Contact.
- Right side: a Search icon (non-functional placeholder is fine — Search itself
  is built in Phase 3), and a WhatsApp button that links to
  https://wa.me/918007634856 opening in a new tab.
- Sticky on scroll with a glassmorphism background (--surface-glass + backdrop
  blur) once the user scrolls down.
- Fully responsive: collapses into a mobile hamburger menu below tablet width.
- Smooth open/close animation for the mobile menu using Framer Motion.

HERO SECTION:
- Full-width hero image area (use a high-quality placeholder nursery/plants
  image) with a soft gradient overlay for text readability.
- Heading (Display Large, Playfair Display): "Bring Nature Closer to Your Home"
- Subheading (Body Large, Inter): "Discover a beautiful collection of indoor
  plants, outdoor plants, bonsai, succulents, ceramic pots, fiber planters,
  plastic pots, and premium gardening essentials."
- Two CTA buttons: "Explore Products" (primary, scrolls/links to Products) and
  "Visit Our Nursery" (outline, links to Our Stores / opens Google Maps).
- Subtle floating plant-leaf animation elements drifting in the background
  (Framer Motion, low-opacity, decorative, must not affect performance or
  accessibility/readability).
- Add parallax scroll effect on the hero background image.

Keep everything else on the Home page as empty placeholder sections for now —
we will build About, Gallery, Testimonials, etc. in later phases.
```

---

## PHASE 2 — Products Mega Menu, Category Pages & Product Card Grid

```
Build the full Products navigation structure and category listing pages.

PRODUCTS DROPDOWN STRUCTURE (must match exactly):
Products
├── Plants
│   ├── Indoor Plants
│   └── Outdoor Plants
├── Pots (5 categories total — Ceramic and Chinese Premium are SEPARATE,
│         not nested inside each other)
│   ├── Ceramic Pots
│   ├── Chinese Premium Pots
│   ├── Plastic Pots
│   ├── Fiber Pots
│   └── Soil (Mitti) Pots
└── Other Products
    ├── Diwali Decoration Products
    ├── Water Fountains
    └── Ganpati Murti

REQUIREMENTS:
- On desktop: the Products nav item opens a mega menu dropdown showing this
  full tree, grouped into columns (Plants / Pots / Other Products), each with
  its own heading.
- On mobile: the same structure becomes an expandable accordion inside the
  mobile nav menu.
- Clicking any leaf category (e.g. "Indoor Plants", "Ceramic Pots", "Chinese
  Premium Pots") navigates to its own dedicated category page with a unique
  route, e.g. /products/plants/indoor.
- Build the Category Page template (used by every category):
  - Page header with the category name and a short category description.
  - A responsive product grid (2 cols mobile, 3 tablet, 4 desktop) using the
    Card component.
  - Each Product Card shows: large product image, product name, short
    description, available sizes, available colors (if applicable), "Suitable
    For" tag, Plant Care Difficulty (Easy/Moderate/Hard badge), Sunlight
    Requirement icon+label, Water Requirement icon+label, an Availability
    badge (In Stock / Limited / Out of Stock), and a "WhatsApp Enquiry" button
    (link to https://wa.me/918007634856 with a pre-filled message mentioning
    the product name).
  - STRICT: No price shown anywhere. No "Add to Cart" button anywhere.
  - Cards should have a subtle hover animation (lift + shadow increase).
  - Fetch category and product data from the Supabase tables created in
    Phase 0 (not hardcoded arrays). Seed 5–8 sample products per category
    directly in Supabase so the grid can be visually tested end-to-end —
    real ongoing product entry happens through the Admin Panel in Phase 10.
  - Use paginated queries (or "load more" / infinite scroll) rather than
    fetching an entire category's products at once — this matters once a
    category has 100+ products.
  - Use ISR (revalidate every few minutes, or on-demand revalidation
    triggered from the admin panel) so category pages stay fast (served from
    cache) but update soon after an admin edits a product.

Do not build the Product Detail Page yet — that's Phase 3.
```

---

## PHASE 3 — Product Detail Page & Search + Filters

```
Build two things in this phase: the Product Detail Page, and the Search/Filter
experience.

PRODUCT DETAIL PAGE (route like /products/:category/:slug):
- Image gallery with thumbnail strip and a main image; images should be
  zoomable on click/hover (lightbox or pinch-zoom style).
- Product name, full description, key Features list, Specifications table.
- "Plant Care Guide" section — shown ONLY for plant products (watering
  frequency, sunlight, difficulty, ideal placement, common issues).
- "Material Details" section — shown ONLY for pot products (material type,
  drainage, weather resistance, weight).
- "Related Products" carousel/grid showing 4–6 similar items from the same
  category.
- Prominent "WhatsApp Enquiry" button (pre-filled message with product name),
  sticky on mobile so it's always reachable while scrolling.
- No price, no Add to Cart, no checkout anywhere on this page.

SEARCH:
- A functional search bar (triggered from the header Search icon) that
  searches across product name and description, debounced as the user types
  (don't fire a database query on every keystroke).
- Query Supabase directly (indexed text search columns, or Postgres full-text
  search) rather than filtering a big in-memory array — this keeps search
  fast even with thousands of products.
- Filter panel/sidebar with these filter groups: Category, Indoor/Outdoor,
  Plant Type, Pot Material, Pot Size, Color, Difficulty, Sunlight requirement.
- Filters should be combinable (AND logic), translated into indexed Supabase
  query conditions, and show a live result count.
- Fully responsive: sidebar on desktop, slide-up/modal filter drawer on mobile.
- Smooth animation when results update (fade/stagger the grid items).
```

---

## PHASE 4 — Garden Services Page

```
Build a complete, premium, service-oriented "Garden Services" page (separate
nav item, not under Products). Target audience: residential societies,
apartments, flats, villas, offices, schools, and commercial spaces.

SECTIONS (in order):

1. Hero Section
   - Title (Headline/Display style): "Professional Garden Development &
     Maintenance Services"
   - Subtitle: "We design, develop, beautify, and maintain green spaces for
     residential societies, apartments, offices, villas, schools, and
     commercial properties."
   - CTA buttons: "Request Site Visit" (opens the Service Inquiry Form further
     down the page) and "Contact on WhatsApp" (wa.me link).

2. Services We Offer — modern service cards, one per service:
   - Garden Design: Landscape planning, Garden layout, Decorative plantations
   - Society & Apartment Gardening: Garden development, Common area
     beautification, Clubhouse landscaping, Entrance plantation, Terrace gardens
   - Plant Supply: Indoor plants, Outdoor plants, Flowering plants, Avenue
     plants, Decorative plants
   - Pot Installation: Ceramic pots, Fiber planters, Plastic planters,
     Designer planters
   - Garden Maintenance: Regular maintenance, Pruning, Fertilization, Seasonal
     plantation, Weed removal, Plant replacement
   - Water Features: Decorative fountains, Garden fountains, Water feature
     installation

3. Our Process — a horizontal (desktop) / vertical (mobile) animated timeline:
   Contact Us → Site Visit → Requirement Discussion → Garden Design Proposal
   → Plantation & Installation → Regular Maintenance.

4. Why Choose Us — icon cards: Experienced Team, Healthy Plants, Professional
   Installation, Affordable Pricing, Timely Service, Custom Garden Designs,
   Premium Quality Products, After-Service Support.

5. Project Gallery — image grid/masonry of: Society Gardens, Apartment
   Landscapes, Villas, Terrace Gardens, Office Gardens, Fountain Installations
   (use placeholder images for now, with a lightbox on click).

6. Service Inquiry Form:
   Fields: Name, Phone Number, Email, Property Type (dropdown), Location,
   Service Required (dropdown/multi-select from the services above), Message.
   Buttons: "Submit Inquiry" and "WhatsApp Now" (sends the same details as a
   pre-filled WhatsApp message where feasible).
   Include client-side validation with friendly inline error messages.

Note: the "Admin Management for Garden Services" (adding/editing services,
gallery, FAQs, inquiries) is part of the Admin Panel — build that in Phase 10,
not here. For now this page can read from static/sample data.
```

---

## PHASE 5 — Our Stores Page

```
Build the "Our Stores" page showing both nursery branches as premium cards.

Use this exact data — do not invent or alter it:

STORE 1 — Shivansh Rose Nursery
Address: Atlanta 2 Society, New Wakad – Hinjawadi Link Rd, opposite Pune,
Hinjawadi, Pimpri-Chinchwad (Pune Area), Maharashtra 411057.
Landmark: Opposite Pune, near the Atlanta 2 society cluster.
Hours: 8:00 AM – 10:30 PM, all 7 days.
Contact: WhatsApp/Call 8007634856 (also 9175418744, 7499165488).

STORE 2 — Shweta Matka Bhandar and Nursery
Address: Hinjewadi Jakatnaka, Wakad Rd, opposite Madhuban Hotel, Pune,
Maharashtra 411057.
Landmark: Opposite Madhuban Family Restaurant And Bar, near Hinjewadi
Jakatnaka; close to the Shivansh Rose Nursery neighbourhood on the same main
stretch.
Hours: 8:00 AM – 10:30 PM, all 7 days.
Contact: same numbers as above.

EACH STORE CARD MUST INCLUDE:
- Store photo (placeholder nursery/storefront image for now).
- Store name.
- Complete address, formatted clearly and readably.
- "Open in Google Maps" button linking to a Google Maps search URL built from
  the address text.
- "Call" button using a tel: link.
- "WhatsApp" button using a wa.me link.
- Opening hours displayed clearly, with a simple "Open now / Closed" live
  indicator computed from the current time against 8:00 AM–10:30 PM.

Layout: two large, elegant cards side by side on desktop, stacked on mobile,
with soft shadow and rounded corners consistent with the design system.
```

---

## PHASE 6 — About Us & Why Choose Us

```
Build the About Us page/section.

ABOUT US:
- Large, premium hero-style section telling the nursery's story (write warm,
  trustworthy sample copy — the owner can edit exact wording later) covering:
  years of experience, huge plant/pot collection, quality plants, affordable
  prices, expert guidance, healthy plants, and a courteous/friendly team.
- Include beautiful nursery imagery (placeholder for now) interwoven with the
  text, not just one image block.
- Animated statistics cards with count-up animation on scroll into view:
  "Happy Customers" and "Years of Experience" (use sample numbers, clearly
  marked as placeholders to be replaced with real figures).

WHY CHOOSE US (can reuse this section's component on the Home page too):
Icon cards, each with a Lucide icon + short label:
Healthy Plants, Affordable Pricing, Wide Variety, Premium Quality, Easy
Parking, Fresh Stock, Customer Satisfaction.
- Cards should have a gentle hover/scale animation.
- Responsive grid: 2 cols mobile, 3–4 cols desktop.
```

---

## PHASE 7 — Plant Care Tips, Gallery & Home Page Assembly

```
Build the Plant Care Tips section, the Gallery section, and then assemble the
full Home Page by combining everything built in Phases 1–7.

PLANT CARE TIPS (blog-style cards, can be simple static cards for now — a real
CMS/blog engine is not required):
Card topics: "How often should you water plants?", "Best indoor plants", "Best
air purifier plants", "Summer plant care", "Winter plant care", "Repotting
guide", "Beginner gardening tips".
Each card: image, title, short excerpt, "Read More" link (can open a simple
detail view or modal with the fuller sample text).

GALLERY:
- Pinterest-style masonry gallery (varied image heights, no rigid grid).
- Categories of imagery to represent: Plants, Pots, Garden, Store, Customers,
  Landscape (mix placeholder images across these).
- Clicking an image opens a lightbox with smooth zoom-in animation and
  next/prev navigation.

HOME PAGE ASSEMBLY:
Now assemble the full Home Page in this order, reusing everything already
built: Header → Hero → Featured Products preview (pull a few sample products
from Phase 2's data) → Why Choose Us → About Us summary (short teaser linking
to full About page) → Garden Services teaser (linking to full page) → Plant
Care Tips → Gallery preview → (Testimonials and FAQ will slot in after Phase 8)
→ Footer.
Make sure section transitions have smooth scroll-reveal animations (Framer
Motion, staggered fade/slide-in) and that the whole page performs well (lazy
loaded images, no layout shift).
```

---

## PHASE 8 — Testimonials, FAQ & Contact Page

```
Build Testimonials, FAQ, and the Contact page/section.

TESTIMONIALS:
- Modern slider/carousel (auto-advance + manual swipe/arrows).
- Each testimonial: customer photo (placeholder), name, star rating (1–5,
  rendered visually), review text.
- Smooth slide transition animation.

FAQ:
- Accordion-style, smooth expand/collapse animation.
- Sample questions across these topics: Plant care, Delivery, Availability,
  Pot sizes, Replacement policy, Store timings.

CONTACT PAGE/SECTION:
- Contact form: Name, Phone, Email, Message, Submit button, with inline
  validation.
- Direct contact details clearly displayed: Phone numbers (8007634856,
  9175418744, 7499165488), Email (shivanshrosenursery@gmail.com), WhatsApp
  button, working hours (8:00 AM – 10:30 PM, daily).
- Embedded Google Map (or a "View on Google Maps" card) for both store
  locations.
- Social media icon links (placeholder hrefs are fine until real profiles are
  provided).

Insert the Testimonials and FAQ sections into the Home Page assembly from
Phase 7, in a sensible order (Testimonials before FAQ, FAQ before Contact/Footer).
```

---

## PHASE 9 — Floating Buttons & Footer

```
Build the global Floating Buttons and the Footer, and wire them into the base
Layout from Phase 0 so they appear on every page.

FLOATING BUTTONS (bottom-right stack, always visible while scrolling):
- WhatsApp floating button → wa.me/918007634856, with a subtle pulse/glow
  micro-interaction to draw attention without being annoying.
- Call floating button → tel:8007634856.
- Back-to-Top button → appears only after the user scrolls down a bit, smooth
  scroll to top on click.
- Ensure these never overlap page content on mobile and respect safe-area
  insets.

FOOTER (on every page):
- Quick Links (Home, Products, Garden Services, Our Stores, About Us, Contact).
- Product Categories (the full tree from Phase 2, as simple links).
- Store Locations (both stores, short address + link to full Our Stores page).
- Contact Information (phone numbers, email, WhatsApp).
- Business Hours (8:00 AM – 10:30 PM, all days).
- Social media icons.
- Newsletter subscription input (email field + subscribe button — can be a
  non-functional/UI-only placeholder for now, or wire to a simple mock
  handler).
- Copyright line: "© [current year] Shivansh Rose Nursery. All rights reserved."
- Keep footer visually calm relative to the rest of the site — dark green
  background using --primary or --tertiary tokens with --on-primary text.
```

---

## PHASE 10 — Admin Panel (No-Code Content Management)

```
Build a simple, secure Admin Dashboard so the nursery owner can manage all
website content without touching code. This is the most complex phase — if the
AI tool struggles, split it into smaller sub-steps (10a Auth, 10b Products,
10c everything else) rather than doing it all at once.

AUTH:
- Login-protected route (/admin) using Supabase Auth (email/password) — a
  single admin account is enough, no need for multi-role permissions.
- Protect all admin routes and all admin API/server actions from
  unauthenticated access at the server level (middleware/session check), not
  just by hiding UI — a logged-out user must never be able to call an admin
  write endpoint directly.
- All product/category/store/etc. write operations must go through Supabase
  RLS-protected calls that verify the authenticated admin role — the public
  anon key must never be able to write, only read published data.
- Rate-limit and log failed login attempts.

PRODUCT MANAGEMENT (the core of the admin panel):
- Add / Edit / Delete product.
- Upload multiple images per product.
- Assign/change category and subcategory (from the Phase 2 tree), including
  moving a product to a different category.
- Fields per product: Product Name, Multiple Images, Short Description,
  Detailed Description, Category, Subcategory, Available Sizes, Available
  Colors (if applicable), Plant Care Information (for plants only), Material
  (for pots only), Availability Status, Featured Product toggle.
- Hide/unhide products; drag-or-dropdown-based sort order.
- No limit on number of products — admin should be able to add hundreds
  without performance issues (use pagination/virtualized lists in the admin
  table view, never load every product into one unpaginated table).
- Image uploads go through the signed Cloudinary upload flow set up in Phase
  0 (server-validated file type/size before the signed upload is issued);
  the resulting Cloudinary public_id/URL is what gets saved on the product
  row in Supabase. Use CldImage (next-cloudinary) with the transformation
  presets from Phase 0 for every image shown on the public site, so
  everything is automatically optimized/responsive.
- Ability to add brand-new categories/subcategories in the future, not just
  the ones defined in Phase 2.
- STRICT: no price field, no inventory/stock-count field, no order
  management, no customer accounts, no payment settings anywhere in the admin.

OTHER ADMIN SECTIONS:
- Manage Categories (add/edit/delete/reorder the product tree).
- Manage Stores (edit the two store cards' details, hours, images).
- Manage Garden Services (add/edit services, update descriptions, manage the
  project gallery, manage FAQs specific to that page, view/manage submitted
  inquiry requests).
- Manage Blogs (the Plant Care Tips cards).
- Manage Testimonials (add/edit/delete, star rating, photo).
- Manage Gallery (upload/remove/reorder masonry gallery images).
- Manage FAQs (site-wide FAQ accordion).
- Update general contact details (phone, email, hours) used across the site.
- View submitted Contact/Service inquiry form entries in a simple table.

Keep the admin UI clean and functional rather than decorative — this is a
back-office tool, it does not need to follow the public-site design system as
strictly, but should still be pleasant and easy to use (clear forms, image
upload previews, confirmation dialogs before delete).
```

---

## PHASE 11 — Final Polish Pass

```
Do a full final polish pass across the entire site built in Phases 0–10. Go
page by page and check:

1. PERFORMANCE: all images served via Cloudinary (CldImage), properly
   sized/compressed (WebP/AVIF); routes code-split; ISR/SSG used wherever
   content allows; no unnecessary re-renders; run Lighthouse and target 90+
   on Performance.
2. SEO: unique <title> and meta description per page/category (dynamically
   generated per product/category from Supabase data), semantic HTML (proper
   h1/h2/h3 hierarchy, no skipped levels), descriptive alt text on every
   image, sitemap.xml and robots.txt generated, Open Graph tags for social
   sharing.
3. ACCESSIBILITY: color contrast against the given palette, keyboard
   navigation through nav/menus/forms, aria-labels on all icon-only buttons
   (WhatsApp, Call, Search, social icons), focus states visible. Target 90+
   on Lighthouse Accessibility.
4. SECURITY AUDIT: confirm RLS policies actually block anonymous writes (test
   with the anon key directly, don't just trust the UI); confirm no secret
   keys are present in client-side JS bundles (inspect the build output);
   confirm all forms validate and sanitize input server-side; confirm admin
   routes reject unauthenticated requests at the API level; confirm security
   headers are present in production responses.
5. SCALABILITY CHECK: confirm product/category listings are paginated (not
   "fetch all"), confirm database columns used in filters/search are indexed,
   and mentally/actually test what happens with 500+ seeded products — the
   UI and queries should stay fast.
6. RELIABILITY: confirm every data-fetching component has a loading state and
   an error state (no blank white screens), confirm form submissions show a
   clear success/failure message and are actually saved in Supabase, and
   confirm the admin panel asks for confirmation before any delete action.
7. RESPONSIVENESS: re-check every page at mobile, tablet, and desktop
   breakpoints — especially the Products mega menu/accordion, the Garden
   Services timeline, and the Admin product table.
8. CONSISTENCY: confirm every page strictly follows the DESIGN SYSTEM colors
   and fonts (no stray hex codes or default Tailwind colors slipped in), that
   the Pots category correctly shows 5 separate top-level categories (Ceramic
   Pots, Chinese Premium Pots, Plastic Pots, Fiber Pots, Soil/Mitti Pots), and
   that no page anywhere shows a price, Add to Cart, or checkout element.
9. ANIMATIONS: confirm smooth, non-jarring Framer Motion transitions
   throughout, and that the loading animation, hover states, and micro-
   interactions all feel cohesive rather than randomly applied.
10. CONTENT: flag every placeholder image/text/statistic clearly so the owner
    knows exactly what needs to be swapped for real photos and real numbers
    before launch.

Produce a short checklist/report at the end summarizing what was fixed and
what (if anything) still needs real content from the client before go-live.
```

---

## Tips for Using These Prompts with an AI Coding Tool

1. **One phase per conversation/session** where possible — this keeps the AI's
   context focused and avoids it forgetting earlier design decisions.
2. **Always re-paste the DESIGN SYSTEM block** at the start of a new phase if
   you're starting a fresh chat/session with the AI tool.
3. **Test after every phase** before moving to the next — check mobile view,
   click every button, confirm no price/cart elements have crept in.
4. If a phase still feels too big for the AI to handle well in one go (very
   common for Phase 2, Phase 4, and Phase 10), break that phase further into
   lettered sub-steps (e.g. 2a: mega menu only, 2b: category page template,
   2c: product card component) and feed them one at a time.
5. Keep a running note of what's still placeholder (sample products, sample
   images, sample statistics, sample testimonials) so nothing fake accidentally
   ships to the live site.
