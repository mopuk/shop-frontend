"use client";

import {
  parseFilters,
  SearchParamsInput,
  toURLSearchParams,
} from "@/src/shared/lib/parse-filters";
import { ProductVariantListResponse } from "../model/types";
import { useQuery } from "@tanstack/react-query";

export default function getProductVariants(searchParams: SearchParamsInput) {
  const filters = parseFilters(searchParams);

  return useQuery({
    queryKey: ["product_variants", filters],
    queryFn: async (): Promise<ProductVariantListResponse> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/products?${toURLSearchParams(searchParams)?.toString()}`,
      );
      return await response.json();
    },
  });
}
