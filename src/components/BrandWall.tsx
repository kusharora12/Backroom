import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/Reveal';

const BRAND_LOGOS = [
  { src: '/brand-logos/UDTS-LOGO-1-rsr6i3whgzi77ywutabw1dtot4frvclnqm2zz2fuog_(2)%20copy.png', alt: 'UDTS logo' },
  { src: '/brand-logos/Interlocking_BR_Studio_Co._Logo.png', alt: 'BR Studio Co. logo' },
  { src: '/brand-logos/Untitled_design_(62)%20copy.png', alt: 'Brand logo' },
  { src: '/brand-logos/UDTS_Robo_Trade_Logo%20copy.png', alt: 'UDTS Robo Trade logo' },
];

const TILE_CROPS = [
  { scale: 1, position: 'center' },
  { scale: 1.35, position: 'left center' },
  { scale: 1.6, position: 'right top' },
  { scale: 1.2, position: 'center bottom' },
  { scale: 1.8, position: 'left bottom' },
  { scale: 1.1, position: 'right center' },
  { scale: 1.45, position: 'center top' },
  { scale: 1.25, position: 'right bottom' },
];

const TILE_BACKGROUNDS = ['bg-ivory', 'bg-midnight', 'bg-teal-dark', 'bg-ivory', 'bg-forest', 'bg-midnight', 'bg-teal-dark', 'bg-ivory'];

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

        <ul className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-5">
          {visuals.map((active, tile) => {
            const crop = TILE_CROPS[tile];
            return (
              <Reveal as="li" key={tile} delay={tile * 80} className="aspect-square">
                <div className={`relative h-full w-full overflow-hidden ${TILE_BACKGROUNDS[tile]}`}>
                  {BRAND_LOGOS.map((logo, index) => (
                    <img
                      key={logo.src}
                      src={logo.src}
                      alt={index === active ? logo.alt : ''}
                      aria-hidden={index !== active}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                        index === active ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ objectPosition: crop.position, transform: `scale(${crop.scale})` }}
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
