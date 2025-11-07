import { Component } from '@angular/core';
import { BlogService } from '../../blog.service';
import { Blog } from '../../models/Blog.model';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable, of, tap, catchError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../seo.service';
import { APP_CONFIG, getAbsoluteImageUrl } from '../../config/app.config';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  blogs$?: Observable<Blog[]>;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    // Get blogs from resolver (ensures SSR waits for data)
    const blogs = this.route.snapshot.data['blogs'] as Blog[] | undefined;
    
    if (blogs && blogs.length > 0) {
      // Use resolved data - set meta tags immediately (works during SSR)
      const featuredBlog = blogs[0];
      const featuredImage = getAbsoluteImageUrl(featuredBlog.img);
      const blogUrl = `${APP_CONFIG.BASE_URL}/blog`;
      
      // Dynamic meta tags based on first blog (works during SSR)
      this.seoService.updateMetaTags({
        title: `${featuredBlog.title} - ${APP_CONFIG.SITE_NAME}`,
        description: featuredBlog.description,
        image: featuredImage,
        url: blogUrl,
        type: 'website',
        canonical: blogUrl
      });
      
      // JSON-LD data with dynamic content
      const jsonLdData = {
        "@context" : "https://schema.org",
        "@type" : "Blog",
        "headline" : featuredBlog.title,
        "author" : {
          "@type" : "Person",
          "name" : APP_CONFIG.AUTHOR_NAME
        },
        "datePublished" : APP_CONFIG.AUTHOR_DATE_PUBLISHED,
        "image" : featuredImage,
        "description" : featuredBlog.description
      };
      this.seoService.insertJSsonLd(jsonLdData);
      
      // Set blogs$ observable for template
      this.blogs$ = of(blogs);
    } else {
      // Fallback: fetch data if resolver didn't provide it
      console.warn('Blogs data not found in resolver, fetching directly...');
      this.blogs$ = this.blogService.getAllBlogs().pipe(
        tap(blogsData => {
          if (blogsData && blogsData.length > 0) {
            const featuredBlog = blogsData[0];
            const featuredImage = getAbsoluteImageUrl(featuredBlog.img);
            const blogUrl = `${APP_CONFIG.BASE_URL}/blog`;
            
            this.seoService.updateMetaTags({
              title: `${featuredBlog.title} - ${APP_CONFIG.SITE_NAME}`,
              description: featuredBlog.description,
              image: featuredImage,
              url: blogUrl,
              type: 'website',
              canonical: blogUrl
            });
          } else {
            this.setDefaultMetaTags();
          }
        }),
        catchError(error => {
          console.error('Error loading blogs:', error);
          this.setDefaultMetaTags();
          return of([]);
        })
      );
    }
  }

  private setDefaultMetaTags() {
    const blogUrl = `${APP_CONFIG.BASE_URL}/blog`;
    
    this.seoService.updateMetaTags({
      title: `Buy fresh fruits online at ${APP_CONFIG.SITE_NAME}.`,
      description: APP_CONFIG.SITE_DESCRIPTION,
      image: APP_CONFIG.DEFAULT_SEO_IMAGE,
      url: blogUrl,
      type: 'website',
      canonical: blogUrl
    });
  }

  log(title: string) {
    console.log('clicked on', title);
  }
}
