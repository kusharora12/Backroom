import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, img, select, label, [role="button"], [data-cursor]';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!canHover.matches || reduceMotion.matches) return;
    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');
    return () => document.documentElement.classList.remove('has-custom-cursor');
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!enabled || !dot || !ring) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let frame = 0;

    const renderRing = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = Math.abs(targetX - ringX) > 0.1 || Math.abs(targetY - ringY) > 0.1 ? requestAnimationFrame(renderRing) : 0;
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      if (!frame) frame = requestAnimationFrame(renderRing);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      ring.dataset.active = String(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };

    const onLeaveWindow = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeaveWindow);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" style={{ opacity: 0 }} />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" style={{ opacity: 0 }} />
    </>
  );
}
