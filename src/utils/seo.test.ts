import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getPageSEO,
  getAllIndexablePages,
  generateSitemapXml,
  generateRobotsTxt,
  PRODUCTION_DOMAIN,
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  SITELINKS_NAVIGATION_SCHEMA,
} from './seoConfig';

test('master domain configuration is set to official production domain', () => {
  assert.equal(PRODUCTION_DOMAIN, 'https://www.marvethabi.co.za');
});

test('organization and website schemas contain verified statutory practice details', () => {
  assert.equal(ORGANIZATION_SCHEMA.name, 'MarveThabi Consulting Engineers');
  assert.equal(ORGANIZATION_SCHEMA.legalName, 'MarveThabi Consulting Engineers (Pty) Ltd');
  assert.equal(ORGANIZATION_SCHEMA.url, 'https://www.marvethabi.co.za');
  assert.ok(ORGANIZATION_SCHEMA.telephone.includes('+27-82-412-3847'));
  assert.equal(ORGANIZATION_SCHEMA.email, 'info@marvethabi.co.za');
  assert.equal(ORGANIZATION_SCHEMA.address.addressLocality, 'Pretoria');
  assert.equal(ORGANIZATION_SCHEMA.address.addressCountry, 'ZA');
  assert.ok(
    ORGANIZATION_SCHEMA.sameAs.includes(
      'https://www.linkedin.com/company/marvethabi-consulting-engineers/'
    )
  );

  assert.equal(WEBSITE_SCHEMA.name, 'MarveThabi Consulting Engineers');
  assert.equal(WEBSITE_SCHEMA.url, 'https://www.marvethabi.co.za');
});

test('sitelinks navigation schema highlights the five prioritized internal sections', () => {
  assert.equal(SITELINKS_NAVIGATION_SCHEMA['@type'], 'ItemList');
  const items = SITELINKS_NAVIGATION_SCHEMA.itemListElement;
  assert.ok(items.length >= 5);

  const urls = items.map((i) => i.url);
  assert.ok(urls.includes('https://www.marvethabi.co.za/about'), 'Must include About Us');
  assert.ok(urls.includes('https://www.marvethabi.co.za/services'), 'Must include Our Services');
  assert.ok(urls.includes('https://www.marvethabi.co.za/leadership'), 'Must include Our Team');
  assert.ok(urls.includes('https://www.marvethabi.co.za/process'), 'Must include Our Process');
  assert.ok(urls.includes('https://www.marvethabi.co.za/contact'), 'Must include Contact Us');
});

test('core website routes have unique titles, descriptions, and canonical URLs', () => {
  const routes = ['/', '/about', '/services', '/leadership', '/process', '/industries', '/contact'];
  const titles = new Set<string>();
  const descriptions = new Set<string>();

  for (const route of routes) {
    const seo = getPageSEO(route);
    assert.ok(seo.title, `Route ${route} must have a title`);
    assert.ok(seo.description, `Route ${route} must have a description`);
    assert.ok(seo.canonicalUrl.startsWith(PRODUCTION_DOMAIN), `Canonical must use production domain`);
    assert.ok(seo.description.length >= 50, `Description should be informative (length: ${seo.description.length})`);
    assert.ok(seo.description.length <= 165, `Description must not exceed 165 chars (length: ${seo.description.length})`);

    // Ensure no duplication
    assert.equal(titles.has(seo.title), false, `Title for ${route} must be unique`);
    assert.equal(descriptions.has(seo.description), false, `Description for ${route} must be unique`);
    titles.add(seo.title);
    descriptions.add(seo.description);
  }
});

