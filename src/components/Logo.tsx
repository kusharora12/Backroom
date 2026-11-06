import { Asterisk } from 'lucide-react';

type LogoProps = {
  className?: string;
};

export default function Logo({ className = '' }: LogoProps) {
  return (
    <a
      href="#top"
      aria-label="BACKROOM STUDIO CO. home"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span className="flex h-9 w-9 items-center justify-center bg-teal transition-colors duration-500 group-hover:bg-teal-light">
        <Asterisk className="h-5 w-5 text-white transition-transform duration-700 group-hover:rotate-180" strokeWidth={2.25} aria-hidden="true" />
      </span>
      <span className="font-display text-[15px] font-bold uppercase leading-none tracking-[0.04em]">
        Backroom<span className="text-teal-light"> Studio Co.</span>
      </span>
    </a>
  );
}
