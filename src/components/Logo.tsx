type LogoProps = {
  className?: string;
};

export default function Logo({ className = '' }: LogoProps) {
  return (
    <a href="#top" aria-label="BACKROOM STUDIO CO. home" className={`inline-flex shrink-0 items-center ${className}`}>
      <img
        src="/Backroom%20Studio%20Co.%20Logo.png"
        alt="BACKROOM STUDIO CO."
        width={2048}
        height={682}
        className="block h-10 w-auto max-w-[220px] object-contain transition-opacity duration-300 hover:opacity-80 md:h-12 md:max-w-[260px]"
      />
    </a>
  );
}
