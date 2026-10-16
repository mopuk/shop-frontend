"use client";

import { Checkbox } from "@/src/shared/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Button } from "@/src/shared/components/ui/button";
import { CategoriesListResponse } from "@/src/entities/category/model/types";
import { Color, ProductFilterOptions, Size } from "@/src/shared/lib/types";
import useFilters from "../model/use-filters";

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
    <div className="pt-4 first:pt-0">
      <h3 className="font-hanken font-bold text-xs uppercase tracking-wider text-secondary mb-3">
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
    <Field
      key={id}
      orientation="horizontal"
      className="items-center gap-2 py-1"
    >
      <Checkbox
        id={id}
        name={name}
        value={value}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="border-neutral/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <FieldLabel
        htmlFor={id}
        className="font-montserrat text-xs text-secondary cursor-pointer select-none"
      >
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

  const hasActiveFilters = Object.values(selectedFilters).some(
    (arr) => Array.isArray(arr) && arr.length > 0,
  );

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="font-hanken font-bold text-sm text-secondary">
          Фильтры
        </h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="font-montserrat text-xs text-neutral hover:text-primary transition-colors cursor-pointer"
          >
            Сбросить все
          </button>
        )}
      </div>

      <div className="bg-background border border-neutral/20 shadow-xs p-5 rounded-xl">
        <form
          className="flex flex-col divide-y divide-neutral/10"
          onSubmit={(e) => e.preventDefault()}
        >
          <CheckboxFilterSection
            title="Категории"
            options={categories.categories}
            filterKey="categories"
            selectedValues={selectedFilters.categories}
            valueGetter={(category) => category.slug}
            onToggle={toggleFilter}
          />

          <CheckboxFilterSection
            title="Бренды"
            options={filters.brands}
            filterKey="brands"
            selectedValues={selectedFilters.brands}
            valueGetter={(brand) => brand.slug}
            onToggle={toggleFilter}
          />

          <CheckboxFilterSection
            title="Материалы"
            options={filters.materials}
            filterKey="materials"
            selectedValues={selectedFilters.materials}
            valueGetter={(material) => material.slug}
            onToggle={toggleFilter}
          />

          <FilterSection
            title="Размеры"
            className="flex-row flex-wrap gap-2 mb-2"
          >
            {filters.sizes.map((size: Size) => (
              <Field key={size.id} className="size-10 shrink-0">
                <FieldLabel
                  htmlFor={`size-${size.id}`}
                  className="relative size-full cursor-pointer select-none"
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
                    className={`size-full flex justify-center items-center font-hanken text-xs rounded-full border transition-all ${
                      selectedFilters.sizes.includes(size.name)
                        ? "bg-primary border-primary text-white shadow-xs"
                        : "bg-tertiary border-neutral/20 text-secondary hover:border-neutral/40"
                    }`}
                  >
                    {size.name}
                  </div>
                </FieldLabel>
              </Field>
            ))}
          </FilterSection>

          <FilterSection
            title="Цвета"
            className="flex-row flex-wrap gap-2.5 mb-2"
          >
            {filters.colors.map((color: Color) => (
              <Field key={color.id} className="size-10 shrink-0">
                <FieldLabel
                  htmlFor={`color-${color.id}`}
                  aria-label={`Цвет: ${color.slug}`}
                  className="relative block size-full cursor-pointer"
                >
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
                    className={`size-full rounded-full transition-transform hover:scale-105 ${
                      selectedFilters.colors.includes(color.slug)
                        ? "ring-2 ring-primary ring-offset-2"
                        : "ring-1 ring-black/10"
                    }`}
                    style={{ backgroundColor: color.hex_code }}
                  />
                </FieldLabel>
              </Field>
            ))}
          </FilterSection>

          <div className="pt-5">
            <Button
              type="button"
              variant="outline"
              disabled={!hasActiveFilters}
              onClick={clearFilters}
              className="w-full font-hanken text-xs text-secondary border-neutral/20 hover:bg-tertiary disabled:opacity-40"
            >
              Сбросить фильтры
            </Button>
          </div>
        </form>
      </div>
    </aside>
  );
}
