import test from 'node:test';
import assert from 'node:assert/strict';
import { leadershipTeamData, getLeaderBySlug } from './marvethabi';

test('leadership team contains exactly 3 directors with mapped photographs', () => {
  assert.equal(leadershipTeamData.length, 3);
  
  const slugs = leadershipTeamData.map((l) => l.slug);
  assert.ok(slugs.includes('marvellous-ngoatle'));
  assert.ok(slugs.includes('thabang-ngoatle'));
  assert.ok(slugs.includes('jonas-lufuluabo'));

  const marvellous = leadershipTeamData.find((l) => l.slug === 'marvellous-ngoatle');
  const thabang = leadershipTeamData.find((l) => l.slug === 'thabang-ngoatle');
  const jonas = leadershipTeamData.find((l) => l.slug === 'jonas-lufuluabo');

  assert.equal(marvellous?.image, 'Marvelous.png');
  assert.equal(thabang?.image, 'Thabang.png');
  assert.equal(jonas?.image, 'Jonas.png');
});

test('each leadership member has the exact requested LinkedIn profile URL', () => {
  const marvellous = leadershipTeamData.find((l) => l.slug === 'marvellous-ngoatle');
  const thabang = leadershipTeamData.find((l) => l.slug === 'thabang-ngoatle');
  const jonas = leadershipTeamData.find((l) => l.slug === 'jonas-lufuluabo');

  assert.equal(
    marvellous?.linkedinUrl,
    'https://www.linkedin.com/in/marvelous-tladi-ngoatle-pr-tech-eng-msaiee-72591a116/'
  );
  assert.equal(
    thabang?.linkedinUrl,
    'https://www.linkedin.com/in/thabang-ngoatle-pr-sci-nat-63647521a/'
  );
  assert.equal(
    jonas?.linkedinUrl,
    'https://za.linkedin.com/in/jonas-lufuluabo-a6a971186?trk=public_post_follow-view-profile'
  );
});

test('getLeaderBySlug preserves the leader LinkedIn profile URL', () => {
  const leaderM = getLeaderBySlug('marvellous-ngoatle');
  assert.equal(
    leaderM?.linkedinUrl,
    'https://www.linkedin.com/in/marvelous-tladi-ngoatle-pr-tech-eng-msaiee-72591a116/'
  );

  const leaderT = getLeaderBySlug('thabang-ngoatle');
  assert.equal(
    leaderT?.linkedinUrl,
    'https://www.linkedin.com/in/thabang-ngoatle-pr-sci-nat-63647521a/'
  );

  const leaderJ = getLeaderBySlug('jonas-lufuluabo');
  assert.equal(
    leaderJ?.linkedinUrl,
    'https://za.linkedin.com/in/jonas-lufuluabo-a6a971186?trk=public_post_follow-view-profile'
  );
});

