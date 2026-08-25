"use client";

import { Breathe, Tilt } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

function Phone({
  step,
  caption,
  children,
  index,
}: {
  step: string;
  caption: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <li className="flex flex-col items-center">
      <p className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        <span className="tnum text-accent">{step}</span>
        {caption}
      </p>
      <Breathe index={index} duration={24}>
        <Tilt max={5}>
          <div className="w-[13.5rem] rounded-[1.9rem] border border-hairline bg-surface-2 p-1.5 shadow-lift">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-hairline bg-background">
              {/* Динамический островок */}
              <span
                aria-hidden
                className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-surface-2"
              />
              <div className="px-3.5 pb-5 pt-7">{children}</div>
            </div>
          </div>
        </Tilt>
      </Breathe>
    </li>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-hairline py-2 last:border-b-0">
      <span className="text-[10px] text-muted-foreground">{label}</span>
      <span className="tnum text-right text-[10.5px] text-foreground">{value}</span>
    </div>
  );
}

function Pill({ text, tone = "accent" }: { text: string; tone?: "accent" | "muted" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9.5px] uppercase tracking-[0.1em]",
        tone === "accent"
          ? "border-accent/40 text-accent"
          : "border-hairline text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "accent" ? "bg-accent" : "bg-muted-foreground/60",
        )}
      />
      {text}
    </span>
  );
}

/**
 * Обезличенный клиентский путь в смартфоне: согласие → очередной платёж →
 * статус → подтверждение. Без ввода карточных данных — оплата идёт через СБП.
 */
export function MobileFlow({ className }: { className?: string }) {
  return (
    <figure className={cn("m-0", className)}>
      <ul className="grid grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <Phone index={0} step="01" caption="Согласие в банке">
          <p className="font-display text-[12.5px] leading-snug tracking-[-0.02em]">
            Регулярные платежи через СБП
          </p>
          <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
            Разрешить списания по расписанию в пользу получателя платежа.
          </p>
          <div className="mt-3 rounded-lg border border-hairline bg-surface/45 px-2.5 py-2">
            <Row label="Периодичность" value="1 раз в месяц" />
            <Row label="Лимит списания" value="до 3 000 ₽" />
            <Row label="Отмена" value="в любой момент" />
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            <span className="rounded-full bg-accent py-2 text-center text-[10.5px] font-medium text-accent-foreground">
              Разрешить
            </span>
            <span className="rounded-full border border-hairline py-2 text-center text-[10.5px] text-muted-foreground">
              Отклонить
            </span>
          </div>
        </Phone>

        <Phone index={1} step="02" caption="Очередной платёж">
          <Pill text="СБП" />
          <p className="tnum mt-3 font-display text-[19px] tracking-[-0.03em]">1 200 ₽</p>
          <p className="mt-1 text-[10px] text-muted-foreground">Списание по расписанию</p>
          <div className="mt-3 rounded-lg border border-hairline bg-surface/45 px-2.5 py-2">
            <Row label="Сценарий" value="Подписка" />
            <Row label="Период" value="1 мес" />
            <Row label="Согласие" value="активно" />
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-hairline px-2.5 py-2">
            <span className="h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-accent/25 border-t-accent" />
            <span className="text-[10px] text-muted-foreground">Обработка в СБП</span>
          </div>
        </Phone>

        <Phone index={2} step="03" caption="Статус">
          <Pill text="Оплачено" />
          <p className="mt-3 font-display text-[12.5px] leading-snug tracking-[-0.02em]">
            Платёж прошёл
          </p>
          <div className="mt-3 flex flex-col gap-2.5">
            {["Согласие проверено", "Списание выполнено", "Статус зафиксирован"].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-accent/45">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                </span>
                <span className="text-[10px] text-muted-foreground">{s}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-hairline bg-surface/45 px-2.5 py-2">
            <Row label="Следующее списание" value="через 1 мес" />
          </div>
        </Phone>

        <Phone index={3} step="04" caption="Подтверждение">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
            Квитанция
          </p>
          <div className="mt-2.5 rounded-lg border border-hairline px-2.5 py-2">
            <Row label="Операция" value="№ 000000" />
            <Row label="Сумма" value="1 200 ₽" />
            <Row label="Способ" value="СБП" />
            <Row label="Назначение" value="Подписка" />
          </div>
          <div className="mt-3 rounded-lg border border-accent/40 px-2.5 py-2.5 text-center">
            <p className="font-display text-[11px] uppercase tracking-[0.1em] text-accent">
              Оплачено
            </p>
            <p className="tnum mt-1 text-[9.5px] text-muted-foreground">дата и время операции</p>
          </div>
          <p className="mt-3 text-[9.5px] leading-relaxed text-muted-foreground">
            Данные карты не вводятся: платёж идёт через Систему быстрых платежей.
          </p>
        </Phone>
      </ul>
      <figcaption className="mt-10 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
        Иллюстрация интерфейса · данные синтетические
      </figcaption>
    </figure>
  );
}
