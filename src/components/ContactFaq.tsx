import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '@/data/content';

export default function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-16 border-t border-white/15">
      <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.18em] text-teal-light">Good to know</p>
      <ul className="mt-6">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          const buttonId = `faq-button-${index}`;
          const panelId = `faq-panel-${index}`;
          return (
            <li key={faq.question} className="border-b border-white/15">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className={`font-sans text-base font-medium leading-[1.5] transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-teal-light transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <p className="pb-6 text-[15px] leading-[1.5] text-white/70">{faq.answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
