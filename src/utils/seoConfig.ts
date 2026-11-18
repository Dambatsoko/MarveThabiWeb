import {
  dedicatedServicesData,
  industriesData,
  getDedicatedService,
  getLeaderBySlug,
  getIndustryDetail,
  leadershipTeamData,
} from '../data/marvethabi.ts';
import { Language } from '../i18n/types.ts';
import {
  getLanguageFromPath,
  stripLanguagePrefix,
  getAlternatePaths,
  localizePath,
} from '../i18n/routing.ts';
import {
  CORE_PAGES_FR,
  FR_ORGANIZATION_DESCRIPTION,
  FR_SITELINKS_DESCRIPTIONS,
} from '../i18n/translations/seo.fr.ts';
import {
  getLocalizedDedicatedService,
  getLocalizedLeaderBySlug,
  getLocalizedIndustryDetail,
} from '../i18n/data.ts';

export const PRODUCTION_DOMAIN = 'https://www.marvethabi.co.za';
export const SITE_NAME = 'MarveThabi Consulting Engineers';
export const DEFAULT_OG_IMAGE = `${PRODUCTION_DOMAIN}/assets/images/hero.jpg`;
export const LOGO_URL = `${PRODUCTION_DOMAIN}/assets/images/logo.png`;

export interface PageSEO {
  path: string;
  lang: Language;
  inLanguage: string;
  title: string;
  description: string;
  canonicalUrl: string;
  alternateUrls: {
    en: string;
    fr: string;
    xDefault: string;
  };
  ogType: 'website' | 'article' | 'profile';
  ogImage: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: 'summary_large_image' | 'summary';
  breadcrumbs?: { name: string; path: string }[];
  structuredData?: Record<string, any>[];
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

function toAbsoluteUrl(path: string): string {
  if (!path || path === '/') return `${PRODUCTION_DOMAIN}/`;
  return `${PRODUCTION_DOMAIN}${path}`;
}

export function buildAlternateUrls(rawPath: string): { en: string; fr: string; xDefault: string } {
  const alts = getAlternatePaths(rawPath);
  const enUrl = toAbsoluteUrl(alts.en);
  const frUrl = toAbsoluteUrl(alts.fr);
  return {
    en: enUrl,
    fr: frUrl,
    xDefault: enUrl,
  };
}

/**
 * Verified statutory organization structured data (English)
 */
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${PRODUCTION_DOMAIN}/#organization`,
  name: SITE_NAME,
  legalName: 'MarveThabi Consulting Engineers (Pty) Ltd',
  url: PRODUCTION_DOMAIN,
  logo: LOGO_URL,
  image: DEFAULT_OG_IMAGE,
  description:
    'Multidisciplinary South African engineering consultancy delivering specialist Reliability Engineering, Asset Management, Electrical Engineering and Geo-Environmental solutions.',
  telephone: ['+27-82-412-3847', '+27-72-834-7953'],
  email: 'info@marvethabi.co.za',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Unit 68 Saliehout Street, Stenostelma, Annlin',
    addressLocality: 'Pretoria',
    addressRegion: 'Gauteng',
    postalCode: '0182',
    addressCountry: 'ZA',
  },
  sameAs: [
    'https://www.linkedin.com/company/marvethabi-consulting-engineers/',
  ],
  knowsAbout: [
    'Reliability Engineering',
    'Asset Management ISO 55000',
    'Condition Monitoring',
    'Electrical Infrastructure',
    'Environmental Compliance & Licensing',
    'Water Use Licensing (WULA)',
    'Air Quality Monitoring',
    'Mine Rehabilitation',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Statutory Body',
      name: 'Engineering Council of South Africa (ECSA)',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Statutory Body',
      name: 'South African Council for Natural Scientific Professions (SACNASP)',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Contractor Registration',
      name: 'Construction Industry Development Board (cidb)',
    },
  ],
};

