"use client";

import useProductVariants from "@/src/entities/product/api/useProducts";
import { ProductVariantWithProduct } from "@/src/entities/product/model/types";
import {
  parseFilters,
  SearchParamsInput,
  toURLSearchParams,
} from "@/src/shared/lib/parse-filters";
import { useRouter } from "next/navigation";
import CatalogHeader from "./CatalogHeader";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

export default function CatalogList({
  searchParams,
}: {
  searchParams: SearchParamsInput;
}) {
  const router = useRouter();
  const filters = parseFilters(searchParams);

  const { data, isPending, error } = useProductVariants(filters);

  const sortingOption: string = filters.sort;
  const limitOption: number = filters.limit;

  const handleOnClick = (slug: string, variantId: number) => {
    router.push(`/product/${slug}?variant=${variantId}`);
  };

  const handleOnSortingChange = (value: string) => {
    if (value === sortingOption) return;

    const params = new URLSearchParams(
      toURLSearchParams(searchParams)?.toString(),
    );
    params.set("sort", value);
    params.set("offset", "0");
    router.replace(`?${params.toString()}`);
  };

  const handleOnLimitChange = (value: number) => {
    if (value === limitOption) return;

    const params = new URLSearchParams(
      toURLSearchParams(searchParams)?.toString(),
    );
    params.set("limit", String(value));
    params.set("offset", "0");
    router.replace(`?${params.toString()}`);
  };

  if (isPending)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <CatalogHeader
        dataLength={data?.pagination.total_items || 0}
        sortingOption={sortingOption}
        limitOption={limitOption}
        handleOnSortingChange={handleOnSortingChange}
        handleOnLimitChange={handleOnLimitChange}
      />
      <ul className="grid grid-cols-2 xl:grid-cols-4 gap-x-2 gap-y-4 justify-items-center">
        {data?.variants.map((productVariant: ProductVariantWithProduct) => {
          return (
            <ProductCard
              key={productVariant.id}
              productVariant={productVariant}
              onClick={handleOnClick}
            />
          );
        })}
      </ul>
      <Pagination pagination={data?.pagination} searchParams={searchParams} />
    </div>
  );
}
