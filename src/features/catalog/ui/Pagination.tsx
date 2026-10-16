"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import { Pagination as PaginationType } from "@/src/entities/product/model/types";
import {
  parseFilters,
  SearchParamsInput,
  toURLSearchParams,
} from "@/src/shared/lib/parse-filters";

interface PaginationProps {
  pagination: PaginationType | undefined;
  searchParams: SearchParamsInput;
}

export default function Pagination({
  pagination,
  searchParams,
}: PaginationProps) {
  if (!pagination || pagination.total_pages <= 1) return null;

  const { limit } = parseFilters(searchParams);
  const {
    current_page: current,
    total_pages: total,
    has_previous,
    has_next,
  } = pagination;

  const createPageUrl = (page: number) => {
    const params = toURLSearchParams(searchParams);
    params.set("offset", String((page - 1) * limit));
    return `?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    pages.push(1);

    if (current > 3) {
      pages.push("ellipsis-start");
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push("ellipsis-end");
    }

    pages.push(total);

    return pages;
  };

  return (
    <nav
      role="navigation"
      aria-label="Навигация по страницам"
      className="flex items-center justify-center gap-1 my-8 font-montserrat"
    >
      <Button
        disabled={!has_previous}
        variant="outline"
        size="icon"
        aria-label="Предыдущая страница"
        className="h-10 w-10 border-neutral/20 text-secondary hover:bg-tertiary disabled:opacity-30 disabled:border-neutral/10"
      >
        {has_previous ? (
          <Link href={createPageUrl(current - 1)} scroll={false}>
            <ChevronLeft className="h-5 w-5" />
          </Link>
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((item) => {
          if (typeof item === "string") {
            return (
              <span
                key={item}
                className="flex h-10 w-10 items-center justify-center text-neutral"
                aria-hidden="true"
              >
                <MoreHorizontal className="h-5 w-5" />
              </span>
            );
          }

          const isCurrent = item === current;

          return (
            <Button
              key={item}
              variant={isCurrent ? "default" : "outline"}
              size="icon"
              aria-current={isCurrent ? "page" : undefined}
              className={`h-10 w-10 text-xs font-semibold ${
                isCurrent
                  ? "pointer-events-none bg-primary border-primary text-white shadow-xs"
                  : "border-neutral/20 text-secondary hover:bg-tertiary hover:border-neutral/40"
              }`}
            >
              {isCurrent ? (
                <span>{item}</span>
              ) : (
                <Link href={createPageUrl(item)} scroll={false}>
                  {item}
                </Link>
              )}
            </Button>
          );
        })}
      </div>

      <Button
        disabled={!has_next}
        variant="outline"
        size="icon"
        aria-label="Следующая страница"
        className="h-10 w-10 border-neutral/20 text-secondary hover:bg-tertiary disabled:opacity-30 disabled:border-neutral/10"
      >
        {has_next ? (
          <Link href={createPageUrl(current + 1)} scroll={false}>
            <ChevronRight className="h-5 w-5" />
          </Link>
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </Button>
    </nav>
  );
}
