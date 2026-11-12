import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PIN_QUERY = '(prefers-reduced-motion: no-preference)';

export function usePinnedHorizontalScroll(sectionRef: RefObject<HTMLElement>, trackRef: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add(PIN_QUERY, () => {
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const progressBar = section.querySelector<HTMLElement>('[data-hscroll-progressbar]');

      const horizontal = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBar) progressBar.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      gsap.utils.toArray<HTMLElement>('[data-hscroll-item]', track).forEach((item) => {
        const containerST = (start: string, end: string) => ({
          containerAnimation: horizontal,
          trigger: item,
          start,
          end,
          scrub: true,
        });

        gsap.fromTo(
          item,
          { opacity: 0.35, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: containerST('left 95%', 'left 60%'),
          }
        );

        const media = item.querySelector<HTMLElement>('[data-hscroll-media]');
        if (media) {
          gsap.fromTo(
            media,
            { xPercent: -7 },
            {
              xPercent: 7,
              ease: 'none',
              scrollTrigger: containerST('left right', 'right left'),
            }
          );
        }

        const title = item.querySelector<HTMLElement>('[data-hscroll-title]');
        if (title) {
          gsap.fromTo(
            title,
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: containerST('left 90%', 'left 55%'),
            }
          );
        }

        const tilt = item.querySelector<HTMLElement>('[data-hscroll-tilt]');
        if (tilt) {
          const amount = parseFloat(tilt.dataset.tilt || '2');
          gsap.fromTo(
            tilt,
            { rotation: amount },
            {
              rotation: -amount,
              ease: 'none',
              scrollTrigger: containerST('left right', 'right left'),
            }
          );
        }
      });

      const onOrientationChange = () => {
        window.setTimeout(() => ScrollTrigger.refresh(), 350);
      };
      window.addEventListener('orientationchange', onOrientationChange);
      return () => window.removeEventListener('orientationchange', onOrientationChange);
    });

    return () => mm.revert();
  }, [sectionRef, trackRef]);
}
