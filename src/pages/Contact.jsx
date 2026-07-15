import { useRef, useState } from "react";
import { usePageMotion } from "../hooks/usePageMotion";
import PageHeader from "../components/PageHeader";
import { COMPANY, CONSULTATION_INCLUDES, QUOTE_SERVICE_TYPES, QUOTE_TIMELINES, QUOTE_REFERRALS } from "../lib/content";

const STEPS = ["Project", "Your details", "A few more things"];

const fieldCls =
  "w-full bg-white border border-ink/15 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze transition-colors";
const labelCls = "block text-sm font-medium text-ink/70 mb-2";
const errCls = "text-[#a8442f] text-sm mt-1.5";

function QuoteForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({ serviceType: "", timeline: "", description: "", name: "", email: "", phone: "", address: "", referral: "", notes: "" });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!data.serviceType) e.serviceType = "Please choose one";
      if (!data.timeline) e.timeline = "Please choose one";
    }
    if (step === 1) {
      if (data.name.trim().length < 2) e.name = "Please enter your name";
      if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Please enter a valid email";
      if (data.phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a valid phone number";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep((s) => Math.min(s + 1, STEPS.length - 1)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const submit = (e) => { e.preventDefault(); if (validate()) setDone(true); }; // TODO: wire to backend/email before deploy

  if (done) {
    return (
      <div className="success-in bg-white rounded-[1.75rem] border border-ink/5 p-10 md:p-12 text-center shadow-sm">
        <div className="success-in success-in-delayed w-14 h-14 rounded-full bg-bronze/15 text-bronze flex items-center justify-center mx-auto mb-6">
          <iconify-icon icon="solar:check-circle-bold" width="32" height="32" />
        </div>
        <h3 className="font-display text-3xl mb-3">Thank you, {data.name.split(" ")[0] || "there"}.</h3>
        <p className="text-ink/60 leading-relaxed max-w-md mx-auto">
          We have your request and will reach out shortly to set up your free on-site estimate. If it is
          urgent, call us at {COMPANY.phone}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-[1.75rem] border border-ink/5 p-8 md:p-10 shadow-sm">
      {/* progress */}
      <div className="flex items-center gap-3 mb-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-3 flex-1">
            <div className={`flex items-center gap-2 text-sm font-medium ${i <= step ? "text-ink" : "text-ink/60"}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors duration-300 ${i < step ? "bg-bronze-text text-bone" : i === step ? "bg-navy text-bone" : "bg-ink/10 text-ink/65"}`}>
                {i < step ? "✓" : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`h-px flex-1 transition-colors duration-300 ${i < step ? "bg-bronze" : "bg-ink/10"}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div key="step-0" className="step-in space-y-6">
          <div>
            <label htmlFor="q-service" className={labelCls}>What can we help with?</label>
            <select id="q-service" className={fieldCls} value={data.serviceType} onChange={set("serviceType")} aria-invalid={!!errors.serviceType} aria-describedby={errors.serviceType ? "err-service" : undefined}>
              <option value="">Select a service</option>
              {QUOTE_SERVICE_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            {errors.serviceType && <p id="err-service" className={errCls}>{errors.serviceType}</p>}
          </div>
          <div>
            <label htmlFor="q-timeline" className={labelCls}>Timeline</label>
            <select id="q-timeline" className={fieldCls} value={data.timeline} onChange={set("timeline")} aria-invalid={!!errors.timeline} aria-describedby={errors.timeline ? "err-timeline" : undefined}>
              <option value="">Select a timeline</option>
              {QUOTE_TIMELINES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            {errors.timeline && <p id="err-timeline" className={errCls}>{errors.timeline}</p>}
          </div>
          <div>
            <label htmlFor="q-desc" className={labelCls}>Tell us about the project <span className="text-ink/40">(optional)</span></label>
            <textarea id="q-desc" rows="3" className={fieldCls} value={data.description} onChange={set("description")} placeholder="Size, condition, what you have in mind..." />
          </div>
        </div>
      )}

      {step === 1 && (
        <div key="step-1" className="step-in space-y-6">
          <div>
            <label htmlFor="q-name" className={labelCls}>Your name</label>
            <input id="q-name" className={fieldCls} value={data.name} onChange={set("name")} placeholder="First and last" aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
            {errors.name && <p id="err-name" className={errCls}>{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="q-email" className={labelCls}>Email</label>
            <input id="q-email" type="email" className={fieldCls} value={data.email} onChange={set("email")} placeholder="you@email.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
            {errors.email && <p id="err-email" className={errCls}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="q-phone" className={labelCls}>Phone</label>
            <input id="q-phone" type="tel" className={fieldCls} value={data.phone} onChange={set("phone")} placeholder="(555) 555-5555" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined} />
            {errors.phone && <p id="err-phone" className={errCls}>{errors.phone}</p>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div key="step-2" className="step-in space-y-6">
          <div>
            <label htmlFor="q-address" className={labelCls}>Project address <span className="text-ink/40">(optional)</span></label>
            <input id="q-address" className={fieldCls} value={data.address} onChange={set("address")} placeholder="City is fine if you prefer" />
          </div>
          <div>
            <label htmlFor="q-referral" className={labelCls}>How did you hear about us? <span className="text-ink/40">(optional)</span></label>
            <select id="q-referral" className={fieldCls} value={data.referral} onChange={set("referral")}>
              <option value="">Select one</option>
              {QUOTE_REFERRALS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="q-notes" className={labelCls}>Anything else? <span className="text-ink/40">(optional)</span></label>
            <textarea id="q-notes" rows="3" className={fieldCls} value={data.notes} onChange={set("notes")} placeholder="Questions, scheduling notes, access details..." />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 mt-9">
        {step > 0 ? (
          <button type="button" onClick={back} className="pressable inline-flex items-center gap-2 text-ink/60 hover:text-ink text-sm font-medium">
            <iconify-icon icon="solar:arrow-left-linear" width="18" height="18" /> Back
          </button>
        ) : <span />}
        {/* Distinct keys force a remount when Continue becomes Send: without them React
            mutates type="button" → "submit" on the SAME node mid-click, and the browser's
            default action then submits the form — skipping step 3 entirely. */}
        {step < STEPS.length - 1 ? (
          <button key="continue" type="button" onClick={next} className="pressable inline-flex items-center gap-2 bg-navy text-bone rounded-full px-7 py-3.5 text-sm font-semibold hover:bg-bronze hover:text-navy">
            Continue <iconify-icon icon="solar:arrow-right-linear" width="18" height="18" />
          </button>
        ) : (
          <button key="submit" type="submit" className="pressable inline-flex items-center gap-2 bg-bronze-text text-bone rounded-full px-7 py-3.5 text-sm font-semibold hover:bg-navy hover:text-bone">
            Send request <iconify-icon icon="solar:arrow-right-up-linear" width="18" height="18" />
          </button>
        )}
      </div>
    </form>
  );
}

export default function Contact() {
  const root = useRef(null);
  usePageMotion(root);

  return (
    <div ref={root} className="font-sans text-ink">
      <PageHeader
        eyebrow="Get in touch"
        title="Get a free estimate"
        intro="Tell us about your deck or waterproofing project. We will walk your space and send a clear written estimate, free and with no pressure."
      />

      <section className="max-w-[1320px] mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left rail: contact + what's included */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="space-y-6" data-reveal>
              <ContactRow icon="solar:phone-linear" label="Call us" value={COMPANY.phone} href={COMPANY.phoneTel} />
              <ContactRow icon="solar:letter-linear" label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
              <ContactRow icon="solar:clock-circle-linear" label="Hours" value={COMPANY.hours} />
              <ContactRow icon="solar:map-point-linear" label="Service area" value={`${COMPANY.serviceArea} · based in ${COMPANY.location}`} />
            </div>
            <div className="mt-9 border-t border-ink/10 pt-8" data-reveal data-delay="0.08">
              <div className="text-bronze-text text-xs uppercase tracking-[0.2em] mb-4">Your free consultation includes</div>
              <ul className="space-y-3">
                {CONSULTATION_INCLUDES.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink/75">
                    <iconify-icon icon="solar:check-circle-bold" width="20" height="20" className="text-bronze shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-sm text-ink/50">{COMPANY.spanish}.</div>
            </div>
          </div>

          {/* Right: the multi-step quote form */}
          <div className="lg:col-span-7" data-reveal data-delay="0.05">
            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactRow({ icon, label, value, href }) {
  const inner = (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-navy text-bone flex items-center justify-center shrink-0">
        <iconify-icon icon={icon} width="20" height="20" className="text-bronze-soft" />
      </div>
      <div>
        <div className="text-xs text-ink/45 uppercase tracking-wider">{label}</div>
        <div className="text-ink font-medium">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:opacity-80 transition-opacity">{inner}</a> : inner;
}
