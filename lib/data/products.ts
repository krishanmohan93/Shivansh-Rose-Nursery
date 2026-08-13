import { Product as DbProduct } from '@/types/database';
import { SEED_PRODUCTS } from '@/lib/data/products-seed';
import { getStoredProducts } from '@/lib/store/productsStore';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  image: string;
  images?: string[];
  shortDescription: string;
  fullDescription: string;
  availableSizes?: string[];
  availableColors?: string[];
  careInformation?: {
    sunlight?: string;
    watering?: string;
    soilMix?: string;
  };
  potMaterial?: string;
  isFeatured?: boolean;
  isHidden?: boolean;
  availabilityStatus?: string;
  badge?: string;
}

export function mapDbProductToAdminProduct(seed: DbProduct): Product {
  let category = 'plants';
  let subcategory = 'indoor';

  if (seed.category_id === 'cat-indoor') {
    category = 'plants';
    subcategory = 'indoor';
  } else if (seed.category_id === 'cat-outdoor') {
    category = 'plants';
    subcategory = 'outdoor';
  } else if (seed.category_id === 'cat-pots' || seed.category_id === 'cat-pots-ceramic') {
    category = 'pots';
    subcategory = 'ceramic';
  } else if (seed.category_id === 'cat-chinese-pots' || seed.category_id === 'cat-pots-chinese-premium') {
    category = 'pots';
    subcategory = 'chinese-premium';
  } else if (seed.category_id === 'cat-fiber-pots' || seed.category_id === 'cat-pots-fiber') {
    category = 'pots';
    subcategory = 'fiber';
  } else if (seed.category_id === 'cat-soil-matka' || seed.category_id === 'cat-pots-soil-mitti') {
    category = 'pots';
    subcategory = 'soil-mitti';
  } else if (seed.category_id === 'cat-fountains' || seed.category_id === 'cat-other-fountains') {
    category = 'seasonal-special';
    subcategory = 'water-fountains';
  } else if (seed.category_id) {
    subcategory = seed.category_id;
  }

  return {
    id: seed.id,
    name: seed.name,
    slug: seed.slug,
    category,
    subcategory,
    image: seed.cloudinary_url || '/images/plants/peace lily.jpg',
    images: seed.cloudinary_url ? [seed.cloudinary_url] : ['/images/plants/peace lily.jpg'],
    shortDescription: seed.short_description || '',
    fullDescription: seed.description || '',
    availableSizes: seed.sizes,
    availableColors: seed.colors,
    careInformation: {
      sunlight: seed.sunlight || 'Bright Indirect Sunlight',
      watering: seed.water || 'Water 1-2 times per week',
      soilMix: 'Well-draining coco-peat & vermicompost mix',
    },
    potMaterial: category === 'pots' ? 'Ceramic / Fiber / Soil' : undefined,
    isFeatured: seed.is_featured,
    isHidden: !seed.is_published,
    availabilityStatus: seed.availability_status || 'In Stock',
    badge: seed.is_featured ? 'Featured' : undefined,
  };
}

export function mapAdminProductToDbProduct(adminP: Partial<Product>, existingDbP?: DbProduct): DbProduct {
  let category_id = 'cat-indoor';

  if (adminP.category === 'plants') {
    category_id = adminP.subcategory?.includes('outdoor') ? 'cat-outdoor' : 'cat-indoor';
  } else if (adminP.category === 'pots') {
    if (adminP.subcategory?.includes('chinese')) category_id = 'cat-pots-chinese-premium';
    else if (adminP.subcategory?.includes('fiber')) category_id = 'cat-pots-fiber';
    else if (adminP.subcategory?.includes('soil') || adminP.subcategory?.includes('mitti')) category_id = 'cat-pots-soil-mitti';
    else category_id = 'cat-pots-ceramic';
  } else if (adminP.category === 'seasonal-special') {
    category_id = 'cat-other-fountains';
  }

  const slug = adminP.slug || adminP.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `prod-${Date.now()}`;

  return {
    id: adminP.id || `prod-${Date.now()}`,
    name: adminP.name || 'New Product',
    slug,
    category_id,
    short_description: adminP.shortDescription || adminP.name || '',
    description: adminP.fullDescription || adminP.shortDescription || '',
    suitable_for: adminP.category === 'plants' ? ['Indoor', 'Living Room'] : ['Balcony', 'Home Decor'],
    plant_care_difficulty: 'Easy',
    sunlight: adminP.careInformation?.sunlight || 'Bright Indirect Light',
    water: adminP.careInformation?.watering || 'Water weekly',
    availability_status: (adminP.availabilityStatus as any) || 'In Stock',
    sizes: adminP.availableSizes || ['Small', 'Medium'],
    colors: adminP.availableColors || ['Green'],
    cloudinary_url: adminP.image || adminP.images?.[0] || '/images/plants/peace lily.jpg',
    features: ['High Quality Nursery Specimen', 'Hand-selected by experts'],
    specifications: { 'Ideal Placement': 'Home & Garden Decor' },
    is_published: !adminP.isHidden,
    is_featured: !!adminP.isFeatured,
    is_popular: !!adminP.isFeatured,
    show_on_homepage: !!adminP.isFeatured,
    created_at: existingDbP?.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function getAdminProducts(): Product[] {
  const dbProducts = getStoredProducts();
  return dbProducts.map(mapDbProductToAdminProduct);
}

export const PRODUCTS: Product[] = SEED_PRODUCTS.map(mapDbProductToAdminProduct);
