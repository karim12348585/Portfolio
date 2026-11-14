import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Send,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { profile, socials } from "@/data/profile";
import { buildMailto } from "@/utils/mailto";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email.";
    if (form.message.trim().length < 10)
      e.message = "Message should be at least 10 characters.";
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

    // No Formspree endpoint configured → fall back to the mailto: handoff.
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

  return (
    <section id="contact" className="section scroll-mt-24 py-24">
      <SectionHeading
        index="07"
        eyebrow="Contact"
        title="Let's build something intelligent"
        description="Open to Data Scientist / AI Engineer roles and collaborations. The fastest way to reach me is below."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left: contact rails as a definition list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5"
        >
          <h3 className="mono-label text-fg">Reach me directly</h3>
          <dl className="mt-4 divide-y divide-line border-y border-line">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group grid grid-cols-[6.5rem_1fr_auto] items-center gap-3 py-3.5"
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                  {s.label}
                </dt>
                <dd className="truncate text-sm text-fg">
                  <span className="link-underline">{s.handle}</span>
                </dd>
                <ArrowUpRight
                  size={13}
                  className="text-faint transition-colors group-hover:text-accent"
                />
              </a>
            ))}
            <div className="grid grid-cols-[6.5rem_1fr] items-center gap-3 py-3.5">
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                Location
              </dt>
              <dd className="text-sm text-fg">{profile.location}</dd>
            </div>
          </dl>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="lg:col-span-7"
        >
          {sent ? (
            <div className="flex flex-col items-start gap-3 border-y border-line py-14">
              <CheckCircle2 size={28} className="text-accent" />
              <h3 className="text-xl font-semibold tracking-tight">
                {profile.formspreeEndpoint
                  ? "Message sent — thank you!"
                  : "Your mail client is open"}
              </h3>
              <p className="max-w-sm text-sm text-muted">
                {profile.formspreeEndpoint
                  ? "I'll get back to you as soon as I can. "
                  : "If nothing happened, email me directly at "}
                <a
                  href={`mailto:${profile.email}`}
                  className="text-fg underline underline-offset-4 hover:text-accent"
                >
                  {profile.email}
                </a>
                .
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3.5"
                onClick={() => {
                  setStatus("idle");
                  setForm({ name: "", email: "", message: "" });
                }}
              >
                Send another
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label className="mono-label block">Name</label>
                  <input
                    className="field"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                  {errors.name && (
                    <p className="mt-1.5 font-mono text-[11px] text-accent">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mono-label block">Email</label>
                  <input
                    type="email"
                    className="field"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                  {errors.email && (
                    <p className="mt-1.5 font-mono text-[11px] text-accent">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="mono-label block">Message</label>
                <textarea
                  rows={5}
                  className="field resize-none"
                  placeholder="Tell me about the role or project…"
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                />
                {errors.message && (
                  <p className="mt-1.5 font-mono text-[11px] text-accent">
                    {errors.message}
                  </p>
                )}
              </div>
              {status === "error" && (
                <div className="flex items-start gap-2 border border-accent/60 p-3 text-sm text-fg">
                  <AlertCircle size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>
                    Something went wrong sending your message. Please email me
                    directly at{" "}
                    <a
                      href={`mailto:${profile.email}`}
                      className="underline underline-offset-4"
                    >
                      {profile.email}
                    </a>
                    .
                  </span>
                </div>
              )}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send message
                    </>
                  )}
                </Button>
                <p className="font-mono text-[11px] text-faint">
                  {profile.formspreeEndpoint
                    ? "Your message is delivered straight to my inbox."
                    : "This opens your email client with the message pre-filled — no data is stored."}
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
