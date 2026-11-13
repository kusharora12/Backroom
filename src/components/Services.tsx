import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Plus, X } from 'lucide-react';
import { WHATSAPP_URL } from '@/data/content';
import { SERVICE_CATEGORIES, type ServiceCategory } from '@/data/services';
import { usePinnedHorizontalScroll } from '@/hooks/usePinnedHorizontalScroll';

type PanelStyle = {
  widthClass: string;
  yOffset: string;
  rotation: number;
  tilt: number;
  treatment: string;
  titlePosition: 'top' | 'bottom';
  numberSize: string;
  accent: string;
  imageHeight: string;
};

const PANEL_STYLES: PanelStyle[] = [
  { widthClass: 'w-[80vw] md:w-[34vw] md:min-w-[440px]', yOffset: 'md:mt-0', rotation: 0, tilt: 0, treatment: '', titlePosition: 'bottom', numberSize: 'text-[clamp(52px,5.5vw,92px)]', accent: 'text-white', imageHeight: 'h-[52svh] md:h-[64svh]' },
  { widthClass: 'w-[80vw] md:w-[34vw] md:min-w-[440px]', yOffset: 'md:mt-0', rotation: 0, tilt: 0, treatment: '', titlePosition: 'bottom', numberSize: 'text-[clamp(52px,5.5vw,92px)]', accent: 'text-white', imageHeight: 'h-[52svh] md:h-[64svh]' },
  { widthClass: 'w-[80vw] md:w-[34vw] md:min-w-[440px]', yOffset: 'md:mt-0', rotation: 0, tilt: 0, treatment: '', titlePosition: 'bottom', numberSize: 'text-[clamp(52px,5.5vw,92px)]', accent: 'text-white', imageHeight: 'h-[52svh] md:h-[64svh]' },
  { widthClass: 'w-[80vw] md:w-[34vw] md:min-w-[440px]', yOffset: 'md:mt-0', rotation: 0, tilt: 0, treatment: '', titlePosition: 'bottom', numberSize: 'text-[clamp(52px,5.5vw,92px)]', accent: 'text-white', imageHeight: 'h-[52svh] md:h-[64svh]' },
  { widthClass: 'w-[80vw] md:w-[34vw] md:min-w-[440px]', yOffset: 'md:mt-0', rotation: 0, tilt: 0, treatment: '', titlePosition: 'bottom', numberSize: 'text-[clamp(52px,5.5vw,92px)]', accent: 'text-white', imageHeight: 'h-[52svh] md:h-[64svh]' },
  { widthClass: 'w-[80vw] md:w-[34vw] md:min-w-[440px]', yOffset: 'md:mt-0', rotation: 0, tilt: 0, treatment: '', titlePosition: 'bottom', numberSize: 'text-[clamp(52px,5.5vw,92px)]', accent: 'text-white', imageHeight: 'h-[52svh] md:h-[64svh]' },
  { widthClass: 'w-[80vw] md:w-[34vw] md:min-w-[440px]', yOffset: 'md:mt-0', rotation: 0, tilt: 0, treatment: '', titlePosition: 'bottom', numberSize: 'text-[clamp(52px,5.5vw,92px)]', accent: 'text-white', imageHeight: 'h-[52svh] md:h-[64svh]' },
  { widthClass: 'w-[80vw] md:w-[34vw] md:min-w-[440px]', yOffset: 'md:mt-0', rotation: 0, tilt: 0, treatment: '', titlePosition: 'bottom', numberSize: 'text-[clamp(52px,5.5vw,92px)]', accent: 'text-white', imageHeight: 'h-[52svh] md:h-[64svh]' },
  { widthClass: 'w-[80vw] md:w-[34vw] md:min-w-[440px]', yOffset: 'md:mt-0', rotation: 0, tilt: 0, treatment: '', titlePosition: 'bottom', numberSize: 'text-[clamp(52px,5.5vw,92px)]', accent: 'text-white', imageHeight: 'h-[52svh] md:h-[64svh]' }
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  usePinnedHorizontalScroll(sectionRef, trackRef);

  const closeDialog = useCallback(() => setActiveIndex(null), []);
  const activeCategory = activeIndex === null ? null : SERVICE_CATEGORIES[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-title"
      className="relative min-h-svh overflow-x-clip bg-ivory py-16 text-midnight md:py-20"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-dark">03 &mdash; What we do</p>
            <h2 id="services-title" className="display mt-4 text-[clamp(36px,5.5vw,92px)] text-midnight">
              Nine disciplines.
              <br />
              <span className="text-teal-dark">One creative partner.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="hidden max-w-sm text-base leading-[1.5] text-midnight/75 md:block">
              From building brands and designing digital experiences to driving growth, every discipline is planned
              together so the work stays consistent everywhere.
            </p>
            <p className="mt-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-midnight/60">
              <span>Keep scrolling to explore</span>
              <span className="text-teal-dark">09 categories</span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-10 md:mt-14">
        <ul ref={trackRef} className="hscroll-track no-scrollbar flex w-max items-start gap-8 pl-6 pr-[14vw] md:gap-12 md:pl-12 md:pr-[12vw]">
          {SERVICE_CATEGORIES.map((category, index) => {
            const style = PANEL_STYLES[index];
            return (
              <li
                key={category.number}
                data-hscroll-item
                className={`shrink-0 ${style.widthClass} ${style.yOffset}`}
              >
                <div
                  data-hscroll-tilt
                  data-tilt={style.tilt}
                  className="will-change-transform"
                  style={{ rotate: `${style.rotation}deg` }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-haspopup="dialog"
                    className="group relative block w-full overflow-hidden rounded-xl text-left shadow-[0_28px_70px_-30px_rgba(8,10,11,0.55)] ring-1 ring-midnight/10"
                  >
                    <div className={`relative overflow-hidden ${style.imageHeight}`}>
                      <div data-hscroll-media className="absolute inset-x-0 h-[115%] -top-[7.5%]">
                        <img
                          src={category.image}
                          alt={category.alt}
                          width={940}
                          height={650}
                          loading="lazy"
                          className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105 ${style.treatment}`}
                        />
                      </div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-midnight/10 transition-opacity duration-500 ${
                          style.titlePosition === 'top' ? 'opacity-90' : 'opacity-75 group-hover:opacity-95'
                        }`}
                        aria-hidden="true"
                      />

                      {style.titlePosition === 'top' ? (
                        <div className="relative flex h-full flex-col justify-between p-7 md:p-8">
                          <div>
                            <span className={`font-display ${style.numberSize} font-bold leading-none ${style.accent} opacity-90 transition-colors duration-500 group-hover:text-teal-light`}>
                              {category.number}
                            </span>
                            <h3 className="mt-4 max-w-[10ch] font-display text-[clamp(26px,2.6vw,42px)] font-bold uppercase leading-[1.1] text-white">
                              {category.name}
                            </h3>
                          </div>
                          <div className="flex items-end justify-between gap-4">
                            <p className="max-w-[26ch] text-[13px] leading-[1.5] text-white/80">{category.summary}</p>
                            <OpenIndicator subservices={category.subservices.length} />
                          </div>
                        </div>
                      ) : (
                        <div className="relative flex h-full flex-col justify-end p-7 md:p-8">
                          <span className={`font-display ${style.numberSize} font-bold leading-none ${style.accent} opacity-90 transition-colors duration-500 group-hover:text-teal-light`}>
                            {category.number}
                          </span>
                          <h3 className="mt-4 max-w-[12ch] font-display text-[clamp(26px,2.6vw,42px)] font-bold uppercase leading-[1.1] text-white">
                            {category.name}
                          </h3>
                          <div className="mt-5 flex items-end justify-between gap-4">
                            <p className="max-w-[26ch] text-[13px] leading-[1.5] text-white/80">{category.summary}</p>
                            <OpenIndicator subservices={category.subservices.length} />
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              </li>
            );
          })}

          <li data-hscroll-item className="flex w-[70vw] shrink-0 items-center md:h-[60svh] md:w-[30vw] md:min-w-[400px]">
            <div className="flex flex-col items-start gap-6 p-4 md:p-8">
              <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-dark">Everything under one roof</span>
              <p className="display text-[clamp(28px,3vw,52px)] text-midnight">
                Not sure where
                <br />
                to start?
              </p>
              <p className="max-w-[34ch] text-base leading-[1.5] text-midnight/70">
                Tell us the problem and we&apos;ll pull together the right mix of disciplines for it.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta inline-flex items-center gap-2 bg-teal px-7 py-4 font-sans text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-teal-light hover:text-midnight"
              >
                Let&apos;s Talk
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </li>
        </ul>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[1440px] px-6 md:mt-14 md:px-12" aria-hidden="true">
        <div className="h-px w-full bg-midnight/15">
          <div data-hscroll-progressbar className="h-px w-full origin-left scale-x-0 bg-teal-dark" />
        </div>
      </div>

      {activeCategory && <ServiceOverlay category={activeCategory} onClose={closeDialog} />}
    </section>
  );
}

function OpenIndicator({ subservices }: { subservices: number }) {
  return (
    <span className="flex shrink-0 items-center gap-3">
      <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-white/75 sm:inline">
        {subservices} services
      </span>
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 transition-all duration-500 group-hover:rotate-90 group-hover:border-teal-light group-hover:bg-teal-light group-hover:text-midnight">
        <Plus className="h-4 w-4" aria-hidden="true" />
      </span>
    </span>
  );
}

function ServiceOverlay({ category, onClose }: { category: ServiceCategory; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-midnight/85 backdrop-blur-sm md:items-center md:p-8" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-overlay-title"
        className="dialog-panel relative flex max-h-[92svh] w-full max-w-5xl flex-col overflow-y-auto overscroll-contain rounded-t-2xl bg-ivory text-midnight md:max-h-[88svh] md:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[16/7] shrink-0 overflow-hidden bg-forest">
          <img src={category.image} alt={category.alt} width={940} height={650} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" aria-hidden="true" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close service details"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center bg-midnight/70 text-white transition-colors duration-300 hover:bg-teal-light hover:text-midnight"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="absolute bottom-5 left-6 font-mono text-[12px] tracking-[0.14em] text-teal-light md:left-10">
            {category.number} / 09
          </span>
        </div>

        <div className="flex flex-col gap-10 p-6 md:p-12">
          <div className="grid gap-6 md:grid-cols-12 md:gap-10">
            <h3 id="service-overlay-title" className="font-display text-[clamp(32px,4.5vw,56px)] font-bold uppercase leading-[1.2] md:col-span-6">
              {category.name}
            </h3>
            <p className="text-base leading-[1.5] text-midnight/75 md:col-span-6 md:text-lg">{category.summary}</p>
          </div>

          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {category.subservices.map((service, index) => (
              <li
                key={service.name}
                className="dialog-item border-t border-midnight/10 pt-5"
                style={{ animationDelay: `${180 + index * 50}ms` }}
              >
                <p className="font-mono text-[11px] tracking-[0.12em] text-teal-dark">{String(index + 1).padStart(2, '0')}</p>
                <h4 className="mt-2 font-sans text-base font-semibold text-midnight">{service.name}</h4>
                <p className="mt-2 text-[15px] leading-[1.5] text-midnight/70">{service.description}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4 border-t border-midnight/10 pt-8">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="group/cta btn-primary">
              Let&apos;s Talk
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="border border-midnight/30 px-7 py-4 font-sans text-sm font-medium uppercase tracking-[0.12em] text-midnight transition-colors duration-300 hover:border-teal-dark hover:text-teal-dark"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
