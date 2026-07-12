"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
type Color = {
  name: string;
  hex_code: string;
  slug: string;
};

type Material = {
  name: string;
  slug: string;
};

type Size = {
  name: string;
  sort_order: number;
};

type ProductImage = {
  id: number;
  url: string;
  alt_text: string;
  sort_order: number;
  variant_id: number;
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

export default function CatalogList({
  productVariants,
}: {
  productVariants: ProductVariant[];
}) {
  const router = useRouter();
  const handleOnClick = (slug: string, variantId: number) => {
    router.push(`/product/${slug}/${variantId} `);
  };

  return (
    <ul>
      {productVariants.map((productVariant) => {
        const imageURL = productVariant.images?.[0]?.url
          ? process.env.NEXT_PUBLIC_BACKEND_URL +
            "/static/images/" +
            productVariant.images[0].url
          : "";
        return (
          <li
            key={productVariant.id}
            onClick={() =>
              handleOnClick(productVariant.product.slug, productVariant.id)
            }
          >
            <Image
              src={imageURL}
              alt={productVariant.images[0].alt_text}
              width={200}
              height={175}
              style={{ objectFit: "cover" }}
              unoptimized
            />
            <h3>{productVariant.price}</h3>
            <p>{productVariant.product.name}</p>
          </li>
        );
      })}
    </ul>
  );
}
