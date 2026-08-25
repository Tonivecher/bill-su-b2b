import { useId } from "react";

type IconProps = { className?: string; size?: number };

/**
 * Собственный набор слегка объёмных «пухлых» иконок.
 * Общая логика: мягкая подложка с внутренним градиентом, тонкий верхний блик,
 * аккуратная внутренняя деталировка. Без emoji и стоковых line-иконок.
 */
function Shell({
  id,
  children,
  className,
  size = 56,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="10" y1="6" x2="40" y2="44">
          <stop offset="0" stopColor="oklch(0.36 0.01 255)" />
          <stop offset="0.55" stopColor="oklch(0.28 0.009 255)" />
          <stop offset="1" stopColor="oklch(0.215 0.008 255)" />
        </linearGradient>
        <linearGradient id={`${id}-face`} x1="14" y1="10" x2="34" y2="40">
          <stop offset="0" stopColor="oklch(0.5 0.012 255)" />
          <stop offset="1" stopColor="oklch(0.33 0.01 255)" />
        </linearGradient>
        <linearGradient id={`${id}-accent`} x1="16" y1="14" x2="34" y2="36">
          <stop offset="0" stopColor="oklch(0.86 0.13 158)" />
          <stop offset="1" stopColor="oklch(0.7 0.15 160)" />
        </linearGradient>
        <radialGradient id={`${id}-gloss`} cx="0.35" cy="0.18" r="0.7">
          <stop offset="0" stopColor="oklch(1 0 0 / 0.22)" />
          <stop offset="1" stopColor="oklch(1 0 0 / 0)" />
        </radialGradient>
      </defs>
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="14"
        fill={`url(#${id}-body)`}
        stroke="oklch(1 0 0 / 0.13)"
      />
      <rect x="4" y="4" width="40" height="26" rx="13" fill={`url(#${id}-gloss)`} />
      {children}
    </svg>
  );
}

/** Подписка — повторяющийся цикл вокруг платёжного ядра */
export function IconSubscription(p: IconProps) {
  const id = useId();
  return (
    <Shell id={id} {...p}>
      <circle cx="24" cy="24" r="11.5" stroke="oklch(1 0 0 / 0.22)" strokeWidth="1.2" />
      <path
        d="M13.5 21.5A11 11 0 0 1 33 18.5"
        stroke={`url(#${id}-accent)`}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M34.5 26.5A11 11 0 0 1 15 29.5"
        stroke="oklch(1 0 0 / 0.4)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d="M32.2 14.2l1.6 4.9-5.1-.6z" fill={`url(#${id}-accent)`} />
      <circle cx="24" cy="24" r="5" fill={`url(#${id}-face)`} stroke="oklch(1 0 0 / 0.18)" />
      <circle cx="24" cy="24" r="1.8" fill="oklch(0.86 0.13 158)" />
    </Shell>
  );
}

/** Абонемент — карта с полосой и отметками посещений */
export function IconPass(p: IconProps) {
  const id = useId();
  return (
    <Shell id={id} {...p}>
      <rect
        x="10"
        y="14"
        width="28"
        height="20"
        rx="5"
        fill={`url(#${id}-face)`}
        stroke="oklch(1 0 0 / 0.18)"
      />
      <rect x="10" y="19" width="28" height="3.4" fill="oklch(0 0 0 / 0.35)" />
      <rect x="14" y="26" width="9" height="2.6" rx="1.3" fill="oklch(1 0 0 / 0.35)" />
      <circle cx="30.5" cy="27.5" r="3.2" fill={`url(#${id}-accent)`} />
      <path
        d="M29 27.5l1.2 1.3 2.2-2.5"
        stroke="oklch(0.2 0.02 158)"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Shell>
  );
}

