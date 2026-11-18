import {
  ServiceSummary,
  DedicatedService,
} from '../../data/marvethabi';

export const servicesDataFr: Record<string, Partial<ServiceSummary>> = {
  'RE-01': {
    title: 'Ingénierie de la fiabilité',
    items: [
      'Criticité des actifs',
      'Analyse des causes racines (RCFA)',
      'Surveillance conditionnelle',
      'Stratégies d’actifs',
      'ISO 55000',
    ],
  },
  'AM-02': {
    title: 'Gestion des actifs',
    items: [
      'Gestion du cycle de vie',
      'Registres d’actifs',
      'Jumeaux numériques',
      'Données de référence',
      'Gestion de la performance',
    ],
  },
  'EE-03': {
    title: 'Génie électrique',
    items: [
      'Transport d’énergie',
      'Réseaux de distribution',
      'Sous-stations électriques',
      'Éclairage public',
      'Groupes électrogènes',
      'Solaire photovoltaïque',
    ],
  },
  'GE-04': {
    title: 'Géo-environnement',
    items: [
      'Études environnementales',
      'Hydrogéologie',
      'Licences d’utilisation d’eau',
      'Audits environnementaux',
      'Gestion des déchets',
      'Conformité réglementaire',
    ],
  },
};

export const affiliationsDataFr: Record<string, string> = {
  'cidb-construction-industry-development-board-logo.png':
    'Construction Industry Development Board (cidb)',
  'sacnasp-logo.png':
    'Conseil sud-africain des professions des sciences naturelles (SACNASP)',
  'electrical-contractors-association-eca-logo.png':
    'Association des entrepreneurs en électricité (ECA)',
  'saiee-logo.png':
    'Institut sud-africain des ingénieurs électriciens (SAIEE)',
  'ecsa-engineering-council-of-south-africa-logo.png':
    'Conseil de l’ingénierie d’Afrique du Sud (ECSA)',
};

export const serviceAltMapFr: Record<string, string> = {
  'RE-01':
    'Spécialiste en ingénierie de la fiabilité réalisant une analyse vibratoire et des essais diagnostiques sur des machines tournantes industrielles',
  'AM-02':
    'Vérification physique des actifs, calcul du coût du cycle de vie et structuration hiérarchique des registres d’actifs selon ISO 55000',
  'CM-01':
    'Technicien en surveillance conditionnelle utilisant la thermographie infrarouge et les contrôles ultrasonores sur des équipements électriques et mécaniques en service',
  'EC-03':
    'Entrepreneur électricien installant des tableaux de distribution commerciaux, un groupe électrogène de secours et des réseaux de câbles moyenne/basse tension',
  'EE-04':
    'Infrastructure de sous-station électrique haute tension, lignes aériennes de transport et réseau de distribution municipal',
  'ME-05':
    'Maintenance d’engins miniers lourds, pompes d’exhaure de fosse et ingénierie des infrastructures d’usine de traitement minéralurgique',
  'PM-06':
    'Chefs de projet en ingénierie examinant des plans d’exécution et spécifications techniques lors d’un contrôle qualité sur site',
  'GE-04':
    'Scientifique environnemental effectuant des prélèvements d’eau et la gestion des ressources de bassin versant en milieu naturel',
  'WS-06':
    'Classification des déchets industriels, équipements de suivi des émissions et audit de conformité environnementale des déchets',
  'WM-05':
    'Hydrogéologue contrôlant le débit d’un forage et la qualité des eaux souterraines pour la conformité WULA',
  'AQ-07':
    'Station de surveillance de la qualité de l’air équipée de jauges de retombées de poussières et d’appareils d’analyse des émissions atmosphériques',
  'GG-08':
    'Suivi des émissions de gaz à effet de serre, calcul de l’empreinte carbone et instrumentation de déclaration réglementaire NAEIS',
  'HS-09':
    'Hydrogéologue menant un levé géophysique de résistivité et des essais de pompage pour la caractérisation des aquifères',
  'GS-10':
    'Géologue réalisant le carottage lithologique, l’analyse structurale de fondation et la cartographie géotechnique du sous-sol',
  'SS-11':
    'Géomètre-topographe opérant une station totale électronique de haute précision et un récepteur GNSS RTK pour le levé topographique du site',
  'AP-10':
    'Consultant environnemental élaborant des dossiers d’EIE, de PGES et d’autorisations environnementales pour la conformité réglementaire',
  'CA-11':
    'Agent de contrôle environnemental (ECO) inspectant les ouvrages de drainage sur site et réalisant un biosuivi aquatique',
  'ER-12':
    'Réhabilitation environnementale de sites miniers incluant la dépollution des sols et la revégétalisation par espèces indigènes',
};

export interface ServiceGroupTranslation {
  title: string;
  intro: string;
  services: Record<
    string,
    {
      title: string;
      desc: string;
      items: string[];
    }
  >;
}

