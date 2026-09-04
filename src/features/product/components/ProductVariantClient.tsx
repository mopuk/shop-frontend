"use client";

import { ProductPageData } from "@/src/entities/product/model/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProductVariantClient({
  data,
}: {
  data: ProductPageData;
}) {
  const router = useRouter();
  const { product, variants, selectedVariant } = data;

  useEffect(() => {
    if (!selectedVariant) {
      router.replace(`/product/${product.slug}?variant=${variants[0].id}`);
    }
  }, [selectedVariant, product.slug, variants, router]);

  if (variants.length === 0) {
    return <div>No variants for this product</div>;
  }

  return (
    <div className="min-h-screen">
      <div>
        {selectedVariant?.images.length >= 1 && (
          <Image
            src={
              selectedVariant?.images?.[0]?.url
                ? process.env.NEXT_PUBLIC_BACKEND_API +
                  "/static/images/" +
                  selectedVariant.images[0].url
                : ""
            }
            alt={selectedVariant?.images[0].alt_text}
            width={300}
            height={400}
            unoptimized
          ></Image>
        )}
        <div>
          <h1>{product.name}</h1>
          <div>{product.description}</div>
        </div>
        <div className="flex">
          {variants &&
            variants.map((v) => (
              <div
                key={v.id}
                className={`rounded-full w-8 h-8`}
                style={{ backgroundColor: v.color.hex_code }}
                onClick={() =>
                  router.push(`/product/${product.slug}?variant=${v.id}`)
                }
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}
