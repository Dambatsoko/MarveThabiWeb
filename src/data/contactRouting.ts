/**
 * MarveThabi Consulting Engineers — Intelligent Service-to-Contact Routing System
 * 
 * Centralised routing configuration connecting every website service to the
 * verified responsible contact person, designation, department, and contact channels.
 * 
 * Absolute source of truth: /services catalogue.
 */

export interface ContactPerson {
  id: string;
  name: string;
  designation: string;
  department: string;
  verifiedEmail: string;
  directPhone: string;
  image: string;
  responsibilities: string;
  verifiedStatus: 'verified_central_mailbox' | 'direct_confirmed';
  verificationNotice?: string;
}

export interface ServiceRoutingItem {
  id: string;
  ref: string;
  serviceName: string;
  category: 'Engineering Services' | 'Environmental Resource Management' | 'Specialist Studies' | 'General Enquiries';
  assignedContact: ContactPerson;
  defaultSubject: string;
  active: boolean;
}

export interface ContactCategory {
  id: string;
  name: string;
  assignedContact: {
    name: string;
    responsibility: string;
    verifiedEmail: string;
    designation: string;
  };
  defaultSubject: string;
}

export interface EnquiryRecord {
  referenceNumber: string;
  timestamp: string;
  fullName: string;
  organisation?: string;
  email: string;
  phone?: string;
  provinceOrCountry?: string;
  serviceId?: string;
  serviceName?: string;
  categoryId?: string;
  categoryName?: string;
  category?: string;
  assignedContactName: string;
  assignedContactDesignation?: string;
  assignedContactResponsibility?: string;
  assignedEmail: string;
  subject: string;
  details: string;
  attachmentName?: string;
  status: 'submitted' | 'dispatched';
}

/* =========================================================================
   VERIFIED PRINCIPALS & CONTACT PERSONS
   Only verified company principals & verified corporate email addresses are used.
   ========================================================================= */

export const CONTACT_PERSONS: Record<string, ContactPerson> = {
  marvellous: {
    id: 'marvelous-ngoatle',
    name: 'Marvelous Ngoatle',
    designation: 'Founder & Director | Pr. Tech Eng (ECSA)',
    department: 'Engineering Services & Asset Management',
    verifiedEmail: 'info@marvethabi.co.za',
    directPhone: '+27 82 412 3847',
    image: '/assets/images/Marvelous.png',
    responsibilities: 'Reliability Engineering, Asset Management (ISO 55000), Condition Monitoring, Electrical Reticulation, Mining Engineering, and Surveying Services.',
    verifiedStatus: 'verified_central_mailbox',
    verificationNotice: 'Enquiries are routed to verified corporate email info@marvethabi.co.za with direct attention to Marvelous Ngoatle (Pr. Tech Eng).',
  },
  thabang: {
    id: 'thabang-ngoatle',
    name: 'Thabang Ngoatle',
    designation: 'Founder & Director | Pr. Sci. Nat. (SACNASP)',
    department: 'Environmental Resource Management & Specialist Studies',
    verifiedEmail: 'info@marvethabi.co.za',
    directPhone: '+27 72 834 7953',
    image: '/assets/images/Thabang.png',
    responsibilities: 'Environmental Authorisations (EIA/EMPr), Water Use Licencing (WULA), Waste Compliance Audits, Air Quality & GHG Reporting, and Mine Rehabilitation.',
    verifiedStatus: 'verified_central_mailbox',
    verificationNotice: 'Enquiries are routed to verified corporate email info@marvethabi.co.za with direct attention to Thabang Ngoatle (Pr. Sci. Nat.).',
  },
  jonas: {
    id: 'jonas-lufuluabo',
    name: 'Jonas Lufuluabo',
    designation: 'Business Development Manager (DRC) & Director',
    department: 'Regional Commercial Growth & DRC Market Expansion',
    verifiedEmail: 'info@marvethabi.co.za',
    directPhone: '+27 82 412 3847',
    image: '/assets/images/Jonas.png',
    responsibilities: 'Regional business development, DRC mining partnerships, cross-border commercial joint ventures and Central African stakeholder relations.',
    verifiedStatus: 'verified_central_mailbox',
    verificationNotice: 'Enquiries are routed to verified corporate email info@marvethabi.co.za with direct attention to Jonas Lufuluabo.',
  },
  principals: {
    id: 'executive-directorate',
    name: 'MarveThabi Practice Principals',
    designation: 'Executive Directorate (ECSA & SACNASP Registered)',
    department: 'Multi-Disciplinary Technical Scoping & Client Services',
    verifiedEmail: 'info@marvethabi.co.za',
    directPhone: '+27 82 412 3847 / +27 72 834 7953',
    image: '/assets/images/logo.png',
    responsibilities: 'Direct director-led scoping across joint engineering, environmental, and infrastructure project portfolios.',
    verifiedStatus: 'verified_central_mailbox',
    verificationNotice: 'Enquiries are routed to verified corporate email info@marvethabi.co.za for immediate review by both practice principals.',
  },
};