test('environmental services restructuring satisfies exact requirements', async () => {
  const { serviceGroupsData } = await import('./marvethabi');

  // Find Group 02
  const envGroup = serviceGroupsData.find((g) => g.id === 'environmental-services' || g.id === 'environmental-management');
  assert.ok(envGroup, 'Environmental services group must exist');
  assert.equal(envGroup.title, 'Environmental Services');

  // 1. Air Quality Management: 4 exact items
  const aq = envGroup.services.find((s) => s.ref === 'AQ-07');
  assert.ok(aq, 'Air Quality Management service must exist');
  assert.equal(aq.title, 'Air Quality Management');
  assert.deepEqual(aq.items, [
    'Dust Fallout Monitoring',
    'Atmospheric Emission Licencing',
    'Air Quality Management Plan',
    'Noise Monitoring',
  ]);

  // 2. Greenhouse Gas Management: 5 exact items
  const ghg = envGroup.services.find((s) => s.ref === 'GG-08');
  assert.ok(ghg, 'Greenhouse Gas Management service must exist');
  assert.equal(ghg.title, 'Greenhouse Gas Management');
  assert.equal(ghg.desc, 'Carbon accounting and national reporting done to the decimal.');
  assert.deepEqual(ghg.items, [
    'Carbon Footprint Calculations',
    'NAEIS Reporting',
    'Greenhouse Gas Management and Mitigation Strategies',
    'Dust Fallout Monitoring',
    'Atmospheric Emission Licence (AEL) Applications and Reviews',
  ]);
  assert.ok(
    !ghg.items.some((i) => i.includes('& ASTM D1739 Reporting')),
    'Must remove & ASTM D1739 Reporting'
  );
  assert.ok(
    !ghg.items.some((i) => i.includes('Mandatory Emissions')),
    'Must remove Mandatory Emissions'
  );
  assert.ok(
    !ghg.items.some((i) => i.includes('Carbon Footprint Accounting & Mandatory NAEIS/GHG Reporting')),
    'Must remove Carbon Footprint Accounting & Mandatory NAEIS/GHG Reporting'
  );

  // Water Management
  const wm = envGroup.services.find((s) => s.ref === 'WM-05');
  assert.ok(wm, 'WM-05 service must exist');
  assert.ok(
    wm.items.includes('Groundwater and Surface Water Quality Monitoring'),
    'WM-05 must have Groundwater and Surface Water Quality Monitoring'
  );

  // 3. Environmental Resource Management card completely removed
  const allServices = serviceGroupsData.flatMap((g) => g.services);
  assert.equal(
    allServices.some((s) => s.title === 'Environmental Resource Management'),
    false,
    'Environmental Resource Management card must be completely removed'
  );
  assert.equal(
    allServices.some((s) => s.ref === 'GE-04'),
    false,
    'GE-04 card must be completely removed'
  );

  // 4. Surveying Services relocated directly under Mining Engineering Services
  const engGroup = serviceGroupsData.find((g) => g.id === 'engineering-services');
  assert.ok(engGroup, 'Engineering services group must exist');
  const miningIndex = engGroup.services.findIndex((s) => s.ref === 'ME-05');
  const surveyingIndex = engGroup.services.findIndex((s) => s.ref === 'SS-11');
  assert.ok(miningIndex >= 0, 'Mining Engineering Services must exist');
  assert.equal(
    surveyingIndex,
    miningIndex + 1,
    'Surveying Services must be directly underneath Mining Engineering Services'
  );

  // 5. Waste Management: heading is Waste Management, 4 items including Waste Management Licence Compliance Audit
  const wasteService = envGroup.services.find((s) => s.ref === 'WS-06');
  assert.ok(wasteService, 'WS-06 service must exist');
  assert.equal(
    wasteService.title,
    'Waste Management',
    'Heading must be Waste Management'
  );
  assert.ok(
    wasteService.items.includes('Waste Management Licence Compliance Audit'),
    'Must include Waste Management Licence Compliance Audit'
  );
  assert.deepEqual(wasteService.items, [
    'Waste Management Licence Compliance Audit',
    'Waste Licensing and Classification according to NEM:WA standards',
    'Integrated Waste Management Plans (IWMP)',
    'Sewage Plant Performance Audits and Effluent Compliance',
  ]);
});

