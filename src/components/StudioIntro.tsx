import Reveal from '@/components/Reveal';
import ScrollText from '@/components/ScrollText';
import { STUDIO_PILLARS } from '@/data/content';

const INTRO_IMAGE =
  'https://images.pexels.com/photos/1364054/pexels-photo-1364054.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function StudioIntro() {
  return (
    <section id="studio" aria-labelledby="studio-title" className="bg-white py-28 text-midnight md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-dark">01 &mdash; The Studio</p>
        </Reveal>

        <Reveal delay={100}>
          <h2 id="studio-title" className="display mt-8 text-[clamp(40px,7vw,112px)] text-midnight">
            Good work gets noticed.
            <br />
            <span className="text-teal">Great work changes things.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-x-12">
          <Reveal className="md:col-span-5 md:col-start-2" delay={150}>
            <div className="overflow-hidden">
              <img
                src={INTRO_IMAGE}
                alt="Concrete architecture with soft light and shadow patterns"
                width={940}
                height={650}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover grayscale-[30%] transition-transform duration-[1400ms] ease-out hover:scale-105"
              />
            </div>
          </Reveal>

          <div className="md:col-span-4 md:col-start-8 md:self-end">
            <ScrollText
              text="We're an independent creative and marketing studio bringing *strategy, *creativity and *execution together. From building distinctive brands to creating digital experiences, we help businesses make a *lasting impression."
              rgb="8,10,11"
              accentRgb="0,127,115"
              mutedAlpha={0.2}
              className="text-lg leading-[1.5] md:text-xl"
            />
          </div>
        </div>

        <div className="mt-24 grid gap-6 md:mt-32 md:grid-cols-3">
          {STUDIO_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={index * 120} className="h-full">
                <div className="group relative h-full overflow-hidden border border-midnight/15 p-10 transition-colors duration-500 hover:border-teal md:p-12">
                  <span
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-teal transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span className="flex h-12 w-12 items-center justify-center bg-teal">
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                  <h3 className="mt-10 font-display text-[32px] font-bold uppercase leading-[1.2] text-midnight transition-colors duration-500 group-hover:text-teal-dark">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-base leading-[1.5] text-midnight/75">{pillar.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