/** Регулярный счёт — документ со строками и суммой */
export function IconInvoice(p: IconProps) {
  const id = useId();
  return (
    <Shell id={id} {...p}>
      <path
        d="M15 11h12l6 6v20a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V14a3 3 0 0 1 3-3z"
        fill={`url(#${id}-face)`}
        stroke="oklch(1 0 0 / 0.18)"
      />
      <path d="M27 11v6h6" stroke="oklch(1 0 0 / 0.3)" strokeWidth="1.2" fill="none" />
      <rect x="16" y="22" width="13" height="2.2" rx="1.1" fill="oklch(1 0 0 / 0.32)" />
      <rect x="16" y="27" width="9" height="2.2" rx="1.1" fill="oklch(1 0 0 / 0.22)" />
      <rect x="16" y="32" width="15" height="2.6" rx="1.3" fill={`url(#${id}-accent)`} />
    </Shell>
  );
}

/** Членские взносы — группа участников */
export function IconMembers(p: IconProps) {
  const id = useId();
  return (
    <Shell id={id} {...p}>
      <circle cx="19" cy="20" r="5" fill={`url(#${id}-face)`} stroke="oklch(1 0 0 / 0.18)" />
      <path
        d="M11 34c1.2-4.6 4.2-7 8-7s6.8 2.4 8 7z"
        fill={`url(#${id}-face)`}
        stroke="oklch(1 0 0 / 0.16)"
      />
      <circle cx="31.5" cy="21.5" r="4" fill="oklch(0.32 0.01 255)" stroke="oklch(1 0 0 / 0.14)" />
      <path d="M25.5 33c1-3.4 3.2-5.4 6-5.4s5 2 6 5.4z" fill="oklch(0.3 0.01 255)" />
      <circle cx="34.5" cy="15.5" r="3" fill={`url(#${id}-accent)`} />
      <path
        d="M33.2 15.5l1 1.1 1.8-2"
        stroke="oklch(0.2 0.02 158)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Shell>
  );
}

/** Согласие / автосписание — палец и импульс */
export function IconConsent(p: IconProps) {
  const id = useId();
  return (
    <Shell id={id} {...p}>
      <rect
        x="13"
        y="11"
        width="22"
        height="26"
        rx="6"
        fill={`url(#${id}-face)`}
        stroke="oklch(1 0 0 / 0.18)"
      />
      <rect x="17" y="16" width="14" height="8" rx="3" fill="oklch(0 0 0 / 0.3)" />
      <path
        d="M20 20.2l2.4 2.6 5.6-6"
        stroke={`url(#${id}-accent)`}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect x="20" y="29" width="8" height="2.4" rx="1.2" fill="oklch(1 0 0 / 0.3)" />
    </Shell>
  );
}

/** Комплаенс — щит с внутренним слоем */
export function IconShield(p: IconProps) {
  const id = useId();
  return (
    <Shell id={id} {...p}>
      <path
        d="M24 10l11 4v9c0 7.2-4.6 12.4-11 15-6.4-2.6-11-7.8-11-15v-9z"
        fill={`url(#${id}-face)`}
        stroke="oklch(1 0 0 / 0.18)"
      />
      <path d="M24 14.5l7 2.6v6c0 4.9-2.9 8.4-7 10.2z" fill="oklch(1 0 0 / 0.07)" />
      <path
        d="M19.5 24l3.2 3.4 6-7"
        stroke={`url(#${id}-accent)`}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Shell>
  );
}

/** Документы — стопка листов */
export function IconDocs(p: IconProps) {
  const id = useId();
  return (
    <Shell id={id} {...p}>
      <rect
        x="12"
        y="15"
        width="18"
        height="22"
        rx="4"
        fill="oklch(0.3 0.01 255)"
        stroke="oklch(1 0 0 / 0.12)"
      />
      <rect
        x="17"
        y="11"
        width="19"
        height="23"
        rx="4"
        fill={`url(#${id}-face)`}
        stroke="oklch(1 0 0 / 0.18)"
      />
      <rect x="21" y="17" width="11" height="2.2" rx="1.1" fill="oklch(1 0 0 / 0.3)" />
      <rect x="21" y="22" width="8" height="2.2" rx="1.1" fill="oklch(1 0 0 / 0.2)" />
      <rect x="21" y="27" width="10" height="2.2" rx="1.1" fill={`url(#${id}-accent)`} />
    </Shell>
  );
}

