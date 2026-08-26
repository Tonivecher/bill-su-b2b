import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Nav";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface/30">
      <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-[38ch]">
            <Wordmark className="text-xl" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Сервис приёма регулярных платежей через Систему быстрых платежей: подписки, абонементы
              и другие повторяющиеся оплаты.
            </p>
          </div>

          <nav
            className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2 sm:gap-x-16 sm:gap-y-3"
            aria-label="Подвал"
          >
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Сайт</span>
              <a
                href="/#product"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Продукт
              </a>
              <a
                href="/#workspace"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Интерфейс
              </a>
              <a
                href="/#how"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Механика
              </a>
              <a
                href="/#connect"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Подключение
              </a>
              <a
                href="/#lead"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Заявка
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Документы</span>
              <Link
                to="/documents"
                className="text-foreground underline underline-offset-4 transition-colors hover:text-accent"
              >
                Все документы
              </Link>
              <Link
                to="/offer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Оферта
              </Link>
              <Link
                to="/privacy"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Политика конфиденциальности
              </Link>
              <Link
                to="/consent"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Согласие на обработку ПД
              </Link>
              <Link
                to="/documents"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Архивные материалы
              </Link>
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-hairline pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="tnum">© {new Date().getFullYear()} Bill.su</p>
          <p className="max-w-[52ch]">
            Реквизиты юридического лица будут опубликованы на сайте после завершения регистрации.
          </p>
          <p>
            Дизайн и разработка —{" "}
            <a
              href="https://github.com/Tonivecher"
              target="_blank"
              rel="noreferrer noopener"
              className="text-foreground underline underline-offset-4 transition-colors hover:text-accent"
            >
              TonyVecher AI Lab
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
