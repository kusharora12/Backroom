import { useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowUpRight, CircleAlert, Check, LoaderCircle } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { WHATSAPP_URL } from '@/data/content';
import { SERVICE_CATEGORIES } from '@/data/services';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '3b907d7d-5995-45db-86ba-5cd87333d55f';
const CONTACT_EMAIL = 'Backroomstudioco@gmail.com';
const OTHER_SERVICE = 'Other';

const SERVICE_OPTIONS = [...SERVICE_CATEGORIES.map((category) => category.name), OTHER_SERVICE];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_ALLOWED_PATTERN = /^\+?[\d\s()-]+$/;

type FormValues = {
  name: string;
  phone: string;
  email: string;
  business: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_VALUES: FormValues = {
  name: '',
  phone: '',
  email: '',
  business: '',
  service: '',
  message: '',
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const phoneDigits = values.phone.replace(/\D/g, '');
  const email = values.email.trim();
  const business = values.business.trim();
  const message = values.message.trim();

  if (!name) errors.name = 'Please tell us your full name.';
  else if (name.length > 120) errors.name = 'Please keep your name under 120 characters.';

  if (!values.phone.trim()) errors.phone = 'Please add a phone number so we can reach you.';
  else if (!PHONE_ALLOWED_PATTERN.test(values.phone.trim()) || phoneDigits.length < 7 || phoneDigits.length > 15)
    errors.phone = 'Please enter a valid phone number, with 7 to 15 digits.';

  if (!email) errors.email = 'Please add an email address so we can reply.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address.';

  if (!business) errors.business = 'Please tell us your business name.';
  else if (business.length > 160) errors.business = 'Please keep your business name under 160 characters.';

  if (!values.service) errors.service = 'Please choose the service you need.';

  if (message.length > 5000) errors.message = 'Please keep your message under 5,000 characters.';

  return errors;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitState>('idle');

  const updateField = (field: keyof FormValues) => (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const nextValue = event.target.value;
    setValues((current) => ({ ...current, [field]: nextValue }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

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
          subject: `New enquiry from ${values.name.trim()} (${values.business.trim()})`,
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          business_name: values.business.trim(),
          service_required: values.service,
          message: values.message.trim() || 'No message provided',
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
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-midnight py-28 md:py-40">
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
          <div className="mt-12 flex flex-col border-t border-white/15">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-b border-white/15 py-6 font-display text-2xl font-bold uppercase text-white transition-colors duration-300 hover:text-teal-light"
            >
              WhatsApp us
              <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group flex items-center justify-between border-b border-white/15 py-6 font-display text-2xl font-bold uppercase text-white transition-colors duration-300 hover:text-teal-light"
            >
              {CONTACT_EMAIL}
              <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
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
                  Full name <span className="text-teal-light">*</span>
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
                  placeholder="Your full name"
                />
                <FieldError id="name-error" message={errors.name} />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone number <span className="text-teal-light">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={updateField('phone')}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={inputClass('phone')}
                  placeholder="+91 98765 43210"
                />
                <FieldError id="phone-error" message={errors.phone} />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email address <span className="text-teal-light">*</span>
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
                <label htmlFor="business" className={labelClass}>
                  Business name <span className="text-teal-light">*</span>
                </label>
                <input
                  id="business"
                  name="business"
                  autoComplete="organization"
                  value={values.business}
                  onChange={updateField('business')}
                  aria-invalid={Boolean(errors.business)}
                  aria-describedby={errors.business ? 'business-error' : undefined}
                  className={inputClass('business')}
                  placeholder="Your business name"
                />
                <FieldError id="business-error" message={errors.business} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="service" className={labelClass}>
                  Service required <span className="text-teal-light">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={values.service}
                  onChange={updateField('service')}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? 'service-error' : undefined}
                  className={`${inputClass('service')} appearance-none bg-forest`}
                >
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <FieldError id="service-error" message={errors.service} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelClass}>
                  Message <span className="text-white/40">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={updateField('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`${inputClass('message')} resize-y`}
                  placeholder="What are you building, and what would success look like?"
                />
                <FieldError id="message-error" message={errors.message} />
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
