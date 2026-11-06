import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import { NAV_LINKS } from '@/data/content';

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
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen ? 'border-b border-white/10 bg-midnight py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-12">
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
            <a href="#contact" className="btn-primary !px-5 !py-3 !text-[12px]">
              Let&apos;s Talk
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-12 w-12 items-center justify-center text-white lg:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-midnight pt-28 transition-opacity duration-500 lg:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-between px-6 pb-10">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                  className="group flex items-baseline gap-4 py-3 font-display text-[44px] font-bold uppercase leading-[1.2] text-white transition-colors duration-300 hover:text-teal-light"
                >
                  <span className="font-mono text-[12px] tracking-[0.1em] text-teal-light">0{index + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1} className="btn-primary w-full">
            Let&apos;s Talk
          </a>
        </nav>
      </div>
    </>
  );
}
