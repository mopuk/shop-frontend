import { useState } from "react";
import { SelectedFilters } from "./types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useFilters() {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    categories: [],
    brands: [],
    colors: [],
    materials: [],
    sizes: [],
  });

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const toggleFilter = (
    type: keyof SelectedFilters,
    value: string,
    checked: boolean,
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: checked
        ? [...prev[type], value]
        : prev[type].filter((existing) => existing != value),
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length == 0) {
        params.delete(key);
      } else {
        params.set(key, values.join(","));
      }
    });

    router.push(`${pathName}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(`${pathName}`);
  };

  return {
    selectedFilters,
    toggleFilter,
    applyFilters,
    clearFilters,
  };
}
