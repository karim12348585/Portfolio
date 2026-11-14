import { profile, socials } from "@/data/profile";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { scrollToId } from "@/utils/scroll";
import { navLinks } from "@/constants";
import { useLocation, useNavigate } from "react-router-dom";

const pad = (n: number) => String(n).padStart(2, "0");

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const go = (id: string) => {
    if (location.pathname === "/") scrollToId(id);
    else navigate("/", { state: { scrollTo: id } });
  };

  return (
    <footer className="relative mt-24 border-t border-fg">
      <div className="section py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.12em]">
              <Logo />
              {profile.name}
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {profile.tagline}
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
              {profile.location}
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="mono-label">Navigate</h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l, i) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="link-underline flex items-baseline gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <span className="font-mono text-[10px] text-faint">
                      {pad(i + 1)}
                    </span>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="mono-label">Connect</h4>
            <ul className="mt-4 space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="link-underline inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <Icon name={s.icon} size={14} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-faint sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name} · React, TypeScript &
            Framer Motion
          </p>
          <p>Designed & engineered end-to-end</p>
        </div>
      </div>
    </footer>
  );
}
