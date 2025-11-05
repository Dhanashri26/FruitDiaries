import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BlogService } from './blog.service';
import { Blog } from './models/Blog.model';
import { firstValueFrom } from 'rxjs';

export const blogResolver: ResolveFn<Blog> = (route, state) => {
  const blogService = inject(BlogService);
  const blogId = route.paramMap.get('id')!;
  
  console.log(`[Resolver] Fetching blog with ID: ${blogId}`);
  
  // Return a promise that resolves with the blog data
  // This ensures SSR waits for the data before rendering
  return firstValueFrom(blogService.getBlogById(blogId)).then(blog => {
    console.log(`[Resolver] Resolved blog:`, {
      id: blog.id,
      title: blog.title,
      description: blog.description.substring(0, 50) + '...'
    });
    return blog;
  });
};

