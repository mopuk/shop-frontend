import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-tertiary border-b border-neutral/10 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          <span className="font-hanken font-bold text-xs uppercase tracking-wider text-primary mb-3">
            Новая коллекция 2026
          </span>
          <h1 className="font-montserrat font-bold text-2xl lg:text-3xl text-secondary leading-tight mb-6">
            Шаг навстречу <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-primary to-green-400 bg-clip-text text-transparent">
              абсолютному комфорту
            </span>
          </h1>
          <p className="font-montserrat text-xs sm:text-sm text-neutral max-w-xl leading-relaxed mb-8">
            Баланс чистой эстетики и бескомпромиссного удобства. Обувь,
            созданная для естественного движения каждый день.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-8 py-4 font-hanken text-xs font-bold text-white rounded-xl bg-primary hover:bg-primary/90 shadow-md transition-all"
            >
              В КАТАЛОГ
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/catalog"
              className="px-6 py-4 font-montserrat text-xs font-semibold text-secondary hover:text-primary transition-colors"
            >
              Смотреть коллекцию
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center">
          <div className="relative w-full aspect-square max-w-md lg:max-w-none">
            <div className="absolute inset-0 bg-radial from-primary/15 via-transparent to-transparent rounded-full blur-3xl -z-10" />
            <Image
              src="/images/hero_image.png"
              alt="Обувь коллекции MOXPOKE"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
