import { Component } from '@angular/core';
import { BlogService } from '../../blog.service';
import { Blog } from '../../models/Blog.model';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
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
    private blogService: BlogService,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    // Use configuration constants for JSON-LD data
    const jsonLdImage = getAbsoluteImageUrl(APP_CONFIG.DEFAULT_BLOG_IMAGE);
    
    const jsonLdData = {
      "@context" : "https://schema.org",
      "@type" : "Blog",
      "headline" : "Nature's Basket | Fruits Shop",
      "author" : {
        "@type" : "Person",
        "name" : APP_CONFIG.AUTHOR_NAME
      },
      "datePublished" : APP_CONFIG.AUTHOR_DATE_PUBLISHED,
      "image" : jsonLdImage,
      "description" : "Buy fresh Fruits using the website Nature's Basket. We deliver fresh fruits at your doorstep."
    };
    this.seoService.insertJSsonLd(jsonLdData);

    // Generic SEO for the homepage or blog list - using configuration constants
    const blogUrl = `${APP_CONFIG.BASE_URL}/blog`;
    
    this.seoService.updateMetaTags({
      title: `Buy fresh fruits online at ${APP_CONFIG.SITE_NAME}.`,
      description: APP_CONFIG.SITE_DESCRIPTION,
      image: APP_CONFIG.DEFAULT_SEO_IMAGE,
      url: blogUrl,
      type: 'website',
      canonical: blogUrl
    });
    
    this.blogs$ = this.blogService.getAllBlogs();
  }

  log(title: string) {
    console.log('clicked on', title);
  }
}
