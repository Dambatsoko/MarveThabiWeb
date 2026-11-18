import {
  Industry,
  IndustryDetail,
  LeaderDetail,
} from '../../data/marvethabi';
import { ContactCategory } from '../../data/contactRouting';

export const industriesDataFr: Record<string, Partial<Industry>> = {
  government: {
    name: 'Gouvernement & Secteur public',
    tagline: 'Infrastructures publiques, registres d’actifs GRAP 17 et conformité réglementaire',
  },
  mining: {
    name: 'Mines & Extraction minière',
    tagline: 'Fiabilité des installations lourdes, hydrogéologie d’exhaure et réhabilitation minière',
  },
  energy: {
    name: 'Énergie',
    tagline: 'Ingénierie de sous-stations, transport d’énergie et micro-réseaux renouvelables',
  },
  municipalities: {
    name: 'Municipalités',
    tagline: 'Électrification urbaine, réseaux d’eau et vérification d’actifs mSCOA',
  },
  industrial: {
    name: 'Industrie',
    tagline: 'Surveillance conditionnelle prédictive, certificats SANS 10142 et licences d’émissions',
  },
  commercial: {
    name: 'Secteur commercial',
    tagline: 'Électricité du bâtiment, dimensionnement de secours et études environnementales',
  },
  'infrastructure-development': {
    name: 'Développement d’infrastructures',
    tagline: 'Supervision multidisciplinaire, licences d’eau WULA et audits de chantier ECO',
  },
};

export interface IndustryDirectoryCardFr {
  slug: string;
  name: string;
  desc: string;
  challenges: string[];
  services: string[];
}

export const industriesDirectoryFr: IndustryDirectoryCardFr[] = [
  {
    slug: 'government',
    name: 'Gouvernement & Entités publiques',
    desc: 'Audits d’infrastructures, registres d’actifs GRAP 17 et conformité réglementaire pour les ministères nationaux, provinciaux et entreprises publiques.',
    challenges: [
      'Exigences d’audits propres MFMA / PFMA',
      'Directives d’actifs du Trésor national',
      'Registres d’infrastructures décomposés',
    ],
    services: [
      'Gestion des actifs',
      'Études géo-environnementales',
      'Schémas directeurs électriques',
    ],
  },
  {
    slug: 'mining',
    name: 'Mines & Extraction minière',
    desc: 'Fiabilité des installations industrielles lourdes, surveillance conditionnelle, licences d’eau et réhabilitation à la fermeture des mines.',
    challenges: [
      'Arrêts critiques de convoyeurs et broyeurs',
      'Conformité des licences d’utilisation d’eau',
      'Dépollution de sites contaminés',
    ],
    services: [
      'Ingénierie de la fiabilité',
      'Hydrogéologie et essais d’aquifères',
      'Réhabilitation environnementale',
    ],
  },
  {
    slug: 'energy',
    name: 'Énergie & Services d’électricité',
    desc: 'Ingénierie de sous-stations, réseaux 132 kV / 11 kV, coordination des protections et intégration hybride solaire photovoltaïque.',
    challenges: [
      'Instabilité réseau et fluctuations de charge',
      'Sélectivité des relais et sécurité arc-flash',
      'Synchronisation de micro-réseaux renouvelables',
    ],
    services: [
      'Ingénierie haute tension',
      'Diagnostics de câbles',
      'Alimentation de secours et ASI/UPS',
    ],
  },
  {
    slug: 'municipalities',
    name: 'Municipalités & Métropoles',
    desc: 'Électrification de zones urbaines, éclairage par mâts grande hauteur, sécurisation de l’eau potable et registres d’actifs conformes mSCOA.',
    challenges: [
      'Mandats de continuité des services publics',
      'Vieillissement des réseaux de distribution',
      'Immobilisation et durée de vie utile des actifs',
    ],
    services: [
      'Réseaux électriques',
      'Plans de gestion de l’eau',
      'Vérification et codification d’actifs',
    ],
  },
  {
    slug: 'industrial',
    name: 'Industrie & Fabrication',
    desc: 'Gestion globale des lubrifiants, analyse vibratoire, certificats électriques SANS 10142 et licences d’émissions atmosphériques pour usines de transformation.',
    challenges: [
      'Passage de la maintenance curative au prédictif',
      'Limites d’émissions atmosphériques (AEL)',
      'Harmoniques et qualité réseau (NRS 048)',
    ],
    services: [
      'Surveillance conditionnelle',
      'Audits de qualité de l’air',
      'Installations électriques & COC',
    ],
  },
  {
    slug: 'commercial',
    name: 'Immobilier commercial & Projets',
    desc: 'Distribution interne, synchronisation de groupes électrogènes de secours, licences d’eau et études d’impact environnemental pour grands ensembles commerciaux.',
    challenges: [
      'Continuité électrique pour les occupants',
      'Autorisations EIE et gestion pluviale',
      'Efficacité énergétique et comptage intelligent',
    ],
    services: [
      'Solutions d’alimentation de secours',
      'EIE et audits environnementaux',
      'Éclairage et distribution de puissance',
    ],
  },
  {
    slug: 'infrastructure-development',
    name: 'Grands projets d’infrastructures',
    desc: 'Interfaces génie civil / électrique, protection cathodique de conduites, essais de débit aquifère et supervision environnementale ECO.',
    challenges: [
      'Coordination interdisciplinaire de chantier',
      'Conformité environnementale en travaux',
      'Assurance qualité et mise en service',
    ],
    services: [
      'Géotechnique et hydrogéologie',
      'Supervision de construction',
      'Audits environnementaux ECO',
    ],
  },
];

export type IndustryDetailTranslation = Omit<IndustryDetail, 'slug' | 'docNo' | 'path' | 'caseStudyHighlight'>;

