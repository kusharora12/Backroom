import { useEffect, useRef, type CSSProperties } from 'react';

import { ArrowDown, ArrowUpRight } from 'lucide-react';

const HERO_IMAGE =
  'https://images.pexels.com/photos/4105151/pexels-photo-4105151.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const HEADLINE_LINES = [
  { text: 'Ordinary', color: 'text-white' },
  { text: "isn't our", color: 'text-cream' },
  { text: 'thing.', color: 'text-white' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let scrollFrame = 0;
    let pointerFrame = 0;
    let pointer = { x: 0, y: 0 };

    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        section.style.setProperty('--scroll', `${Math.min(window.scrollY, window.innerHeight)}px`);
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = section.getBoundingClientRect();
      pointer = {
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      };
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        section.style.setProperty('--mx', pointer.x.toFixed(3));
        section.style.setProperty('--my', pointer.y.toFixed(3));
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    section.addEventListener('pointermove', onPointerMove);
    return () => {
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(pointerFrame);
      window.removeEventListener('scroll', onScroll);
      section.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-midnight pb-14 pt-32 md:pb-20"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute -inset-[4%] transition-transform duration-700 ease-out"
          style={{
            transform:
              'translate3d(calc(var(--mx, 0) * -16px), calc(var(--my, 0) * -16px + var(--scroll, 0px) * 0.2), 0)',
          }}
        >
          <img
            src={HERO_IMAGE}
            alt="Dramatic studio portrait lit in teal against a dark background"
            width={940}
            height={650}
            fetchPriority="high"
            className="h-full w-full object-cover object-[center_30%] opacity-50"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-midnight/60" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-transparent to-midnight" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 text-center md:px-12">
        <p className="fade-up eyebrow mb-8" style={{ '--line-delay': '150ms' } as CSSProperties}>
          Independent Creative &amp; Marketing Studio
        </p>

        <h1
          id="hero-title"
          aria-label="Ordinary isn't our thing."
          className="display text-[clamp(56px,11vw,176px)] text-white"
        >
          {HEADLINE_LINES.map((line, lineIndex) => (
            <span key={line.text} aria-hidden="true" className={`block overflow-hidden pb-[0.08em] ${line.color}`}>
              {Array.from(line.text).map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="kinetic-letter-wrap"
                  style={{ '--line-delay': `${320 + (lineIndex * 8 + charIndex) * 45}ms` } as CSSProperties}
                >
                  <span className="kinetic-letter">{char === ' ' ? '\u00a0' : char}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p
          className="fade-up mt-10 max-w-xl text-base leading-[1.5] text-white/80 md:mt-12 md:text-lg"
          style={{ '--line-delay': '700ms' } as CSSProperties}
        >
          We build distinctive brands, create bold experiences and make ideas impossible to ignore.
        </p>

        <div className="fade-up mt-10" style={{ '--line-delay': '850ms' } as CSSProperties}>
          <a href="#work" className="group btn-primary">
            Explore Our Work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-16 flex w-full flex-col items-center gap-6 border-t border-white/15 pt-6 md:mt-20">
          <p
            className="fade-up font-mono text-[11px] uppercase tracking-[0.16em] text-white/70 md:text-[12px]"
            style={{ '--line-delay': '1000ms' } as CSSProperties}
          >
            Behind the scenes. Ahead of the curve.
          </p>
          <a
            href="#studio"
            aria-label="Scroll to studio introduction"
            className="group hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-teal-light sm:flex"
          >
            Scroll
            <span className="relative flex h-12 w-px overflow-hidden bg-white/20">
              <span className="scroll-cue absolute inset-0 bg-teal-light" />
            </span>
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
