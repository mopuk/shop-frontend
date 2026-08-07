import { parseFilters } from "@/src/shared/lib/parse-filters";
import { ProductVariantListResponse } from "../model/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function useProductVariantsQuery() {
  const searchParams = useSearchParams();
  const filters = parseFilters(searchParams);

  return useQuery({
    queryKey: ["product_variants", filters],
    queryFn: async (): Promise<ProductVariantListResponse> => {
      const response = await fetch(`
        ${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/products?${searchParams.toString()}}
      `);
      return await response.json();
    },
  });
}
