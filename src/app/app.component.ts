import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Meta, Title,BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers:[Meta],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(private meta: Meta, private titleService: Title) {}
  
  ngOnInit(): void {
    this.titleService.setTitle('Fruit Diaries - Buy Fresh Fruits Online');
    console.log("app initialized");

    this.meta.addTags([
      { name: 'description', content: 'Buy fresh fruits online at Fruit Diaries.' },
      { property: 'og:title', content: 'Fruit Diaries - Fresh Fruits Delivered' },
      { property: 'og:description', content: 'Buy fresh fruits online at affordable prices.' },
      { property: 'og:image', content: '"https://images.unsplash.com/photo-1471500466955-85aecf33f71f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { property: 'og:url', content: 'http://localhost:4200/blog/1' },
      
    ]);
  }
  // title = 'fruitdiaries';
}

   

