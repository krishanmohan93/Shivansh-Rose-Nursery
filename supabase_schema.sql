-- ==============================================================================
-- SHIVANSH ROSE NURSERY PUNE — MASTER SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Copy and paste this script into your Supabase Dashboard ➔ SQL Editor and click RUN.
-- This script creates all required database tables, indexes, and Row Level Security (RLS) policies.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    group_name VARCHAR(255) NOT NULL,
    group_slug VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category_slug VARCHAR(255) NOT NULL,
    short_description TEXT,
    description TEXT,
    suitable_for TEXT[],
    plant_care_difficulty VARCHAR(50) DEFAULT 'Easy',
    sunlight VARCHAR(255) DEFAULT 'Bright Indirect Light',
    water VARCHAR(255) DEFAULT 'Water Weekly',
    availability_status VARCHAR(50) DEFAULT 'In Stock',
    sizes TEXT[],
    colors TEXT[],
    cloudinary_url TEXT NOT NULL,
    features TEXT[],
    specifications JSONB,
    is_published BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_popular BOOLEAN DEFAULT false,
    show_on_homepage BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. INQUIRIES & CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    inquiry_type VARCHAR(255) DEFAULT 'General Contact Inquiry',
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'resolved'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. GARDEN MAINTENANCE BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.garden_maintenance_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    plan_name VARCHAR(255) NOT NULL,
    plan_price VARCHAR(100) NOT NULL,
    plants_count VARCHAR(100),
    preferred_date VARCHAR(100) NOT NULL,
    preferred_time VARCHAR(100) NOT NULL,
    society VARCHAR(255) NOT NULL,
    building VARCHAR(255) NOT NULL,
    flat VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'scheduled', 'completed', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. REVIEWS / TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(255) NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    location VARCHAR(255) DEFAULT 'Wakad, Pune',
    is_approved BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_products_category_slug ON public.products(category_slug);
CREATE INDEX IF NOT EXISTS idx_products_is_published ON public.products(is_published);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_garden_bookings_status ON public.garden_maintenance_bookings(status);

-- 8. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.garden_maintenance_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow Public READ for Published Products & Categories
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Approved Reviews" ON public.reviews FOR SELECT USING (is_approved = true);

-- Allow Public Customers to Submit Inquiries & Bookings
CREATE POLICY "Public Insert Inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Garden Bookings" ON public.garden_maintenance_bookings FOR INSERT WITH CHECK (true);

-- Allow Full Access to Authenticated Admins
CREATE POLICY "Admin Full Access Categories" ON public.categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Products" ON public.products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Inquiries" ON public.inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Garden Bookings" ON public.garden_maintenance_bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Reviews" ON public.reviews FOR ALL USING (auth.role() = 'authenticated');

-- ==============================================================================
-- SCHEMA CREATION COMPLETED SUCCESSFULLY!
-- ==============================================================================
