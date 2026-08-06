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
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";

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

  return (
    <div className="m-6">
      <h2 className="font-hanken font-semibold text-sm text-primary ml-6 mb-2">
        Filters
      </h2>
      <div className="bg-[#F3F3F6] p-6 rounded-lg">
        <form action="" className="flex flex-col gap-2">
          <div>
            <h3 className="font-hanken font-semibold text-xs text-neutral mb-3">
              Categories
            </h3>
            <FieldGroup>
              {categories.categories.map((category: Category) => (
                <Field key={category.id} orientation="horizontal">
                  <Checkbox
                    id={`category-${category.id}`}
                    name="categories"
                    value={String(category.id)}
                  />

                  <FieldLabel
                    htmlFor={`category-${category.id}`}
                    className="font-hanken text-xs text-neutral"
                  >
                    {category.name}
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </div>
          <div>
            <h3 className="font-hanken font-semibold text-xs text-neutral mb-3">
              Brands
            </h3>
            <FieldGroup>
              {filters.brands.map((brand: Brand) => (
                <Field key={brand.id} orientation="horizontal">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    name="brands"
                    value={String(brand.id)}
                  />

                  <FieldLabel
                    htmlFor={`brand-${brand.id}`}
                    className="font-hanken text-xs text-neutral"
                  >
                    {brand.name}
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </div>

          <div>
            <h3 className="font-hanken font-semibold text-xs text-neutral mb-3">
              Sizes
            </h3>
            <FieldGroup className="grid grid-cols-3 pl-5">
              {filters.sizes.map((size: Size) => (
                <Field key={size.id} className="w-12 h-8">
                  <Checkbox
                    id={`size-${size.id}`}
                    aria-label={size.name}
                    className={`w-full h-full`}
                  />
                </Field>
              ))}
            </FieldGroup>
          </div>
          <div>
            <h3 className="font-hanken font-semibold text-xs text-neutral mb-3">
              Materials
            </h3>
            <FieldGroup className="grid grid-cols-3 pl-5">
              {filters.materials.map((material: Material) => (
                <Field key={material.id}>
                  <Checkbox id={`material-${material.id}`} />
                </Field>
              ))}
            </FieldGroup>
          </div>
          <div>
            <h3 className="font-hanken font-semibold text-xs text-neutral mb-3">
              Colors
            </h3>
            <FieldGroup className="grid grid-cols-3 pl-5">
              {filters.colors.map((color: Color) => (
                <Field key={color.id} className="w-12 h-12">
                  <FieldLabel className="relative block size-12 cursor-pointer">
                    <CheckboxPrimitive.Root
                      id={`color-${color.id}`}
                      name="colors"
                      value={String(color.id)}
                      className="peer absolute inset-0 opacity-0"
                    />

                    <div
                      className="size-full rounded-md border-2 border-transparent peer-data-[state=checked]:border-black peer-focus-visible:ring-2"
                      style={{ backgroundColor: color.hex_code }}
                    />
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </div>
        </form>
      </div>
    </div>
  );
}
