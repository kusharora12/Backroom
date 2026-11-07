import Reveal from '@/components/Reveal';
import ScrollText from '@/components/ScrollText';

const ABOUT_IMAGE =
  'https://images.pexels.com/photos/7091834/pexels-photo-7091834.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-midnight py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-12 md:gap-x-12">
          <Reveal className="md:col-span-5">
            <div className="relative overflow-hidden">
              <img
                src={ABOUT_IMAGE}
                alt="Creative workspace with a magazine and natural light"
                width={940}
                height={650}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 h-1 w-full bg-teal" aria-hidden="true" />
            </div>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7 md:self-center">
            <Reveal delay={100}>
              <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-light">04 &mdash; About</p>
              <h2 id="about-title" className="display mt-6 text-[clamp(40px,6.2vw,96px)] text-white">
                Behind every great brand
                <br />
                is a <span className="text-teal-light">better idea.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-12 space-y-6">
                <ScrollText
                  text="We believe great marketing starts with understanding people, culture and the bigger picture."
                  rgb="255,255,255"
                  mutedAlpha={0.22}
                  className="text-lg leading-[1.5]"
                />
                <ScrollText
                  text="BACKROOM STUDIO CO. brings together strategic thinking, creative direction and execution to create work that connects with people and delivers meaningful business outcomes."
                  rgb="255,255,255"
                  mutedAlpha={0.22}
                  className="text-lg leading-[1.5]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
