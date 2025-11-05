import { Injectable, Renderer2, RendererFactory2, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private renderer: Renderer2;

  constructor(
    private meta: Meta, 
    private titleService: Title, 
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null,null);
  }

  insertJSsonLd(data: object) : void {
    // Only execute in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.renderer.appendChild(document.head, script);
  }

  updateMetaTags({
    title,
    description,
    image,
    url,
    type = 'website',
    siteName = 'Fruit Diaries',
    canonical
  }: { 
    title: string; 
    description: string; 
    image: string; 
    url: string;
    type?: string;
    siteName?: string;
    canonical?: string;
  }): void {
    // Set page title
    this.titleService.setTitle(title);

    // Basic meta tags - use updateTag which will add if not exists or update if exists
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ name: 'description', content: description });

    // Open Graph meta tags (Facebook, LinkedIn, etc.)
    // Use updateTag which works on both server and browser
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: siteName });
    
    // Twitter Cards
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    // Canonical link
    if (canonical || url) {
      this.setCanonicalLink(canonical || url);
    }
  }

  private setCanonicalLink(href: string): void {
    // Works on both server and browser
    let linkEl = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkEl) {
      linkEl = this.document.createElement('link');
      linkEl.setAttribute('rel', 'canonical');
      this.document.head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', href);
  }
}

