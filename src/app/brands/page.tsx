import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface BrandItem {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

interface BrandsResponse {
  brands: BrandItem[];
}

async function getBrands(): Promise<BrandsResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/brands`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Не удалось загрузить список брендов");
  }

  return res.json();
}

export default async function BrandsPage() {
  const data = await getBrands();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full font-montserrat">
      <div className="mb-8 pb-4 border-b border-neutral/10">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 text-xs text-neutral hover:text-secondary transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться в каталог
        </Link>
        <h1 className="font-montserrat font-bold text-xl sm:text-2xl text-secondary">
          Все бренды
        </h1>
        <p className="text-xs text-neutral mt-1">
          Выберите бренд для просмотра коллекций и доступных моделей
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/catalog?brands=${encodeURIComponent(brand.slug)}`}
            className="group flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-neutral/15 bg-background shadow-2xs hover:border-primary hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <h2 className="font-hanken font-bold text-sm text-secondary group-hover:text-primary transition-colors">
                {brand.name}
              </h2>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-neutral/20 bg-tertiary text-secondary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>

            {brand.description && (
              <p className="text-xs text-neutral line-clamp-2 leading-relaxed">
                {brand.description}
              </p>
            )}

            <div className="mt-4 pt-4 border-t border-neutral/10 flex items-center justify-between text-xs text-neutral group-hover:text-primary transition-colors font-semibold font-hanken">
              <span>Смотреть товары</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
