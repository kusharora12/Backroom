import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/Reveal';

const BRAND_VISUALS = [
  { surface: 'bg-teal', mark: 'h-[40%] w-[40%] bg-ivory' },
  { surface: 'bg-midnight', mark: 'h-[42%] w-[42%] rounded-full border-4 border-teal-light' },
  { surface: 'bg-teal-dark', mark: 'h-[30%] w-[62%] bg-teal-light' },
  { surface: 'bg-ivory', mark: 'h-[50%] w-[50%] rounded-full bg-teal' },
  { surface: 'bg-teal-light', mark: 'h-[60%] w-[20%] bg-midnight' },
  { surface: 'bg-forest', mark: 'h-[44%] w-[44%] rotate-45 border-2 border-teal-light' },
  { surface: 'bg-midnight', mark: 'h-[24%] w-[70%] bg-ivory' },
  { surface: 'bg-teal', mark: 'h-[50%] w-[50%] rounded-full border-4 border-ivory' },
];

const TILE_COUNT = 8;
const SWAP_INTERVAL_MS = 1000;

export default function BrandWall() {
  const [visuals, setVisuals] = useState(() => Array.from({ length: TILE_COUNT }, (_, index) => index % BRAND_VISUALS.length));
  const nextTile = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      const tile = nextTile.current;
      nextTile.current = (tile + 1) % TILE_COUNT;
      setVisuals((previous) =>
        previous.map((value, index) => (index === tile ? (value + 1) % BRAND_VISUALS.length : value))
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
          {visuals.map((visual, tile) => {
            const { surface, mark } = BRAND_VISUALS[visual];
            return (
              <Reveal as="li" key={tile} delay={tile * 80} className="aspect-square">
                <div className={`brand-tile relative h-full w-full overflow-hidden ${surface}`}>
                  <span
                    key={visual}
                    className={`brand-mark absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 ${mark}`}
                    aria-hidden="true"
                  />
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
