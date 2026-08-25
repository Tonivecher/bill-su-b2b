import { Breathe, Reveal, Tilt } from "@/components/motion/primitives";
import { IconConsent, IconSubscription, IconPayout, IconPlug } from "@/components/icons/BillIcons";

const blocks = [
  {
    Icon: IconConsent,
    title: "Согласие на автоплатёж",
    text: "Клиент один раз подтверждает регулярные списания в своём банке через СБП. Дальше оплата проходит без повторного ввода данных.",
  },
  {
    Icon: IconSubscription,
    title: "Регулярные списания",
    text: "Bill.su ведёт расписание платежей: периодичность, попытки, статусы. Вы видите, что оплачено, а что требует внимания.",
  },
  {
    Icon: IconPayout,
    title: "Выплаты T+3",
    text: "Деньги приходят на счёт бизнеса напрямую от НКО по схеме T+3, без промежуточных посредников.",
  },
  {
    Icon: IconPlug,
    title: "Техническое подключение",
    text: "Интеграция занимает до недели: подключаем на стороне сервиса и передаём всё необходимое вашей команде.",
  },
];

export function Product() {
  return (
    <section id="product" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">Что делает Bill.su</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-[2rem] leading-[1.05] sm:text-[2.75rem]">
              Повторяющиеся оплаты перестают быть ручной работой
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[40ch] text-muted-foreground">
              Вместо напоминаний, сверок и повторных счетов — один согласованный сценарий списаний и
              понятная картина платежей.
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-px">
          {blocks.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 0.05}>
              <Tilt
                max={4}
                className="group flex gap-5 border-t border-hairline py-8 transition-colors duration-500 hover:bg-surface/50 sm:gap-7 sm:py-10"
              >
                <Breathe index={i} className="shrink-0">
                  <b.Icon size={56} />
                </Breathe>
                <div className="pt-1">
                  <h3 className="font-display text-lg tracking-[-0.03em] sm:text-xl">{b.title}</h3>
                  <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
                    {b.text}
                  </p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
