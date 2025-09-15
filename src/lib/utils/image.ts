/**
 * Image optimization utilities for Keystone CMS images
 */

export interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
}

/**
 * Generate an optimized image URL through our proxy
 */
export function getOptimizedImageUrl(imageId: string, options: ImageOptions = {}): string {
  if (!imageId) return '';
  
  const searchParams = new URLSearchParams();
  
  if (options.width) searchParams.set('w', options.width.toString());
  if (options.height) searchParams.set('h', options.height.toString());
  if (options.quality) searchParams.set('q', options.quality.toString());
  if (options.format) searchParams.set('f', options.format);
  
  const queryString = searchParams.toString();
  const baseUrl = `/api/images/${imageId}`;
  
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Extract image ID from Keystone image URL
 */
export function extractImageId(url: string): string | null {
  if (!url) return null;
  
  const imageMatch = url.match(/\/images\/([^/?]+)/);
  return imageMatch ? imageMatch[1] : null;
}

/**
 * Generate responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(imageId: string, basePath: string = '/api/images'): {
  src: string;
  srcset: string;
  sizes: string;
} {
  if (!imageId) {
    return { src: '', srcset: '', sizes: '' };
  }
  
  const base = `${basePath}/${imageId}`;
  
  // Generate different sizes
  const sizes = [320, 640, 768, 1024, 1280, 1920];
  const srcset = sizes
    .map(size => `${base}?w=${size}&q=80&f=webp ${size}w`)
    .join(', ');
  
  return {
    src: `${base}?w=800&q=80&f=webp`, // Default fallback
    srcset,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
  };
}

/**
 * Convert any image URL to use our proxy
 */
export function toProxyUrl(url: string): string {
  const imageId = extractImageId(url);
  return imageId ? `/api/images/${imageId}` : url;
}
