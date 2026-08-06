import { CategoriesList } from "@/src/types";
import { useQuery } from "@tanstack/react-query";

export default function useCategoriesQuery() {
  const {
    data: categories,
    isPending,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<CategoriesList> => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/v1/categories",
      );
      if (!response.ok) throw new Error("Failed to fetch filters");
      return await response.json();
    },
  });

  return {
    categories,
    isPending,
    error,
  };
}
