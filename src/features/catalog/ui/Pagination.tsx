"use client";

import { Button } from "@/src/components/ui/button";
import { Pagination as PaginationType } from "@/src/entities/product/model/types";
import {
  parseFilters,
  SearchParamsInput,
  toURLSearchParams,
} from "@/src/shared/lib/parse-filters";
import { useRouter } from "next/navigation";

export default function Pagination({
  pagination,
  searchParams,
}: {
  pagination: PaginationType | undefined;
  searchParams: SearchParamsInput;
}) {
  const router = useRouter();
  const { limit } = parseFilters(searchParams);
  const handleOnClick = (page: number) => {
    const params = toURLSearchParams(searchParams);
    params.set("offset", String((page - 1) * limit));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  if (!pagination || pagination.total_pages <= 1) return null;
  return (
    <div className="flex justify-center gap-2 my-4">
      {pagination.current_page > 2 && (
        <Button onClick={() => handleOnClick(1)}>1</Button>
      )}
      {pagination.has_previous && (
        <Button onClick={() => handleOnClick(pagination.current_page - 1)}>
          ⬅
        </Button>
      )}
      <Button>{pagination.current_page}</Button>
      {pagination.has_next && (
        <Button onClick={() => handleOnClick(pagination.current_page + 1)}>
          ➡
        </Button>
      )}
      {pagination.current_page < pagination.total_pages - 1 && (
        <Button onClick={() => handleOnClick(pagination.total_pages)}>
          {pagination.total_pages}
        </Button>
      )}
    </div>
  );
}
