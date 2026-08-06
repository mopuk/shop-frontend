"use client";

import { Brand, Category, Color, Material, Size } from "@/src/types";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Button } from "@/src/components/ui/button";
import useCategoriesQuery from "@/src/entities/category/api/use-categories";
import useFilters from "../model/use-filters";
import useProductFiltersQuery from "@/src/entities/product/api/use-product-filters";

export default function Sidebar() {
  const {
    filters,
    isPending: isFiltersPending,
    error: filtersError,
  } = useProductFiltersQuery();
  const {
    categories,
    isPending: isCategoriesPending,
    error: categoriesError,
  } = useCategoriesQuery();

  const { selectedFilters, toggleFilter, applyFilters, clearFilters } =
    useFilters();

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
        <form
          action=""
          className="flex flex-col gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
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
                    checked={selectedFilters.categories.includes(category.slug)}
                    onCheckedChange={(checked) =>
                      toggleFilter("categories", category.slug, checked)
                    }
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
                    onCheckedChange={(checked) =>
                      toggleFilter("brands", brand.slug, checked)
                    }
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
              Materials
            </h3>
            <FieldGroup className="">
              {filters.materials.map((material: Material) => (
                <Field key={material.id} orientation="horizontal">
                  <Checkbox
                    id={`material-${material.id}`}
                    name="materials"
                    value={String(material.id)}
                    onCheckedChange={(checked) =>
                      toggleFilter("materials", material.slug, checked)
                    }
                  />

                  <FieldLabel
                    htmlFor={`material-${material.id}`}
                    className="font-hanken text-xs text-neutral"
                  >
                    {material.name}
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </div>
          <div>
            <h3 className="font-hanken font-semibold text-xs text-neutral mb-3">
              Sizes
            </h3>
            <FieldGroup className="flex-row flex-wrap">
              {filters.sizes.map((size: Size) => (
                <Field key={size.id} className="w-16 h-10">
                  <FieldLabel
                    htmlFor={`size-${size.id}`}
                    className="relative  size-full cursor-pointer"
                  >
                    <CheckboxPrimitive.Root
                      id={`size-${size.id}`}
                      name="sizes"
                      checked={selectedFilters.sizes.includes(size.name)}
                      className="absolute inset-0 opacity-0"
                      onCheckedChange={(checked) =>
                        toggleFilter("sizes", size.name, checked)
                      }
                    />
                    <div
                      className={`size-full flex justify-center items-center font-hanken text-xs text-neutral rounded-md border-2 bg-[#E2E2E5] ${selectedFilters.sizes.includes(size.name) ? "border-primary" : "border-transparent"}`}
                    >
                      {size.name}
                    </div>
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </div>
          <div>
            <h3 className="font-hanken font-semibold text-xs text-neutral mb-3">
              Colors
            </h3>
            <FieldGroup className="flex-row flex-wrap">
              {filters.colors.map((color: Color) => (
                <Field key={color.id} className="w-12 h-12">
                  <FieldLabel className="relative block size-12 cursor-pointer">
                    <CheckboxPrimitive.Root
                      id={`color-${color.id}`}
                      name="colors"
                      checked={selectedFilters.colors.includes(color.slug)}
                      onCheckedChange={(checked) =>
                        toggleFilter("colors", color.slug, checked)
                      }
                      className="absolute inset-0 opacity-0"
                    />

                    <div
                      className={`size-full rounded-lg border-3 ${selectedFilters.colors.includes(color.slug) ? "border-primary" : "border-transparent"}`}
                      style={{ backgroundColor: color.hex_code }}
                    />
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </div>
          <Button
            type="submit"
            className="bg-primary px-4 py-2 w-full h-16 font-hanken text-lg text-white"
          >
            Apply
          </Button>
        </form>
      </div>
    </div>
  );
}
