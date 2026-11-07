import {
  Clapperboard,
  Compass,
  Globe,
  Megaphone,
  PenTool,
  Palette,
  Rocket,
  Share2,
  Target,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES: {
  number: string;
  name: string;
  summary: string;
  deliverables: string[];
  icon: LucideIcon;
}[] = [
  {
    number: '01',
    name: 'Brand Strategy and Identity',
    summary:
      'We define what your brand stands for, then shape an identity system that is distinctive, ownable and built to last.',
    deliverables: ['Positioning', 'Naming and verbal identity', 'Visual identity system'],
    icon: Compass,
  },
  {
    number: '02',
    name: 'Creative Direction',
    summary:
      'A single creative point of view carried through every campaign, asset and touchpoint, so the work feels like one idea.',
    deliverables: ['Campaign concepts', 'Art direction', 'Creative governance'],
    icon: Clapperboard,
  },
  {
    number: '03',
    name: 'Website Design and Development',
    summary:
      'Websites designed around how people think and buy, built to load fast, read clearly and convert.',
    deliverables: ['UX and information architecture', 'Visual design', 'Build and launch'],
    icon: Globe,
  },
  {
    number: '04',
    name: 'Social Media Management',
    summary:
      'Channel-native content and community management that keeps your brand present, consistent and worth following.',
    deliverables: ['Channel strategy', 'Content calendar', 'Community management'],
    icon: Share2,
  },
  {
    number: '05',
    name: 'Performance Marketing',
    summary:
      'Paid media planned and optimised against the numbers that matter to your business, with clear reporting throughout.',
    deliverables: ['Paid search and social', 'Audience strategy', 'Conversion tracking'],
    icon: Megaphone,
  },
  {
    number: '06',
    name: 'Content Production',
    summary:
      'Photography, film and editing produced with an editorial eye, adapted for every format the campaign needs.',
    deliverables: ['Photography and film', 'Motion edits', 'Multi-format adaptation'],
    icon: PenTool,
  },
  {
    number: '07',
    name: 'Digital Strategy',
    summary:
      'A practical plan that connects your brand, channels and technology into one roadmap with measurable goals.',
    deliverables: ['Audit and opportunity mapping', 'Channel roadmap', 'KPI framework'],
    icon: TrendingUp,
  },
];

export const STUDIO_PILLARS: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: 'Strategy',
    description:
      'We start with the business question, the audience and the market, so every creative decision has a clear reason behind it.',
    icon: Target,
  },
  {
    title: 'Creative',
    description:
      'Distinctive identities, films and campaigns made to be remembered, not just scrolled past.',
    icon: Palette,
  },
  {
    title: 'Execution',
    description:
      'Launch-ready work delivered across channels and measured against outcomes you can actually see.',
    icon: Rocket,
  },
];

export const PRINCIPLES = [
  'THINK BEFORE YOU CREATE.',
  'IDEAS BEFORE EXECUTION.',
  'CREATIVE WITH PURPOSE.',
  'STRATEGY MEETS CULTURE.',
  'EXECUTION THAT MATTERS.',
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'DISCOVER',
    description: 'Understanding the business, audience and opportunity.',
    outcome: 'Clear goals, audience insight and a shared view of the challenge.',
  },
  {
    number: '02',
    title: 'STRATEGIZE',
    description: 'Building a clear direction and actionable plan.',
    outcome: 'A written plan with priorities, messaging and success measures.',
  },
  {
    number: '03',
    title: 'CREATE',
    description: 'Turning ideas into distinctive creative work.',
    outcome: 'Concepts developed into finished, on-brand creative ready for review.',
  },
  {
    number: '04',
    title: 'EXECUTE',
    description: 'Bringing the strategy to life across relevant channels.',
    outcome: 'Campaigns, websites and content launched and managed across channels.',
  },
  {
    number: '05',
    title: 'OPTIMIZE',
    description: 'Measuring performance, learning and improving.',
    outcome: 'Regular reporting and refinements that build on what is working.',
  },
];

export const FAQS = [
  {
    question: 'What happens after I get in touch?',
    answer:
      'We read every enquiry personally and reply by email to arrange a short call about your goals, timing and budget.',
  },
  {
    question: 'Do you work with small businesses as well as larger brands?',
    answer:
      'Yes. We scope each project around the goals and resources of the business, from focused brand projects to ongoing partnerships.',
  },
  {
    question: 'Do I need a full brief before contacting you?',
    answer:
      'No. A few sentences about what you are working on is enough. We will help shape the brief together on the first call.',
  },
  {
    question: 'How is work priced?',
    answer:
      'Projects are quoted after an initial conversation, based on scope. The budget field helps us point you in the right direction.',
  },
];

export const PROJECT_PLACEHOLDERS = [
  {
    id: 'placeholder-01',
    title: 'Project Placeholder 01',
    category: 'Brand Identity',
    description:
      'Placeholder case study. The project name, client and outcomes will be added once approved portfolio material is supplied.',
    services: ['Brand Strategy and Identity', 'Creative Direction'],
    image:
      'https://images.pexels.com/photos/32275828/pexels-photo-32275828.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Concrete beams casting long shadows against a clear sky',
    aspect: 'aspect-[4/5]',
    span: 'md:col-span-7',
    offset: '',
  },
  {
    id: 'placeholder-02',
    title: 'Project Placeholder 02',
    category: 'Website Design',
    description:
      'Placeholder case study for a digital experience. Replace with the real project summary when portfolio material is available.',
    services: ['Website Design and Development', 'Digital Strategy'],
    image:
      '/1_bca30823-bf5f-4d3f-86e4-38a0548d4c57_400x.webp',
    alt: 'Geometric concrete building facade with light and shadow',
    aspect: 'aspect-[1/1]',
    span: 'md:col-span-5',
    offset: 'md:mt-32',
  },
  {
    id: 'placeholder-03',
    title: 'Project Placeholder 03',
    category: 'Campaign',
    description:
      'Placeholder campaign case study. Final creative, channels and results will be shown here once they can be published.',
    services: ['Creative Direction', 'Content Production'],
    image:
      'https://images.pexels.com/photos/6939228/pexels-photo-6939228.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Model in a leather jacket under moody studio lighting',
    aspect: 'aspect-[4/5]',
    span: 'md:col-span-5',
    offset: '',
  },
  {
    id: 'placeholder-04',
    title: 'Project Placeholder 04',
    category: 'Performance Marketing',
    description:
      'Placeholder growth case study. Channel mix, creative testing and results will be added when approved for publication.',
    services: ['Performance Marketing', 'Social Media Management'],
    image:
      'https://images.pexels.com/photos/3559252/pexels-photo-3559252.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Modern architecture with concrete pillars and dramatic shadows',
    aspect: 'aspect-[16/10]',
    span: 'md:col-span-7',
    offset: 'md:mt-24',
  },
];
