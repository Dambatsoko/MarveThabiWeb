import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeRawPath,
  getLanguageFromPath,
  stripLanguagePrefix,
  localizePath,
  switchLanguagePath,
  getAlternatePaths,
} from './routing';
import { UI_TRANSLATIONS } from './translations/ui';
import {
  getLocalizedServices,
  getLocalizedIndustries,
  getLocalizedAffiliations,
  getLocalizedServiceGroups,
  getLocalizedDedicatedServices,
  getLocalizedDedicatedService,
  getLocalizedLeadershipTeam,
  getLocalizedLeaderBySlug,
  getLocalizedIndustryDetail,
  getLocalizedServiceCategories,
  getLocalizedServiceCategoryById,
  getLocalizedServiceAlt,
} from './data';
import {
  dedicatedServicesData,
  industriesData,
  leadershipTeamData,
  serviceGroupsData,
  affiliationsData,
} from '../data/marvethabi';
import { SERVICE_CATEGORIES } from '../data/contactRouting';
import { processPhasesFr } from './translations/domainData.fr';

test('multilingual routing helpers normalize paths and preserve equivalents on language switch', () => {
  assert.equal(normalizeRawPath(''), '/');
  assert.equal(normalizeRawPath('/fr/'), '/fr');
  assert.equal(normalizeRawPath('/services/'), '/services');
  assert.equal(normalizeRawPath('/fr//services/reliability-engineering?utm=1'), '/fr/services/reliability-engineering');

  assert.equal(getLanguageFromPath('/'), 'en');
  assert.equal(getLanguageFromPath('/about'), 'en');
  assert.equal(getLanguageFromPath('/fr'), 'fr');
  assert.equal(getLanguageFromPath('/fr/'), 'fr');
  assert.equal(getLanguageFromPath('/fr/about-us'), 'fr');

  assert.equal(stripLanguagePrefix('/fr'), '/');
  assert.equal(stripLanguagePrefix('/fr/'), '/');
  assert.equal(stripLanguagePrefix('/about-us'), '/about');
  assert.equal(stripLanguagePrefix('/fr/about-us'), '/about');
  assert.equal(stripLanguagePrefix('/fr/team'), '/leadership');
  assert.equal(stripLanguagePrefix('/fr/services/reliability-engineering'), '/services/reliability-engineering');

  assert.equal(localizePath('/', 'en'), '/');
  assert.equal(localizePath('/', 'fr'), '/fr/');
  assert.equal(localizePath('/about', 'fr'), '/fr/about');
  assert.equal(localizePath('/services/reliability-engineering', 'fr'), '/fr/services/reliability-engineering');

  assert.equal(switchLanguagePath('/services/reliability-engineering', 'fr'), '/fr/services/reliability-engineering');
  assert.equal(switchLanguagePath('/fr/services/reliability-engineering', 'en'), '/services/reliability-engineering');
  assert.equal(switchLanguagePath('/fr/about-us', 'en'), '/about');
  assert.equal(switchLanguagePath('/team', 'fr'), '/fr/leadership');

  assert.deepEqual(getAlternatePaths('/'), { en: '/', fr: '/fr/' });
  assert.deepEqual(getAlternatePaths('/fr/services/water-management'), {
    en: '/services/water-management',
    fr: '/fr/services/water-management',
  });
});

test('UI_TRANSLATIONS has matching non-empty French keys for every English structure', () => {
  function assertKeysMatch(enObj: unknown, frObj: unknown, path: string) {
    if (typeof enObj === 'string') {
      assert.equal(typeof frObj, 'string', `Expected string at fr.${path}`);
      assert.ok((frObj as string).trim().length > 0, `Expected non-empty French string at fr.${path}`);
      return;
    }
    if (Array.isArray(enObj)) {
      assert.ok(Array.isArray(frObj), `Expected array at fr.${path}`);
      assert.equal(frObj.length, enObj.length, `Expected array length ${enObj.length} at fr.${path}`);
      enObj.forEach((item, idx) => assertKeysMatch(item, (frObj as unknown[])[idx], `${path}[${idx}]`));
      return;
    }
    if (enObj && typeof enObj === 'object') {
      assert.ok(frObj && typeof frObj === 'object', `Expected object at fr.${path}`);
      for (const key of Object.keys(enObj as Record<string, unknown>)) {
        assertKeysMatch(
          (enObj as Record<string, unknown>)[key],
          (frObj as Record<string, unknown>)[key],
          path ? `${path}.${key}` : key
        );
      }
    }
  }

  assertKeysMatch(UI_TRANSLATIONS.en, UI_TRANSLATIONS.fr, '');
});

