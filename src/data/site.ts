export const site = {
  name: 'JK Event Media',
  tagline: 'Vis ta cérémonie en temps réel.',
  description:
    'JK Event Media — photographie, vidéo, montage et design graphique pour vos cérémonies et événements à Bouaké et dans la région du Gbêkê, Côte d’Ivoire.',
  location: 'Bouaké — Région du Gbêkê, Côte d’Ivoire',
}

export const services = [
  {
    id: 'photo',
    index: '01',
    title: 'Photographie événementielle',
    lead: 'Les regards, les rires, les instants qui ne reviendront pas.',
    items: [
      'Mariages, anniversaires et cérémonies familiales',
      'Cérémonies religieuses et rassemblements communautaires',
      'Concerts, spectacles, conférences et événements publics',
      'Portraits et photos de groupe',
      'Sélection et retouche des images livrées',
    ],
  },
  {
    id: 'video',
    index: '02',
    title: 'Vidéo & reportage',
    lead: 'Votre événement raconté en mouvement, avec le son et l’émotion.',
    items: [
      'Captation vidéo de cérémonies et d’événements',
      'Vidéos récapitulatives et films souvenirs',
      'Interviews, témoignages et reportages',
      'Couverture de concerts, conférences et activités communautaires',
    ],
  },
  {
    id: 'montage',
    index: '03',
    title: 'Montage & postproduction',
    lead: 'Des formats pensés pour être vus — et partagés.',
    items: [
      'Films de cérémonie et vidéos événementielles',
      'Formats courts pour Facebook, TikTok, Instagram et WhatsApp',
      'Titres, sous-titres, logos et éléments graphiques',
      'Étalonnage et finalisation des contenus',
    ],
  },
  {
    id: 'design',
    index: '04',
    title: 'Design graphique',
    lead: 'Annoncer l’événement avant même qu’il commence.',
    items: [
      'Visuels promotionnels pour vos événements',
      'Invitations, affiches et supports d’annonce',
      'Déclinaisons pour les réseaux sociaux',
    ],
  },
]

export const gallery = [
  { src: '/img/wedding.png', alt: 'Mariée ivoirienne souriante en robe blanche et gele', label: 'Mariage', span: 'tall' },
  { src: '/img/concert.png', alt: 'Chanteur sur scène sous des lumières orange, foule en silhouette', label: 'Concert', span: 'wide' },
  { src: '/img/worship.png', alt: 'Chorale en robes colorées chantant lors d’une célébration', label: 'Célébration religieuse', span: 'wide' },
  { src: '/img/birthday.png', alt: 'Grand-mère soufflant ses bougies entourée de sa famille', label: 'Anniversaire', span: 'tall' },
  { src: '/img/conference.png', alt: 'Jeune femme s’exprimant au pupitre d’un forum', label: 'Forum & conférence', span: 'wide' },
  { src: '/img/videographer.png', alt: 'Vidéaste filmant une cérémonie avec une caméra sur stabilisateur', label: 'En coulisses', span: 'tall' },
] as const

export const clients = [
  {
    title: 'Particuliers & familles',
    description: 'Mariages, anniversaires, cérémonies familiales et événements privés.',
  },
  {
    title: 'Communautés religieuses',
    description: 'Cultes, célébrations, cérémonies et grands rassemblements.',
  },
  {
    title: 'Associations & jeunesse',
    description: 'Forums, conférences, campagnes, activités communautaires et citoyennes.',
  },
  {
    title: 'Entreprises & commerçants',
    description: 'Couverture d’activités, contenus promotionnels et valorisation de marque.',
  },
  {
    title: 'Organisateurs d’événements',
    description: 'Concerts, spectacles, cérémonies, conférences et événements publics.',
  },
]

export const packages = [
  {
    id: 'basic',
    name: 'Basic',
    price: 40000,
    positioning: 'La formule essentielle',
    description:
      'Pour garder une trace soignée des moments clés d’un événement de taille modeste.',
    featured: false,
  },
  {
    id: 'impact',
    name: 'Impact',
    price: 55000,
    positioning: 'La formule intermédiaire',
    description:
      'Plus de couverture et plus de contenus, pour faire rayonner votre événement en ligne.',
    featured: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 96000,
    positioning: 'La formule complète',
    description:
      'Une couverture complète photo et vidéo, du premier au dernier instant.',
    featured: false,
  },
]

export const dayRates = [
  { label: 'Couverture à la journée', value: '50 000 – 75 000 FCFA / jour' },
  { label: 'Prestation jusqu’à quatre jours', value: '135 000 FCFA / jour' },
]

export const steps = [
  { title: 'Prise de contact', text: 'Vous présentez votre événement, vos attentes, la date et le lieu.' },
  { title: 'Définition du besoin', text: 'Prestations, durée de couverture et livrables sont précisés ensemble.' },
  { title: 'Devis & confirmation', text: 'Vous recevez une proposition tarifaire et les conditions de la mission.' },
  { title: 'Préparation & couverture', text: 'L’équipe s’organise et couvre votre événement selon l’accord.' },
  { title: 'Postproduction & livraison', text: 'Les contenus sont sélectionnés, traités, montés et livrés dans le délai convenu.' },
]

export const eventTypes = [
  'Mariage',
  'Anniversaire',
  'Cérémonie familiale',
  'Cérémonie religieuse',
  'Concert / spectacle',
  'Conférence / forum',
  'Événement d’entreprise',
  'Autre',
]

export function formatFcfa(amount: number) {
  return `${new Intl.NumberFormat('fr-FR').format(amount).replace(/ | /g, ' ')} FCFA`
}

export const quoteForm = {
  name: 'demande-devis',
  endpoint: '/__forms.html',
}