test('intelligent contact routing maps each service to verified contact persons', async () => {
  const { SERVICE_ROUTING_TABLE, getRoutingItemById } = await import('./contactRouting');

  assert.ok(SERVICE_ROUTING_TABLE.length >= 18, 'Routing table must contain all services');

  const reRouting = getRoutingItemById('reliability-engineering');
  assert.equal(reRouting?.assignedContact.name, 'Marvellous Ngoatle');
  assert.equal(reRouting?.assignedContact.verifiedEmail, 'info@marvethabi.co.za');

  const waterRouting = getRoutingItemById('water-management');
  assert.equal(waterRouting?.assignedContact.name, 'Thabang Ngoatle');
  assert.equal(waterRouting?.assignedContact.verifiedEmail, 'info@marvethabi.co.za');

  const surveyingRouting = getRoutingItemById('surveying-services');
  assert.equal(surveyingRouting?.category, 'Engineering Services');
  assert.equal(surveyingRouting?.assignedContact.name, 'Marvellous Ngoatle');

  const wasteRouting = getRoutingItemById('waste-management');
  assert.equal(wasteRouting?.serviceName, 'Waste Management');
  assert.equal(wasteRouting?.assignedContact.name, 'Thabang Ngoatle');

  const wasteRoutingLegacy = getRoutingItemById('waste-management-license-compliance-audit');
  assert.equal(wasteRoutingLegacy?.serviceName, 'Waste Management');
});

test('simplified service categories and automatic contact assignments', async () => {
  const { SERVICE_CATEGORIES, getServiceCategoryById, buildMailtoDispatchUrl } = await import('./contactRouting');

  assert.equal(SERVICE_CATEGORIES.length, 5, 'Must contain exactly 5 simplified service categories');

  // 1. Engineering Services
  const eng = getServiceCategoryById('engineering-services');
  assert.ok(eng, 'Engineering Services must exist');
  assert.equal(eng.assignedContact.name, 'Marvellous Ngoatle');
  assert.equal(eng.assignedContact.responsibility, 'Responsible for Engineering Services.');

  // 2. Environmental Services
  const env = getServiceCategoryById('environmental-services');
  assert.ok(env, 'Environmental Services must exist');
  assert.equal(env.assignedContact.name, 'Thabang Ngoatle');
  assert.equal(env.assignedContact.responsibility, 'Responsible for Environmental Services.');

  // 3. Mining Engineering & Support Services
  const mining = getServiceCategoryById('mining-engineering-services');
  assert.ok(mining, 'Mining Engineering & Support Services must exist');
  assert.equal(mining.assignedContact.name, 'Jonas Lufuluabo');
  assert.equal(mining.assignedContact.responsibility, 'Responsible for Mining Engineering & Support Services.');

  // 4. Geological & Surveying Services
  const geo = getServiceCategoryById('geological-surveying-services');
  assert.ok(geo, 'Geological & Surveying Services must exist');
  assert.equal(geo.assignedContact.name, 'Thabang Ngoatle');
  assert.equal(geo.assignedContact.responsibility, 'Responsible for Geological & Surveying Services.');

  // 5. General Enquiry
  const gen = getServiceCategoryById('general-enquiry');
  assert.ok(gen, 'General Enquiry must exist');
  assert.equal(gen.assignedContact.name, 'MarveThabi Practice Principals');

  // Verify mailto generation
  const mailto = buildMailtoDispatchUrl({
    referenceNumber: 'MT-2026-1234',
    timestamp: '01 Nov 2026',
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    subject: 'Project Inquiry',
    details: 'Need assistance with plant reliability',
    assignedContactName: eng.assignedContact.name,
    assignedEmail: eng.assignedContact.verifiedEmail,
    categoryName: eng.name,
    status: 'submitted',
  });
  assert.ok(mailto.startsWith('mailto:info@marvethabi.co.za'), 'Must dispatch to verified mailbox');
  assert.ok(mailto.includes('cc=info%40marvethabi.co.za') || mailto.includes('cc=info@marvethabi.co.za'), 'Must copy central corporate address');
});

