"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import {
  applyTheme,
  readStoredTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
  type Resolved,
  type ThemeChoice,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

type Ctx = { choice: ThemeChoice; resolved: Resolved; setChoice: (c: ThemeChoice) => void };

const ThemeContext = createContext<Ctx>({
  choice: "system",
  resolved: "dark",
  setChoice: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<ThemeChoice>("system");
  const [resolved, setResolved] = useState<Resolved>("dark");

  useEffect(() => {
    const stored = readStoredTheme();
    setChoiceState(stored);
    const r = resolveTheme(stored);
    setResolved(r);
    applyTheme(r);
  }, []);

  useEffect(() => {
    if (choice !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      const r: Resolved = mq.matches ? "light" : "dark";
      setResolved(r);
      applyTheme(r);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [choice]);

  const setChoice = useCallback((next: ThemeChoice) => {
    setChoiceState(next);
    const r = resolveTheme(next);
    setResolved(r);
    applyTheme(r);
    try {
      if (next === "system") localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* приватный режим */
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ choice, resolved, setChoice }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

/** Видимый переключатель темы: два состояния, выбор сохраняется. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolved, setChoice } = useTheme();
  const next: Resolved = resolved === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setChoice(next)}
      aria-label={next === "light" ? "Включить светлую тему" : "Включить тёмную тему"}
      title={next === "light" ? "Светлая тема" : "Тёмная тема"}
      className={cn(
        "group relative flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-foreground transition-colors duration-500 hover:bg-surface",
        className,
      )}
    >
      <span className="sr-only">
        Текущая тема: {resolved === "dark" ? "тёмная" : "светлая"}. Переключить на{" "}
        {next === "dark" ? "тёмную" : "светлую"}.
      </span>
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] transition-transform duration-700 group-hover:rotate-[18deg]"
        fill="none"
        aria-hidden
      >
        {resolved === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line
                key={a}
                x1="12"
                y1="2.6"
                x2="12"
                y2="5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                transform={`rotate(${a} 12 12)`}
              />
            ))}
          </>
        ) : (
          <path
            d="M20 14.2A8.4 8.4 0 1 1 9.8 4a6.9 6.9 0 0 0 10.2 10.2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}
