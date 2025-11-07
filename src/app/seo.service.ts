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

    // Directly manipulate DOM during SSR to ensure tags are replaced
    // This approach works more reliably than removeTag/addTag
    this.setOrUpdateMetaTag('name', 'title', title);
    this.setOrUpdateMetaTag('name', 'description', description);
    
    // Open Graph meta tags
    this.setOrUpdateMetaTag('property', 'og:title', title);
    this.setOrUpdateMetaTag('property', 'og:description', description);
    this.setOrUpdateMetaTag('property', 'og:image', image);
    this.setOrUpdateMetaTag('property', 'og:url', url);
    this.setOrUpdateMetaTag('property', 'og:type', type);
    this.setOrUpdateMetaTag('property', 'og:site_name', siteName);
    
    // Twitter Cards
    this.setOrUpdateMetaTag('name', 'twitter:card', 'summary_large_image');
    this.setOrUpdateMetaTag('name', 'twitter:title', title);
    this.setOrUpdateMetaTag('name', 'twitter:description', description);
    this.setOrUpdateMetaTag('name', 'twitter:image', image);

    // Canonical link
    if (canonical || url) {
      this.setCanonicalLink(canonical || url);
    }
  }

  private setOrUpdateMetaTag(attr: 'name' | 'property', selector: string, content: string): void {
    // Find existing meta tag
    let metaTag = this.document.querySelector(`meta[${attr}="${selector}"]`) as HTMLMetaElement;
    
    if (metaTag) {
      // Update existing tag
      const oldContent = metaTag.getAttribute('content');
      metaTag.setAttribute('content', content);
      console.log(`[SSR] Updated meta tag ${attr}="${selector}": "${oldContent}" -> "${content}"`);
    } else {
      // Create new tag if it doesn't exist
      metaTag = this.document.createElement('meta');
      metaTag.setAttribute(attr, selector);
      metaTag.setAttribute('content', content);
      this.document.head.appendChild(metaTag);
      console.log(`[SSR] Added new meta tag ${attr}="${selector}": "${content}"`);
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

