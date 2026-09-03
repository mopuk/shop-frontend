"use client";

import { parseFilters } from "@/src/shared/lib/parse-filters";
import { SelectedProductFilters } from "@/src/shared/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useFilters() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const selectedFilters: SelectedProductFilters = parseFilters(searchParams);

  const toggleFilter = (
    type: keyof SelectedProductFilters,
    value: string,
    checked: boolean,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    const values = params.getAll(type);

    const updated = checked
      ? [...new Set([...values, value])]
      : values.filter((v) => v !== value);

    params.delete(type);

    if (updated.length > 0) {
      updated.forEach((value) => {
        params.append(type, value);
      });
    } else {
      params.delete(type);
    }
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push(`${pathName}`, { scroll: false });
  };

  return {
    selectedFilters,
    toggleFilter,
    clearFilters,
  };
}
