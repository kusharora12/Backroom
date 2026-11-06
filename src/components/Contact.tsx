import { useState, type FormEvent } from 'react';
import { CircleAlert, Check, LoaderCircle } from 'lucide-react';
import Reveal from '@/components/Reveal';
import ContactFaq from '@/components/ContactFaq';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';

const SERVICE_OPTIONS = [
  'Brand Strategy and Identity',
  'Creative Direction',
  'Website Design and Development',
  'Social Media Management',
  'Performance Marketing',
  'Content Production',
  'Digital Strategy',
  'Not sure yet',
];

const BUDGET_OPTIONS = ['Under 5k', '5k to 15k', '15k to 50k', '50k plus', 'To be discussed'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormValues = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  details: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_VALUES: FormValues = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  details: '',
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Please tell us your name.';
  else if (values.name.trim().length > 120) errors.name = 'Please keep your name under 120 characters.';
  if (!values.email.trim()) errors.email = 'Please add an email address so we can reply.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.company.trim().length > 160) errors.company = 'Please keep your company name under 160 characters.';
  if (!values.details.trim()) errors.details = 'Tell us a little about the project.';
  else if (values.details.trim().length > 5000) errors.details = 'Please keep your project details under 5,000 characters.';
  return errors;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitState>('idle');

  const updateField = (field: keyof FormValues) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const nextValue = event.target.value;
    setValues((current) => ({ ...current, [field]: nextValue }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New enquiry from ${values.name.trim()}`,
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim() || 'Not provided',
          service: values.service || 'Not specified',
          budget: values.budget || 'Not specified',
          message: values.details.trim(),
        }),
      });
      const result: { success?: boolean } = await response.json();
      if (!response.ok || !result.success) throw new Error('Submission rejected');
    } catch {
      setStatus('error');
      return;
    }
    setStatus('success');
    setValues(EMPTY_VALUES);
  };

  const inputClass = (field: keyof FormValues) =>
    `w-full border-b bg-transparent px-0 py-3 font-sans text-base text-white placeholder:text-white/35 transition-colors duration-300 focus:border-teal-light focus:outline-none ${
      errors[field] ? 'border-red-400' : 'border-white/25 hover:border-white/50'
    }`;

  const labelClass = 'mb-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-white/60';

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-forest py-28 md:py-40">
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[480px] w-[480px] rounded-full bg-teal/20 blur-[140px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-6 md:grid-cols-12 md:gap-x-12 md:px-12">
        <Reveal className="md:col-span-5">
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-teal-light">07 &mdash; Contact</p>
          <h2 id="contact-title" className="display mt-6 text-[clamp(44px,7vw,112px)] text-white">
            Have something <span className="text-teal-light">worth building?</span>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-[1.5] text-white/75">
            Tell us what you&apos;re working on. Let&apos;s make something meaningful.
          </p>
          <ContactFaq />
        </Reveal>

        <Reveal className="md:col-span-6 md:col-start-7" delay={150}>
          {status === 'success' ? (
            <div role="status" className="flex flex-col gap-6 border border-teal-light/40 bg-midnight p-10">
              <span className="flex h-12 w-12 items-center justify-center bg-teal">
                <Check className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <h3 className="font-display text-[32px] font-bold uppercase leading-[1.2]">Thank you.</h3>
              <p className="text-base leading-[1.5] text-white/75">
                Your enquiry has reached the studio. We read every message and will reply to your email soon.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="self-start font-sans text-sm font-medium uppercase tracking-[0.12em] text-teal-light underline underline-offset-8 transition-colors hover:text-white"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="grid gap-8 sm:grid-cols-2" aria-describedby={status === 'error' ? 'form-error' : undefined}>
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name <span className="text-teal-light">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={updateField('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={inputClass('name')}
                  placeholder="Your name"
                />
                <FieldError id="name-error" message={errors.name} />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email <span className="text-teal-light">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={updateField('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputClass('email')}
                  placeholder="you@company.com"
                />
                <FieldError id="email-error" message={errors.email} />
              </div>

              <div>
                <label htmlFor="company" className={labelClass}>
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  value={values.company}
                  onChange={updateField('company')}
                  aria-invalid={Boolean(errors.company)}
                  aria-describedby={errors.company ? 'company-error' : undefined}
                  className={inputClass('company')}
                  placeholder="Company name"
                />
                <FieldError id="company-error" message={errors.company} />
              </div>

              <div>
                <label htmlFor="service" className={labelClass}>
                  Service required
                </label>
                <select
                  id="service"
                  name="service"
                  value={values.service}
                  onChange={updateField('service')}
                  className={`${inputClass('service')} appearance-none bg-forest`}
                >
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset className="sm:col-span-2">
                <legend className={labelClass}>Project budget</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {BUDGET_OPTIONS.map((option) => {
                    const selected = values.budget === option;
                    return (
                      <label
                        key={option}
                        className={`cursor-pointer border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-300 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-teal-light ${
                          selected
                            ? 'border-teal-light bg-teal text-white'
                            : 'border-white/25 text-white/75 hover:border-white/60 hover:text-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="budget"
                          value={option}
                          checked={selected}
                          onChange={updateField('budget')}
                          className="sr-only"
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="sm:col-span-2">
                <label htmlFor="details" className={labelClass}>
                  Project details <span className="text-teal-light">*</span>
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={5}
                  value={values.details}
                  onChange={updateField('details')}
                  aria-invalid={Boolean(errors.details)}
                  aria-describedby={errors.details ? 'details-error' : undefined}
                  className={`${inputClass('details')} resize-y`}
                  placeholder="What are you building, what is getting in the way, and what would success look like?"
                />
                <FieldError id="details-error" message={errors.details} />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-6">
                {status === 'error' && (
                  <p id="form-error" role="alert" className="flex items-start gap-3 border border-red-400/50 bg-red-950/40 p-4 text-sm leading-[1.5] text-red-200">
                    <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    We couldn&apos;t send your enquiry just now. Please check your connection and try again.
                  </p>
                )}
                <div>
                  <button type="submit" disabled={status === 'submitting'} className="btn-primary disabled:cursor-wait disabled:opacity-70">
                    {status === 'submitting' ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending
                      </>
                    ) : (
                      'Start a conversation'
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-2 text-sm text-red-300">
      <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}
