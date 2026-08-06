export interface CategoryItem {
  name: string;
  slug: string;
  path: string;
  description: string;
  icon?: string;
  parentSlug?: string;
  image?: string;
}

export interface CategoryGroup {
  groupName: string;
  groupSlug: string;
  description: string;
  items: CategoryItem[];
}

export const CATEGORY_STRUCTURE: CategoryGroup[] = [
  {
    groupName: 'Plants',
    groupSlug: 'plants',
    description: 'Fresh indoor air-purifiers, lush outdoor greenery & ornamental landscape plants.',
    items: [
      {
        name: 'Indoor Plants',
        slug: 'indoor',
        parentSlug: 'plants',
        path: '/products/plants/indoor',
        description: 'Air-purifying, low-maintenance indoor plants for homes, living rooms, and office desks.',
        icon: 'Leaf',
      },
      {
        name: 'Outdoor Plants',
        slug: 'outdoor',
        parentSlug: 'plants',
        path: '/products/plants/outdoor',
        description: 'Flowering shrubs, avenue trees, hedging plants, and sun-loving outdoor species for gardens & balconies.',
        icon: 'Sun',
      },
    ],
  },
  {
    groupName: 'Pots & Planters',
    groupSlug: 'pots',
    description: 'Luxury handcrafted ceramic, Chinese premium, fiber, plastic, and traditional mitti pots.',
    items: [
      {
        name: 'Ceramic Pots',
        slug: 'ceramic',
        parentSlug: 'pots',
        path: '/products/pots/ceramic',
        description: 'Handglazed premium ceramic planters in vibrant colors, pastel shades, and modern patterns.',
        icon: 'Sparkles',
      },
      {
        name: 'Chinese Premium Pots',
        slug: 'chinese-premium',
        parentSlug: 'pots',
        path: '/products/pots/chinese-premium',
        description: 'Exclusive high-shine imported Chinese porcelain and ceramic planters with luxury artistic motifs.',
        icon: 'Crown',
      },
      {
        name: 'Plastic Pots',
        slug: 'plastic',
        parentSlug: 'pots',
        path: '/products/pots/plastic',
        description: 'Durable, lightweight UV-resistant plastic planters ideal for everyday balcony and garden use.',
        icon: 'Box',
      },
      {
        name: 'Fiber Pots',
        slug: 'fiber',
        parentSlug: 'pots',
        path: '/products/pots/fiber',
        description: 'Modern lightweight fiber-reinforced plastic (FRP) planters for societies, villas, and commercial spaces.',
        icon: 'Shield',
      },
      {
        name: 'Soil (Mitti) Pots',
        slug: 'soil-mitti',
        parentSlug: 'pots',
        path: '/products/pots/soil-mitti',
        description: 'Eco-friendly traditional terracotta soil matka pots promoting natural root aeration.',
        icon: 'Globe',
      },
    ],
  },
  {
    groupName: 'Other Products',
    groupSlug: 'other',
    description: 'Festive festive decorations, soothing water fountains, and spiritual Ganpati idols.',
    items: [
      {
        name: 'Diwali Decoration Products',
        slug: 'diwali-decoration',
        parentSlug: 'other',
        path: '/products/other/diwali-decoration',
        description: 'Decorative diyas, artificial floral torans, rangoli accessories, and festive garden illuminations.',
        icon: 'Flame',
      },
      {
        name: 'Water Fountains',
        slug: 'water-fountains',
        parentSlug: 'other',
        path: '/products/other/water-fountains',
        description: 'Calming indoor & outdoor water features, cascading rock fountains, and decorative garden waterfalls.',
        icon: 'Droplets',
      },
      {
        name: 'Ganpati Murti',
        slug: 'ganpati-murti',
        parentSlug: 'other',
        path: '/products/other/ganpati-murti',
        description: 'Eco-friendly clay Lord Ganesha idols for Ganesh Chaturthi and home mandir blessings.',
        icon: 'Smile',
      },
    ],
  },
];

export const ALL_LEAF_CATEGORIES: CategoryItem[] = CATEGORY_STRUCTURE.flatMap((group) => group.items);

export function findCategoryByPath(pathSegments: string[]): CategoryItem | CategoryGroup | null {
  if (!pathSegments || pathSegments.length === 0) return null;

  const [parent, child] = pathSegments;

  if (child) {
    const leaf = ALL_LEAF_CATEGORIES.find(
      (cat) => cat.parentSlug === parent && cat.slug === child
    );
    if (leaf) return leaf;
  }

  const group = CATEGORY_STRUCTURE.find((g) => g.groupSlug === parent);
  if (group) return group;

  const directLeaf = ALL_LEAF_CATEGORIES.find((cat) => cat.slug === parent);
  if (directLeaf) return directLeaf;

  return null;
}
