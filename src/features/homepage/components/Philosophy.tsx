import Image from "next/image";

const VALUES = [
  {
    icon: "/images/sustainability.svg",
    title: "Экологичность",
    description: "Перерабатываемые материалы и минимизация углеродного следа.",
  },
  {
    icon: "/images/universal_fit.svg",
    title: "Анатомическая посадка",
    description: "Колодка, созданная для комфорта в течение всего дня.",
  },
  {
    icon: "/images/transparent_pricing.svg",
    title: "Честная цена",
    description: "Прямые поставки без наценок за маркетинговый шум.",
  },
];

export default function Philosophy() {
  return (
    <section className="w-full bg-tertiary border-y border-neutral/10 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="inline-flex p-3 rounded-2xl bg-background border border-neutral/15 mb-4 shadow-2xs">
          <Image src="/images/leaf.svg" alt="Лист" width={24} height={24} />
        </div>
        <h2 className="font-montserrat font-bold text-xl sm:text-2xl text-secondary mb-4">
          Наша философия
        </h2>
        <p className="font-montserrat text-xs sm:text-sm text-neutral leading-relaxed max-w-2xl mx-auto mb-12">
          Мы убеждены, что качественная обувь не должна быть привилегией.
          MOXPOKE создает долговечные и лаконичные силуэты, освобожденные от
          шума быстрой моды.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center list-none p-0">
          {VALUES.map((item) => (
            <li key={item.title} className="flex flex-col items-center">
              <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-background border border-neutral/15 shadow-2xs mb-4">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={36}
                  height={36}
                />
              </div>
              <h3 className="font-hanken font-bold text-xs text-secondary mb-1">
                {item.title}
              </h3>
              <p className="font-montserrat text-xs text-neutral/80 max-w-xs">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
