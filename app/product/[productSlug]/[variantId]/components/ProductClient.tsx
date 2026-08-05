"use client";

import { Product, ProductVariant } from "@/app/catalog/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductClient({
  product,
  variant,
}: {
  product: Product;
  variant: ProductVariant;
}) {
  const router = useRouter();
  console.log(variant);
  return (
    <div>
      <div>
        <Image
          src={variant.images[0].url}
          alt={variant.images[0].alt_text}
          width={300}
          height={400}
          unoptimized
        ></Image>
        <div className="flex">
          {product.variants &&
            product.variants.map((v) => (
              <div
                key={v.id}
                className={`rounded-full w-8 h-8`}
                style={{ backgroundColor: v.color.hex_code }}
                onClick={() =>
                  router.push(`/product/${v.product.slug}/${v.id}`)
                }
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}
