import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Logo from '@/components/Logo';
import { NAV_LINKS, WHATSAPP_URL } from '@/data/content';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${scrolled || menuOpen ? 'py-3' : 'py-6'}`}>
        <div
          aria-hidden="true"
          className={`absolute inset-0 border-b border-white/10 bg-midnight/75 backdrop-blur-xl transition-opacity duration-500 ${
            scrolled || menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="relative mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-12">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-sans text-[13px] font-medium uppercase tracking-[0.14em] text-white/80 transition-colors duration-300 hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-teal-light transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-teal px-5 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-teal-light hover:text-midnight"
            >
              Let&apos;s Talk
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex items-center gap-3 rounded-full border border-white/35 px-5 py-2.5 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-teal-light hover:text-teal-light lg:hidden"
          >
            <span className="relative flex h-3 w-4 flex-col justify-between" aria-hidden="true">
              <span className={`h-px w-full bg-current transition-transform duration-500 ${menuOpen ? 'translate-y-[5px] rotate-45' : ''}`} />
              <span className={`h-px w-full bg-current transition-transform duration-500 ${menuOpen ? '-translate-y-[5px] -rotate-45' : ''}`} />
            </span>
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-midnight transition-[opacity,visibility] duration-500 lg:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile" className="flex min-h-full flex-col justify-between px-6 pb-10 pt-32">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link, index) => (
              <li
                key={link.href}
                className={`border-b border-white/10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: menuOpen ? `${150 + index * 80}ms` : '0ms' }}
              >
                <a
                  href={link.href}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                  className="group flex items-baseline gap-4 py-4 font-display text-[clamp(44px,12vw,72px)] font-bold uppercase leading-[1.2] text-white transition-colors duration-300 hover:text-teal-light"
                >
                  <span className="font-mono text-[12px] tracking-[0.1em] text-teal-light">0{index + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
            className={`btn-primary mt-12 w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '500ms' : '0ms' }}
          >
            Let&apos;s Talk
          </a>
        </nav>
      </div>
    </>
  );
}
