"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ProductVariantWithProduct } from "@/src/entities/product/model/types";

export default function Featured() {
  const { data, isPending, error } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/products?featured=true`,
      );
      if (!response.ok)
        throw new Error("Не удалось загрузить избранные товары");
      return await response.json();
    },
  });

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-neutral/10">
        <div>
          <h2 className="font-montserrat font-bold text-lg sm:text-xl text-secondary">
            Избранные модели
          </h2>
          <div className="bg-primary w-12 h-1 rounded-full mt-2" />
        </div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 font-hanken font-semibold text-xs text-neutral hover:text-primary transition-colors"
        >
          <span>Весь каталог</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {error ? (
        <div className="p-6 rounded-xl border border-red-200 bg-red-50 text-red-800 text-xs font-montserrat">
          {error.message}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-80 w-full animate-pulse rounded-2xl border border-neutral/15 bg-tertiary"
                />
              ))
            : data?.variants
                ?.slice(0, 3)
                .map((variant: ProductVariantWithProduct) => (
                  <FeaturedCard
                    key={variant.id}
                    title={variant.product.name}
                    imageUrl={variant.thumbnail ?? ""}
                    slug={variant.product.slug}
                    variantId={variant.id}
                    price={variant.variant_price}
                    colorHex={variant.color?.hex_code}
                  />
                ))}
        </div>
      )}
    </section>
  );
}

export function FeaturedCard({
  title,
  imageUrl,
  slug,
  variantId,
  price,
  colorHex,
}: {
  title: string;
  imageUrl: string;
  slug: string;
  variantId: number;
  price?: number;
  colorHex?: string;
}) {
  return (
    <Link
      href={`/product/${slug}?variant=${variantId}`}
      className="group flex flex-col rounded-2xl border border-neutral/15 bg-background overflow-hidden shadow-2xs hover:shadow-md hover:border-neutral/30 transition-all duration-200"
    >
      <div className="relative w-full h-56 bg-tertiary flex items-center justify-center border-b border-neutral/10">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-102 transition-transform duration-300"
            unoptimized
          />
        ) : (
          <div
            className="w-20 h-20 rounded-full border border-secondary/10 shadow-xs"
            style={{ backgroundColor: colorHex ?? "#e5e7eb" }}
          />
        )}
      </div>

      <div className="flex flex-col p-5 gap-2">
        <h3 className="font-montserrat font-medium text-xs sm:text-sm text-secondary group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>
        {price !== undefined && (
          <span className="font-hanken font-bold text-xs text-primary">
            {price.toLocaleString("ru-RU")} ₽
          </span>
        )}
      </div>
    </Link>
  );
}
