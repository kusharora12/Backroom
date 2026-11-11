import { useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { PROJECT_PLACEHOLDERS } from '@/data/content';
import { usePinnedHorizontalScroll } from '@/hooks/usePinnedHorizontalScroll';

type Project = (typeof PROJECT_PLACEHOLDERS)[number];

const CARD_LAYOUTS = [
  'w-[86vw] max-w-[440px] md:w-[46vw] md:min-w-[580px] md:mt-0',
  'w-[78vw] max-w-[380px] md:w-[24vw] md:min-w-[340px] md:mt-24',
  'w-[86vw] max-w-[440px] md:w-[34vw] md:min-w-[460px] md:mt-10',
  'w-[80vw] max-w-[400px] md:w-[28vw] md:min-w-[380px] md:mt-40',
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<Project | null>(null);
  usePinnedHorizontalScroll(sectionRef, trackRef);

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="work-title"
      className="overflow-hidden bg-teal-dark py-28 text-white motion-safe:md:flex motion-safe:md:h-screen motion-safe:md:flex-col motion-safe:md:justify-center motion-safe:md:py-0"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-light">02 &mdash; Work</p>
            <h2 id="work-title" className="display mt-6 text-[clamp(48px,8vw,128px)] text-white">
              Selected work.
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-lg leading-[1.5] text-white/85">Ideas brought to life. Brands made impossible to ignore.</p>
            <p className="mt-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
              <span>Scroll to explore</span>
              <span className="text-teal-light">{String(PROJECT_PLACEHOLDERS.length).padStart(2, '0')} projects</span>
            </p>
          </div>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="mobile-horizontal-track no-scrollbar mt-14 flex snap-x snap-mandatory items-start gap-6 overflow-x-auto overscroll-x-contain px-6 pb-4 touch-pan-x scroll-smooth md:mt-16 md:gap-12 md:px-12 motion-safe:md:w-max motion-safe:md:snap-none motion-safe:md:overflow-visible md:pr-[12vw]"
      >
        {PROJECT_PLACEHOLDERS.map((project, index) => (
          <li
            key={project.id}
            data-hscroll-item
            className={`group relative shrink-0 snap-start md:h-[60vh] ${CARD_LAYOUTS[index % CARD_LAYOUTS.length]}`}
          >
            <article className="flex h-full flex-col">
              <div className="relative aspect-[4/5] overflow-hidden bg-forest md:aspect-auto md:min-h-0 md:flex-1">
                <div data-hscroll-media className="absolute inset-x-0 -inset-y-[10%]">
                  <img
                    src={project.image}
                    alt={project.alt}
                    width={940}
                    height={650}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                </div>
                <span className="absolute left-4 top-4 bg-midnight/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85">
                  Placeholder
                </span>
                <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-teal-light transition-transform duration-700 ease-out group-hover:scale-x-100" aria-hidden="true" />
              </div>

              <div className="mt-6 overflow-hidden">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-teal-light">
                  {String(index + 1).padStart(2, '0')} / {project.category}
                </p>
                <h3 data-hscroll-title className="mt-3 font-display text-[28px] font-bold uppercase leading-[1.2] text-white md:text-[36px]">
                  {project.title}
                </h3>
              </div>

              <p className="mt-4 max-w-md text-[15px] leading-[1.5] text-white/80">{project.description}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white/65">{project.services.join(' · ')}</p>

              <button
                type="button"
                onClick={() => setActive(project)}
                className="mt-6 flex items-center gap-2 self-start border-b border-white/40 pb-1 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-teal-light hover:text-teal-light"
              >
                View project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
            </article>
          </li>
        ))}
      </ul>

      {active && <ProjectDialog project={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-midnight/80 p-0 backdrop-blur-sm md:items-center md:p-8"
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="relative w-full max-w-2xl border-t border-teal-light bg-forest p-8 md:p-12"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-white/70 transition-colors hover:text-teal-light"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-teal-light">{project.category}</p>
        <h3 id="project-dialog-title" className="mt-4 font-display text-[36px] font-bold uppercase leading-[1.2]">
          {project.title}
        </h3>
        <p className="mt-6 text-base leading-[1.5] text-white/75">{project.description}</p>
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">Services delivered</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-white/85">
            {project.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
          Full case study to follow once approved.
        </p>
      </div>
    </div>
  );
}
