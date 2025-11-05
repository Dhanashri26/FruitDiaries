import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(private titleService: Title) {}
  
  ngOnInit(): void {
    // Set a default title only - individual components will set their own meta tags
    // BlogComponent sets meta tags for home/blog list page
    // IndiblogComponent sets meta tags for individual blog pages
    this.titleService.setTitle('Fruit Diaries - Buy Fresh Fruits Online');
    console.log("app initialized");
  }
}

   

