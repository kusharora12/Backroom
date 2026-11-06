import { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { PROJECT_PLACEHOLDERS } from '@/data/content';

type Project = (typeof PROJECT_PLACEHOLDERS)[number];

export default function SelectedWork() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" aria-labelledby="work-title" className="bg-midnight py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-light">02 &mdash; Work</p>
            <h2 id="work-title" className="display mt-6 text-[clamp(48px,9vw,144px)] text-white">
              Selected Work.
            </h2>
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9" delay={150}>
            <p className="text-lg leading-[1.5] text-white/75">
              Ideas brought to life. Brands made impossible to ignore.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
              Placeholder projects shown until approved portfolio material is supplied.
            </p>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-16 md:mt-28 md:grid-cols-12 md:gap-x-10 md:gap-y-24">
          {PROJECT_PLACEHOLDERS.map((project, index) => (
            <Reveal as="li" key={project.id} className={`group ${project.span} ${project.offset}`} delay={index * 80}>
              <article>
                <div className={`relative overflow-hidden bg-forest ${project.aspect}`}>
                  <img
                    src={project.image}
                    alt={project.alt}
                    width={940}
                    height={650}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 bg-midnight/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/80">
                    Placeholder
                  </span>
                </div>

                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/60 transition-colors duration-300 group-hover:text-teal-light">
                      {String(index + 1).padStart(2, '0')} / {project.category}
                    </p>
                    <h3 className="mt-3 font-display text-[28px] font-bold uppercase leading-[1.2] text-white transition-transform duration-500 group-hover:translate-x-2 md:text-[36px]">
                      {project.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActive(project)}
                    className="mt-2 flex shrink-0 items-center gap-2 border-b border-white/30 pb-1 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-teal-light hover:text-teal-light"
                  >
                    View project
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-4 grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="max-w-md pb-1 text-[15px] leading-[1.5] text-white/70">{project.description}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>

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
