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

  // 1. Air Quality Management
  const envGroup = serviceGroupsData.find((g) => g.id === 'environmental-management');
  assert.ok(envGroup, 'Environmental management group must exist');

  const aq = envGroup.services.find((s) => s.ref === 'AQ-07');
  assert.ok(aq, 'Air Quality Management service must exist');
  assert.ok(
    !aq.items.some((i) => i.includes('Point-Source and Fugitive Dust Assessments')),
    'Must completely remove Point-Source and Fugitive Dust Assessments'
  );

  // 2. Greenhouse Gas Management
  const ghg = envGroup.services.find((s) => s.ref === 'GG-08');
  assert.ok(ghg, 'Greenhouse Gas Management service must exist');
  assert.ok(
    !ghg.items.some((i) => i.includes('Scope 1, Scope 2, and Scope 3')),
    'Must remove (Scope 1, Scope 2, and Scope 3)'
  );
  assert.ok(
    !ghg.items.some((i) => i.includes('Carbon Tax Exposure Assessments')),
    'Must completely remove Carbon Tax Exposure Assessments'
  );
  assert.ok(
    !ghg.items.some((i) => i.includes('Energy Optimization')),
    'Must completely remove Energy Optimization'
  );
  assert.ok(
    ghg.items.includes('Dust Fallout Monitoring & ASTM D1739 Reporting'),
    'Must include Dust Fallout Monitoring & ASTM D1739 Reporting in Greenhouse Gas Management'
  );
  assert.ok(
    ghg.items.includes('Atmospheric Emission Licence (AEL) Applications and Reviews'),
    'Must include Atmospheric Emission Licence (AEL) Applications and Reviews in Greenhouse Gas Management'
  );
  assert.ok(
    ghg.items.includes('Carbon Footprint Accounting & Mandatory NAEIS/GHG Reporting'),
    'Must include Carbon Footprint Accounting & Mandatory NAEIS/GHG Reporting in Greenhouse Gas Management'
  );

  // Water Management
  const wm = envGroup.services.find((s) => s.ref === 'WM-05');
  assert.ok(wm, 'WM-05 service must exist');
  assert.ok(
    wm.items.includes('Groundwater and Surface Water Quality Monitoring'),
    'WM-05 must have Groundwater and Surface Water Quality Monitoring'
  );
  assert.ok(
    !wm.items.some((i) => i.includes('Groundwater and Surface Water Quality Monitoring Networks')),
    'Old item with Networks must be replaced'
  );

  // 3. Specialist Environmental & Hydrogeological Studies removed
  const allServices = serviceGroupsData.flatMap((g) => g.services);
  assert.equal(
    allServices.some((s) => s.title === 'Specialist Environmental & Hydrogeological Studies'),
    false,
    'Specialist Environmental & Hydrogeological Studies card must be completely removed'
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

  // Check Specialist Studies no longer contains Surveying Services
  const specGroup = serviceGroupsData.find((g) => g.id === 'specialist-studies');
  assert.ok(specGroup, 'Specialist studies group must exist');
  assert.equal(
    specGroup.services.some((s) => s.ref === 'SS-11'),
    false,
    'Surveying Services must no longer exist in Specialist Studies'
  );

  // 5. Waste Management License Compliance Audit renamed
  const wasteService = envGroup.services.find((s) => s.ref === 'WS-06');
  assert.ok(wasteService, 'WS-06 service must exist');
  assert.equal(
    wasteService.title,
    'Waste Management License Compliance Audit',
    'Heading must be Waste Management License Compliance Audit'
  );
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

  const wasteRouting = getRoutingItemById('waste-management-license-compliance-audit');
  assert.equal(wasteRouting?.serviceName, 'Waste Management License Compliance Audit');
  assert.equal(wasteRouting?.assignedContact.name, 'Thabang Ngoatle');
});

test('environmental resource management excludes Air Quality and GHG accounting items', async () => {
  const { serviceGroupsData, getDedicatedService } = await import('./marvethabi');

  const envGroup = serviceGroupsData.find((g) => g.id === 'environmental-management');
  assert.ok(envGroup, 'Environmental management group must exist');

  const ermService = envGroup.services.find((s) => s.ref === 'GE-04');
  assert.ok(ermService, 'GE-04 service must exist');

  assert.equal(
    ermService.items.some((i) => i.includes('Air Quality Monitoring, Dust Fallout Networks and AEL Support')),
    false,
    'Air Quality Monitoring, Dust Fallout Networks and AEL Support must be removed from ERM'
  );

  assert.equal(
    ermService.items.some((i) => i.includes('Greenhouse Gas Accounting and Mandatory NAEIS Reporting')),
    false,
    'Greenhouse Gas Accounting and Mandatory NAEIS Reporting must be removed from ERM'
  );

  const ermDetail = getDedicatedService('environmental-resource-management');
  assert.ok(ermDetail, 'environmental-resource-management detail must exist');
  const ermGroup = ermDetail.capabilities.find((c) => c.group === 'Environmental Resource Management');
  assert.ok(ermGroup, 'Environmental Resource Management capability group must exist');

  assert.equal(
    ermGroup.items.some((i) => i.includes('Air Quality Monitoring, Dust Fallout Networks and AEL Support')),
    false,
    'Air Quality Monitoring, Dust Fallout Networks and AEL Support must be removed from ERM capabilities'
  );

  assert.equal(
    ermGroup.items.some((i) => i.includes('Greenhouse Gas Accounting and Mandatory NAEIS Reporting')),
    false,
    'Greenhouse Gas Accounting and Mandatory NAEIS Reporting must be removed from ERM capabilities'
  );
});
