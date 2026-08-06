export const CLOUDINARY_FOLDERS = {
  products: 'shivansh-rose-nursery/products',
  gallery: 'shivansh-rose-nursery/gallery',
  testimonials: 'shivansh-rose-nursery/testimonials',
  stores: 'shivansh-rose-nursery/stores',
  services: 'shivansh-rose-nursery/services',
  blogs: 'shivansh-rose-nursery/blogs',
} as const;

export type CloudinaryFolderKey = keyof typeof CLOUDINARY_FOLDERS;

/**
 * Generates an optimized Cloudinary CDN URL based on transformation presets.
 */
export function getCloudinaryImageUrl(
  publicId: string | null | undefined,
  preset: 'thumbnail' | 'card' | 'detail-large' | 'gallery-masonry' | 'banner' = 'card'
): string {
  if (!publicId) return '/images/hero-1.jpeg';
  if (publicId.startsWith('http') || publicId.startsWith('/images/')) {
    return publicId;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'shivansh-rose-nursery';
  let transformations = 'f_auto,q_auto';

  switch (preset) {
    case 'thumbnail':
      transformations += ',w_150,h_150,c_thumb,g_auto';
      break;
    case 'card':
      transformations += ',w_600,h_600,c_fill,g_auto';
      break;
    case 'detail-large':
      transformations += ',w_1200,c_limit';
      break;
    case 'gallery-masonry':
      transformations += ',w_800,c_limit';
      break;
    case 'banner':
      transformations += ',w_1920,h_800,c_fill,g_auto';
      break;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
}
