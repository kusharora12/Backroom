import Reveal from '@/components/Reveal';
import { PRINCIPLES } from '@/data/content';

export default function WhyBackroom() {
  return (
    <section id="why" aria-labelledby="why-title" className="bg-white py-28 text-midnight md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-dark">05 &mdash; Why Backroom</p>
          <h2 id="why-title" className="display mt-6 text-[clamp(44px,8vw,128px)] text-midnight">
            Not here to <span className="text-teal">blend in.</span>
          </h2>
        </Reveal>

        <ol className="mt-16 border-t border-midnight/15 md:mt-24">
          {PRINCIPLES.map((principle, index) => (
            <Reveal as="li" key={principle} delay={index * 90}>
              <div className="group grid cursor-default grid-cols-[auto_1fr] items-baseline gap-x-6 border-b border-midnight/15 py-6 transition-colors duration-500 hover:bg-midnight hover:px-6 hover:text-white md:grid-cols-[120px_1fr_auto] md:gap-x-10 md:py-9">
                <span className="font-mono text-[12px] tracking-[0.12em] text-teal-dark transition-colors duration-500 group-hover:text-teal-light">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[clamp(24px,4.4vw,64px)] font-bold uppercase leading-[1.2] tracking-[-0.01em] transition-transform duration-500 group-hover:translate-x-2">
                  {principle}
                </span>
                <span
                  className="hidden h-px w-16 origin-left scale-x-0 bg-teal-light transition-transform duration-700 group-hover:scale-x-100 md:block"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
