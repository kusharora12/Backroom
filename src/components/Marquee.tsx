import { SERVICE_CATEGORIES } from '@/data/services';

export default function Marquee() {
  const names = SERVICE_CATEGORIES.map((category) => category.name);
  const items = [...names, ...names];

  return (
    <div className="marquee-band overflow-hidden border-y border-white/10 bg-midnight py-6" aria-hidden="true">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10 font-display text-[clamp(28px,4vw,56px)] font-bold uppercase leading-[1.2] text-white/90">
            {item}
            <span className="h-2.5 w-2.5 bg-teal-light" />
          </span>
        ))}
      </div>
    </div>
  );
}
