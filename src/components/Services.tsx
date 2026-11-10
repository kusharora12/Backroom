import { useState } from 'react';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import Reveal from '@/components/Reveal';
import ScrollText from '@/components/ScrollText';
import { WHATSAPP_URL } from '@/data/content';
import { SERVICE_CATEGORIES } from '@/data/services';

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="services" aria-labelledby="services-title" className="bg-ivory py-28 text-midnight md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-dark">03 &mdash; What we do</p>
            <h2 id="services-title" className="display mt-6 text-[clamp(44px,7.5vw,120px)] text-midnight">
              A range of ideas.
              <br />
              <span className="text-teal-dark">One creative partner.</span>
            </h2>
          </Reveal>
          <div className="md:col-span-4 md:col-start-9">
            <ScrollText
              text="From building brands and designing digital experiences to driving growth through *marketing, *content and *technology, we bring different creative disciplines together to help businesses move forward."
              rgb="8,10,11"
              accentRgb="0,127,115"
              mutedAlpha={0.2}
              className="text-lg leading-[1.5]"
            />
          </div>
        </div>

        <ul className="mt-20 border-t border-midnight/15 md:mt-28">
          {SERVICE_CATEGORIES.map((category, index) => {
            const isOpen = openIndex === index;
            const buttonId = `service-button-${index}`;
            const panelId = `service-panel-${index}`;
            return (
              <Reveal as="li" key={category.number} delay={index * 60} className="border-b border-midnight/15">
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group flex w-full items-center gap-4 py-7 text-left md:gap-10 md:py-9"
                >
                  <span className="font-mono text-[12px] tracking-[0.14em] text-teal-dark">{category.number}</span>
                  <span
                    className={`font-display text-[clamp(24px,4.4vw,64px)] font-bold uppercase leading-[1.2] transition-all duration-500 ${
                      isOpen ? 'translate-x-2 text-teal-dark' : 'text-midnight/80 group-hover:translate-x-2 group-hover:text-teal-dark'
                    }`}
                  >
                    {category.name}
                  </span>
                  <span className="ml-auto hidden font-mono text-[11px] uppercase tracking-[0.12em] text-midnight/55 lg:block">
                    {category.subservices.length} services
                  </span>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-500 ${
                      isOpen ? 'rotate-45 border-teal-dark bg-teal-dark text-ivory' : 'border-midnight/30 group-hover:border-teal-dark'
                    }`}
                    aria-hidden="true"
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="grid gap-10 pb-14 md:grid-cols-12 md:gap-12 md:pb-20">
                      <div className="md:col-span-5">
                        <div className={`image-reveal group relative aspect-[4/3] overflow-hidden bg-forest md:aspect-[4/5] ${isOpen ? 'is-visible' : ''}`}>
                          <img
                            src={category.image}
                            alt={category.alt}
                            width={940}
                            height={650}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-7">
                        <p className="max-w-xl text-base leading-[1.5] text-midnight/75 md:text-lg">{category.summary}</p>
                        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                          {category.subservices.map((service, subIndex) => (
                            <li
                              key={service.name}
                              className={`border-t border-midnight/10 pt-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                              }`}
                              style={{ transitionDelay: isOpen ? `${150 + subIndex * 60}ms` : '0ms' }}
                            >
                              <p className="font-mono text-[11px] tracking-[0.12em] text-teal-dark">
                                {String(subIndex + 1).padStart(2, '0')}
                              </p>
                              <h4 className="mt-2 font-sans text-base font-semibold text-midnight">{service.name}</h4>
                              <p className="mt-2 text-[15px] leading-[1.5] text-midnight/70">{service.description}</p>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-12 flex flex-wrap items-center gap-4">
                          <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={isOpen ? 0 : -1}
                            className="group/cta btn-primary"
                          >
                            Let&apos;s Talk
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" aria-hidden="true" />
                          </a>
                          <button
                            type="button"
                            tabIndex={isOpen ? 0 : -1}
                            onClick={() => setOpenIndex(null)}
                            className="group/close inline-flex items-center justify-center gap-2 border border-midnight/30 px-7 py-4 font-sans text-sm font-medium uppercase tracking-[0.12em] text-midnight transition-colors duration-300 hover:border-teal-dark hover:text-teal-dark"
                          >
                            Collapse
                            <Minus className="h-4 w-4 transition-transform duration-300 group-hover/close:rotate-90" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
