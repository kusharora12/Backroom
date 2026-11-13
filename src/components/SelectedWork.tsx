import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { PROJECT_PLACEHOLDERS } from '@/data/content';
import { usePinnedHorizontalScroll } from '@/hooks/usePinnedHorizontalScroll';

type Project = (typeof PROJECT_PLACEHOLDERS)[number];

const CARD_ROTATIONS = [-5, 2, -1, 4, -3, 2.5];

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
      className="relative mb-24 min-h-svh overflow-x-clip bg-teal-dark py-16 text-white md:mb-40 md:py-20"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-light">02 &mdash; Work</p>
            <h2 id="work-title" className="display mt-4 text-[clamp(42px,7vw,110px)] text-white">
              Selected work.
            </h2>
          </div>
          <p className="hidden pb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70 md:block">
            Keep scrolling to explore <span className="ml-8 text-teal-light">{String(PROJECT_PLACEHOLDERS.length).padStart(2, '0')} projects</span>
          </p>
        </div>
      </div>

      <div className="relative mt-8 md:mt-12">
        <ul
          ref={trackRef}
          className="hscroll-track no-scrollbar flex w-max items-start gap-6 pl-6 pr-[18vw] md:gap-10 md:pl-12 md:pr-[14vw]"
        >
          {PROJECT_PLACEHOLDERS.map((project, index) => (
            <li
              key={project.id}
              data-hscroll-item
              data-hscroll-curve
              className="group relative w-[78vw] min-w-[280px] max-w-[520px] shrink-0 md:w-[34vw] md:min-w-[460px]"
            >
              <div
                className="will-change-transform transition-[filter] duration-500 group-hover:drop-shadow-[0_36px_60px_rgba(0,0,0,0.45)]"
                style={{ rotate: `${CARD_ROTATIONS[index % CARD_ROTATIONS.length]}deg` }}
              >
                <button
                  type="button"
                  onClick={() => setActive(project)}
                  aria-label={`View ${project.title}`}
                  className="relative block h-[52svh] min-h-[320px] w-full overflow-hidden rounded-xl bg-forest ring-1 ring-white/15 md:h-[68svh]"
                >
                  <div data-hscroll-media className="absolute inset-x-0 -inset-y-[8%]">
                    <img
                      src={project.image}
                      alt={project.alt}
                      width={940}
                      height={650}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-midnight/5 transition-colors duration-500 group-hover:bg-transparent" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-8 w-full max-w-[1440px] px-6 md:mt-12 md:px-12" aria-hidden="true">
        <div className="h-px w-full bg-white/15">
          <div data-hscroll-progressbar className="h-px w-full origin-left scale-x-0 bg-teal-light" />
        </div>
      </div>

      {active && <ProjectDialog project={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-midnight/80 backdrop-blur-sm md:items-center md:p-8"
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="dialog-panel relative w-full max-w-2xl border-t border-teal-light bg-forest p-8 md:p-12"
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
      </div>
    </div>
  );
}
