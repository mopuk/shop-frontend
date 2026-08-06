"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProductVariant } from "@/src/entities/product//model/types";
import useProductVariantsQuery from "@/src/entities/product/api/use-products";

export default function CatalogList() {
  const router = useRouter();
  const handleOnClick = (slug: string, variantId: number) => {
    router.push(`/product/${slug}/${variantId} `);
  };

  const { data: variants, isPending, error } = useProductVariantsQuery();

  if (isPending)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <ul className="grid grid-cols-2 xl:grid-cols-3">
      {variants.variants.map((productVariant: ProductVariant) => {
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
