"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Connected Field — компактная смысловая схема рекуррентного платежа.
 * Сценарий → Согласие в банке → СБП → Регулярный платёж → Статус → Выплата T+3 → Реестр,
 * Bill.su — управляющий хаб в центре. Данные и подписи обезличены.
 */

type Stage = {
  key: string;
  title: string;
  hint: string;
  /** Позиция подписи относительно узла. */
  side: "top" | "bottom" | "left" | "right";
};

const stages: Stage[] = [
  { key: "scenario", title: "Сценарий", hint: "расписание и сумма", side: "top" },
  {
    key: "consent",
    title: "Согласие в банке",
    hint: "клиент подтверждает регулярные списания",
    side: "right",
  },
  { key: "sbp", title: "СБП", hint: "платёжная инфраструктура", side: "right" },
  { key: "charge", title: "Регулярный платёж", hint: "списание по расписанию", side: "bottom" },
  { key: "status", title: "Статус", hint: "результат операции", side: "bottom" },
  { key: "payout", title: "Выплата T+3", hint: "напрямую от НКО", side: "left" },
  { key: "register", title: "Реестр", hint: "период и состояние операций", side: "left" },
];

const VB_W = 560;
const VB_H = 400;
const CX = 280;
const CY = 200;
const RX = 196;
const RY = 132;

/** Точки этапов по кольцу, старт сверху, по часовой стрелке. */
const points = stages.map((_, i) => {
  const a = -Math.PI / 2 + (i / stages.length) * Math.PI * 2;
  return { x: CX + Math.cos(a) * RX, y: CY + Math.sin(a) * RY };
});

