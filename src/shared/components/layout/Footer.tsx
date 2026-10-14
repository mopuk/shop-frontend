import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral/15 bg-tertiary">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <Link href="/" className="transition-opacity hover:opacity-85">
            <Image
              src="/images/Logo.svg"
              alt="MOXPOKE"
              height={28}
              width={140}
            />
          </Link>
          <p className="font-montserrat text-xs text-neutral">
            © 2026 MOXPOKE. Все права защищены.
          </p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-6 list-none p-0">
          <li>
            <Link
              href="/privacy"
              className="font-montserrat text-xs text-neutral hover:text-secondary transition-colors"
            >
              Конфиденциальность
            </Link>
          </li>
          <li>
            <Link
              href="/terms"
              className="font-montserrat text-xs text-neutral hover:text-secondary transition-colors"
            >
              Условия использования
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="font-montserrat text-xs text-neutral hover:text-secondary transition-colors"
            >
              Контакты
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
