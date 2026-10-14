"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface BrandItem {
  id: number;
  name: string;
  slug: string;
}

interface BrandsResponse {
  brands: BrandItem[];
}

export default function Brands() {
  const { data, isPending, error } = useQuery<BrandsResponse>({
    queryKey: ["homepageBrands"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/brands`,
      );
      if (!response.ok) {
        throw new Error("Не удалось загрузить бренды");
      }
      return response.json();
    },
  });

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full font-montserrat">
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-neutral/10">
        <div>
          <h2 className="font-montserrat font-bold text-lg sm:text-xl text-secondary">
            Бренды
          </h2>
          <div className="bg-primary w-12 h-1 rounded-full mt-2" />
        </div>
        <Link
          href="/brands"
          className="inline-flex items-center gap-1.5 font-hanken font-semibold text-xs text-neutral hover:text-primary transition-colors"
        >
          <span>Все бренды</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {error ? (
        <div className="p-6 rounded-xl border border-red-200 bg-red-50 text-red-800 text-xs">
          {error.message}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {isPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 w-full animate-pulse rounded-2xl border border-neutral/15 bg-tertiary"
                />
              ))
            : data?.brands.slice(0, 3).map((brand) => (
                <Link
                  key={brand.id}
                  href={`/catalog?brands=${encodeURIComponent(brand.slug)}`}
                  className="flex items-center justify-center p-6 rounded-2xl border border-neutral/15 bg-background text-center font-hanken font-bold text-xs text-secondary hover:border-primary hover:text-primary hover:shadow-xs transition-all duration-200"
                >
                  {brand.name}
                </Link>
              ))}
        </div>
      )}
    </section>
  );
}
