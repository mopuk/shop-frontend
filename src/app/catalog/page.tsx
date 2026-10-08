import CatalogList from "@/src/features/catalog/ui/CatalogList";
import FiltersSidebar from "@/src/features/product-filters/ui/FiltersSidebar";
import { SearchParamsInput } from "@/src/shared/lib/parse-filters";
import { Suspense } from "react";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<SearchParamsInput>;
}) {
  return (
    <div className="min-h-screen px-10 grid grid-cols-1 xl:grid-cols-[1fr_3fr]">
      <Suspense
        fallback={
          <div className="m-6">
            <h2 className="font-hanken font-semibold text-sm text-primary ml-6 mb-2">
              Фильтры
            </h2>
            <div className="bg-[#F3F3F6] p-6 rounded-lg">
              <div className="spinner-container" aria-label="Загрузка фильтров">
                <div className="spinner" />
              </div>
            </div>
          </div>
        }
      >
        <FiltersSidebar />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <CatalogList searchParams={await searchParams} />
      </Suspense>
    </div>
  );
}