export const industryDetailsDataFr: Record<string, IndustryDetailTranslation> = {
  government: {
    name: 'Gouvernement & Entités publiques',
    tagline: 'Assurance des infrastructures publiques, registres GRAP 17 et conformité légale',
    summary:
      'MarveThabi Consulting Engineers accompagne les ministères nationaux et provinciaux, les entreprises publiques et les administrations par une supervision d’ingénierie certifiée, des registres d’actifs décomposés, la sécurisation de l’énergie de secours et la conformité environnementale.',
    fitDescription:
      'Là où la dépense publique exige des audits sans réserve, une discipline financière stricte et des ouvrages sans défaut, MarveThabi met à disposition des ingénieurs ECSA et scientifiques SACNASP agréés qui engagent personnellement leur signature statutaire.',
    serviceAlignments: [
      {
        category: 'Services d’ingénierie',
        services: [
          {
            name: 'Services de gestion des actifs',
            slug: 'asset-management',
            ref: 'AM-02',
            description:
              'Registres d’actifs conformes GRAP 17 et PFMA, décomposition par composants des infrastructures, cotation d’état physique, durée de vie résiduelle et inventaires par codes-barres.',
          },
          {
            name: 'Construction électrique et conformité',
            slug: 'electrical-construction',
            ref: 'EC-03',
            description:
              'Installations électriques, mise à niveau de tableaux MT/BT et audits de conformité COC pour hôpitaux publics, écoles, commissariats et bâtiments administratifs.',
          },
          {
            name: 'Fiabilité et alimentation de secours',
            slug: 'reliability-engineering',
            ref: 'RE-01',
            description:
              'Dimensionnement de groupes électrogènes de secours, essais d’inverseurs automatiques (ATS) et surveillance conditionnelle pour les infrastructures publiques critiques.',
          },
        ],
      },
      {
        category: 'Gestion des ressources environnementales',
        services: [
          {
            name: 'Gestion de l’eau et licences',
            slug: 'water-management',
            ref: 'WM-05',
            description:
              'Plans de conservation et de gestion de la demande en eau (WC/WDM) et licences WULA pour les ouvrages hydrauliques publics et schémas régionaux.',
          },
          {
            name: 'Gestion des déchets et effluents',
            slug: 'waste-management',
            ref: 'WS-06',
            description:
              'Classification des déchets, audits de stockage des matières dangereuses et stratégies institutionnelles de réduction des déchets conformes NEM:WA.',
          },
          {
            name: 'Gaz à effet de serre et bilans carbone',
            slug: 'greenhouse-gas-management',
            ref: 'GG-08',
            description:
              'Déclarations obligatoires NAEIS et inventaires d’émissions carbone du secteur public conformes aux engagements climatiques.',
          },
        ],
      },
      {
        category: 'Études spécialisées',
        services: [
          {
            name: 'Audits de conformité et supervision ECO',
            slug: 'compliance-audits-and-monitoring',
            ref: 'CA-11',
            description:
              'Supervision indépendante de chantier par Agent de Contrôle Environnemental (ECO) et audits statutaires Section 34 sur les travaux publics.',
          },
          {
            name: 'Autorisations, permis et licences',
            slug: 'authorisation-permits-and-licences',
            ref: 'AP-10',
            description:
              'Études d’impact environnemental (EIE) complètes pour routes, hôpitaux, réseaux structurants et équipements publics.',
          },
          {
            name: 'Études hydrogéologiques',
            slug: 'hydrogeological-studies',
            ref: 'HS-09',
            description:
              'Reconnaissance des eaux souterraines et implantation de forages d’urgence pour dispensaires ruraux, écoles et périmètres publics.',
          },
        ],
      },
    ],
    keyChallenges: [
      'Registres d’infrastructures non décomposés entraînant des réserves d’audit selon les normes GRAP 17.',
      'Bâtiments publics exploités avec des installations électriques vétustes dépourvues de certificats SANS 10142 COC.',
      'Retards de licences d’eau ou mises en demeure environnementales bloquant l’exécution de budgets publics majeurs.',
      'Coupures électriques fréquentes fragilisant les hôpitaux publics, bâtiments civiques et centres de données.',
    ],
    keyOutcomes: [
      'Registres d’actifs GRAP 17 prêts pour l’audit et conformes aux directives du Trésor.',
      'Installations publiques certifiées conformes aux normes SANS 10142 et aux obligations SST.',
      'Obtention accélérée des autorisations environnementales et licences d’eau sans blocage procédural.',
      'Statut de contributeur B-BBEE Niveau 1 (100 % détenu par des actionnaires noirs) facilitant la commande publique.',
    ],
    standards: [
      'Public Finance Management Act (PFMA Act 1 of 1999)',
      'Norme comptable d’actifs GRAP 17',
      'Référentiel de gestion des actifs du Trésor national',
      'SANS 10142-1 (Câblage des locaux)',
      'NEMA (Act 107 of 1998) & Règlements EIE',
      'Loi nationale sur l’eau (Act 36 of 1998)',
      'Actif CSD & Enregistré CIDB',
    ],
  },

  mining: {
    name: 'Mines & Extraction minière',
    tagline: 'Fiabilité des installations lourdes, hydrogéologie d’exhaure et réhabilitation minière',
    summary:
      'Des complexes platinifères du Bushveld et bassins aurifères ou houillers d’Afrique australe jusqu’aux opérations de la ceinture de cuivre en République Démocratique du Congo, MarveThabi fournit l’ingénierie de fiabilité des équipements lourds, l’hydrogéologie d’exhaure, le suivi des poussières et la réhabilitation conforme de fermeture.',
    fitDescription:
      'Dans les exploitations minières où chaque heure d’arrêt imprévu d’un broyeur ou d’un convoyeur engendre des pertes financières majeures, MarveThabi déploie la maintenance prédictive, des stratégies ISO 55000 et la conformité hydro-environnementale certifiée SACNASP.',
    serviceAlignments: [
      {
        category: 'Services d’ingénierie',
        services: [
          {
            name: 'Services d’ingénierie de la fiabilité',
            slug: 'reliability-engineering',
            ref: 'RE-01',
            description:
              'Analyse vibratoire, équilibrage dynamique, analyse des circuits moteurs et RCFA sur broyeurs SAG, broyeurs à boulets, concasseurs, pompes à pulpe et convoyeurs longue distance.',
          },
          {
            name: 'Surveillance conditionnelle et thermographie',
            slug: 'condition-monitoring',
            ref: 'CM-01',
            description:
              'Campagnes certifiées de thermographie infrarouge et analyses d’huiles (DGA / particules d’usure) sur transformateurs de surface/fond, sous-stations et réducteurs mécaniques.',
          },
          {
            name: 'Services de gestion des actifs',
            slug: 'asset-management',
            ref: 'AM-02',
            description:
              'Structuration de registres ISO 55000, classement de criticité des équipements et optimisation des tactiques de maintenance pour flottes minières et usines minéralurgiques.',
          },
        ],
      },
      {
        category: 'Gestion des ressources environnementales',
        services: [
          {
            name: 'Qualité de l’air et suivi des retombées de poussières',
            slug: 'air-quality-management',
            ref: 'AQ-07',
            description:
              'Réseaux de jauges ASTM D1739, évaluation des poussières sur pistes de roulage à ciel ouvert et révision des licences AEL.',
          },
          {
            name: 'Gestion de l’eau et bilans hydriques miniers',
            slug: 'water-management',
            ref: 'WM-05',
            description:
              'Plans intégrés IWWMP, bilans hydriques de site minier et réseaux piézométriques autour des parcs à résidus (TSF) et bassins d’eau de procédé.',
          },
          {
            name: 'Gestion des GES et taxe carbone',
            slug: 'greenhouse-gas-management',
            ref: 'GG-08',
            description:
              'Bilans carbone Scope 1 & Scope 2, déclarations NAEIS et stratégies de réduction d’émissions pour opérations minières électro-intensives.',
          },
        ],
      },
      {
        category: 'Études spécialisées',
        services: [
          {
            name: 'Études hydrogéologiques et exhaure de fosse',
            slug: 'hydrogeological-studies',
            ref: 'HS-09',
            description:
              'Caractérisation d’aquifères, implantation géophysique de forages, hydrogéologie d’exhaure de mines et modélisation 3D de migration de panaches.',
          },
          {
            name: 'Réhabilitation environnementale et fermeture',
            slug: 'environmental-rehabilitation',
            ref: 'ER-12',
            description:
              'Calcul des provisions financières de fermeture, dépollution des sols, gestion de la terre végétale et revégétalisation indigène.',
          },
          {
            name: 'Droits miniers et autorisations environnementales',
            slug: 'authorisation-permits-and-licences',
            ref: 'AP-10',
            description:
              'Études d’impact environnemental et social (EIES), révisions de PGES/EMPr, licences d’eau WULA et participation du public.',
          },
        ],
      },
    ],
    keyChallenges: [
      'Défaillances brutales de machines tournantes provoquant des goulots d’étranglement critiques en production.',
      'Surveillance réglementaire stricte autour des parcs à résidus (TSF) et bassins de retour d’eau.',
      'Augmentation des passifs financiers de réhabilitation et de fermeture minière.',
      'Plaintes riveraines et exigences réglementaires liées aux envols de poussières sur chantiers ouverts.',
    ],
    keyOutcomes: [
      'Détection prédictive des défauts de roulements et d’engrenages plusieurs semaines avant la casse.',
      'Dossiers piézométriques et de qualité de l’air auditables prévenant toute injonction réglementaire.',
      'Plans de réhabilitation optimisés scientifiquement permettant de maîtriser le coût de clôture.',
      'Conformité réglementaire continue auprès des autorités minières, environnementales et de l’eau.',
    ],
    standards: [
      'Loi sur les ressources minérales et pétrolières (MPRDA Act 28 of 2002)',
      'Loi sur la santé et la sécurité dans les mines (Act 29 of 1996)',
      'SANS 10299 (Développement des eaux souterraines)',
      'Méthode d’essai ASTM D1739 (Retombées de poussières)',
      'Norme ISO 55000 de gestion d’actifs',
      'ISO 18436 Surveillance vibratoire',
    ],
  },

  energy: {
    name: 'Énergie & Infrastructures électriques',
    tagline: 'Ingénierie de sous-stations, transport d’énergie et micro-réseaux renouvelables',
    summary:
      'MarveThabi réalise l’ingénierie de sous-stations électriques, la conception de réseaux moyenne tension (11 kV à 132 kV), la coordination des protections, le diagnostic des transformateurs et l’intégration d’énergies renouvelables pour les producteurs indépendants (IPP), régies et grands consommateurs industriels.',
    fitDescription:
      'À l’heure du déploiement massif de l’autoproduction solaire et des micro-réseaux décentralisés, MarveThabi apporte l’assurance technique, les études de sélectivité et la certification réglementaire indispensables à la protection des transformateurs et à la stabilité réseau.',
    serviceAlignments: [
      {
        category: 'Services d’ingénierie',
        services: [
          {
            name: 'Ingénierie électrique et de sous-stations',
            slug: 'electrical-and-electronic-engineering',
            ref: 'EE-04',
            description:
              'Conception de sous-stations 11 kV, 22 kV, 33 kV et 132 kV, schémas unifilaires, plans de protection, lignes aériennes et schémas directeurs électriques.',
          },
          {
            name: 'Surveillance conditionnelle et diagnostic transformateurs',
            slug: 'condition-monitoring',
            ref: 'CM-01',
            description:
              'Analyse des gaz dissous (DGA), essais de rigidité diélectrique d’huile, thermographie des tableaux et détection de décharges partielles.',
          },
          {
            name: 'Construction électrique et mise en service',
            slug: 'electrical-construction',
            ref: 'EC-03',
            description:
              'Construction clé en main de sous-stations, tirage de câbles, pose de transformateurs, jeux de barres et mise en service certifiée SANS 10142.',
          },
        ],
      },
      {
        category: 'Gestion des ressources environnementales',
        services: [
          {
            name: 'Comptabilité GES et taxe carbone',
            slug: 'greenhouse-gas-management',
            ref: 'GG-08',
            description:
              'Vérifications Scope 1 & 2, calculs de compensation d’énergie renouvelable et déclarations NAEIS pour sites de production électrique.',
          },
          {
            name: 'Audits huiles isolantes et déchets dangereux',
            slug: 'waste-management',
            ref: 'WS-06',
            description:
              'Gestion des huiles diélectriques et PCB, audits de bacs de rétention de transformateurs et conformité de filière déchets dangereux.',
          },
          {
            name: 'Qualité de l’air et émissions de cheminées',
            slug: 'air-quality-management',
            ref: 'AQ-07',
            description:
              'Mesures des gaz de combustion, demandes de licences AEL et contrôles d’émissions ponctuelles.',
          },
        ],
      },
      {
        category: 'Études spécialisées',
        services: [
          {
            name: 'Autorisations et permis pour corridors électriques',
            slug: 'authorisation-permits-and-licences',
            ref: 'AP-10',
            description:
              'Études d’impact environnemental (EIE) et servitudes pour lignes de transport, centrales solaires PV et systèmes de stockage par batteries (BESS).',
          },
          {
            name: 'Audits de conformité et supervision ECO',
            slug: 'compliance-audits-and-monitoring',
            ref: 'CA-11',
            description:
              'Suivi indépendant ECO durant la construction de lignes haute tension et de centrales électriques.',
          },
          {
            name: 'Levés hydrogéologiques pour sites solaires et postes HT',
            slug: 'hydrogeological-studies',
            ref: 'HS-09',
            description:
              'Profils de résistivité électrique des sols, conductivité thermique et caractérisation géotechnique de fondations pour postes et trackers solaires.',
          },
        ],
      },
    ],
    keyChallenges: [
      'Défauts de coordination des relais de protection entraînant des déclenchements en cascade.',
      'Vieillissement d’isolation des transformateurs menant à des amorçages et pertes d’actifs majeures.',
      'Complexité des codes de raccordement au réseau et des servitudes environnementales pour projets renouvelables.',
      'Taux de distorsion harmonique élevés et pénalités de qualité de réseau selon NRS 048.',
    ],
    keyOutcomes: [
      'Études de sélectivité et courbes de protection précises isolant proprement chaque défaut.',
      'Détection précoce des dégradations d’enroulements et d’huile par analyse DGA en laboratoire.',
      'Intégration hybride solaire/réseau pleinement conforme et signée statutairement.',
      'Obtention sécurisée des autorisations environnementales pour tracés et centrales.',
    ],
    standards: [
      'SANS 10142-2 (Installations moyenne tension)',
      'NRS 048 (Fourniture d’électricité - Qualité d’onde)',
      'CEI / IEC 60076 (Transformateurs de puissance)',
      'Codes de raccordement réseau des centrales renouvelables',
      'Règlements EIE NEMA',
    ],
  },

  municipalities: {
    name: 'Municipalités & Métropoles',
    tagline: 'Électrification urbaine, réseaux d’eau et vérification d’actifs mSCOA',
    summary:
      'Nous accompagnons les municipalités locales, de district et les métropoles dans la modernisation de leurs réseaux de distribution électrique, l’audit de performance de leurs stations d’épuration (Green Drop) et l’établissement de registres d’actifs conformes mSCOA.',
    fitDescription:
      'La continuité des services municipaux repose sur des réseaux d’eau fiables, des grilles électriques sûres et des registres d’immobilisations défendables. MarveThabi comble le déficit de capacité technique avec des ingénieurs et scientifiques agréés ECSA et SACNASP.',
    serviceAlignments: [
      {
        category: 'Services d’ingénierie',
        services: [
          {
            name: 'Réseaux électriques et électrification urbaine',
            slug: 'electrical-and-electronic-engineering',
            ref: 'EE-04',
            description:
              'Réseaux aériens et souterrains 11 kV, installation de postes compacts (mini-substations), éclairage public et mâts grande hauteur, schémas directeurs d’électrification.',
          },
          {
            name: 'Gestion d’actifs municipaux (alignée mSCOA)',
            slug: 'asset-management',
            ref: 'AM-02',
            description:
              'Compilation des registres mSCOA et GRAP 17, étiquetage géoréférencé SIG sur le terrain et évaluation de l’état du patrimoine municipal.',
          },
          {
            name: 'Fiabilité des stations de pompage',
            slug: 'reliability-engineering',
            ref: 'RE-01',
            description:
              'Analyse vibratoire et optimisation de maintenance pour stations d’eau brute, eau potable et postes de relèvement d’eaux usées.',
          },
        ],
      },
      {
        category: 'Gestion des ressources environnementales',
        services: [
          {
            name: 'Stations d’épuration et audits Green Drop',
            slug: 'waste-management',
            ref: 'WS-06',
            description:
              'Audits de rendement des stations d’épuration, optimisation biologique, contrôle des effluents rejetés et plans de redressement Green Drop.',
          },
          {
            name: 'Conservation de l’eau et maîtrise des pertes (WC/WDM)',
            slug: 'water-management',
            ref: 'WM-05',
            description:
              'Stratégies de réduction des eaux non facturées, bilans hydriques municipaux, détection de fuites et licences d’eau WULA.',
          },
          {
            name: 'Plans intégrés de gestion des déchets (IWMP)',
            slug: 'waste-management',
            ref: 'WS-06',
            description:
              'Licences de décharges municipales, calculs de capacité résiduelle d’alvéoles et plans quinquennaux réglementaires de gestion des déchets.',
          },
        ],
      },
      {
        category: 'Études spécialisées',
        services: [
          {
            name: 'Études hydrogéologiques pour champs captants municipaux',
            slug: 'hydrogeological-studies',
            ref: 'HS-09',
            description:
              'Implantation de forages contre la sécheresse, essais de pompage de 72 heures, analyses physico-chimiques SANS 241 et réseaux de suivi.',
          },
          {
            name: 'Audits de conformité et supervision ECO municipale',
            slug: 'compliance-audits-and-monitoring',
            ref: 'CA-11',
            description:
              'Audits indépendants de conformité sur les chantiers d’infrastructures municipales et inspections réglementaires Section 34.',
          },
          {
            name: 'Autorisations et permis pour extensions urbaines',
            slug: 'authorisation-permits-and-licences',
            ref: 'AP-10',
            description:
              'Études d’impact environnemental (EIE) pour aménagements de cimetières, collecteurs d’assainissement, réservoirs d’eau et lotissements.',
          },
        ],
      },
    ],
    keyChallenges: [
      'Stations d’épuration défaillantes exposées aux sanctions et mauvais scores Green Drop.',
      'Câbles 11 kV et transformateurs vétustes et surchargés causant des délestages fréquents.',
      'Registres d’actifs incomplets entraînant des opinions d’audit défavorables.',
      'Taux élevés d’eau non facturée dégradant les recettes d’exploitation municipales.',
    ],
    keyOutcomes: [
      'Audits de stations rétablissant la conformité des rejets aux normes réglementaires.',
      'Réseaux modernisés et éclairage public sécurisant les quartiers et la stabilité réseau.',
      'Rapports d’audit financiers assainis grâce à des registres physiques vérifiés et conformes mSCOA.',
      'Champs de captage souterrains durables sécurisant l’accès à l’eau potable.',
    ],
    standards: [
      'Municipal Finance Management Act (MFMA Act 56 of 2003)',
      'Réglementation & directives mSCOA',
      'SANS 241 (Norme eau potable)',
      'Protocoles de certification Green Drop & Blue Drop',
      'SANS 10142 (Câblage des installations)',
      'NEM:WA (Loi sur la gestion des déchets)',
    ],
  },

  industrial: {
    name: 'Industrie & Fabrication',
    tagline: 'Surveillance conditionnelle prédictive, certificats SANS 10142 et licences d’émissions',
    summary:
      'Nous accompagnons les sites manufacturiers, pétrochimiques, chimiques, agroalimentaires et métallurgiques avec l’ingénierie de maintenance prédictive, la fiabilité des procédés, les certifications électriques réglementaires et les licences d’émissions atmosphériques.',
    fitDescription:
      'Les industriels ne peuvent tolérer ni arrêts machines inopinés ni fermetures administratives. MarveThabi associe surveillance conditionnelle et conformité environnementale pour protéger votre marge d’exploitation et votre permis d’opérer.',
    serviceAlignments: [
      {
        category: 'Services d’ingénierie',
        services: [
          {
            name: 'Ingénierie de fiabilité et déploiement RCM',
            slug: 'reliability-engineering',
            ref: 'RE-01',
            description:
              'Hiérarchisation critique des machines de production, analyses AMDE/FMEA, stratégies de maintenance et enquêtes de causes racines RCFA.',
          },
          {
            name: 'Surveillance conditionnelle et analyse vibratoire',
            slug: 'condition-monitoring',
            ref: 'CM-01',
            description:
              'Collecte vibratoire périodique sur moteurs, réducteurs, ventilateurs et pompes ; thermographie des armoires de distribution et détection ultrasonore de fuites d’air.',
          },
          {
            name: 'Construction électrique, maintenance et COC',
            slug: 'electrical-construction',
            ref: 'EC-03',
            description:
              'Distribution industrielle de puissance, centres de commande moteurs (CCM/MCC), variateurs de vitesse (VFD), chemins de câbles et renouvellements COC SANS 10142.',
          },
        ],
      },
      {
        category: 'Gestion des ressources environnementales',
        services: [
          {
            name: 'Qualité de l’air et licences d’émissions (AEL)',
            slug: 'air-quality-management',
            ref: 'AQ-07',
            description:
              'Campagnes de mesures aux cheminées de chaudières, évaluation de laveurs de gaz, demandes et renouvellements AEL.',
          },
          {
            name: 'Classification des déchets dangereux et audits stockage',
            slug: 'waste-management',
            ref: 'WS-06',
            description:
              'Classification SGH des flux de déchets industriels (SANS 10234), vérification des FDS et audits de bacs de rétention.',
          },
          {
            name: 'Gestion des GES et comptabilité taxe carbone',
            slug: 'greenhouse-gas-management',
            ref: 'GG-08',
            description:
              'Inventaires carbone d’usine (Scopes 1, 2 et 3), soumissions NAEIS, audits d’efficacité énergétique et calcul de taxe carbone.',
          },
        ],
      },
      {
        category: 'Études spécialisées',
        services: [
          {
            name: 'Audits de conformité et due diligence environnementale',
            slug: 'compliance-audits-and-monitoring',
            ref: 'CA-11',
            description:
              'Audits légaux de conformité d’usine, analyses d’écarts ISO 14001 et audits d’acquisition environnementale.',
          },
          {
            name: 'Autorisations et permis d’extension industrielle',
            slug: 'authorisation-permits-and-licences',
            ref: 'AP-10',
            description:
              'Autorisations environnementales, dossiers de régularisation Section 24G et programmes PGES pour extensions d’unités.',
          },
          {
            name: 'Réhabilitation environnementale et dépollution accidentelle',
            slug: 'environmental-rehabilitation',
            ref: 'ER-12',
            description:
              'Délimitation des sols pollués, protocoles de bioremédiation et plans d’intervention après déversement chimique.',
          },
        ],
      },
    ],
    keyChallenges: [
      'Pannes mécaniques imprévues paralysant la production en flux tendu et générant des coûts d’heures supplémentaires.',
      'Risques d’incendie et nullité d’assurance dus aux échauffements non inspectés dans les tableaux électriques.',
      'Poursuites ou arrêts administratifs pour émissions atmosphériques non autorisées ou fuites de déchets dangereux.',
      'Alourdissement des charges liées à la taxe carbone affectant la compétitivité industrielle.',
    ],
    keyOutcomes: [
      'Détection précoce de la fatigue mécanique, du désalignement et de l’usure des paliers avant la panne.',
      'Certificats SANS 10142 COC valides rassurant les assureurs et les inspecteurs du travail.',
      'Licences d’émissions atmosphériques sécurisées et registres de conformité inattaquables.',
      'Feuille de route structurée de décarbonation réduisant l’exposition fiscale.',
    ],
    standards: [
      'Occupational Health and Safety Act (Act 85 of 1993)',
      'SANS 10142-1 (Installations industrielles)',
      'NEM: Air Quality Act (Act 39 of 2004)',
      'SANS 10234 (Classification SGH des produits chimiques)',
      'Norme ISO 55000 de gestion d’actifs',
      'ISO 14001 Systèmes de management environnemental',
    ],
  },

  commercial: {
    name: 'Immobilier commercial & Projets',
    tagline: 'Électricité du bâtiment, dimensionnement de secours et cadrage environnemental',
    summary:
      'MarveThabi accompagne les promoteurs immobiliers, gestionnaires d’immeubles tertiaires et foncières dans la distribution électrique des bâtiments, l’intégration de secours groupes électrogènes / solaire PV, les audits énergétiques et les études d’impact environnemental.',
    fitDescription:
      'Dans l’immobilier tertiaire moderne, la continuité de service pour les locataires et les labels durables (Green Star / EDGE) déterminent directement la valeur d’actif. MarveThabi conçoit la sécurité électrique, la sobriété énergétique et la conformité requises.',
    serviceAlignments: [
      {
        category: 'Services d’ingénierie',
        services: [
          {
            name: 'Construction électrique et distribution du bâtiment',
            slug: 'electrical-construction',
            ref: 'EC-03',
            description:
              'Distribution électrique pour plateaux locatifs, sous-comptage divisionnaire, conversion LED haute efficacité et délivrance de certificats SANS 10142 COC.',
          },
          {
            name: 'Génie électrique et ingénierie de puissance',
            slug: 'electrical-and-electronic-engineering',
            ref: 'EE-04',
            description:
              'Dimensionnement de groupes électrogènes de secours, synchronisation d’inverseurs ATS, onduleurs ASI/UPS et toitures solaires PV hybrides.',
          },
          {
            name: 'Surveillance conditionnelle des bâtiments commerciaux',
            slug: 'condition-monitoring',
            ref: 'CM-01',
            description:
              'Inspections thermographiques infrarouges périodiques des tableaux généraux basse tension (TGBT) pour prévenir incendies et coupures.',
          },
        ],
      },
      {
        category: 'Gestion des ressources environnementales',
        services: [
          {
            name: 'Conservation de l’eau et gestion des eaux grises',
            slug: 'water-management',
            ref: 'WM-05',
            description:
              'Plans d’économie d’eau (WC/WDM), récupération des eaux pluviales et autorisations de réutilisation des eaux grises.',
          },
          {
            name: 'Réduction des déchets et protocoles de tri',
            slug: 'waste-management',
            ref: 'WS-06',
            description:
              'Plans intégrés de gestion des déchets (IWMP) et dispositifs de tri sélectif à la source pour centres commerciaux et parcs de bureaux.',
          },
          {
            name: 'GES et bilan carbone d’entreprise',
            slug: 'greenhouse-gas-management',
            ref: 'GG-08',
            description:
              'Inventaires GES d’entreprise (Scopes 1, 2 & 3), reporting extra-financier ESG et plans directeurs de décarbonation.',
          },
        ],
      },
      {
        category: 'Études spécialisées',
        services: [
          {
            name: 'Autorisations et permis pour promotion immobilière',
            slug: 'authorisation-permits-and-licences',
            ref: 'AP-10',
            description:
              'Études d’impact environnemental (EIE), évaluations de base, autorisations d’eaux pluviales et enquêtes publiques.',
          },
          {
            name: 'Audits de conformité et supervision chantier ECO',
            slug: 'compliance-audits-and-monitoring',
            ref: 'CA-11',
            description:
              'Suivi de chantier par Agent de Contrôle Environnemental (ECO) et audits de conformité municipale durant la construction.',
          },
          {
            name: 'Levés hydrogéologiques pour autonomie hydrique',
            slug: 'hydrogeological-studies',
            ref: 'HS-09',
            description:
              'Exploration d’eau souterraine, essais de débit de forages et analyses SANS 241 garantissant un secours en eau indépendant.',
          },
        ],
      },
    ],
    keyChallenges: [
      'Coupures d’alimentation perturbant l’activité des locataires, la sûreté des sites et la satisfaction client.',
      'Risques d’incendie électrique sur tableaux surchargés ou connexions desserrées.',
      'Retards d’autorisation environnementale (EIE) pénalisant les calendriers de chantier.',
      'Hausse des charges d’exploitation et pression des investisseurs pour des résultats ESG vérifiés.',
    ],
    keyOutcomes: [
      'Bascules sans micro-coupure entre réseau public, groupes électrogènes et solaire photovoltaïque.',
      'Rapports thermographiques reconnus par les assureurs et certificats COC conformes.',
      'Approbations environnementales obtenues dans les temps pour démarrer les travaux sans retard.',
      'Économies mesurables grâce au sous-comptage, au recyclage des eaux grises et à l’optimisation énergétique.',
    ],
    standards: [
      'SANS 10142-1 (Installations commerciales)',
      'SANS 10400 (Réglementation nationale du bâtiment)',
      'Directives Green Building Council of South Africa (GBCSA)',
      'Règlements EIE NEMA & Listes d’activités',
      'Loi nationale sur l’eau (Act 36 of 1998)',
    ],
  },

  'infrastructure-development': {
    name: 'Développement d’infrastructures',
    tagline: 'Supervision multidisciplinaire, licences d’eau WULA et audits de chantier ECO',
    summary:
      'Nous accompagnons les grands entrepreneurs de génie civil et électrique, les cellules de gestion de projet (PMU) et les agences publiques d’infrastructures grâce à la supervision technique multidisciplinaire, aux études hydrogéologiques, aux autorisations environnementales et au contrôle ECO sur site.',
    fitDescription:
      'Les grands projets linéaires et structurants (pipelines, routes, ponts, corridors ferroviaires et adductions régionales) exigent une coordination étroite entre conception technique, permis statutaires et suivi environnemental sur site. MarveThabi assure cette intégration de la conception à la remise des clés.',
    serviceAlignments: [
      {
        category: 'Services d’ingénierie',
        services: [
          {
            name: 'Infrastructures électriques et interfaces génie civil',
            slug: 'electrical-and-electronic-engineering',
            ref: 'EE-04',
            description:
              'Tracés d’artères électriques, servitudes de réseau, systèmes de protection cathodique pour conduites acier et conception de sous-stations.',
          },
          {
            name: 'Supervision travaux électriques et AQ/CQ',
            slug: 'electrical-construction',
            ref: 'EC-03',
            description:
              'Surveillance technique sur site, contrôle du tirage de câbles, vérification des mises à la terre et parafoudres, et essais de mise en service.',
          },
          {
            name: 'Gestion d’actifs et transfert des données récolement',
            slug: 'asset-management',
            ref: 'AM-02',
            description:
              'Conversion des ouvrages nouvellement réceptionnés en registres d’actifs décomposés GRAP 17 / ISO 55000 prêts pour l’exploitation.',
          },
        ],
      },
      {
        category: 'Gestion des ressources environnementales',
        services: [
          {
            name: 'Gestion de l’eau et modélisation hydrologique',
            slug: 'water-management',
            ref: 'WM-05',
            description:
              'Bilans hydrologiques de bassins, gestion des eaux de ruissellement, détermination des lignes de crue et licences WULA pour traversées de cours d’eau.',
          },
          {
            name: 'Gestion des déchets et protocoles de chantier',
            slug: 'waste-management',
            ref: 'WS-06',
            description:
              'Classification des déchets de chantier, autorisations de zones de dépôt des déblais et bacs de lavage béton.',
          },
          {
            name: 'Qualité de l’air et suivi de l’abattement des poussières',
            slug: 'air-quality-management',
            ref: 'AQ-07',
            description:
              'Suivi directionnel des retombées de poussières le long des tracés de travaux linéaires, terrassements de masse et carrières d’emprunt.',
          },
        ],
      },
      {
        category: 'Études spécialisées',
        services: [
          {
            name: 'Audits de conformité et supervision ECO',
            slug: 'compliance-audits-and-monitoring',
            ref: 'CA-11',
            description:
              'Surveillance environnementale ECO à temps plein ou périodique, contrôle des ouvrages anti-érosion et rapports Section 34.',
          },
          {
            name: 'Autorisations, permis et licences (EIE / PGES)',
            slug: 'authorisation-permits-and-licences',
            ref: 'AP-10',
            description:
              'Études d’impact complètes (Cadrage & EIES), autorisations de zones d’emprunt, permis d’abattage et enquêtes publiques.',
          },
          {
            name: 'Réhabilitation environnementale et stabilisation des talus',
            slug: 'environmental-rehabilitation',
            ref: 'ER-12',
            description:
              'Plans de réhabilitation RSIP, stabilisation des talus de déblai/remblai, hydro-ensemencement, gestion de la terre végétale et lutte contre l’érosion.',
          },
        ],
      },
    ],
    keyChallenges: [
      'Arrêts de chantier et lourdes amendes dus à des travaux empiétant sur des zones humides ou cours d’eau sans licence WULA.',
      'Cloisonnement entre entrepreneurs de génie civil, ingénieurs électriciens et auditeurs environnementaux.',
      'Contrôle insuffisant de l’érosion provoquant l’envasement des cours d’eau et des tensions riveraines.',
      'Dossiers des ouvrages exécutés (DOE) et registres d’actifs incomplets lors de la réception des travaux.',
    ],
    keyOutcomes: [
      'Licences d’eau WULA et autorisations environnementales sécurisées en phase avec le planning travaux.',
      'Zéro arrêt de chantier grâce à la présence proactive d’un Agent de Contrôle Environnemental (ECO) expérimenté.',
      'Remodelage stable et certifié après travaux avec couverture végétale indigène pérenne.',
      'Registres d’actifs complets et prêts pour audit remis directement aux exploitants dès la mise en service.',
    ],
    standards: [
      'Normes de bonnes pratiques CIDB pour la construction',
      'Règlements EIE NEMA',
      'Section 21 Usages de l’eau (Loi nationale sur l’eau)',
      'SANS 1200 / SANS 2001 (Travaux de génie civil)',
      'ISO 19011 (Audit des systèmes de management)',
      'Norme ISO 55000 de gestion d’actifs',
    ],
  },
};