export function getOrganizationSchema(lang: Language): Record<string, any> {
  if (lang === 'en') return ORGANIZATION_SCHEMA;
  return {
    ...ORGANIZATION_SCHEMA,
    description: FR_ORGANIZATION_DESCRIPTION,
    knowsAbout: [
      'Ingénierie de la fiabilité',
      'Gestion des actifs ISO 55000',
      'Surveillance conditionnelle',
      'Infrastructures électriques',
      'Conformité et autorisations environnementales',
      'Gestion des ressources en eau (WULA)',
      'Surveillance de la qualité de l’air',
      'Réhabilitation minière',
    ],
  };
}

/**
 * WebSite schema with search action & site navigation element to support Google Sitelinks
 */
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${PRODUCTION_DOMAIN}/#website`,
  name: SITE_NAME,
  url: PRODUCTION_DOMAIN,
  publisher: {
    '@id': `${PRODUCTION_DOMAIN}/#organization`,
  },
  inLanguage: 'en-ZA',
};

export function getWebsiteSchema(lang: Language): Record<string, any> {
  if (lang === 'en') return WEBSITE_SCHEMA;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${PRODUCTION_DOMAIN}/fr/#website`,
    name: SITE_NAME,
    url: `${PRODUCTION_DOMAIN}/fr/`,
    publisher: {
      '@id': `${PRODUCTION_DOMAIN}/#organization`,
    },
    inLanguage: 'fr',
  };
}

/**
 * Site navigation schema explicitly highlighting the primary internal sections for Sitelinks
 */
export const SITELINKS_NAVIGATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'SiteNavigationElement',
      position: 1,
      name: 'Our Services',
      description: 'Multidisciplinary engineering and environmental consultancy services catalogue.',
      url: `${PRODUCTION_DOMAIN}/services`,
    },
    {
      '@type': 'SiteNavigationElement',
      position: 2,
      name: 'About Us',
      description: 'Practice profile, multidisciplinary capabilities, and statutory council registrations.',
      url: `${PRODUCTION_DOMAIN}/about`,
    },
    {
      '@type': 'SiteNavigationElement',
      position: 3,
      name: 'Our Team',
      description: 'Executive directorate and registered engineering and environmental professionals.',
      url: `${PRODUCTION_DOMAIN}/leadership`,
    },
    {
      '@type': 'SiteNavigationElement',
      position: 4,
      name: 'Our Process',
      description: 'End-to-end 6-phase engineering project delivery lifecycle and quality assurance.',
      url: `${PRODUCTION_DOMAIN}/process`,
    },
    {
      '@type': 'SiteNavigationElement',
      position: 5,
      name: 'Contact Us',
      description: 'Direct technical consultation and enquiry routing to discipline leads in Pretoria.',
      url: `${PRODUCTION_DOMAIN}/contact`,
    },
    {
      '@type': 'SiteNavigationElement',
      position: 6,
      name: 'Industries',
      description: 'Tailored solutions for Mining, Energy, Municipalities, Government, and Industry.',
      url: `${PRODUCTION_DOMAIN}/industries`,
    },
  ],
};

export function getSitelinksSchema(lang: Language): Record<string, any> {
  if (lang === 'en') return SITELINKS_NAVIGATION_SCHEMA;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: FR_SITELINKS_DESCRIPTIONS.map((item, idx) => ({
      '@type': 'SiteNavigationElement',
      position: idx + 1,
      name: item.name,
      description: item.description,
      url: `${PRODUCTION_DOMAIN}${item.path}`,
    })),
  };
}

/**
 * Helper to build breadcrumb structured data
 */
export function buildBreadcrumbSchema(breadcrumbs: { name: string; path: string }[]): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: b.name,
      item: toAbsoluteUrl(b.path),
    })),
  };
}

/**
 * Helper to build WebPage structured data
 */
export function buildWebPageSchema(page: PageSEO): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${page.canonicalUrl}#webpage`,
    url: page.canonicalUrl,
    name: page.title,
    description: page.description,
    isPartOf: {
      '@id': page.lang === 'fr' ? `${PRODUCTION_DOMAIN}/fr/#website` : `${PRODUCTION_DOMAIN}/#website`,
    },
    inLanguage: page.inLanguage,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: page.ogImage,
    },
  };
}

interface CorePageBase {
  path: string;
  title: string;
  description: string;
  ogImage: string;
  breadcrumbName: string;
  priority: number;
  changefreq: 'weekly' | 'monthly';
}

const CORE_PAGES_BASE: Record<string, CorePageBase> = {
  '/': {
    path: '/',
    title: 'MarveThabi Consulting Engineers | Engineering & Environmental Solutions',
    description:
      'Multidisciplinary South African engineering consultancy delivering specialist Reliability Engineering, Asset Management, and Geo-Environmental solutions.',
    ogImage: `${PRODUCTION_DOMAIN}/assets/images/hero.jpg`,
    breadcrumbName: 'Home',
    priority: 1.0,
    changefreq: 'weekly',
  },
  '/about': {
    path: '/about',
    title: 'About Us | MarveThabi Consulting Engineers',
    description:
      'Learn about MarveThabi Consulting Engineers: our multidisciplinary team, statutory ECSA & SACNASP registrations, Level 1 B-BBEE status, and company heritage.',
    ogImage: `${PRODUCTION_DOMAIN}/assets/images/about.jpg`,
    breadcrumbName: 'About Us',
    priority: 0.85,
    changefreq: 'monthly',
  },
  '/services': {
    path: '/services',
    title: 'Engineering & Environmental Services Catalogue | MarveThabi',
    description:
      'Explore our multidisciplinary engineering services: Reliability Engineering, Asset Management, Electrical Reticulation, Water & Environmental Permitting.',
    ogImage: `${PRODUCTION_DOMAIN}/assets/images/reliability-monitoring.png`,
    breadcrumbName: 'Our Services',
    priority: 0.95,
    changefreq: 'weekly',
  },
  '/leadership': {
    path: '/leadership',
    title: 'Practice Leadership & Governance | MarveThabi Consulting Engineers',
    description:
      'Meet our executive directorate: registered professional engineers (ECSA) and professional natural scientists (SACNASP) leading MarveThabi Consulting Engineers.',
    ogImage: `${PRODUCTION_DOMAIN}/assets/images/Marvelous.png`,
    breadcrumbName: 'Our Team',
    priority: 0.85,
    changefreq: 'monthly',
  },
  '/process': {
    path: '/process',
    title: 'Our Engineering Process & Delivery Lifecycle | MarveThabi',
    description:
      'Discover our 6-phase stage-gate project delivery architecture from consultation and baseline diagnostics through engineering design to statutory commissioning.',
    ogImage: `${PRODUCTION_DOMAIN}/assets/images/hero.jpg`,
    breadcrumbName: 'Our Process',
    priority: 0.8,
    changefreq: 'monthly',
  },
  '/industries': {
    path: '/industries',
    title: 'Industries & Infrastructure Sectors | MarveThabi Consulting Engineers',
    description:
      'Tailored engineering and environmental solutions across key South African industries: Mining, Energy, Municipalities, Government, and Heavy Industry.',
    ogImage: `${PRODUCTION_DOMAIN}/assets/images/industries.jpg`,
    breadcrumbName: 'Industries',
    priority: 0.85,
    changefreq: 'monthly',
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Us | MarveThabi Consulting Engineers',
    description:
      'Direct your technical requirement to the registered engineer or scientist responsible for that discipline. Pretoria head office consulting & evaluations.',
    ogImage: `${PRODUCTION_DOMAIN}/assets/images/logo.png`,
    breadcrumbName: 'Contact Us',
    priority: 0.9,
    changefreq: 'monthly',
  },
};

function buildCorePageSEO(basePath: string, lang: Language): PageSEO {
  const base = CORE_PAGES_BASE[basePath] || CORE_PAGES_BASE['/'];
  const frData = CORE_PAGES_FR[base.path];
  const localizedPath = localizePath(base.path, lang);
  const canonicalUrl = toAbsoluteUrl(localizedPath);
  const alternateUrls = buildAlternateUrls(base.path);

  const title = lang === 'fr' && frData ? frData.title : base.title;
  const description = lang === 'fr' && frData ? frData.description : base.description;
  const homeLabel = lang === 'fr' ? CORE_PAGES_FR['/'].breadcrumbName : CORE_PAGES_BASE['/'].breadcrumbName;
  const pageLabel = lang === 'fr' && frData ? frData.breadcrumbName : base.breadcrumbName;

  const breadcrumbs =
    base.path === '/'
      ? [{ name: homeLabel, path: localizePath('/', lang) }]
      : [
          { name: homeLabel, path: localizePath('/', lang) },
          { name: pageLabel, path: localizedPath },
        ];

  const structuredData =
    base.path === '/'
      ? [
          getOrganizationSchema(lang),
          getWebsiteSchema(lang),
          getSitelinksSchema(lang),
        ]
      : [
          getOrganizationSchema(lang),
          buildBreadcrumbSchema(breadcrumbs),
        ];

  return {
    path: localizedPath,
    lang,
    inLanguage: lang === 'fr' ? 'fr' : 'en-ZA',
    title,
    description,
    canonicalUrl,
    alternateUrls,
    ogType: 'website',
    ogImage: base.ogImage,
    breadcrumbs,
    priority: base.priority,
    changefreq: base.changefreq,
    structuredData,
  };
}

/**
 * Returns SEO data for individual service detail page
 */
export function getServicePageSEO(slug: string, lang: Language = 'en'): PageSEO | undefined {
  const service = lang === 'fr' ? getLocalizedDedicatedService(slug, 'fr') : getDedicatedService(slug);
  if (!service) return undefined;

  const localizedPath = localizePath(`/services/${service.slug}`, lang);
  const canonicalUrl = toAbsoluteUrl(localizedPath);
  const alternateUrls = buildAlternateUrls(`/services/${service.slug}`);
  const title = `${service.title} | MarveThabi Consulting Engineers`;

  // Format description within search-snippet budget
  let description = `${service.tagline} ${service.summary}`;
  if (description.length > 155) {
    description = description.slice(0, 152) + '...';
  }

  const image = service.image
    ? `${PRODUCTION_DOMAIN}/assets/images/${service.image}`
    : DEFAULT_OG_IMAGE;

  const breadcrumbs =
    lang === 'fr'
      ? [
          { name: 'Accueil', path: '/fr/' },
          { name: 'Nos Services', path: '/fr/services' },
          { name: service.title, path: localizedPath },
        ]
      : [
          { name: 'Home', path: '/' },
          { name: 'Our Services', path: '/services' },
          { name: service.title, path: localizedPath },
        ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.summary,
    inLanguage: lang === 'fr' ? 'fr' : 'en-ZA',
    provider: {
      '@id': `${PRODUCTION_DOMAIN}/#organization`,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: lang === 'fr' ? 'Afrique du Sud' : 'South Africa',
      },
      {
        '@type': 'Country',
        name: lang === 'fr' ? 'République Démocratique du Congo' : 'Democratic Republic of the Congo',
      },
      {
        '@type': 'AdministrativeArea',
        name: lang === 'fr' ? 'Région SADC' : 'SADC Region',
      },
    ],
    category: service.category,
    url: canonicalUrl,
    termsOfService:
      lang === 'fr'
        ? 'Prestations réalisées conformément aux codes de déontologie professionnelle ECSA, SACNASP et normes applicables.'
        : 'Delivered in accordance with ECSA and statutory engineering codes of professional conduct.',
  };

  return {
    path: localizedPath,
    lang,
    inLanguage: lang === 'fr' ? 'fr' : 'en-ZA',
    title,
    description,
    canonicalUrl,
    alternateUrls,
    ogType: 'article',
    ogImage: image,
    breadcrumbs,
    priority: 0.8,
    changefreq: 'monthly',
    structuredData: [
      getOrganizationSchema(lang),
      serviceSchema,
      buildBreadcrumbSchema(breadcrumbs),
    ],
  };
}

/**
 * Returns SEO data for individual leadership profile
 */
export function getLeaderPageSEO(slug: string, lang: Language = 'en'): PageSEO | undefined {
  const leader = lang === 'fr' ? getLocalizedLeaderBySlug(slug, 'fr') : getLeaderBySlug(slug);
  if (!leader) return undefined;

  const localizedPath = localizePath(`/leadership/${leader.slug}`, lang);
  const canonicalUrl = toAbsoluteUrl(localizedPath);
  const alternateUrls = buildAlternateUrls(`/leadership/${leader.slug}`);
  const title =
    lang === 'fr'
      ? `${leader.name} | Direction du cabinet | MarveThabi Consulting Engineers`
      : `${leader.name} | Practice Leadership | MarveThabi Consulting Engineers`;

  const roleTitle = leader.role || (lang === 'fr' ? 'Directeur' : 'Director');
  let description = leader.shortIntro || roleTitle;
  if (description.length > 155) {
    description = description.slice(0, 152) + '...';
  }

  const image = leader.image
    ? `${PRODUCTION_DOMAIN}${leader.image.startsWith('/') ? leader.image : `/${leader.image}`}`
    : DEFAULT_OG_IMAGE;

  const breadcrumbs =
    lang === 'fr'
      ? [
          { name: 'Accueil', path: '/fr/' },
          { name: 'Notre Équipe', path: '/fr/leadership' },
          { name: leader.name, path: localizedPath },
        ]
      : [
          { name: 'Home', path: '/' },
          { name: 'Our Team', path: '/leadership' },
          { name: leader.name, path: localizedPath },
        ];

  const personSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${canonicalUrl}#person`,
    name: leader.name,
    jobTitle: roleTitle,
    worksFor: {
      '@id': `${PRODUCTION_DOMAIN}/#organization`,
    },
    url: canonicalUrl,
    image,
    description: leader.shortIntro,
  };

  if (leader.linkedinUrl) {
    personSchema.sameAs = leader.linkedinUrl;
  }

  return {
    path: localizedPath,
    lang,
    inLanguage: lang === 'fr' ? 'fr' : 'en-ZA',
    title,
    description,
    canonicalUrl,
    alternateUrls,
    ogType: 'profile',
    ogImage: image,
    breadcrumbs,
    priority: 0.75,
    changefreq: 'monthly',
    structuredData: [
      getOrganizationSchema(lang),
      personSchema,
      buildBreadcrumbSchema(breadcrumbs),
    ],
  };
}

/**
 * Returns SEO data for individual industry detail page
 */
export function getIndustryPageSEO(slug: string, lang: Language = 'en'): PageSEO | undefined {
  const industry = lang === 'fr' ? getLocalizedIndustryDetail(slug, 'fr') : getIndustryDetail(slug);
  if (!industry) return undefined;

  const localizedPath = localizePath(`/industries/${industry.slug}`, lang);
  const canonicalUrl = toAbsoluteUrl(localizedPath);
  const alternateUrls = buildAlternateUrls(`/industries/${industry.slug}`);
  const title =
    lang === 'fr'
      ? `Solutions d’ingénierie — ${industry.name} | MarveThabi Consulting Engineers`
      : `${industry.name} Engineering Solutions | MarveThabi Consulting Engineers`;

  let description = `${industry.tagline} ${industry.summary}`;
  if (description.length > 155) {
    description = description.slice(0, 152) + '...';
  }

  const breadcrumbs =
    lang === 'fr'
      ? [
          { name: 'Accueil', path: '/fr/' },
          { name: 'Secteurs', path: '/fr/industries' },
          { name: industry.name, path: localizedPath },
        ]
      : [
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: industry.name, path: localizedPath },
        ];

  return {
    path: localizedPath,
    lang,
    inLanguage: lang === 'fr' ? 'fr' : 'en-ZA',
    title,
    description,
    canonicalUrl,
    alternateUrls,
    ogType: 'article',
    ogImage: DEFAULT_OG_IMAGE,
    breadcrumbs,
    priority: 0.75,
    changefreq: 'monthly',
    structuredData: [
      getOrganizationSchema(lang),
      buildBreadcrumbSchema(breadcrumbs),
    ],
  };
}

/**
 * Master function to resolve SEO configuration for any English or French (/fr/...) route
 */
export function getPageSEO(rawPath: string): PageSEO {
  const lang = getLanguageFromPath(rawPath);
  const basePath = stripLanguagePrefix(rawPath);

  // 1. Direct core pages (includes /team -> /leadership and /about-us -> /about via stripLanguagePrefix)
  if (CORE_PAGES_BASE[basePath]) {
    return buildCorePageSEO(basePath, lang);
  }

  // 2. Service detail pages
  if (basePath.startsWith('/services/')) {
    const slug = basePath.replace('/services/', '');
    const svcSEO = getServicePageSEO(slug, lang);
    if (svcSEO) return svcSEO;
  }

  // 3. Leadership detail pages
  if (basePath.startsWith('/leadership/')) {
    const slug = basePath.replace('/leadership/', '');
    const leadSEO = getLeaderPageSEO(slug, lang);
    if (leadSEO) return leadSEO;
  }

  // 4. Industry detail pages
  if (basePath.startsWith('/industries/')) {
    const slug = basePath.replace('/industries/', '');
    const indSEO = getIndustryPageSEO(slug, lang);
    if (indSEO) return indSEO;
  }

  // Fallback to Homepage SEO for active language
  const homeSeo = buildCorePageSEO('/', lang);
  return {
    ...homeSeo,
    canonicalUrl: toAbsoluteUrl(localizePath(basePath, lang)),
  };
}

function collectPagesForLanguage(lang: Language): PageSEO[] {
  const pages: PageSEO[] = [];

  Object.keys(CORE_PAGES_BASE).forEach((p) => {
    pages.push(buildCorePageSEO(p, lang));
  });

  dedicatedServicesData.forEach((s) => {
    const svc = getServicePageSEO(s.slug, lang);
    if (svc && !pages.some((p) => p.path === svc.path)) {
      pages.push(svc);
    }
  });

  leadershipTeamData.forEach((l) => {
    const leader = getLeaderPageSEO(l.slug, lang);
    if (leader && !pages.some((p) => p.path === leader.path)) {
      pages.push(leader);
    }
  });

  industriesData.forEach((i) => {
    const ind = getIndustryPageSEO(i.slug, lang);
    if (ind && !pages.some((p) => p.path === ind.path)) {
      pages.push(ind);
    }
  });

  return pages;
}

/**
 * Returns public, indexable URLs for the XML sitemap (both EN and FR by default = 72 URLs).
 */
export function getAllIndexablePages(filterLang?: Language): PageSEO[] {
  if (filterLang) {
    return collectPagesForLanguage(filterLang);
  }
  return [...collectPagesForLanguage('en'), ...collectPagesForLanguage('fr')];
}

/**
 * Generates valid bilingual XML Sitemap string with xhtml:link hreflang alternates
 */
export function generateSitemapXml(lastModDate: string = new Date().toISOString().split('T')[0]): string {
  const pages = getAllIndexablePages();

  const urlEntries = pages
    .map((page) => {
      const priority = page.priority !== undefined ? page.priority.toFixed(1) : '0.8';
      const changefreq = page.changefreq || 'monthly';
      return `  <url>
    <loc>${page.canonicalUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${page.alternateUrls.en}" />
    <xhtml:link rel="alternate" hreflang="fr" href="${page.alternateUrls.fr}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${page.alternateUrls.xDefault}" />
    <lastmod>${lastModDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;
}

/**
 * Generates robots.txt content allowing public crawl and referencing sitemap
 */
export function generateRobotsTxt(): string {
  return `# Robots.txt for MarveThabi Consulting Engineers
# Official Production Domain: ${PRODUCTION_DOMAIN}

User-agent: *
Allow: /

# Private backend endpoints
Disallow: /api/

# Explicitly ensure static render resources remain crawlable
Allow: /assets/
Allow: /*.js$
Allow: /*.css$
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.webp$
Allow: /*.svg$
Allow: /*.woff2$

# XML Sitemap reference
Sitemap: ${PRODUCTION_DOMAIN}/sitemap.xml
`;
}
