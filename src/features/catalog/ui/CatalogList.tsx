"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductVariant } from "@/src/entities/product//model/types";
import useProductVariantsQuery from "@/src/entities/product/api/use-products";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/src/components/ui/combobox";

import { parseFilters } from "@/src/shared/lib/parse-filters";

const sortingOptions = [
  { value: "newest", label: "Newest Arrivals" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A-Z" },
  { value: "name_desc", label: "Name: Z-A" },
];

export default function CatalogList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleOnClick = (slug: string, variantId: number) => {
    router.push(`/product/${slug}/${variantId}`);
  };

  const { data: variants, isPending, error } = useProductVariantsQuery();

  const sortingOption: string = parseFilters(searchParams).sort;

  const handleOnSortingChange = (value: string) => {
    if (value === sortingOption) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
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
      <div className="flex justify-between items-center py-4">
        <h2 className="font-hanken font-bold text-xs text-neutral ">
          Showing {variants.variants.length} products
        </h2>
        <div className="flex items-center gap-2">
          <span className="font-hanken text-neutral ">SORT BY </span>
          <Combobox
            items={sortingOptions}
            itemToStringValue={(item) => item.label}
            value={
              sortingOptions.find((option) => option.value === sortingOption) ??
              null
            }
            onValueChange={(item) => {
              if (item) handleOnSortingChange(item?.value);
            }}
          >
            <ComboboxInput
              placeholder="Select sorting option"
              className="font-hanken text-black "
            />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>
      <ul className="grid grid-cols-2 xl:grid-cols-4 gap-2">
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
              className="w-70 h-100 flex flex-col items-center gap-2 cursor-pointer bg-white shadow-md rounded-lg"
            >
              <Image
                src={imageURL}
                alt={productVariant.images[0].alt_text}
                width={280}
                height={280}
                style={{ objectFit: "cover" }}
                unoptimized
              />
              <h3>{productVariant.price}</h3>
              <p>{productVariant.product.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
