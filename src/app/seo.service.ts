import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private renderer: Renderer2;

  constructor(private meta: Meta, private titleService: Title, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null,null);
  }

  insertJSsonLd(data: object) : void {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.renderer.appendChild(document.head, script);
  }

  // updateMetaTags({
  //   title,
  //   description,
  //   image,
  //   url
  // }: { title: string; description: string; image: string; url: string }) {
  //   this.titleService.setTitle(title);

  //   this.meta.updateTag({ name: 'description', content: description });
  //   this.meta.updateTag({ property: 'og:title', content: title });
  //   this.meta.updateTag({ property: 'og:description', content: description });
  //   this.meta.updateTag({ property: 'og:image', content: image });
  //   this.meta.updateTag({ property: 'og:url', content: url });
   
    // // Twitter Cards (optional)
    // this.meta.updateTag({ name: 'twitter:title', content: title });
    // this.meta.updateTag({ name: 'twitter:description', content: description });
    // this.meta.updateTag({ name: 'twitter:image', content: image });
    // this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }

