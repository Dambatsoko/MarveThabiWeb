import {
  dedicatedServicesData,
  industriesData,
  getDedicatedService,
  getLeaderBySlug,
  getIndustryDetail,
  leadershipTeamData,
} from '../data/marvethabi';

export const PRODUCTION_DOMAIN = 'https://www.marvethabi.co.za';
export const SITE_NAME = 'MarveThabi Consulting Engineers';
export const DEFAULT_OG_IMAGE = `${PRODUCTION_DOMAIN}/assets/images/hero.jpg`;
export const LOGO_URL = `${PRODUCTION_DOMAIN}/assets/images/logo.png`;

export interface PageSEO {
  path: string;
  title: string;
  description: string;
  canonicalUrl: string;
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

/**
 * Verified statutory organization structured data
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

/**
 * Site navigation schema explicitly highlighting the 5 primary internal sections for Sitelinks
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
      item: `${PRODUCTION_DOMAIN}${b.path === '/' ? '' : b.path}`,
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
      '@id': `${PRODUCTION_DOMAIN}/#website`,
    },
    inLanguage: 'en-ZA',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: page.ogImage,
    },
  };
}

/**
 * Core top-level pages
 */
const CORE_PAGES: Record<string, PageSEO> = {
  '/': {
    path: '/',
    title: 'MarveThabi Consulting Engineers | Engineering & Environmental Solutions',
    description:
      'Multidisciplinary South African engineering consultancy delivering specialist Reliability Engineering, Asset Management, and Geo-Environmental solutions.',
    canonicalUrl: `${PRODUCTION_DOMAIN}/`,
    ogType: 'website',
    ogImage: `${PRODUCTION_DOMAIN}/assets/images/hero.jpg`,
    breadcrumbs: [{ name: 'Home', path: '/' }],
    priority: 1.0,
    changefreq: 'weekly',
    structuredData: [
      ORGANIZATION_SCHEMA,
      WEBSITE_SCHEMA,
      SITELINKS_NAVIGATION_SCHEMA,
    ],
  },
  '/about': {
    path: '/about',
    title: 'About Us | MarveThabi Consulting Engineers',
    description:
      'Learn about MarveThabi Consulting Engineers: our multidisciplinary team, statutory ECSA & SACNASP registrations, Level 1 B-BBEE status, and company heritage.',
    canonicalUrl: `${PRODUCTION_DOMAIN}/about`,
    ogType: 'website',
    ogImage: `${PRODUCTION_DOMAIN}/assets/images/about.jpg`,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
    ],
    priority: 0.85,
    changefreq: 'monthly',
  },
  '/services': {
    path: '/services',
    title: 'Engineering & Environmental Services Catalogue | MarveThabi',
    description:
      'Explore our multidisciplinary engineering services: Reliability Engineering, Asset Management, Electrical Reticulation, Water & Environmental Permitting.',
    canonicalUrl: `${PRODUCTION_DOMAIN}/services`,
    ogType: 'website',
    ogImage: `${PRODUCTION_DOMAIN}/assets/images/reliability-monitoring.png`,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Our Services', path: '/services' },
    ],
    priority: 0.95,
    changefreq: 'weekly',
  },
  '/leadership': {
    path: '/leadership',
    title: 'Practice Leadership & Governance | MarveThabi Consulting Engineers',
    description:
      'Meet our executive directorate: registered professional engineers (ECSA) and professional natural scientists (SACNASP) leading MarveThabi Consulting Engineers.',
    canonicalUrl: `${PRODUCTION_DOMAIN}/leadership`,
    ogType: 'website',
    ogImage: `${PRODUCTION_DOMAIN}/assets/images/Marvelous.png`,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Our Team', path: '/leadership' },
    ],
    priority: 0.85,
    changefreq: 'monthly',
  },
  '/process': {
    path: '/process',
    title: 'Our Engineering Process & Delivery Lifecycle | MarveThabi',
    description:
      'Discover our 6-phase stage-gate project delivery architecture from consultation and baseline diagnostics through engineering design to statutory commissioning.',
    canonicalUrl: `${PRODUCTION_DOMAIN}/process`,
    ogType: 'website',
    ogImage: `${PRODUCTION_DOMAIN}/assets/images/hero.jpg`,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Our Process', path: '/process' },
    ],
    priority: 0.8,
    changefreq: 'monthly',
  },
  '/industries': {
    path: '/industries',
    title: 'Industries & Infrastructure Sectors | MarveThabi Consulting Engineers',
    description:
      'Tailored engineering and environmental solutions across key South African industries: Mining, Energy, Municipalities, Government, and Heavy Industry.',
    canonicalUrl: `${PRODUCTION_DOMAIN}/industries`,
    ogType: 'website',
    ogImage: `${PRODUCTION_DOMAIN}/assets/images/industries.jpg`,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Industries', path: '/industries' },
    ],
    priority: 0.85,
    changefreq: 'monthly',
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Us | MarveThabi Consulting Engineers',
    description:
      'Direct your technical requirement to the registered engineer or scientist responsible for that discipline. Pretoria head office consulting & evaluations.',
    canonicalUrl: `${PRODUCTION_DOMAIN}/contact`,
    ogType: 'website',
    ogImage: `${PRODUCTION_DOMAIN}/assets/images/logo.png`,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact Us', path: '/contact' },
    ],
    priority: 0.9,
    changefreq: 'monthly',
  },
};

/**
 * Returns SEO data for individual service detail page
 */
export function getServicePageSEO(slug: string): PageSEO | undefined {
  const service = getDedicatedService(slug);
  if (!service) return undefined;

  const canonicalUrl = `${PRODUCTION_DOMAIN}/services/${service.slug}`;
  const title = `${service.title} | MarveThabi Consulting Engineers`;
  
  // Format description under 160 characters
  let description = `${service.tagline} ${service.summary}`;
  if (description.length > 155) {
    description = description.slice(0, 152) + '...';
  }

  const image = service.image
    ? `${PRODUCTION_DOMAIN}/assets/images/${service.image}`
    : DEFAULT_OG_IMAGE;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Our Services', path: '/services' },
    { name: service.title, path: `/services/${service.slug}` },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.summary,
    provider: {
      '@id': `${PRODUCTION_DOMAIN}/#organization`,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'South Africa',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'SADC Region',
      },
    ],
    category: service.category,
    url: canonicalUrl,
    termsOfService: 'Delivered in accordance with ECSA and statutory engineering codes of professional conduct.',
  };

  return {
    path: `/services/${service.slug}`,
    title,
    description,
    canonicalUrl,
    ogType: 'article',
    ogImage: image,
    breadcrumbs,
    priority: 0.8,
    changefreq: 'monthly',
    structuredData: [
      ORGANIZATION_SCHEMA,
      serviceSchema,
      buildBreadcrumbSchema(breadcrumbs),
    ],
  };
}

/**
 * Returns SEO data for individual leadership profile
 */
export function getLeaderPageSEO(slug: string): PageSEO | undefined {
  const leader = getLeaderBySlug(slug);
  if (!leader) return undefined;

  const canonicalUrl = `${PRODUCTION_DOMAIN}/leadership/${leader.slug}`;
  const title = `${leader.name} | Practice Leadership | MarveThabi Consulting Engineers`;

  const roleTitle = leader.role || 'Director';
  let description = leader.shortIntro || roleTitle;
  if (description.length > 155) {
    description = description.slice(0, 152) + '...';
  }

  const image = leader.image
    ? `${PRODUCTION_DOMAIN}${leader.image.startsWith('/') ? leader.image : `/${leader.image}`}`
    : DEFAULT_OG_IMAGE;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Our Team', path: '/leadership' },
    { name: leader.name, path: `/leadership/${leader.slug}` },
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
    path: `/leadership/${leader.slug}`,
    title,
    description,
    canonicalUrl,
    ogType: 'profile',
    ogImage: image,
    breadcrumbs,
    priority: 0.75,
    changefreq: 'monthly',
    structuredData: [
      ORGANIZATION_SCHEMA,
      personSchema,
      buildBreadcrumbSchema(breadcrumbs),
    ],
  };
}

/**
 * Returns SEO data for individual industry detail page
 */
