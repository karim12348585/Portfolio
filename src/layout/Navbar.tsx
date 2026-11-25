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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-4",
      )}
    >
      <div className="section">
        <nav
          aria-label="Primary navigation"
          className={cn(
            "flex h-14 items-center justify-between transition-all duration-300",
            scrolled
              ? "glass rounded-2xl px-4 shadow-soft"
              : "border border-transparent px-0",
          )}
        >
          <button
            type="button"
            onClick={() => go("hero")}
            aria-label={`${profile.name} — Back to top`}
            className="group/logo flex shrink-0 items-center gap-2.5 whitespace-nowrap font-display text-[15px] font-bold tracking-tight text-fg"
          >
            <Logo className="transition-transform duration-200 group-hover/logo:scale-105" />
            <span className="hidden sm:inline">{profile.name}</span>
          </button>

          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => {
              const isActive = onHome && active === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  className={cn(
                    "relative py-1.5 text-sm whitespace-nowrap transition-colors",
                    isActive
                      ? "font-semibold text-fg"
                      : "font-medium text-muted hover:text-fg",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-accent dark:bg-accent-soft"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <a
              href={profile.cvPath}
              download="Karim-Souissi-CV.pdf"
              className="hidden sm:block"
            >
              <Button
                size="sm"
                variant="secondary"
                asChild
                className="h-9 gap-1.5 rounded-lg px-3.5 text-xs font-semibold"
              >
                <Download size={14} />
                <span>CV</span>
              </Button>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-panel text-muted lg:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 lg:hidden"
            >
              <div className="glass grid gap-1 rounded-2xl p-3 shadow-soft">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => go(link.id)}
                    className="rounded-xl px-4 py-2.5 text-left text-sm font-medium text-muted transition-colors hover:bg-panel-2 hover:text-fg"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
