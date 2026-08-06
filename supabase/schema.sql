-- Shivansh Rose Nursery PostgreSQL Database Schema & Security Foundation

-- 1. CATEGORIES TABLE (Supports nested categories/subcategories)
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    description TEXT,
    cloudinary_public_id TEXT,
    cloudinary_url TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. PRODUCTS TABLE (Digital Catalogue - NO prices)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    short_description TEXT,
    description TEXT,
    suitable_for TEXT[] DEFAULT '{}',
    plant_care_difficulty VARCHAR(50) DEFAULT 'N/A',
    sunlight VARCHAR(255),
    water VARCHAR(255),
    availability_status VARCHAR(50) DEFAULT 'In Stock',
    sizes TEXT[] DEFAULT '{}',
    colors TEXT[] DEFAULT '{}',
    cloudinary_public_id TEXT,
    cloudinary_url TEXT,
    features TEXT[] DEFAULT '{}',
    specifications JSONB DEFAULT '{}'::jsonb,
    is_published BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_popular BOOLEAN DEFAULT false,
    show_on_homepage BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. STORES TABLE
CREATE TABLE IF NOT EXISTS stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    landmark TEXT,
    phone_1 VARCHAR(20) NOT NULL,
    phone_2 VARCHAR(20),
    whatsapp_number VARCHAR(20) NOT NULL,
    map_embed_url TEXT,
    opening_hours VARCHAR(255) DEFAULT '8:00 AM - 10:30 PM (All 7 Days)',
    cloudinary_public_id TEXT,
    cloudinary_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. GARDEN SERVICES TABLE
CREATE TABLE IF NOT EXISTS garden_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description TEXT,
    full_description TEXT,
    features TEXT[] DEFAULT '{}',
    cloudinary_public_id TEXT,
    cloudinary_url TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. GALLERY IMAGES TABLE
CREATE TABLE IF NOT EXISTS gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    category_tag VARCHAR(100) DEFAULT 'General',
    cloudinary_public_id TEXT NOT NULL,
    cloudinary_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    cloudinary_public_id TEXT,
    cloudinary_url TEXT,
    is_featured BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. FAQS TABLE
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author VARCHAR(100) DEFAULT 'Shivansh Rose Nursery',
    cloudinary_public_id TEXT,
    cloudinary_url TEXT,
    is_published BOOLEAN DEFAULT true,
    published_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. INQUIRIES TABLE (Contact + Service Inquiries)
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    inquiry_type VARCHAR(100) DEFAULT 'General Contact',
    message TEXT NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    store_id UUID REFERENCES stores(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- INDEXES FOR FAST SEARCH AND FILTERING
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_published ON products(is_published);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE garden_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Anon / Public users can view active published content)
CREATE POLICY "Public read active categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read published products" ON products FOR SELECT USING (is_published = true);
CREATE POLICY "Public read active stores" ON stores FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active services" ON garden_services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active gallery" ON gallery_images FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active faqs" ON faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Public read published blog posts" ON blog_posts FOR SELECT USING (is_published = true);

-- PUBLIC INSERT POLICY FOR INQUIRIES
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- AUTHENTICATED ADMIN FULL ACCESS POLICIES
CREATE POLICY "Admin full categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full stores" ON stores FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full services" ON garden_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full gallery" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full inquiries" ON inquiries FOR ALL USING (auth.role() = 'authenticated');
