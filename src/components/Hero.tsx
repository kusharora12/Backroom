import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const HERO_IMAGE =
  'https://images.pexels.com/photos/4105151/pexels-photo-4105151.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function Hero() {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY, window.innerHeight);
        image.style.transform = `translate3d(0, ${offset * 0.25}px, 0) scale(1.1)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-midnight pb-16 pt-32 md:pb-20"
    >
      <img
        ref={imageRef}
        src={HERO_IMAGE}
        alt="Dramatic studio portrait lit in teal against a dark background"
        width={940}
        height={650}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full scale-110 object-cover object-[center_30%] opacity-60 will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/40 to-midnight" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/50 to-transparent" />
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-[480px] w-[480px] rounded-full bg-teal/25 blur-[120px] md:h-[640px] md:w-[640px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <p className="fade-up eyebrow mb-8" style={{ '--line-delay': '150ms' } as React.CSSProperties}>
          Independent Creative &amp; Marketing Studio
        </p>

        <h1
          id="hero-title"
          className="display text-[clamp(56px,11.5vw,184px)] text-white"
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="line-rise" style={{ '--line-delay': '300ms' } as React.CSSProperties}>
              Kushagra<span className="text-teal-light">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:items-end">
          <div className="fade-up md:col-span-5 md:col-start-1" style={{ '--line-delay': '700ms' } as React.CSSProperties}>
            <p className="max-w-md text-base leading-[1.5] text-white/80 md:text-lg">
              We build brands, create experiences and turn ambitious ideas into meaningful work.
            </p>
          </div>

          <div
            className="fade-up flex flex-col gap-4 sm:flex-row md:col-span-5 md:col-start-6 md:justify-end"
            style={{ '--line-delay': '850ms' } as React.CSSProperties}
          >
            <a href="#work" className="btn-primary">
              Explore Our Work
            </a>
            <a href="#contact" className="btn-ghost">
              Start a Project
            </a>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-white/15 pt-6 md:mt-20">
          <p className="fade-up font-mono text-[11px] uppercase tracking-[0.16em] text-white/70 md:text-[12px]" style={{ '--line-delay': '1000ms' } as React.CSSProperties}>
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