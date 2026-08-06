import { Brand } from "@/src/entities/brand/model/types";
import { Category } from "@/src/entities/category/model/types";
import type { Color, Material, Size, Product, ProductVariant } from "@/src/entities/product/model/types";

export interface SelectedProductFilters {
  categories: string[];
  brands: string[];
  colors: string[];
  materials: string[];
  sizes: string[];
}

export interface ProductFilterOptions {
  categories?: Category[];
  brands: Brand[];
  colors: Color[];
  materials: Material[];
  sizes: Size[];
}

export type { Product, ProductVariant };
