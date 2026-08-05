"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Brand,
  CategoriesList,
  Category,
  FiltersList,
  Color,
  Material,
  Size,
} from "@/src/types";

export default function Sidebar() {
  const {
    data: filters,
    isPending: isFiltersPending,
    error: filtersError,
  } = useQuery({
    queryKey: ["filters"],
    queryFn: async (): Promise<FiltersList> => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/v1/products/filters",
      );

      if (!response.ok) throw new Error("Failed to fetch filters");
      return await response.json();
    },
  });

  const {
    data: categories,
    isPending: isCategoriesPending,
    error: categoriesError,
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

  if (isFiltersPending || isCategoriesPending)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  if (filtersError) return <div>{filtersError.message}</div>;
  if (categoriesError) return <div>{categoriesError.message}</div>;

  if (!filters || !categories)
    return <div>Filters or categories unavailable</div>;
  console.log(filters);
  return (
    <div>
      <div>
        <h3>Categories</h3>
        <ul className="pl-5">
          {categories.categories.map((category: Category) => (
            <li key={category.id}>{category.slug}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Brands</h3>
        <ul className="pl-5">
          {filters.brands.map((brand: Brand) => (
            <li key={brand.id}>{brand.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Colors</h3>
        <ul className="pl-5">
          {filters.colors.map((color: Color) => (
            <li key={color.hex_code}>{color.slug}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Sizes</h3>
        <ul className="pl-5">
          {filters.sizes.map((size: Size) => (
            <li key={size.sort_order}>{size.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Materials</h3>
        <ul className="pl-5">
          {filters.materials.map((material: Material) => (
            <li key={material.name}>{material.slug}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
