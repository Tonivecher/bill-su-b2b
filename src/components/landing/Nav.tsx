import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CursorTracker, Magnetic } from "@/components/motion/primitives";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#product", label: "Продукт" },
  { href: "/#workspace", label: "Интерфейс" },
  { href: "/#how", label: "Механика" },
  { href: "/#connect", label: "Подключение" },
  { href: "/#faq", label: "Вопросы" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500",
        scrolled ? "border-b border-border bg-background/95" : "border-b border-transparent",
      )}
    >
      <a
        href="#main-content"
        className="sr-only absolute left-5 top-4 z-[60] rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background focus:not-sr-only focus:outline-offset-4"
      >
        Перейти к содержимому
      </a>
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Bill.su — на главную">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Разделы сайта">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/documents"
            className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            Документы
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Magnetic className="hidden sm:inline-block">
            <a
              href="/#lead"
              className="inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-[transform,background-color] duration-300 hover:bg-accent hover:text-accent-foreground active:scale-[0.97]"
            >
              Оставить заявку
            </a>
          </Magnetic>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 block h-px w-4 bg-current transition-transform duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-px w-4 bg-current transition-transform duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-400 lg:hidden",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex max-w-[1240px] flex-col px-5 py-3" aria-label="Мобильное меню">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center border-b border-border text-[15px] text-muted-foreground"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/documents"
            onClick={() => setOpen(false)}
            className="flex min-h-12 items-center border-b border-border text-[15px] text-muted-foreground"
          >
            Документы
          </Link>
          <a
            href="/#lead"
            onClick={() => setOpen(false)}
            className="mt-3 flex min-h-12 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background"
          >
            Оставить заявку
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <CursorTracker as="span" shift={3} tilt={4}>
      <span
        className={cn(
          "font-display text-[20px] font-semibold tracking-[-0.04em] text-foreground",
          className,
        )}
      >
        bill
        <CursorTracker as="span" shift={8} tilt={12}>
          <span className="dot-pulse text-accent">.</span>
        </CursorTracker>
        su
      </span>
    </CursorTracker>
  );
}
