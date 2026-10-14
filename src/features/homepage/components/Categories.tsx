"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

interface CategoriesResponse {
  categories: CategoryItem[];
}

export default function Categories() {
  const { data, isPending, error } = useQuery<CategoriesResponse>({
    queryKey: ["homepageCategories"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/categories`,
      );
      if (!response.ok) {
        throw new Error("Не удалось загрузить категории");
      }
      return response.json();
    },
  });

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full font-montserrat">
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-neutral/10">
        <div>
          <h2 className="font-montserrat font-bold text-lg sm:text-xl text-secondary">
            Категории
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
        <div className="p-6 rounded-xl border border-red-200 bg-red-50 text-red-800 text-xs">
          {error.message}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {isPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-24 w-full animate-pulse rounded-2xl border border-neutral/15 bg-tertiary"
                />
              ))
            : data?.categories.slice(0, 3).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/catalog?categories=${encodeURIComponent(cat.slug)}`}
                  className="group relative flex items-center justify-between p-6 sm:p-8 rounded-2xl border border-neutral/15 bg-tertiary hover:bg-background hover:border-primary hover:shadow-md transition-all duration-200"
                >
                  <span className="font-montserrat font-bold text-xs sm:text-sm text-secondary group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral/20 bg-background text-secondary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </Link>
              ))}
        </div>
      )}
    </section>
  );
}
