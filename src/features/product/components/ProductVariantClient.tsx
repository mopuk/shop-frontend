"use client";

import { ProductPageData } from "@/src/entities/product/model/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductVariantClient({
  data,
}: {
  data: ProductPageData;
}) {
  const router = useRouter();
  const { product, variants, selectedVariant } = data;
  return (
    <div className="min-h-screen">
      <div>
        {selectedVariant?.images.length >= 1 && (
          <Image
            src={selectedVariant?.images[0].url}
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
