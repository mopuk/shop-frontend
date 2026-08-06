import { ProductFilterOptions } from "@/src/shared/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useProductFiltersQuery() {
  const {
    data: filters,
    isPending,
    error,
  } = useQuery({
    queryKey: ["filters"],
    queryFn: async (): Promise<ProductFilterOptions> => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/v1/products/filters",
      );

      if (!response.ok) throw new Error("Failed to fetch filters");
      return await response.json();
    },
  });

  return {
    filters,
    isPending,
    error,
  };
}
