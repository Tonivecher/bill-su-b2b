import { Reveal } from "@/components/motion/primitives";
import {
  IconRequest,
  IconDocs,
  IconShield,
  IconConsent,
  IconPlug,
  IconLaunch,
} from "@/components/icons/BillIcons";

const stages = [
  {
    Icon: IconRequest,
    title: "Заявка",
    text: "Вы оставляете контакты и коротко описываете сценарий оплат.",
  },
  {
    Icon: IconDocs,
    title: "Документы",
    text: "Собираем комплект документов по компании и деятельности.",
  },
  {
    Icon: IconShield,
    title: "Комплаенс банка",
    text: "Банк-партнёр проводит проверку на своей стороне.",
  },
  {
    Icon: IconConsent,
    title: "Одобрение",
    text: "После проверки подтверждается возможность подключения.",
  },
  {
    Icon: IconPlug,
    title: "Техническое подключение",
    text: "Настройка и интеграция — до недели.",
    accent: true,
  },
  { Icon: IconLaunch, title: "Запуск", text: "Первые регулярные списания идут в боевом режиме." },
];

export function Connect() {
  return (
    <section id="connect" className="border-y border-hairline bg-surface/40">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[46ch]">
            <Reveal>
              <p className="eyebrow">Подключение</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[2rem] leading-[1.05] sm:text-[2.75rem]">
                Путь от заявки до первого списания
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-[34ch] text-sm text-muted-foreground">
              Сроки прохождения комплаенса зависят от банка. Техническая часть на нашей стороне
              занимает до недели.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.05}>
              <div
                className={
                  "group relative flex h-full flex-col rounded-2xl border bg-background p-7 transition-[border-color,background-color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] " +
                  (s.accent
                    ? "border-accent/40"
                    : "border-hairline hover:border-accent/30 hover:bg-surface/40")
                }
              >
                <div className="flex items-start justify-between">
                  <s.Icon size={52} />
                  <span className="tnum font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-lg tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
                {s.accent && (
                  <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-accent/35 px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-accent uppercase">
                    до недели
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