CONTACT_PERSONS.marvelous = CONTACT_PERSONS.marvellous;

/* =========================================================================
   CENTRALISED SERVICE-TO-CONTACT ROUTING TABLE
   Source of Truth: Exact services currently offered on the MarveThabi website.
   ========================================================================= */

export const SERVICE_ROUTING_TABLE: ServiceRoutingItem[] = [
  // --- Category: Engineering Services ---
  {
    id: 'reliability-engineering',
    ref: 'RE-01',
    serviceName: 'Reliability Engineering & Monitoring',
    category: 'Engineering Services',
    assignedContact: CONTACT_PERSONS.marvellous,
    defaultSubject: 'Reliability Engineering & Condition-Based Maintenance Scoping',
    active: true,
  },
  {
    id: 'asset-management',
    ref: 'AM-02',
    serviceName: 'Asset Management Services',
    category: 'Engineering Services',
    assignedContact: CONTACT_PERSONS.marvellous,
    defaultSubject: 'ISO 55000 Asset Management Framework & Verification',
    active: true,
  },
  {
    id: 'condition-monitoring',
    ref: 'CM-01',
    serviceName: 'Condition Monitoring',
    category: 'Engineering Services',
    assignedContact: CONTACT_PERSONS.marvellous,
    defaultSubject: 'Condition Monitoring, Vibration Analysis & Thermography',
    active: true,
  },
  {
    id: 'electrical-construction',
    ref: 'EC-03',
    serviceName: 'Electrical Construction & Contracting',
    category: 'Engineering Services',
    assignedContact: CONTACT_PERSONS.marvellous,
    defaultSubject: 'Electrical Construction, COC Certification & Backup Power',
    active: true,
  },
  {
    id: 'electrical-and-electronic-engineering',
    ref: 'EE-04',
    serviceName: 'Electronic & Electrical Engineering',
    category: 'Engineering Services',
    assignedContact: CONTACT_PERSONS.marvellous,
    defaultSubject: 'Electrical Infrastructure & Substation Reticulation Design',
    active: true,
  },
  {
    id: 'mining-engineering-services',
    ref: 'ME-05',
    serviceName: 'Mining Engineering Services',
    category: 'Engineering Services',
    assignedContact: CONTACT_PERSONS.marvellous,
    defaultSubject: 'Mining Machinery Reliability & Dewatering Systems Engineering',
    active: true,
  },
  {
    id: 'surveying-services',
    ref: 'SS-11',
    serviceName: 'Surveying Services',
    category: 'Engineering Services',
    assignedContact: CONTACT_PERSONS.marvellous,
    defaultSubject: 'Engineering Topographical Site Survey & Cadastral Delineation',
    active: true,
  },
  {
    id: 'project-development-project-management',
    ref: 'PM-06',
    serviceName: 'Project Development & Project Management',
    category: 'Engineering Services',
    assignedContact: CONTACT_PERSONS.marvellous,
    defaultSubject: 'Engineering Project Management & Construction Supervision',
    active: true,
  },

  // --- Category: Environmental Resource Management ---
  {
    id: 'environmental-resource-management',
    ref: 'GE-04',
    serviceName: 'Environmental Resource Management',
    category: 'Environmental Resource Management',
    assignedContact: CONTACT_PERSONS.thabang,
    defaultSubject: 'Integrated Environmental Resource Management Advisory',
    active: true,
  },
  {
    id: 'waste-management',
    ref: 'WS-06',
    serviceName: 'Waste Management',
    category: 'Environmental Resource Management',
    assignedContact: CONTACT_PERSONS.thabang,
    defaultSubject: 'Waste Management & Licence Compliance Audit',
    active: true,
  },
  {
    id: 'water-management',
    ref: 'WM-05',
    serviceName: 'Water Management',
    category: 'Environmental Resource Management',
    assignedContact: CONTACT_PERSONS.thabang,
    defaultSubject: 'Water Use Licence Application (WULA) & Quality Monitoring',
    active: true,
  },
  {
    id: 'air-quality-management',
    ref: 'AQ-07',
    serviceName: 'Air Quality Management',
    category: 'Environmental Resource Management',
    assignedContact: CONTACT_PERSONS.thabang,
    defaultSubject: 'Dust Fallout Monitoring & Atmospheric Emission Licensing',
    active: true,
  },
  {
    id: 'greenhouse-gas-management',
    ref: 'GG-08',
    serviceName: 'Greenhouse Gas Management',
    category: 'Environmental Resource Management',
    assignedContact: CONTACT_PERSONS.thabang,
    defaultSubject: 'Carbon Footprint Accounting & Mandatory NAEIS Submissions',
    active: true,
  },

  // --- Category: Specialist Studies ---
  {
    id: 'geological-services',
    ref: 'GS-10',
    serviceName: 'Geological Services',
    category: 'Specialist Studies',
    assignedContact: CONTACT_PERSONS.thabang,
    defaultSubject: 'Geological Mapping, Core Logging & Structural Assessment',
    active: true,
  },
  {
    id: 'authorisation-permits-and-licences',
    ref: 'AP-10',
    serviceName: 'Environmental Authorisations, Permits & Licensing',
    category: 'Specialist Studies',
    assignedContact: CONTACT_PERSONS.thabang,
    defaultSubject: 'EIA, Basic Assessment & Statutory Permitting Scoping',
    active: true,
  },
  {
    id: 'compliance-audits-and-monitoring',
    ref: 'CA-11',
    serviceName: 'Environmental Compliance Audits and Monitoring',
    category: 'Specialist Studies',
    assignedContact: CONTACT_PERSONS.thabang,
    defaultSubject: 'Independent ECO Site Supervision & Environmental Legal Audit',
    active: true,
  },
  {
    id: 'environmental-rehabilitation',
    ref: 'ER-12',
    serviceName: 'Environmental Rehabilitation & Risk Management',
    category: 'Specialist Studies',
    assignedContact: CONTACT_PERSONS.thabang,
    defaultSubject: 'Mine Rehabilitation, Contaminated Land & Closure Liability',
    active: true,
  },

  // --- Category: General Enquiries ---
  {
    id: 'general-technical-enquiry',
    ref: 'GEN-01',
    serviceName: 'General Technical & Multi-Disciplinary Enquiry',
    category: 'General Enquiries',
    assignedContact: CONTACT_PERSONS.principals,
    defaultSubject: 'General Technical Consulting & Infrastructure Scoping Enquiry',
    active: true,
  },
  {
    id: 'regional-drc-expansion',
    ref: 'DRC-02',
    serviceName: 'Democratic Republic of Congo (DRC) & Cross-Border Enquiries',
    category: 'General Enquiries',
    assignedContact: CONTACT_PERSONS.jonas,
    defaultSubject: 'DRC Market Opportunity & Cross-Border Engineering Partnership',
    active: true,
  },
];

