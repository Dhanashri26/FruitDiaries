import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BlogService } from './blog.service';
import { Blog } from './models/Blog.model';
import { firstValueFrom } from 'rxjs';

/**
 * Resolver for blog list page - fetches all blogs
 * This ensures SSR waits for data before rendering
 */
export const blogsResolver: ResolveFn<Blog[]> = (route, state) => {
  const blogService = inject(BlogService);
  
  console.log(`[Resolver] Fetching all blogs`);
  
  // Return a promise that resolves with all blogs
  // This ensures SSR waits for the data before rendering
  return firstValueFrom(blogService.getAllBlogs()).then(blogs => {
    console.log(`[Resolver] Resolved ${blogs.length} blogs`);
    return blogs;
  });
};

