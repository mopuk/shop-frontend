"use client";

import { Color, Size } from "@/src/shared/lib/types";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import useFilters from "../model/use-filters";
import React, { ReactNode } from "react";
import { CategoriesListResponse } from "@/src/entities/category/model/types";
import { ProductFilterOptions } from "@/src/shared/lib/types";

type CheckboxFilterKey = "categories" | "brands" | "materials";

type FilterOption = {
  id: string | number;
  slug: string;
  name: string;
};

function FilterSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div>
      <h3 className="font-hanken font-semibold text-xs text-neutral mb-3">
        {title}
      </h3>
      <FieldGroup className={className}>{children}</FieldGroup>
    </div>
  );
}

function CheckboxFilterOption({
  id,
  name,
  value,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  name: string;
  value?: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <Field key={id} orientation="horizontal">
      <Checkbox
        id={id}
        name={name}
        value={value}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <FieldLabel htmlFor={id} className="font-hanken text-xs text-neutral">
        {label}
      </FieldLabel>
    </Field>
  );
}

function CheckboxFilterSection<T extends FilterOption>({
  title,
  options,
  filterKey,
  selectedValues,
  valueGetter,
  onToggle,
}: {
  title: string;
  options: T[];
  filterKey: CheckboxFilterKey;
  selectedValues: string[];
  valueGetter: (option: T) => string;
  onToggle: (type: CheckboxFilterKey, value: string, checked: boolean) => void;
}) {
  return (
    <FilterSection title={title}>
      {options.map((option) => {
        const value = valueGetter(option);

        return (
          <CheckboxFilterOption
            key={option.id}
            id={`${filterKey}-${option.id}`}
            name={filterKey}
            value={String(option.id)}
            label={option.name}
            checked={selectedValues.includes(value)}
            onCheckedChange={(checked) => onToggle(filterKey, value, checked)}
          />
        );
      })}
    </FilterSection>
  );
}

export default function FiltersSidebarClient({
  filters,
  categories,
}: {
  filters: ProductFilterOptions;
  categories: CategoriesListResponse;
}) {
  const { selectedFilters, toggleFilter, clearFilters } = useFilters();
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
          <CheckboxFilterSection
            title="Categories"
            options={categories.categories}
            filterKey="categories"
            selectedValues={selectedFilters.categories}
            valueGetter={(category) => category.slug}
            onToggle={toggleFilter}
          />
          <CheckboxFilterSection
            title="Brands"
            options={filters.brands}
            filterKey="brands"
            selectedValues={selectedFilters.brands}
            valueGetter={(brand) => brand.slug}
            onToggle={toggleFilter}
          />
          <CheckboxFilterSection
            title="Materials"
            options={filters.materials}
            filterKey="materials"
            selectedValues={selectedFilters.materials}
            valueGetter={(material) => material.slug}
            onToggle={toggleFilter}
          />

          <FilterSection title="Sizes" className="flex-row flex-wrap">
            {filters.sizes.map((size: Size) => (
              <Field key={size.id} className="w-16 h-10">
                <FieldLabel
                  htmlFor={`size-${size.id}`}
                  className="relative size-full cursor-pointer"
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
          </FilterSection>

          <FilterSection title="Colors" className="flex-row flex-wrap">
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
                    className={`size-full rounded-xl border-3 ${selectedFilters.colors.includes(color.slug) ? "border-primary" : "border-gray-400"}`}
                    style={{ backgroundColor: color.hex_code }}
                  />
                </FieldLabel>
              </Field>
            ))}
          </FilterSection>
        </form>
      </div>
    </div>
  );
}
