import { Component } from '@angular/core';
import { BlogService } from '../../blog.service';
import { Blog } from '../../models/Blog.model';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

  blogs$?: Observable<Blog[]>
  constructor(private blogService:BlogService){}

  ngOnInit(){
    this.blogs$ = this.blogService.getAllBlogs()
  }

  log(title:string){
    console.log("clicked on",title)
  }
}
