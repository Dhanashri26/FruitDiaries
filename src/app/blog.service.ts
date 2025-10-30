import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from './models/Blog.model';
import { Observable } from 'rxjs';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  
  setTitle(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient, private meta: Meta) { }

  getAllBlogs() {
    return this.http.get<Blog[]>("https://my-json-server.typicode.com/Dhanashri26/fake-APIs/blogs")
    //  return this.http.get<Blog[]>("http://localhost:5000/api/blogs")
  }
  getBlogById(id:string) {
    return this.http.get<Blog>(`https://my-json-server.typicode.com/Dhanashri26/fake-APIs/blogs/${id}`)
    //  return this.http.get<Blog>(`http://localhost:5000/api/blogs/${id}`)
  }

  // getCard1Detail(){
  //   this.meta.addTags ([
  //     { name: 'description', content:'Apples are not only delicious but also packed with vitamins, antioxidants, and fiber. Discover how eating apples can improve your overall health.' },
  //     { property: 'og:title', content: 'The Health Benefits of Fresh Apples test'},
  //     { property: 'og:description', content: 'Buy fresh fruits online at affordable prices.' },
  //     { property: 'og:image', content: 'https://images.unsplash.com/photo-1471500466955-85aecf33f71f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  //     { property: 'og:url', content: 'http://localhost:4200/blog/1' },
  //   ]);
  // }

  // getCard2Detail() {
  //   this.meta.addTags ([
  //     { name: 'description', content:'Apples are not only delicious but also packed with vitamins, antioxidants, and fiber. Discover how eating apples can improve your overall health.' },
  //     { property: 'og:title', content: 'The Health Benefits of Fresh Apples test'},
  //     { property: 'og:description', content: 'Buy fresh fruits online at affordable prices.' },
  //     { property: 'og:image', content: 'https://images.unsplash.com/photo-1471500466955-85aecf33f71f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  //     { property: 'og:url', content: 'http://localhost:4200/blog/1' },

  //   ]);
  // };
}

