import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { SERVICES } from '@/data/content';

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SERVICES[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section id="services" aria-labelledby="services-title" className="bg-forest py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-light">03 &mdash; Services</p>
          <h2 id="services-title" className="display mt-6 text-[clamp(44px,8vw,128px)] text-white">
            Think big.
            <br />
            <span className="text-teal-light">Make it matter.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-x-12">
          <ul className="md:col-span-7 md:border-t md:border-white/15">
            {SERVICES.map((service, index) => {
              const isActive = index === activeIndex;
              const panelId = `service-panel-${index}`;
              const buttonId = `service-button-${index}`;
              const Icon = service.icon;
              return (
                <li key={service.number} className="border-b border-white/15">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => {
                      if (window.matchMedia('(hover: hover) and (min-width: 768px)').matches) setActiveIndex(index);
                    }}
                    className="group flex w-full items-center gap-6 py-6 text-left md:py-7"
                  >
                    <span
                      className={`font-mono text-[12px] tracking-[0.12em] transition-colors duration-300 ${
                        isActive ? 'text-teal-light' : 'text-white/40'
                      }`}
                    >
                      {service.number}
                    </span>
                    <span
                      className={`font-display text-[22px] font-bold uppercase leading-[1.2] transition-all duration-500 md:text-[34px] ${
                        isActive ? 'translate-x-2 text-white' : 'text-white/60 group-hover:text-white'
                      }`}
                    >
                      {service.name}
                    </span>
                    <ChevronDown
                      className={`ml-auto h-5 w-5 shrink-0 text-teal-light transition-transform duration-500 md:hidden ${
                        isActive ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows] duration-700 ease-out md:hidden ${
                      isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-8 pl-0">
                        <ServiceDetail summary={service.summary} deliverables={service.deliverables} />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:col-span-5 md:block">
            <div className="sticky top-32" aria-live="polite">
              <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden bg-midnight p-10">
                <div
                  key={`visual-${activeIndex}`}
                  className="absolute inset-0 animate-[fade-up_900ms_cubic-bezier(0.22,1,0.36,1)]"
                  aria-hidden="true"
                >
                  <div className="absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full border border-teal-light/30" />
                  <div className="absolute -right-10 -top-10 h-[240px] w-[240px] rounded-full border border-teal/50" />
                  <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-teal-dark/60 via-teal/20 to-transparent" />
                </div>
                <div className="relative flex items-start justify-between">
                  <span className="font-display text-[120px] font-bold leading-[1.2] text-white/10">{active.number}</span>
                  <span className="flex h-14 w-14 items-center justify-center bg-teal">
                    <ActiveIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="relative">
                  <h3 className="font-display text-[32px] font-bold uppercase leading-[1.2]">{active.name}</h3>
                  <ServiceDetail summary={active.summary} deliverables={active.deliverables} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceDetail({ summary, deliverables }: { summary: string; deliverables: string[] }) {
  return (
    <div className="mt-6">
      <p className="text-base leading-[1.5] text-white/75">{summary}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {deliverables.map((item) => (
          <li key={item} className="border border-white/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/80">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
