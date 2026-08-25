import type { UtmData } from "./lead-schema";

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORAGE_KEY = "billsu_utm";

/** Читает UTM из URL, сохраняет в sessionStorage и возвращает накопленные метки. */
export function captureUtm(): UtmData {
  if (typeof window === "undefined") return {};

  let stored: UtmData = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}") as UtmData;
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const fresh: UtmData = {};
  for (const key of KEYS) {
    const value = params.get(key);
    if (value) fresh[key] = value.slice(0, 200);
  }

  const data: UtmData = {
    ...stored,
    ...fresh,
    referrer: stored.referrer || document.referrer.slice(0, 500) || undefined,
    landing_path: stored.landing_path || window.location.pathname,
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* приватный режим — просто пропускаем */
  }

  return data;
}
