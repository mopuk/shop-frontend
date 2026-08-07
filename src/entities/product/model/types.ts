import { Brand } from "../../brand/model/types";
import { Category } from "../../category/model/types";

export type ProductImage = {
  id: number;
  url: string;
  alt_text: string;
  sort_order: number;
  variant_id: number;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  thumbnail: string;

  tags: string[];
  is_featured: boolean;
  created_at: string;
  gender: "men" | "women" | "unisex";
  base_price: number;

  brand: Brand | null;
  category: Category | null;

  variants: ProductVariant[];
};

export type ProductVariant = {
  id: number;
  variant_price: number;
  stock: number;
  is_available: boolean;
  thumbnail: string;

  product: Product;

  color: Color;
  size: Size;
  material: Material;
  images: ProductImage[];
};

export type Size = {
  id: number;
  name: string;
  sort_order: number;
};

export type Material = {
  id: number;
  name: string;
  slug: string;
};

export type Color = {
  id: number;
  name: string;
  hex_code: string;
  slug: string;
};

export interface ProductVariantListResponse {
  variants: ProductVariant[];
}
