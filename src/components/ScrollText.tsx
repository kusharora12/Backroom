import { useEffect, useRef } from 'react';

type ScrollTextProps = {
  text: string;
  rgb: string;
  accentRgb?: string;
  mutedAlpha?: number;
  className?: string;
};

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

export default function ScrollText({ text, rgb, accentRgb, mutedAlpha = 0.2, className = '' }: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ').map((word) =>
    word.startsWith('*') ? { text: word.slice(1), accent: true } : { text: word, accent: false }
  );

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const spans = Array.from(container.querySelectorAll<HTMLSpanElement>('[data-word]'));
    const colors = spans.map((span) => (span.dataset.accent === 'true' ? accentRgb ?? rgb : rgb));

    const paint = (alphaFor: (index: number) => number) => {
      spans.forEach((span, index) => {
        span.style.color = `rgba(${colors[index]}, ${alphaFor(index).toFixed(3)})`;
      });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      paint(() => 1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = container.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const progress = clamp((viewHeight * 0.85 - rect.top) / (rect.height + viewHeight * 0.5));
      const count = spans.length;
      paint((index) => {
        const start = (index / count) * 0.8;
        const local = clamp((progress - start) / 0.2);
        return mutedAlpha + (1 - mutedAlpha) * local;
      });
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [text, rgb, accentRgb, mutedAlpha]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={`${word.text}-${index}`} data-word data-accent={word.accent ? 'true' : undefined}>
          {word.text}
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}
