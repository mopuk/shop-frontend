import { SelectedProductFilters } from "@/src/shared/lib/types";
import { ReadonlyURLSearchParams } from "next/navigation";

type PlainSearchParams = Record<string, string | string[] | undefined>;
export type SearchParamsInput =
  | PlainSearchParams
  | ReadonlyURLSearchParams
  | URLSearchParams
  | undefined;

export function parseFilters(
  searchParams: SearchParamsInput,
): SelectedProductFilters {
  const selectedFilters: SelectedProductFilters = {
    categories: getArrayParam(searchParams, "categories"),
    brands: getArrayParam(searchParams, "brands"),
    colors: getArrayParam(searchParams, "colors"),
    materials: getArrayParam(searchParams, "materials"),
    sizes: getArrayParam(searchParams, "sizes"),
    sort: getStringParam(searchParams, "sort") || "newest",
  };

  return selectedFilters;
}

function getArrayParam(params: SearchParamsInput, key: string): string[] {
  if (!params) return [];

  const anyParams = params as any;
  if (typeof anyParams.getAll === "function") {
    const vals = anyParams.getAll(key);
    return Array.isArray(vals) ? vals : vals ? [vals] : [];
  }

  // Plain object case
  const value = (params as PlainSearchParams)[key];
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function getStringParam(
  params: SearchParamsInput,
  key: string,
): string | undefined {
  if (!params) return undefined;

  const anyParams = params as any;
  if (typeof anyParams.get === "function") {
    return anyParams.get(key) ?? undefined;
  }

  const plain = params as PlainSearchParams;
  const v = plain[key];
  if (!v) return undefined;
  return Array.isArray(v) ? String(v[0]) : String(v);
}
