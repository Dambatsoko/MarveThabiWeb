import { Language } from '../types';

export interface UITranslations {
  common: {
    siteName: string;
    legalName: string;
    officeAddress: string;
    officeAddressFull: string;
    requestConsultation: string;
    exploreServices: string;
    readMore: string;
    backToAllDirectors: string;
    backToLeadership: string;
    viewAllServicesCatalogue: string;
    masterServicesCatalogue: string;
    viewLinkedInProfile: string;
    followOnLinkedIn: string;
    connectOnLinkedIn: string;
    linkedInProfileArrow: string;
    downloadProfile: string;
    downloadProfilePdf: string;
    whereWeFit: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
  };
  langSwitcher: {
    groupLabel: string;
    switchToEn: string;
    switchToFr: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    team: string;
    process: string;
    contact: string;
    ariaHome: string;
    ariaAbout: string;
    ariaServices: string;
    ariaTeam: string;
    ariaProcess: string;
    ariaContact: string;
    desktopNavLabel: string;
    mobileNavLabel: string;
    mobileDrawerLabel: string;
    logoAriaLabel: string;
    linkedInAriaLabel: string;
    downloadAriaLabel: string;
  };
  footer: {
    tagline: string;
    companyHeading: string;
    contactHeading: string;
    logoAlt: string;
    logoAriaLabel: string;
    emailAria: string;
    phone1Aria: string;
    phone2Aria: string;
    linkedInAria: string;
  };
  errorBoundary: {
    title: string;
    message: string;
    button: string;
  };
  home: {
    heroRegEcsa: string;
    heroRegSacnasp: string;
    heroRegCsd: string;
    heroTitle: string;
    heroSubtitle: string;
    heroExploreAria: string;
    heroConsultAria: string;
    clientsHeading: string;
    clientToggleGroupAria: string;
    scrollView: string;
    scrollViewAria: string;
    scrollViewTitle: string;
    gridView: string;
    gridViewAria: string;
    gridViewTitle: string;
    scrollingClientsAria: string;
    gridClientsAria: string;
    clientLogoAltSuffix: string;
    industriesHeading: string;
    industriesSubtitle: string;
    industryAriaPrefix: string;
    industryTitlePrefix: string;
    contactHeading: string;
    contactLead: string;
    officeLabel: string;
    enquiriesLabel: string;
    registrationsLabel: string;
    registrationsLine: string;
    formFullName: string;
    formFullNamePlaceholder: string;
    formOrganisation: string;
    formOrganisationPlaceholder: string;
    formEmail: string;
    formEmailPlaceholder: string;
    formPhone: string;
    formPhonePlaceholder: string;
    formService: string;
    formServicePlaceholder: string;
    formDetails: string;
    formDetailsPlaceholder: string;
    formSubmit: string;
    formSubmitting: string;
    formSubmitAria: string;
    formRequiredError: string;
    formFallbackError: string;
    formSuccessDelivered: string; // expects {ref} and {email}
    formSuccessLogged: string; // expects {ref}
    formGenericSuccess: string;
    formDefaultSubjectSuffix: string;
    formDefaultDetailsPrefix: string;
  };
  accreditation: {
    sectionAria: string;
    title: string;
    lead1: string;
    lead2: string;
    iso9001Title: string;
    iso9001Desc: string;
    iso45001Title: string;
    iso45001Desc: string;
    iso14001Title: string;
    iso14001Desc: string;
    footerNote: string;
    photoAlt: string;
  };
  affiliations: {
    sectionAria: string;
    title: string;
    subtitle: string;
    logoAltSuffix: string;
  };
  about: {
    heroTitle: string;
    heroSubtitle: string;
    eyebrow: string;
    introHeading: string;
    introP1: string;
    introP2: string;
    introP3: string;
    collageAlt: string;
    expertiseHeading: string;
    expertiseLabels: {
      reliability: string;
      assetManagement: string;
      electrical: string;
      conditionMonitoring: string;
      environmental: string;
    };
    visionMissionHeading: string;
    visionTitle: string;
    visionText: string;
    missionTitle: string;
    missionText: string;
    valuesHeading: string;
    values: {
      integrityTitle: string;
      integrityText: string;
      excellenceTitle: string;
      excellenceText: string;
      partnershipTitle: string;
      partnershipText: string;
      sustainabilityTitle: string;
      sustainabilityText: string;
    };
    taglineStripAria: string;
    taglineStripText: string;
  };
  servicesPage: {
    heroTitle: string;
    heroP1: string;
    heroP2: string;
    quickJumpAria: string;
    jumpToPrefix: string;
    directoryLabel: string;
    directoryAria: string;
    navigateToPrefix: string;
    photoAriaSuffix: string;
    readMoreAriaPrefix: string;
    affiliationsTitle: string;
    affiliationsSubtitle: string;
    affiliationsAltSuffix: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaAria: string;
  };
  serviceDetail: {
    disciplineSuffix: string;
    standardsTag: string;
    specsSidebarAria: string;
    objectiveHeading: string;
    capabilitiesHeading: string;
    approachHeading: string;
    outcomeHeading: string;
    governingStandardsHeading: string;
    applicableSectorsHeading: string;
    relatedServicesHeading: string;
    relatedServicesAria: string;
    technicalEnquiryHeading: string;
    technicalEnquiryText: string;
    ctaTitle: string;
    ctaSubtitle: string;
    photoAriaSuffix: string;
    altMiddleText: string;
  };
  industriesPage: {
    heroTitle: string;
    heroSubtitle: string;
    heroTags: string[];
    breakdownTitle: string;
    breakdownSubtitle: string;
    challengesLabel: string;
    disciplinesLabel: string;
    whereFitLink: string;
    trustedTitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
  };
  industryDetail: {
    tagDomain: string;
    tagAlignment: string;
    eyebrow: string;
    fitHeadingPrefix: string;
    disciplinePrefix: string;
    serviceLinesSuffix: string;
    statutoryDeliverable: string;
    viewDetailsPrefix: string;
    viewDetailsSuffix: string;
    risksEyebrow: string;
    challengesHeading: string;
    advantagesEyebrow: string;
    outcomesHeading: string;
    standardsHeading: string;
    standardsSubtitlePrefix: string;
    standardsSubtitleSuffix: string;
    ctaEyebrow: string;
    ctaHeading: string;
    ctaSubtitle: string;
    otherEyebrow: string;
    otherHeading: string;
  };
  leadershipPage: {
    heroTitle: string;
    heroSubtitle: string;
    teamHeading: string;
    teamSubtitle: string;
    viewFullProfile: string;
    governanceHeading: string;
    governanceSubtitle: string;
    govCards: {
      title: string;
      description: string;
    }[];
    councilsHeading: string;
    ctaHeading: string;
    ctaSubtitle: string;
  };
  leaderDetail: {
    notFoundTitle: string;
    notFoundText: string;
    companySuffix: string;
    highlightsLabel: string;
    sectorsLabel: string;
    executiveBioHeading: string;
    qualificationsHeading: string;
    expertiseHeading: string;
    projectExpHeading: string;
    focusHeading: string;
    consultWithPrefix: string;
    photoAltMiddle: string;
  };
  processPage: {
    heroTitle: string;
    heroSubtitle: string;
    heroTags: string[];
    sectionHeading: string;
    sectionSubtitle: string;
    phasePrefix: string;
    activitiesHeading: string;
    deliverableHeading: string;
    qualityBadge: string;
    ctaHeading: string;
    ctaSubtitle: string;
  };
  contactPage: {
    heroTitle: string;
    heroSubtitle: string;
    badgePrefix: string;
    refPrefix: string;
    thankYouPrefix: string;
    confirmationIntro: string; // {category}, {email}, {contact}, {responsibility}
    summaryHeading: string;
    labelFullName: string;
    labelOrganisation: string;
    labelEmail: string;
    labelPhone: string;
    labelServiceCategory: string;
    labelSubject: string;
    labelDetails: string;
    notSpecified: string;
    notProvided: string;
    deliveryStatusLabel: string;
    submitAnother: string;
    openEmailClient: string;
    openEmailClientTitle: string;
    formOrgLabel: string;
    formNamePlaceholder: string;
    formOrgPlaceholder: string;
    formEmailLabel: string;
    formEmailPlaceholder: string;
    formPhoneLabel: string;
    formPhonePlaceholder: string;
    formServiceLabel: string;
    directedToLabel: string;
    formSubjectLabel: string;
    formSubjectPlaceholder: string;
    formDetailsLabel: string;
    formDetailsPlaceholder: string;
    submitButtonIdle: string;
    submitButtonBusy: string;
    validationFullName: string;
    validationEmailRequired: string;
    validationEmailInvalid: string;
    validationSubject: string;
    validationDetailsRequired: string;
    validationDetailsMin: string;
    deliveredMessage: string; // {email}
    loggedMessage: string; // {ref}, {contact}, {email}
    fallbackErrorNotice: string;
    fallbackStatusMessage: string; // {ref}, {contact}
    sidebarAria: string;
    directChannelsHeading: string;
    emailHeading: string;
    telephoneHeading: string;
    phone1Note: string;
    phone2Note: string;
    hoursHeading: string;
    hoursValue: string;
    linkedInHeading: string;
    linkedInLinkText: string;
    headOfficeHeading: string;
    headOfficeAddress: string;
    credentialsHeading: string;
    credentials: { label: string; value: string }[];
  };
}

