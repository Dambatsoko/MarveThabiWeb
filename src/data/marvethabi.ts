export interface ServiceSummary {
  ref: string;
  icon: 'gear' | 'network' | 'bolt' | 'terrain';
  title: string;
  items: string[];
}

export interface Client {
  name: string;
  logo: string;
}

export interface Industry {
  name: string;
  slug: string;
  path: string;
  tagline?: string;
}

export interface IndustryServiceRef {
  name: string;
  slug: string;
  ref: string;
  description: string;
}

export interface IndustryServiceGroup {
  category: string;
  services: IndustryServiceRef[];
}

export interface IndustryDetail {
  slug: string;
  name: string;
  tagline: string;
  docNo: string;
  path: string;
  summary: string;
  fitDescription: string;
  serviceAlignments: IndustryServiceGroup[];
  keyChallenges: string[];
  keyOutcomes: string[];
  standards: string[];
  caseStudyHighlight?: {
    title: string;
    description: string;
  };
}

export interface LeaderDetail {
  name: string;
  role: string;
  image: string;
  primaryRegistration: string;
  summary: string;
  qualifications: string[];
  areasOfExpertise: string[];
  projectExperience?: string[];
  commercialResponsibilities?: string[];
  professionalFocus: string[];
  outcomes: string[];
  sectors?: string[];
}

