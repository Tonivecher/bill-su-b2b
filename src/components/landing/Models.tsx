import { Breathe, Reveal, TiltCard } from "@/components/motion/primitives";
import { IconSubscription, IconPass, IconInvoice, IconMembers } from "@/components/icons/BillIcons";

const models = [
  {
    Icon: IconSubscription,
    title: "Подписки",
    text: "Сервисы и продукты с ежемесячной или еженедельной оплатой доступа.",
    span: "lg:col-span-3",
  },
  {
    Icon: IconPass,
    title: "Абонементы",
    text: "Студии, клубы, школы и секции: продление доступа без похода в кассу.",
    span: "lg:col-span-3",
  },
  {
    Icon: IconInvoice,
    title: "Регулярные счета",
    text: "Обслуживание, аренда, сопровождение — оплата с фиксированной периодичностью.",
    span: "lg:col-span-2",
  },
  {
    Icon: IconMembers,
    title: "Членские взносы",
    text: "Сообщества и объединения с регулярными взносами участников.",
    span: "lg:col-span-4",
  },
];

export function Models() {
  return (
    <section id="models" className="relative border-y border-hairline bg-surface/40">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="eyebrow">Для каких моделей подходит</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 max-w-[20ch] text-[2rem] leading-[1.05] sm:text-[2.75rem]">
            Везде, где оплата повторяется
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {models.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.06} className={m.span}>
              <TiltCard index={i} max={2.5}>
                <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-background p-7 transition-[border-color,background-color,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent/40 hover:bg-surface/40 sm:p-8">
                  <Breathe index={i + 2}>
                    <m.Icon size={52} />
                  </Breathe>
                  <div className="mt-10">
                    <h3 className="font-display text-lg tracking-[-0.03em] sm:text-xl">
                      {m.title}
                    </h3>
                    <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground">
                      {m.text}
                    </p>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