export const serviceGroupsDataFr: Record<string, ServiceGroupTranslation> = {
  'engineering-services': {
    title: 'Services d’ingénierie',
    intro:
      'Ingénierie de la fiabilité, gestion d’actifs, génie électrique et ingénierie minière délivrés selon les normes ISO 55000, SANS et les codes des réseaux publics, de l’atelier industriel au réseau municipal.',
    services: {
      'RE-01': {
        title: 'Ingénierie de la fiabilité et surveillance',
        desc: 'Des programmes conditionnels qui détectent les défaillances avant qu’elles n’affectent l’usine.',
        items: [
          'Facilitation et mise en œuvre de la maintenance basée sur la fiabilité (RCM / MBF).',
          'Analyse de criticité des actifs afin de hiérarchiser les équipements selon le risque, la sécurité, le coût et l’impact sur la production.',
          'Analyse des modes de défaillance et de leurs effets (AMDE / FMEA) pour identifier et atténuer proactivement les risques de panne.',
          'Élaboration de stratégies de maintenance et de tactiques d’actifs alignées sur les objectifs opérationnels et la valeur métier.',
          'Analyse des causes racines de défaillance (RCFA) pour identifier, analyser et éliminer les pannes récurrentes à fort impact.',
        ],
      },
      'AM-02': {
        title: 'Services de gestion des actifs',
        desc: 'Des référentiels ISO 55000 assurant la maîtrise de chaque actif, du registre au jumeau numérique.',
        items: [
          'Élaboration de cadres de gestion d’actifs conformes à la norme ISO 55000',
          'Planification et ordonnancement de la maintenance',
          'Registres d’actifs, arborescences techniques et données de référence',
          'Analyse des coûts du cycle de vie (LCC) et des risques',
          'Mesure de performance des actifs et étalonnage (benchmarking)',
          'Identification, vérification et validation physique des actifs',
        ],
      },
      'CM-01': {
        title: 'Surveillance conditionnelle',
        desc: 'Détection précoce des anomalies, contrôles non destructifs et diagnostics de précision des équipements.',
        items: [
          'Analyse vibratoire et diagnostic des machines tournantes',
          'Prélèvement d’huiles et analyse de condition des lubrifiants',
          'Thermographie infrarouge des installations électriques et mécaniques',
          'Analyse des circuits moteurs (MCA) et analyse des gaz dissous (DGA) des transformateurs',
          'Contrôles non destructifs (CND / NDT) et mesure d’épaisseur par ultrasons',
          'Suivi de la dégradation des équipements et recommandations de maintenance',
        ],
      },
      'EC-03': {
        title: 'Construction et entreprise électrique',
        desc: 'Installation, mise en service et certification réglementaire pour sites résidentiels, commerciaux et industriels.',
        items: [
          'Installation, mise en service, maintenance et réparation de groupes électrogènes',
          'Installation, mise en service, maintenance et réparation de systèmes solaires photovoltaïques',
          'Travaux de câblage électrique pour installations commerciales et industrielles',
          'Recherche de défauts électriques et essais diélectriques',
          'Délivrance de certificats de conformité électrique (COC)',
          'Détection de défauts de câbles et essais par générateur d’ondes de choc',
        ],
      },
      'EE-04': {
        title: 'Génie électrique et électronique',
        desc: 'Ingénierie des infrastructures électriques, de la ligne de transport au réseau de distribution urbain.',
        items: [
          'Conception et développement d’infrastructures électriques',
          'Conception de réseaux de réticulation et de distribution d’énergie',
          'Études de réseaux de distribution municipaux et de zones urbaines',
          'Conception d’éclairage public et d’éclairage de zones industrielles',
          'Conception de systèmes d’alimentation de secours — groupes électrogènes et onduleurs (ASI/UPS)',
          'Protection contre la foudre, mise à la terre, contrôle d’accès et systèmes d’alarme incendie',
        ],
      },
      'ME-05': {
        title: 'Services d’ingénierie minière',
        desc: 'Appui d’ingénierie spécialisé pour les mines à ciel ouvert, souterraines et les usines de traitement.',
        items: [
          'Stratégies de fiabilité et de maintenance des engins miniers lourds',
          'Ingénierie des systèmes d’exhaure de fosse, de pompage de pulpe et d’eau de mine',
          'Gestion et optimisation des actifs des usines de traitement minéralurgique',
          'Réseaux électriques miniers, sous-stations et systèmes d’appareillage HT/MT',
          'Ingénierie de conformité réglementaire en santé et sécurité minières',
          'Appui au démantèlement des infrastructures lors de la fermeture de mine',
        ],
      },
      'SS-11': {
        title: 'Services de topographie et d’arpentage',
        desc: 'Levés topographiques et d’ingénierie de haute précision pour la conception et la construction.',
        items: [
          'Levés topographiques et d’ingénierie de sites',
          'Délimitation cadastrale et tracé de servitudes',
          'Levés de récolement (tel que construit) et calculs volumétriques de stocks/excavations',
          'Modélisation numérique de terrain (MNT) et cartographie en courbes de niveau',
          'Implantation de chantier et suivi des déformations d’ouvrages',
        ],
      },
      'PM-06': {
        title: 'Développement et gestion de projets',
        desc: 'Pilotage technique complet des projets d’infrastructure, de l’avant-projet à la mise en service.',
        items: [
          'Développement de projets, cadrage technique et études de faisabilité',
          'Gestion de projets d’ingénierie et supervision des travaux de construction',
          'Administration de contrats et assurance qualité / contrôle qualité (AQ/CQ)',
          'Coordination de la conformité réglementaire et de l’obtention des permis',
          'Budgétisation, maîtrise des coûts et suivi des jalons d’avancement',
          'Réception, dossiers des ouvrages exécutés (DOE) et transfert opérationnel',
        ],
      },
    },
  },
  'environmental-services': {
    title: 'Services environnementaux',
    intro: '',
    services: {
      'WS-06': {
        title: 'Gestion des déchets',
        desc: 'Classification, autorisation et plans directeurs transformant les passifs déchets en filières maîtrisées.',
        items: [
          'Audit de conformité des licences de gestion des déchets',
          'Autorisation et classification des déchets selon les normes NEM:WA',
          'Plans intégrés de gestion des déchets (IWMP / PIGD)',
          'Audits de performance des stations d’épuration et conformité des effluents',
        ],
      },
      'WM-05': {
        title: 'Gestion de l’eau',
        desc: 'De la demande d’autorisation d’utilisation d’eau au suivi à long terme des eaux souterraines et de surface.',
        items: [
          'Demandes d’autorisation et de licences d’utilisation d’eau (WULA)',
          'Plans de conservation et de gestion de la demande en eau (WC/WDM)',
          'Plans intégrés de gestion de l’eau et des déchets (IWWMP)',
          'Surveillance de la qualité des eaux souterraines et de surface',
          'Études hydrologiques spécialisées et bilans hydriques de bassin pour EIE',
        ],
      },
      'AQ-07': {
        title: 'Gestion de la qualité de l’air',
        desc: 'Poussières, émissions atmosphériques et nuisances sonores mesurées, déclarées et conformes.',
        items: [
          'Surveillance des retombées de poussières',
          'Autorisation et licences d’émissions atmosphériques (AEL)',
          'Plan de gestion de la qualité de l’air',
          'Mesures et suivi du bruit environnemental',
        ],
      },
      'GG-08': {
        title: 'Gestion des gaz à effet de serre',
        desc: 'Comptabilité carbone et déclarations nationales établies avec une précision décimale.',
        items: [
          'Calculs d’empreinte carbone (bilans GES)',
          'Déclarations réglementaires NAEIS',
          'Stratégies de gestion et de réduction des gaz à effet de serre',
          'Surveillance des retombées de poussières',
          'Demandes et révisions de licences d’émissions atmosphériques (AEL)',
        ],
      },
    },
  },
  'specialist-studies': {
    title: 'Études spécialisées',
    intro:
      'Hydrogéologie, autorisations réglementaires, audits, géologie et réhabilitation : l’expertise spécialisée qui débloque et clôture vos projets.',
    services: {
      'GS-10': {
        title: 'Services géologiques',
        desc: 'Reconnaissances géologiques du sous-sol, classification des massifs rocheux et profils structuraux.',
        items: [
          'Cartographie géologique et caractérisation du sous-sol',
          'Description lithologique et structurale des carottes de forage',
          'Études géotechniques de fondation et de stabilité des talus',
          'Identification et délimitation des horizons minéralisés',
          'Atténuation des risques géologiques pour infrastructures civiles et minières',
        ],
      },
      'AP-10': {
        title: 'Autorisations, permis et licences environnementales',
        desc: 'Le parcours complet d’autorisation, de l’EIE aux droits miniers, géré de bout en bout.',
        items: [
          'Demandes de licences d’utilisation d’eau (WULA)',
          'Études d’impact environnemental et social (Notice / Cadrage & EIES)',
          'Programmes de gestion environnementale (PGES / EMPr)',
          'Permis et licences de gestion des déchets',
          'Appui aux droits miniers, droits de prospection et permis d’exploitation',
          'Processus de participation du public et concertation des parties prenantes',
        ],
      },
      'CA-11': {
        title: 'Audits de conformité environnementale et suivi',
        desc: 'Des audits indépendants qui identifient les écarts avant l’intervention du régulateur.',
        items: [
          'Audits de conformité des licences d’utilisation d’eau',
          'Audits des licences de gestion des déchets',
          'Audits de performance des stations d’épuration des eaux usées',
          'Supervision de chantier par agent de contrôle environnemental (ECO)',
          'Biosuivi écologique (macro-invertébrés aquatiques et santé des écosystèmes)',
          'Surveillance réglementaire continue de la conformité environnementale',
        ],
      },
      'ER-12': {
        title: 'Réhabilitation environnementale et gestion des risques',
        desc: 'Restaurer les terrains perturbés vers un état stable, conforme et productif.',
        items: [
          'Plans de réhabilitation et d’actions correctives pour terrains perturbés et miniers',
          'Évaluation, délimitation et dépollution des sols contaminés',
          'Plans de mise en œuvre des stratégies de réhabilitation (RSIP)',
          'Analyse des risques de réhabilitation et chiffrage du passif de fermeture',
          'Gestion des terres végétales et supervision de la revégétalisation indigène',
        ],
      },
    },
  },
};

