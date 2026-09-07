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
  const handleOnClick = (slug: string, variantId: number) => {
    router.push(`/product/${slug}?variant=${variantId}`);
  };

  const { data, isPending, error } = useProductVariants(searchParams);

  const sortingOption: string = parseFilters(searchParams).sort;
  const numberOption: number = parseFilters(searchParams).limit;

  const handleOnSortingChange = (value: string) => {
    if (value === sortingOption) return;

    const params = new URLSearchParams(
      toURLSearchParams(searchParams)?.toString(),
    );
    params.set("sort", value);
    params.set("offset", "0");
    router.replace(`?${params.toString()}`);
  };

  const handleOnNumberChange = (value: number) => {
    if (value === numberOption) return;

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
        numberOption={numberOption}
        handleOnSortingChange={handleOnSortingChange}
        handleOnNumberChange={handleOnNumberChange}
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
