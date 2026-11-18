import {
  servicesData,
  industriesData,
  serviceGroupsData,
  affiliationsData,
  dedicatedServicesData,
  leadershipTeamData,
  industryDetailsData,
  getDedicatedService,
  getLeaderBySlug,
  getIndustryDetail,
  ServiceSummary,
  Industry,
  ServiceGroup,
  Affiliation,
  DedicatedService,
  LeaderDetail,
  IndustryDetail,
} from '../data/marvethabi';
import {
  SERVICE_CATEGORIES,
  getServiceCategoryById,
  ContactCategory,
} from '../data/contactRouting';
import { Language } from './types';
import {
  servicesDataFr,
  affiliationsDataFr,
  serviceAltMapFr,
  serviceGroupsDataFr,
  dedicatedServicesDataFr,
} from './translations/servicesData.fr';
import {
  industriesDataFr,
  industryDetailsDataFr,
  leadershipTeamDataFr,
  contactCategoriesFr,
} from './translations/domainData.fr';

export function getLocalizedServices(lang: Language): ServiceSummary[] {
  if (lang === 'en') return servicesData;
  return servicesData.map((svc) => {
    const tr = servicesDataFr[svc.ref];
    return tr ? { ...svc, ...tr } : svc;
  });
}

export function getLocalizedIndustries(lang: Language): Industry[] {
  if (lang === 'en') return industriesData;
  return industriesData.map((ind) => {
    const tr = industriesDataFr[ind.slug];
    return tr ? { ...ind, ...tr } : ind;
  });
}

export function getLocalizedAffiliations(lang: Language): Affiliation[] {
  if (lang === 'en') return affiliationsData;
  return affiliationsData.map((aff) => ({
    ...aff,
    name: affiliationsDataFr[aff.logo] || aff.name,
  }));
}

export function getLocalizedServiceGroups(lang: Language): ServiceGroup[] {
  if (lang === 'en') return serviceGroupsData;
  return serviceGroupsData.map((group) => {
    const gTr = serviceGroupsDataFr[group.id];
    if (!gTr) return group;
    return {
      ...group,
      title: gTr.title,
      intro: gTr.intro || group.intro,
      services: group.services.map((svc) => {
        const sTr = gTr.services[svc.ref];
        return sTr
          ? {
              ...svc,
              title: sTr.title,
              desc: sTr.desc,
              items: sTr.items,
            }
          : svc;
      }),
    };
  });
}

export function getLocalizedDedicatedServices(lang: Language): DedicatedService[] {
  if (lang === 'en') return dedicatedServicesData;
  return dedicatedServicesData.map((svc) => {
    const tr = dedicatedServicesDataFr[svc.slug];
    return tr ? { ...svc, ...tr } : svc;
  });
}

export function getLocalizedDedicatedService(
  slug: string,
  lang: Language
): DedicatedService | undefined {
  const base = getDedicatedService(slug);
  if (!base || lang === 'en') return base;
  const tr = dedicatedServicesDataFr[base.slug];
  return tr ? { ...base, ...tr } : base;
}

export function getLocalizedLeadershipTeam(lang: Language): LeaderDetail[] {
  if (lang === 'en') return leadershipTeamData;
  return leadershipTeamData.map((leader) => {
    const tr = leadershipTeamDataFr[leader.slug];
    return tr ? { ...leader, ...tr } : leader;
  });
}

export function getLocalizedLeaderBySlug(
  slug: string,
  lang: Language
): LeaderDetail | undefined {
  const base = getLeaderBySlug(slug);
  if (!base || lang === 'en') return base;
  const tr = leadershipTeamDataFr[base.slug];
  return tr ? { ...base, ...tr } : base;
}

export function getLocalizedIndustryDetail(
  slug: string,
  lang: Language
): IndustryDetail | undefined {
  const base = getIndustryDetail(slug) || industryDetailsData['government'];
  if (lang === 'en') return base;
  const tr = industryDetailsDataFr[base.slug];
  return tr ? { ...base, ...tr } : base;
}

export function getLocalizedServiceCategories(lang: Language): ContactCategory[] {
  if (lang === 'en') return SERVICE_CATEGORIES;
  return SERVICE_CATEGORIES.map((cat) => contactCategoriesFr[cat.id] || cat);
}

export function getLocalizedServiceCategoryById(
  id: string,
  lang: Language
): ContactCategory | undefined {
  const base = getServiceCategoryById(id);
  if (!base || lang === 'en') return base;
  return contactCategoriesFr[base.id] || base;
}

const serviceAltMapEn: Record<string, string> = {
  'RE-01':
    'Reliability engineering specialist performing vibration analysis and diagnostic testing on industrial rotating plant machinery',
  'AM-02':
    'Physical asset management verification, lifecycle costing, and ISO 55000 asset register hierarchy classification',
  'CM-01':
    'Condition monitoring diagnostics technician utilizing infrared thermography and ultrasonic testing on operational electrical and mechanical equipment',
  'EC-03':
    'Electrical contractor installing commercial switchgear, backup diesel generator, and high-voltage cable reticulation systems',
  'EE-04':
    'High-voltage electrical substation infrastructure, overhead transmission lines, and municipal reticulation network',
  'ME-05':
    'Heavy mining equipment maintenance, pit dewatering pumps, and processing plant infrastructure engineering',
  'PM-06':
    'Engineering project managers reviewing construction blueprints and technical specifications during on-site quality assurance',
  'GE-04':
    'Environmental scientist collecting water samples and conducting catchment resource management in the natural environment',
  'WS-06':
    'Industrial waste classification, emissions monitoring equipment, and environmental waste compliance auditing',
  'WM-05':
    'Hydrogeologist monitoring groundwater borehole yield and water quality for Water Use Licence (WULA) compliance',
  'AQ-07':
    'Specialist air quality monitoring station with dust fallout sampling gauges and atmospheric emissions testing equipment',
  'GG-08':
    'Greenhouse gas emissions monitoring, carbon footprint calculation, and mandatory NAEIS reporting instrumentation',
  'HS-09':
    'Hydrogeologist conducting geophysical resistivity survey and borehole yield testing for groundwater aquifer characterisation',
  'GS-10':
    'Geologist performing rock mass core logging, foundation structural analysis, and geotechnical subsurface mapping',
  'SS-11':
    'Professional land surveyor operating high-precision electronic total station and GNSS rover for topographical site mapping',
  'AP-10':
    'Environmental consultant preparing statutory EIA, EMPr, and environmental authorisation documentation for regulatory compliance',
  'CA-11':
    'Environmental Control Officer (ECO) inspecting site water runoff channels and performing aquatic biomonitoring',
  'ER-12':
    'Mine land environmental rehabilitation featuring contaminated soil remediation and indigenous vegetation restoration',
};

export function getLocalizedServiceAlt(ref: string, title: string, lang: Language): string {
  if (lang === 'fr') {
    return serviceAltMapFr[ref] || `${title} - ${ref} prestation d’ingénierie`;
  }
  return serviceAltMapEn[ref] || `${title} - ${ref} engineering service`;
}
