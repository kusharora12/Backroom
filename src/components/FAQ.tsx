import { useState } from 'react';
import { Plus } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { FAQS } from '@/data/content';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-ivory py-28 text-midnight md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-12">
          <Reveal className="md:col-span-5">
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-dark">06 &mdash; FAQ</p>
            <h2 id="faq-title" className="display mt-6 text-[clamp(40px,6vw,96px)] text-midnight">
              You&apos;ve got questions.
              <br />
              <span className="text-teal-dark">We get it.</span>
            </h2>
          </Reveal>

          <Reveal className="md:col-span-6 md:col-start-7" delay={150}>
            <ul className="border-t border-midnight/15">
              {FAQS.map((faq, index) => {
                const isOpen = openIndex === index;
                const buttonId = `faq-button-${index}`;
                const panelId = `faq-panel-${index}`;
                return (
                  <li key={faq.question} className="border-b border-midnight/15">
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={`font-display text-xl font-bold uppercase leading-[1.2] transition-colors duration-300 md:text-2xl ${
                          isOpen ? 'text-teal-dark' : 'text-midnight group-hover:text-teal-dark'
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-500 ${
                          isOpen ? 'rotate-45 border-teal-dark bg-teal-dark text-ivory' : 'border-midnight/30 group-hover:border-teal-dark'
                        }`}
                        aria-hidden="true"
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-xl pb-7 text-[16px] leading-[1.5] text-midnight/75">{faq.answer}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
