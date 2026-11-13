import { ArrowUp, Instagram, Linkedin } from 'lucide-react';
import Logo from '@/components/Logo';
import Reveal from '@/components/Reveal';
import { NAV_LINKS, WHATSAPP_URL } from '@/data/content';

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-teal-dark text-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-16 md:px-12 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-xs font-mono text-[12px] uppercase tracking-[0.16em] text-teal-light">
              Behind the scenes. Ahead of the curve.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">Navigate</p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-display text-xl font-bold uppercase text-white transition-colors duration-300 hover:text-teal-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">Reach us</p>
            <ul className="flex flex-col gap-3 text-sm text-white">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-teal-light">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:backroomstudio@gmail.com" className="transition-colors duration-300 hover:text-teal-light">
                  backroomstudio@gmail.com
                </a>
              </li>
              <li>
                <a href="#" aria-label="Instagram (link to be added)" className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-teal-light">
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" aria-label="LinkedIn (link to be added)" className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-teal-light">
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/20 pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
            &copy; 2026 BACKROOM STUDIO CO. All rights reserved.
          </p>
          <a
            href="#top"
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/85 transition-colors duration-300 hover:text-teal-light"
          >
            Back to top
            <span className="flex h-10 w-10 items-center justify-center border border-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-teal-light">
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>

      <Reveal className="mt-10 select-none px-2 md:mt-16">
        <p
          aria-hidden="true"
          className="display whitespace-nowrap text-center font-bold leading-[0.9] text-[clamp(72px,14vw,220px)] text-white/95"
        >
          BYE.
        </p>
      </Reveal>
    </footer>
  );
}
