"use client";

import {
  SearchParamsInput,
  toURLSearchParams,
} from "@/src/shared/lib/parse-filters";
import { ProductVariantListResponse } from "../model/types";
import { useQuery } from "@tanstack/react-query";

export default function useProductVariants(searchParams: SearchParamsInput) {
  const queryString = toURLSearchParams(searchParams).toString();

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
