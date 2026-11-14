import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks } from "@/constants";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToId } from "@/utils/scroll";
import { cn } from "@/utils/cn";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";

const sectionIds = navLinks.map((l) => l.id);
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Running head: a full-width bar that gains a hairline once the page
 * scrolls. Links carry their section index like a table of contents.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    if (onHome) {
      scrollToId(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        scrolled || menuOpen
          ? "border-b border-line bg-bg/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="section flex h-14 items-center justify-between">
        <button
          onClick={() => go("hero")}
          className="group/logo flex items-center gap-2.5"
        >
          <Logo className="transition-transform duration-300 group-hover/logo:-translate-y-0.5" />
          <span className="hidden font-mono text-[12px] font-medium uppercase tracking-[0.12em] sm:inline">
            {profile.name}
          </span>
        </button>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link, i) => {
            const isActive = onHome && active === link.id;
            return (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={cn(
                  "relative flex items-baseline gap-1.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                  isActive ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                <span
                  className={cn(
                    "text-[10px]",
                    isActive ? "text-accent" : "text-faint",
                  )}
                >
                  {pad(i + 1)}
                </span>
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-rule"
                    className="absolute inset-x-0 -bottom-px h-px bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={profile.cvPath} download className="hidden sm:block">
            <Button size="sm" variant="secondary" className="gap-1.5">
              <Download size={13} />
              CV
            </Button>
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="grid h-9 w-9 place-items-center rounded-[2px] border border-line text-muted transition-colors hover:border-fg hover:text-fg lg:hidden"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="section lg:hidden"
          >
            <ul className="divide-y divide-line border-t border-line pb-3">
              {navLinks.map((link, i) => (
                <li key={link.id}>
                  <button
                    onClick={() => go(link.id)}
                    className="flex w-full items-baseline gap-3 py-3 text-left font-mono text-[12px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-fg"
                  >
                    <span className="text-[10px] text-accent">{pad(i + 1)}</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
