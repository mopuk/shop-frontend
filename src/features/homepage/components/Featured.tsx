"use client";
import { useQuery } from "@tanstack/react-query";
import FeaturedCard from "./FeaturedCard";
import Link from "next/link";
import Image from "next/image";
import { ProductVariantWithProduct } from "@/src/entities/product/model/types";

export default function Featured() {
  const { data, isPending, error } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/v1/products?featured=true",
      );
      return await response.json();
    },
  });

  if (error) return <div>{error.message}</div>;

  return (
    <div className="w-full px-55 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-montserrat font-bold text-2xl">Featured Items</h2>
          <div className="bg-primary w-16 h-2 rounded-xl"></div>
        </div>
        <Link
          href="/catalog"
          className="flex gap-2 font-hanken text-neutral text-sm"
        >
          View catalog
          <Image
            src="/images/right_arrow.svg"
            alt="right arrow"
            width={12}
            height={12}
          />{" "}
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-10 mt-6 text-center">
        {isPending
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-green-200 font-montserrat font-semibold text-neutral text-xl py-7 rounded-xl flex items-center justify-center text-center"
              >
                <div className="spinner-container h-8">
                  <div className="spinner h-8"></div>
                </div>
              </div>
            ))
          : data.variants
              .slice(0, 3)
              .map((variant: ProductVariantWithProduct) => (
                <FeaturedCard
                  title={variant.product.name}
                  image_url={variant.thumbnail ?? ""}
                  slug={variant.product.slug}
                  variant_id={variant.id}
                  key={variant.id}
                />
              ))}
      </div>
    </div>
  );
}
