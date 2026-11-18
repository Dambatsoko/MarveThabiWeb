export interface CorePageSEOTranslation {
  title: string;
  description: string;
  breadcrumbName: string;
}

export const CORE_PAGES_FR: Record<string, CorePageSEOTranslation> = {
  '/': {
    title: 'MarveThabi Consulting Engineers | Solutions d’ingénierie et d’environnement',
    description:
      'Cabinet d’ingénierie multidisciplinaire offrant fiabilité industrielle, gestion d’actifs ISO 55000, génie électrique et solutions géo-environnementales en Afrique et RDC.',
    breadcrumbName: 'Accueil',
  },
  '/about': {
    title: 'À propos | MarveThabi Consulting Engineers',
    description:
      'Découvrez MarveThabi Consulting Engineers : notre équipe multidisciplinaire, agréments ECSA & SACNASP, statut B-BBEE Niveau 1 et notre expertise industrielle.',
    breadcrumbName: 'À propos',
  },
  '/services': {
    title: 'Catalogue des services d’ingénierie et d’environnement | MarveThabi',
    description:
      'Explorez nos services d’ingénierie : fiabilité, gestion d’actifs ISO 55000, réseaux électriques, mines, topographie, eau et autorisations environnementales.',
    breadcrumbName: 'Nos Services',
  },
  '/leadership': {
    title: 'Direction et gouvernance du cabinet | MarveThabi Consulting Engineers',
    description:
      'Rencontrez notre direction : ingénieurs professionnels agréés (ECSA), scientifiques (SACNASP) et développement stratégique en République Démocratique du Congo.',
    breadcrumbName: 'Notre Équipe',
  },
  '/process': {
    title: 'Processus d’ingénierie et cycle de projet | MarveThabi',
    description:
      'Découvrez notre méthodologie de livraison en 6 phases, de la consultation initiale et des diagnostics de terrain jusqu’à la conception CAO et la mise en service.',
    breadcrumbName: 'Notre Processus',
  },
  '/industries': {
    title: 'Secteurs industriels et infrastructures | MarveThabi Consulting Engineers',
    description:
      'Solutions techniques et environnementales sur mesure pour les secteurs clés : Mines, Énergie, Municipalités, Gouvernement, Industrie et Infrastructures.',
    breadcrumbName: 'Secteurs',
  },
  '/contact': {
    title: 'Contactez-nous | MarveThabi Consulting Engineers',
    description:
      'Adressez directement votre besoin technique à l’ingénieur ou au scientifique agréé responsable de la discipline. Bureau de Pretoria et développement RDC.',
    breadcrumbName: 'Contact',
  },
};

export const FR_ORGANIZATION_DESCRIPTION =
  'Cabinet de conseil en ingénierie multidisciplinaire offrant des solutions spécialisées en ingénierie de la fiabilité, gestion d’actifs ISO 55000, génie électrique et géo-environnement en Afrique du Sud et en RDC.';

export const FR_SITELINKS_DESCRIPTIONS = [
  {
    name: 'Nos Services',
    description: 'Catalogue complet de services d’ingénierie industrielle, minière et environnementale.',
    path: '/fr/services',
  },
  {
    name: 'À propos',
    description: 'Présentation du cabinet, domaines d’expertise et agréments professionnels statutaires.',
    path: '/fr/about',
  },
  {
    name: 'Notre Équipe',
    description: 'Direction exécutive et professionnels agréés en ingénierie, sciences naturelles et développement RDC.',
    path: '/fr/leadership',
  },
  {
    name: 'Notre Processus',
    description: 'Cycle complet de livraison de projets en 6 phases avec assurance qualité statutaire.',
    path: '/fr/process',
  },
  {
    name: 'Contact',
    description: 'Consultation technique directe et orientation des demandes vers les responsables de discipline.',
    path: '/fr/contact',
  },
  {
    name: 'Secteurs',
    description: 'Solutions dédiées aux Mines, Énergie, Municipalités, Gouvernements et Industrie.',
    path: '/fr/industries',
  },
];
