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
      <Suspense fallback={<div>Loading...</div>}>
        <FiltersSidebar />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <CatalogList searchParams={await searchParams} />
      </Suspense>
    </div>
  );
}
