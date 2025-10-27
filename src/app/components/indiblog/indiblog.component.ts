import { Component, afterNextRender, afterRender } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../blog.service';
import { Observable } from 'rxjs';
import { Blog } from '../../models/Blog.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-indiblog',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './indiblog.component.html',
  styleUrl: './indiblog.component.css'
})
export class IndiblogComponent {

  blog$?:Observable<Blog>
  copyText="Share" 

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {

    // afterNextRender(() => {
    //   // Safe to check `scrollHeight` because this will only run in the browser, not the server.
    //   console.log('afterNextRender called');
    // });
    // afterRender(() => {
    //   // Safe to check `scrollHeight` because this will only run in the browser, not the server.
    //   console.log('afterRender called');
    // });
  }

  ngOnInit() {
    const blogId = this.route.snapshot.paramMap.get('id')!;
    this.blog$ = this.blogService.getBlogById(blogId);
    // localStorage.setItem("test","sds")
  }

  handleCopy(){
    navigator.clipboard.writeText(window.location.href)
    this.copyText = "Copied!"
    setTimeout(()=>{
      this.copyText = "Share"
    },1000)
  }
}