/** Техническое подключение — модуль с разъёмом */
export function IconPlug(p: IconProps) {
  const id = useId();
  return (
    <Shell id={id} {...p}>
      <rect
        x="12"
        y="16"
        width="18"
        height="16"
        rx="5"
        fill={`url(#${id}-face)`}
        stroke="oklch(1 0 0 / 0.18)"
      />
      <rect x="16" y="20.5" width="10" height="2.2" rx="1.1" fill="oklch(1 0 0 / 0.28)" />
      <rect x="16" y="25" width="6" height="2.2" rx="1.1" fill="oklch(1 0 0 / 0.18)" />
      <path d="M30 24h6" stroke={`url(#${id}-accent)`} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="37" cy="24" r="3" fill={`url(#${id}-accent)`} />
      <circle cx="37" cy="24" r="1.1" fill="oklch(0.2 0.02 158)" />
    </Shell>
  );
}

/** Запуск — восходящий импульс */
export function IconLaunch(p: IconProps) {
  const id = useId();
  return (
    <Shell id={id} {...p}>
      <rect
        x="12"
        y="12"
        width="24"
        height="24"
        rx="7"
        fill={`url(#${id}-face)`}
        stroke="oklch(1 0 0 / 0.18)"
      />
      <path
        d="M17 31l5.5-6.5 4 3.5L32 19"
        stroke={`url(#${id}-accent)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M27.5 19H32v4.5"
        stroke={`url(#${id}-accent)`}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </Shell>
  );
}

/** Выплаты T+3 — банкнота с календарной меткой */
export function IconPayout(p: IconProps) {
  const id = useId();
  return (
    <Shell id={id} {...p}>
      <rect
        x="10"
        y="15"
        width="28"
        height="17"
        rx="5"
        fill={`url(#${id}-face)`}
        stroke="oklch(1 0 0 / 0.18)"
      />
      <circle cx="24" cy="23.5" r="4.6" fill="oklch(0 0 0 / 0.28)" />
      <circle cx="24" cy="23.5" r="4.6" stroke={`url(#${id}-accent)`} strokeWidth="1.6" />
      <path
        d="M22.2 23.5h3.6M24 21.3v4.4"
        stroke="oklch(0.86 0.13 158)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="13" y="20" width="3.4" height="7" rx="1.7" fill="oklch(1 0 0 / 0.14)" />
      <rect x="31.6" y="20" width="3.4" height="7" rx="1.7" fill="oklch(1 0 0 / 0.14)" />
    </Shell>
  );
}

/** Заявка — форма с курсором */
export function IconRequest(p: IconProps) {
  const id = useId();
  return (
    <Shell id={id} {...p}>
      <rect
        x="12"
        y="13"
        width="24"
        height="22"
        rx="6"
        fill={`url(#${id}-face)`}
        stroke="oklch(1 0 0 / 0.18)"
      />
      <rect x="16" y="18" width="12" height="2.4" rx="1.2" fill="oklch(1 0 0 / 0.3)" />
      <rect x="16" y="23" width="8" height="2.4" rx="1.2" fill="oklch(1 0 0 / 0.2)" />
      <path
        d="M26 28.5l7.5 3-3 1.2-1.2 3z"
        fill={`url(#${id}-accent)`}
        stroke="oklch(0.2 0.02 158)"
        strokeWidth="0.6"
      />
    </Shell>
  );
}

/** Скорость подключения — циферблат */
export function IconClock(p: IconProps) {
  const id = useId();
  return (
    <Shell id={id} {...p}>
      <circle cx="24" cy="24" r="12" fill={`url(#${id}-face)`} stroke="oklch(1 0 0 / 0.18)" />
      <circle cx="24" cy="24" r="8.6" stroke="oklch(1 0 0 / 0.12)" />
      <path
        d="M24 17.8V24l4.4 2.8"
        stroke={`url(#${id}-accent)`}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="1.5" fill="oklch(0.9 0.02 255)" />
    </Shell>
  );
}
