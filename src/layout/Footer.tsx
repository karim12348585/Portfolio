import { profile, socials } from "@/data/profile";
import { Icon } from "@/components/Icon";
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
    <footer className="relative mt-24 border-t border-line">
      <div className="section py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent-gradient text-xs font-bold text-black">
                {profile.initials}
              </span>
              {profile.name}
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted">
              {profile.tagline}
            </p>
            <p className="mt-3 text-sm text-faint">{profile.location}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Navigate</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Connect</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
                  >
                    <Icon name={s.icon} size={15} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-faint sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React,
            TypeScript & Framer Motion.
          </p>
          <p>Designed & engineered end-to-end.</p>
        </div>
      </div>
    </footer>
  );
}
