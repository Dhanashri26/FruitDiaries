import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Blog } from '../../models/Blog.model';
import { BlogService } from '../../blog.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../seo.service';
import { PLATFORM_ID, Inject } from '@angular/core';
import { Observable, of, tap, catchError } from 'rxjs';
import { APP_CONFIG, getAbsoluteImageUrl } from '../../config/app.config';

@Component({
  selector: 'app-indiblog',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './indiblog.component.html',
  styleUrl: './indiblog.component.css'
})
export class IndiblogComponent {
  blog$?: Observable<Blog>;
  copyText = 'Share';

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService,
    private blogService: BlogService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Get blog data from resolver (ensures SSR waits for data)
    let blog = this.route.snapshot.data['blog'] as Blog | undefined;
    const blogId = this.route.snapshot.paramMap.get('id')!;
    
    if (blog) {
      // Use resolved data
      this.setMetaTags(blog);
      this.blog$ = of(blog);
    } else {
      // Fallback: fetch data if resolver didn't provide it (shouldn't happen, but just in case)
      console.warn('Blog data not found in resolver, fetching directly...');
      this.blog$ = this.blogService.getBlogById(blogId).pipe(
        tap(blogData => {
          if (blogData) {
            this.setMetaTags(blogData);
          }
        }),
        catchError(error => {
          console.error('Error loading blog:', error);
          return of(null as any);
        })
      );
    }
  }

  private setMetaTags(blog: Blog) {
    // Use helper function to convert image path to absolute URL
    const imageUrl = getAbsoluteImageUrl(blog.img);
    const blogUrl = `${APP_CONFIG.BASE_URL}/blog/${blog.id}`;
    
    console.log(`[Blog ${blog.id}] Setting meta tags:`, {
      title: blog.title,
      description: blog.description.substring(0, 50) + '...',
      image: imageUrl
    });
    
    // Set meta tags immediately (works during SSR)
    this.seoService.updateMetaTags({
      title: blog.title,
      description: blog.description,
      image: imageUrl,
      url: blogUrl,
      type: 'article',
      canonical: blogUrl
    });
  }

  handleCopy() {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(window.location.href);
      this.copyText = 'Copied!';
      setTimeout(() => {
        this.copyText = 'Share';
      }, 1000);
    }
  }
}
