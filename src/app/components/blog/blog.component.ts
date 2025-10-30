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
    // Generic SEO for the homepage or blog list
    this.seoService.updateMetaTags({
      title: 'Buy fresh fruits online at Fruit Diaries.',
      description: 'Buy fresh fruits online at affordable prices. Healthy eating starts here with amazing blog stories!',
      image: 'https://yourdomain.com/path/to/default-image.jpg',
      url: 'https://natures-basket-mocha.vercel.app/'
    });
    //  image: 'https://yourdomain.com/path/to/default-image.jpg', // replace with your homepage/blog default image
    this.blogs$ = this.blogService.getAllBlogs();
  }

  log(title: string) {
    console.log('clicked on', title);
  }
}
