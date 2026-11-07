type LogoProps = {
  className?: string;
};

export default function Logo({ className = '' }: LogoProps) {
  return (
    <a href="#top" aria-label="BACKROOM STUDIO CO. home" className={`inline-flex shrink-0 ${className}`}>
      <img
        src="/BACKROOM%20STUDIO%20CO.%20Logo%20(1).png"
        alt="BACKROOM STUDIO CO."
        width={2048}
        height={682}
        className="h-7 w-auto transition-opacity duration-300 hover:opacity-80 md:h-9"
      />
    </a>
  );
}
