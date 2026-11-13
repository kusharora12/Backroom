import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/Reveal';

const BRAND_LOGOS = [
  { src: '/brand-logos/UDTS-LOGO-1-rsr6i3whgzi77ywutabw1dtot4frvclnqm2zz2fuog_(2)%20copy.png', alt: 'UDTS logo' },
  { src: '/brand-logos/Interlocking_BR_Studio_Co._Logo.png', alt: 'BR Studio Co. logo' },
  { src: '/brand-logos/Untitled_design_(62)%20copy.png', alt: 'Brand logo' },
  { src: '/brand-logos/UDTS_Robo_Trade_Logo%20copy.png', alt: 'UDTS Robo Trade logo' },
];

const TILE_BACKGROUNDS = Array.from({ length: 8 }, () => 'bg-ivory');

const TILE_COUNT = 8;
const SWAP_INTERVAL_MS = 1000;

export default function BrandWall() {
  const [visuals, setVisuals] = useState(() => Array.from({ length: TILE_COUNT }, (_, index) => index % BRAND_LOGOS.length));
  const nextTile = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      const tile = nextTile.current;
      nextTile.current = (tile + 1) % TILE_COUNT;
      setVisuals((previous) =>
        previous.map((value, index) => (index === tile ? (value + 1) % BRAND_LOGOS.length : value))
      );
    }, SWAP_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="brands" aria-labelledby="brands-title" className="bg-ivory py-28 text-midnight md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-dark">01 &mdash; Brands</p>
          <h2 id="brands-title" className="display mt-6 text-[clamp(40px,6.5vw,104px)] text-midnight">
            Good company.
            <br />
            <span className="text-teal-dark">Great collaborations.</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-1 border border-cream bg-cream md:mt-20 md:grid-cols-4">
          {visuals.map((active, tile) => {
            return (
              <Reveal as="li" key={tile} delay={tile * 80} className="aspect-square">
                <div className={`relative flex h-full w-full items-center justify-center overflow-hidden p-8 ${TILE_BACKGROUNDS[tile]}`}>
                  {BRAND_LOGOS.map((logo, index) => (
                    <img
                      key={logo.src}
                      src={logo.src}
                      alt={index === active ? logo.alt : ''}
                      aria-hidden={index !== active}
                      loading="lazy"
                      decoding="async"
                      className={`absolute h-[52%] w-[58%] object-contain mix-blend-multiply transition-[opacity,transform] duration-700 ease-out ${
                        index === active ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                      }`}
                    />
                  ))}
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
