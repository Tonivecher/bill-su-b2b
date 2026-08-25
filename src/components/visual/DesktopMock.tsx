"use client";

import type React from "react";
import { useId, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Breathe, Tilt } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

type Tone = "ok" | "wait" | "off";

const toneDot: Record<Tone, string> = {
  ok: "bg-accent",
  wait: "bg-muted-foreground/60",
  off: "bg-destructive",
};

const toneText: Record<Tone, string> = {
  ok: "text-accent",
  wait: "text-muted-foreground",
  off: "text-destructive",
};

type TabKey = "overview" | "payments" | "consents" | "payouts" | "registers";

const tabs: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Обзор" },
  { key: "payments", label: "Платежи" },
  { key: "consents", label: "Согласия" },
  { key: "payouts", label: "Выплаты" },
  { key: "registers", label: "Реестры" },
];

/* ── синтетические данные ─────────────────────────────────────── */

const metrics = [
  ["Активные сценарии", "42"],
  ["Ожидают списания", "6"],
  ["Согласия отозваны", "3"],
  ["Реестры за месяц", "4"],
];

const spark = [12, 18, 15, 22, 19, 26, 24, 30, 27, 33, 31, 36];

const events = [
  ["Сегодня", "Плановые списания по 12 сценариям"],
  ["Завтра", "Формирование реестра за период"],
  ["Через 3 дня", "Выплата T+3 напрямую от НКО"],
];

const payments: {
  id: string;
  scenario: string;
  date: string;
  amount: string;
  status: Tone;
  label: string;
}[] = [
  {
    id: "OP-2041",
    scenario: "Подписка · базовый доступ",
    date: "24.08",
    amount: "1 200 ₽",
    status: "ok",
    label: "Оплачено",
  },
  {
    id: "OP-2042",
    scenario: "Абонемент · 8 занятий",
    date: "24.08",
    amount: "4 400 ₽",
    status: "ok",
    label: "Оплачено",
  },
  {
    id: "OP-2043",
    scenario: "Регулярный счёт · обслуживание",
    date: "25.08",
    amount: "2 800 ₽",
    status: "wait",
    label: "Ожидает",
  },
  {
    id: "OP-2044",
    scenario: "Подписка · расширенный доступ",
    date: "25.08",
    amount: "5 700 ₽",
    status: "ok",
    label: "Оплачено",
  },
  {
    id: "OP-2045",
    scenario: "Членский взнос",
    date: "26.08",
    amount: "900 ₽",
    status: "off",
    label: "Не проведено",
  },
  {
    id: "OP-2046",
    scenario: "Абонемент · безлимит",
    date: "26.08",
    amount: "6 100 ₽",
    status: "wait",
    label: "Ожидает",
  },
];

const consents: { id: string; scenario: string; date: string; status: Tone; label: string }[] = [
  {
    id: "CN-0311",
    scenario: "Подписка · базовый доступ",
    date: "с 12.06",
    status: "ok",
    label: "Активно",
  },
  {
    id: "CN-0312",
    scenario: "Абонемент · 8 занятий",
    date: "с 03.07",
    status: "ok",
    label: "Активно",
  },
  {
    id: "CN-0313",
    scenario: "Регулярный счёт · обслуживание",
    date: "с 21.07",
    status: "wait",
    label: "Приостановлено",
  },
  {
    id: "CN-0314",
    scenario: "Членский взнос",
    date: "с 02.05",
    status: "off",
    label: "Отозвано клиентом",
  },
];

const payouts: { id: string; period: string; amount: string; status: Tone; label: string }[] = [
  { id: "PO-8801", period: "21.08 — 22.08", amount: "18 400 ₽", status: "ok", label: "Исполнена" },
  { id: "PO-8802", period: "22.08 — 23.08", amount: "12 950 ₽", status: "ok", label: "Исполнена" },
  {
    id: "PO-8803",
    period: "23.08 — 24.08",
    amount: "9 300 ₽",
    status: "wait",
    label: "В обработке",
  },
  {
    id: "PO-8804",
    period: "24.08 — 25.08",
    amount: "7 100 ₽",
    status: "wait",
    label: "Запланирована",
  },
];

