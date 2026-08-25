"use client";

import { useReducedMotion } from "motion/react";
import { Breathe, Reveal, Tilt } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

const lanes = [
  {
    title: "Выдача согласия",
    steps: [
      "Клиент открывает запрос на регулярные платежи в своём банке",
      "Подтверждает периодичность и лимит списания",
      "Согласие фиксируется в СБП, сценарий становится активным",
    ],
    tone: "accent" as const,
  },
  {
    title: "Отмена согласия",
    steps: [
      "Клиент отзывает согласие в приложении своего банка",
      "СБП перестаёт пропускать списания по этому сценарию",
      "Статус в сервисе меняется на «согласие отозвано»",
    ],
    tone: "muted" as const,
  },
];

export function ConsentControl() {
  const reduced = useReducedMotion();

  return (
    <section id="consent-flow" className="border-t border-hairline">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="max-w-[52ch]">
          <Reveal>
            <p className="eyebrow">Управление согласием</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-[2rem] leading-[1.05] sm:text-[2.75rem]">
              Согласием управляет клиент — в своём банке
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-muted-foreground">
              Ни выдача, ни отмена согласия не требуют участия бизнеса. Сервис лишь отражает
              актуальный статус, чтобы вы видели реальную картину подписок.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {lanes.map((lane, li) => (
            <Reveal key={lane.title} delay={0.06 * li}>
              <Breathe index={li} duration={22}>
                <Tilt max={4}>
                  <div
                    className={cn(
                      "flex h-full flex-col rounded-2xl border bg-background p-6 sm:p-8",
                      lane.tone === "accent" ? "border-accent/35" : "border-hairline",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-3 w-3 items-center justify-center">
                        <span
                          className={cn(
                            "absolute inset-0 rounded-full",
                            lane.tone === "accent" ? "bg-accent/25" : "bg-muted-foreground/20",
                            !reduced && "breathe",
                          )}
                        />
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            lane.tone === "accent" ? "bg-accent" : "bg-muted-foreground",
                          )}
                        />
                      </span>
                      <h3 className="font-display text-lg tracking-[-0.03em] sm:text-xl">
                        {lane.title}
                      </h3>
                    </div>

                    <ol className="mt-7 flex flex-col">
                      {lane.steps.map((s, i) => (
                        <li key={s} className="flex gap-4 pb-6 last:pb-0">
                          <span className="relative flex w-6 shrink-0 justify-center">
                            <span
                              className={cn(
                                "z-10 mt-1 h-2 w-2 rounded-full",
                                lane.tone === "accent" ? "bg-accent" : "bg-muted-foreground/70",
                              )}
                            />
                            {i < lane.steps.length - 1 && (
                              <span className="absolute left-1/2 top-1 h-full w-px -translate-x-1/2 bg-hairline" />
                            )}
                          </span>
                          <p className="pt-0 text-[14.5px] leading-relaxed text-muted-foreground">
                            {s}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Tilt>
              </Breathe>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
