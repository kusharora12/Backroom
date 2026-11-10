import Reveal from '@/components/Reveal';
import ScrollText from '@/components/ScrollText';
import { STUDIO_PILLARS } from '@/data/content';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-teal-dark py-28 text-white md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-light">05 &mdash; About</p>
          <h2 id="about-title" className="display mt-6 max-w-5xl text-[clamp(44px,7.5vw,120px)] text-white">
            We challenge the obvious. <span className="text-teal-light">On purpose.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-x-12">
          <div className="space-y-8 md:col-span-7 md:col-start-6">
            <ScrollText
              text="BACKROOM is an independent creative and marketing studio. We believe the most useful work starts by questioning the brief, not by decorating it."
              rgb="255,255,255"
              accentRgb="53,181,163"
              mutedAlpha={0.25}
              className="text-xl leading-[1.5] md:text-2xl"
            />
            <ScrollText
              text="A brand is what people feel after they meet it, so we shape identity, content, websites and campaigns as one connected experience."
              rgb="255,255,255"
              accentRgb="53,181,163"
              mutedAlpha={0.25}
              className="text-lg leading-[1.5] md:text-xl"
            />
            <ScrollText
              text="We work with businesses that want to be noticed for the right reasons and are happy to think differently about how they show up."
              rgb="255,255,255"
              accentRgb="53,181,163"
              mutedAlpha={0.25}
              className="text-lg leading-[1.5] md:text-xl"
            />
          </div>
        </div>

        <div className="mt-24 grid gap-6 md:mt-32 md:grid-cols-3">
          {STUDIO_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={index * 120} className="h-full">
                <div className="group relative h-full overflow-hidden border border-white/20 p-10 transition-colors duration-500 hover:border-teal-light md:p-12">
                  <span
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-teal-light transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span className="flex h-12 w-12 items-center justify-center bg-teal-light">
                    <Icon className="h-5 w-5 text-midnight" aria-hidden="true" />
                  </span>
                  <h3 className="mt-10 font-display text-[32px] font-bold uppercase leading-[1.2] text-white transition-colors duration-500 group-hover:text-teal-light">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-base leading-[1.5] text-white/80">{pillar.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
