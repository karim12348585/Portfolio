import { profile, socials } from "@/data/profile";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { scrollToId } from "@/utils/scroll";
import { navLinks } from "@/constants";
import { useLocation, useNavigate } from "react-router-dom";

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const go = (id: string) => {
    if (location.pathname === "/") scrollToId(id);
    else navigate("/", { state: { scrollTo: id } });
  };

  return (
    <footer className="mt-12 border-t border-line bg-panel/40">
      <div className="section py-9">
        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-fg">
              <Logo size="sm" />
              <span>{profile.name}</span>
            </div>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-muted sm:text-sm">
              {profile.tagline}
            </p>
            <p className="mt-3 font-mono text-xs text-faint">
              {profile.title} · {profile.subtitle} · {profile.location}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-fg">Navigation</h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => go(l.id)}
                    className="text-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-fg">
              Profiles &amp; Contact
            </h3>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
                  >
                    <Icon name={s.icon} size={13} className="text-faint" />
                    <span>{s.label}</span>
                    <span className="font-mono text-xs text-faint">
                      / {s.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-line pt-5 font-mono text-xs text-faint sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