export type DedicatedServiceTranslation = Omit<DedicatedService, 'slug' | 'ref' | 'docNo' | 'image'>;

export const dedicatedServicesDataFr: Record<string, DedicatedServiceTranslation> = {
  'reliability-engineering': {
    title: 'Ingénierie de la fiabilité et surveillance',
    category: 'Services d’ingénierie',
    tagline: 'Méthodologies de fiabilité, disponibilité et maintenabilité des actifs (RAM)',
    summary:
      'MarveThabi améliore la fiabilité, la disponibilité et la maintenabilité des actifs grâce à des méthodologies structurées d’ingénierie de la fiabilité fondées sur les données. Nos programmes réduisent les arrêts imprévus, optimisent l’efficacité de la maintenance, maîtrisent les risques opérationnels et prolongent la durée de vie des équipements.',
    objective:
      'Réduire les temps d’arrêt non planifiés, optimiser les interventions de maintenance, maîtriser les risques opérationnels et prolonger la durée de vie utile tout au long du cycle de vie des actifs physiques.',
    capabilities: [
      {
        group: 'Méthodologies et analyses de fiabilité',
        items: [
          'Facilitation et mise en œuvre de la maintenance basée sur la fiabilité (RCM / MBF).',
          'Analyse de criticité des actifs afin de hiérarchiser les équipements selon le risque, la sécurité, le coût et l’impact sur la production.',
          'Analyse des modes de défaillance et de leurs effets (AMDE / FMEA) pour identifier et atténuer proactivement les risques de panne.',
          'Élaboration de stratégies de maintenance et de tactiques d’actifs alignées sur les objectifs opérationnels et la valeur métier.',
          'Analyse des causes racines de défaillance (RCFA) pour identifier, analyser et éliminer les pannes récurrentes à fort impact.',
        ],
      },
    ],
    closingStatement:
      'Notre approche garantit que les activités de maintenance reposent sur des bases techniques rigoureuses, fondées sur les risques et alignées sur les objectifs opérationnels et économiques.',
    approach:
      'Notre approche garantit que les activités de maintenance reposent sur des bases techniques rigoureuses, fondées sur les risques et alignées sur les objectifs opérationnels et économiques.',
    outcomeStatement:
      'Réduction des coûts de maintenance, élimination des défaillances chroniques, amélioration de la disponibilité des installations et prise de décision pilotée par les données.',
    standards: [
      'ISO 55000 / 55001',
      'ISO 14224 (Taxonomie & données de fiabilité)',
      'SAE JA1011 (RCM / MBF)',
      'Code de pratique ECSA',
    ],
    sectors: [
      'Mines et traitement des minerais',
      'Pétrochimie et raffinage',
      'Industrie manufacturière lourde',
      'Production d’énergie et services publics',
      'Infrastructures hydrauliques',
    ],
  },
  'asset-management': {
    title: 'Gestion des actifs',
    category: 'Services d’ingénierie',
    tagline: 'Principes ISO 55000, performance des actifs et coût du cycle de vie',
    summary:
      'Les services de gestion d’actifs de MarveThabi s’alignent sur les principes ISO 55000 et portent sur la performance, le risque et le coût global du cycle de vie. L’approche intègre les dimensions techniques, financières et de risque pour éclairer les décisions, renforcer la gouvernance et pérenniser la valeur des actifs.',
    objective:
      'Intégrer les considérations techniques, financières et de maîtrise des risques à l’échelle des portefeuilles d’actifs physiques afin de soutenir la gouvernance, l’investissement et la création de valeur durable.',
    capabilities: [
      {
        group: 'Référentiels de gestion d’actifs et systèmes de cycle de vie',
        items: [
          'Élaboration de cadres de gestion d’actifs conformes aux exigences ISO 55000',
          'Planification et ordonnancement de la maintenance',
          'Registres d’actifs, arborescences techniques et validation des données de référence',
          'Analyse des coûts du cycle de vie (LCC) et évaluation des risques',
          'Mesure de la performance des actifs et étalonnage (benchmarking)',
        ],
      },
    ],
    approach:
      'Notre méthode relie l’état physique réel des équipements aux exigences comptables statutaires et à la gouvernance stratégique. Nous accompagnons les organisations dans la structuration d’arborescences rigoureuses, de registres fiables et de plans de maintenance auditables.',
    outcomeStatement:
      'Traçabilité complète du patrimoine d’actifs, optimisation des dépenses CAPEX/OPEX et conformité durable aux audits réglementaires et financiers.',
    standards: [
      'ISO 55000 / 55001',
      'Comptabilité d’actifs GRAP 17',
      'Référentiel d’actifs du Trésor national',
      'SANS 55000',
    ],
    sectors: [
      'Municipalités et métropoles',
      'Ministères et entreprises publiques',
      'Régies des eaux et services publics',
      'Secteur minier et ressources naturelles',
      'Portefeuilles immobiliers commerciaux',
    ],
  },
  'electrical-construction': {
    title: 'Construction et installation électrique',
    category: 'Services d’ingénierie',
    tagline: 'Installation, mise en service, maintenance et certification de conformité',
    summary:
      'MarveThabi assure l’installation électrique professionnelle, la mise en service, la maintenance, la recherche de défauts et la certification statutaire de conformité pour les sites commerciaux, industriels et d’infrastructures.',
    objective:
      'Fournir des travaux de construction électrique fiables et conformes aux normes, l’intégration de secours énergétique, le diagnostic de câbles et la délivrance des certificats de conformité réglementaires.',
    capabilities: [
      {
        group: 'Exécution des installations et réseaux électriques',
        items: [
          'Installation, mise en service, maintenance et réparation de groupes électrogènes de secours',
          'Installation, mise en service, maintenance et réparation de centrales solaires photovoltaïques (PV)',
          'Câblage électrique pour installations commerciales et industrielles',
          'Détection de défauts de câbles, essais par ondes de choc et diagnostics de câbles',
          'Recherche de pannes électriques et campagnes d’essais réglementaires',
          'Délivrance de certificats de conformité électrique (COC)',
        ],
      },
    ],
    approach:
      'L’ensemble des travaux d’installation, de câblage et d’essais est réalisé par des électriciens qualifiés sous la supervision d’ingénieurs technologues agréés, dans le strict respect de la norme SANS 10142-1 et des réglementations SST.',
    outcomeStatement:
      'Installations électriques clés en main livrées en toute sécurité dans les délais, conformité réglementaire vérifiée et obtention immédiate de certificats COC valides.',
    standards: [
      'SANS 10142-1 (Câblage des locaux)',
      'Loi SST (Réglementation des installations électriques)',
      'NRS 048 (Qualité de l’énergie)',
      'Code de pratique ECSA',
    ],
    sectors: [
      'Usines industrielles et manufacturières',
      'Bâtiments commerciaux et entrepôts',
      'Bâtiments municipaux et ateliers publics',
      'Projets résidentiels',
      'Infrastructures de surface minières',
    ],
  },
  'electrical-and-electronic-engineering': {
    title: 'Génie électrique et électronique',
    category: 'Services d’ingénierie',
    tagline: 'Conception d’infrastructures électriques, distribution et assurance technique',
    summary:
      'Prestations d’ingénierie électrique de haut niveau pour les sites industriels, miniers et commerciaux. Nous concevons des schémas robustes de distribution d’énergie, des réseaux municipaux, des systèmes de secours et des audits techniques de conformité.',
    objective:
      'Concevoir des infrastructures électriques fiables et conformes aux codes en vigueur afin de garantir la continuité de service, la sécurité du personnel et l’approbation des autorités de réseau.',
    capabilities: [
      {
        group: 'Conception d’infrastructures et de réseaux de distribution',
        items: [
          'Conception et développement d’infrastructures électriques',
          'Conception de réseaux de réticulation et de distribution électrique',
          'Appui à l’ingénierie des réseaux de transport et de distribution',
          'Conception de réseaux de distribution électrique municipaux et urbains',
          'Conception d’éclairage public et d’éclairage de zones',
        ],
      },
      {
        group: 'Alimentation de secours, sécurité et systèmes électroniques',
        items: [
          'Conception de systèmes d’alimentation de secours — groupes électrogènes et ASI/UPS',
          'Conception de systèmes de protection foudre et de mise à la terre',
          'Conception d’infrastructures voix et données (VDI)',
          'Conception de systèmes de contrôle d’accès, sécurité et vidéosurveillance (CCTV)',
          'Conception de systèmes de détection et d’alarme incendie',
        ],
      },
      {
        group: 'Conformité et assurance technique',
        items: [
          'Audits techniques et de conformité électrique',
          'Assistance à maîtrise d’œuvre et suivi d’exécution des travaux',
        ],
      },
    ],
    approach:
      'Chaque projet est piloté par des ingénieurs technologues agréés afin d’assurer la conformité aux normes SANS 10142, aux codes de raccordement réseau et aux obligations de sécurité. Les livrables incluent les schémas unifilaires CAO/AutoCAD complets, les réglages de protection et les bordereaux quantitatifs (BOQ).',
    outcomeStatement:
      'Réseaux de distribution résilients dimensionnés pour la croissance des charges, marges de sécurité vérifiées et dossiers techniques complets pour approbation.',
    standards: [
      'SANS 10142-1 & 2',
      'Qualité d’énergie NRS 048',
      'SANS 10313 Protection contre la foudre',
      'Normes ECSA',
    ],
    sectors: [
      'Mines et minerais',
      'Industrie et fabrication',
      'Municipalités et métropoles',
      'Installations commerciales',
      'Infrastructures publiques',
    ],
  },
  'condition-monitoring': {
    title: 'Surveillance conditionnelle',
    category: 'Services d’ingénierie',
    tagline: 'Détection précoce des défauts, CND et diagnostic des équipements',
    summary:
      'Surveillance conditionnelle avancée au service des stratégies de maintenance prédictive et proactive. L’objectif est la détection précoce des anomalies, la réduction des arrêts imprévus et le renforcement de la fiabilité des installations.',
    objective:
      'Détecter les défauts naissants au plus tôt, réduire les pannes non planifiées et accroître la fiabilité des actifs par des essais de précision et une analyse diagnostique rigoureuse.',
    capabilities: [
      {
        group: 'Technologies de diagnostic et maintenance prédictive',
        items: [
          'Analyse vibratoire et diagnostic des machines tournantes',
          'Prélèvement d’huiles et analyse de condition des lubrifiants',
          'Thermographie infrarouge des installations électriques et mécaniques',
          'Analyse des circuits moteurs (MCA)',
          'Évaluation de l’état des transformateurs et analyse des gaz dissous (DGA)',
        ],
      },
      {
        group: 'Contrôles non destructifs (CND) et inspection structurale',
        items: [
          'Contrôle par ultrasons (UT) et mesure d’épaisseur',
          'Contrôle visuel (VT)',
          'Contrôle par ressuage (PT)',
          'Contrôle radiographique (RT)',
          'Contrôle par courants de Foucault (ECT)',
          'Inspection et évaluation des soudures',
        ],
      },
      {
        group: 'Intégrité des actifs et rapports de condition',
        items: [
          'Suivi de la corrosion et de l’usure progressive',
          'Évaluations d’état des équipements',
          'Rapports de diagnostic et recommandations de maintenance priorisées',
          'Études d’intégrité et de fiabilité mécanique',
        ],
      },
    ],
    approach:
      'Nos analystes certifiés inspectent les chaînes cinématiques, les tableaux haute tension et les structures en conditions réelles d’exploitation. Les constats sont synthétisés dans des rapports exploitables accompagnés d’actions correctives hiérarchisées.',
    outcomeStatement:
      'Zéro casse machine catastrophique, maintenance déclenchée uniquement sur critère d’état réel et prolongation mesurable de la durée de vie des composants.',
    standards: [
      'ISO 18436 (Surveillance et diagnostic des machines)',
      'ISO 10816 (Vibrations mécaniques)',
      'Normes ASNT / PCN',
      'Normes SANS',
    ],
    sectors: [
      'Mines et usines d’enrichissement',
      'Pétrochimie et gaz',
      'Services publics d’électricité et sous-stations',
      'Stations de pompage d’eau',
      'Unités de transformation industrielle',
    ],
  },
  'water-management': {
    title: 'Gestion de l’eau',
    category: 'Gestion des ressources environnementales',
    tagline: 'Licences d’utilisation d’eau, bilans hydriques et protection des bassins',
    summary:
      'Services intégrés de gestion des ressources en eau couvrant les demandes d’autorisation d’utilisation d’eau, la planification de la conservation et de la demande en eau, ainsi que les réseaux de surveillance des eaux de surface et souterraines.',
    objective:
      'Obtenir les autorisations réglementaires d’utilisation d’eau, sécuriser la ressource hydrique et assurer une conformité stricte aux normes de qualité des bassins versants sur les sites industriels, miniers et municipaux.',
    capabilities: [
      {
        group: 'Autorisations hydriques et planification de la conservation',
        items: [
          'Demandes et modifications de licences d’utilisation d’eau (WULA)',
          'Plans de conservation et de gestion de la demande en eau (WC/WDM)',
          'Plans intégrés de gestion de l’eau et des déchets (IWWMP)',
          'Surveillance de la qualité des eaux souterraines et de surface',
          'Études hydrologiques spécialisées et bilans hydriques de bassin pour EIE',
        ],
      },
    ],
    approach:
      'Dirigés par des scientifiques agréés SACNASP, nos programmes combinent échantillonnage hydrochimique, modélisation de bilan hydrique et coordination technique avec les autorités de l’eau compétentes.',
    outcomeStatement:
      'Obtention sécurisée des licences d’eau, maîtrise des risques de pollution, optimisation du recyclage des eaux industrielles et conformité réglementaire durable.',
    standards: [
      'Loi nationale sur l’eau (Act 36 of 1998)',
      'Directives de bonnes pratiques DWS',
      'SANS 241 (Qualité de l’eau potable)',
      'Code de conduite SACNASP',
    ],
    sectors: [
      'Exploitation minière et extraction',
      'Régies municipales d’eau',
      'Industries et chimie',
      'Périmètres agricoles',
      'Projets d’infrastructures',
    ],
  },
  'waste-management': {
    title: 'Gestion des déchets',
    category: 'Gestion des ressources environnementales',
    tagline: 'Classification des déchets, licences et audits de stations d’épuration',
    summary:
      'MarveThabi réalise la classification des déchets, l’obtention de licences de gestion des déchets, la planification intégrée des flux et les audits de performance des stations d’épuration pour les opérations industrielles et municipales.',
    objective:
      'Garantir la conformité légale dans le traitement des déchets, éliminer les risques de pollution, optimiser la classification des flux et assurer le rendement des installations de traitement des eaux usées.',
    capabilities: [
      {
        group: 'Licences déchets, audits et plans opérationnels',
        items: [
          'Audit de conformité des licences de gestion des déchets',
          'Autorisation et classification des déchets selon les normes NEM:WA',
          'Plans intégrés de gestion des déchets (IWMP)',
          'Audits de performance des stations d’épuration et conformité des rejets',
          'Protocoles de réduction, manutention, stockage et élimination des déchets',
          'Audits de conformité des zones de stockage de déchets dangereux et banals',
        ],
      },
    ],
    approach:
      'Nous conduisons la caractérisation complète des flux du berceau à la tombe, l’évaluation des dangers (SANS 10234) et l’audit des procédés d’épuration, en privilégiant la hiérarchie de traitement et la maîtrise des risques.',
    outcomeStatement:
      'Stockage et élimination conformes à la loi, valorisation accrue des flux recyclables, prévention des amendes et respect des normes de rejet d’effluents.',
    standards: [
      'Loi sur la gestion des déchets (NEM:WA 59/2008)',
      'SANS 10234 (Classification SGH)',
      'Stratégie nationale de gestion des déchets',
      'Normes de rejet DWS',
    ],
    sectors: [
      'Usines manufacturières et pétrochimiques',
      'Municipalités et autorités des services d’eau',
      'Sites miniers et parcs à résidus',
      'Parcs industriels et commerciaux',
      'Installations de traitement des déchets',
    ],
  },
  'air-quality-management': {
    title: 'Gestion de la qualité de l’air',
    category: 'Services environnementaux',
    tagline: 'Suivi des retombées de poussières, licences atmosphériques et acoustique',
    summary:
      'Surveillance complète de la qualité de l’air ambiant, gestion des licences d’émissions atmosphériques et campagnes de mesures acoustiques permettant aux sites industriels et miniers de rester mesurables et conformes.',
    objective:
      'Quantifier les émissions atmosphériques, maintenir la validité des licences d’émissions atmosphériques (AEL) et atténuer les impacts des poussières et du bruit sur les communautés riveraines.',
    capabilities: [
      {
        group: 'Réseaux de suivi et autorisations atmosphériques',
        items: [
          'Surveillance des retombées de poussières',
          'Autorisation et licences d’émissions atmosphériques (AEL)',
          'Plan de gestion de la qualité de l’air',
          'Mesures et suivi du bruit environnemental',
        ],
      },
    ],
    approach:
      'Nous déployons des réseaux calibrés de jauges de retombées de poussières, des sonomètres homologués et des protocoles normalisés. Les échantillons sont analysés en laboratoires accrédités pour produire des rapports mensuels et annuels auditables.',
    outcomeStatement:
      'Historique de données défendable, maintien des licences AEL, réduction des plaintes riveraines et transparence réglementaire totale.',
    standards: [
      'Loi sur la qualité de l’air (NEM:AQA 39/2004)',
      'Règlement national de contrôle des poussières (NDCR)',
      'SANS 10103 (Bruit environnemental)',
      'Norme ASTM D1739',
    ],
    sectors: [
      'Mines à ciel ouvert et carrières',
      'Industrie lourde et fonderies',
      'Terminaux vrac et logistique',
      'Centrales thermiques et pétrochimie',
      'Interfaces municipales et urbaines',
    ],
  },
  'greenhouse-gas-management': {
    title: 'Gestion des gaz à effet de serre',
    category: 'Services environnementaux',
    tagline: 'Comptabilité carbone et déclarations réglementaires obligatoires',
    summary:
      'MarveThabi accompagne les organisations face aux réglementations climatiques grâce à des calculs précis d’empreinte carbone, aux déclarations NAEIS et au pilotage réglementaire des gaz à effet de serre.',
    objective:
      'Produire des bilans d’émissions carbone rigoureux et auditables, satisfaire aux seuils nationaux de déclaration et optimiser l’exposition à la taxe carbone.',
    capabilities: [
      {
        group: 'Comptabilité carbone et déclarations statutaires',
        items: [
          'Calculs d’empreinte carbone (bilans GES)',
          'Déclarations réglementaires NAEIS',
          'Stratégies de gestion et d’atténuation des gaz à effet de serre',
          'Surveillance des retombées de poussières',
          'Demandes et révisions de licences d’émissions atmosphériques (AEL)',
        ],
      },
    ],
    approach:
      'Nos spécialistes carbone appliquent les méthodologies par paliers du GIEC (IPCC) et le référentiel GHG Protocol Corporate Standard afin de quantifier les émissions des sites en pleine conformité légale.',
    outcomeStatement:
      'Inventaires carbone défendables et prêts pour l’audit, soumissions réglementaires NAEIS dans les délais et maîtrise stratégique des obligations fiscales carbone.',
    standards: [
      'Loi sur le changement climatique',
      'Règlement national de déclaration des GES',
      'GHG Protocol Corporate Standard',
      'Lignes directrices du GIEC pour les inventaires GES',
    ],
    sectors: [
      'Mines et extraction de ressources',
      'Production d’énergie et raffinage',
      'Industrie lourde et métallurgie',
      'Transport lourd et logistique',
      'Portefeuilles immobiliers commerciaux',
    ],
  },
  'hydrogeological-studies': {
    title: 'Études hydrogéologiques',
    category: 'Études spécialisées',
    tagline: 'Géophysique, implantation de forages et caractérisation des aquifères',
    summary:
      'Investigations hydrogéologiques scientifiques, imagerie géophysique du sous-sol, développement de forages et essais de pompage menés sous la direction d’hydrogéologues agréés SACNASP.',
    objective:
      'Cartographier avec précision les ressources en eaux souterraines, déterminer les débits exploitables durables des forages et évaluer les risques de migration de panaches contaminants.',
    capabilities: [
      {
        group: 'Exploration des eaux souterraines et géophysique',
        items: [
          'Études hydrogéologiques et environnementales',
          'Développement de forages, essais de débit et caractérisation d’aquifères',
          'Conception et suivi de réseaux piézométriques de surveillance',
          'Levés géophysiques (résistivité électrique, gravimétrie et géoradar / GPR)',
          'Description géologique et géotechnique des sols et carottes rocheuses',
          'Études d’exhaure et d’ennoyage à la fermeture minière',
        ],
      },
    ],
    approach:
      'Nous croisons géophysique de surface, interprétation d’essais de pompage par paliers et traçage hydrochimique pour modéliser le comportement des aquifères conformément à la norme SANS 10299.',
    outcomeStatement:
      'Sécurisation durable de l’approvisionnement en eau, détermination fiable des débits d’exploitation, modélisation précise des panaches et paramètres géotechniques robustes.',
    standards: [
      'SANS 10299 (Développement des ressources en eau souterraine)',
      'Loi nationale sur l’eau (NWA 36/1998)',
      'Code de conduite SACNASP',
    ],
    sectors: [
      'Exhaure minière et opérations extractives',
      'Réseaux municipaux d’adduction par forages',
      'Exploitations agricoles irriguées',
      'Approvisionnement hydrique industriel',
      'Grands projets d’infrastructures linéaires',
    ],
  },
  'authorisation-permits-and-licences': {
    title: 'Autorisations, permis et licences',
    category: 'Études spécialisées',
    tagline: 'EIE, licences d’eau, permis déchets et approbations des droits miniers',
    summary:
      'MarveThabi pilote l’intégralité du processus réglementaire d’autorisation environnementale, du cadrage initial et des études d’impact jusqu’aux permis miniers, licences d’eau et consultations publiques.',
    objective:
      'Naviguer dans des cadres législatifs complexes, coordonner les disciplines spécialisées et obtenir des autorisations environnementales juridiquement solides sans retards de procédure.',
    capabilities: [
      {
        group: 'Approbations réglementaires et autorisations environnementales',
        items: [
          'Demandes de licences d’utilisation d’eau (WULA)',
          'Études d’impact environnemental et social (Notice / Cadrage & EIES)',
          'Programmes de gestion environnementale (PGES / EMPr)',
          'Licences de gestion des déchets et licences d’émissions atmosphériques (AEL)',
          'Appui aux droits miniers, droits de prospection et permis d’exploitation',
          'Processus de participation du public et concertation des parties prenantes',
        ],
      },
    ],
    approach:
      'En qualité de praticien indépendant en évaluation environnementale (EAP), nous coordonnons les études de référence, assurons la liaison directe avec les autorités compétentes et conduisons les enquêtes publiques réglementaires.',
    outcomeStatement:
      'Autorisations juridiquement défendables obtenues dans les délais légaux, réduction des risques réglementaires et adhésion des parties prenantes.',
    standards: [
      'NEMA (Act 107 of 1998) & Règlements EIE',
      'MPRDA (Act 28 of 2002)',
      'Loi nationale sur l’eau (Act 36 of 1998)',
      'Directives EAPASA',
    ],
    sectors: [
      'Compagnies minières et d’exploration',
      'Promoteurs industriels et projets énergétiques',
      'Municipalités et infrastructures publiques',
      'Développeurs fonciers et commerciaux',
      'Autorités routières et de pipelines',
    ],
  },
  'compliance-audits-and-monitoring': {
    title: 'Audits de conformité environnementale et suivi',
    category: 'Études spécialisées',
    tagline: 'Audits statutaires indépendants, supervision ECO et biosuivi',
    summary:
      'Audits environnementaux indépendants, supervision de chantier par agent de contrôle environnemental (ECO) et biosuivi écologique permettant de corriger les non-conformités avant toute sanction réglementaire.',
    objective:
      'Vérifier le respect permanent des conditions des licences, autorisations et programmes de gestion environnementale durant les phases de construction et d’exploitation.',
    capabilities: [
      {
        group: 'Programmes d’audits et de suivi de conformité',
        items: [
          'Audits de conformité des licences d’utilisation d’eau et analyses d’écarts',
          'Audits de performance des autorisations environnementales et PGES',
          'Audits des licences de gestion des déchets',
          'Audits de performance des stations d’épuration et suivi des effluents',
          'Supervision de site et contrôle des travaux par Agent de Contrôle Environnemental (ECO)',
          'Biosuivi écologique (macro-invertébrés aquatiques et santé des cours d’eau)',
          'Surveillance réglementaire continue de la conformité environnementale',
        ],
      },
    ],
    approach:
      'Nos auditeurs environnementaux certifiés mènent des inspections physiques systématiques sur site, confrontent la documentation aux clauses réglementaires et émettent des plans d’actions correctives hiérarchisés.',
    outcomeStatement:
      'Résorption proactive des écarts, prévention des mises en demeure et pénalités, maintien des licences d’exploitation et traçabilité ESG complète.',
    standards: [
      'ISO 19011 (Audit des systèmes de management)',
      'Règlement d’audit Section 34 NEMA',
      'Normes de la loi nationale sur l’eau',
      'Protocoles aquatiques SASS5',
    ],
    sectors: [
      'Entreprises de construction et génie civil',
      'Mines en exploitation et usines de traitement',
      'Installations municipales d’eau et déchets',
      'Sites industriels manufacturiers',
      'Projets d’énergie et d’infrastructures linéaires',
    ],
  },
  'environmental-rehabilitation': {
    title: 'Réhabilitation environnementale',
    category: 'Études spécialisées',
    tagline: 'Dépollution, réhabilitation des sols et planification durable de fermeture',
    summary:
      'Réhabilitation environnementale pragmatique, dépollution des terres contaminées et planification de fermeture de mine restaurant les terrains perturbés dans un état stable, conforme et durable.',
    objective:
      'Dépolluer les sites contaminés, satisfaire aux exigences légales de provision financière et concevoir des modelés de fermeture géotechniquement et écologiquement durables.',
    capabilities: [
      {
        group: 'Exécution de la réhabilitation et fermeture de site',
        items: [
          'Plans de réhabilitation et d’actions correctives pour terrains perturbés et miniers',
          'Évaluation, délimitation et dépollution des sols contaminés',
          'Plans de mise en œuvre des stratégies de réhabilitation (RSIP)',
          'Analyse des risques de réhabilitation et chiffrage du passif financier de fermeture',
          'Gestion des terres végétales et supervision de la revégétalisation indigène',
        ],
      },
    ],
    approach:
      'Nous associons stabilité géotechnique des pentes, pédologie et restauration écologique pour concevoir et piloter des programmes de réhabilitation résistants à l’érosion et conformes aux critères de fermeture minière.',
    outcomeStatement:
      'Réduction du passif financier statutaire de fermeture, dépollution réussie, stabilisation des sols et progression tangible vers le certificat de clôture définitif.',
    standards: [
      'Règlement sur les provisions financières NEMA',
      'Dispositions sols contaminés NEM:WA (Partie 8)',
      'Directives de fermeture minière DMRE',
    ],
    sectors: [
      'Exploitations minières et carrières',
      'Sites pétrochimiques et dépôts de carburant',
      'Installations chimiques et industrielles lourdes',
      'Décharges municipales',
      'Corridors d’infrastructures',
    ],
  },
  'geo-environmental': {
    title: 'Services environnementaux',
    category: 'Environnement et sciences naturelles',
    tagline: 'Gestion environnementale intégrée, études et conformité réglementaire',
    summary:
      'MarveThabi propose des services intégrés de gestion environnementale et de conseil spécialisé soutenant la conformité réglementaire, l’utilisation durable des ressources et le développement responsable de projets dans les secteurs minier, industriel et des infrastructures.',
    objective:
      'Fournir un appui scientifique et réglementaire crédible garantissant l’obtention des autorisations environnementales, la protection des milieux naturels et la maîtrise des passifs environnementaux à long terme.',
    capabilities: [
      {
        group: 'Gestion des ressources environnementales',
        items: [
          'Licences d’utilisation d’eau, bilans hydriques de bassin et surveillance piézométrique',
          'Classification des déchets, autorisations et plans intégrés de gestion des déchets',
        ],
      },
      {
        group: 'Études spécialisées et approbations',
        items: [
          'Études hydrogéologiques, développement de forages et géophysique',
          'Études d’impact environnemental et social (EIES / Notice / Cadrage)',
          'Audits de conformité environnementale et supervision de chantier ECO',
          'Réhabilitation environnementale, dépollution des sols et chiffrage de fermeture',
        ],
      },
    ],
    approach:
      'Dirigée par des scientifiques professionnels agréés (SACNASP), notre pratique multidisciplinaire relie les sciences de la Terre empiriques aux exigences réglementaires et environnementales applicables.',
    outcomeStatement:
      'Conformité environnementale intégrale, autorisations juridiquement solides, passifs environnementaux maîtrisés et gestion durable des ressources.',
    standards: [
      'Loi nationale sur l’eau (NWA 36/1998)',
      'NEMA (Act 107/1998)',
      'NEM:WA & NEM:AQA',
      'Code de conduite SACNASP',
    ],
    sectors: [
      'Mines et ressources minérales',
      'Municipalités et services d’eau',
      'Industrie et fabrication',
      'Énergie et infrastructures électriques',
      'Développements commerciaux et génie civil',
    ],
  },
  'mining-engineering-services': {
    title: 'Services d’ingénierie minière',
    category: 'Services d’ingénierie',
    tagline: 'Fiabilité des équipements lourds, hydrogéologie d’exhaure et usines de traitement',
    summary:
      'Appui d’ingénierie complet pour les mines à ciel ouvert, exploitations souterraines et installations de traitement minéralurgique : stratégies de maintenance des engins lourds, infrastructures d’exhaure et conformité réglementaire sécurité.',
    objective:
      'Optimiser la performance des actifs d’extraction, réduire les risques de panne critique et garantir la sécurité et la conformité réglementaire des opérations minières.',
    capabilities: [
      {
        group: 'Ingénierie des infrastructures et équipements miniers',
        items: [
          'Stratégies de fiabilité et de maintenance pour engins miniers lourds',
          'Ingénierie des systèmes d’exhaure de fosse, pompage de pulpe et eaux de mine',
          'Gestion et optimisation des actifs des usines de traitement minéralurgique',
          'Réseaux électriques miniers, sous-stations et appareillage HT/MT',
          'Ingénierie de conformité en santé et sécurité minières',
          'Appui au démantèlement des infrastructures en fin de vie de mine',
        ],
      },
    ],
    approach:
      'Nos ingénieurs multidisciplinaires interviennent directement sur site avec les équipes d’exploitation pour concevoir, auditer et fiabiliser les machines tournantes lourdes, les réseaux haute tension et les stations d’exhaure selon les référentiels de sécurité minière.',
    outcomeStatement:
      'Disponibilité maximale des chaînes de production, maîtrise des débits d’exhaure en fosse et zéro non-conformité réglementaire.',
    standards: [
      'Loi sur la santé et la sécurité dans les mines (Act 29 of 1996)',
      'SANS 10142',
      'ISO 55000',
      'Normes ECSA',
    ],
    sectors: [
      'Mines à ciel ouvert (cuivre, cobalt, charbon, fer)',
      'Mines souterraines d’or et de platine',
      'Carrières et granulats',
      'Complexes métallurgiques et fonderies',
    ],
  },
  'project-development-project-management': {
    title: 'Développement et gestion de projets',
    category: 'Services d’ingénierie',
    tagline: 'Livraison d’infrastructures de bout en bout, AQ/CQ et mise en service',
    summary:
      'Services clés en main de gestion et de développement technique guidant les projets d’infrastructure, d’énergie et d’industrie depuis le concept initial et la faisabilité jusqu’à la construction et la mise en exploitation.',
    objective:
      'Garantir l’exécution des projets d’infrastructure dans le respect des délais, des budgets approuvés, des spécifications techniques et des exigences statutaires.',
    capabilities: [
      {
        group: 'Pilotage technique de projet et supervision des contrats',
        items: [
          'Développement de projets, cadrage et études de faisabilité',
          'Gestion de projets d’ingénierie et supervision des travaux',
          'Administration des contrats et assurance qualité / contrôle qualité (AQ/CQ)',
          'Coordination de la conformité statutaire et des autorisations',
          'Budgétisation, maîtrise des coûts et suivi des jalons du planning',
          'Réception des ouvrages, dossiers tel que construit et transfert d’exploitation',
        ],
      },
    ],
    approach:
      'Nous déployons des méthodologies structurées (PMBOK / FIDIC / NEC) pour encadrer les entreprises travaux, piloter les appels d’offres, coordonner les équipes multidisciplinaires et contrôler chaque jalon de chantier.',
    outcomeStatement:
      'Projets livrés en sécurité, dans le budget et les délais impartis, entièrement certifiés avec une documentation de récolement complète.',
    standards: [
      'ISO 21500 (Management de projet)',
      'Référentiels contractuels FIDIC / NEC3 / GCC',
      'Code de pratique ECSA',
    ],
    sectors: [
      'Infrastructures municipales',
      'Projets d’énergie et renforcement de transport électrique',
      'Projets d’investissement miniers',
      'Développements industriels',
    ],
  },
  'geological-services': {
    title: 'Services géologiques',
    category: 'Études spécialisées',
    tagline: 'Géologie du sous-sol, profils structuraux et carottage géotechnique',
    summary:
      'Cartographie géologique spécialisée, description de carottes de forage et caractérisation des massifs rocheux fournissant des données scientifiques robustes pour les fondations, la stabilité minière et la mise en valeur des ressources.',
    objective:
      'Caractériser les formations du sous-sol, évaluer l’intégrité des massifs rocheux et réduire les aléas géologiques des ouvrages civils et miniers.',
    capabilities: [
      {
        group: 'Exploration du sous-sol et géologie structurale',
        items: [
          'Cartographie géologique et caractérisation du sous-sol',
          'Description lithologique et structurale des carottes de forage (core logging)',
          'Évaluations géotechniques de fondations et de stabilité des pentes',
          'Identification et délimitation des horizons minéralisés',
          'Maîtrise des risques géologiques pour infrastructures civiles et minières',
          'Intégration de l’imagerie géophysique du sous-sol',
        ],
      },
    ],
    approach:
      'Menées par des géologues agréés SACNASP, nos investigations associent levés de terrain, analyse des carottes de sondage et essais mécaniques sur roches pour bâtir des modèles géologiques tridimensionnels fiables.',
    outcomeStatement:
      'Paramètres géologiques défendables, réduction des risques géotechniques de fondation et stabilité optimisée des talus et fosses.',
    standards: [
      'SANS 634 (Investigations géotechniques)',
      'Code de conduite SACNASP',
      'Code SAMREC',
    ],
    sectors: [
      'Exploitations minières et carrières',
      'Grands ouvrages de génie civil',
      'Implantation de sous-stations et centrales solaires',
      'Corridors de pipelines et d’axes routiers',
    ],
  },
  'surveying-services': {
    title: 'Services de topographie et d’arpentage',
    category: 'Études spécialisées',
    tagline: 'Topographie de précision, cadastral, récolement et calculs volumétriques',
    summary:
      'Levés topographiques, fonciers et d’ingénierie de haute précision fournissant des jeux de données géospatiales millimétriques, des modèles numériques de terrain et l’implantation de chantier.',
    objective:
      'Fournir un positionnement spatial d’une précision millimétrique, des cubatures exactes et des modèles de terrain indispensables à la conception et à l’exécution des travaux.',
    capabilities: [
      {
        group: 'Topographie d’ingénierie de précision et arpentage',
        items: [
          'Levés topographiques et d’ingénierie de sites',
          'Délimitation cadastrale et bornage de servitudes',
          'Levés de récolement (tel que construit) et calculs volumétriques',
          'Modélisation numérique de terrain (MNT) et courbes de niveau',
          'Implantation d’ouvrages et auscultation des déformations',
          'Acquisition de données de terrain haute résolution par GNSS RTK et station totale',
        ],
      },
    ],
    approach:
      'À l’aide de récepteurs GNSS RTK calibrés, de stations totales robotisées et de logiciels photogrammétriques avancés, nos géomètres produisent des données géoréférencées conformes aux normes topographiques et cadastrales.',
    outcomeStatement:
      'Modèles numériques de terrain fiables, volumes exacts de stocks miniers et de terrassements, et implantation de chantier sans erreur.',
    standards: [
      'Loi sur l’arpentage foncier (Act 8 of 1997)',
      'Normes de données spatiales SANS',
      'Normes professionnelles SAGC',
    ],
    sectors: [
      'Entreprises de construction et génie civil',
      'Mines et audits de stocks de carrières',
      'Servitudes municipales et lotissements',
      'Tracés de lignes électriques et pipelines',
    ],
  },
  'waste-and-emissions-management': {
    title: 'Gestion des déchets et des émissions',
    category: 'Gestion des ressources environnementales',
    tagline: 'Classification des déchets, licences AEL, retombées de poussières et bilan carbone',
    summary:
      'Conformité environnementale globale couvrant la classification des déchets dangereux et banals, les licences d’émissions atmosphériques, le suivi des retombées de poussières ASTM D1739 et la comptabilité carbone réglementaire.',
    objective:
      'Fournir un interlocuteur unique garantissant la conformité statutaire pour la production de déchets, les rejets atmosphériques et les obligations de déclaration carbone des sites miniers et industriels.',
    capabilities: [
      {
        group: 'Solutions intégrées déchets et émissions atmosphériques',
        items: [
          'Classification des déchets et licences de gestion des déchets (NEM:WA)',
          'Plans intégrés de gestion des déchets (IWMP)',
          'Audits de performance des effluents de stations d’épuration',
          'Réseaux de suivi des retombées de poussières et rapports mensuels ASTM D1739',
          'Demandes et audits réglementaires de licences d’émissions atmosphériques (AEL)',
          'Comptabilité d’empreinte carbone et déclarations obligatoires NAEIS / GES',
        ],
      },
    ],
    approach:
      'Nous associons analyses chimiques en laboratoire accrédité, échantillonnage atmosphérique calibré et protocoles GIEC pour garantir une conformité réglementaire irréprochable.',
    outcomeStatement:
      'Zéro pénalité réglementaire, maintien des licences déchets et atmosphériques et transparence totale sur les émissions.',
    standards: [
      'NEM:WA (Act 59/2008)',
      'NEM:AQA (Act 39/2004)',
      'Loi sur le changement climatique',
      'SANS 10234',
    ],
    sectors: [
      'Industrie manufacturière',
      'Exploitations minières',
      'Municipalités',
      'Installations pétrochimiques et énergétiques',
    ],
  },
};