test('all 19 dedicated services have complete, distinct French translations', () => {
  const frServices = getLocalizedDedicatedServices('fr');
  assert.equal(frServices.length, dedicatedServicesData.length);
  assert.equal(frServices.length, 19);

  for (const enSvc of dedicatedServicesData) {
    const frSvc = getLocalizedDedicatedService(enSvc.slug, 'fr');
    assert.ok(frSvc, `Missing French dedicated service for ${enSvc.slug}`);
    assert.notEqual(frSvc.title, enSvc.title, `Service title not translated for ${enSvc.slug}`);
    assert.notEqual(frSvc.summary, enSvc.summary, `Service summary not translated for ${enSvc.slug}`);
    assert.ok(frSvc.standards.length > 0);
    assert.ok(frSvc.sectors.length > 0);
    assert.ok(frSvc.capabilities.length > 0);
  }
});

test('all 3 service groups, 16 cards, 7 industries, 3 leaders, 6 process phases, and 5 contact categories are localized', () => {
  const frGroups = getLocalizedServiceGroups('fr');
  assert.equal(frGroups.length, serviceGroupsData.length);
  for (let i = 0; i < serviceGroupsData.length; i++) {
    assert.notEqual(frGroups[i].title, serviceGroupsData[i].title);
    assert.equal(frGroups[i].services.length, serviceGroupsData[i].services.length);
    for (let j = 0; j < serviceGroupsData[i].services.length; j++) {
      assert.notEqual(frGroups[i].services[j].title, serviceGroupsData[i].services[j].title);
      const frAlt = getLocalizedServiceAlt(frGroups[i].services[j].ref, frGroups[i].services[j].title, 'fr');
      const enAlt = getLocalizedServiceAlt(serviceGroupsData[i].services[j].ref, serviceGroupsData[i].services[j].title, 'en');
      assert.notEqual(frAlt, enAlt);
    }
  }

  const frSummaries = getLocalizedServices('fr');
  assert.equal(frSummaries.length, 4);

  const frIndustries = getLocalizedIndustries('fr');
  assert.equal(frIndustries.length, industriesData.length);
  for (const ind of industriesData) {
    const frInd = getLocalizedIndustryDetail(ind.slug, 'fr');
    assert.ok(frInd, `Missing French industry detail for ${ind.slug}`);
    assert.notEqual(frInd.tagline, ind.tagline);
  }

  const frTeam = getLocalizedLeadershipTeam('fr');
  assert.equal(frTeam.length, leadershipTeamData.length);
  for (const leader of leadershipTeamData) {
    const frLeader = getLocalizedLeaderBySlug(leader.slug, 'fr');
    assert.ok(frLeader, `Missing French leader detail for ${leader.slug}`);
    assert.notEqual(frLeader.summary, leader.summary);
    assert.equal(frLeader.linkedinUrl, leader.linkedinUrl);
  }

  const frAffil = getLocalizedAffiliations('fr');
  assert.equal(frAffil.length, affiliationsData.length);

  assert.equal(processPhasesFr.length, 6);

  const frCats = getLocalizedServiceCategories('fr');
  assert.equal(frCats.length, SERVICE_CATEGORIES.length);
  for (const enCat of SERVICE_CATEGORIES) {
    const frCat = getLocalizedServiceCategoryById(enCat.id, 'fr');
    assert.ok(frCat);
    assert.notEqual(frCat.name, enCat.name);
    assert.equal(frCat.assignedContact.verifiedEmail, 'info@marvethabi.co.za');
  }
});
