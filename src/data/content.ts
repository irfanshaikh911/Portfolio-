import ocrix from '../assets/images/projects/ocrix.jpg'
import wakaliyat from '../assets/images/projects/wakaliyat.jpg'
import instanews from '../assets/images/projects/instanews.jpg'
import water from '../assets/images/projects/water.jpg'
import serviceWeb from '../assets/images/services/web-design.png'
import serviceBrand from '../assets/images/services/branding.png'
import serviceProduct from '../assets/images/services/product-design.png'
import serviceGraphics from '../assets/images/services/graphics-design.png'

export const SITE = {
  name: 'Irfan',
  firstName: 'Irfan Shaikh',
  title: 'AI ENGINEER',
  titleLines: ['AI', 'ENGINEER'] as const,
  intro: [
    'I build intelligent digital experiences,',
    'AI systems and interactive products for ambitious teams.',
  ],
  introText:
    'I build intelligent digital experiences, AI systems and interactive products for ambitious teams.',
  email: 'shaikhirfan.dev@gmail.com',
  phone: '+91 9322592505',
  chatHref: '#contact',
}

export type Project = {
  id: string
  title: string
  category: string
  meta: string
  image: string
  description: string
  liveUrl: string
  services: string
  client: string
  duration: string
  date: string
  gallery: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'ocrix',
    title: 'OCRix',
    category: 'AI Document Intelligence',
    meta: 'Computer Vision · OCR · RAG',
    image: ocrix,
    description:
      'AI document intelligence that extracts, classifies, and retrieves information from unstructured files with computer vision, OCR, and RAG.',
    liveUrl: '#',
    services: 'AI Product',
    client: 'OCRix',
    duration: '8 Weeks',
    date: '2025',
    gallery: [ocrix, ocrix, ocrix],
  },
  {
    id: 'wakaliyat',
    title: 'Wakaliyat',
    category: 'Legal AI / RAG',
    meta: 'LLM · Retrieval · Legal Tech',
    image: wakaliyat,
    description:
      'A legal AI assistant that retrieves relevant case law and drafts with retrieval-augmented generation, built for law firms that need answers they can trust.',
    liveUrl: '#',
    services: 'AI / RAG',
    client: 'Wakaliyat',
    duration: '6 Weeks',
    date: '2025',
    gallery: [wakaliyat, wakaliyat, wakaliyat],
  },
  {
    id: 'instanews',
    title: 'InstaNews',
    category: 'AI News Automation',
    meta: 'NLP · Agents · Automation',
    image: instanews,
    description:
      'An automated news pipeline that gathers, summarizes, and publishes stories with NLP agents so teams can ship coverage without the manual grind.',
    liveUrl: '#',
    services: 'Automation',
    client: 'InstaNews',
    duration: '5 Weeks',
    date: '2024',
    gallery: [instanews, instanews, instanews],
  },
  {
    id: 'water',
    title: 'Water Potability',
    category: 'ML / MLOps',
    meta: 'ML Pipelines · Monitoring',
    image: water,
    description:
      'An MLOps system that predicts water potability, monitors model drift, and keeps training-to-production pipelines reliable.',
    liveUrl: '#',
    services: 'MLOps',
    client: 'Research',
    duration: '4 Weeks',
    date: '2024',
    gallery: [water, water, water],
  },
]

export function getProject(id: string) {
  return PROJECTS.find((p) => p.id === id)
}

export function getMoreProjects(id: string, count = 2) {
  return PROJECTS.filter((p) => p.id !== id).slice(0, count)
}

export const STATS = [
  { value: '20+', label: 'Projects Completed' },
  { value: '3+', label: 'Years Experience' },
  { value: '95%', label: 'Client Satisfaction' },
  { value: '10+', label: 'Technologies' },
]

/** About grid — left column stats */
export const ABOUT_LEFT_STATS = [
  { value: '20+', label: 'Projects Completed' },
  { value: '3+', label: 'Years of Experience' },
  { value: '5', label: 'Star Client Reviews' },
]

/** About grid — right column stats */
export const ABOUT_RIGHT_STATS = [
  { value: '95%', label: 'Client Satisfaction' },
  { value: '20+', label: 'Happy Customers' },
  { value: '5+', label: "Industry's Served" },
]

export const EXPERIENCE = [
  {
    role: 'AI Engineer',
    company: 'Independent',
    year: '2024 - Now',
  },
  {
    role: 'ML Engineer',
    company: 'Product teams',
    year: '2023 - 2024',
  },
  {
    role: 'Frontend Developer',
    company: 'Web & product',
    year: '2022 - 2023',
  },
]

