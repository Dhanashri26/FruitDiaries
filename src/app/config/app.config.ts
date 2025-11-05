import { environment } from '../../environments/environment';

/**
 * Application-wide configuration constants
 * 
 * Why centralized config instead of hardcoded values in components?
 * 1. Single Source of Truth - Change once, affects all components
 * 2. Environment-aware - Different values for dev/prod
 * 3. Easy Maintenance - Update URLs/metadata in one place
 * 4. Type Safety - Constants are properly typed
 * 5. Reusability - Shared across multiple components
 * 6. Testability - Easy to mock/override in tests
 */
export const APP_CONFIG = {
  // Base URL - automatically uses correct environment (dev/prod)
  BASE_URL: environment.baseUrl,
  
  // API URL - can be different per environment
  API_URL: environment.apiUrl,
  
  // Default image for SEO meta tags (blog listing page)
  DEFAULT_SEO_IMAGE: 'https://images.unsplash.com/photo-1471500466955-85aecf33f71f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  
  // Default blog listing image (for JSON-LD)
  DEFAULT_BLOG_IMAGE: '/assets/photo1.1.jpg',
  
  // Site metadata - These could also come from environment or CMS
  SITE_NAME: 'Fruit Diaries',
  SITE_DESCRIPTION: 'Buy fresh fruits online at affordable prices. Healthy eating starts here with amazing blog stories!',
  
  // Author information
  AUTHOR_NAME: 'Dhanashri Lambade',
  AUTHOR_DATE_PUBLISHED: '2025-10-30'
} as const;

/**
 * Helper function to convert relative image paths to absolute URLs
 * Removes /public prefix and converts to absolute URL
 */
export function getAbsoluteImageUrl(imagePath: string): string {
  let path = imagePath;
  
  // Remove /public prefix if present (assets are served from root in production)
  if (path.startsWith('/public/')) {
    path = path.replace('/public', '');
  }
  
  // Ensure it starts with /
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  
  // If already absolute, return as is
  if (path.startsWith('http')) {
    return path;
  }
  
  // Convert to absolute URL
  return `${APP_CONFIG.BASE_URL}${path}`;
}

