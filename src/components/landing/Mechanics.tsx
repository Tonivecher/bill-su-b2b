"use client";

import { Breathe, Reveal, Tilt } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";

const steps = [
  {
    n: "01",
    title: "Клиент подтверждает",
    text: "Разовое согласие на регулярные списания через СБП в своём банке.",
  },
  {
    n: "02",
    title: "Bill.su инициирует",
    text: "По расписанию отправляется запрос на очередное списание.",
  },
  {
    n: "03",
    title: "Списание проходит",
    text: "Оплата подтверждается в СБП, статус фиксируется в сервисе.",
  },
  {
    n: "04",
    title: "Выплата бизнесу",
    text: "Средства зачисляются на счёт компании по схеме T+3 напрямую от НКО.",
  },
];

function FlowLine() {
  const reduced = useReducedMotion();

  return (
    <svg
      aria-hidden
      viewBox="0 0 400 8"
      preserveAspectRatio="none"
      className="h-2 w-full"
      role="presentation"
    >
      <line x1="0" y1="4" x2="400" y2="4" stroke="var(--hairline)" strokeWidth="1" />
      {reduced ? (
        <line
          x1="0"
          y1="4"
          x2="400"
          y2="4"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ) : (
        <line
          x1="0"
          y1="4"
          x2="400"
          y2="4"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="26 254"
          style={{ animation: "bill-dash 9s linear infinite" }}
        />
      )}
    </svg>
  );
}

export function Mechanics() {
  const reduced = useReducedMotion();

  return (
    <section id="how" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="max-w-[52ch]">
        <Reveal>
          <p className="eyebrow">Механика платежа</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 text-[2rem] leading-[1.05] sm:text-[2.75rem]">
            Один раз согласовали — дальше платежи идут сами
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <Tilt max={3}>
          <div className="mt-16 rounded-3xl border border-hairline bg-surface/40 p-6 sm:p-10 lg:p-14">
            <ol className="grid gap-0 md:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.n} className="relative flex flex-col">
                  <Breathe index={i} duration={20} className="flex h-full flex-col">
                    <div className="flex items-center gap-3 md:block">
                      <span className="tnum font-mono text-xs text-accent">{s.n}</span>
                      <div className="mt-0 flex-1 md:mt-4">
                        <div className="hidden md:block">
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
                              <span
                                className={cn(
                                  "absolute inset-0 rounded-full bg-accent/25",
                                  !reduced && "breathe",
                                )}
                              />
                              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            </span>
                            <div className="flex-1 pr-3">
                              {i < steps.length - 1 && <FlowLine />}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-l border-hairline pb-8 pl-5 pt-2 md:border-l-0 md:pb-0 md:pl-0 md:pr-8 md:pt-6">
                      <h3 className="font-display text-base tracking-[-0.03em] sm:text-lg">
                        {s.title}
                      </h3>
                      <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                        {s.text}
                      </p>
                    </div>
                  </Breathe>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-col gap-3 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[54ch] text-sm text-muted-foreground">
                Клиент может отменить согласие на регулярные списания в своём банке в любой момент —
                статус сразу отражается в сервисе.
              </p>
              <span className="tnum inline-flex w-fit items-center gap-2 rounded-full border border-accent/35 px-4 py-2 font-mono text-xs text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Выплаты T+3 от НКО
              </span>
            </div>
          </div>
        </Tilt>
      </Reveal>
    </section>
  );
}
