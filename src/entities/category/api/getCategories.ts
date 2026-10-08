import { CategoriesListResponse } from "../model/types";

export default async function getCategories(): Promise<CategoriesListResponse> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + "/api/v1/categories",
    { next: { revalidate: 60 } },
  );

  if (!response.ok) throw new Error("Failed to load categories");
  const data = await response.json();

  return data;
}
