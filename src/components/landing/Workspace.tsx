import { Reveal } from "@/components/motion/primitives";
import { DesktopMock } from "@/components/visual/DesktopMock";

export function Workspace() {
  return (
    <section id="workspace" className="relative overflow-hidden border-t border-hairline">
      <div className="relative z-10 mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-6 md:grid-cols-[minmax(0,34rem)_1fr] md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">Рабочее пространство</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[2rem] leading-[1.05] sm:text-[2.75rem]">
                Все повторяющиеся платежи в одном спокойном экране
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-[38ch] text-sm leading-relaxed text-muted-foreground md:justify-self-end">
              Сценарии списаний, их статусы и история прохождения платежа — от согласия клиента до
              выплаты. Ниже — обезличенная иллюстрация с синтетическими данными.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <DesktopMock className="mt-14 sm:mt-20" />
        </Reveal>
      </div>
    </section>
  );
}
