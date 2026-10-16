import { Suspense } from "react";
import CatalogList from "@/src/features/catalog/ui/CatalogList";
import FiltersSidebar from "@/src/features/product-filters/ui/FiltersSidebar";
import { SearchParamsInput } from "@/src/shared/lib/parse-filters";

function FiltersSidebarSkeleton() {
  return (
    <aside className="w-full animate-pulse" aria-label="Загрузка фильтров">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="h-5 w-24 rounded bg-neutral/10" />
      </div>

      <div className="bg-background border border-neutral/20 shadow-xs p-5 rounded-xl flex flex-col divide-y divide-neutral/10">
        <div className="pb-4">
          <div className="h-4 w-28 rounded bg-neutral/10 mb-3" />
          <div className="flex flex-col gap-2.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 py-1">
                <div className="size-4 rounded bg-neutral/10" />
                <div className="h-3.5 w-28 rounded bg-neutral/10" />
              </div>
            ))}
          </div>
        </div>
        <div className="py-4">
          <div className="h-4 w-24 rounded bg-neutral/10 mb-3" />
          <div className="flex flex-col gap-2.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 py-1">
                <div className="size-4 rounded bg-neutral/10" />
                <div className="h-3.5 w-24 rounded bg-neutral/10" />
              </div>
            ))}
          </div>
        </div>
        <div className="py-4">
          <div className="h-4 w-28 rounded bg-neutral/10 mb-3" />
          <div className="flex flex-col gap-2.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 py-1">
                <div className="size-4 rounded bg-neutral/10" />
                <div className="h-3.5 w-20 rounded bg-neutral/10" />
              </div>
            ))}
          </div>
        </div>
        <div className="py-4">
          <div className="h-4 w-20 rounded bg-neutral/10 mb-3" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="size-10 rounded-full bg-neutral/10 shrink-0"
              />
            ))}
          </div>
        </div>
        <div className="py-4">
          <div className="h-4 w-16 rounded bg-neutral/10 mb-3" />
          <div className="flex flex-wrap gap-2.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="size-10 rounded-full bg-neutral/10 shrink-0"
              />
            ))}
          </div>
        </div>
        <div className="pt-5">
          <div className="h-10 w-full rounded-md bg-neutral/10" />
        </div>
      </div>
    </aside>
  );
}

function CatalogListSkeleton() {
  return (
    <div className="w-full animate-pulse" aria-label="Загрузка каталога">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-neutral/10 mb-6">
        <div className="h-5 w-44 rounded bg-neutral/10" />
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="h-4 w-24 rounded bg-neutral/10" />
            <div className="h-10 w-20 rounded-md bg-neutral/10" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-24 rounded bg-neutral/10" />
            <div className="h-10 w-52 rounded-md bg-neutral/10" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col h-full rounded-xl border border-neutral/20 bg-background shadow-xs overflow-hidden"
          >
            <div className="relative w-full h-48 bg-tertiary flex items-center justify-center border-b border-neutral/10">
              <div className="w-20 h-20 rounded-full bg-neutral/10" />
              <div className="absolute top-3 right-3 h-5 w-8 rounded-md bg-neutral/10" />
              <div className="absolute bottom-2 left-3 h-3 w-20 rounded bg-neutral/10" />
            </div>
            <div className="flex flex-col flex-1 p-4 gap-3">
              <div className="flex items-center justify-between">
                <div className="h-3 w-16 rounded bg-neutral/10" />
                <div className="h-3 w-14 rounded bg-neutral/10" />
              </div>
              <div className="space-y-1.5">
                <div className="h-4 w-full rounded bg-neutral/10" />
                <div className="h-4 w-2/3 rounded bg-neutral/10" />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <div className="size-3.5 rounded-full bg-neutral/10 shrink-0" />
                <div className="h-3 w-16 rounded bg-neutral/10" />
                <div className="h-3 w-20 rounded bg-neutral/10" />
              </div>
              <div className="mt-auto pt-3 border-t border-neutral/10 flex items-center justify-between">
                <div className="h-3.5 w-10 rounded bg-neutral/10" />
                <div className="h-4 w-20 rounded bg-neutral/10" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-1 my-8">
        <div className="h-10 w-10 rounded-md bg-neutral/10" />
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-10 rounded-md bg-neutral/10" />
          ))}
        </div>
        <div className="h-10 w-10 rounded-md bg-neutral/10" />
      </div>
    </div>
  );
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsInput>;
}) {
  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-8 items-start">
        <Suspense fallback={<FiltersSidebarSkeleton />}>
          <FiltersSidebar />
        </Suspense>
        <Suspense fallback={<CatalogListSkeleton />}>
          <CatalogList searchParams={await searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