test('all 19 service detail pages have unique metadata and Service structured data', async () => {
  const { dedicatedServicesData } = await import('../data/marvethabi');
  assert.equal(dedicatedServicesData.length, 19, 'Must verify all 19 dedicated services');

  const titles = new Set<string>();
  const canonicals = new Set<string>();

  for (const svc of dedicatedServicesData) {
    const seo = getPageSEO(`/services/${svc.slug}`);
    assert.ok(seo.title.includes(svc.title), `Title must include service title`);
    assert.ok(seo.canonicalUrl, `Service ${svc.slug} must have canonical`);
    assert.equal(
      seo.canonicalUrl,
      `https://www.marvethabi.co.za/services/${svc.slug}`,
      `Canonical URL must match official format`
    );

    // Verify Service schema
    assert.ok(seo.structuredData, 'Must include structured data');
    const serviceSchema = seo.structuredData.find((s) => s['@type'] === 'Service');
    assert.ok(serviceSchema, `Must include @type: Service schema for ${svc.slug}`);
    assert.equal(serviceSchema.name, svc.title);
    assert.equal(serviceSchema.url, seo.canonicalUrl);

    assert.equal(titles.has(seo.title), false, `Title must be unique for ${svc.slug}`);
    assert.equal(canonicals.has(seo.canonicalUrl), false, `Canonical must be unique`);
    titles.add(seo.title);
    canonicals.add(seo.canonicalUrl);
  }
});

test('leadership profile pages have unique metadata and Person structured data with LinkedIn', async () => {
  const { leadershipTeamData } = await import('../data/marvethabi');
  assert.equal(leadershipTeamData.length, 3, 'Must verify all 3 directors');

  for (const leader of leadershipTeamData) {
    const seo = getPageSEO(`/leadership/${leader.slug}`);
    assert.ok(seo.title.includes(leader.name), `Title must include director name`);
    assert.equal(
      seo.canonicalUrl,
      `https://www.marvethabi.co.za/leadership/${leader.slug}`
    );

    // Verify Person schema
    const personSchema = seo.structuredData?.find((s) => s['@type'] === 'Person');
    assert.ok(personSchema, `Must include @type: Person schema for ${leader.name}`);
    assert.equal(personSchema.name, leader.name);
    assert.ok(personSchema.jobTitle.includes('Director'));
    if (leader.linkedinUrl) {
      assert.equal(personSchema.sameAs, leader.linkedinUrl);
    }
  }
});

test('all 7 industry pages have unique metadata and BreadcrumbList structured data', async () => {
  const { industriesData } = await import('../data/marvethabi');
  assert.equal(industriesData.length, 7, 'Must verify all 7 industries');

  for (const ind of industriesData) {
    const seo = getPageSEO(`/industries/${ind.slug}`);
    assert.ok(seo.title.includes(ind.name), `Title must include industry name`);
    assert.equal(
      seo.canonicalUrl,
      `https://www.marvethabi.co.za/industries/${ind.slug}`
    );

    const breadcrumbSchema = seo.structuredData?.find((s) => s['@type'] === 'BreadcrumbList');
    assert.ok(breadcrumbSchema, `Must include BreadcrumbList schema for ${ind.slug}`);
    assert.equal(breadcrumbSchema.itemListElement.length, 3);
  }
});

test('sitemap.xml generates a valid XML string containing exactly 36 canonical URLs', () => {
  const xml = generateSitemapXml('2026-11-07');
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));
  assert.ok(xml.endsWith('</urlset>'));

  const allPages = getAllIndexablePages();
  assert.equal(allPages.length, 36, 'Must contain exactly 36 canonical indexable pages');

  for (const p of allPages) {
    assert.ok(
      xml.includes(`<loc>${p.canonicalUrl}</loc>`),
      `Sitemap must contain canonical URL: ${p.canonicalUrl}`
    );
  }

  // Ensure no duplicate <loc> tags
  const locMatches = xml.match(/<loc>[\s\S]*?<\/loc>/g) || [];
  assert.equal(locMatches.length, 36, 'Must have exactly 36 unique <loc> entries');
  const uniqueLocs = new Set(locMatches);
  assert.equal(uniqueLocs.size, 36, 'All loc entries must be unique');
});

test('robots.txt allows search engine crawlers and points to production sitemap', () => {
  const robots = generateRobotsTxt();
  assert.ok(robots.includes('User-agent: *'));
  assert.ok(robots.includes('Allow: /'));
  assert.ok(robots.includes('Disallow: /api/'));
  assert.ok(robots.includes('Sitemap: https://www.marvethabi.co.za/sitemap.xml'));
  assert.ok(robots.includes('Allow: /assets/'));
});
