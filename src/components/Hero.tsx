import { useEffect, useRef, type CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const HERO_IMAGE =
  'https://images.pexels.com/photos/4105151/pexels-photo-4105151.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const HEADLINE_LINES = [
  { text: 'Ordinary', indent: '', color: 'text-white' },
  { text: "isn't our", indent: 'md:ml-[14vw]', color: 'text-cream' },
  { text: 'thing.', indent: '', color: 'text-white' },
];

const depth = (strength: number, scrollFactor: number): CSSProperties => ({
  transform: `translate3d(calc(var(--mx, 0) * ${-strength}px), calc(var(--my, 0) * ${-strength}px + var(--scroll, 0px) * ${scrollFactor}), 0)`,
});

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
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-midnight pb-14 pt-32 md:pb-20"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -inset-[4%] transition-transform duration-700 ease-out" style={depth(16, 0.2)}>
          <img
            src={HERO_IMAGE}
            alt="Dramatic studio portrait lit in teal against a dark background"
            width={940}
            height={650}
            fetchPriority="high"
            className="h-full w-full object-cover object-[center_30%] opacity-60"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/40 to-midnight" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/50 to-transparent" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute right-[-18%] top-[12%] h-[60vmin] w-[60vmin] transition-transform duration-700 ease-out md:right-[2%]"
          style={depth(36, -0.1)}
        >
          <div className="hero-orb h-full w-full rounded-full" />
        </div>
        <div
          className="absolute right-[-8%] top-[8%] h-[78vmin] w-[78vmin] transition-transform duration-700 ease-out md:right-[-3%]"
          style={depth(64, -0.05)}
        >
          <div className="hero-orbit h-full w-full rounded-full border border-dashed border-teal-light/30" />
        </div>
        <span className="absolute bottom-0 top-0 hidden w-px bg-white/10 md:block md:left-[33%]" />
        <span className="absolute bottom-0 top-0 hidden w-px bg-white/10 md:block md:left-[66%]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <p className="fade-up eyebrow mb-8" style={{ '--line-delay': '150ms' } as CSSProperties}>
          Independent Creative &amp; Marketing Studio
        </p>

        <h1 id="hero-title" aria-label="Ordinary isn't our thing." className="display text-[clamp(56px,12vw,200px)] text-white">
          {HEADLINE_LINES.map((line, lineIndex) => (
            <span key={line.text} aria-hidden="true" className={`block overflow-hidden pb-[0.08em] ${line.indent} ${line.color}`}>
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

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:items-end">
          <div className="fade-up md:col-span-5 md:col-start-1" style={{ '--line-delay': '700ms' } as CSSProperties}>
            <p className="max-w-md text-base leading-[1.5] text-white/80 md:text-lg">
              We build distinctive brands, create bold experiences and make ideas impossible to ignore.
            </p>
          </div>

          <div
            className="fade-up flex flex-col gap-4 sm:flex-row md:col-span-5 md:col-start-6 md:justify-end"
            style={{ '--line-delay': '850ms' } as CSSProperties}
          >
            <a href="#work" className="group btn-primary">
              Explore Our Work
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-white/15 pt-6 md:mt-20">
          <p className="fade-up font-mono text-[11px] uppercase tracking-[0.16em] text-white/70 md:text-[12px]" style={{ '--line-delay': '1000ms' } as CSSProperties}>
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
