import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BlogService } from './blog.service';
import { Blog } from './models/Blog.model';
import { firstValueFrom } from 'rxjs';

export const blogResolver: ResolveFn<Blog> = (route, state) => {
  const blogService = inject(BlogService);
  const blogId = route.paramMap.get('id')!;
  
  // Return a promise that resolves with the blog data
  // This ensures SSR waits for the data before rendering
  return firstValueFrom(blogService.getBlogById(blogId));
};

