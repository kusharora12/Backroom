import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { WHATSAPP_URL } from '@/data/content';

export default function CallToAction() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-teal py-24 md:py-32">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border border-white/20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/3 h-[260px] w-[260px] rounded-full border border-white/15"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-12 px-6 md:flex-row md:items-end md:justify-between md:px-12">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/80">Ready when you are</p>
          <h2 id="cta-title" className="display mt-6 text-[clamp(44px,7vw,112px)] text-white">
            Make your mark<span className="text-midnight">.</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 bg-midnight px-8 py-5 font-sans text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-white hover:text-midnight"
          >
            Start a project
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
