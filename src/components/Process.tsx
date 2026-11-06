import Reveal from '@/components/Reveal';
import { PROCESS_STEPS } from '@/data/content';

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-midnight py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-light">06 &mdash; Process</p>
          <h2 id="process-title" className="display mt-6 max-w-5xl text-[clamp(40px,7vw,112px)] text-white">
            From first thought to <span className="text-teal-light">final execution.</span>
          </h2>
        </Reveal>

        <ol className="relative mt-20 flex flex-col gap-12 md:mt-28 md:flex-row md:gap-0">
          <span
            className="absolute bottom-6 left-[15px] top-6 w-px bg-white/15 md:bottom-auto md:left-0 md:right-0 md:top-[15px] md:h-px md:w-full"
            aria-hidden="true"
          />
          {PROCESS_STEPS.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 120} className="relative flex gap-8 pl-12 md:flex-1 md:flex-col md:gap-0 md:pl-0 md:pr-10">
              <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center bg-midnight md:static md:mb-10 md:h-8 md:w-auto md:justify-start md:bg-transparent">
                <span className="h-3 w-3 rounded-none bg-teal-light ring-4 ring-midnight md:ring-0" aria-hidden="true" />
              </span>
              <div className="md:mt-0">
                <p className="font-mono text-[12px] tracking-[0.14em] text-teal-light">{step.number}</p>
                <h3 className="mt-4 font-display text-[32px] font-bold uppercase leading-[1.2] text-white md:text-[40px]">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-xs text-[15px] leading-[1.5] text-white/70">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