export type LeaderDetailTranslation = Omit<LeaderDetail, 'slug' | 'name' | 'image' | 'primaryRegistration' | 'linkedinUrl'>;

export const leadershipTeamDataFr: Record<string, LeaderDetailTranslation> = {
  'marvelous-ngoatle': {
    role: 'Fondateur et Directeur',
    shortIntro:
      'Fondateur et Directeur de MarveThabi Consulting Engineers, fort de plus de 14 ans d’expérience en ingénierie de la fiabilité, gestion d’actifs, surveillance conditionnelle et génie électrique dans les secteurs minier, pétrochimique et industriel.',
    summary:
      'Marvelous Ngoatle est Fondateur et Directeur de MarveThabi Consulting Engineers, avec plus de 14 ans d’expérience en ingénierie de la fiabilité, gestion des actifs, surveillance conditionnelle et génie électrique. Il possède une vaste expérience pratique dans les environnements miniers, pétrochimiques, de traitement des eaux et industriels, assurant la direction technique des programmes d’optimisation de la maintenance, d’amélioration de la fiabilité et de solutions d’ingénierie.\n\n' +
      'Titulaire d’un diplôme B-Tech en génie électrique, Marvelous est enregistré auprès du Conseil de l’ingénierie d’Afrique du Sud (ECSA) en qualité d’Ingénieur Technologue Professionnel (Pr. Tech Eng). Il est également électricien qualifié, titulaire du certificat de qualification professionnelle et de la licence de maître électricien (Wireman’s Licence). De plus, il est thermographe certifié et analyste certifié de circuits moteurs, avec une maîtrise approfondie des technologies de surveillance conditionnelle et de maintenance prédictive.\n\n' +
      'Il a dirigé et mené avec succès de nombreux projets d’analyse vibratoire, de thermographie, d’échantillonnage et d’analyse des huiles de transformateurs, d’élaboration de stratégies de maintenance, de systèmes de gestion d’actifs, d’audits électriques, de solutions d’alimentation de secours et de programmes de surveillance conditionnelle pour divers clients des secteurs minier et industriel.\n\n' +
      'Marvelous s’engage avec passion à aider les organisations à accroître la fiabilité de leurs équipements, réduire les arrêts imprévus, optimiser les coûts de maintenance et améliorer la performance opérationnelle grâce à des solutions d’ingénierie innovantes et aux meilleures pratiques de maintenance. Il poursuit le développement de MarveThabi Consulting Engineers en offrant des prestations rigoureuses, durables et centrées sur le client en Afrique du Sud et au-delà.',
    qualifications: [
      'B-Tech en génie électrique',
      'Ingénieur Technologue Professionnel — Conseil de l’ingénierie d’Afrique du Sud (ECSA)',
      'Électricien qualifié',
      'Certificat de qualification professionnelle (Trade Test) & Licence de câblage (Wireman’s Licence)',
      'Thermographe certifié',
      'Analyste certifié de circuits moteurs (MCA)',
    ],
    areasOfExpertise: [
      'Ingénierie de la fiabilité',
      'Gestion des actifs (ISO 55000)',
      'Surveillance conditionnelle et maintenance prédictive',
      'Élaboration de stratégies de maintenance',
      'Génie électrique et audits réglementaires',
      'Solutions d’alimentation de secours',
      'Analyse vibratoire',
      'Analyse thermographique infrarouge',
      'Prélèvement d’huiles de transformateurs et analyse DGA',
    ],
    projectExperience: [
      'Programmes d’analyse vibratoire pour machines tournantes critiques minières et industrielles',
      'Campagnes de thermographie et profilage thermique de référence de sous-stations HT/MT/BT',
      'Échantillonnage d’huiles de transformateurs, mesure d’humidité et analyse des gaz dissous (DGA)',
      'Élaboration de stratégies de maintenance et modélisation des tactiques d’actifs (AMDEC / RCM)',
      'Systèmes de gestion d’actifs, vérification des registres et feuilles de route ISO 55000',
      'Audits électriques réglementaires et certification de conformité SANS 10142',
      'Solutions clés en main d’alimentation de secours (groupes diesel, inverseurs ATS et solaire PV)',
      'Programmes complets de surveillance conditionnelle pour les secteurs minier et industriel lourd',
    ],
    professionalFocus: [
      'Aider les organisations à améliorer la fiabilité de leurs équipements',
      'Réduire les arrêts non planifiés sur les circuits critiques de production',
      'Optimiser les coûts de maintenance sur tout le cycle de vie',
      'Améliorer la performance globale des usines et installations',
      'Fournir des solutions d’ingénierie innovantes et les meilleures pratiques de maintenance',
    ],
    outcomes: [
      'Améliorer la fiabilité',
      'Réduire les temps d’arrêt',
      'Optimiser les coûts de maintenance',
      'Accroître la performance',
      'Solutions durables',
    ],
    sectors: [
      'Mines et traitement minéralurgique',
      'Pétrochimie et gaz',
      'Stations de traitement des eaux',
      'Industrie manufacturière lourde',
    ],
  },
  'thabang-ngoatle': {
    role: 'Fondatrice et Directrice',
    shortIntro:
      'Fondatrice et Directrice de MarveThabi Consulting Engineers, avec plus de 12 ans d’expérience professionnelle en gestion environnementale, santé et sécurité au travail et conformité réglementaire dans les secteurs minier, pétrochimique et industriel.',
    summary:
      'Thabang Ngoatle est Fondatrice et Directrice de MarveThabi Consulting Engineers (Pty) Ltd, apportant plus de 12 ans d’expérience professionnelle en gestion environnementale, santé et sécurité au travail et conformité environnementale. Elle possède une solide expérience en conseil environnemental, gestion de projets, conformité réglementaire, audits environnementaux et suivi environnemental dans les secteurs des mines, de la pétrochimie, de la construction, de l’eau et de l’industrie.\n\nGrâce à une maîtrise approfondie de la législation environnementale, des cadres réglementaires et des exigences sectorielles, Thabang assure la direction stratégique et la supervision technique de solutions complètes de gestion environnementale. Elle s’investit pleinement dans la promotion du développement durable, le respect strict des réglementations et la livraison de prestations techniquement rigoureuses, pragmatiques et adaptées aux besoins de chaque client.',
    qualifications: [
      'Master of Science (MSc) en gestion de l’environnement',
      'Scientifique Professionnelle — Conseil sud-africain des professions des sciences naturelles (SACNASP)',
      'Qualification SAMTRAC (Systèmes de santé, sécurité au travail et gestion des risques)',
      'Doctorante en géographie — Université d’Afrique du Sud (UNISA)',
    ],
    areasOfExpertise: [
      'Gestion et gouvernance environnementale',
      'Conformité environnementale et audits de registres légaux',
      'Études d’impact environnemental et social (Cadrage & EIES)',
      'Audits environnementaux (WULA, licences déchets, PGES/EMPr)',
      'Projets de biosuivi aquatique et santé des zones humides',
      'Systèmes de management de la santé et sécurité',
      'Initiatives de durabilité et intégration ESG',
      'Systèmes de gestion des risques et protocoles SAMTRAC',
      'Rapports environnementaux et déclarations réglementaires',
      'Coordination de projets multidisciplinaires',
    ],
    projectExperience: [
      'Études d’impact environnemental pour de grands projets industriels et d’infrastructures',
      'Audits statutaires de conformité environnementale et analyses d’écarts WULA',
      'Biosuivi des macro-invertébrés aquatiques (SASS5) et surveillance de la qualité des eaux',
      'Rapports environnementaux réglementaires et dossiers prêts pour audit DFFE et DWS',
      'Déploiement de systèmes SST et de gestion des risques conformes SAMTRAC',
      'Chiffrage du passif financier de fermeture minière et programmes de dépollution des sols',
    ],
    professionalFocus: [
      'Développement durable et gestion responsable des milieux naturels pour les générations futures',
      'Environnements de travail sûrs, conformes et sans accident',
      'Garantie de conformité environnementale anticipée avant toute intervention réglementaire',
      'Direction stratégique pour des solutions durables et conformes en Afrique du Sud et au-delà',
    ],
    outcomes: [
      'Gestion environnementale responsable',
      'Santé et Sécurité',
      'Solutions durables',
      'Conformité et Redevabilité',
      'Excellence professionnelle',
    ],
    sectors: [
      'Mines et extraction de ressources',
      'Infrastructures gouvernementales',
      'Services publics municipaux',
      'Développements commerciaux',
    ],
  },
  'jonas-lufuluabo': {
    role: 'Directeur du développement commercial (RDC) & Directeur',
    shortIntro:
      'Jonas Lufuluabo est Directeur du développement commercial (RDC) et Directeur chez MarveThabi Consulting Engineers, où il pilote la stratégie de croissance et l’expansion du cabinet en République Démocratique du Congo.',
    summary:
      'Jonas Lufuluabo est Directeur du développement commercial (RDC) et Directeur chez MarveThabi Consulting Engineers, où il dirige la stratégie de développement commercial et l’expansion des activités en République Démocratique du Congo. Titulaire d’une licence en informatique (Bachelor’s Degree in Computer Science) et certifié Cisco, il dispose d’une solide assise en technologies, systèmes numériques et structuration d’entreprise.\n\nFort d’une vaste expérience en développement des affaires, gestion de la relation client, partenariats stratégiques et pénétration de marchés, Jonas joue un rôle déterminant dans l’identification de nouvelles opportunités, l’établissement de partenariats durables avec les compagnies minières, les institutions publiques et les clients industriels, et le positionnement de MarveThabi Consulting Engineers comme partenaire d’ingénierie et de conseil de référence en RDC.\n\nIl est chargé de stimuler la croissance commerciale, de nouer des alliances stratégiques, de coordonner l’engagement des parties prenantes, de négocier les accords commerciaux et d’accompagner la réussite des projets depuis l’identification de l’opportunité jusqu’à l’attribution du contrat. Sa compréhension fine de l’environnement économique congolais, alliée à sa capacité à tisser des relations de confiance durables, permet au cabinet d’évoluer efficacement sur des marchés complexes et d’étendre son rayonnement régional.\n\nJonas est animé par la volonté de créer des opportunités économiques durables, de consolider les partenariats stratégiques et de délivrer des solutions créatrices de valeur au service de la croissance conjointe de MarveThabi Consulting Engineers et de ses clients.',
    qualifications: [
      'Licence en sciences informatiques (Bachelor’s Degree in Computer Science)',
      'Certifié Cisco',
    ],
    areasOfExpertise: [
      'Développement commercial et stratégie de croissance',
      'Partenariats stratégiques et coentreprises (Joint Ventures)',
      'Gestion des relations clients grands comptes',
      'Expansion de marché (RDC et Afrique centrale)',
      'Engagement des parties prenantes et relations institutionnelles',
      'Négociation contractuelle et accords commerciaux',
      'Identification d’opportunités et développement du pipeline projets',
      'Alignement technologies et systèmes d’entreprise',
      'Opérations commerciales transfrontalières',
      'Conseil orienté création de valeur',
    ],
    projectExperience: [
      'Pilotage de la croissance commerciale et du déploiement régional en République Démocratique du Congo et en Afrique centrale',
      'Établissement de partenariats durables avec les sociétés minières, institutions publiques et clients industriels',
      'Coordination de la concertation avec les parties prenantes, liaison institutionnelle et accords commerciaux transfrontaliers',
      'Accompagnement complet des projets depuis la détection de l’opportunité jusqu’à la signature des contrats',
    ],
    professionalFocus: [
      'Créer des opportunités d’affaires durables et soutenir l’expansion régionale',
      'Renforcer les alliances stratégiques à long terme et les partenariats clients',
      'Fournir des solutions à forte valeur ajoutée soutenant les objectifs de croissance de MarveThabi et de ses clients',
      'Opérer avec intégrité et assurance technique sur les marchés complexes d’Afrique centrale',
    ],
    outcomes: [
      'BÂTIR LA CONFIANCE',
      'CRÉER DES OPPORTUNITÉS',
      'DÉLIVRER DE LA VALEUR',
      'DIRIGER AVEC IMPACT',
    ],
    sectors: [
      'Sociétés minières (RDC & Afrique centrale)',
      'Institutions gouvernementales et autorités publiques',
      'Clients industriels',
      'Entreprises régionales et transfrontalières',
    ],
  },
};

