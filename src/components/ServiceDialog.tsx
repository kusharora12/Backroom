import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, X } from 'lucide-react';
import { WHATSAPP_URL } from '@/data/content';
import type { ServiceCategory } from '@/data/services';

type ServiceDialogProps = {
  category: ServiceCategory;
  onClose: () => void;
};

export default function ServiceDialog({ category, onClose }: ServiceDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-midnight/85 backdrop-blur-sm md:items-center md:p-8"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-dialog-title"
        className="dialog-panel relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-y-auto overscroll-contain bg-ivory text-midnight md:max-h-[88vh]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[16/7] shrink-0 overflow-hidden bg-forest">
          <img src={category.image} alt={category.alt} width={940} height={650} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" aria-hidden="true" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close service details"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center bg-midnight/70 text-white transition-colors duration-300 hover:bg-teal-light hover:text-midnight"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="absolute bottom-5 left-6 font-mono text-[12px] tracking-[0.14em] text-teal-light md:left-10">
            {category.number} / 09
          </span>
        </div>

        <div className="flex flex-col gap-10 p-6 md:p-12">
          <div className="grid gap-6 md:grid-cols-12 md:gap-10">
            <h3 id="service-dialog-title" className="font-display text-[clamp(32px,4.5vw,56px)] font-bold uppercase leading-[1.2] md:col-span-6">
              {category.name}
            </h3>
            <p className="text-base leading-[1.5] text-midnight/75 md:col-span-6 md:text-lg">{category.summary}</p>
          </div>

          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {category.subservices.map((service, index) => (
              <li
                key={service.name}
                className="dialog-item border-t border-midnight/10 pt-5"
                style={{ animationDelay: `${180 + index * 50}ms` }}
              >
                <p className="font-mono text-[11px] tracking-[0.12em] text-teal-dark">{String(index + 1).padStart(2, '0')}</p>
                <h4 className="mt-2 font-sans text-base font-semibold text-midnight">{service.name}</h4>
                <p className="mt-2 text-[15px] leading-[1.5] text-midnight/70">{service.description}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4 border-t border-midnight/10 pt-8">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="group/cta btn-primary">
              Let&apos;s Talk
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="border border-midnight/30 px-7 py-4 font-sans text-sm font-medium uppercase tracking-[0.12em] text-midnight transition-colors duration-300 hover:border-teal-dark hover:text-teal-dark"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
