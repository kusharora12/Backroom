import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const steps = gsap.utils.toArray<HTMLElement>('[data-step]', section);

      const setActive = (progress: number) => {
        steps.forEach((step, index) => {
          step.dataset.active = index / steps.length < progress ? 'true' : 'false';
        });
      };

      gsap.fromTo(
        '[data-progress-line]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 75%',
            scrub: true,
            onUpdate: (self) => setActive(self.progress),
          },
        }
      );

      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.35 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" aria-labelledby="process-title" className="bg-midnight py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-light">04 &mdash; Our approach</p>
        <h2 id="process-title" className="display mt-6 max-w-5xl text-[clamp(40px,7vw,112px)] text-white">
          Good work. <span className="text-teal-light">Great process.</span>
        </h2>

        <div className="relative mt-20 md:mt-28">
          <div className="absolute left-0 top-0 hidden h-px w-full bg-white/10 md:block" aria-hidden="true">
            <div data-progress-line className="h-px w-full origin-left scale-y-100 bg-teal-light" style={{ transform: 'scaleX(0)' }} />
          </div>
          <ol className="grid gap-0 md:grid-cols-5">
            {PROCESS_STEPS.map((step, index) => (
              <li
                key={step.number}
                data-step
                data-active="false"
                className="group relative border-t border-white/15 py-10 pr-6 transition-colors duration-500 hover:border-teal-light md:py-12 md:pr-8"
              >
                <span
                  className="absolute left-0 top-[-1px] h-[3px] w-full origin-left scale-x-0 bg-teal-light transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <p className="font-display text-[clamp(56px,7vw,112px)] font-bold leading-[1] text-white transition-colors duration-500 group-hover:text-teal-light">
                  {step.number}
                </p>
                <h3 className="mt-6 font-display text-[28px] font-bold uppercase leading-[1.2] text-white transition-transform duration-500 group-hover:translate-x-1 md:text-[32px]">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-xs text-[15px] leading-[1.5] text-white/75">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
