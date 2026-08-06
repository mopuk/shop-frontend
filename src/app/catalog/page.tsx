import CatalogList from "@/src/features/catalog/ui/CatalogList";
import FiltersSidebar from "@/src/features/product-filters/ui/FiltersSidebar";
import { Suspense } from "react";

export default async function page() {
  return (
    <div className="min-h-screen px-10 grid grid-cols-1 xl:grid-cols-[1fr_3fr]">
      <Suspense fallback={<div>Loading...</div>}>
        <FiltersSidebar />
      </Suspense>
      <CatalogList />
    </div>
  );
}
