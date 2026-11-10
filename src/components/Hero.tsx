import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from 'react';

import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { HeroPointer } from '@/components/HeroScene';

const HeroScene = lazy(() => import('@/components/HeroScene'));

const HERO_IMAGE =
  'https://images.pexels.com/photos/39190706/pexels-photo-39190706.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const CAMERA_IMAGE =
  'https://images.pexels.com/photos/1983035/pexels-photo-1983035.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const SHOOT_IMAGE =
  'https://images.pexels.com/photos/19132436/pexels-photo-19132436.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

const HEADLINE_LINES = [
  { text: 'Ordinary', color: 'text-white' },
  { text: "isn't our", color: 'text-cream' },
  { text: 'thing.', color: 'text-white' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pointerRef = useRef<HeroPointer>({ x: 0, y: 0, active: false });
  const [show3d] = useState(
    () => supportsWebGL() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

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
      pointerRef.current = { x: pointer.x, y: -pointer.y, active: true };
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        section.style.setProperty('--mx', pointer.x.toFixed(3));
        section.style.setProperty('--my', pointer.y.toFixed(3));
      });
    };

    const onPointerLeave = () => {
      pointerRef.current = { ...pointerRef.current, active: false };
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('pointerleave', onPointerLeave);
    return () => {
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(pointerFrame);
      window.removeEventListener('scroll', onScroll);
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
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
            alt="Photographer capturing a model during a fashion shoot in a studio"
            width={940}
            height={650}
            fetchPriority="high"
            className="h-full w-full object-cover object-[center_30%] opacity-50"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-midnight/60" aria-hidden="true" />
      {show3d && (
        <div className="hero-canvas pointer-events-none absolute inset-0" aria-hidden="true">
          <Suspense fallback={null}>
            <HeroScene pointerRef={pointerRef} />
          </Suspense>
        </div>
      )}
      <div
        className="pointer-events-none absolute bottom-[12%] right-[8%] hidden h-56 w-44 transition-transform duration-500 ease-out md:block"
        style={{ transform: 'perspective(900px) rotateX(calc(var(--my, 0) * -10deg)) rotateY(calc(var(--mx, 0) * 12deg))' }}
      >
        <div className="hero-square absolute -bottom-5 -right-5 h-56 w-44 border border-teal-light/70" aria-hidden="true" />
        <div
          aria-label="Behind the scenes of the shoot"
          role="img"
          className="group/cam pointer-events-auto absolute bottom-0 right-0 z-10 h-56 w-44 overflow-hidden bg-forest transition-[width,height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:h-[300px] hover:w-[440px]"
        >
          <img
            src={CAMERA_IMAGE}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 group-hover/cam:opacity-0"
          />
          <img
            src={SHOOT_IMAGE}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-[opacity,transform] duration-700 ease-out group-hover/cam:scale-100 group-hover/cam:opacity-100"
          />
          <span className="absolute bottom-3 left-3 bg-midnight/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white">
            Behind the scenes
          </span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-transparent to-midnight" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 text-center md:px-12">
        <p className="fade-up eyebrow mb-8 text-sm md:text-base" style={{ '--line-delay': '150ms' } as CSSProperties}>
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
                  <span className="kinetic-letter" data-char={char === ' ' ? '\u00a0' : char}>
                    {char === ' ' ? '\u00a0' : char}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p
          className="fade-up mt-10 max-w-xl text-base leading-[1.5] text-white/80 md:mt-12 md:text-lg"
          style={{ '--line-delay': '700ms' } as CSSProperties}
        >
          Big ideas. Bold identities. Work that refuses to blend in.
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
            href="#brands"
            aria-label="Scroll to brands"
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
