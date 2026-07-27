import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
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

  const field =
    "w-full rounded-xl border border-line bg-panel-2 px-4 py-3 text-sm text-fg placeholder:text-faint transition-colors focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/25";

  return (
    <section id="contact" className="section scroll-mt-24 py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something intelligent"
        description="Open to AI Engineer roles and collaborations. The fastest way to reach me is below."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Left: contact rails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <Card className="p-6">
            <h3 className="font-semibold">Reach me directly</h3>
            <div className="mt-5 space-y-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-line bg-panel-2 p-3 transition-all hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Icon name={s.icon} size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium">{s.label}</div>
                    <div className="truncate text-xs text-faint">
                      {s.handle}
                    </div>
                  </div>
                </a>
              ))}
              <div className="flex items-center gap-3 rounded-xl border border-line bg-panel-2 p-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium">Location</div>
                  <div className="text-xs text-faint">{profile.location}</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <Card className="p-6 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
                <CheckCircle2 size={44} className="text-accent" />
                <h3 className="text-lg font-semibold">
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
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    {profile.email}
                  </a>
                  .
                </p>
                <Button
                  variant="ghost"
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
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm text-muted">
                      Name
                    </label>
                    <input
                      className={field}
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm text-muted">
                      Email
                    </label>
                    <input
                      type="email"
                      className={field}
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-muted">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className={`${field} resize-none`}
                    placeholder="Tell me about the role or project…"
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>
                {status === "error" && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
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
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      Send message
                    </>
                  )}
                </Button>
                <p className="text-xs text-faint">
                  {profile.formspreeEndpoint
                    ? "Your message is delivered straight to my inbox."
                    : "This opens your email client with the message pre-filled — no data is stored."}
                </p>
              </form>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