export const UI_TRANSLATIONS: Record<Language, UITranslations> = {
  en: {
    common: {
      siteName: 'MarveThabi Consulting Engineers',
      legalName: 'MarveThabi Consulting Engineers (Pty) Ltd',
      officeAddress: 'Unit 68 Saliehout Street, Stenostelma, Annlin, Pretoria 0182',
      officeAddressFull: 'Unit 68 Saliehout Street, Stenostelma, Annlin, Pretoria 0182, Gauteng, South Africa',
      requestConsultation: 'Request Consultation',
      exploreServices: 'Explore Services',
      readMore: 'Read More',
      backToAllDirectors: '← Back to All Directors',
      backToLeadership: 'Back to Leadership',
      viewAllServicesCatalogue: '← View All Services Catalogue',
      masterServicesCatalogue: 'Master Services Catalogue',
      viewLinkedInProfile: 'View LinkedIn Profile',
      followOnLinkedIn: 'Follow on LinkedIn',
      connectOnLinkedIn: 'Connect on LinkedIn',
      linkedInProfileArrow: 'LinkedIn Profile →',
      downloadProfile: 'Download Profile',
      downloadProfilePdf: 'Download Profile PDF',
      whereWeFit: 'Where We Fit →',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      skipToContent: 'Skip to content',
    },
    langSwitcher: {
      groupLabel: 'Language selection',
      switchToEn: 'Switch language to English',
      switchToFr: 'Passer le site en français',
    },
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Our Services',
      team: 'Our Team',
      process: 'Our Process',
      contact: 'Contact Us',
      ariaHome: 'Navigate to Home page',
      ariaAbout: 'Navigate to About Us page',
      ariaServices: 'Navigate to Engineering Services catalogue',
      ariaTeam: 'Navigate to Leadership and Team page',
      ariaProcess: 'Navigate to Engineering Process page',
      ariaContact: 'Navigate to Contact Us page',
      desktopNavLabel: 'Primary site navigation',
      mobileNavLabel: 'Mobile primary navigation',
      mobileDrawerLabel: 'Site Navigation Menu',
      logoAriaLabel: 'MarveThabi Consulting Engineers Home',
      linkedInAriaLabel: 'Visit MarveThabi Consulting Engineers on LinkedIn (opens in a new tab)',
      downloadAriaLabel: 'Download MarveThabi Corporate Profile PDF (Opens in new tab)',
    },
    footer: {
      tagline: 'National infrastructure. Technical excellence. Government confidence.',
      companyHeading: 'Company',
      contactHeading: 'Contact',
      logoAlt: 'MarveThabi Consulting Engineers logo - Registered consulting engineers in Pretoria',
      logoAriaLabel: 'MarveThabi Consulting Engineers - Return to homepage',
      emailAria: 'Email MarveThabi at info@marvethabi.co.za',
      phone1Aria: 'Call MarveThabi at +27 82 412 3847',
      phone2Aria: 'Call MarveThabi at +27 72 834 7953',
      linkedInAria: 'Visit MarveThabi LinkedIn profile (opens in a new tab)',
    },
    errorBoundary: {
      title: 'Unable to Display Specification',
      message: 'We encountered an unexpected interface state while rendering this page.',
      button: 'Return to Home',
    },
    home: {
      heroRegEcsa: 'ECSA Registered',
      heroRegSacnasp: 'SACNASP Registered',
      heroRegCsd: 'CSD: Active',
      heroTitle: 'Integrated Engineering & Environmental Solutions That Build Africa & Beyond',
      heroSubtitle:
        'Delivering specialist Reliability Engineering, Asset Management, Electrical Engineering and Geo-Environmental solutions for government, municipalities, mining, energy and industrial sectors.',
      heroExploreAria: 'Explore our engineering and environmental services catalogue',
      heroConsultAria: 'Request a technical consultation with our registered engineering team',
      clientsHeading: 'Our Clients',
      clientToggleGroupAria: 'Client logos display mode',
      scrollView: 'Scroll View',
      scrollViewAria: 'Switch client logos to continuous scrolling marquee view',
      scrollViewTitle: 'Continuous marquee animation',
      gridView: 'Grid View (14)',
      gridViewAria: 'Switch client logos to 14-client grid view',
      gridViewTitle: 'View all 14 clients in a grid',
      scrollingClientsAria: 'Scrolling client logos',
      gridClientsAria: 'All 14 client logos',
      clientLogoAltSuffix: 'logo - MarveThabi client',
      industriesHeading: 'Industries We Serve',
      industriesSubtitle:
        'Specialist support for the sectors that keep the country running. Click any sector to see where our services fit.',
      industryAriaPrefix: 'Explore how MarveThabi engineering services serve the',
      industryTitlePrefix: 'Explore how MarveThabi serves the',
      contactHeading: 'Start a Project',
      contactLead:
        'From municipal electrification to mine-wide asset strategies, the first step is a conversation with a registered engineer.',
      officeLabel: 'Office',
      enquiriesLabel: 'Enquiries',
      registrationsLabel: 'Professional Registrations',
      registrationsLine: 'ECSA · SACNASP · CIDB · CSD',
      formFullName: 'Full Name',
      formFullNamePlaceholder: 'Your name',
      formOrganisation: 'Organisation',
      formOrganisationPlaceholder: 'Department, municipality or company',
      formEmail: 'Email',
      formEmailPlaceholder: 'you@organisation.gov.za',
      formPhone: 'Phone',
      formPhonePlaceholder: '+27',
      formService: 'Service Required',
      formServicePlaceholder: 'Select a discipline',
      formDetails: 'Project Details',
      formDetailsPlaceholder: 'Scope, location and timeline',
      formSubmit: 'Send Enquiry',
      formSubmitting: 'Sending...',
      formSubmitAria: 'Send project enquiry to registered engineers',
      formRequiredError: 'Your enquiry could not be sent. Please check the required fields and try again.',
      formFallbackError: 'Your enquiry could not be sent. Please try again.',
      formSuccessDelivered:
        'Thank you. Your enquiry (Ref: {ref}) was sent to {email}. A registered engineer will respond within one business day.',
      formSuccessLogged:
        'Thank you. Your enquiry (Ref: {ref}) has been received and routed to our engineering team. A registered engineer will respond within one business day.',
      formGenericSuccess: 'Thank you. A registered engineer will respond within one business day.',
      formDefaultSubjectSuffix: 'Homepage Project Enquiry',
      formDefaultDetailsPrefix: 'Consultation request submitted via homepage for',
    },
    accreditation: {
      sectionAria: 'Our Accreditation',
      title: 'OUR ACCREDITATION',
      lead1:
        'We are committed to meeting the highest standards of quality, safety, and environmental management.',
      lead2:
        'Our accreditations demonstrate our compliance with industry regulations and best practices.',
      iso9001Title: 'ISO 9001',
      iso9001Desc: 'Quality Management',
      iso45001Title: 'ISO 45001',
      iso45001Desc: 'Occupational Health and Safety',
      iso14001Title: 'ISO 14001',
      iso14001Desc: 'Environmental Management',
      footerNote:
        'These accreditations reflect our ongoing commitment to excellence, sustainability, and stakeholder satisfaction.',
      photoAlt:
        'MarveThabi ISO 9001, ISO 45001, and ISO 14001 framed certificates of registration with safety hard hat',
    },
    affiliations: {
      sectionAria: 'Professional Affiliations',
      title: 'Statutory Councils & Institutes',
      subtitle:
        'Our engineers and scientists maintain active, registered standing with the statutory councils and professional institutes governing South African engineering and scientific practice.',
      logoAltSuffix: 'logo - professional statutory registration',
    },
    about: {
      heroTitle: 'About MarveThabi Consulting Engineers',
      heroSubtitle:
        'Integrated engineering and consulting solutions in Reliability Engineering, Asset Management, Electrical Engineering, Condition Monitoring, and Environmental Management.',
      eyebrow: 'ABOUT US',
      introHeading: 'Technical Expertise. Practical Experience. Professional Excellence.',
      introP1:
        'MarveThabi Consulting Engineers (MCE) is a multidisciplinary consulting firm specialising in engineering and environmental services. Our areas of expertise include reliability engineering, physical asset management, electrical engineering, condition monitoring, environmental management, and environmental compliance.',
      introP2:
        'Established in response to the growing demand for specialised technical and environmental expertise, MCE serves clients across the mining, industrial, utilities, and infrastructure sectors. We provide professional services that address engineering challenges, environmental risks, regulatory compliance, and the sustainable management of resources.',
      introP3:
        "Our approach is grounded in technical expertise, practical industry experience, scientific assessment, and risk-based decision-making. We are committed to delivering reliable, technically sound, and environmentally responsible services tailored to our clients' operational requirements and regulatory obligations.",
      collageAlt:
        'MarveThabi multidisciplinary engineering operations: plant engineering, open-pit mining, industrial processing infrastructure, and environmental sustainability',
      expertiseHeading: 'OUR CORE EXPERTISE',
      expertiseLabels: {
        reliability: 'Reliability Engineering',
        assetManagement: 'Asset Management',
        electrical: 'Electrical Engineering',
        conditionMonitoring: 'Condition Monitoring',
        environmental: 'Environmental Management',
      },
      visionMissionHeading: 'VISION AND MISSION',
      visionTitle: 'VISION',
      visionText:
        'To be a leading multidisciplinary engineering consultancy in Africa, recognised for technical excellence, integrity, and sustainable value creation.',
      missionTitle: 'MISSION',
      missionText:
        'To deliver compliant, reliable, and sustainable engineering and environmental management solutions that enhance asset performance, safety, and operational efficiency for our clients.',
      valuesHeading: 'OUR VALUES',
      values: {
        integrityTitle: 'INTEGRITY',
        integrityText:
          'We act with honesty, transparency, and professional ethics in everything we do.',
        excellenceTitle: 'EXCELLENCE',
        excellenceText:
          'We are committed to delivering high-quality solutions and continuous improvement.',
        partnershipTitle: 'PARTNERSHIP',
        partnershipText:
          'We build strong relationships and work collaboratively with our clients and stakeholders.',
        sustainabilityTitle: 'SUSTAINABILITY',
        sustainabilityText:
          'We promote solutions that are environmentally responsible and economically viable.',
      },
      taglineStripAria: 'Corporate Tagline',
      taglineStripText: 'ENGINEERING SOLUTIONS. RELIABLE ASSETS. SUSTAINABLE FUTURES.',
    },
    servicesPage: {
      heroTitle: 'Engineering & Environmental Consulting',
      heroP1:
        'MarveThabi Consulting Engineers assists organisations in improving asset reliability, availability, and maintainability through structured, data-driven reliability engineering methodologies.',
      heroP2:
        'Our services are designed to reduce unplanned downtime, optimise maintenance effectiveness, manage operational risk, and extend asset life across the full asset lifecycle.',
      quickJumpAria: 'Service categories quick jump',
      jumpToPrefix: 'Jump to Group',
      directoryLabel: 'Directory',
      directoryAria: 'Service directory',
      navigateToPrefix: 'Navigate to',
      photoAriaSuffix: 'service photograph',
      readMoreAriaPrefix: 'Read technical specifications and deliverables for',
      affiliationsTitle: 'Professional Affiliations',
      affiliationsSubtitle:
        'Our engineers and scientists are registered with the statutory councils that govern South African engineering and natural science practice.',
      affiliationsAltSuffix: 'logo - professional registration',
      ctaTitle: 'Scope It With an Engineer',
      ctaSubtitle:
        'Send the requirement, receive a technically scoped response from a registered professional.',
      ctaAria: 'Request a technical consultation with our registered engineers',
    },
    serviceDetail: {
      disciplineSuffix: 'Discipline',
      standardsTag: 'Statutory Standards Compliant',
      specsSidebarAria: 'Technical Specifications',
      objectiveHeading: 'Engineering Objective & Scope',
      capabilitiesHeading: 'Core Capabilities',
      approachHeading: 'Technical Approach & Delivery',
      outcomeHeading: 'Outcome & Operational Value',
      governingStandardsHeading: 'Governing Standards',
      applicableSectorsHeading: 'Applicable Sectors',
      relatedServicesHeading: 'Related Service Lines',
      relatedServicesAria: 'Related services',
      technicalEnquiryHeading: 'Technical Enquiry',
      technicalEnquiryText:
        'Discuss your technical scope or statutory compliance requirements directly with our registered professionals.',
      ctaTitle: 'Scope It With an Engineer',
      ctaSubtitle:
        'Send your technical requirement and receive a structured scope from our registered engineering and scientific professionals.',
      photoAriaSuffix: 'service photograph',
      altMiddleText: 'MarveThabi technical engineering deliverable in',
    },
    industriesPage: {
      heroTitle: 'Industries & Infrastructure Sectors',
      heroSubtitle:
        'From deep-level gold and platinum extraction to municipal bulk distribution networks, MarveThabi deploys registered engineering and scientific professionals tailored to the demanding regulatory requirements of each sector.',
      heroTags: [
        'Mining & Minerals',
        'Municipal Bulk Infrastructure',
        'Power & Energy Reticulation',
        'Industrial Manufacturing',
      ],
      breakdownTitle: 'Sector Engineering Breakdown',
      breakdownSubtitle:
        'Tailored engineering and environmental methodologies addressing specific industry operational risks.',
      challengesLabel: 'Key Challenges Solved',
      disciplinesLabel: 'Core Disciplines Deployed',
      whereFitLink: 'Where Our Services Fit in This Sector →',
      trustedTitle: 'Trusted by Industry Leaders Across South Africa',
      ctaTitle: 'Discuss Your Sector Requirement',
      ctaSubtitle:
        'Our registered engineers provide sector-specific technical scoping and regulatory roadmaps.',
    },
    industryDetail: {
      tagDomain: 'Critical Infrastructure Domain',
      tagAlignment: 'Multi-Disciplinary Engineering Alignment',
      eyebrow: 'OPERATIONAL & STATUTORY INTEGRATION',
      fitHeadingPrefix: 'Where Our Services Fit in',
      disciplinePrefix: 'DISCIPLINE',
      serviceLinesSuffix: 'SERVICE LINES',
      statutoryDeliverable: 'STATUTORY DELIVERABLE',
      viewDetailsPrefix: 'View',
      viewDetailsSuffix: 'Details →',
      risksEyebrow: 'OPERATIONAL & REGULATORY RISKS',
      challengesHeading: 'Key Sector Challenges We Solve',
      advantagesEyebrow: 'MEASURABLE ADVANTAGES',
      outcomesHeading: 'Target Outcomes Delivered',
      standardsHeading: 'Applicable Statutory Standards & Regulators',
      standardsSubtitlePrefix: 'Every engineering design, asset register, and environmental report for',
      standardsSubtitleSuffix: 'is delivered in strict conformity with national legislation.',
      ctaEyebrow: 'SECTOR ADVISORY & APPOINTMENTS',
      ctaHeading: 'Partner With Our Registered Specialists',
      ctaSubtitle:
        "Discuss your sector infrastructure project, statutory compliance review, or asset register with MarveThabi's registered engineers and scientists.",
      otherEyebrow: 'CROSS-SECTOR SPECIALISATION',
      otherHeading: 'Browse Other Industries We Serve',
    },
    leadershipPage: {
      heroTitle: 'Practice Leadership & Governance',
      heroSubtitle:
        'Accountable engineering requires certified, statutory professionals. Our practice is personally directed by registered engineers and natural scientists who take direct responsibility for every deliverable.',
      teamHeading: 'Our Leadership Team',
      teamSubtitle:
        'Meet the directors driving engineering precision, statutory governance, and environmental stewardship across Africa and beyond.',
      viewFullProfile: 'View Full Profile',
      governanceHeading: 'Statutory Code of Professional Conduct',
      governanceSubtitle:
        'Our commitment to engineering integrity, environmental stewardship, and public safety.',
      govCards: [
        {
          title: 'ECSA Code of Practice',
          description:
            'All engineering drawings, single-line diagrams, and substation specifications are delivered strictly in compliance with ECSA professional rules, SANS standards, and statutory occupational health and safety guidelines.',
        },
        {
          title: 'SACNASP Scientific Integrity',
          description:
            'Environmental assessments, hydrogeological models, and waste classifications are conducted with uncompromising scientific rigour, adhering to peer-reviewed protocols and National Water Act standards.',
        },
        {
          title: 'ISO 55000 & Safety Governance',
          description:
            'Our asset management frameworks, maintenance tactics, and field engineering supervision are governed under ISO 55000 asset management standards and SAMTRAC-certified occupational health and safety management protocols.',
        },
      ],
      councilsHeading: 'Statutory Councils & Institutes',
      ctaHeading: 'Direct Consultation With Our Directors',
      ctaSubtitle:
        'Schedule an executive engineering consultation to review your technical requirements with our directors.',
    },
    leaderDetail: {
      notFoundTitle: 'Director Profile Not Found',
      notFoundText:
        'The requested leadership profile does not exist or may have been relocated.',
      companySuffix: 'MarveThabi Consulting Engineers',
      highlightsLabel: 'Profile Highlights',
      sectorsLabel: 'Key Industry Sectors',
      executiveBioHeading: 'Executive Biography',
      qualificationsHeading: 'Qualifications & Professional Certifications',
      expertiseHeading: 'Areas of Expertise',
      projectExpHeading: 'Key Project & Technical Experience',
      focusHeading: 'Professional Focus & Value Commitment',
      consultWithPrefix: 'Consult With',
      photoAltMiddle: 'at MarveThabi Consulting Engineers',
    },
    processPage: {
      heroTitle: 'Project Delivery Lifecycle',
      heroSubtitle:
        'A disciplined, traceable path from initial consultation and site diagnostics to detailed CAD engineering, construction oversight, and long-term asset optimization.',
      heroTags: [
        'Stage-Gate Quality Assurance',
        'SANS & ISO 55000 Alignment',
        'Statutory Professional Oversight',
        'Commissioning & Handover',
      ],
      sectionHeading: 'End-to-End Delivery Architecture',
      sectionSubtitle:
        'Every engineering and environmental engagement follows this structured, accountable workflow.',
      phasePrefix: 'PHASE',
      activitiesHeading: 'Core Engineering and Environmental Activities',
      deliverableHeading: 'Deliverable Artifact',
      qualityBadge: 'Quality Verified & Sign-off Ready',
      ctaHeading: 'Initiate Phase 01 for Your Project',
      ctaSubtitle:
        'Reach out to our principal engineers to schedule an exploratory technical consultation.',
    },
    contactPage: {
      heroTitle: 'Contact Us',
      heroSubtitle:
        'Direct your technical requirement to the registered engineer or scientist responsible for that specific discipline. Our team provides responsive consultation and statutory engineering evaluation.',
      badgePrefix: '✓ Enquiry Sent Straight to',
      refPrefix: 'Ref:',
      thankYouPrefix: 'Thank you,',
      confirmationIntro:
        'Your enquiry regarding {category} has been sent directly from this form to {email} and routed to {contact} ({responsibility}).',
      summaryHeading: 'Enquiry Summary',
      labelFullName: 'Full Name:',
      labelOrganisation: 'Organisation:',
      labelEmail: 'Email Address:',
      labelPhone: 'Contact Number:',
      labelServiceCategory: 'Service Category:',
      labelSubject: 'Subject:',
      labelDetails: 'Details:',
      notSpecified: 'Not specified',
      notProvided: 'Not provided',
      deliveryStatusLabel: 'Delivery Status:',
      submitAnother: 'Submit Another Enquiry',
      openEmailClient: 'Open Email Client',
      openEmailClientTitle: 'Open pre-filled draft in your email client',
      formOrgLabel: 'Company / Organisation',
      formNamePlaceholder: 'e.g. John Molefe',
      formOrgPlaceholder: 'e.g. Anglo American / City of Ekurhuleni',
      formEmailLabel: 'Email Address',
      formEmailPlaceholder: 'e.g. j.molefe@company.co.za',
      formPhoneLabel: 'Contact Number',
      formPhonePlaceholder: 'e.g. +27 82 000 0000',
      formServiceLabel: 'Service Required',
      directedToLabel: 'Your enquiry will be directed to:',
      formSubjectLabel: 'Enquiry Subject',
      formSubjectPlaceholder: 'Brief summary of your enquiry',
      formDetailsLabel: 'Enquiry Details',
      formDetailsPlaceholder:
        'Please provide details regarding your requirements, technical scope, plant location, or project objectives...',
      submitButtonIdle: 'Send Enquiry Straight to info@marvethabi.co.za',
      submitButtonBusy: 'Sending to info@marvethabi.co.za...',
      validationFullName: 'Please enter your full name.',
      validationEmailRequired: 'Please enter your email address.',
      validationEmailInvalid: 'Please provide a valid email address.',
      validationSubject: 'Please enter an enquiry subject.',
      validationDetailsRequired: 'Please describe your project scope or enquiry details.',
      validationDetailsMin:
        'Please provide at least 10 characters of detail for technical evaluation.',
      deliveredMessage: 'Enquiry delivered directly to {email}.',
      loggedMessage:
        'Enquiry logged under reference {ref} and routed to {contact} at {email}. A registered specialist will respond within one business day.',
      fallbackErrorNotice:
        'Direct server delivery was unavailable; enquiry recorded in browser registry.',
      fallbackStatusMessage:
        'Enquiry logged under reference {ref} and assigned to {contact}. You may also send directly via your email client below.',
      sidebarAria: 'Practice Contact Information',
      directChannelsHeading: 'Direct Contact Channels',
      emailHeading: 'Email',
      telephoneHeading: 'Telephone',
      phone1Note: '(Engineering / Marvelous Ngoatle)',
      phone2Note: '(Environmental / Thabang Ngoatle)',
      hoursHeading: 'Consulting Hours',
      hoursValue: 'Monday – Friday: 08:00 – 17:00 SAST',
      linkedInHeading: 'LinkedIn Corporate Profile',
      linkedInLinkText: 'MarveThabi on LinkedIn →',
      headOfficeHeading: 'Practice Head Office',
      headOfficeAddress:
        'Unit 68 Saliehout Street, Stenostelma, Annlin, Pretoria 0182, Gauteng, South Africa',
      credentialsHeading: 'Statutory Credentials',
      credentials: [
        { label: 'B-BBEE Status:', value: 'Level 1 (135% Recognition)' },
        { label: 'Engineering Council:', value: 'ECSA Registered' },
        { label: 'Natural Sciences:', value: 'SACNASP Registered' },
        { label: 'Contractor DB:', value: 'CIDB Registered' },
        { label: 'Public Supplier:', value: 'CSD Registered' },
      ],
    },
  },

  fr: {
    common: {
      siteName: 'MarveThabi Consulting Engineers',
      legalName: 'MarveThabi Consulting Engineers (Pty) Ltd',
      officeAddress: 'Unit 68 Saliehout Street, Stenostelma, Annlin, Pretoria 0182',
      officeAddressFull: 'Unit 68 Saliehout Street, Stenostelma, Annlin, Pretoria 0182, Gauteng, Afrique du Sud',
      requestConsultation: 'Demander une consultation',
      exploreServices: 'Découvrir nos services',
      readMore: 'En savoir plus',
      backToAllDirectors: '← Retour à la direction',
      backToLeadership: 'Retour à la direction',
      viewAllServicesCatalogue: '← Voir tout le catalogue des services',
      masterServicesCatalogue: 'Catalogue général des services',
      viewLinkedInProfile: 'Voir le profil LinkedIn',
      followOnLinkedIn: 'Suivre sur LinkedIn',
      connectOnLinkedIn: 'Rejoindre sur LinkedIn',
      linkedInProfileArrow: 'Profil LinkedIn →',
      downloadProfile: 'Télécharger le profil',
      downloadProfilePdf: 'Télécharger le profil PDF',
      whereWeFit: 'Notre valeur ajoutée →',
      openMenu: 'Ouvrir le menu de navigation',
      closeMenu: 'Fermer le menu de navigation',
      skipToContent: 'Aller au contenu',
    },
    langSwitcher: {
      groupLabel: 'Choix de la langue',
      switchToEn: 'Passer le site en anglais',
      switchToFr: 'Switch language to French',
    },
    nav: {
      home: 'Accueil',
      about: 'À propos',
      services: 'Nos Services',
      team: 'Notre Équipe',
      process: 'Notre Processus',
      contact: 'Contact',
      ariaHome: 'Aller à la page d’accueil',
      ariaAbout: 'Aller à la page À propos',
      ariaServices: 'Accéder au catalogue des services d’ingénierie',
      ariaTeam: 'Aller à la page Direction et Équipe',
      ariaProcess: 'Aller à la page Notre processus d’ingénierie',
      ariaContact: 'Aller à la page Contact',
      desktopNavLabel: 'Navigation principale du site',
      mobileNavLabel: 'Navigation principale mobile',
      mobileDrawerLabel: 'Menu de navigation du site',
      logoAriaLabel: 'MarveThabi Consulting Engineers Accueil',
      linkedInAriaLabel: 'Visiter MarveThabi Consulting Engineers sur LinkedIn (nouvel onglet)',
      downloadAriaLabel: 'Télécharger la plaquette d’entreprise MarveThabi en PDF (nouvel onglet)',
    },
    footer: {
      tagline: 'Infrastructures nationales. Excellence technique. Confiance institutionnelle.',
      companyHeading: 'Entreprise',
      contactHeading: 'Contact',
      logoAlt: 'Logo MarveThabi Consulting Engineers - Ingénieurs-conseils agréés à Pretoria',
      logoAriaLabel: 'MarveThabi Consulting Engineers - Retour à l’accueil',
      emailAria: 'Envoyer un e-mail à MarveThabi à info@marvethabi.co.za',
      phone1Aria: 'Appeler MarveThabi au +27 82 412 3847',
      phone2Aria: 'Appeler MarveThabi au +27 72 834 7953',
      linkedInAria: 'Visiter le profil LinkedIn de MarveThabi (nouvel onglet)',
    },
    errorBoundary: {
      title: 'Impossible d’afficher la fiche technique',
      message: 'Une erreur d’interface inattendue est survenue lors du chargement de cette page.',
      button: 'Retour à l’accueil',
    },
    home: {
      heroRegEcsa: 'Agréé ECSA',
      heroRegSacnasp: 'Agréé SACNASP',
      heroRegCsd: 'CSD : Actif',
      heroTitle: 'Solutions intégrées d’ingénierie et d’environnement pour bâtir l’Afrique et au-delà',
      heroSubtitle:
        'Prestations spécialisées en ingénierie de la fiabilité, gestion d’actifs, génie électrique et géo-environnement pour les gouvernements, municipalités, industries minières, secteur énergétique et sites industriels.',
      heroExploreAria: 'Découvrir notre catalogue de services d’ingénierie et d’environnement',
      heroConsultAria: 'Demander une consultation technique avec nos ingénieurs agréés',
      clientsHeading: 'Nos Clients',
      clientToggleGroupAria: 'Mode d’affichage des logos clients',
      scrollView: 'Vue défilante',
      scrollViewAria: 'Afficher les logos clients en défilement continu',
      scrollViewTitle: 'Animation de défilement continu',
      gridView: 'Vue grille (14)',
      gridViewAria: 'Afficher les 14 logos clients en grille',
      gridViewTitle: 'Voir les 14 clients en grille',
      scrollingClientsAria: 'Bandeau défilant des clients',
      gridClientsAria: 'Grille des 14 logos clients',
      clientLogoAltSuffix: 'logo - client MarveThabi',
      industriesHeading: 'Secteurs d’intervention',
      industriesSubtitle:
        'Un appui spécialisé pour les secteurs stratégiques qui soutiennent l’économie. Cliquez sur un secteur pour découvrir notre champ d’action.',
      industryAriaPrefix: 'Découvrir l’apport des services d’ingénierie MarveThabi pour le secteur',
      industryTitlePrefix: 'Découvrir nos solutions pour le secteur',
      contactHeading: 'Démarrer un projet',
      contactLead:
        'De l’électrification municipale aux stratégies d’actifs miniers, la première étape commence par un échange avec un ingénieur agréé.',
      officeLabel: 'Siège social',
      enquiriesLabel: 'Demandes & Contacts',
      registrationsLabel: 'Agréments professionnels',
      registrationsLine: 'ECSA · SACNASP · CIDB · CSD',
      formFullName: 'Nom complet',
      formFullNamePlaceholder: 'Votre nom complet',
      formOrganisation: 'Organisation',
      formOrganisationPlaceholder: 'Ministère, municipalité ou entreprise',
      formEmail: 'Adresse e-mail',
      formEmailPlaceholder: 'vous@organisation.com',
      formPhone: 'Téléphone',
      formPhonePlaceholder: '+243 / +27',
      formService: 'Service requis',
      formServicePlaceholder: 'Sélectionnez une discipline',
      formDetails: 'Détails du projet',
      formDetailsPlaceholder: 'Périmètre technique, localisation du site et échéancier',
      formSubmit: 'Envoyer la demande',
      formSubmitting: 'Envoi en cours...',
      formSubmitAria: 'Envoyer la demande de projet à nos ingénieurs agréés',
      formRequiredError:
        'Votre demande n’a pas pu être envoyée. Veuillez vérifier les champs obligatoires et réessayer.',
      formFallbackError: 'Votre demande n’a pas pu être envoyée. Veuillez réessayer.',
      formSuccessDelivered:
        'Merci. Votre demande (Réf. : {ref}) a été transmise à {email}. Un ingénieur agréé vous répondra sous un jour ouvrable.',
      formSuccessLogged:
        'Merci. Votre demande (Réf. : {ref}) a bien été enregistrée et transmise à notre équipe d’ingénierie. Un ingénieur agréé vous répondra sous un jour ouvrable.',
      formGenericSuccess: 'Merci. Un ingénieur agréé vous répondra sous un jour ouvrable.',
      formDefaultSubjectSuffix: 'Demande de projet via la page d’accueil',
      formDefaultDetailsPrefix: 'Demande de consultation soumise depuis la page d’accueil pour',
    },
    accreditation: {
      sectionAria: 'Nos accréditations',
      title: 'NOS ACCRÉDITATIONS',
      lead1:
        'Nous nous engageons à respecter les normes les plus strictes en matière de qualité, de sécurité et de gestion environnementale.',
      lead2:
        'Nos accréditations attestent de notre conformité rigoureuse aux réglementations sectorielles et aux meilleures pratiques internationales.',
      iso9001Title: 'ISO 9001',
      iso9001Desc: 'Management de la qualité',
      iso45001Title: 'ISO 45001',
      iso45001Desc: 'Santé et sécurité au travail',
      iso14001Title: 'ISO 14001',
      iso14001Desc: 'Management environnemental',
      footerNote:
        'Ces accréditations témoignent de notre engagement continu envers l’excellence opérationnelle, la durabilité et la satisfaction de nos parties prenantes.',
      photoAlt:
        'Certificats encadrés ISO 9001, ISO 45001 et ISO 14001 de MarveThabi avec casque de sécurité',
    },
    affiliations: {
      sectionAria: 'Affiliations professionnelles',
      title: 'Ordres statutaires et instituts professionnels',
      subtitle:
        'Nos ingénieurs et scientifiques disposent d’une inscription active et en règle auprès des ordres statutaires et instituts professionnels régissant la pratique technique et scientifique en Afrique du Sud.',
      logoAltSuffix: 'logo - agrément statutaire professionnel',
    },
    about: {
      heroTitle: 'À propos de MarveThabi Consulting Engineers',
      heroSubtitle:
        'Solutions intégrées d’ingénierie et de conseil en ingénierie de la fiabilité, gestion d’actifs, génie électrique, surveillance conditionnelle et gestion environnementale.',
      eyebrow: 'À PROPOS',
      introHeading: 'Expertise technique. Expérience de terrain. Excellence professionnelle.',
      introP1:
        'MarveThabi Consulting Engineers (MCE) est un cabinet de conseil multidisciplinaire spécialisé dans les services d’ingénierie et d’environnement. Nos domaines d’expertise couvrent l’ingénierie de la fiabilité, la gestion des actifs physiques, le génie électrique, la maintenance conditionnelle, la gestion environnementale et la conformité réglementaire.',
      introP2:
        'Fondé pour répondre à la demande croissante d’expertise technique et environnementale spécialisée, MCE accompagne des clients des secteurs minier, industriel, des services publics et des infrastructures. Nous fournissons des prestations rigoureuses répondant aux défis techniques, aux risques environnementaux, aux exigences réglementaires et à la gestion durable des ressources.',
      introP3:
        'Notre approche repose sur une maîtrise technique éprouvée, une solide expérience industrielle, l’évaluation scientifique et la prise de décision fondée sur les risques. Nous nous engageons à fournir des prestations fiables, conformes aux normes et respectueuses de l’environnement, adaptées aux réalités opérationnelles de nos clients.',
      collageAlt:
        'Activités multidisciplinaires de MarveThabi : ingénierie industrielle, exploitation minière à ciel ouvert, installations de traitement et durabilité environnementale',
      expertiseHeading: 'NOS DOMAINES D’EXPERTISE CLÉS',
      expertiseLabels: {
        reliability: 'Ingénierie de la fiabilité',
        assetManagement: 'Gestion des actifs',
        electrical: 'Génie électrique',
        conditionMonitoring: 'Surveillance conditionnelle',
        environmental: 'Gestion environnementale',
      },
      visionMissionHeading: 'VISION ET MISSION',
      visionTitle: 'VISION',
      visionText:
        'Être un cabinet de conseil en ingénierie multidisciplinaire de premier plan en Afrique, reconnu pour son excellence technique, son intégrité et la création de valeur durable.',
      missionTitle: 'MISSION',
      missionText:
        'Fournir des solutions d’ingénierie et de gestion environnementale conformes, fiables et durables qui améliorent la performance des actifs, la sécurité et l’efficacité opérationnelle de nos clients.',
      valuesHeading: 'NOS VALEURS',
      values: {
        integrityTitle: 'INTÉGRITÉ',
        integrityText:
          'Nous agissons avec honnêteté, transparence et déontologie professionnelle dans chacune de nos interventions.',
        excellenceTitle: 'EXCELLENCE',
        excellenceText:
          'Nous sommes déterminés à fournir des solutions de haute qualité et à viser l’amélioration continue.',
        partnershipTitle: 'PARTENARIAT',
        partnershipText:
          'Nous bâtissons des relations durables et collaborons étroitement avec nos clients et parties prenantes.',
        sustainabilityTitle: 'DURABILITÉ',
        sustainabilityText:
          'Nous privilégions des solutions techniquement performantes, écologiquement responsables et économiquement viables.',
      },
      taglineStripAria: 'Devise de l’entreprise',
      taglineStripText: 'SOLUTIONS D’INGÉNIERIE. ACTIFS FIABLES. AVENIR DURABLE.',
    },
    servicesPage: {
      heroTitle: 'Conseil en ingénierie et environnement',
      heroP1:
        'MarveThabi Consulting Engineers accompagne les organisations dans l’amélioration de la fiabilité, de la disponibilité et de la maintenabilité de leurs actifs grâce à des méthodologies d’ingénierie structurées et fondées sur les données.',
      heroP2:
        'Nos prestations sont conçues pour réduire les arrêts imprévus, optimiser l’efficacité de la maintenance, maîtriser les risques opérationnels et prolonger la durée de vie des équipements tout au long de leur cycle de vie.',
      quickJumpAria: 'Accès rapide aux catégories de services',
      jumpToPrefix: 'Aller au groupe',
      directoryLabel: 'Répertoire',
      directoryAria: 'Répertoire des services',
      navigateToPrefix: 'Accéder à',
      photoAriaSuffix: 'photographie du service',
      readMoreAriaPrefix: 'Consulter les spécifications techniques et livrables pour',
      affiliationsTitle: 'Affiliations professionnelles',
      affiliationsSubtitle:
        'Nos ingénieurs et scientifiques sont dûment inscrits auprès des ordres statutaires qui régissent l’exercice de l’ingénierie et des sciences naturelles.',
      affiliationsAltSuffix: 'logo - agrément professionnel',
      ctaTitle: 'Cadrer votre projet avec un ingénieur',
      ctaSubtitle:
        'Transmettez votre besoin et recevez une réponse techniquement structurée de la part d’un professionnel agréé.',
      ctaAria: 'Demander une consultation technique avec nos ingénieurs agréés',
    },
    serviceDetail: {
      disciplineSuffix: 'Discipline',
      standardsTag: 'Conforme aux normes statutaires',
      specsSidebarAria: 'Spécifications techniques',
      objectiveHeading: 'Objectif d’ingénierie et périmètre',
      capabilitiesHeading: 'Capacités et prestations clés',
      approachHeading: 'Approche technique et exécution',
      outcomeHeading: 'Résultats et valeur opérationnelle',
      governingStandardsHeading: 'Normes et référentiels applicables',
      applicableSectorsHeading: 'Secteurs d’application',
      relatedServicesHeading: 'Services connexes',
      relatedServicesAria: 'Services associés',
      technicalEnquiryHeading: 'Demande technique',
      technicalEnquiryText:
        'Échangez directement sur votre cahier des charges ou vos exigences de conformité avec nos professionnels agréés.',
      ctaTitle: 'Cadrer votre projet avec un ingénieur',
      ctaSubtitle:
        'Présentez votre exigence technique et recevez un cadrage structuré établi par nos ingénieurs et scientifiques agréés.',
      photoAriaSuffix: 'photographie du service',
      altMiddleText: 'Livrable technique MarveThabi en',
    },
    industriesPage: {
      heroTitle: 'Secteurs industriels et infrastructures',
      heroSubtitle:
        'De l’extraction minière en profondeur aux réseaux de distribution municipaux, MarveThabi déploie des ingénieurs et scientifiques agréés parfaitement adaptés aux exigences réglementaires de chaque secteur.',
      heroTags: [
        'Mines & Ressources minérales',
        'Infrastructures municipales majeures',
        'Réseaux électriques & Énergie',
        'Industrie manufacturière',
      ],
      breakdownTitle: 'Analyse d’ingénierie par secteur',
      breakdownSubtitle:
        'Méthodologies d’ingénierie et d’environnement sur mesure face aux risques opérationnels spécifiques de chaque filière.',
      challengesLabel: 'Défis majeurs résolus',
      disciplinesLabel: 'Disciplines clés déployées',
      whereFitLink: 'Voir notre intervention dans ce secteur →',
      trustedTitle: 'La confiance des leaders industriels et publics en Afrique australe',
      ctaTitle: 'Échanger sur les besoins de votre secteur',
      ctaSubtitle:
        'Nos ingénieurs agréés fournissent un cadrage technique sectoriel et des feuilles de route réglementaires adaptées.',
    },
    industryDetail: {
      tagDomain: 'Domaine d’infrastructure critique',
      tagAlignment: 'Intégration d’ingénierie multidisciplinaire',
      eyebrow: 'INTÉGRATION OPÉRATIONNELLE ET RÉGLEMENTAIRE',
      fitHeadingPrefix: 'Notre intervention dans le secteur :',
      disciplinePrefix: 'DISCIPLINE',
      serviceLinesSuffix: 'LIGNES DE SERVICES',
      statutoryDeliverable: 'LIVRABLE STATUTAIRE',
      viewDetailsPrefix: 'Voir les détails :',
      viewDetailsSuffix: '→',
      risksEyebrow: 'RISQUES OPÉRATIONNELS ET RÉGLEMENTAIRES',
      challengesHeading: 'Principaux défis sectoriels que nous résolvons',
      advantagesEyebrow: 'AVANTAGES MESURABLES',
      outcomesHeading: 'Résultats cibles délivrés',
      standardsHeading: 'Normes statutaires et autorités de régulation applicables',
      standardsSubtitlePrefix:
        'Chaque étude d’ingénierie, registre d’actifs et rapport environnemental destiné au secteur',
      standardsSubtitleSuffix: 'est réalisé dans le strict respect des cadres normatifs et légaux.',
      ctaEyebrow: 'CONSEIL SECTORIEL ET MANDATS',
      ctaHeading: 'Collaborez avec nos spécialistes agréés',
      ctaSubtitle:
        'Discutez de votre projet d’infrastructure, d’audit de conformité ou de gestion d’actifs avec les ingénieurs et scientifiques agréés de MarveThabi.',
      otherEyebrow: 'SPÉCIALISATION INTERSECTORIELLE',
      otherHeading: 'Découvrir les autres secteurs accompagnés',
    },
    leadershipPage: {
      heroTitle: 'Direction et gouvernance du cabinet',
      heroSubtitle:
        'Une ingénierie responsable exige des professionnels certifiés et statutairement habilités. Notre cabinet est dirigé personnellement par des ingénieurs et scientifiques agréés qui engagent directement leur responsabilité sur chaque livrable.',
      teamHeading: 'Notre équipe de direction',
      teamSubtitle:
        'Découvrez les directeurs qui pilotent la précision technique, la gouvernance réglementaire et la gestion environnementale en Afrique et à l’international.',
      viewFullProfile: 'Voir le profil complet',
      governanceHeading: 'Code statutaire de déontologie professionnelle',
      governanceSubtitle:
        'Notre engagement en faveur de l’intégrité technique, de la gestion environnementale et de la sécurité publique.',
      govCards: [
        {
          title: 'Code de pratique ECSA',
          description:
            'Tous les plans techniques, schémas unifilaires et spécifications de sous-stations sont établis en stricte conformité avec les règles professionnelles de l’ECSA, les normes SANS et les directives légales de santé et sécurité.',
        },
        {
          title: 'Rigueur scientifique SACNASP',
          description:
            'Les évaluations environnementales, modélisations hydrogéologiques et classifications des déchets sont menées avec une rigueur scientifique irréprochable, selon des protocoles évalués par des pairs et les normes sur l’eau.',
        },
        {
          title: 'Gouvernance ISO 55000 & Sécurité',
          description:
            'Nos référentiels de gestion d’actifs, stratégies de maintenance et supervisions de chantier s’appuient sur la norme ISO 55000 et sur des protocoles de gestion SST certifiés SAMTRAC.',
        },
      ],
      councilsHeading: 'Ordres statutaires et instituts professionnels',
      ctaHeading: 'Consultation directe avec nos directeurs',
      ctaSubtitle:
        'Planifiez une consultation technique de haut niveau pour analyser vos besoins directement avec nos directeurs.',
    },
    leaderDetail: {
      notFoundTitle: 'Profil du directeur introuvable',
      notFoundText:
        'Le profil de direction demandé n’existe pas ou a été déplacé.',
      companySuffix: 'MarveThabi Consulting Engineers',
      highlightsLabel: 'Points forts du profil',
      sectorsLabel: 'Secteurs d’activité clés',
      executiveBioHeading: 'Biographie de direction',
      qualificationsHeading: 'Diplômes et certifications professionnelles',
      expertiseHeading: 'Domaines d’expertise',
      projectExpHeading: 'Expérience technique et réalisations clés',
      focusHeading: 'Priorités professionnelles et engagement de valeur',
      consultWithPrefix: 'Consulter',
      photoAltMiddle: 'chez MarveThabi Consulting Engineers',
    },
    processPage: {
      heroTitle: 'Cycle de réalisation des projets',
      heroSubtitle:
        'Une méthodologie rigoureuse et traçable, de la consultation initiale et des diagnostics de terrain jusqu’aux plans CAO détaillés, à la supervision des travaux et à l’optimisation durable des actifs.',
      heroTags: [
        'Assurance qualité par jalons',
        'Conformité SANS & ISO 55000',
        'Supervision professionnelle statutaire',
        'Mise en service & Réception',
      ],
      sectionHeading: 'Architecture d’exécution de bout en bout',
      sectionSubtitle:
        'Chaque mission d’ingénierie et d’environnement suit ce processus structuré, transparent et responsable.',
      phasePrefix: 'PHASE',
      activitiesHeading: 'Activités principales d’ingénierie et d’environnement',
      deliverableHeading: 'Livrable principal',
      qualityBadge: 'Qualité vérifiée & Prêt pour approbation',
      ctaHeading: 'Lancer la Phase 01 de votre projet',
      ctaSubtitle:
        'Contactez nos ingénieurs principaux pour planifier une consultation technique exploratoire.',
    },
    contactPage: {
      heroTitle: 'Contactez-nous',
      heroSubtitle:
        'Adressez directement votre besoin technique à l’ingénieur ou au scientifique agréé responsable de la discipline concernée. Notre équipe assure une prise en charge réactive et une évaluation réglementaire rigoureuse.',
      badgePrefix: '✓ Demande transmise directement à',
      refPrefix: 'Réf. :',
      thankYouPrefix: 'Merci,',
      confirmationIntro:
        'Votre demande concernant « {category} » a été envoyée directement depuis ce formulaire à {email} et orientée vers {contact} ({responsibility}).',
      summaryHeading: 'Récapitulatif de la demande',
      labelFullName: 'Nom complet :',
      labelOrganisation: 'Organisation :',
      labelEmail: 'Adresse e-mail :',
      labelPhone: 'Téléphone :',
      labelServiceCategory: 'Catégorie de service :',
      labelSubject: 'Objet :',
      labelDetails: 'Détails :',
      notSpecified: 'Non précisé',
      notProvided: 'Non renseigné',
      deliveryStatusLabel: 'Statut d’envoi :',
      submitAnother: 'Soumettre une autre demande',
      openEmailClient: 'Ouvrir votre messagerie',
      openEmailClientTitle: 'Ouvrir un brouillon pré-rempli dans votre client de messagerie',
      formOrgLabel: 'Entreprise / Organisation',
      formNamePlaceholder: 'ex. : Jean Kabongo',
      formOrgPlaceholder: 'ex. : Société minière / Municipalité / Entreprise',
      formEmailLabel: 'Adresse e-mail',
      formEmailPlaceholder: 'ex. : j.kabongo@entreprise.com',
      formPhoneLabel: 'Numéro de téléphone',
      formPhonePlaceholder: 'ex. : +243 81 000 0000 / +27 82 000 0000',
      formServiceLabel: 'Service requis',
      directedToLabel: 'Votre demande sera directement orientée vers :',
      formSubjectLabel: 'Objet de la demande',
      formSubjectPlaceholder: 'Résumé bref de votre demande',
      formDetailsLabel: 'Détails de la demande',
      formDetailsPlaceholder:
        'Veuillez préciser vos exigences techniques, le périmètre du projet, la localisation du site ou vos objectifs opérationnels...',
      submitButtonIdle: 'Envoyer directement à info@marvethabi.co.za',
      submitButtonBusy: 'Envoi vers info@marvethabi.co.za...',
      validationFullName: 'Veuillez saisir votre nom complet.',
      validationEmailRequired: 'Veuillez saisir votre adresse e-mail.',
      validationEmailInvalid: 'Veuillez fournir une adresse e-mail valide.',
      validationSubject: 'Veuillez saisir l’objet de votre demande.',
      validationDetailsRequired: 'Veuillez décrire le périmètre de votre projet ou vos besoins.',
      validationDetailsMin:
        'Veuillez fournir au moins 10 caractères de précisions pour l’évaluation technique.',
      deliveredMessage: 'Demande transmise directement à {email}.',
      loggedMessage:
        'Demande enregistrée sous la référence {ref} et orientée vers {contact} ({email}). Un spécialiste agréé vous répondra sous un jour ouvrable.',
      fallbackErrorNotice:
        'La transmission directe par le serveur est indisponible ; la demande a été enregistrée localement.',
      fallbackStatusMessage:
        'Demande enregistrée sous la référence {ref} et attribuée à {contact}. Vous pouvez également l’envoyer directement via votre client de messagerie ci-dessous.',
      sidebarAria: 'Coordonnées du cabinet',
      directChannelsHeading: 'Canaux de contact directs',
      emailHeading: 'E-mail',
      telephoneHeading: 'Téléphone',
      phone1Note: '(Ingénierie / Marvelous Ngoatle)',
      phone2Note: '(Environnement / Thabang Ngoatle)',
      hoursHeading: 'Heures d’ouverture',
      hoursValue: 'Lundi – Vendredi : 08h00 – 17h00 SAST',
      linkedInHeading: 'Profil LinkedIn officiel',
      linkedInLinkText: 'MarveThabi sur LinkedIn →',
      headOfficeHeading: 'Siège social du cabinet',
      headOfficeAddress:
        'Unit 68 Saliehout Street, Stenostelma, Annlin, Pretoria 0182, Gauteng, Afrique du Sud',
      credentialsHeading: 'Agréments statutaires',
      credentials: [
        { label: 'Statut B-BBEE :', value: 'Niveau 1 (135 % de reconnaissance)' },
        { label: 'Ordre des ingénieurs :', value: 'Agréé ECSA' },
        { label: 'Sciences naturelles :', value: 'Agréé SACNASP' },
        { label: 'Registre constructeurs :', value: 'Agréé CIDB' },
        { label: 'Fournisseur public :', value: 'Enregistré CSD' },
      ],
    },
  },
};
