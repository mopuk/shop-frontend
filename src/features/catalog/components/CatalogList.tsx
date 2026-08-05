"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProductVariant } from "@/src/types.ts";

export default function CatalogList() {
  const router = useRouter();
  const handleOnClick = (slug: string, variantId: number) => {
    router.push(`/product/${slug}/${variantId} `);
  };

  const {
    data: productVariants,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product_variants"],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/v1/products",
      );
      return await response.json();
    },
  });

  if (isLoading)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <ul className="grid grid-cols-2 xl:grid-cols-3">
      {productVariants.variants.map((productVariant: ProductVariant) => {
        const imageURL = productVariant.images?.[0]?.url
          ? process.env.NEXT_PUBLIC_BACKEND_API +
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
