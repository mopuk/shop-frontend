export type Color = {
  name: string;
  hex_code: string;
  slug: string;
};

export type Material = {
  name: string;
  slug: string;
};

export type Size = {
  name: string;
  sort_order: number;
};

export type Brand = {
  id: number;
  name: string;
  slug: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  children: Category[];
};

export type CategoriesList = {
  categories: Category[];
};

export type FiltersList = {
  brands: Brand[];
  colors: Color[];
  sizes: Size[];
  materials: Material[];
};

type ProductImage = {
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

  brand: string | null;
  category: string | null;

  variants: ProductVariant[];
};

export type ProductVariant = {
  id: number;
  price: number;
  stock: number;
  is_available: boolean;

  product: Product;

  color: Color;
  size: Size;
  material: Material;
  images: ProductImage[];
};