export function ConnectedField({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [fine, setFine] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [offsets, setOffsets] = useState<{ dx: number; dy: number }[]>(() =>
    stages.map(() => ({ dx: 0, dy: 0 })),
  );

  const spring = { stiffness: 55, damping: 24, mass: 1.2 };
  const px = useSpring(0, spring);
  const py = useSpring(0, spring);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => setFine(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Очень слабый параллакс всей схемы
  useEffect(() => {
    if (reduced || !fine) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width || 1)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height || 1)));
      px.set(nx * 7);
      py.set(ny * 6);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, fine, px, py]);

  // Локальная магнитность узлов: слабое смещение к курсору с тяжёлым сглаживанием
  useEffect(() => {
    if (reduced || !fine) return;

    const target = stages.map(() => ({ dx: 0, dy: 0 }));
    const current = stages.map(() => ({ dx: 0, dy: 0 }));
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;

    const RADIUS = 150;
    const PULL = 0.07;
    const MAX = 5;
    const EASE = 0.045;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      pointer = {
        x: ((e.clientX - r.left) / r.width) * VB_W,
        y: ((e.clientY - r.top) / r.height) * VB_H,
      };
    };
    const onLeave = () => {
      pointer = null;
    };

    const tick = () => {
      for (let i = 0; i < points.length; i++) {
        const n = points[i]!;
        const t = target[i]!;
        if (!pointer) {
          t.dx = 0;
          t.dy = 0;
        } else {
          const vx = pointer.x - n.x;
          const vy = pointer.y - n.y;
          const d = Math.hypot(vx, vy);
          const falloff = d > RADIUS ? 0 : (1 - d / RADIUS) ** 2;
          const k = PULL * falloff;
          t.dx = Math.max(-MAX, Math.min(MAX, vx * k));
          t.dy = Math.max(-MAX, Math.min(MAX, vy * k));
        }
      }

      let moved = false;
      for (let i = 0; i < points.length; i++) {
        const c = current[i]!;
        const t = target[i]!;
        const ndx = c.dx + (t.dx - c.dx) * EASE;
        const ndy = c.dy + (t.dy - c.dy) * EASE;
        if (Math.abs(ndx - c.dx) > 0.002 || Math.abs(ndy - c.dy) > 0.002) moved = true;
        c.dx = ndx;
        c.dy = ndy;
      }

      if (moved) setOffsets(current.map((c) => ({ dx: c.dx, dy: c.dy })));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, fine]);

  const animated = !reduced;
  const pos = (i: number) => {
    const n = points[i]!;
    const o = offsets[i] ?? { dx: 0, dy: 0 };
    return { x: n.x + o.dx, y: n.y + o.dy };
  };

  const labelStyle = (i: number, side: Stage["side"]) => {
    const p = pos(i);
    const ox = side === "left" ? -16 : side === "right" ? 16 : 0;
    const oy = side === "top" ? -20 : side === "bottom" ? 20 : 0;
    return {
      left: `${((p.x + ox) / VB_W) * 100}%`,
      top: `${((p.y + oy) / VB_H) * 100}%`,
      transform:
        side === "left"
          ? "translate(-100%, -50%)"
          : side === "right"
            ? "translate(0, -50%)"
            : side === "top"
              ? "translate(-50%, -100%)"
              : "translate(-50%, 0)",
    } as const;
  };

  return (
    <figure className={cn("pointer-events-none relative m-0", className)}>
      <motion.div
        ref={ref}
        className="pointer-events-none absolute inset-0"
        style={reduced || !fine ? {} : { x: px, y: py }}
      >
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="pointer-events-none h-full w-full"
          role="presentation"
          aria-hidden
        >
          <defs>
            <radialGradient id="cf-hub" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          {/* Спицы к хабу Bill.su */}
          {points.map((_, i) => {
            const p = pos(i);
            return (
              <line
                key={`hub-${i}`}
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                stroke="var(--foreground)"
                strokeOpacity="0.1"
                strokeWidth="1"
                strokeDasharray="2 6"
              />
            );
          })}

          {/* Последовательный маршрут по этапам */}
          {points.map((_, i) => {
            const a = pos(i);
            const b = pos((i + 1) % points.length);
            const closing = i === points.length - 1;
            const len = Math.hypot(b.x - a.x, b.y - a.y);
            const on =
              activeKey === stages[i]!.key || activeKey === stages[(i + 1) % points.length]!.key;
            return (
              <g key={`route-${i}`}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={on ? "var(--accent)" : "var(--foreground)"}
                  strokeOpacity={on ? 0.5 : 0.28}
                  strokeWidth={on ? 1.6 : 1.2}
                  strokeDasharray={closing ? "3 7" : undefined}
                  style={{ transition: "stroke-opacity 400ms ease, stroke-width 400ms ease" }}
                />
                {animated && !closing && (
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="var(--accent)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeDasharray={`5 ${len}`}
                    style={{
                      animation: `bill-dash ${14 + (i % 3) * 2}s linear infinite`,
                      animationDelay: `${-i * 2}s`,
                      opacity: 0.7,
                    }}
                  />
                )}
              </g>
            );
          })}

          {/* Хаб */}
          <circle
            cx={CX}
            cy={CY}
            r="26"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.25"
            strokeWidth="1"
            className={animated ? "breathe" : undefined}
          />
          <circle cx={CX} cy={CY} r="8" fill="url(#cf-hub)" />

          {/* Узлы этапов */}
          {points.map((_, i) => {
            const p = pos(i);
            const on = activeKey === stages[i]!.key;
            return (
              <g key={stages[i]!.key}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="11"
                  fill="var(--foreground)"
                  fillOpacity={on ? 0.08 : 0.04}
                  style={{ transition: "fill-opacity 400ms ease" }}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="4.5"
                  fill={on ? "var(--accent)" : "var(--foreground)"}
                  fillOpacity={on ? 1 : 0.5}
                  style={{ transition: "fill-opacity 400ms ease" }}
                />
              </g>
            );
          })}
        </svg>

        {/* Подписи и подсказки */}
        <div className="pointer-events-auto absolute inset-0">
          <span
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/35 bg-background/80 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-accent uppercase"
            style={{ left: "50%", top: `${((CY + 44) / VB_H) * 100}%` }}
          >
            Bill.su
          </span>

          {stages.map((s, i) => {
            const on = activeKey === s.key;
            return (
              <span
                key={s.key}
                tabIndex={0}
                role="img"
                aria-label={`${s.title} — ${s.hint}`}
                onMouseEnter={() => setActiveKey(s.key)}
                onMouseLeave={() => setActiveKey((k) => (k === s.key ? null : k))}
                onFocus={() => setActiveKey(s.key)}
                onBlur={() => setActiveKey((k) => (k === s.key ? null : k))}
                className={cn(
                  "pointer-events-auto absolute flex max-w-[13ch] flex-col gap-1 rounded-lg px-1.5 py-1 text-[10.5px] leading-tight outline-none transition-[color,opacity] duration-500 focus-visible:ring-2 focus-visible:ring-accent/60",
                  on ? "text-foreground opacity-100" : "text-muted-foreground opacity-80",
                )}
                style={labelStyle(i, s.side)}
              >
                <span className="font-mono tracking-[0.06em] whitespace-nowrap">{s.title}</span>
                <span
                  aria-hidden
                  className={cn(
                    "text-[9.5px] leading-snug text-muted-foreground transition-opacity duration-500",
                    on ? "opacity-100" : "opacity-0",
                  )}
                >
                  {s.hint}
                </span>
              </span>
            );
          })}
        </div>
      </motion.div>

      <figcaption className="sr-only">
        Схема рекуррентного платежа: сценарий, согласие в банке, СБП, регулярный платёж, статус,
        выплата T+3, реестр. Bill.su связывает этапы. Данные обезличены.
      </figcaption>
    </figure>
  );
}
