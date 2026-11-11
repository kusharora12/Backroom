import { useCallback, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import ScrollText from '@/components/ScrollText';
import ServiceDialog from '@/components/ServiceDialog';
import { usePinnedHorizontalScroll } from '@/hooks/usePinnedHorizontalScroll';
import { SERVICE_CATEGORIES } from '@/data/services';

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  usePinnedHorizontalScroll(sectionRef, trackRef);

  const closeDialog = useCallback(() => setActiveIndex(null), []);
  const activeCategory = activeIndex === null ? null : SERVICE_CATEGORIES[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-title"
      className="overflow-hidden bg-ivory py-28 text-midnight motion-safe:md:flex motion-safe:md:h-screen motion-safe:md:flex-col motion-safe:md:justify-center motion-safe:md:py-0"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-dark">03 &mdash; What we do</p>
            <h2 id="services-title" className="display mt-6 text-[clamp(44px,6vw,96px)] text-midnight">
              A range of ideas.
              <br />
              <span className="text-teal-dark">One creative partner.</span>
            </h2>
          </div>
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
      </div>

      <ul
        ref={trackRef}
        className="mobile-horizontal-track no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-6 pb-4 touch-pan-x scroll-smooth md:mt-16 md:gap-6 md:px-12 motion-safe:md:w-max motion-safe:md:snap-none motion-safe:md:overflow-visible md:pr-[10vw]"
      >
        {SERVICE_CATEGORIES.map((category, index) => (
          <li
            key={category.number}
            data-hscroll-item
            className="relative h-[68vw] min-h-[320px] w-[82vw] max-w-[420px] shrink-0 snap-start md:h-[54vh] md:min-h-[400px] md:w-[34vw] md:min-w-[420px] md:max-w-[520px]"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-haspopup="dialog"
              className="group relative flex h-full w-full flex-col justify-between overflow-hidden bg-forest p-7 text-left text-white md:p-9"
            >
              <div data-hscroll-media className="absolute inset-x-0 -inset-y-[10%]">
                <img
                  src={category.image}
                  alt={category.alt}
                  width={940}
                  height={650}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/55 to-midnight/15 transition-opacity duration-500 group-hover:opacity-90" aria-hidden="true" />

              <div className="relative flex items-start justify-between">
                <span className="font-mono text-[12px] tracking-[0.14em] text-teal-light">{category.number}</span>
                <span
                  className="flex h-11 w-11 items-center justify-center border border-white/40 transition-all duration-500 group-hover:rotate-90 group-hover:border-teal-light group-hover:bg-teal-light group-hover:text-midnight"
                  aria-hidden="true"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </div>

              <div className="relative">
                <h3 className="font-display text-[clamp(26px,2.4vw,40px)] font-bold uppercase leading-[1.2] text-white">
                  {category.name}
                </h3>
                <p className="mt-4 line-clamp-2 text-[15px] leading-[1.5] text-white/80">{category.summary}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white/75">
                  <span>{category.subservices.length} services</span>
                  <span className="text-teal-light transition-colors duration-300 group-hover:text-white">Open</span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {activeCategory && <ServiceDialog category={activeCategory} onClose={closeDialog} />}
    </section>
  );
}
