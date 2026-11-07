import { Palette, Rocket, Target, type LucideIcon } from 'lucide-react';

export const WHATSAPP_URL =
  'https://wa.me/919818223114?text=Hey%2C%20I%20came%20from%20your%20website%20and%20I%20need%20more%20details%20about%20this.';

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
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
    services: ['Brand Strategy & Identity', 'Creative & Design'],
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
    services: ['Website Designing', 'SEO & Google Business Profile'],
    image:
      'https://images.pexels.com/photos/9408405/pexels-photo-9408405.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    services: ['Creative & Design', 'Social Media Marketing & Content Shoot'],
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
    services: ['Performance Marketing', 'WhatsApp & Email Marketing'],
    image:
      'https://images.pexels.com/photos/3559252/pexels-photo-3559252.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Modern architecture with concrete pillars and dramatic shadows',
    aspect: 'aspect-[16/10]',
    span: 'md:col-span-7',
    offset: 'md:mt-24',
  },
];