test('affiliations data contains exactly the 5 statutory councils in the specified order', async () => {
  const { affiliationsData } = await import('./marvethabi');
  assert.equal(affiliationsData.length, 5, 'Must contain exactly 5 statutory councils');

  const expectedOrder = [
    { prefix: 'cidb', nameSnippet: 'cidb' },
    { prefix: 'sacnasp', nameSnippet: 'SACNASP' },
    { prefix: 'electrical-contractors-association', nameSnippet: 'ECA' },
    { prefix: 'saiee', nameSnippet: 'SAIEE' },
    { prefix: 'ecsa', nameSnippet: 'ECSA' },
  ];

  expectedOrder.forEach((expected, idx) => {
    assert.ok(
      affiliationsData[idx].logo.startsWith(expected.prefix),
      `Affiliation #${idx + 1} logo must match ${expected.prefix}`
    );
    assert.ok(
      affiliationsData[idx].name.includes(expected.nameSnippet),
      `Affiliation #${idx + 1} name must contain ${expected.nameSnippet}`
    );
  });
});

test('footer contains exactly 3 sections and excludes Engineering Services category list', async () => {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const footerContent = await fs.readFile(
    path.resolve(process.cwd(), 'src/components/Footer.tsx'),
    'utf-8'
  );

  assert.equal(
    footerContent.includes('Engineering Services'),
    false,
    'Footer must not contain Engineering Services section'
  );
  assert.ok(
    footerContent.includes('<span className="foot-h">Company</span>'),
    'Footer must contain Company section'
  );
  assert.ok(
    footerContent.includes('<span className="foot-h">Contact</span>'),
    'Footer must contain Contact section'
  );
  assert.ok(
    footerContent.includes('foot-logo'),
    'Footer must contain Brand/Logo section'
  );
});

test('leadership page Statutory Code of Professional Conduct heading is configured to 42px without wrapping', async () => {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const leadContent = await fs.readFile(
    path.resolve(process.cwd(), 'src/components/LeadershipPage.tsx'),
    'utf-8'
  );

  assert.ok(
    leadContent.includes('Statutory Code of Professional Conduct'),
    'Leadership page must contain Statutory Code of Professional Conduct heading'
  );
  assert.ok(
    leadContent.includes("fontSize: '42px'") || leadContent.includes('lead-gov-heading'),
    'Leadership page heading must specify 42px font size'
  );

  const cssContent = await fs.readFile(
    path.resolve(process.cwd(), 'assets/css/main.css'),
    'utf-8'
  );
  assert.ok(
    cssContent.includes('.lead-gov-heading'),
    'CSS must contain .lead-gov-heading'
  );
  assert.ok(
    cssContent.includes('42px') && cssContent.includes('white-space: nowrap'),
    'CSS must configure 42px and white-space: nowrap for single-line display'
  );
});

test('reliability engineering & monitoring contains exactly the five specified services and closing statement', async () => {
  const { serviceGroupsData, dedicatedServicesData } = await import('./marvethabi');

  const expectedServices = [
    'Reliability-Centred Maintenance (RCM) facilitation and implementation.',
    'Asset Criticality Analysis to prioritise assets based on risk, safety, cost, and production impact.',
    'Failure Modes and Effects Analysis (FMEA) for proactive identification and mitigation of failure risks.',
    'Maintenance Strategy and Asset Tactics Development aligned to operational objectives and business value.',
    'Root Cause Failure Analysis (RCFA) to identify, analyse, and eliminate recurring and high-impact failures.',
  ];

  const expectedClosing =
    'Our approach ensures maintenance activities are technically sound, risk-based, and aligned with operational and business performance goals.';

  // 1. Service card in serviceGroupsData
  const engGroup = serviceGroupsData.find((g) => g.id === 'engineering-services');
  assert.ok(engGroup, 'Engineering services group must exist');

  const reCard = engGroup.services.find((s) => s.ref === 'RE-01');
  assert.ok(reCard, 'RE-01 service card must exist');
  assert.equal(reCard.title, 'Reliability Engineering & Monitoring');
  assert.equal(reCard.desc, 'Condition-based programmes that find failure before failure finds the plant.');
  assert.equal(reCard.img, 'reliability-monitoring.png');
  assert.deepEqual(reCard.items, expectedServices, 'Card items must match the five items word for word');
  assert.equal(reCard.items.length, 5, 'Card must have exactly 5 items');

  // 2. Dedicated service page in dedicatedServicesData
  const reDedicated = dedicatedServicesData.find((s) => s.slug === 'reliability-engineering');
  assert.ok(reDedicated, 'Dedicated reliability-engineering service must exist');
  assert.equal(reDedicated.ref, 'RE-01');
  assert.equal(reDedicated.image, 'reliability-monitoring.png');
  assert.deepEqual(
    reDedicated.capabilities[0].items,
    expectedServices,
    'Dedicated service items must match the five items word for word'
  );
  assert.equal(reDedicated.capabilities[0].items.length, 5, 'Dedicated service must have exactly 5 items');
  assert.equal(reDedicated.closingStatement, expectedClosing, 'Closing statement must match word for word');
  assert.equal(reDedicated.approach, expectedClosing, 'Approach must match closing statement word for word');
});

