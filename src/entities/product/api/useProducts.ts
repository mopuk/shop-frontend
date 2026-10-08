"use client";

import { filtersToURLSearchParams } from "@/src/shared/lib/parse-filters";
import { ProductVariantListResponse } from "../model/types";
import { useQuery } from "@tanstack/react-query";
import { SelectedProductFilters } from "@/src/shared/lib/types";

export default function useProductVariants(filters: SelectedProductFilters) {
  const queryString = filtersToURLSearchParams(filters).toString();

  return useQuery({
    queryKey: ["product_variants", queryString],
    queryFn: async (): Promise<ProductVariantListResponse> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/products?${queryString}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product variants");
      }

      return await response.json();
    },
  });
}
