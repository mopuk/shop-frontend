import { SelectedProductFilters } from "@/src/shared/lib/types";
import { ReadonlyURLSearchParams } from "next/navigation";

export function parseFilters(
  searchParams: ReadonlyURLSearchParams,
): SelectedProductFilters {
  const selectedFilters: SelectedProductFilters = {
    categories: searchParams.getAll("categories"),
    brands: searchParams.getAll("brands"),
    colors: searchParams.getAll("colors"),
    materials: searchParams.getAll("materials"),
    sizes: searchParams.getAll("sizes"),
    sort: searchParams.get("sort") ?? "newest",
  };

  return selectedFilters;
}
