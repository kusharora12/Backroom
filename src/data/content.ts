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

export const PROCESS_STEPS = [
  { number: '01', title: 'DISCOVER', description: 'Understand the business, its audience and its challenges.' },
  { number: '02', title: 'STRATEGISE', description: 'Develop the creative direction and a clear plan.' },
  { number: '03', title: 'CREATE', description: 'Turn ideas into distinctive identities, experiences and campaigns.' },
  { number: '04', title: 'EXECUTE', description: 'Bring the strategy to life through design, marketing and technology.' },
  { number: '05', title: 'EVOLVE', description: 'Measure, improve and continuously build on the work.' },
];

export const FAQS = [
  {
    question: 'So, what exactly does BACKROOM do?',
    answer:
      'Basically, we make brands look, feel and perform better. We combine strategy, creative direction, design, marketing and technology so your business shows up with a clear identity and work that gets noticed.',
  },
  {
    question: 'Can you handle everything under one roof?',
    answer:
      'Yep. From branding to websites to marketing, we have the creative side covered. Everything is planned together, so the work stays consistent across every channel.',
  },
  {
    question: 'Do you work with startups and small businesses?',
    answer:
      'Yes. We scope every project around the goals and resources of the business, whether you are just starting out or already growing.',
  },
  {
    question: 'Can I hire you for just one service?',
    answer:
      'No gatekeeping. You can work with us on a single service too, like a new website, a social media plan or a WhatsApp flow.',
  },
  {
    question: 'How does the whole process work?',
    answer:
      'We move through five stages: Discover, Strategise, Create, Execute and Evolve. You stay involved at each step, so nothing comes as a surprise.',
  },
  {
    question: 'Okay, but how much does it cost?',
    answer:
      'No random pricing pulled out of thin air. Every project depends on what you actually need, so we quote after a short conversation about your goals.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'It depends on the scope. We agree on a timeline during the first call, once we understand what needs to be made and when it is needed.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Send us a message on WhatsApp or fill in the contact form. A few sentences about what you are working on is enough to begin.',
  },
];

// Layout metadata per project: rotation, vertical offset, image treatment and title
// position. Cards are intentionally varied so the horizontal flow feels editorial.
export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  services: string[];
  image: string;
  alt: string;
};

export const PROJECT_PLACEHOLDERS: Project[] = [
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
  },
  {
    id: 'placeholder-05',
    title: 'Project Placeholder 05',
    category: 'AI & Automation',
    description:
      'Placeholder automation case study. Workflows, tooling and outcomes will be documented once approved for publication.',
    services: ['AI Automations & Creative Production'],
    image:
      'https://images.pexels.com/photos/16512513/pexels-photo-16512513.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Geometric architecture with strong shadows and sunlight',
  },
  {
    id: 'placeholder-06',
    title: 'Project Placeholder 06',
    category: 'Social & Content',
    description:
      'Placeholder content case study. Shoots, channels and posting cadence will be detailed when the material is approved.',
    services: ['Social Media Marketing & Content Shoot', 'Creative & Design'],
    image:
      'https://images.pexels.com/photos/15569284/pexels-photo-15569284.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Modern desk setup with design elements and accessories',
  },
];
