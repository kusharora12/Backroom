import { useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { PROJECT_CARD_LAYOUTS, PROJECT_PLACEHOLDERS } from '@/data/content';
import { usePinnedHorizontalScroll } from '@/hooks/usePinnedHorizontalScroll';

type Project = (typeof PROJECT_PLACEHOLDERS)[number];

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
      className="relative overflow-hidden bg-teal-dark py-24 text-white motion-safe:md:flex motion-safe:md:h-svh motion-safe:md:flex-col motion-safe:md:justify-center motion-safe:md:py-0"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-light">02 &mdash; Work</p>
            <h2 id="work-title" className="display mt-4 text-[clamp(40px,7vw,110px)] text-white">
              Selected work.
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="max-w-sm text-base leading-[1.5] text-white/85">
              Ideas brought to life. Brands made impossible to ignore.
            </p>
            <p className="mt-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
              <span>Keep scrolling to explore</span>
              <span className="text-teal-light">{String(PROJECT_PLACEHOLDERS.length).padStart(2, '0')} projects</span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-12 md:mt-14">
        <ul
          ref={trackRef}
          className="hscroll-track no-scrollbar flex w-max items-start gap-8 pl-6 pr-[16vw] md:gap-14 md:pl-12 md:pr-[14vw]"
        >
          {PROJECT_PLACEHOLDERS.map((project, index) => {
            const layout = PROJECT_CARD_LAYOUTS[index % PROJECT_CARD_LAYOUTS.length];
            return (
              <li
                key={project.id}
                data-hscroll-item
                className={`group relative shrink-0 transition-z-index duration-300 hover:z-10 ${
                  index > 0 ? (index % 2 === 1 ? '-ml-2 md:-ml-14' : '-ml-1 md:-ml-8') : ''
                } ${layout.widthClass} ${layout.yOffset}`}
                style={{ ['--card-rotation' as string]: `${layout.rotation}deg` }}
              >
                <div
                  data-hscroll-tilt
                  data-tilt={layout.tilt}
                  className="will-change-transform transition-shadow duration-500 group-hover:drop-shadow-[0_36px_60px_rgba(0,0,0,0.55)]"
                  style={{ rotate: `${layout.rotation}deg` }}
                >
                  <article className="relative overflow-hidden rounded-xl bg-forest shadow-[0_28px_70px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
                    <div className={`relative overflow-hidden ${layout.aspect}`}>
                      <div data-hscroll-media className={`absolute inset-x-0 ${layout.mediaScale}`}>
                        <img
                          src={project.image}
                          alt={project.alt}
                          width={940}
                          height={650}
                          loading="lazy"
                          className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105 ${layout.imageTreatment}`}
                        />
                      </div>
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/20 to-transparent transition-opacity duration-500 group-hover:opacity-90"
                        aria-hidden="true"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-midnight/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
                        {String(index + 1).padStart(2, '0')} &mdash; {project.category}
                      </span>

                      {layout.titleOverlay && (
                        <div className="pointer-events-none absolute inset-x-5 bottom-5 overflow-hidden md:inset-x-7 md:bottom-7">
                          <h3 data-hscroll-title className="font-display text-[clamp(30px,3.4vw,52px)] font-bold uppercase leading-[1.05] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.65)]">
                            {project.title}
                          </h3>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-5 p-6 md:p-7">
                      {!layout.titleOverlay && (
                        <div className="overflow-hidden">
                          <h3 data-hscroll-title className="font-display text-[clamp(26px,2.6vw,40px)] font-bold uppercase leading-[1.1] text-white">
                            {project.title}
                          </h3>
                        </div>
                      )}
                      <p className="text-[14px] leading-[1.55] text-white/80">{project.description}</p>
                      <div className="flex items-end justify-between gap-4">
                        <p className="max-w-[60%] font-mono text-[10px] uppercase leading-[1.6] tracking-[0.12em] text-teal-light">
                          {project.services.join(' · ')}
                        </p>
                        <button
                          type="button"
                          onClick={() => setActive(project)}
                          className="flex items-center gap-2 border-b border-white/40 pb-1 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-teal-light hover:text-teal-light"
                        >
                          View project
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              </li>
            );
          })}

          <li data-hscroll-item className="flex w-[70vw] shrink-0 items-center md:w-[32vw] md:min-w-[420px]">
            <a
              href="#contact"
              className="group/cta flex w-full flex-col items-start justify-center gap-6 rounded-xl border border-white/25 bg-forest/60 p-8 transition-colors duration-500 hover:border-teal-light md:p-12"
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-light">Your project next</span>
              <span className="display text-[clamp(30px,3.4vw,56px)] text-white">
                Let&apos;s make
                <br />
                something
                <br />
                unmissable.
              </span>
              <span className="inline-flex items-center gap-2 bg-teal px-7 py-4 font-sans text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 group-hover/cta:bg-teal-light group-hover/cta:text-midnight">
                Start a project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div className="mx-auto mt-12 w-full max-w-[1440px] px-6 md:mt-16 md:px-12" aria-hidden="true">
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
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
          Full case study to follow once approved.
        </p>
      </div>
    </div>
  );
}
