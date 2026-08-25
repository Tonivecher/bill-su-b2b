import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Magnetic, Reveal, Tilt } from "@/components/motion/primitives";
import { submitLead } from "@/lib/leads.functions";
import { leadSchema, type UtmData } from "@/lib/lead-schema";
import { captureUtm } from "@/lib/utm";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "received" | "pending-channel" | "error";
type Fields = { name: string; company: string; contact: string };

const fields: { key: keyof Fields; label: string; placeholder: string; autoComplete: string }[] = [
  { key: "name", label: "Имя", placeholder: "Как к вам обращаться", autoComplete: "name" },
  {
    key: "company",
    label: "Компания",
    placeholder: "Название бизнеса",
    autoComplete: "organization",
  },
  {
    key: "contact",
    label: "Контакт",
    placeholder: "Телефон, почта или telegram",
    autoComplete: "email",
  },
];

export function LeadForm() {
  const send = useServerFn(submitLead);
  const [values, setValues] = useState<Fields>({ name: "", company: "", contact: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const utm = useRef<UtmData>({});

  useEffect(() => {
    utm.current = captureUtm();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const parsed = leadSchema.safeParse({ ...values, consent, utm: utm.current });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("loading");
    try {
      const res = await send({ data: parsed.data });
      setStatus(res.delivered ? "received" : "pending-channel");
    } catch {
      setStatus("error");
      setServerError(
        "Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз. Введённые данные остались в форме.",
      );
    }
  }

  return (
    <section id="lead" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow">Заявка на подключение</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 max-w-[16ch] text-[2rem] leading-[1.05] sm:text-[3rem]">
              Расскажите о своём сценарии оплат
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[42ch] text-muted-foreground">
              Свяжемся, уточним детали и подскажем, какие документы понадобятся для прохождения
              комплаенса банка.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <Tilt max={3}>
            <div className="relative rounded-3xl border border-hairline bg-surface/50 p-6 sm:p-9">
              {status === "received" || status === "pending-channel" ? (
                <div className="flex min-h-[22rem] flex-col items-start justify-center">
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border",
                      status === "received"
                        ? "border-accent/40 text-accent"
                        : "border-hairline text-muted-foreground",
                    )}
                  >
                    {status === "received" ? (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                        <path
                          d="M5 12.5l4.2 4.2L19 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                        <rect x="8" y="7" width="3" height="10" rx="1" fill="currentColor" />
                        <rect x="13" y="7" width="3" height="10" rx="1" fill="currentColor" />
                      </svg>
                    )}
                  </span>
                  <h3 className="mt-6 font-display text-2xl tracking-[-0.03em]">
                    {status === "received" ? "Заявка отправлена" : "Заявка не отправлена"}
                  </h3>
                  {status === "received" ? (
                    <p className="mt-3 max-w-[38ch] text-[15px] text-muted-foreground">
                      Мы получили обращение и свяжемся с вами по указанному контакту.
                    </p>
                  ) : (
                    <div className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-muted-foreground">
                      <p>
                        Канал доставки заявок настраивается. Заявка не отправлена, а введённые
                        данные остаются только в этом окне.
                      </p>
                      <p className="mt-3">
                        Данные никуда не передавались и не сохранялись — они пропадут при закрытии
                        или перезагрузке страницы.
                      </p>
                    </div>
                  )}
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="min-h-11 rounded-full border border-hairline px-5 text-sm transition-colors duration-300 hover:bg-surface-2"
                    >
                      Вернуться к форме
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setValues({ name: "", company: "", contact: "" });
                        setConsent(false);
                        setErrors({});
                        setStatus("idle");
                      }}
                      className="min-h-11 rounded-full px-4 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                    >
                      Очистить форму
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
                  {fields.map((f) => (
                    <div key={f.key}>
                      <label
                        htmlFor={`lead-${f.key}`}
                        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
                      >
                        {f.label}
                      </label>
                      <input
                        id={`lead-${f.key}`}
                        name={f.key}
                        autoComplete={f.autoComplete}
                        value={values[f.key]}
                        placeholder={f.placeholder}
                        onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                        onBlur={() => setErrors((prev) => ({ ...prev, [f.key]: "" }))}
                        aria-invalid={Boolean(errors[f.key])}
                        aria-describedby={errors[f.key] ? `err-${f.key}` : undefined}
                        className={cn(
                          "h-13 w-full rounded-xl border bg-background px-4 text-[15px] text-foreground outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-muted-foreground/60 focus:border-accent/60 focus:ring-2 focus:ring-ring/40",
                          errors[f.key] ? "border-destructive/70" : "border-input",
                        )}
                      />
                      {errors[f.key] && (
                        <p
                          id={`err-${f.key}`}
                          role="alert"
                          className="mt-2 text-xs text-destructive"
                        >
                          {errors[f.key]}
                        </p>
                      )}
                    </div>
                  ))}

                  <label className="mt-1 flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        setErrors((prev) => ({ ...prev, consent: "" }));
                      }}
                      className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--accent)]"
                      aria-describedby={errors["consent"] ? "err-consent" : undefined}
                    />
                    <span>
                      Согласен с{" "}
                      <Link to="/consent" className="text-foreground underline underline-offset-4">
                        обработкой персональных данных
                      </Link>
                      ,{" "}
                      <Link to="/privacy" className="text-foreground underline underline-offset-4">
                        политикой конфиденциальности
                      </Link>{" "}
                      и{" "}
                      <Link to="/offer" className="text-foreground underline underline-offset-4">
                        условиями оферты
                      </Link>
                      .
                    </span>
                  </label>
                  {errors["consent"] && (
                    <p id="err-consent" role="alert" className="-mt-2 text-xs text-destructive">
                      {errors["consent"]}
                    </p>
                  )}

                  {status === "error" && serverError && (
                    <p
                      role="alert"
                      className="rounded-xl border border-destructive/40 px-4 py-3 text-[13px] text-destructive"
                    >
                      {serverError}
                    </p>
                  )}

                  <Magnetic className="mt-2 self-start" max={6}>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex min-h-13 items-center gap-3 rounded-full bg-accent px-7 text-[15px] font-medium text-accent-foreground transition-[transform,filter,opacity] duration-300 hover:brightness-105 active:scale-[0.97] disabled:opacity-60"
                    >
                      {status === "loading" && (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" />
                      )}
                      {status === "loading" ? "Отправляем" : "Отправить заявку"}
                    </button>
                  </Magnetic>
                </form>
              )}
            </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}