export interface ProcessPhaseFr {
  number: string;
  title: string;
  overview: string;
  tasks: string[];
  deliverables: string;
}

export const processPhasesFr: ProcessPhaseFr[] = [
  {
    number: '01',
    title: 'Consultation et cadrage technique',
    overview:
      'Définition précise du besoin technique avec le client, les propriétaires d’actifs et les parties prenantes statutaires.',
    tasks: [
      'Alignement des parties prenantes et cartographie de la matrice réglementaire',
      'Inspection initiale du site et identification des dangers',
      'Définition des Termes de Référence (TdR) et charte de projet',
      'Identification du parcours d’autorisations légales (NEMA / ECSA / DWS)',
    ],
    deliverables: 'Dossier de cadrage du projet, registre des risques, note de faisabilité préliminaire',
  },
  {
    number: '02',
    title: 'Investigations et diagnostics de référence',
    overview:
      'Réalisation d’investigations empiriques sur le terrain, contrôles non destructifs et études techniques de référence.',
    tasks: [
      'Levés géophysiques de résistivité, géoradar (GPR) et échantillonnage géologique',
      'Études de flux de charge, mesures de qualité réseau et analyse harmonique selon NRS 048',
      'Capture des spectres vibratoires de référence et prélèvements tribologiques d’huiles',
      'Évaluation physique de l’état des actifs et enregistrement codes-barres / RFID',
    ],
    deliverables: 'Rapport empirique de référence, certificats d’essais de laboratoire, jeux de données diagnostiques',
  },
  {
    number: '03',
    title: 'Ingénierie de conception et calculs',
    overview:
      'Élaboration de plans CAO détaillés, simulations numériques et cahiers des charges conformes aux normes.',
    tasks: [
      'Schémas unifilaires AutoCAD / BIM, plans de réseaux électriques et interfaces génie civil',
      'Calculs de courant de court-circuit, modélisation des chutes de tension et courbes de sélectivité',
      'Plan stratégique de gestion des actifs (SAMP) et modélisation des défaillances AMDEC/FMECA',
      'Programmes de gestion environnementale (PGES/EMPr) et modèles de bilans hydriques',
    ],
    deliverables: 'Plans CAO certifiés, bordereaux des quantités (BOQ), spécifications techniques',
  },
  {
    number: '04',
    title: 'Exécution et supervision des travaux',
    overview:
      'Suivi technique résident sur site, encadrement des entreprises travaux et contrôle qualité rigoureux de la construction.',
    tasks: [
      'Supervision d’ingénierie résidente et journaux de chantier quotidiens',
      'Assurance qualité des travaux et essais de réception en usine (FAT)',
      'Audits d’Agent de Contrôle Environnemental (ECO) et biosuivi durant le chantier',
      'Tirage de câbles, montage de sous-stations et déploiement de capteurs de télémétrie',
    ],
    deliverables: 'Procès-verbaux d’inspection de chantier, fiches de non-conformité (FNC), dossiers mensuels d’avancement',
  },
  {
    number: '05',
    title: 'Assurance qualité et mise en service statutaire',
    overview:
      'Essais complets de pré-mise en service, mise sous tension et délivrance des certifications réglementaires.',
    tasks: [
      'Validation des essais de déclenchement des relais et essais diélectriques d’isolement',
      'Essais de pompage, certification des débits de forages et validation de qualité d’eau',
      'Délivrance statutaire des certificats de conformité électrique (COC)',
      'Dépôts réglementaires finaux auprès des ministères de l’Eau, de l’Environnement et des municipalités',
    ],
    deliverables: 'Plans de récolement CAO (tel que construit), procès-verbaux de mise en service, certificats COC statutaires',
  },
  {
    number: '06',
    title: 'Accompagnement durable et optimisation des actifs',
    overview:
      'Surveillance conditionnelle continue, tactiques de maintenance prédictive et gouvernance du jumeau numérique.',
    tasks: [
      'Cycles continus de télémétrie vibratoire et d’analyse d’huiles',
      'Actualisation des jumeaux numériques et mises à jour annuelles des registres GRAP 17',
      'Audits annuels de conformité environnementale et déclarations NAEIS de qualité de l’air',
      'Revues stratégiques de cycle de vie et planification prévisionnelle des investissements CAPEX',
    ],
    deliverables: 'Tableaux de bord annuels de santé des actifs, programmes de maintenance prédictive, quitus d’audit',
  },
];

