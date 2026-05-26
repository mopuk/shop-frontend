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

type Image = {
  id: number;
  url: string;
  alt_text: string;
  sort_order: number;
  variant_id: number;
};

export type ProductVariant = {
  id: number;
  price: number;
  stock: number;
  is_available: boolean;

  product: {
    id: number;
    name: string;
    slug: string;
    description: string;
    short_description: string;
    thumbnail: string;

    tags: string[];
    is_featured: boolean;
    created_at: string; // API usually returns ISO string, not Date
    gender: "men" | "women" | "unisex";
    base_price: number;

    brand: string | null;
    category: string | null;
  };

  color: Color;
  size: Size;
  material: Material;
  images: Image[];
};

export default function CatalogList({
  initialProducts,
}: {
  initialProducts: ProductVariant[];
}) {
  const router = useRouter();
  const handleOnClick = (slug: string) => {
    router.push("/catalog/" + slug);
  };
  return (
    <ul>
      {initialProducts.map((product) => {
        return (
          <li
            key={product.id}
            onClick={(e) => handleOnClick(product.product.slug)}
          >
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt_text}
              width={200}
              height={175}
              style={{ objectFit: "cover" }}
            />
            <h3>{product.price}</h3>
            <p>{product.product.name}</p>
          </li>
        );
      })}
    </ul>
  );
}
