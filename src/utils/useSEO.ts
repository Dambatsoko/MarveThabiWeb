import { useEffect } from 'react';
import { getPageSEO, PageSEO, SITE_NAME } from './seoConfig';

/**
 * Updates DOM head metadata dynamically in client-side React SPA,
 * including html[lang], canonical, hreflang alternates, OpenGraph, Twitter, and JSON-LD.
 */
export function useSEO(currentPath: string): PageSEO {
  const seo = getPageSEO(currentPath);

  useEffect(() => {
    // 1. Document language & Title
    document.documentElement.lang = seo.lang;
    document.title = seo.title;

    // Helper to set or create meta tag
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Helper to set or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!tag) {
        tag = document.createElement('link');
        tag.rel = rel;
        document.head.appendChild(tag);
      }
      tag.href = href;
    };

    // Helper to set or create hreflang alternate link tag
    const setHreflangTag = (hreflang: string, href: string) => {
      let tag = document.querySelector(
        `link[rel="alternate"][hreflang="${hreflang}"]`
      ) as HTMLLinkElement | null;
      if (!tag) {
        tag = document.createElement('link');
        tag.rel = 'alternate';
        tag.hreflang = hreflang;
        document.head.appendChild(tag);
      }
      tag.href = href;
    };

    // 2. Standard Description
    setMetaTag('name', 'description', seo.description);

    // 3. Canonical & Hreflang Links
    setLinkTag('canonical', seo.canonicalUrl);
    setHreflangTag('en', seo.alternateUrls.en);
    setHreflangTag('fr', seo.alternateUrls.fr);
    setHreflangTag('x-default', seo.alternateUrls.xDefault);

    // 4. OpenGraph
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:locale', seo.lang === 'fr' ? 'fr_FR' : 'en_ZA');
    setMetaTag('property', 'og:locale:alternate', seo.lang === 'fr' ? 'en_ZA' : 'fr_FR');
    setMetaTag('property', 'og:title', seo.ogTitle || seo.title);
    setMetaTag('property', 'og:description', seo.ogDescription || seo.description);
    setMetaTag('property', 'og:url', seo.canonicalUrl);
    setMetaTag('property', 'og:type', seo.ogType);
    setMetaTag('property', 'og:image', seo.ogImage);

    // 5. Twitter Card
    setMetaTag('name', 'twitter:card', seo.twitterCard || 'summary_large_image');
    setMetaTag('name', 'twitter:title', seo.title);
    setMetaTag('name', 'twitter:description', seo.description);
    setMetaTag('name', 'twitter:image', seo.ogImage);

    // 6. JSON-LD Structured Data
    const scriptId = 'seo-jsonld-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (seo.structuredData && seo.structuredData.length > 0) {
      scriptTag.textContent = JSON.stringify(
        seo.structuredData.length === 1 ? seo.structuredData[0] : seo.structuredData,
        null,
        2
      );
    } else {
      scriptTag.textContent = '';
    }
  }, [seo]);

  return seo;
}
