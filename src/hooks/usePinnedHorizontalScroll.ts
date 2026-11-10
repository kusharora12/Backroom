import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PINNED_SCROLL_QUERY = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

export function usePinnedHorizontalScroll(sectionRef: RefObject<HTMLElement>, trackRef: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add(PINNED_SCROLL_QUERY, () => {
      const getDistance = () => Math.max(0, track.scrollWidth - section.clientWidth);

      const horizontal = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>('[data-hscroll-item]', track).forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.35, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              containerAnimation: horizontal,
              trigger: item,
              start: 'left 92%',
              end: 'left 55%',
              scrub: true,
            },
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
              scrollTrigger: {
                containerAnimation: horizontal,
                trigger: item,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        }

        const title = item.querySelector<HTMLElement>('[data-hscroll-title]');
        if (title) {
          gsap.fromTo(
            title,
            { xPercent: 10, opacity: 0 },
            {
              xPercent: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                containerAnimation: horizontal,
                trigger: item,
                start: 'left 85%',
                end: 'left 45%',
                scrub: true,
              },
            }
          );
        }
      });
    });

    return () => mm.revert();
  }, [sectionRef, trackRef]);
}
