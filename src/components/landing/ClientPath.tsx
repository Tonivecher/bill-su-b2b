import { Reveal } from "@/components/motion/primitives";
import { MobileFlow } from "@/components/visual/MobileFlow";

export function ClientPath() {
  return (
    <section id="client" className="border-t border-hairline bg-surface/40">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="max-w-[52ch]">
          <Reveal>
            <p className="eyebrow">Путь клиента</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-[2rem] leading-[1.05] sm:text-[2.75rem]">
              Согласие один раз — дальше только уведомление об оплате
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-muted-foreground">
              Клиент подтверждает регулярные списания в своём банке через СБП. Карточные данные не
              вводятся ни на первом платеже, ни на последующих.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <MobileFlow className="mt-16 sm:mt-20" />
        </Reveal>
      </div>
    </section>
  );
}
