import Reveal from '@/components/Reveal';
import { PROCESS_STEPS } from '@/data/content';

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-midnight py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-light">04 &mdash; Our approach</p>
          <h2 id="process-title" className="display mt-6 max-w-5xl text-[clamp(40px,7vw,112px)] text-white">
            Good work. <span className="text-teal-light">Great process.</span>
          </h2>
        </Reveal>

        <ol className="mt-20 grid gap-0 md:mt-28 md:grid-cols-5">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal
              as="li"
              key={step.number}
              delay={index * 120}
              className="group relative border-t border-white/15 py-10 pr-6 transition-colors duration-500 hover:border-teal-light md:py-12 md:pr-8"
            >
              <span
                className="absolute left-0 top-[-1px] h-[3px] w-full origin-left scale-x-0 bg-teal-light transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                aria-hidden="true"
              />
              <p className="font-display text-[clamp(56px,7vw,112px)] font-bold leading-[1] text-white/15 transition-colors duration-500 group-hover:text-teal-light/60">
                {step.number}
              </p>
              <h3 className="mt-6 font-display text-[28px] font-bold uppercase leading-[1.2] text-white transition-transform duration-500 group-hover:translate-x-1 md:text-[32px]">
                {step.title}
              </h3>
              <p className="mt-4 max-w-xs text-[15px] leading-[1.5] text-white/75">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
