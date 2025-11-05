import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Blog } from '../../models/Blog.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../seo.service';
import { PLATFORM_ID, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';

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
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Get blog data from resolver (ensures SSR waits for data)
    const blog = this.route.snapshot.data['blog'] as Blog;
    
    if (blog) {
      // Fix image URL: remove /public prefix if present, ensure it's absolute
      let imagePath = blog.img;
      // Remove /public prefix if present (assets are served from root in production)
      if (imagePath.startsWith('/public/')) {
        imagePath = imagePath.replace('/public', '');
      }
      // Ensure it starts with /
      if (!imagePath.startsWith('/')) {
        imagePath = '/' + imagePath;
      }
      // Convert to absolute URL
      const imageUrl = imagePath.startsWith('http') 
        ? imagePath 
        : `https://natures-basket-mocha.vercel.app${imagePath}`;
      
      console.log('Setting meta tags for blog:', blog.title, 'Image:', imageUrl);
      
      // Set meta tags immediately with resolved data (works during SSR)
      this.seoService.updateMetaTags({
        title: blog.title,
        description: blog.description,
        image: imageUrl,
        url: `https://natures-basket-mocha.vercel.app/blog/${blog.id}`,
        type: 'article',
        canonical: `https://natures-basket-mocha.vercel.app/blog/${blog.id}`
      });
      
      // Set blog$ observable for template
      this.blog$ = of(blog);
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
