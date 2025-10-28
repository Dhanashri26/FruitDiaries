import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from './models/Blog.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  
  setTitle(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

  getAllBlogs() {
    return this.http.get<Blog[]>("https://my-json-server.typicode.com/Dhanashri26/fake-APIs/blogs")
    //  return this.http.get<Blog[]>("http://localhost:5000/api/blogs")
  }
  getBlogById(id:string) {
    return this.http.get<Blog>(`https://my-json-server.typicode.com/Dhanashri26/fake-APIs/blogs/${id}`)
    //  return this.http.get<Blog>(`http://localhost:5000/api/blogs/${id}`)
  }
}
