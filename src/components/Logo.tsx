import backroomWordmark from '@/assets/backroom-wordmark.png';

type LogoProps = {
  className?: string;
};

export default function Logo({ className = '' }: LogoProps) {
  return (
    <a href="#top" aria-label="BACKROOM STUDIO CO. home" className={`inline-flex shrink-0 ${className}`}>
      <img
        src={backroomWordmark}
        alt="BACKROOM STUDIO CO."
        width={1500}
        height={500}
        className="h-7 w-auto invert mix-blend-screen transition-opacity duration-300 hover:opacity-80 md:h-9"
      />
    </a>
  );
}
