export type ThemeChoice = "dark" | "light" | "system";
export type Resolved = "dark" | "light";

export const THEME_STORAGE_KEY = "billsu-theme";

/**
 * Инлайн-скрипт: ставит класс темы до первой отрисовки, чтобы не было вспышки.
 * Учитывает сохранённый выбор, иначе системную настройку.
 */
export const themeBootstrapScript = `(function(){try{
var k='${THEME_STORAGE_KEY}';var s=localStorage.getItem(k);
var m=window.matchMedia('(prefers-color-scheme: light)').matches;
var t=(s==='light'||s==='dark')?s:(m?'light':'dark');
var c=document.documentElement.classList;c.remove('light','dark');c.add(t);
}catch(e){document.documentElement.classList.add('dark');}})();`;

export function resolveTheme(choice: ThemeChoice): Resolved {
  if (choice === "system") {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  return choice;
}

export function applyTheme(resolved: Resolved) {
  const c = document.documentElement.classList;
  c.remove("light", "dark");
  c.add(resolved);
}

export function readStoredTheme(): ThemeChoice {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    /* приватный режим */
  }
  return "system";
}