/* =========================================================================
   SIMPLIFIED SERVICE CATEGORIES & CONTACT ASSIGNMENT
   Clean, logical groupings matching the 5 verified practice areas
   ========================================================================= */

export const SERVICE_CATEGORIES: ContactCategory[] = [
  {
    id: 'engineering-services',
    name: 'Engineering Services',
    assignedContact: {
      name: 'Marvelous Ngoatle',
      responsibility: 'Responsible for Engineering Services.',
      verifiedEmail: 'info@marvethabi.co.za',
      designation: 'Founder & Director | Pr. Tech Eng (ECSA)',
    },
    defaultSubject: 'Engineering Services Enquiry',
  },
  {
    id: 'environmental-services',
    name: 'Environmental Services',
    assignedContact: {
      name: 'Thabang Ngoatle',
      responsibility: 'Responsible for Environmental Services.',
      verifiedEmail: 'info@marvethabi.co.za',
      designation: 'Founder & Director | Pr. Sci. Nat. (SACNASP)',
    },
    defaultSubject: 'Environmental Services Enquiry',
  },
  {
    id: 'mining-engineering-services',
    name: 'Mining Engineering & Support Services',
    assignedContact: {
      name: 'Jonas Lufuluabo',
      responsibility: 'Responsible for Mining Engineering & Support Services.',
      verifiedEmail: 'info@marvethabi.co.za',
      designation: 'Business Development Manager (DRC) & Director',
    },
    defaultSubject: 'Mining Engineering & Support Services Enquiry',
  },
  {
    id: 'geological-surveying-services',
    name: 'Geological & Surveying Services',
    assignedContact: {
      name: 'Thabang Ngoatle',
      responsibility: 'Responsible for Geological & Surveying Services.',
      verifiedEmail: 'info@marvethabi.co.za',
      designation: 'Founder & Director | Pr. Sci. Nat. (SACNASP)',
    },
    defaultSubject: 'Geological & Surveying Services Enquiry',
  },
  {
    id: 'general-enquiry',
    name: 'General Enquiry',
    assignedContact: {
      name: 'MarveThabi Practice Principals',
      responsibility: 'Responsible for General Enquiries & Client Services.',
      verifiedEmail: 'info@marvethabi.co.za',
      designation: 'Executive Directorate',
    },
    defaultSubject: 'General Consulting Enquiry',
  },
];

export function getServiceCategories(): ContactCategory[] {
  return SERVICE_CATEGORIES;
}

