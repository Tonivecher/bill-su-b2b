import { useState } from "react";
import { Breathe, Reveal } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

export const faqItems = [
  {
    q: "Что именно делает Bill.su?",
    a: "Мы подключаем бизнес к приёму регулярных платежей через СБП и ведём расписание списаний: подписки, абонементы, регулярные счета и взносы.",
  },
  {
    q: "Сколько занимает подключение?",
    a: "Техническое подключение занимает до недели. Общий срок зависит ещё от сбора документов и прохождения комплаенса банка-партнёра.",
  },
  {
    q: "Когда бизнес получает деньги?",
    a: "Выплаты идут по схеме T+3 напрямую от НКО на счёт компании.",
  },
  {
    q: "Как клиент соглашается на регулярные списания?",
    a: "Клиент один раз подтверждает согласие на автоплатёж в своём банке через СБП. Отменить согласие он также может в своём банке в любой момент.",
  },
  {
    q: "Какие документы понадобятся?",
    a: "Комплект зависит от вида деятельности и требований банка. После заявки мы присылаем точный список под ваш случай.",
  },
  {
    q: "Подходит ли сервис для нашей модели оплат?",
    a: "Если оплата повторяется с какой-либо периодичностью — скорее всего да. Опишите сценарий в заявке, и мы ответим предметно.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-hairline">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow">Вопросы</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[2rem] leading-[1.05] sm:text-[2.75rem]">
                Коротко о главном
              </h2>
            </Reveal>
          </div>

          <ul>
            {faqItems.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal as="li" key={item.q} delay={i * 0.04}>
                  <Breathe
                    index={i}
                    duration={18}
                    className="border-t border-hairline last:border-b"
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full min-h-16 items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-display text-[17px] tracking-[-0.03em] sm:text-xl">
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[transform,border-color,background-color] duration-400",
                          isOpen
                            ? "rotate-45 border-accent/50 bg-accent/10"
                            : "border-hairline bg-transparent",
                        )}
                      >
                        <span className="absolute h-px w-3.5 bg-foreground" />
                        <span className="absolute h-3.5 w-px bg-foreground" />
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0 duration-300",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[62ch] pb-7 pr-10 text-[15px] leading-relaxed text-muted-foreground">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </Breathe>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
