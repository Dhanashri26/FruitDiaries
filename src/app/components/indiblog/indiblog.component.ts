import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../blog.service';
import { Observable } from 'rxjs';
import { Blog } from '../../models/Blog.model';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../seo.service';

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
    private seoService: SeoService
  ) {}

  ngOnInit() {
    const blogId = this.route.snapshot.paramMap.get('id')!;
    this.blog$ = this.blogService.getBlogById(blogId);
    this.blog$.subscribe(blog => {
      if (blog) {
        this.seoService.updateMetaTags({
          title: blog.title,
          description: blog.description,
          image: blog.img,
          url: `https://natures-basket-mocha.vercel.app/blog/${blog.id}`,
          type: 'article',
          canonical: `https://natures-basket-mocha.vercel.app/blog/${blog.id}`
        });
      }
    });
  }

  handleCopy() {
    navigator.clipboard.writeText(window.location.href);
    this.copyText = 'Copied!';
    setTimeout(() => {
      this.copyText = 'Share';
    }, 1000);
  }
}