export function getServiceCategoryById(id: string): ContactCategory | undefined {
  return SERVICE_CATEGORIES.find((cat) => cat.id === id);
}

export function getDefaultServiceCategory(): ContactCategory {
  return SERVICE_CATEGORIES[0];
}

/* =========================================================================
   HELPER UTILITIES
   ========================================================================= */

export function getRoutingItemById(id: string): ServiceRoutingItem | undefined {
  const direct = SERVICE_ROUTING_TABLE.find((item) => item.id === id);
  if (direct) return direct;

  if (id === 'waste-management-license-compliance-audit') {
    return SERVICE_ROUTING_TABLE.find((item) => item.ref === 'WS-06');
  }

  // Fallback for category IDs
  const cat = SERVICE_CATEGORIES.find((c) => c.id === id);
  if (cat) {
    return {
      id: cat.id,
      ref: 'CAT',
      serviceName: cat.name,
      category: 'General Enquiries',
      assignedContact: {
        id: cat.id,
        name: cat.assignedContact.name,
        designation: cat.assignedContact.designation,
        department: cat.assignedContact.responsibility,
        verifiedEmail: cat.assignedContact.verifiedEmail,
        directPhone: '+27 82 412 3847',
        image: '/assets/images/logo.png',
        responsibilities: cat.assignedContact.responsibility,
        verifiedStatus: 'verified_central_mailbox',
      },
      defaultSubject: cat.defaultSubject,
      active: true,
    };
  }
  return undefined;
}

export function getDefaultRoutingItem(): ServiceRoutingItem {
  return (
    SERVICE_ROUTING_TABLE.find((item) => item.id === 'general-technical-enquiry') ||
    SERVICE_ROUTING_TABLE[0]
  );
}

export function getGroupedServices(): Record<string, ServiceRoutingItem[]> {
  const groups: Record<string, ServiceRoutingItem[]> = {
    'General Enquiries': [],
    'Engineering Services': [],
    'Environmental Resource Management': [],
    'Specialist Studies': [],
  };

  SERVICE_ROUTING_TABLE.forEach((item) => {
    if (item.active) {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    }
  });

  return groups;
}

export function generateEnquiryReference(): string {
  const year = new Date().getFullYear();
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `MT-${year}-${randomPart}`;
}

const STORAGE_KEY = 'marvethabi_enquiry_registry';

export function saveEnquiryToRegistry(record: EnquiryRecord): void {
  try {
    const existing = getEnquiryRegistry();
    existing.unshift(record);
    // Keep last 50 enquiries in localStorage
    const truncated = existing.slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(truncated));
  } catch (err) {
    console.warn('Unable to persist enquiry to localStorage:', err);
  }
}

export function getEnquiryRegistry(): EnquiryRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as EnquiryRecord[];
    }
  } catch (err) {
    console.warn('Unable to load enquiries from localStorage:', err);
  }
  return [];
}

/**
 * Builds a mailto URI with full enquiry payload for transparent email dispatch
 */
export function buildMailtoDispatchUrl(enquiry: EnquiryRecord): string {
  const to = enquiry.assignedEmail || 'info@marvethabi.co.za';
  const cc = 'info@marvethabi.co.za';
  const categoryLabel = enquiry.categoryName || enquiry.serviceName || enquiry.category || 'General Enquiry';
  const subject = `[Enquiry: ${categoryLabel}] ${enquiry.subject} (Ref: ${enquiry.referenceNumber})`;

  const bodyLines = [
    `NEW MARVETHABI SERVICE ENQUIRY`,
    `Reference Number: ${enquiry.referenceNumber}`,
    `Date & Time: ${enquiry.timestamp}`,
    `--------------------------------------------------`,
    `ASSIGNED DISCIPLINE & CONTACT:`,
    `Service Category: ${categoryLabel}`,
    `Assigned Contact: ${enquiry.assignedContactName}`,
    enquiry.assignedContactResponsibility ? `Responsibility: ${enquiry.assignedContactResponsibility}` : '',
    `--------------------------------------------------`,
    `CLIENT DETAILS:`,
    `Full Name: ${enquiry.fullName}`,
    `Company / Organisation: ${enquiry.organisation || 'Not specified'}`,
    `Email Address: ${enquiry.email}`,
    `Contact Number: ${enquiry.phone || 'Not provided'}`,
    `--------------------------------------------------`,
    `ENQUIRY SUBJECT & DETAILS:`,
    `Subject: ${enquiry.subject}`,
    ``,
    enquiry.details,
    `--------------------------------------------------`,
    `Submitted via MarveThabi Consulting Engineers Contact Portal`,
    `Verified Mailbox: info@marvethabi.co.za`,
  ].filter(Boolean);

  const body = encodeURIComponent(bodyLines.join('\n'));
  return `mailto:${to}?cc=${cc}&subject=${encodeURIComponent(subject)}&body=${body}`;
}
