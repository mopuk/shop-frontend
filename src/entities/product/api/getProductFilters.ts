import { ProductFilterOptions } from "@/src/shared/lib/types";

export default async function getProductFilters(): Promise<ProductFilterOptions> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + "/api/v1/products/filters",
  );

  if (!response.ok) throw new Error("Failed to fetch filters");
  return await response.json();
}