/** Stack rows for About left column */
export const ABOUT_STACK = [
  {
    name: 'Python',
    blurb: 'AI & Backend',
    logo: 'https://cdn.simpleicons.org/python/3776AB',
  },
  {
    name: 'PyTorch',
    blurb: 'Deep Learning',
    logo: 'https://cdn.simpleicons.org/pytorch/EE4C2C',
  },
  {
    name: 'React',
    blurb: 'Frontend',
    logo: 'https://cdn.simpleicons.org/react/61DAFB',
  },
  {
    name: 'Figma',
    blurb: 'Product Design',
    logo: 'https://cdn.simpleicons.org/figma/F24E1E',
  },
]

export const STACK = ABOUT_STACK.map((s) => s.name)

export const SERVICES = [
  {
    id: '01',
    title: 'WEB DESIGN',
    blurb: 'Design That Convert',
    pill: 'Design That Convert',
    detail:
      "I'll build you a beautiful website that's fast, easy to use, and turns visitors into customers.",
    tags: ['Custom Websites', 'Website Redesign', 'Template Customization', 'Landing Pages'],
    icon: serviceWeb,
  },
  {
    id: '02',
    title: 'BRANDING',
    blurb: 'Build a Visual Voice',
    pill: 'Build a Visual Voice',
    detail:
      "I'll design a unique brand identity that makes you memorable and connects with your audience.",
    tags: ['Logo Design', 'Brand Guidelines', 'Color & Typography', 'Business Cards'],
    icon: serviceBrand,
  },
  {
    id: '03',
    title: 'PRODUCT DESIGN',
    blurb: 'Design for impact',
    pill: 'Design for impact',
    detail:
      "I'll design intuitive digital products that users love and that solve real problems for your customers.",
    tags: ['Mobile App Design', 'Dashboard Design', 'User Interface Design', 'Prototype Development'],
    icon: serviceProduct,
  },
  {
    id: '04',
    title: 'GRAPHICS DESIGN',
    blurb: 'Designs That Communicate',
    pill: 'Designs That Communicate',
    detail:
      "I'll design eye-catching visuals for your marketing, social media, and print materials that get noticed.",
    tags: ['Social Media Graphics', 'Marketing Materials', 'Illustrations', 'Print Design'],
    icon: serviceGraphics,
  },
]

export const PROCESS_STEPS = [
  {
    id: '01',
    title: "Let's Talk",
    text: 'We start with a conversation about your project, goals, and vision to understand exactly what you need.',
    tone: 'light' as const,
  },
  {
    id: '02',
    title: 'Create & Refine',
    text: 'I design concepts and share them with you. We collaborate, refine, and iterate until everything feels perfect.',
    tone: 'muted' as const,
  },
  {
    id: '03',
    title: 'Deliver & Launch',
    text: 'I hand over final files, guide you through everything, and stay available for any questions or support.',
    tone: 'deep' as const,
  },
]

export const TESTIMONIALS = [
  {
    id: 'alex',
    quote:
      'Irfan delivered beyond expectations. The website is fast, beautiful, and exactly what we needed.',
    name: 'Alex Johnson',
    role: 'Founder, Brightside',
    initials: 'AJ',
  },
  {
    id: 'sarah',
    quote:
      'Super professional, communicative, and talented. I highly recommend working with Irfan.',
    name: 'Sarah Williams',
    role: 'CEO, Flowbase',
    initials: 'SW',
  },
  {
    id: 'michael',
    quote:
      "The attention to detail and design quality is exceptional. I'll definitely work with Irfan again.",
    name: 'Michael Chen',
    role: 'Product Manager',
    initials: 'MC',
  },
]

export const FAQS = [
  {
    q: 'What services do you offer?',
    a: 'I build AI systems and interactive products—RAG apps, automation agents, ML pipelines, and the interfaces that make them usable. Design and frontend sit in the same build so the product feels complete.',
  },
  {
    q: 'How long does a project take?',
    a: 'Most engagements run 4–8 weeks depending on data, models, and product scope. After kickoff I’ll share a clear timeline with milestones so you always know what’s next.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'A short brief (goals, users, must-haves), any existing data or APIs, and time for a kickoff call. Brand assets help if we are shipping a UI. That’s enough to begin.',
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'Yes. After launch I can stay on for model updates, monitoring, feature work, and monthly care so the system keeps performing as you grow.',
  },
  {
    q: 'How much does a project cost?',
    a: 'Pricing depends on scope, data complexity, and timeline. Most work is fixed-scope. Happy to send a tailored estimate after a quick intro chat.',
  },
]

export const CONTACT = {
  eyebrow: "Let's work together on your next project.",
  location: 'Miami, FL, USA',
}
