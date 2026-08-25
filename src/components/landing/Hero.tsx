import { Magnetic, Reveal } from "@/components/motion/primitives";
import { ConnectedField } from "@/components/visual/ConnectedField";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-44">
      {/* Медленно дышащие фоновые слои — без glow и стекла */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="drift-slower breathe absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-surface" />
        <div className="drift-slow absolute -left-32 top-40 h-[360px] w-[360px] rounded-full bg-surface/70" />
        <div className="absolute inset-x-0 top-0 h-px bg-hairline" />
      </div>

      <ConnectedField className="absolute right-0 top-28 z-0 hidden h-[380px] w-[530px] lg:block xl:right-6" />

      <div className="pointer-events-none relative z-10 mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">СБП · рекуррентные платежи</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mt-6 max-w-[16ch] text-[2.55rem] lg:max-w-[12ch] leading-[0.98] sm:text-6xl lg:text-[5.4rem]">
            Регулярные платежи через{" "}
            <span className="relative whitespace-nowrap">
              СБП
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-accent sm:-bottom-2"
              />
            </span>{" "}
            для бизнеса
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal delay={0.12}>
            <p className="max-w-[46ch] text-lg text-muted-foreground sm:text-xl">
              Bill.su подключает бизнес к приёму повторяющихся оплат через Систему быстрых платежей:
              подписки, абонементы и регулярные счета — без ручного контроля каждой оплаты.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="pointer-events-auto flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#lead"
                  className="inline-flex min-h-13 items-center rounded-full bg-accent px-7 text-[15px] font-medium text-accent-foreground transition-[transform,filter] duration-300 hover:brightness-105 active:scale-[0.97]"
                >
                  Оставить заявку
                </a>
              </Magnetic>
              <Magnetic strength={0.16}>
                <a
                  href="#how"
                  className="inline-flex min-h-13 items-center rounded-full border border-hairline px-7 text-[15px] text-foreground transition-colors duration-300 hover:bg-surface active:scale-[0.97]"
                >
                  Как это работает
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.24}>
          <dl className="mt-16 grid gap-px overflow-hidden border-y border-hairline sm:mt-24 sm:grid-cols-3">
            {[
              ["Техническое подключение", "до недели"],
              ["Выплаты", "T+3 напрямую от НКО"],
              ["Сценарии", "подписки, абонементы, счета"],
            ].map(([label, value]) => (
              <div key={label} className="py-6 sm:py-8">
                <dt className="eyebrow">{label}</dt>
                <dd className="tnum mt-3 font-display text-xl tracking-[-0.03em] text-foreground sm:text-2xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