const registers: { id: string; period: string; type: string; status: Tone; label: string }[] = [
  { id: "RG-0451", period: "Август · 1–10", type: "Платежи", status: "ok", label: "Готов" },
  { id: "RG-0452", period: "Август · 11–20", type: "Платежи", status: "ok", label: "Готов" },
  {
    id: "RG-0453",
    period: "Август · 1–20",
    type: "Согласия",
    status: "wait",
    label: "Формируется",
  },
  { id: "RG-0454", period: "Август · 1–20", type: "Выплаты", status: "wait", label: "Формируется" },
];

/* ── вспомогательные примитивы ─────────────────────────────────── */

function PanelHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {eyebrow}
      </p>
      <p className="mt-1.5 font-display text-[15px] tracking-[-0.03em] sm:text-lg">{title}</p>
    </div>
  );
}

function StatusCell({ tone, label }: { tone: Tone; label: string }) {
  return (
    <span
      className={cn(
        "flex items-center justify-end gap-1.5 whitespace-nowrap text-[10.5px]",
        toneText[tone],
      )}
    >
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", toneDot[tone])} />
      {label}
    </span>
  );
}

function Sparkline() {
  const max = Math.max(...spark);
  const min = Math.min(...spark);
  const pts = spark
    .map((v, i) => {
      const x = (i / (spark.length - 1)) * 100;
      const y = 30 - ((v - min) / (max - min || 1)) * 26 - 2;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-14 w-full" aria-hidden>
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="text-accent/70"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ── содержимое вкладок ────────────────────────────────────────── */

function Overview() {
  return (
    <div className="flex flex-col gap-4">
      <PanelHead eyebrow="Регулярные платежи" title="Обзор состояния" />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {metrics.map(([l, v]) => (
          <div key={l} className="rounded-xl border border-hairline bg-surface/40 px-3 py-2.5">
            <p className="text-[9.5px] uppercase leading-tight tracking-[0.1em] text-muted-foreground">
              {l}
            </p>
            <p className="tnum mt-1.5 font-mono text-[15px] text-foreground">{v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border border-hairline bg-surface/35 px-3 py-3">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
            Динамика прохождения списаний
          </p>
          <Sparkline />
          <p className="tnum font-mono text-[9.5px] text-muted-foreground">
            12 периодов · синтетический ряд
          </p>
        </div>
        <div className="rounded-xl border border-hairline bg-surface/35 px-3 py-3">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
            Ближайшие события
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {events.map(([when, what]) => (
              <li key={what} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-[10.5px] leading-tight text-muted-foreground">
                  <span className="text-foreground">{when}</span> · {what}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Payments() {
  return (
    <div className="flex flex-col gap-4">
      <PanelHead eyebrow="Операции" title="Синтетические списания" />
      <div className="overflow-hidden rounded-xl border border-hairline">
        <div className="hidden grid-cols-[4.5rem_1fr_3rem_4.5rem_7rem] gap-2 border-b border-hairline bg-surface/45 px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground sm:grid">
          <span>ID</span>
          <span>Сценарий</span>
          <span>Дата</span>
          <span className="text-right">Сумма</span>
          <span className="text-right">Статус</span>
        </div>
        {payments.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-hairline px-3 py-2.5 last:border-b-0 sm:grid-cols-[4.5rem_1fr_3rem_4.5rem_7rem]"
          >
            <span className="tnum hidden font-mono text-[10.5px] text-muted-foreground sm:block">
              {r.id}
            </span>
            <span className="min-w-0 truncate text-[11.5px] text-foreground">{r.scenario}</span>
            <span className="tnum hidden font-mono text-[10.5px] text-muted-foreground sm:block">
              {r.date}
            </span>
            <span className="tnum hidden text-right font-mono text-[10.5px] text-foreground sm:block">
              {r.amount}
            </span>
            <StatusCell tone={r.status} label={r.label} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Consents() {
  return (
    <div className="flex flex-col gap-4">
      <PanelHead eyebrow="Согласия" title="Состояния согласий" />
      <div className="grid gap-2 sm:grid-cols-2">
        {consents.map((c) => (
          <div key={c.id} className="rounded-xl border border-hairline bg-surface/35 px-3 py-3">
            <div className="flex items-start justify-between gap-2">
              <span className="tnum font-mono text-[10px] text-muted-foreground">{c.id}</span>
              <StatusCell tone={c.status} label={c.label} />
            </div>
            <p className="mt-2 truncate text-[11.5px] text-foreground">{c.scenario}</p>
            <p className="tnum mt-1 font-mono text-[10px] text-muted-foreground">{c.date}</p>
          </div>
        ))}
      </div>
      <p className="rounded-xl border border-hairline px-3 py-2.5 text-[10.5px] leading-relaxed text-muted-foreground">
        Клиент может отменить согласие на регулярные списания в своём банке — сценарий переходит в
        состояние «отозвано», новые списания не выполняются.
      </p>
    </div>
  );
}

function Payouts() {
  return (
    <div className="flex flex-col gap-4">
      <PanelHead eyebrow="Выплаты" title="Реестр выплат" />
      <div className="overflow-hidden rounded-xl border border-hairline">
        <div className="hidden grid-cols-[4.5rem_1fr_5rem_7rem] gap-2 border-b border-hairline bg-surface/45 px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground sm:grid">
          <span>ID</span>
          <span>Период</span>
          <span className="text-right">Сумма</span>
          <span className="text-right">Статус</span>
        </div>
        {payouts.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-hairline px-3 py-2.5 last:border-b-0 sm:grid-cols-[4.5rem_1fr_5rem_7rem]"
          >
            <span className="tnum hidden font-mono text-[10.5px] text-muted-foreground sm:block">
              {p.id}
            </span>
            <span className="tnum min-w-0 truncate font-mono text-[10.5px] text-foreground sm:text-[10.5px]">
              {p.period}
            </span>
            <span className="tnum hidden text-right font-mono text-[10.5px] text-foreground sm:block">
              {p.amount}
            </span>
            <StatusCell tone={p.status} label={p.label} />
          </div>
        ))}
      </div>
      <p className="rounded-xl border border-hairline px-3 py-2.5 text-[10.5px] leading-relaxed text-muted-foreground">
        Выплаты — T+3 напрямую от НКО.
      </p>
    </div>
  );
}

function Registers() {
  return (
    <div className="flex flex-col gap-4">
      <PanelHead eyebrow="Реестры" title="Периодические реестры" />
      <div className="grid gap-2 sm:grid-cols-2">
        {registers.map((r) => (
          <div key={r.id} className="rounded-xl border border-hairline bg-surface/35 px-3 py-3">
            <div className="flex items-start justify-between gap-2">
              <span className="tnum font-mono text-[10px] text-muted-foreground">{r.id}</span>
              <StatusCell tone={r.status} label={r.label} />
            </div>
            <p className="mt-2 text-[11.5px] text-foreground">{r.type}</p>
            <p className="tnum mt-1 font-mono text-[10px] text-muted-foreground">{r.period}</p>
          </div>
        ))}
      </div>
      <p className="rounded-xl border border-hairline px-3 py-2.5 text-[10.5px] leading-relaxed text-muted-foreground">
        Раздел показан как иллюстрация интерфейса на синтетических данных.
      </p>
    </div>
  );
}

const panels: Record<TabKey, () => React.ReactElement> = {
  overview: Overview,
  payments: Payments,
  consents: Consents,
  payouts: Payouts,
  registers: Registers,
};

/* ── корпус ────────────────────────────────────────────────────── */

/** Обезличенная иллюстрация рабочего экрана в корпусе монитора. Данные синтетические. */
export function DesktopMock({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState<TabKey>("overview");
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const idx = tabs.findIndex((t) => t.key === active);
  const Panel = panels[active];

  const focusTab = (i: number) => {
    const next = tabs[(i + tabs.length) % tabs.length];
    if (!next) return;
    setActive(next.key);
    btnRefs.current[next.key]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    if (e.key === "Home") return focusTab(0);
    if (e.key === "End") return focusTab(tabs.length - 1);
    focusTab(e.key === "ArrowDown" || e.key === "ArrowRight" ? idx + 1 : idx - 1);
  };

  const tabId = (k: TabKey) => `${uid}-tab-${k}`;
  const panelId = (k: TabKey) => `${uid}-panel-${k}`;

  return (
    <figure className={cn("m-0 mx-auto w-full max-w-[1080px]", className)}>
      <Breathe duration={26}>
        <Tilt max={3}>
          {/* Корпус: внешний + внутренний bezel, пропорции настоящего 16:10 монитора */}
          <div className="rounded-[1.4rem] border border-hairline bg-surface-2 p-2 shadow-lift sm:rounded-[1.9rem] sm:p-3 lg:p-4">
            {/* Экран */}
            <div className="flex flex-col overflow-hidden rounded-[1rem] border border-hairline bg-background sm:rounded-[1.3rem] lg:aspect-[16/10]">
              {/* Строка приложения */}
              <div className="flex shrink-0 items-center gap-3 border-b border-hairline bg-surface/60 px-3 py-2.5 sm:px-5 sm:py-3.5">
                <span className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/35" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/35" />
                  <span className="h-2 w-2 rounded-full bg-accent/60" />
                </span>
                <span className="tnum truncate font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
                  bill.su · рабочее пространство
                </span>
              </div>

              <div className="grid min-h-0 flex-1 grid-cols-[1fr] sm:grid-cols-[10.5rem_1fr] lg:grid-cols-[12.5rem_1fr]">
                {/* Навигация: сайдбар на sm+, горизонтальная панель на мобильном */}
                <div
                  role="tablist"
                  aria-label="Разделы рабочего пространства"
                  aria-orientation="vertical"
                  onKeyDown={onKeyDown}
                  className="flex gap-1 overflow-x-auto border-b border-hairline bg-surface/35 px-3 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-col sm:overflow-visible sm:border-b-0 sm:border-r sm:px-4 sm:py-5"
                >
                  {tabs.map((t) => {
                    const selected = t.key === active;
                    return (
                      <button
                        key={t.key}
                        ref={(el) => {
                          btnRefs.current[t.key] = el;
                        }}
                        type="button"
                        role="tab"
                        id={tabId(t.key)}
                        aria-selected={selected}
                        aria-controls={panelId(t.key)}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => setActive(t.key)}
                        className={cn(
                          "shrink-0 whitespace-nowrap rounded-lg px-2.5 py-2 text-[11.5px] outline-none transition-[color,background-color] duration-300 focus-visible:ring-2 focus-visible:ring-accent/60 sm:text-left",
                          selected
                            ? "bg-surface-2 text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>

                {/* Контент */}
                <div className="flex min-h-[19rem] min-w-0 flex-col overflow-hidden px-3 py-4 sm:min-h-[17.5rem] sm:px-6 sm:py-7 lg:min-h-0 lg:px-8 lg:py-9">
                  <div
                    key={active}
                    role="tabpanel"
                    id={panelId(active)}
                    aria-labelledby={tabId(active)}
                    tabIndex={0}
                    className={cn("flex-1 outline-none", !reduced && "bill-panel-in")}
                  >
                    <Panel />
                  </div>
                </div>
              </div>

              {/* Строка состояния */}
              <div
                aria-hidden
                className="flex shrink-0 items-center justify-between gap-4 border-t border-hairline bg-surface/35 px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground sm:px-5"
              >
                <span className="truncate">Синтетические данные · без персональных сведений</span>
                <span className="tnum hidden shrink-0 sm:inline">Обновлено · только что</span>
              </div>
            </div>
          </div>

          {/* Шейка и основание */}
          <div aria-hidden className="mx-auto flex flex-col items-center">
            <div className="h-8 w-20 bg-surface-2 sm:h-12 sm:w-28 lg:h-16 lg:w-32" />
            <div className="h-2 w-44 rounded-full bg-surface-2 sm:h-2.5 sm:w-64 lg:w-80" />
          </div>
        </Tilt>
      </Breathe>
      <figcaption className="mt-5 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
        Иллюстрация интерфейса · данные синтетические
      </figcaption>
    </figure>
  );
}
