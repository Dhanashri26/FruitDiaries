import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../blog.service';
import { Observable, firstValueFrom, tap, shareReplay } from 'rxjs';
import { Blog } from '../../models/Blog.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../seo.service';
import { PLATFORM_ID, Inject } from '@angular/core';

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
    private blogService: BlogService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit() {
    const blogId = this.route.snapshot.paramMap.get('id')!;
    
    // Fetch blog and set meta tags - this ensures meta tags are set during SSR
    // Use shareReplay to share the observable between the await and template subscription
    this.blog$ = this.blogService.getBlogById(blogId).pipe(
      tap(blog => {
        if (blog) {
          // Ensure image URL is absolute
          const imageUrl = blog.img.startsWith('http') 
            ? blog.img 
            : `https://natures-basket-mocha.vercel.app${blog.img.startsWith('/') ? '' : '/'}${blog.img}`;
          
          this.seoService.updateMetaTags({
            title: blog.title,
            description: blog.description,
            image: imageUrl,
            url: `https://natures-basket-mocha.vercel.app/blog/${blog.id}`,
            type: 'article',
            canonical: `https://natures-basket-mocha.vercel.app/blog/${blog.id}`
          });
        }
      }),
      shareReplay(1) // Share the result so both await and template subscription get the same value
    );
    
    // Wait for the first value during SSR to ensure meta tags are set before rendering
    try {
      await firstValueFrom(this.blog$);
    } catch (error) {
      console.error('Error loading blog:', error);
    }
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
