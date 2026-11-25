import { useState, type FormEvent } from "react";
import {
  Send,
  MapPin,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { profile, socials } from "@/data/profile";
import { buildMailto } from "@/utils/mailto";
import { validateContactForm } from "@/utils/portfolioLogic";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e = validateContactForm(form);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openMailto = () => {
    window.location.href = buildMailto(profile.email, {
      subject: `Portfolio contact from ${form.name}`,
      body: `${form.message}\n\n— ${form.name} (${form.email})`,
    });
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    if (!profile.formspreeEndpoint) {
      openMailto();
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(profile.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact from ${form.name}`,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const sent = status === "success";

  const field =
    "w-full rounded-lg border border-line bg-panel px-3.5 py-2.5 text-sm text-fg placeholder:text-faint transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/25 focus:outline-none";

  return (
    <section id="contact" className="section scroll-mt-24 py-12">
      <SectionHeading
        index="08"
        eyebrow="Contact"
        title="Let's build something intelligent"
        description="Open to Data Scientist and AI Engineer roles or engineering collaborations."
      />

      <div className="mt-7 grid gap-8 lg:grid-cols-12">
        {/* Left: Direct contact channels */}
        <div className="lg:col-span-5">
          <h3 className="border-b border-line pb-2 font-display text-lg font-bold text-fg">
            Reach me directly
          </h3>
          <div className="divide-y divide-line border-b border-line">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 py-3 transition-colors"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Icon
                    name={s.icon}
                    size={15}
                    className="shrink-0 text-faint transition-colors group-hover:text-accent"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-fg">
                      {s.label}
                    </div>
                    <div className="truncate font-mono text-xs text-faint">
                      {s.handle}
                    </div>
                  </div>
                </div>
                <ArrowUpRight
                  size={14}
                  className="shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </a>
            ))}
            <div className="flex items-center gap-3 py-3">
              <MapPin size={15} className="shrink-0 text-faint" />
              <div>
                <div className="text-sm font-medium text-fg">Location</div>
                <div className="font-mono text-xs text-faint">
                  {profile.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-7">
          <h3 className="border-b border-line pb-2 font-display text-lg font-bold text-fg">
            Send a message
          </h3>
          <div className="pt-4">
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-line bg-panel-2/40 py-9 text-center">
                <CheckCircle2 size={32} className="text-accent" />
                <h4 className="font-display text-lg font-bold text-fg">
                  {profile.formspreeEndpoint
                    ? "Message sent"
                    : "Your mail client is open"}
                </h4>
                <p className="max-w-sm text-sm text-muted">
                  {profile.formspreeEndpoint
                    ? "Thank you. I will reply as soon as I can. "
                    : "If nothing happened, email me directly at "}
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-accent underline underline-offset-2 hover:text-accent-soft"
                  >
                    {profile.email}
                  </a>
                  .
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", email: "", message: "" });
                  }}
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1 block text-xs font-medium text-fg"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      className={field}
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1 block text-xs font-medium text-fg"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={field}
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1 block text-xs font-medium text-fg"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    className={`${field} resize-none`}
                    placeholder="Tell me about the role or project…"
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>
                {status === "error" && (
                  <div className="flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-fg">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>
                      Something went wrong sending your message. Please email me
                      directly at{" "}
                      <a
                        href={`mailto:${profile.email}`}
                        className="underline underline-offset-2"
                      >
                        {profile.email}
                      </a>
                      .
                    </span>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Button
                    type="submit"
                    size="md"
                    className="w-full sm:w-auto"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send message</span>
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-faint">
                    {profile.formspreeEndpoint
                      ? "Your message is delivered straight to my inbox."
                      : "Opens your email client pre-filled; no data is stored."}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
