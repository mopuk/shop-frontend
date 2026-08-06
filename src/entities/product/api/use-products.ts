import { ProductVariant } from "@/src/types";
import { useQuery } from "@tanstack/react-query";

export default function useProductVariantsQuery() {
  return useQuery({
    queryKey: ["product_variants"],
    queryFn: async (): Promise<ProductVariant[]> => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/v1/products",
      );
      return await response.json();
    },
  });
}
