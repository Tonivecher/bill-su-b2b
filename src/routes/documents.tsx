import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Reveal } from "@/components/motion/primitives";

const title = "Документы — Bill.su";
const description =
  "Актуальные документы сервиса Bill.su в предварительной редакции и архивные материалы прежнего продукта.";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DocumentsPage,
});

const current = [
  {
    to: "/offer" as const,
    name: "Публичная оферта",
    note: "Условия оказания услуг по приёму регулярных платежей через СБП. Предварительная редакция.",
  },
  {
    to: "/privacy" as const,
    name: "Политика конфиденциальности",
    note: "Как сервис обрабатывает данные посетителей сайта и заявителей. Предварительная редакция.",
  },
  {
    to: "/consent" as const,
    name: "Согласие на обработку персональных данных",
    note: "Текст согласия, которое даётся при отправке заявки. Предварительная редакция.",
  },
];

const archive = [
  {
    href: "/documents/bill-old-contract-offer-2019.pdf",
    name: "Договор-оферта Bill.su, 2019",
    note: "Пакет условий прежнего продукта с приложениями. Не является действующими условиями нового сервиса.",
    pages: "30 страниц",
  },
  {
    href: "/documents/bill-old-personal-data-consent.pdf",
    name: "Согласие на обработку персональных данных (архив)",
    note: "Прежняя редакция согласия. Заменена актуальным документом на этом сайте.",
    pages: "2 страницы",
  },
  {
    href: "/documents/bill-old-gkh-product-presentation.pdf",
    name: "Продуктовая презентация прежнего направления",
    note: "Историческая презентация прежнего позиционирования. Не описывает текущий продукт.",
    pages: "13 страниц",
  },
  {
    href: "/documents/bill-old-recurring-commercial-proposal.pdf",
    name: "Коммерческое предложение по рекуррентным платежам (архив)",
    note: "Материал по прежней карточной механике списаний. Не является описанием механики СБП.",
    pages: "9 страниц",
  },
];

function DocumentsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main
        id="main-content"
        className="mx-auto max-w-[960px] px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-44"
      >
        <Reveal>
          <p className="eyebrow">Раздел</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-5 text-[2.1rem] leading-[1.05] sm:text-5xl">Документы</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[62ch] text-muted-foreground">
            Здесь собраны действующие документы сервиса и отдельно — архивные материалы прежнего
            продукта Bill.su, сохранённые как исторический источник.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-8 rounded-2xl border border-hairline bg-surface/50 p-5 text-sm leading-relaxed text-muted-foreground">
            Реквизиты юридического лица (наименование, ИНН/ОГРН, адрес) будут опубликованы после
            завершения регистрации. До этого момента действующие документы публикуются в
            предварительной редакции.
          </p>
        </Reveal>

        <section className="mt-16">
          <Reveal>
            <h2 className="font-display text-xl tracking-[-0.03em] sm:text-2xl">
              Действующие документы
            </h2>
          </Reveal>
          <ul className="mt-6 grid gap-3">
            {current.map((d, i) => (
              <Reveal as="li" key={d.to} delay={0.04 * i}>
                <Link
                  to={d.to}
                  className="flex min-h-16 flex-col gap-1.5 rounded-2xl border border-hairline bg-background p-5 transition-colors duration-500 hover:border-accent/40 hover:bg-surface/50 sm:p-6"
                >
                  <span className="flex items-center gap-2 font-display text-[16px] tracking-[-0.02em]">
                    {d.name}
                    <span aria-hidden className="text-accent">
                      →
                    </span>
                  </span>
                  <span className="text-[14px] leading-relaxed text-muted-foreground">
                    {d.note}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <Reveal>
            <h2 className="font-display text-xl tracking-[-0.03em] sm:text-2xl">
              Архивные материалы Bill.su
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 rounded-2xl border border-destructive/35 p-5 text-sm leading-relaxed text-muted-foreground">
              Важно: документы ниже относятся к прежнему продукту Bill.su и публикуются
              исключительно как архив. Указанные в них тарифы, комиссии, реквизиты, юридическое лицо
              и техническая документация <strong className="text-foreground">не являются</strong>{" "}
              действующими условиями нового сервиса регулярных платежей через СБП.
            </p>
          </Reveal>
          <ul className="mt-6 grid gap-3">
            {archive.map((d, i) => (
              <Reveal as="li" key={d.href} delay={0.04 * i}>
                <a
                  href={d.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-16 flex-col gap-1.5 rounded-2xl border border-hairline bg-surface/30 p-5 transition-colors duration-500 hover:bg-surface/60 sm:p-6"
                >
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="font-display text-[16px] tracking-[-0.02em]">{d.name}</span>
                    <span className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      PDF · {d.pages}
                    </span>
                    <span className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      архив
                    </span>
                  </span>
                  <span className="text-[14px] leading-relaxed text-muted-foreground">
                    {d.note}
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </section>

        <div className="mt-16 border-t border-hairline pt-8 text-xs text-muted-foreground">
          <Link to="/" className="text-foreground underline underline-offset-4">
            На главную
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
