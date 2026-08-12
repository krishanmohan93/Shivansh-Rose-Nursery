import { SEED_PRODUCTS } from '@/lib/data/products-seed';

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

export const PRODUCTS: Product[] = SEED_PRODUCTS.map((seed) => {
  let category = 'plants';
  let subcategory = 'indoor';

  if (seed.category_id === 'cat-indoor') {
    category = 'plants';
    subcategory = 'indoor';
  } else if (seed.category_id === 'cat-outdoor') {
    category = 'plants';
    subcategory = 'outdoor';
  } else if (seed.category_id === 'cat-pots') {
    category = 'pots';
    subcategory = 'ceramic';
  } else if (seed.category_id === 'cat-chinese-pots') {
    category = 'pots';
    subcategory = 'chinese-premium';
  } else if (seed.category_id === 'cat-fiber-pots') {
    category = 'pots';
    subcategory = 'fiber';
  } else if (seed.category_id === 'cat-soil-matka') {
    category = 'pots';
    subcategory = 'soil-mitti';
  } else if (seed.category_id === 'cat-fountains') {
    category = 'seasonal-special';
    subcategory = 'water-fountains';
  }

  return {
    id: seed.id,
    name: seed.name,
    slug: seed.slug,
    category,
    subcategory,
    image: seed.cloudinary_url || '/images/plants/peace lily.jpg',
    images: [seed.cloudinary_url || '/images/plants/peace lily.jpg'],
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
    badge: seed.badge || (seed.is_featured ? 'Featured' : undefined),
  };
});