export const contactCategoriesFr: Record<string, ContactCategory> = {
  'engineering-services': {
    id: 'engineering-services',
    name: 'Services d’ingénierie',
    assignedContact: {
      name: 'Marvelous Ngoatle',
      responsibility: 'Responsable des Services d’ingénierie.',
      verifiedEmail: 'info@marvethabi.co.za',
      designation: 'Fondateur & Directeur | Pr. Tech Eng (ECSA)',
    },
    defaultSubject: 'Demande concernant les Services d’ingénierie',
  },
  'environmental-services': {
    id: 'environmental-services',
    name: 'Services environnementaux',
    assignedContact: {
      name: 'Thabang Ngoatle',
      responsibility: 'Responsable des Services environnementaux.',
      verifiedEmail: 'info@marvethabi.co.za',
      designation: 'Fondatrice & Directrice | Pr. Sci. Nat. (SACNASP)',
    },
    defaultSubject: 'Demande concernant les Services environnementaux',
  },
  'mining-engineering-services': {
    id: 'mining-engineering-services',
    name: 'Ingénierie minière & Services d’appui',
    assignedContact: {
      name: 'Jonas Lufuluabo',
      responsibility: 'Responsable de l’Ingénierie minière et des Services d’appui.',
      verifiedEmail: 'info@marvethabi.co.za',
      designation: 'Directeur du développement commercial (RDC) & Directeur',
    },
    defaultSubject: 'Demande concernant l’Ingénierie minière & les Services d’appui',
  },
  'geological-surveying-services': {
    id: 'geological-surveying-services',
    name: 'Services géologiques et topographiques',
    assignedContact: {
      name: 'Thabang Ngoatle',
      responsibility: 'Responsable des Services géologiques et topographiques.',
      verifiedEmail: 'info@marvethabi.co.za',
      designation: 'Fondatrice & Directrice | Pr. Sci. Nat. (SACNASP)',
    },
    defaultSubject: 'Demande concernant les Services géologiques et topographiques',
  },
  'general-enquiry': {
    id: 'general-enquiry',
    name: 'Demande générale',
    assignedContact: {
      name: 'Direction exécutive MarveThabi',
      responsibility: 'Responsable des Demandes générales et Relations clients.',
      verifiedEmail: 'info@marvethabi.co.za',
      designation: 'Direction exécutive',
    },
    defaultSubject: 'Demande générale de conseil',
  },
};
