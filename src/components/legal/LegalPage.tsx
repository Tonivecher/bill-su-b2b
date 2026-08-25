import { Link } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Reveal } from "@/components/motion/primitives";

export type LegalSection = { title: string; body: string[] };

export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
  updated,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
  updated: string;
}) {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-[860px] px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-44">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-5 text-[2.1rem] leading-[1.05] sm:text-5xl">{title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-muted-foreground">{intro}</p>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-8 rounded-2xl border border-hairline bg-surface/50 p-5 text-sm leading-relaxed text-muted-foreground">
            Реквизиты юридического лица (наименование, ИНН/ОГРН, юридический адрес) будут указаны в
            этом документе после завершения регистрации. До этого момента документ публикуется в
            предварительной редакции.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-10">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={0.04 * i}>
              <section className="border-t border-hairline pt-8">
                <h2 className="font-display text-xl tracking-[-0.03em] sm:text-2xl">{s.title}</h2>
                <div className="mt-4 flex flex-col gap-4">
                  {s.body.map((p, j) => (
                    <p key={j} className="text-[15px] leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <div className="tnum mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-8 text-xs text-muted-foreground">
          <span>Редакция: {updated}</span>
          <Link to="/" className="text-foreground underline underline-offset-4">
            На главную
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
