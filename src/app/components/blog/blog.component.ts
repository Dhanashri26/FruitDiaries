import { Component } from '@angular/core';
import { BlogService } from '../../blog.service';
import { Blog } from '../../models/Blog.model';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../seo.service';

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
      const jsonLdData = {
        "@context" : "https://schema.org",
        "@type" : "Blog",
        "headline" : "Nature's Basket | Fruits Shop",
        "author" : {
          "@type" : "Person",
          "name" : "Dhanashri Lambade"
        },
        "datePublished" : "2025-10-30",
        "image" : "/public/assets/photo1.1.jpg",
        "description" : "Buy fresh Fruits using the website Nature's Basket. We deliver fresh fruits at your doorstep."
      };
      this.seoService.insertJSsonLd(jsonLdData);

    // Generic SEO for the homepage or blog list
    this.seoService.updateMetaTags({
      title: 'Buy fresh fruits online at Fruit Diaries.',
      description: 'Buy fresh fruits online at affordable prices. Healthy eating starts here with amazing blog stories!',
      image: 'https://images.unsplash.com/photo-1471500466955-85aecf33f71f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: 'https://natures-basket-mocha.vercel.app/blog',
      type: 'website',
      canonical: 'https://natures-basket-mocha.vercel.app/blog'
    });
    this.blogs$ = this.blogService.getAllBlogs();
  }

  log(title: string) {
    console.log('clicked on', title);
  }
}