export interface WhyCard {
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Capability {
  title: string;
  description: string;
  image: string;
}

export interface Leader {
  name: string;
  role: string;
  image: string;
  qualifications: string[];
}

export interface ServiceDetail {
  ref: string;
  icon: string;
  img: string;
  title: string;
  desc: string;
  items: string[];
}

export interface ServiceGroup {
  no: string;
  id: string;
  title: string;
  intro: string;
  services: ServiceDetail[];
}

export interface Affiliation {
  logo: string;
  name: string;
}

export const servicesData: ServiceSummary[] = [
  {
    ref: 'RE-01',
    icon: 'gear',
    title: 'Reliability Engineering',
    items: ['Asset Criticality', 'Root Cause Analysis', 'Condition Monitoring', 'Asset Strategies', 'ISO55000'],
  },
  {
    ref: 'AM-02',
    icon: 'network',
    title: 'Asset Management',
    items: ['Lifecycle Management', 'Asset Registers', 'Digital Twins', 'Master Data', 'Performance Management'],
  },
  {
    ref: 'EE-03',
    icon: 'bolt',
    title: 'Electrical Engineering',
    items: ['Transmission', 'Reticulation', 'Substations', 'Street Lighting', 'Generators', 'Solar'],
  },
  {
    ref: 'GE-04',
    icon: 'terrain',
    title: 'Geo-Environmental',
    items: ['Environmental Studies', 'Hydrogeology', 'Water Licensing', 'Environmental Audits', 'Waste Management', 'Compliance'],
  },
];

export const clientsData: Client[] = [
  { name: 'Anglo American', logo: 'client-anglo.png' },
  { name: 'Glencore', logo: 'client-glencore.png' },
  { name: 'Harmony Gold', logo: 'client-harmony.png' },
  { name: 'Thungela', logo: 'client-thungela.png' },
  { name: 'Valterra Platinum', logo: 'client-valterra.png' },
  { name: 'Umgeni Water', logo: 'client-umgeni.png' },
  { name: 'City of Ekurhuleni', logo: 'client-ekurhuleni.png' },
];

export const industriesData: Industry[] = [
  {
    name: 'Government',
    slug: 'government',
    path: 'M8 40V20l16-12 16 12v20H28v-12h-8v12H8z',
    tagline: 'Public Sector Infrastructure, GRAP 17 Asset Registers & Statutory Compliance',
  },
  {
    name: 'Mining',
    slug: 'mining',
    path: 'M10 38l10-18 6 8 6-12 6 22H10z M34 10l6 6',
    tagline: 'Heavy Plant Reliability, Dewatering Hydrogeology & Mine Rehabilitation',
  },
  {
    name: 'Energy',
    slug: 'energy',
    path: 'M26 6L14 26h9l-3 16 14-22h-9l1-14z',
    tagline: 'Substation Engineering, Power Transmission & Renewable Microgrids',
  },
  {
    name: 'Municipalities',
    slug: 'municipalities',
    path: 'M8 40h32M12 40V22h6v18M22 40V14h6v26M32 40V26h6v14',
    tagline: 'Township Electrification, Water Reticulation & mSCOA Asset Verification',
  },
  {
    name: 'Industrial',
    slug: 'industrial',
    path: 'M6 40V24l10 6V24l10 6V16h10l4 24H6z',
    tagline: 'Predictive Condition Monitoring, SANS 10142 COCs & Emission Licensing',
  },
  {
    name: 'Commercial',
    slug: 'commercial',
    path: 'M12 40V10h24v30M18 16h4M26 16h4M18 24h4M26 24h4M18 32h4M26 32h4',
    tagline: 'Building Electrical Services, Backup Power Sizing & Environmental Scoping',
  },
  {
    name: 'Infrastructure Development',
    slug: 'infrastructure-development',
    path: 'M4 34h40M10 34V22M22 34V16M34 34V22M10 22l12-6 12 6',
    tagline: 'Multi-Discipline Engineering Supervision, WULA Licences & ECO Site Audits',
  },
];

export const whyData: WhyCard[] = [
  {
    title: 'Engineering Excellence',
    description: 'Highly qualified specialists delivering technically sound, standards-driven solutions.',
  },
  {
    title: 'Government Ready',
    description: 'Experience supporting public-sector and municipal infrastructure requirements.',
  },
  {
    title: 'Transformation',
    description: '100% Black Owned. Level 1 B-BBEE Contributor.',
  },
  {
    title: 'Integrated Expertise',
    description: 'Engineering, environmental and asset management solutions under one roof.',
  },
];

export const processData: ProcessStep[] = [
  { number: '01', title: 'Consultation', description: 'Scoping the engineering requirement with the client and stakeholders.' },
  { number: '02', title: 'Investigation', description: 'Site assessments, data gathering, surveys and condition studies.' },
  { number: '03', title: 'Engineering Design', description: 'Standards-driven design, specifications and technical documentation.' },
  { number: '04', title: 'Implementation', description: 'Construction monitoring, commissioning and project management.' },
  { number: '05', title: 'Quality Assurance', description: 'Testing, compliance verification and as-built documentation.' },
  { number: '06', title: 'Long-Term Support', description: 'Asset strategies, monitoring and maintenance planning.' },
];

export const capabilitiesData: Capability[] = [
  {
    title: 'Electrical Infrastructure',
    description:
      'Transmission, reticulation and substation engineering for utilities, municipalities and industry. From 11kV distribution networks to bulk supply upgrades, designs are delivered to SANS and utility standards with full compliance documentation.',
    image: 'service_substation_engineering_1790348244291.jpg',
  },
  {
    title: 'Asset Management',
    description:
      'ISO55000-aligned asset management frameworks covering asset registers, master data, lifecycle costing and digital twins. Built for public entities that must account for every asset on their books.',
    image: 'service_asset_management_1790347194800.jpg',
  },
  {
    title: 'Environmental Monitoring',
    description:
      'Groundwater monitoring networks, environmental audits and compliance reporting that keep operations within licence conditions and ahead of regulatory review.',
    image: 'service_environmental_1790347236174.jpg',
  },
  {
    title: 'Reliability Engineering',
    description:
      'Criticality analysis, root cause analysis and condition monitoring programmes that reduce unplanned downtime across plant and network assets.',
    image: 'service_reliability_1790347183131.jpg',
  },
  {
    title: 'Hydrogeology',
    description:
      'Aquifer characterisation, borehole siting, water use licensing and geohydrological reporting for mines, municipalities and developers.',
    image: 'service_hydrogeology_1790347696314.jpg',
  },
  {
    title: 'Power Systems',
    description:
      'Load studies, protection coordination, generator and solar integration, and network master planning for growing demand.',
    image: 'service_electrical_construction_1790348230678.jpg',
  },
];

export const leadersData: Leader[] = [
  {
    name: 'Marvelous Ngoatle',
    role: 'Founder & Director',
    image: 'marvelous.jpg',
    qualifications: [
      'B-Tech Electrical Engineering',
      'Professional Engineering Technologist (ECSA)',
      'Qualified Electrician & Wireman\'s Licence',
      'Certified Thermographer & Motor Circuit Analyst',
    ],
  },
  {
    name: 'Thabang Ngoatle',
    role: 'Founder & Director',
    image: 'thabang.jpg',
    qualifications: [
      'MSc Environmental Management',
      'Professional Scientist (SACNASP)',
      'SAMTRAC Safety & Risk Qualified',
      'PhD Candidate in Geography (UNISA)',
    ],
  },
];

export const serviceGroupsData: ServiceGroup[] = [
  {
    no: '01',
    id: 'engineering-services',
    title: 'Engineering Services',
    intro: 'Reliability, asset management and electrical engineering delivered to ISO55000, SANS and utility standards, from plant floor to municipal network.',
    services: [
      {
        ref: 'RE-01',
        icon: 'wave',
        img: 'service_reliability_1790347183131.jpg',
        title: 'Reliability Engineering Services',
        desc: 'Condition-based programmes that find failure before failure finds the plant.',
        items: [
          'Reliability-Centred Maintenance (RCM) implementation',
          'Asset Criticality Analysis based on risk, safety, and production impact',
          'Failure Modes and Effects Analysis (FMEA)',
          'Maintenance Strategy and Asset Tactics Development',
          'Root Cause Failure Analysis (RCFA)',
          'Condition Monitoring Systems (Vibration, Oil, Motor Circuit, Conveyor Health)',
        ],
      },
      {
        ref: 'AM-02',
        icon: 'register',
        img: 'service_asset_management_1790347194800.jpg',
        title: 'Asset Management Services',
        desc: 'ISO55000 frameworks that account for every asset, from register to digital twin.',
        items: [
          'Asset Management Framework Development aligned with ISO 55000',
          'Maintenance Planning and Scheduling',
          'Asset Registers, Asset Hierarchies & Master Data',
          'Lifecycle Costing and Risk Analysis',
          'Asset Performance Measurement and Benchmarking',
          'Physical Asset Identification, Verification & Validation',
        ],
      },
      {
        ref: 'EC-03',
        icon: 'plug',
        img: 'service_electrical_construction_1790348230678.jpg',
        title: 'Electrical Construction',
        desc: 'Installation, commissioning and certification for residential, commercial and industrial sites.',
        items: [
          'Generator Installation, Commissioning, Maintenance and Repair',
          'Solar Power Installation, Commissioning, Maintenance and Repair',
          'Electrical Wiring Services for Commercial and Industrial Facilities',
          'Electrical Fault Finding and Testing Services',
          'Electrical Compliance Certificates (COC)',
          'Cable Fault Detecting & Thump Testing',
        ],
      },
      {
        ref: 'EE-04',
        icon: 'pylon',
        img: 'service_substation_engineering_1790348244291.jpg',
        title: 'Electrical and Electronic Engineering',
        desc: 'Infrastructure engineering from transmission line to township reticulation.',
        items: [
          'Electrical Infrastructure Design and Development',
          'Electrical Reticulation and Power Distribution Design',
          'Municipal and Township Electrical Reticulation Design',
          'Street and Area Lighting Design',
          'Standby Power Systems Design — Generators and UPS',
          'Lightning Protection and Earthing Design',
          'Voice and Data Infrastructure Design',
          'Access Control, Security, CCTV and Fire Alarm Systems Design',
        ],
      },
    ],
  },
  {
    no: '02',
    id: 'environmental-management',
    title: 'Environmental Resource Management',
    intro: 'Licensing, monitoring and management plans that keep water, waste, air and carbon within regulation.',
    services: [
      {
        ref: 'WM-05',
        icon: 'drop',
        img: 'service_water_management_1790347643115.jpg',
        title: 'Water Management',
        desc: 'From licence application to long-term monitoring of ground and surface water.',
        items: [
          'Water Use Licence Applications (WULA) & Licensing',
          'Water Conservation and Water Demand Management Plans (WC/WDM)',
          'Integrated Water and Waste Management Plans (IWWMP)',
          'Groundwater and Surface Water Quality Monitoring Networks',
          'Specialist Water Studies and Catchment Balances for EIAs',
        ],
      },
      {
        ref: 'WS-06',
        icon: 'waste',
        img: 'service_waste_management_1790347656645.jpg',
        title: 'Waste Management',
        desc: 'Classification, licensing and plans that turn waste liabilities into managed streams.',
        items: [
          'Waste Licensing and Classification according to NEM:WA standards',
          'Integrated Waste Management Plans (IWMP)',
          'Sewage Plant Performance Audits and Effluent Compliance',
          'Waste Minimisation, Handling, Storage and Disposal Protocols',
          'Hazardous and General Waste Compliance Audits',
        ],
      },
      {
        ref: 'AQ-07',
        icon: 'air',
        img: 'service_air_quality_1790347670760.jpg',
        title: 'Air Quality Management',
        desc: 'Dust, emissions and noise kept measurable, reportable and compliant.',
        items: [
          'Dust Fallout Monitoring Networks & ASTM D1739 Reporting',
          'Atmospheric Emission Licence (AEL) Applications and Reviews',
          'Air Quality Management Plans (AQMP)',
          'Environmental and Occupational Noise Monitoring',
          'Point-Source and Fugitive Dust Assessments',
        ],
      },
      {
        ref: 'GG-08',
        icon: 'leaf',
        img: 'service_greenhouse_gas_1790347684937.jpg',
        title: 'Greenhouse Gas Management',
        desc: 'Carbon accounting and national reporting done to the decimal.',
        items: [
          'Carbon Footprint Calculations (Scope 1, Scope 2, and Scope 3)',
          'NAEIS Mandatory Emissions Reporting',
          'Greenhouse Gas Management and Mitigation Strategies',
          'Carbon Tax Exposure Assessments and Energy Optimization',
        ],
      },
    ],
  },
  {
    no: '03',
    id: 'specialist-studies',
    title: 'Specialist Studies',
    intro: 'Hydrogeology, authorisations, audits and rehabilitation, the specialist work that unlocks and closes projects.',
    services: [
      {
        ref: 'HS-09',
        icon: 'borehole',
        img: 'service_hydrogeology_1790347696314.jpg',
        title: 'Hydrogeological Studies',
        desc: 'Reading the ground: geophysics, boreholes and aquifers characterised with precision.',
        items: [
          'Hydrogeological and Environmental Studies',
          'Borehole Development, Yield Testing and Aquifer Characterisation',
          'Groundwater Monitoring Network Design and Surveillance',
          'Geophysical Surveys (Resistivity, Gravity and GPR)',
          'Geological and Geotechnical Soil & Rock Profiling',
          'Mining Closure Dewatering Assessments',
        ],
      },
      {
        ref: 'AP-10',
        icon: 'permit',
        img: 'service_authorisations_1790347877888.jpg',
        title: 'Authorisation, Permits and Licences',
        desc: 'The full authorisation pathway, from EIA to mining right, managed end to end.',
        items: [
          'Water Use Licence Applications (WULA)',
          'Environmental Impact Assessments (Basic Assessment & Scoping/EIR)',
          'Environmental Management Programmes (EMPr)',
          'Waste Management Permits and Licences',
          'Mining Rights, Prospecting Rights, and Mining Permits Support',
          'Public Participation Processes and Stakeholder Engagement',
        ],
      },
      {
        ref: 'CA-11',
        icon: 'audit',
        img: 'service_compliance_audits_1790347896626.jpg',
        title: 'Environmental Compliance Audits and Monitoring',
        desc: 'Independent audits that find the gap before the regulator does.',
        items: [
          'Water Use Licence Compliance Audits',
          'Waste Management Licence Audits',
          'Sewage Plant Performance Audits',
          'Environmental Control Officer (ECO) Site Supervision',
          'Biomonitoring (Aquatic Macro-invertebrates & Ecological Health)',
          'Ongoing Statutory Environmental Compliance Monitoring',
        ],
      },
      {
        ref: 'ER-12',
        icon: 'rehab',
        img: 'service_rehabilitation_1790347709592.jpg',
        title: 'Environmental Rehabilitation',
        desc: 'Returning disturbed land to stable, compliant, productive condition.',
        items: [
          'Rehabilitation and Remedial Action Plans for Disturbed and Mining Land',
          'Contaminated Land Assessment, Delineation and Remediation',
          'Rehabilitation Strategy Implementation Plans (RSIP)',
          'Rehabilitation Risk Analysis and Closure Liability Costing',
          'Topsoil Management and Native Revegetation Oversight',
        ],
      },
    ],
  },
];

export const affiliationsData: Affiliation[] = [
  { logo: 'aff-ecsa.png', name: 'ECSA, Engineering Council of South Africa' },
  { logo: 'aff-saiee.png', name: 'SAIEE, South African Institute of Electrical Engineers' },
  { logo: 'aff-sacnasp.png', name: 'SACNASP, South African Council for Natural Scientific Professions' },
];

export function sanitizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export interface DedicatedService {
  slug: string;
  ref: string;
  title: string;
  category: string;
  tagline: string;
  summary: string;
  docNo: string;
  image?: string;
  objective: string;
  capabilities: { group: string; items: string[] }[];
  approach: string;
  outcomeStatement?: string;
  standards: string[];
  sectors: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  intro: string;
  qualifications: string[];
  expertise: string[];
  experienceSummary: string;
  professionalFocus: string;
}

export const dedicatedServicesData: DedicatedService[] = [
  {
    slug: 'reliability-engineering',
    ref: 'RE-01',
    title: 'Reliability Engineering',
    category: 'Engineering Services',
    tagline: 'Asset Reliability, Availability and Maintainability Methodologies',
    image: 'service_reliability_1790347183131.jpg',
    summary:
      'MarveThabi improves asset reliability, availability and maintainability through structured, data-driven reliability engineering methodologies. Our engineering programmes reduce unplanned downtime, improve maintenance effectiveness, manage operational risk and extend asset life.',
    docNo: 'MT-ENG-RE-01',
    objective:
      'To reduce unplanned downtime, optimize maintenance interventions, manage operational risk and extend asset life across the physical asset lifecycle.',
    capabilities: [
      {
        group: 'Reliability Methodologies & Analysis',
        items: [
          'Reliability-Centred Maintenance (RCM) facilitation and implementation',
          'Asset Criticality Analysis based on risk, safety, cost and production impact',
          'Failure Modes and Effects Analysis (FMEA)',
          'Maintenance Strategy and Asset Tactics Development aligned to operational objectives and business value',
          'Root Cause Failure Analysis (RCFA) and defect elimination',
        ],
      },
    ],
    approach:
      'The approach is technically sound, risk-based and aligned with operational and business performance goals. We work directly with plant engineering, maintenance teams, and operations to embed sustainable reliability practices that eliminate chronic failure modes.',
    outcomeStatement:
      'Lower maintenance costs, eliminated chronic failures, improved asset availability, and data-driven maintenance decision making.',
    standards: ['ISO 55000 / 55001', 'ISO 14224 (Taxonomy & Reliability Data)', 'SAE JA1011 (RCM)', 'ECSA Code of Practice'],
    sectors: ['Mining & Mineral Processing', 'Petrochemical & Refining', 'Heavy Manufacturing', 'Power Generation & Utilities', 'Water Infrastructure'],
  },
  {
    slug: 'asset-management',
    ref: 'AM-02',
    title: 'Asset Management',
    category: 'Engineering Services',
    tagline: 'ISO 55000 Principles, Asset Performance & Lifecycle Cost',
    image: 'service_asset_management_1790347194800.jpg',
    summary:
      "MarveThabi's Asset Management services are aligned with ISO 55000 principles and focus on asset performance, risk and lifecycle cost. The approach integrates technical, financial and risk considerations to support decision-making, governance and long-term asset value.",
    docNo: 'MT-ENG-AM-02',
    objective:
      'To integrate technical, financial and risk considerations across physical asset portfolios to support better decision-making, governance, and long-term asset value.',
    capabilities: [
      {
        group: 'Asset Management Frameworks & Lifecycle Systems',
        items: [
          'Asset Management Framework Development aligned with ISO 55000 requirements',
          'Maintenance Planning and Scheduling',
          'Asset Registers, Asset Hierarchies and Master Data validation',
          'Lifecycle Costing and Risk Analysis',
          'Asset Performance Measurement and Benchmarking',
        ],
      },
    ],
    approach:
      'Our approach connects physical asset condition with statutory accounting and strategic governance. We assist organizations to establish robust hierarchies, accurate asset registers, and structured maintenance schedules that protect capital investments and satisfy statutory audits.',
    outcomeStatement:
      'Transparent asset accountability, optimized capital and operational expenditure, and sustained regulatory governance compliance.',
    standards: ['ISO 55000 / 55001', 'GRAP 17 Asset Accounting', 'National Treasury Asset Framework', 'SANS 55000'],
    sectors: ['Municipalities & Metros', 'Government Departments & Public Entities', 'Water Boards & Utilities', 'Mining & Resources', 'Commercial Portfolios'],
  },
  {
    slug: 'electrical-construction',
    ref: 'EC-03',
    title: 'Electrical Construction',
    category: 'Engineering Services',
    tagline: 'Installation, Commissioning, Maintenance & Compliance Certification',
    image: 'service_electrical_construction_1790348230678.jpg',
    summary:
      'MarveThabi delivers professional electrical installation, commissioning, maintenance, fault-finding and statutory compliance certification for commercial, industrial and infrastructure facilities.',
    docNo: 'MT-ENG-EC-03',
    objective:
      'To provide dependable, code-compliant electrical construction, standby generation integration, cable diagnostics, and statutory compliance certification.',
    capabilities: [
      {
        group: 'Installation & Reticulation Execution',
        items: [
          'Standby Generator Installation, Commissioning, Maintenance and Repair',
          'Solar Power (PV) Installation, Commissioning, Maintenance and Repair',
          'Electrical Wiring Services for Commercial and Industrial Facilities',
          'Cable Fault Detecting, Thump Testing and Cable Diagnostics',
          'Electrical Fault Finding and Testing Services',
          'Issuance of Electrical Compliance Certificates (COC)',
        ],
      },
    ],
    approach:
      'All installation, wiring, and testing works are executed by qualified installation electricians and registered engineering technologists, adhering strictly to SANS 10142-1 (Wiring of Premises) and Occupational Health and Safety mandates.',
    outcomeStatement:
      'Turnkey electrical installations delivered safely on schedule, verified statutory safety compliance, and immediate issuance of valid Certificates of Compliance.',
    standards: ['SANS 10142-1 (Wiring of Premises)', 'OHS Act (Electrical Installation Regulations)', 'NRS 048 (Power Quality)', 'ECSA Code of Practice'],
    sectors: ['Industrial & Manufacturing Plants', 'Commercial Facilities & Warehouses', 'Municipal Buildings & Depots', 'Residential Developments', 'Mining Surface Infrastructure'],
  },
  {
    slug: 'electrical-and-electronic-engineering',
    ref: 'EE-04',
    title: 'Electrical & Electronic Engineering',
    category: 'Engineering Services',
    tagline: 'Power Infrastructure Design, Reticulation & Technical Assurance',
    image: 'service_substation_engineering_1790348244291.jpg',
    summary:
      'Professional electrical engineering services for industrial and commercial facilities. We deliver robust power distribution designs, municipal reticulation schemes, backup power systems, and technical compliance audits.',
    docNo: 'MT-ENG-EE-04',
    objective:
      'To provide dependable, standards-compliant electrical infrastructure engineering that guarantees operational continuity, personnel safety, and regulatory approval.',
    capabilities: [
      {
        group: 'Infrastructure & Reticulation Design',
        items: [
          'Electrical Infrastructure Design and Development',
          'Electrical Reticulation and Power Distribution Design',
          'Electrical Transmission and Distribution Design Support',
          'Municipal and Township Electrical Reticulation Design',
          'Street and Area Lighting Design',
        ],
      },
      {
        group: 'Standby Power, Safety & Electronic Systems',
        items: [
          'Standby Power Systems Design — Generators and UPS',
          'Lightning Protection and Earthing Design',
          'Voice and Data Infrastructure Design',
          'Access Control, Security and CCTV Systems Design',
          'Fire Detection and Alarm Systems Design',
        ],
      },
      {
        group: 'Compliance & Technical Assurance',
        items: [
          'Electrical Compliance and Technical Audits',
          'Project Engineering Support and Construction Monitoring',
        ],
      },
    ],
    approach:
      'Every project is directed by registered engineering technologists to ensure compliance with SANS 10142, utility grid connection codes, and statutory safety mandates. Designs are developed with full AutoCAD/CAD single-line diagrams, protection settings, and bill of quantities.',
    outcomeStatement:
      'Resilient power distribution networks engineered for long-term load growth, verified safety margins, and turnkey compliance documentation.',
    standards: ['SANS 10142-1 & 2', 'NRS 048 Power Quality', 'SANS 10313 Lightning Protection', 'ECSA Standards'],
    sectors: ['Mining & Minerals', 'Industrial & Manufacturing', 'Municipalities & Metros', 'Commercial Facilities', 'Public Infrastructure'],
  },
  {
    slug: 'condition-monitoring',
    ref: 'CM-01',
    title: 'Condition Monitoring',
    category: 'Engineering Services',
    tagline: 'Early Fault Detection, Non-Destructive Testing & Asset Diagnostics',
    image: 'service_condition_monitoring_1790347218708.jpg',
    summary:
      'Advanced condition monitoring supporting predictive and proactive maintenance strategies. The purpose is early fault detection, reduced unplanned downtime and improved asset reliability.',
    docNo: 'MT-ENG-CM-01',
    objective:
      'Early fault detection, reduced unplanned downtime and improved asset reliability through precision testing and diagnostic analytics.',
    capabilities: [
      {
        group: 'Diagnostic & Predictive Technologies',
        items: [
          'Vibration Analysis and rotating equipment diagnostics',
          'Oil Sampling and Oil Condition Analysis',
          'Infrared Thermography for electrical and mechanical plant',
          'Motor Circuit Analysis (MCA)',
          'Transformer Condition Assessments and dissolved gas analysis',
        ],
      },
      {
        group: 'Non-Destructive Testing (NDT) & Structural Inspection',
        items: [
          'Ultrasonic Testing (UT) and thickness measurement',
          'Visual Testing (VT)',
          'Liquid Penetrant Testing (PT)',
          'Radiographic Testing (RT)',
          'Eddy Current Testing (ECT)',
          'Weld Inspection and Evaluation',
        ],
      },
      {
        group: 'Asset Integrity & Condition Reporting',
        items: [
          'Corrosion Monitoring and degradation tracking',
          'Equipment Condition Assessments',
          'Diagnostic Reporting and Maintenance Recommendations',
          'Integrity and Reliability Assessments',
        ],
      },
    ],
    approach:
      'Our certified analysts evaluate mechanical trains, high-voltage switchgear, and structural components under actual operating conditions. Findings are synthesized into concise diagnostic reports with prioritized maintenance recommendations.',
    outcomeStatement:
      'Zero catastrophic machine breakdowns, maintenance scheduled only when condition warrants, and extended component operating lifecycle.',
    standards: ['ISO 18436 (Condition Monitoring & Diagnostics)', 'ISO 10816 (Mechanical Vibration)', 'ASNT / PCN Standards', 'SANS Standards'],
    sectors: ['Mining & Beneficiation Plants', 'Petrochemical & Gas', 'Power Utilities & Substations', 'Water Pumping Stations', 'Processing Plants'],
  },
  {
    slug: 'water-management',
    ref: 'WM-05',
    title: 'Water Management',
    category: 'Environmental Resource Management',
    tagline: 'Water Use Licensing, Balances & Catchment Quality Protection',
    image: 'service_water_management_1790347643115.jpg',
    summary:
      'Integrated water resource management services supporting statutory water use licensing, conservation and demand management planning, and comprehensive surface and groundwater monitoring networks.',
    docNo: 'MT-ENV-WM-05',
    objective:
      'To secure statutory water use authorizations, safeguard water security, and maintain strict compliance with catchment quality standards across industrial and municipal operations.',
    capabilities: [
      {
        group: 'Water Resource Licensing & Conservation Planning',
        items: [
          'Water Use Licence Applications (WULA) and Licence Amendments',
          'Water Conservation and Water Demand Management Plans (WC/WDM)',
          'Integrated Water and Waste Management Plans (IWWMP)',
          'Groundwater and Surface Water Quality Monitoring Networks',
          'Specialist Hydrological Studies and Catchment Water Balances for EIAs',
        ],
      },
    ],
    approach:
      'Led by SACNASP-registered scientists, our water management programmes combine hydrochemical sampling, catchment water balancing, and technical liaison with the Department of Water and Sanitation (DWS) under the National Water Act.',
    outcomeStatement:
      'Secured Water Use Licences, mitigated pollution liability, optimized industrial water reuse, and sustained regulatory standing.',
    standards: ['National Water Act (Act 36 of 1998)', 'DWS Best Practice Guidelines', 'SANS 241 (Drinking Water Quality)', 'SACNASP Code of Conduct'],
    sectors: ['Mining & Mineral Extraction', 'Municipal Water Utilities', 'Industrial & Chemical Processing', 'Agricultural Schemes', 'Infrastructure Development'],
  },
  {
    slug: 'waste-management',
    ref: 'WS-06',
    title: 'Waste Management',
    category: 'Environmental Resource Management',
    tagline: 'Waste Classification, Licensing & Sewage Plant Performance Audits',
    image: 'service_waste_management_1790347656645.jpg',
    summary:
      'MarveThabi provides waste classification, waste management licensing, integrated waste planning, and sewage plant performance audits for industrial and municipal operations.',
    docNo: 'MT-ENV-WS-06',
    objective:
      'To ensure statutory compliance in waste handling, eliminate pollution risks, optimize waste classification, and ensure efficient wastewater treatment operations.',
    capabilities: [
      {
        group: 'Waste Licensing, Audits & Operational Plans',
        items: [
          'Waste Licensing and Classification according to NEM:WA standards',
          'Integrated Waste Management Plans (IWMP)',
          'Sewage Plant Performance Audits and effluent compliance',
          'Waste Minimisation, Handling, Storage and Disposal Protocols',
          'Hazardous and General Waste Storage Compliance Audits',
        ],
      },
    ],
    approach:
      'We conduct cradle-to-grave waste stream characterisation, hazard assessments (SANS 10234), and wastewater plant process reviews. Solutions focus on legal compliance, waste hierarchy principles, and risk mitigation.',
    outcomeStatement:
      'Legally compliant waste storage and disposal, optimized recycling streams, avoided regulatory fines, and verified wastewater effluent standards.',
    standards: ['National Environmental Management: Waste Act (NEM:WA 59/2008)', 'SANS 10234 (GHS Classification)', 'National Waste Management Strategy', 'DWS Discharge Standards'],
    sectors: ['Manufacturing & Petrochemical Plants', 'Municipalities & Water Service Authorities', 'Mining Operations & Tailings Facilities', 'Commercial & Industrial Parks', 'Waste Treatment Facilities'],
  },
  {
    slug: 'air-quality-management',
    ref: 'AQ-07',
    title: 'Air Quality Management',
    category: 'Environmental Resource Management',
    tagline: 'Dust Fallout Monitoring, Atmospheric Licensing & Noise Assessment',
    image: 'service_air_quality_1790347670760.jpg',
    summary:
      'Comprehensive ambient air quality monitoring, atmospheric emission licensing, and environmental noise assessments keeping industrial operations measurable and compliant.',
    docNo: 'MT-ENV-AQ-07',
    objective:
      'To quantify atmospheric emissions, maintain statutory Atmospheric Emission Licences (AEL), and mitigate ambient dust and noise impacts on surrounding communities.',
    capabilities: [
      {
        group: 'Monitoring Networks & Regulatory Licensing',
        items: [
          'Dust Fallout Monitoring Networks and ASTM D1739 Reporting',
          'Atmospheric Emission Licence (AEL) Applications and Reviews',
          'Air Quality Management Plans (AQMP) and Dust Management Plans',
          'Environmental and Occupational Noise Monitoring Surveys',
          'Point-Source and Fugitive Dust Assessments',
        ],
      },
    ],
    approach:
      'We deploy calibrated dust fallout bucket networks, acoustic monitors, and sampling protocols aligned with national norms and standards. Data is analyzed in accredited laboratories and synthesized into audit-ready monthly and annual compliance reports.',
    outcomeStatement:
      'Defensible air quality records, maintained Atmospheric Emission Licences, minimized nuisance complaints, and full regulatory transparency.',
    standards: ['National Environmental Management: Air Quality Act (NEM:AQA 39/2004)', 'National Dust Control Regulations (NDCR)', 'SANS 10103 (Environmental Noise)', 'ASTM D1739 Standard'],
    sectors: ['Opencast Mining & Quarries', 'Heavy Manufacturing & Smelters', 'Bulk Handling & Logistics Facilities', 'Power Generation & Petrochemical', 'Municipal & Urban Interfaces'],
  },
  {
    slug: 'greenhouse-gas-management',
    ref: 'GG-08',
    title: 'Greenhouse Gas Management',
    category: 'Environmental Resource Management',
    tagline: 'Carbon Footprint Accounting & Mandatory Emissions Reporting',
    image: 'service_greenhouse_gas_1790347684937.jpg',
    summary:
      "MarveThabi assists organisations to navigate South Africa's climate change legislation through precise carbon footprint calculations, NAEIS reporting, and statutory greenhouse gas management.",
    docNo: 'MT-ENV-GG-08',
    objective:
      'To deliver accurate, audit-ready carbon emissions accounting, satisfy national reporting thresholds, and optimize carbon tax exposure.',
    capabilities: [
      {
        group: 'Carbon Accounting & National Statutory Reporting',
        items: [
          'Carbon Footprint Calculations (Scope 1 Direct, Scope 2 Electricity, and Scope 3 Value Chain)',
          'National Atmospheric Emission Information System (NAEIS) Reporting',
          'Mandatory National Greenhouse Gas (GHG) Emissions Reporting',
          'Carbon Tax Liability Calculations and Exposure Assessment',
          'Greenhouse Gas Mitigation Strategies and Decarbonization Pathways',
        ],
      },
    ],
    approach:
      'Our carbon specialists apply IPCC Tier methodology and the GHG Protocol Corporate Standard to quantify emissions across facility operations, ensuring full alignment with the Climate Change Act and National GHG Reporting Regulations.',
    outcomeStatement:
      'Defensible, audit-ready carbon inventories, timely NAEIS statutory submissions, and strategic clarity on carbon tax liabilities.',
    standards: ['Climate Change Act', 'National GHG Reporting Regulations', 'GHG Protocol Corporate Standard', 'IPCC Guidelines for National GHG Inventories'],
    sectors: ['Mining & Resource Extraction', 'Energy Generation & Refining', 'Heavy Manufacturing & Foundries', 'Bulk Transport & Logistics', 'Commercial Property Portfolios'],
  },
  {
    slug: 'hydrogeological-studies',
    ref: 'HS-09',
    title: 'Hydrogeological Studies',
    category: 'Specialist Studies',
    tagline: 'Geophysics, Borehole Development & Aquifer Yield Characterisation',
    image: 'service_hydrogeology_1790347696314.jpg',
    summary:
      'Scientific groundwater investigation, geophysical subsurface imaging, borehole development and aquifer yield testing directed by SACNASP-registered geohydrologists.',
    docNo: 'MT-SCI-HS-09',
    objective:
      'To accurately map groundwater resources, determine sustainable borehole abstraction yields, and assess subsurface contaminant migration risks.',
    capabilities: [
      {
        group: 'Groundwater Investigation & Subsurface Geophysics',
        items: [
          'Hydrogeological and Environmental Studies',
          'Borehole Development, Yield Testing and Aquifer Characterisation',
          'Groundwater Monitoring Network Design and Surveillance',
          'Geophysical Surveys (Resistivity, Gravity and Ground Penetrating Radar / GPR)',
          'Geological and Geotechnical Soil & Rock Core Logging',
          'Mining Closure Dewatering Assessments',
        ],
      },
    ],
    approach:
      'We integrate surface geophysics, calibrated pumping test data, and hydrochemical fingerprinting to model aquifer behavior according to SANS 10299 standards. Every report provides defensible abstraction recommendations.',
    outcomeStatement:
      'Sustainable water supply security, reliable groundwater yield determinations, accurate plume migration modeling, and sound engineering foundation parameters.',
    standards: ['SANS 10299 (Groundwater Resource Development)', 'National Water Act (NWA 36/1998)', 'SACNASP Code of Conduct'],
    sectors: ['Mining Dewatering & Operations', 'Municipal Groundwater Reticulation Schemes', 'Agricultural Irrigators', 'Industrial Water Sourcing', 'Linear Infrastructure Projects'],
  },
  {
    slug: 'authorisation-permits-and-licences',
    ref: 'AP-10',
    title: 'Authorisation, Permits and Licences',
    category: 'Specialist Studies',
    tagline: 'EIA, Water Licences, Waste Permits & Mining Rights Approvals',
    image: 'service_authorisations_1790347877888.jpg',
    summary:
      'MarveThabi manages the entire statutory environmental approval process, from screening and environmental impact assessments to mining permits, water licences, and public participation.',
    docNo: 'MT-ENV-AP-10',
    objective:
      'To navigate complex statutory frameworks, coordinate specialist disciplines, and secure legally robust environmental authorisations with zero procedural delays.',
    capabilities: [
      {
        group: 'Statutory Approvals & Environmental Authorisations',
        items: [
          'Water Use Licence Applications (WULA)',
          'Environmental Impact Assessments (Basic Assessment & Scoping/EIR)',
          'Environmental Management Programmes (EMPr)',
          'Waste Management Licences and Atmospheric Emission Licences',
          'Mining Rights, Prospecting Rights, and Mining Permits Support',
          'Public Participation Processes and Stakeholder Engagement',
        ],
      },
    ],
    approach:
      'We act as the independent Environmental Assessment Practitioner (EAP), coordinating specialist baseline studies, liaising directly with competent authorities (DFFE, DMRE, DWS), and managing all gazetted public participation requirements.',
    outcomeStatement:
      'Legally defensible authorizations secured within statutory timeframes, reduced regulatory risks, and strong stakeholder alignment.',
    standards: ['NEMA (Act 107 of 1998) & EIA Regulations', 'MPRDA (Act 28 of 2002)', 'National Water Act (Act 36 of 1998)', 'EAPASA Guidelines'],
    sectors: ['Mining & Exploration Companies', 'Industrial Developers & Energy Projects', 'Municipalities & Public Infrastructure', 'Commercial Land Developers', 'Road & Pipeline Authorities'],
  },
  {
    slug: 'compliance-audits-and-monitoring',
    ref: 'CA-11',
    title: 'Environmental Compliance Audits & Monitoring',
    category: 'Specialist Studies',
    tagline: 'Independent Statutory Audits, ECO Oversight & Biomonitoring',
    image: 'service_compliance_audits_1790347896626.jpg',
    summary:
      'Independent environmental auditing, on-site Environmental Control Officer (ECO) supervision, and ecological biomonitoring that identify compliance gaps before regulatory enforcement.',
    docNo: 'MT-ENV-CA-11',
    objective:
      'To verify continuous adherence to statutory licence conditions, authorisations, and Environmental Management Programmes across construction and operational phases.',
    capabilities: [
      {
        group: 'Audit & Compliance Monitoring Programmes',
        items: [
          'Water Use Licence Compliance Audits and Gap Analyses',
          'Environmental Authorisation & EMPr Performance Audits',
          'Waste Management Licence Audits',
          'Sewage Plant Performance Audits and effluent monitoring',
          'Environmental Control Officer (ECO) Site Supervision and Construction Oversight',
          'Biomonitoring (Aquatic Macro-invertebrates & Ecological Health)',
          'Ongoing Statutory Environmental Compliance Monitoring',
        ],
      },
    ],
    approach:
      'Our certified environmental auditors conduct systematic physical site inspections, review documentation against statutory conditions, log objective findings, and deliver prioritized corrective action schedules.',
    outcomeStatement:
      'Proactive compliance gap closure, avoidance of pre-directive notices and statutory penalties, maintained operating licences, and documented corporate stewardship.',
    standards: ['ISO 19011 (Auditing Management Systems)', 'NEMA Section 34 Compliance Regulations', 'National Water Act Standards', 'SASS5 Aquatic Protocols'],
    sectors: ['Construction & Civil Contractors', 'Operational Mines & Processing Facilities', 'Municipal Water & Waste Facilities', 'Industrial Manufacturing Operations', 'Energy & Linear Infrastructure'],
  },
  {
    slug: 'environmental-rehabilitation',
    ref: 'ER-12',
    title: 'Environmental Rehabilitation',
    category: 'Specialist Studies',
    tagline: 'Remediation, Land Rehabilitation & Sustainable Closure Planning',
    image: 'service_rehabilitation_1790347709592.jpg',
    summary:
      'Practical environmental rehabilitation, contaminated land remediation, and mine closure planning that restore disturbed terrain to compliant, stable, and sustainable condition.',
    docNo: 'MT-ENV-ER-12',
    objective:
      'To remediate environmental contamination, satisfy statutory financial provisioning requirements, and engineer sustainable closure landforms.',
    capabilities: [
      {
        group: 'Rehabilitation & Closure Execution',
        items: [
          'Rehabilitation and Remedial Action Plans for Disturbed and Mining Land',
          'Contaminated Land Assessment, Delineation and Remediation',
          'Rehabilitation Strategy Implementation Plans (RSIP)',
          'Rehabilitation Risk Analysis and Closure Liability Costing',
          'Topsoil Management and Native Revegetation Oversight',
        ],
      },
    ],
    approach:
      'We combine geotechnical slope stability, soil pedology, and ecological restoration principles to design and implement practical rehabilitation programmes that withstand erosion and meet DMRE closure criteria.',
    outcomeStatement:
      'Reduced statutory financial closure liability, successful site remediation, stabilized landscapes, and milestone progress toward final closure certificates.',
    standards: ['NEMA Financial Provisioning Regulations', 'NEM:WA Contaminated Land Provisions (Part 8)', 'DMRE Mine Closure Guidelines'],
    sectors: ['Mining & Quarrying Operations', 'Petrochemical & Fuel Storage Sites', 'Heavy Chemical & Industrial Facilities', 'Municipal Landfills', 'Infrastructure Corridors'],
  },
  {
    slug: 'geo-environmental',
    ref: 'GE-04',
    title: 'Environmental Services',
    category: 'Environmental & Natural Sciences',
    tagline: 'Integrated Environmental Management, Studies & Statutory Compliance',
    image: 'service_environmental_1790347236174.jpg',
    summary:
      'MarveThabi provides integrated environmental management and specialist advisory services supporting regulatory compliance, sustainable resource use and responsible project development across mining, industrial, utilities and infrastructure sectors.',
    docNo: 'MT-ENV-GE-04',
    objective:
      'To deliver credible scientific and regulatory support that secures statutory environmental authorisations, protects natural resources, and manages long-term environmental liability.',
    capabilities: [
      {
        group: 'Environmental Resource Management',
        items: [
          'Water Use Licensing, Catchment Water Balances and Monitoring',
          'Waste Classification, Licensing and Integrated Waste Plans',
          'Air Quality Monitoring, Dust Fallout Networks and AEL Support',
          'Greenhouse Gas Accounting and Mandatory NAEIS Reporting',
        ],
      },
      {
        group: 'Specialist Studies & Approvals',
        items: [
          'Hydrogeological Studies, Borehole Development and Geophysics',
          'Environmental Impact Assessments (EIA / BA / Scoping)',
          'Environmental Compliance Audits and ECO Construction Oversight',
          'Environmental Rehabilitation, Contaminated Land Remediation and Closure Costing',
        ],
      },
    ],
    approach:
      'Directed by registered professional natural scientists (SACNASP), our multidisciplinary practice bridges empirical earth sciences with South Africa\'s statutory environmental regulatory frameworks.',
    outcomeStatement:
      'Full statutory environmental compliance, defensible authorizations, minimized closure liabilities, and sustainable resource management.',
    standards: ['National Water Act (NWA 36/1998)', 'NEMA (Act 107/1998)', 'NEM:WA & NEM:AQA', 'SACNASP Code of Conduct'],
    sectors: ['Mining & Minerals', 'Municipalities & Water Utilities', 'Industrial & Manufacturing', 'Energy & Power Infrastructure', 'Commercial & Civil Development'],
  },
];

export const teamData: TeamMember[] = [
  {
    id: 'marvelous-ngoatle',
    name: 'Marvelous Ngoatle',
    position: 'Director',
    image: 'marvelous.jpg',
    intro:
      'Founder and Director of MarveThabi Consulting Engineers with over 14 years of experience in Reliability Engineering, Asset Management, Condition Monitoring and Electrical Engineering. Experience includes mining, petrochemical, water treatment and industrial environments, with technical leadership in maintenance optimisation, reliability improvement and engineering solutions.',
    qualifications: [
      'B-Tech Degree in Electrical Engineering',
      'Professional Engineering Technologist — Engineering Council of South Africa (ECSA)',
      'Qualified Electrician',
      'Electrical Trade Test and Wireman\'s Licence',
      'Certified Thermographer',
      'Certified Motor Circuit Analyst',
    ],
    expertise: [
      'Reliability Engineering',
      'Asset Management',
      'Condition Monitoring',
      'Predictive Maintenance',
      'Maintenance Strategy Development',
      'Electrical Engineering & Assessments',
      'Backup Power Solutions',
      'Vibration Analysis',
      'Thermography Analysis',
      'Transformer Oil Sampling & Analysis',
    ],
    experienceSummary:
      'His project experience includes vibration analysis, thermography, transformer oil sampling and analysis, maintenance strategy development, asset management systems, electrical assessments, backup power solutions and condition monitoring programmes.',
    professionalFocus:
      'Improving equipment reliability, reducing downtime, optimising maintenance costs and improving operational performance.',
  },
  {
    id: 'thabang-ngoatle',
    name: 'Thabang Ngoatle',
    position: 'Director',
    image: 'thabang.jpg',
    intro:
      'Founder and Director with over 12 years of professional experience in Environmental Management, Occupational Health and Safety, and Environmental Compliance. Experience includes environmental consulting, project coordination, compliance monitoring and sustainable environmental management across various industries.',
    qualifications: [
      'Master of Science (MSc) in Environmental Management',
      'Professional Scientist — South African Council for Natural Scientific Professions (SACNASP)',
      'SAMTRAC qualification',
      'Currently pursuing a PhD in Geography through the University of South Africa',
    ],
    expertise: [
      'Environmental Management',
      'Environmental Compliance',
      'Environmental Impact Assessments',
      'Environmental Audits',
      'Biomonitoring Projects',
      'Health and Safety Management',
      'Sustainability Initiatives',
      'Risk Management Systems',
      'Environmental Reporting',
      'Project Coordination',
    ],
    experienceSummary:
      'Her experience includes environmental impact assessments, environmental compliance audits, biomonitoring projects, environmental reporting, health and safety management and sustainability initiatives.',
    professionalFocus:
      'Sustainable development, environmental stewardship and safe working environments.',
  },
];

export function getDedicatedService(slug: string): DedicatedService | undefined {
  const normalized = slug.toLowerCase().trim().replace(/^\/services\//, '').replace(/\/$/, '');

  // Direct match
  const direct = dedicatedServicesData.find((s) => s.slug === normalized);
  if (direct) return direct;

  // Normalized aliases
  if (normalized === 'electrical-engineering' || normalized === 'ee-03' || normalized === 'ee-04') {
    return dedicatedServicesData.find((s) => s.slug === 'electrical-and-electronic-engineering');
  }
  if (normalized === 'electrical-construction' || normalized === 'ec-03') {
    return dedicatedServicesData.find((s) => s.slug === 'electrical-construction');
  }
  if (normalized === 'condition-monitoring' || normalized === 'cm-01') {
    return dedicatedServicesData.find((s) => s.slug === 'condition-monitoring');
  }
  if (normalized === 'water-management' || normalized === 'wm-05' || normalized === 'water') {
    return dedicatedServicesData.find((s) => s.slug === 'water-management');
  }
  if (normalized === 'waste-management' || normalized === 'ws-06' || normalized === 'waste') {
    return dedicatedServicesData.find((s) => s.slug === 'waste-management');
  }
  if (normalized === 'air-quality-management' || normalized === 'air-quality' || normalized === 'aq-07') {
    return dedicatedServicesData.find((s) => s.slug === 'air-quality-management');
  }
  if (normalized === 'greenhouse-gas-management' || normalized === 'greenhouse-gas' || normalized === 'gg-08') {
    return dedicatedServicesData.find((s) => s.slug === 'greenhouse-gas-management');
  }
  if (normalized === 'hydrogeological-studies' || normalized === 'hydrogeology' || normalized === 'hs-09') {
    return dedicatedServicesData.find((s) => s.slug === 'hydrogeological-studies');
  }
  if (
    normalized === 'authorisation-permits-and-licences' ||
    normalized === 'authorisation-permits-licences' ||
    normalized === 'permits-and-licences' ||
    normalized === 'ap-10'
  ) {
    return dedicatedServicesData.find((s) => s.slug === 'authorisation-permits-and-licences');
  }
  if (
    normalized === 'compliance-audits-and-monitoring' ||
    normalized === 'environmental-compliance-audits' ||
    normalized === 'compliance-audits' ||
    normalized === 'ca-11'
  ) {
    return dedicatedServicesData.find((s) => s.slug === 'compliance-audits-and-monitoring');
  }
  if (
    normalized === 'environmental-rehabilitation' ||
    normalized === 'rehabilitation' ||
    normalized === 'er-12'
  ) {
    return dedicatedServicesData.find((s) => s.slug === 'environmental-rehabilitation');
  }
  if (normalized.includes('reliab') || normalized === 're-01') {
    return dedicatedServicesData.find((s) => s.slug === 'reliability-engineering');
  }
  if (normalized.includes('asset') || normalized === 'am-02') {
    return dedicatedServicesData.find((s) => s.slug === 'asset-management');
  }
  if (normalized.includes('geo') || normalized.includes('environ') || normalized === 'ge-04') {
    return dedicatedServicesData.find((s) => s.slug === 'geo-environmental');
  }

  return undefined;
}

export function getServiceSlugForRef(ref: string): string {
  const upper = ref.toUpperCase().trim();
  switch (upper) {
    case 'RE-01':
      return 'reliability-engineering';
    case 'AM-02':
      return 'asset-management';
    case 'EC-03':
      return 'electrical-construction';
    case 'EE-04':
    case 'EE-03':
      return 'electrical-and-electronic-engineering';
    case 'CM-01':
      return 'condition-monitoring';
    case 'WM-05':
      return 'water-management';
    case 'WS-06':
      return 'waste-management';
    case 'AQ-07':
      return 'air-quality-management';
    case 'GG-08':
      return 'greenhouse-gas-management';
    case 'HS-09':
      return 'hydrogeological-studies';
    case 'AP-10':
      return 'authorisation-permits-and-licences';
    case 'CA-11':
      return 'compliance-audits-and-monitoring';
    case 'ER-12':
      return 'environmental-rehabilitation';
    case 'GE-04':
      return 'geo-environmental';
    default:
      if (upper.startsWith('RE')) return 'reliability-engineering';
      if (upper.startsWith('AM')) return 'asset-management';
      if (upper.startsWith('EC')) return 'electrical-construction';
      if (upper.startsWith('EE')) return 'electrical-and-electronic-engineering';
      if (upper.startsWith('CM')) return 'condition-monitoring';
      if (upper.startsWith('WM')) return 'water-management';
      if (upper.startsWith('WS')) return 'waste-management';
      if (upper.startsWith('AQ')) return 'air-quality-management';
      if (upper.startsWith('GG')) return 'greenhouse-gas-management';
      if (upper.startsWith('HS')) return 'hydrogeological-studies';
      if (upper.startsWith('AP')) return 'authorisation-permits-and-licences';
      if (upper.startsWith('CA')) return 'compliance-audits-and-monitoring';
      if (upper.startsWith('ER')) return 'environmental-rehabilitation';
      return 'geo-environmental';
  }
}

/* =========================================================================
   MARVETHABI TEAM — DETAILED DIRECTORS & LEADERSHIP
   ========================================================================= */

export const leadershipTeamData: LeaderDetail[] = [
  {
    name: 'Marvelous Ngoatle',
    role: 'Founder & Director',
    image: 'marvelous.jpg',
    primaryRegistration: 'Professional Engineering Technologist — ECSA',
    summary:
      'Marvelous Ngoatle is the Founder and Director of MarveThabi Consulting Engineers, with over 14 years of experience in Reliability Engineering, Asset Management, Condition Monitoring, and Electrical Engineering. He has extensive practical experience across mining, petrochemical, water treatment, and industrial environments, providing technical leadership in maintenance optimization, reliability improvement, and engineering solutions.',
    qualifications: [
      'B-Tech Degree in Electrical Engineering',
      'Professional Engineering Technologist — Engineering Council of South Africa (ECSA)',
      'Qualified Electrician',
      'Electrical Trade Test & Wireman\'s Licence',
      'Certified Thermographer',
      'Certified Motor Circuit Analyst',
    ],
    areasOfExpertise: [
      'Reliability Engineering',
      'Asset Management (ISO 55000)',
      'Condition Monitoring & Predictive Maintenance',
      'Maintenance Strategy Development',
      'Electrical Engineering & Statutory Assessments',
      'Backup Power Solutions',
      'Vibration Analysis',
      'Thermography Analysis',
      'Transformer Oil Sampling & DGA Analysis',
    ],
    projectExperience: [
      'Vibration analysis programmes for critical mining and plant rotating machinery',
      'Thermography surveys and baseline thermal profiling of HV/MV/LV substations',
      'Transformer oil sampling, moisture and dissolved gas analysis (DGA)',
      'Maintenance strategy development and asset tactics modeling (FMECA / RCM)',
      'Asset management systems, register verifications and ISO 55000 roadmaps',
      'Statutory electrical assessments and SANS 10142 compliance certification',
      'Turnkey backup power solutions (diesel generators, ATS & solar PV integration)',
      'Comprehensive condition monitoring programmes across mining and heavy industrial sectors',
    ],
    professionalFocus: [
      'Help organisations improve equipment reliability',
      'Reduce unplanned downtime across key production circuits',
      'Optimise maintenance lifecycle costs',
      'Enhance overall operational and plant performance',
      'Deliver innovative engineering solutions and best maintenance practices',
    ],
    outcomes: [
      'Improve Reliability',
      'Reduce Downtime',
      'Optimize Maintenance Costs',
      'Enhance Performance',
      'Sustainable Solutions',
    ],
    sectors: ['Mining & Beneficiation', 'Petrochemical & Gas', 'Water Treatment Works', 'Heavy Industrial Manufacturing'],
  },
  {
    name: 'Thabang Ngoatle',
    role: 'Founder & Director',
    image: 'thabang.jpg',
    primaryRegistration: 'Professional Scientist — SACNASP',
    summary:
      'Thabang Ngoatle is the Founder and Director of MarveThabi Consulting Engineers, with over 12 years of professional experience in Environmental Management, Occupational Health and Safety, and Environmental Compliance. She has extensive experience in environmental consulting, project coordination, compliance monitoring, and the implementation of sustainable environmental management practices across various industries.',
    qualifications: [
      'Master of Science (MSc) in Environmental Management',
      'Professional Scientist — South African Council for Natural Scientific Professions (SACNASP)',
      'SAMTRAC Qualification (Occupational Health, Safety & Risk Systems)',
      'Currently pursuing PhD in Geography — University of South Africa (UNISA)',
    ],
    areasOfExpertise: [
      'Environmental Management & Governance',
      'Environmental Compliance & Legal Register Auditing',
      'Environmental Impact Assessments (EIA: Scoping & EIR)',
      'Environmental Audits (WULA, Waste Licence, EMPr)',
      'Aquatic Biomonitoring Projects & Wetland Health',
      'Health and Safety Management Systems',
      'Sustainability Initiatives & ESG Integration',
      'Risk Management Systems & SAMTRAC Protocols',
      'Environmental Reporting & Regulatory Submissions',
      'Multi-Disciplinary Project Coordination',
    ],
    projectExperience: [
      'Environmental Impact Assessments for bulk industrial and infrastructure projects',
      'Statutory environmental compliance audits and WULA compliance gap reviews',
      'Aquatic macro-invertebrate biomonitoring (SASS5) and water quality surveillance',
      'Statutory environmental reporting and audit-ready records for DFFE and DWS',
      'Health, safety and risk management system implementation aligned with SAMTRAC',
      'Mine closure liability costing and contaminated land rehabilitation programs',
    ],
    professionalFocus: [
      'Sustainable development and intergenerational environmental stewardship',
      'Safe, compliant and injury-free working environments',
      'Ensuring statutory environmental compliance before regulatory intervention',
      'Strategic leadership in delivering professional, compliant, and sustainable engineering solutions across South Africa and beyond',
    ],
    outcomes: [
      'Environmental Stewardship',
      'Health & Safety',
      'Sustainable Solutions',
      'Compliance & Accountability',
      'Professional Excellence',
    ],
    sectors: ['Mining & Resource Extraction', 'Government Infrastructure', 'Municipal Utilities', 'Commercial Developments'],
  },
];

/* =========================================================================
   INDUSTRIES WE SERVE — DEDICATED SECTOR DETAILS & SERVICE FIT
   ========================================================================= */

export const industryDetailsData: Record<string, IndustryDetail> = {
  government: {
    slug: 'government',
    name: 'Government & Public Entities',
    tagline: 'Public Sector Infrastructure Assurance, GRAP 17 Asset Registers & Statutory Compliance',
    docNo: 'MT-SEC-GOV-01',
    path: 'M8 40V20l16-12 16 12v20H28v-12h-8v12H8z',
    summary:
      'MarveThabi Consulting Engineers supports national and provincial government departments, state-owned enterprises (SOEs), and public entities with certified engineering oversight, unbundled infrastructure asset registers, backup power assurance, and environmental statutory compliance.',
    fitDescription:
      'Where public sector spending demands clean audits, strict adherence to the Public Finance Management Act (PFMA), and defect-free infrastructure delivery, MarveThabi provides registered ECSA engineers and SACNASP scientists who take direct personal accountability for statutory sign-offs.',
    serviceAlignments: [
      {
        category: 'Engineering Services',
        services: [
          {
            name: 'Asset Management Services',
            slug: 'asset-management',
            ref: 'AM-02',
            description:
              'GRAP 17 and PFMA compliant asset registers, componentised infrastructure unbundling, condition scoring, residual life estimation, and barcoded physical asset verifications for government buildings and facilities.',
          },
          {
            name: 'Electrical Construction & Compliance',
            slug: 'electrical-construction',
            ref: 'EC-03',
            description:
              'Electrical installation, MV/LV distribution board upgrades, and Certificate of Compliance (COC) statutory audits for public hospitals, schools, police stations, and departmental headquarters.',
          },
          {
            name: 'Reliability & Backup Power Engineering',
            slug: 'reliability-engineering',
            ref: 'RE-01',
            description:
              'Standby generator sizing, ATS emergency switchgear testing, and condition monitoring for critical public infrastructure where power failure is unacceptable.',
          },
        ],
      },
      {
        category: 'Environmental Resource Management',
        services: [
          {
            name: 'Water Management & Licensing',
            slug: 'water-management',
            ref: 'WM-05',
            description:
              'Water Conservation and Water Demand Management Plans (WC/WDM) and Water Use Licences (WULA) for state-managed water assets and regional schemes.',
          },
          {
            name: 'Waste & Effluent Management',
            slug: 'waste-management',
            ref: 'WS-06',
            description:
              'Waste classification, hazardous storage audits, and institutional waste minimisation strategies aligned with NEM:WA regulations.',
          },
          {
            name: 'Greenhouse Gas & Carbon Reporting',
            slug: 'greenhouse-gas-management',
            ref: 'GG-08',
            description:
              'Mandatory NAEIS emission reporting and public sector carbon footprint inventories supporting South Africa’s Climate Change Act commitments.',
          },
        ],
      },
      {
        category: 'Specialist Studies',
        services: [
          {
            name: 'Environmental Compliance Audits & ECO',
            slug: 'compliance-audits-and-monitoring',
            ref: 'CA-11',
            description:
              'Independent Environmental Control Officer (ECO) construction supervision and statutory Section 34 compliance audits on public works and infrastructure projects.',
          },
          {
            name: 'Authorisations, Permits & Licences',
            slug: 'authorisation-permits-and-licences',
            ref: 'AP-10',
            description:
              'End-to-end Environmental Impact Assessments (Basic Assessments & Scoping/EIR) for roads, hospitals, bulk infrastructure, and public facilities.',
          },
          {
            name: 'Hydrogeological Studies',
            slug: 'hydrogeological-studies',
            ref: 'HS-09',
            description:
              'Groundwater resource investigations and drought relief borehole development for rural clinics, schools, and state agricultural schemes.',
          },
        ],
      },
    ],
    keyChallenges: [
      'Unbundled infrastructure registers failing Auditor-General (AGSA) audits under GRAP 17 standards.',
      'Public facilities operating with outdated or uncertified electrical installations and lack of valid SANS 10142 COCs.',
      'Environmental non-compliance notices or delayed water use licences stalling multi-million rand public expenditure budgets.',
      'Frequent power outages compromising essential services in public hospitals, civic buildings, and data facilities.',
    ],
    keyOutcomes: [
      'Audit-ready GRAP 17 asset registers that satisfy National Treasury guidelines and Auditor-General scrutiny.',
      'Legally compliant public facilities certified under SANS 10142 and Occupational Health and Safety mandates.',
      'Fast-tracked environmental authorisations and water licences without procedural delays.',
      'Level 1 B-BBEE contributor status (100% Black Owned) enabling preferential procurement alignment.',
    ],
    standards: [
      'Public Finance Management Act (PFMA Act 1 of 1999)',
      'GRAP 17 (Property, Plant and Equipment Accounting Standard)',
      'National Treasury Asset Management Framework',
      'SANS 10142-1 (Wiring of Premises)',
      'NEMA (Act 107 of 1998) & EIA Regulations',
      'National Water Act (Act 36 of 1998)',
      'CSD Active & CIDB Compliant',
    ],
  },

  mining: {
    slug: 'mining',
    name: 'Mining & Mineral Extraction',
    tagline: 'Heavy Plant Reliability, Dewatering Hydrogeology & Mine Rehabilitation',
    docNo: 'MT-SEC-MIN-02',
    path: 'M10 38l10-18 6 8 6-12 6 22H10z M34 10l6 6',
    summary:
      'From the Bushveld platinum complex to the Witwatersrand gold fields and Mpumalanga coal basins, MarveThabi provides heavy rotating equipment reliability engineering, aquifer dewatering hydrogeology, statutory dust monitoring, and compliant mine closure rehabilitation.',
    fitDescription:
      'In mining operations where an unplanned mill or conveyor stoppage costs hundreds of thousands of rands per hour, MarveThabi delivers predictive condition monitoring, ISO 55000 asset strategies, and SACNASP-certified water and environmental compliance.',
    serviceAlignments: [
      {
        category: 'Engineering Services',
        services: [
          {
            name: 'Reliability Engineering Services',
            slug: 'reliability-engineering',
            ref: 'RE-01',
            description:
              'Vibration analysis, dynamic balancing, motor circuit analysis, and Root Cause Failure Analysis (RCFA) on SAG mills, ball mills, crushers, slurry pumps, and overland conveyors.',
          },
          {
            name: 'Condition Monitoring & Thermography',
            slug: 'condition-monitoring',
            ref: 'CM-01',
            description:
              'Certified thermographic scans and oil sampling (DGA / wear debris) on surface and underground transformers, substations, and mechanical drive trains.',
          },
          {
            name: 'Asset Management Services',
            slug: 'asset-management',
            ref: 'AM-02',
            description:
              'ISO 55000 asset register development, equipment criticality ranking, and maintenance tactics optimization for mining fleets and processing plant circuits.',
          },
        ],
      },
      {
        category: 'Environmental Resource Management',
        services: [
          {
            name: 'Air Quality & Dust Fallout Monitoring',
            slug: 'air-quality-management',
            ref: 'AQ-07',
            description:
              'ASTM D1739 dust fallout bucket networks, opencast haul road dust assessments, and Atmospheric Emission Licence (AEL) reviews.',
          },
          {
            name: 'Water Management & Water Balances',
            slug: 'water-management',
            ref: 'WM-05',
            description:
              'Integrated Water and Waste Management Plans (IWWMP), mine catchment water balances, and groundwater monitoring networks around tailings storage facilities (TSFs).',
          },
          {
            name: 'Greenhouse Gas & Carbon Tax Management',
            slug: 'greenhouse-gas-management',
            ref: 'GG-08',
            description:
              'Scope 1 & Scope 2 carbon footprint accounting, NAEIS mandatory reporting, and carbon tax mitigation strategies for energy-intensive mining operations.',
          },
        ],
      },
      {
        category: 'Specialist Studies',
        services: [
          {
            name: 'Hydrogeological Studies & Dewatering',
            slug: 'hydrogeological-studies',
            ref: 'HS-09',
            description:
              'Aquifer characterisation, geophysical borehole siting, pit dewatering hydrogeology, and 3D groundwater plume contaminant modeling.',
          },
          {
            name: 'Environmental Rehabilitation & Closure',
            slug: 'environmental-rehabilitation',
            ref: 'ER-12',
            description:
              'Mine closure financial liability calculations, contaminated land remediation, topsoil stripping protocols, and indigenous revegetation.',
          },
          {
            name: 'Mining Rights & Environmental Authorisations',
            slug: 'authorisation-permits-and-licences',
            ref: 'AP-10',
            description:
              'Environmental Impact Assessments (EIA), EMPr amendments, Water Use Licences (WULA), and public participation support under MPRDA and NEMA.',
          },
        ],
      },
    ],
    keyChallenges: [
      'Catastrophic rotating equipment failure causing multi-million rand production bottlenecks.',
      'Stringent Department of Water and Sanitation (DWS) monitoring around tailings storage and return water dams.',
      'Escalating financial provisioning liabilities for mine rehabilitation and closure under NEMA regulations.',
      'Community complaints and regulatory scrutiny regarding fugitive opencast dust fallout.',
    ],
    keyOutcomes: [
      'Predictive detection of bearing and gear defects weeks before catastrophic breakdown.',
      'Defensible, audit-ready groundwater and air quality compliance records that prevent pre-directive notices.',
      'Scientifically optimized mine rehabilitation plans that systematically reduce financial closure liability.',
      'Sustained regulatory standing across DMRE, DFFE, and DWS authorities.',
    ],
    standards: [
      'Mineral and Petroleum Resources Development Act (MPRDA Act 28 of 2002)',
      'Mine Health and Safety Act (Act 29 of 1996)',
      'SANS 10299 (Groundwater Development)',
      'ASTM D1739 Standard Test Method for Dustfall Collection',
      'ISO 55000 Asset Management Standard',
      'ISO 18436 Vibration Condition Monitoring',
    ],
  },

  energy: {
    slug: 'energy',
    name: 'Energy & Power Infrastructure',
    tagline: 'Substation Engineering, Power Transmission & Renewable Microgrids',
    docNo: 'MT-SEC-NRG-03',
    path: 'M26 6L14 26h9l-3 16 14-22h-9l1-14z',
    summary:
      'MarveThabi delivers electrical substation engineering, medium-voltage (11kV to 132kV) distribution design, protection coordination, transformer condition diagnostics, and renewable energy integration for power utilities, IPPs, and high-demand industrial consumers.',
    fitDescription:
      'As South Africa transitions toward embedded solar generation and decentralised microgrids, MarveThabi provides technical assurance, protection relay grading, and statutory compliance certifications that protect expensive transformers and ensure grid stability.',
    serviceAlignments: [
      {
        category: 'Engineering Services',
        services: [
          {
            name: 'Electrical Infrastructure & Substation Engineering',
            slug: 'electrical-and-electronic-engineering',
            ref: 'EE-04',
            description:
              '11kV, 22kV, 33kV and 132kV substation design, single-line diagrams, protection scheme design, overhead transmission lines, and power master planning.',
          },
          {
            name: 'Condition Monitoring & Transformer Diagnostics',
            slug: 'condition-monitoring',
            ref: 'CM-01',
            description:
              'Dissolved Gas Analysis (DGA), oil breakdown voltage tests, thermal imaging of switchboards, and partial discharge surveillance.',
          },
          {
            name: 'Electrical Construction & Commissioning',
            slug: 'electrical-construction',
            ref: 'EC-03',
            description:
              'Turnkey substation construction, cable trenching, transformer installation, busbar fabrication, and statutory commissioning with SANS 10142 certification.',
          },
        ],
      },
      {
        category: 'Environmental Resource Management',
        services: [
          {
            name: 'Greenhouse Gas & Carbon Tax Accounting',
            slug: 'greenhouse-gas-management',
            ref: 'GG-08',
            description:
              'Scope 1 and Scope 2 emission verifications, renewable energy offset calculations, and NAEIS statutory reporting for power generating sites.',
          },
          {
            name: 'Waste & Hazardous Transformer Oil Audits',
            slug: 'waste-management',
            ref: 'WS-06',
            description:
              'Polychlorinated biphenyl (PCB) transformer oil management, dielectric fluid containment bund audits, and hazardous waste disposal compliance.',
          },
          {
            name: 'Air Quality & Stack Emission Assessments',
            slug: 'air-quality-management',
            ref: 'AQ-07',
            description:
              'Combustion flue gas monitoring, Atmospheric Emission Licence (AEL) applications, and point-source emissions verifications.',
          },
        ],
      },
      {
        category: 'Specialist Studies',
        services: [
          {
            name: 'Authorisations & Permits for Power Corridors',
            slug: 'authorisation-permits-and-licences',
            ref: 'AP-10',
            description:
              'Environmental Impact Assessments (EIA) and servitudes for transmission lines, solar PV farms, and battery energy storage systems (BESS).',
          },
          {
            name: 'Compliance Audits & ECO Supervision',
            slug: 'compliance-audits-and-monitoring',
            ref: 'CA-11',
            description:
              'Independent Environmental Control Officer (ECO) monitoring during high-voltage transmission and power station construction.',
          },
          {
            name: 'Hydrogeological Surveys for Solar & Substation Siting',
            slug: 'hydrogeological-studies',
            ref: 'HS-09',
            description:
              'Geophysical resistivity surveys, thermal soil conductivity, and foundation geotechnical profiling for substations and solar pylon structures.',
          },
        ],
      },
    ],
    keyChallenges: [
      'Uncoordinated protection relays causing widespread cascading substation trips.',
      'Degrading transformer insulation leading to catastrophic arc-flash and asset loss.',
      'Navigating complex grid connection codes and environmental servitudes for renewable energy plants.',
      'High harmonic distortion and power quality penalties under NRS 048 standards.',
    ],
    keyOutcomes: [
      'Accurate protection grading and discrimination calculations that isolate faults cleanly.',
      'Early detection of transformer winding and oil degradation through laboratory DGA profiling.',
      'Fully compliant, grid-tied solar and hybrid generation with guaranteed statutory sign-off.',
      'Secured environmental authorisations for transmission routes and renewable facilities.',
    ],
    standards: [
      'SANS 10142-2 (Medium Voltage Installations)',
      'NRS 048 (Electricity Supply - Power Quality)',
      'IEC 60076 (Power Transformers Standard)',
      'Grid Connection Codes for Renewable Power Plants',
      'NEMA Environmental Impact Assessment Regulations',
    ],
  },

  municipalities: {
    slug: 'municipalities',
    name: 'Municipalities & Metros',
    tagline: 'Township Electrification, Water Reticulation & mSCOA Asset Verification',
    docNo: 'MT-SEC-MUN-04',
    path: 'M8 40h32M12 40V22h6v18M22 40V14h6v26M32 40V26h6v14',
    summary:
      'We partner with local and district municipalities and metropolitan councils to upgrade aging electrical reticulation networks, audit wastewater treatment plants for Green Drop compliance, and build mSCOA-compliant infrastructure asset registers.',
    fitDescription:
      'Municipal service delivery depends on reliable water reticulation, safe electrical grids, and defensible capital asset registers. MarveThabi bridges the technical capacity gap with experienced engineers and scientists registered with ECSA and SACNASP.',
    serviceAlignments: [
      {
        category: 'Engineering Services',
        services: [
          {
            name: 'Electrical Reticulation & Township Electrification',
            slug: 'electrical-and-electronic-engineering',
            ref: 'EE-04',
            description:
              '11kV overhead and underground cable reticulation, mini-substation installations, street and high-mast area illumination, and electrification master plans.',
          },
          {
            name: 'Asset Management Services (mSCOA Aligned)',
            slug: 'asset-management',
            ref: 'AM-02',
            description:
              'Municipal Standard Chart of Accounts (mSCOA) and GRAP 17 asset register compilation, GIS-based field asset barcoding, and condition assessment of civic infrastructure.',
          },
          {
            name: 'Reliability Engineering for Pumping Stations',
            slug: 'reliability-engineering',
            ref: 'RE-01',
            description:
              'Vibration analysis and maintenance optimization for municipal raw water, potable distribution, and sewage lift pump stations.',
          },
        ],
      },
      {
        category: 'Environmental Resource Management',
        services: [
          {
            name: 'Wastewater Treatment & Green Drop Audits',
            slug: 'waste-management',
            ref: 'WS-06',
            description:
              'Sewage treatment plant performance audits, biological process optimization, effluent discharge testing, and Green Drop certification turnaround plans.',
          },
          {
            name: 'Water Conservation & Demand Management (WC/WDM)',
            slug: 'water-management',
            ref: 'WM-05',
            description:
              'Non-revenue water reduction strategies, municipal water balances, leak detection programs, and Water Use Licences (WULA) for water treatment plants.',
          },
          {
            name: 'Integrated Waste Management Plans (IWMP)',
            slug: 'waste-management',
            ref: 'WS-06',
            description:
              'Municipal landfill site licensing, airspace capacity calculations, and 5-year statutory Integrated Waste Management Plans.',
          },
        ],
      },
      {
        category: 'Specialist Studies',
        services: [
          {
            name: 'Hydrogeological Studies for Municipal Borehole Schemes',
            slug: 'hydrogeological-studies',
            ref: 'HS-09',
            description:
              'Drought-intervention borehole siting, 72-hour step-drawdown pumping yield tests, water chemistry (SANS 241), and groundwater management networks.',
          },
          {
            name: 'Compliance Audits & Municipal ECO Oversight',
            slug: 'compliance-audits-and-monitoring',
            ref: 'CA-11',
            description:
              'Independent compliance auditing on Municipal Infrastructure Grant (MIG) capital projects and statutory Section 34 environmental inspections.',
          },
          {
            name: 'Authorisations & Permits for Municipal Expansions',
            slug: 'authorisation-permits-and-licences',
            ref: 'AP-10',
            description:
              'Environmental Impact Assessments (EIA) for cemetery developments, sewage outfalls, bulk water reservoirs, and township establishments.',
          },
        ],
      },
    ],
    keyChallenges: [
      'Failing municipal wastewater treatment plants facing criminal pre-directives and poor Green Drop scores.',
      'Aging, overloaded 11kV electrical cables and transformers triggering frequent community blackouts.',
      'Inaccurate, unverified asset registers resulting in disclaimed audit opinions from the Auditor-General.',
      'High non-revenue water losses eroding municipal operating revenue.',
    ],
    keyOutcomes: [
      'Comprehensive plant performance audits that restore effluent compliance to DWS standards.',
      'Modernised electrical reticulation and high-mast lighting improving community safety and network stability.',
      'Clean AGSA audit outcomes supported by physically verified, mSCOA-compliant infrastructure registers.',
      'Sustainable groundwater schemes providing backup and bulk water security to vulnerable communities.',
    ],
    standards: [
      'Municipal Finance Management Act (MFMA Act 56 of 2003)',
      'mSCOA Regulations & Guidelines',
      'SANS 241 (South African National Standard for Drinking Water)',
      'DWS Green Drop & Blue Drop Certification Protocols',
      'SANS 10142 (Code of Practice for Wiring of Premises)',
      'National Environmental Management: Waste Act (NEM:WA)',
    ],
  },

  industrial: {
    slug: 'industrial',
    name: 'Industrial & Manufacturing',
    tagline: 'Predictive Condition Monitoring, SANS 10142 COCs & Emission Licensing',
    docNo: 'MT-SEC-IND-05',
    path: 'M6 40V24l10 6V24l10 6V16h10l4 24H6z',
    summary:
      'We serve heavy manufacturing, petrochemical, chemical processing, food and beverage, and steel fabrication facilities with predictive maintenance engineering, plant reliability, statutory electrical certification, and atmospheric emission licensing.',
    fitDescription:
      'Industrial manufacturers cannot afford surprise machine breakdowns or regulatory shut-down notices. MarveThabi integrates reliability condition monitoring with environmental compliance to protect your bottom line and operating licence.',
    serviceAlignments: [
      {
        category: 'Engineering Services',
        services: [
          {
            name: 'Reliability Engineering & RCM Implementation',
            slug: 'reliability-engineering',
            ref: 'RE-01',
            description:
              'Criticality ranking of production machinery, Failure Modes and Effects Analysis (FMEA), maintenance strategy development, and root-cause failure investigations.',
          },
          {
            name: 'Condition Monitoring & Vibration Diagnostics',
            slug: 'condition-monitoring',
            ref: 'CM-01',
            description:
              'Routine vibration data collection on motors, gearboxes, blowers, and pumps; infrared thermal scanning of distribution panels; and ultrasound air leak surveys.',
          },
          {
            name: 'Electrical Construction, Maintenance & COCs',
            slug: 'electrical-construction',
            ref: 'EC-03',
            description:
              'Industrial power distribution, motor control centres (MCCs), variable speed drives (VFDs), cable racking, and SANS 10142 Certificate of Compliance (COC) renewals.',
          },
        ],
      },
      {
        category: 'Environmental Resource Management',
        services: [
          {
            name: 'Air Quality & Atmospheric Emission Licences (AEL)',
            slug: 'air-quality-management',
            ref: 'AQ-07',
            description:
              'Boiler stack emission testing, scrubber performance evaluations, and Atmospheric Emission Licence (AEL) applications and renewals.',
          },
          {
            name: 'Hazardous Waste Classification & Storage Audits',
            slug: 'waste-management',
            ref: 'WS-06',
            description:
              'Industrial waste stream classification under SANS 10234 (GHS), Safety Data Sheet (SDS) verification, and hazardous waste storage bund compliance audits.',
          },
          {
            name: 'Greenhouse Gas & Carbon Tax Accounting',
            slug: 'greenhouse-gas-management',
            ref: 'GG-08',
            description:
              'Facility carbon inventories (Scope 1, 2, and 3), NAEIS submissions, energy efficiency assessments, and carbon tax liability calculations.',
          },
        ],
      },
      {
        category: 'Specialist Studies',
        services: [
          {
            name: 'Environmental Compliance Audits & Due Diligence',
            slug: 'compliance-audits-and-monitoring',
            ref: 'CA-11',
            description:
              'Comprehensive facility environmental legal compliance audits, ISO 14001 gap analyses, and environmental due diligence for acquisitions.',
          },
          {
            name: 'Authorisations & Permits for Plant Expansions',
            slug: 'authorisation-permits-and-licences',
            ref: 'AP-10',
            description:
              'Environmental authorisations, Section 24G rectification applications, and environmental management programmes (EMPr) for industrial upgrades.',
          },
          {
            name: 'Environmental Rehabilitation & Spill Remediation',
            slug: 'environmental-rehabilitation',
            ref: 'ER-12',
            description:
              'Contaminated soil delineation, bio-remediation protocols, and emergency chemical spill response remediation plans.',
          },
        ],
      },
    ],
    keyChallenges: [
      'Unplanned machine breakdowns halting just-in-time production and triggering costly overtime.',
      'Fire hazards and insurance invalidation from uninspected electrical switchgear and hot spots.',
      'Environmental prosecution or plant stoppage from unpermitted atmospheric emissions or hazardous waste leaks.',
      'Rising carbon tax liabilities impacting industrial export competitiveness.',
    ],
    keyOutcomes: [
      'Early identification of mechanical fatigue, misalignment, and bearing wear before failure occurs.',
      'Valid, certified SANS 10142 COCs providing peace of mind and satisfying insurer requirements.',
      'Secured Atmospheric Emission Licences and defensible compliance records.',
      'Systematic carbon reduction roadmap lowering statutory tax liabilities.',
    ],
    standards: [
      'Occupational Health and Safety Act (Act 85 of 1993)',
      'SANS 10142-1 (Wiring of Premises - Industrial)',
      'NEM: Air Quality Act (Act 39 of 2004)',
      'SANS 10234 (Globally Harmonized System for Classification of Chemicals)',
      'ISO 55000 Asset Management Standard',
      'ISO 14001 Environmental Management Systems',
    ],
  },

  commercial: {
    slug: 'commercial',
    name: 'Commercial & Property Development',
    tagline: 'Building Electrical Services, Backup Power Sizing & Environmental Scoping',
    docNo: 'MT-SEC-COM-06',
    path: 'M12 40V10h24v30M18 16h4M26 16h4M18 24h4M26 24h4M18 32h4M26 32h4',
    summary:
      'MarveThabi assists property developers, corporate facilities managers, and commercial landlords with electrical building reticulation, emergency generator and solar PV backup integration, energy audits, and environmental impact assessments for new developments.',
    fitDescription:
      'In modern commercial real estate, uninterrupted tenant operations and sustainability certifications (Green Star / EDGE) directly determine property valuation. MarveThabi engineers the power security, energy efficiency, and environmental compliance that commercial portfolios require.',
    serviceAlignments: [
      {
        category: 'Engineering Services',
        services: [
          {
            name: 'Electrical Construction & Building Reticulation',
            slug: 'electrical-construction',
            ref: 'EC-03',
            description:
              'Commercial tenant reticulation, sub-metering systems, energy-efficient LED lighting conversions, and SANS 10142 Certificate of Compliance (COC) issuances.',
          },
          {
            name: 'Electrical & Electronic Power Engineering',
            slug: 'electrical-and-electronic-engineering',
            ref: 'EE-04',
            description:
              'Standby diesel generator sizing, automatic transfer switch (ATS) synchronization, uninterruptible power supplies (UPS), and rooftop solar PV hybrid design.',
          },
          {
            name: 'Condition Monitoring for Commercial Facilities',
            slug: 'condition-monitoring',
            ref: 'CM-01',
            description:
              'Routine infrared thermographic inspections of commercial main distribution boards (MDBs) to prevent electrical fires and tenant power disruptions.',
          },
        ],
      },
      {
        category: 'Environmental Resource Management',
        services: [
          {
            name: 'Water Conservation & Greywater Management',
            slug: 'water-management',
            ref: 'WM-05',
            description:
              'Water Conservation and Demand Management (WC/WDM) plans, rainwater harvesting design, and greywater recycling authorisations.',
          },
          {
            name: 'Waste Minimisation & Recycling Protocols',
            slug: 'waste-management',
            ref: 'WS-06',
            description:
              'Integrated Waste Management Plans (IWMP) and commercial separation-at-source recycling frameworks for shopping centres and office parks.',
          },
          {
            name: 'Greenhouse Gas & Carbon Footprint Accounting',
            slug: 'greenhouse-gas-management',
            ref: 'GG-08',
            description:
              'Corporate greenhouse gas inventories (Scope 1, 2 & 3), ESG sustainability reporting, and energy decarbonisation master planning.',
          },
        ],
      },
      {
        category: 'Specialist Studies',
        services: [
          {
            name: 'Authorisations & Permits for Property Development',
            slug: 'authorisation-permits-and-licences',
            ref: 'AP-10',
            description:
              'Environmental Impact Assessments (EIA), basic assessments, stormwater authorisations, and public participation for commercial developments.',
          },
          {
            name: 'Compliance Audits & ECO Construction Supervision',
            slug: 'compliance-audits-and-monitoring',
            ref: 'CA-11',
            description:
              'Independent Environmental Control Officer (ECO) site supervision and municipal compliance audits during commercial construction projects.',
          },
          {
            name: 'Hydrogeological Surveys for Commercial Water Security',
            slug: 'hydrogeological-studies',
            ref: 'HS-09',
            description:
              'Groundwater exploration, borehole yield testing, and SANS 241 potability testing to provide independent water backup for commercial properties.',
          },
        ],
      },
    ],
    keyChallenges: [
      'Power outages during load curtailment causing loss of business, security breaches, and tenant dissatisfaction.',
      'Electrical fire risks from overloaded distribution boards and loose switchgear connections.',
      'Environmental authorisation (EIA) bottlenecks delaying commercial construction schedules.',
      'Escalating municipal utility bills and corporate pressure to achieve verified ESG targets.',
    ],
    keyOutcomes: [
      'Seamless, flicker-free standby power transfer between grid, generator, and solar PV.',
      'Insurance-ready thermography reports and valid electrical COCs protecting tenant assets.',
      'Speedy, compliant environmental approvals enabling timely construction ground-breaking.',
      'Measured utility savings through smart metering, greywater reuse, and energy optimization.',
    ],
    standards: [
      'SANS 10142-1 (Wiring of Premises - Commercial)',
      'SANS 10400 (Application of the National Building Regulations)',
      'Green Building Council of South Africa (GBCSA) Guidelines',
      'NEMA EIA Regulations & Listing Notices',
      'National Water Act (Act 36 of 1998)',
    ],
  },

  'infrastructure-development': {
    slug: 'infrastructure-development',
    name: 'Infrastructure Development',
    tagline: 'Multi-Discipline Engineering Supervision, WULA Licences & ECO Site Audits',
    docNo: 'MT-SEC-INF-07',
    path: 'M4 34h40M10 34V22M22 34V16M34 34V22M10 22l12-6 12 6',
    summary:
      'We support major civil-electrical infrastructure contractors, project management units (PMUs), and state infrastructure delivery agencies with multi-disciplinary engineering supervision, geohydrological site investigations, environmental authorisations, and on-site ECO compliance.',
    fitDescription:
      'Large linear and bulk infrastructure developments (pipelines, roads, bridges, rail corridors, and regional water schemes) require tight integration between engineering design, statutory permits, and on-site environmental monitoring. MarveThabi delivers this integrated technical assurance from concept to handover.',
    serviceAlignments: [
      {
        category: 'Engineering Services',
        services: [
          {
            name: 'Electrical Infrastructure & Civil Reticulation Interfaces',
            slug: 'electrical-and-electronic-engineering',
            ref: 'EE-04',
            description:
              'Bulk power feeder routing, electrical servitudes, cathodic protection systems for steel pipelines, and electrical substation designs.',
          },
          {
            name: 'Electrical Construction Oversight & QA/QC',
            slug: 'electrical-construction',
            ref: 'EC-03',
            description:
              'On-site technical supervision, cable pull oversight, earthing and lightning protection verification, and statutory commissioning certifications.',
          },
          {
            name: 'Asset Management & As-Built Data Handover',
            slug: 'asset-management',
            ref: 'AM-02',
            description:
              'Translating newly commissioned civil-electrical infrastructure into unbundled, GRAP 17 / ISO 55000 asset registers ready for operational maintenance.',
          },
        ],
      },
      {
        category: 'Environmental Resource Management',
        services: [
          {
            name: 'Water Management & Hydrological Modeling',
            slug: 'water-management',
            ref: 'WM-05',
            description:
              'Catchment water balances, stormwater runoff management plans, flood line determinations, and Water Use Licences (WULA) for river crossings.',
          },
          {
            name: 'Waste Management & Construction Site Protocols',
            slug: 'waste-management',
            ref: 'WS-06',
            description:
              'Construction waste classification, spoil disposal site permitting, and concrete washout containment protocols.',
          },
          {
            name: 'Air Quality & Dust Suppression Surveillance',
            slug: 'air-quality-management',
            ref: 'AQ-07',
            description:
              'Directional dust fallout monitoring along active linear construction servitudes, bulk earthworks sites, and quarry interfaces.',
          },
        ],
      },
      {
        category: 'Specialist Studies',
        services: [
          {
            name: 'Environmental Compliance Audits & ECO Oversight',
            slug: 'compliance-audits-and-monitoring',
            ref: 'CA-11',
            description:
              'Independent, full-time and periodic Environmental Control Officer (ECO) construction surveillance, erosion barrier audits, and Section 34 compliance reporting.',
          },
          {
            name: 'Authorisations, Permits & Licences (EIA / EMPr)',
            slug: 'authorisation-permits-and-licences',
            ref: 'AP-10',
            description:
              'Full Scoping and EIR Environmental Impact Assessments, borrow pit authorisations, tree removal permits, and gazetted public participation.',
          },
          {
            name: 'Environmental Rehabilitation & Slope Stabilisation',
            slug: 'environmental-rehabilitation',
            ref: 'ER-12',
            description:
              'Rehabilitation Strategy Implementation Plans (RSIP), cut-and-fill slope stabilization, hydroseeding, topsoil management, and erosion control.',
          },
        ],
      },
    ],
    keyChallenges: [
      'Work stoppages and heavy statutory fines resulting from construction activities encroaching on wetlands or watercourses without a WULA.',
      'Siloed coordination between civil contractors, electrical engineers, and environmental regulatory monitors.',
      'Inadequate erosion control causing siltation of natural water bodies and community backlash.',
      'Incomplete as-built documentation and asset data at project handover, creating long-term operational liabilities.',
    ],
    keyOutcomes: [
      'Secured, defensible Water Use Licences and Environmental Authorisations aligned with construction schedules.',
      'Zero-stoppage construction enabled by proactive, authoritative on-site Environmental Control Officer oversight.',
      'Stable, certified post-construction landforms with flourishing indigenous vegetative ground cover.',
      'Pristine, audit-ready asset registers handed over directly to operating authorities at commissioning.',
    ],
    standards: [
      'CIDB Best Practice Standards for Construction',
      'NEMA Environmental Impact Assessment Regulations',
      'National Water Act Section 21 Water Uses',
      'SANS 1200 / SANS 2001 (Civil Engineering Construction)',
      'ISO 19011 (Auditing Management Systems)',
      'ISO 55000 Asset Management Standard',
    ],
  },
};

export function getIndustryDetail(slug: string): IndustryDetail | undefined {
  const normalized = slug.toLowerCase().trim().replace(/^\/industries\//, '').replace(/\/$/, '');

  if (industryDetailsData[normalized]) {
    return industryDetailsData[normalized];
  }

  // Alias checks
  if (normalized.includes('gov') || normalized.includes('public')) {
    return industryDetailsData['government'];
  }
  if (normalized.includes('min')) {
    return industryDetailsData['mining'];
  }
  if (normalized.includes('energ') || normalized.includes('power')) {
    return industryDetailsData['energy'];
  }
  if (normalized.includes('municip') || normalized.includes('metro') || normalized.includes('local')) {
    return industryDetailsData['municipalities'];
  }
  if (normalized.includes('industr') || normalized.includes('manuf')) {
    return industryDetailsData['industrial'];
  }
  if (normalized.includes('commerc') || normalized.includes('prop')) {
    return industryDetailsData['commercial'];
  }
  if (normalized.includes('infra') || normalized.includes('develop')) {
    return industryDetailsData['infrastructure-development'];
  }

  return undefined;
}



