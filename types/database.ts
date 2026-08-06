export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string | null;
  description?: string | null;
  cloudinary_public_id?: string | null;
  cloudinary_url?: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  short_description?: string | null;
  description?: string | null;
  suitable_for?: string[];
  plant_care_difficulty?: 'Easy' | 'Moderate' | 'Hard' | 'N/A';
  sunlight?: string | null;
  water?: string | null;
  availability_status: 'In Stock' | 'Limited Stock' | 'Out of Stock';
  sizes?: string[];
  colors?: string[];
  cloudinary_public_id?: string | null;
  cloudinary_url?: string | null;
  features?: string[];
  specifications: Record<string, string>;
  is_published: boolean;
  is_featured: boolean;
  is_popular?: boolean;
  show_on_homepage?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  address: string;
  landmark?: string;
  phone_1: string;
  phone_2?: string;
  whatsapp_number: string;
  map_embed_url?: string;
  opening_hours: string;
  cloudinary_public_id?: string | null;
  cloudinary_url?: string | null;
  is_active: boolean;
  created_at?: string;
}

export interface GardenService {
  id: string;
  title: string;
  slug: string;
  short_description?: string | null;
  full_description?: string | null;
  features?: string[];
  cloudinary_public_id?: string | null;
  cloudinary_url?: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title?: string | null;
  category_tag?: string;
  cloudinary_public_id: string;
  cloudinary_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  location?: string | null;
  rating: number;
  review_text: string;
  cloudinary_public_id?: string | null;
  cloudinary_url?: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  author: string;
  cloudinary_public_id?: string | null;
  cloudinary_url?: string | null;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

export interface Inquiry {
  id: string;
  customer_name: string;
  phone: string;
  email?: string | null;
  inquiry_type?: string;
  message: string;
  product_id?: string | null;
  store_id?: string | null;
  status: 'new' | 'contacted' | 'resolved';
  created_at: string;
}