export function getIndustryPageSEO(slug: string): PageSEO | undefined {
  const industry = getIndustryDetail(slug);
  if (!industry) return undefined;

  const canonicalUrl = `${PRODUCTION_DOMAIN}/industries/${industry.slug}`;
  const title = `${industry.name} Engineering Solutions | MarveThabi Consulting Engineers`;

  let description = `${industry.tagline} ${industry.summary}`;
  if (description.length > 155) {
    description = description.slice(0, 152) + '...';
  }

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries' },
    { name: industry.name, path: `/industries/${industry.slug}` },
  ];

  return {
    path: `/industries/${industry.slug}`,
    title,
    description,
    canonicalUrl,
    ogType: 'article',
    ogImage: DEFAULT_OG_IMAGE,
    breadcrumbs,
    priority: 0.75,
    changefreq: 'monthly',
    structuredData: [
      ORGANIZATION_SCHEMA,
      buildBreadcrumbSchema(breadcrumbs),
    ],
  };
}

/**
 * Master function to resolve SEO configuration for any requested route
 */
export function getPageSEO(rawPath: string): PageSEO {
  const normalized = (rawPath || '/').replace(/\/+$/, '') || '/';

  // 1. Alias /team -> /leadership
  if (normalized === '/team') {
    return CORE_PAGES['/leadership'];
  }

  // 2. Direct core pages
  if (CORE_PAGES[normalized]) {
    const page = CORE_PAGES[normalized];
    return {
      ...page,
      structuredData: page.structuredData || [
        ORGANIZATION_SCHEMA,
        buildBreadcrumbSchema(page.breadcrumbs || []),
      ],
    };
  }

  // 3. Service detail pages
  if (normalized.startsWith('/services/')) {
    const slug = normalized.replace('/services/', '');
    const svcSEO = getServicePageSEO(slug);
    if (svcSEO) return svcSEO;
  }

  // 4. Leadership detail pages
  if (normalized.startsWith('/leadership/')) {
    const slug = normalized.replace('/leadership/', '');
    const leadSEO = getLeaderPageSEO(slug);
    if (leadSEO) return leadSEO;
  }

  // 5. Industry detail pages
  if (normalized.startsWith('/industries/')) {
    const slug = normalized.replace('/industries/', '');
    const indSEO = getIndustryPageSEO(slug);
    if (indSEO) return indSEO;
  }

  // Fallback to Homepage SEO with path
  return {
    ...CORE_PAGES['/'],
    canonicalUrl: `${PRODUCTION_DOMAIN}${normalized === '/' ? '' : normalized}`,
  };
}

/**
 * Returns the full catalog of public, indexable URLs for the XML sitemap
 */
export function getAllIndexablePages(): PageSEO[] {
  const pages: PageSEO[] = [];

  // Core top-level pages
  Object.keys(CORE_PAGES).forEach((p) => {
    pages.push(CORE_PAGES[p]);
  });

  // All individual service detail pages
  dedicatedServicesData.forEach((s) => {
    const svc = getServicePageSEO(s.slug);
    if (svc && !pages.some((p) => p.path === svc.path)) {
      pages.push(svc);
    }
  });

  // All individual leadership profiles
  leadershipTeamData.forEach((l) => {
    const leader = getLeaderPageSEO(l.slug);
    if (leader && !pages.some((p) => p.path === leader.path)) {
      pages.push(leader);
    }
  });

  // All individual industries
  industriesData.forEach((i) => {
    const ind = getIndustryPageSEO(i.slug);
    if (ind && !pages.some((p) => p.path === ind.path)) {
      pages.push(ind);
    }
  });

  return pages;
}

/**
 * Generates valid XML Sitemap string matching sitemaps.org protocol
 */
export function generateSitemapXml(lastModDate: string = new Date().toISOString().split('T')[0]): string {
  const pages = getAllIndexablePages();

  const urlEntries = pages
    .map((page) => {
      const priority = page.priority !== undefined ? page.priority.toFixed(1) : '0.8';
      const changefreq = page.changefreq || 'monthly';
      return `  <url>
    <loc>${page.canonicalUrl}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