test('process page maintains complete content, exact single-column vertical sequence, and responsive layout', async () => {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');

  const procPageSrc = await fs.readFile(
    path.resolve(process.cwd(), 'src/components/ProcessPage.tsx'),
    'utf-8'
  );

  // 1. All 6 phases preserved with exact phase titles
  const expectedPhases = [
    'Consultation & Scoping',
    'Investigation & Baseline Diagnostics',
    'Engineering Design & Calculations',
    'Implementation & Construction Supervision',
    'Quality Assurance & Statutory Commissioning',
    'Long-Term Support & Asset Optimization',
  ];
  for (const title of expectedPhases) {
    assert.ok(procPageSrc.includes(title), `Process page must include "${title}"`);
  }

  // 2. All 4 hero tags preserved
  const expectedHeroTags = [
    'Stage-Gate Quality Assurance',
    'SANS &amp; ISO 55000 Alignment',
    'Statutory Professional Oversight',
    'Commissioning &amp; Handover',
  ];
  for (const tag of expectedHeroTags) {
    assert.ok(procPageSrc.includes(tag), `Process hero must include tag "${tag}"`);
  }

  // 3. Section heading preserved
  assert.ok(
    procPageSrc.includes('End-to-End Delivery Architecture'),
    'Process page must contain End-to-End Delivery Architecture heading'
  );

  // 4. Responsive classes applied (no hardcoded desktop grid inline styles)
  assert.ok(procPageSrc.includes('proc-hero-tags'), 'Hero tags must use proc-hero-tags class');
  assert.ok(procPageSrc.includes('proc-sec-head'), 'Section head must use proc-sec-head class');
  assert.ok(procPageSrc.includes('proc-list'), 'List must use proc-list class');
  assert.ok(procPageSrc.includes('proc-card'), 'Cards must use proc-card class');
  assert.ok(procPageSrc.includes('proc-card-deliv'), 'Deliverables must use proc-card-deliv class');
  assert.equal(
    procPageSrc.includes("gridTemplateColumns: '100px 1.5fr 1fr'"),
    false,
    'Hardcoded desktop inline grid must be removed'
  );

  // 5. CSS rules in main.css include mobile breakpoints & single-column layout
  const cssSrc = await fs.readFile(
    path.resolve(process.cwd(), 'public/assets/css/main.css'),
    'utf-8'
  );
  assert.ok(cssSrc.includes('.proc-card {'), 'main.css must define .proc-card');
  assert.ok(cssSrc.includes('@media (max-width: 880px)'), 'main.css must define max-width: 880px breakpoint');
  assert.ok(cssSrc.includes('@media (max-width: 640px)'), 'main.css must define max-width: 640px mobile breakpoint');
  assert.ok(cssSrc.includes('@media (max-width: 360px)'), 'main.css must define max-width: 360px small mobile breakpoint');
  assert.ok(cssSrc.includes('.foot-grid'), 'main.css must define .foot-grid mobile spacing');
});



