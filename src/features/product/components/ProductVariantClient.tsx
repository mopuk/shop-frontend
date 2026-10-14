"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  Check,
  ImageOff,
  Loader2,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/src/shared/components/ui/button";
import { ProductPageData } from "@/src/entities/product/model/types";
import useAuth from "../../auth/model/useAuth";
import useRedirect from "../../auth/model/useRedirect";
import addCartItem, { UnauthorizedError } from "../../cart/api/addCartItem";
import removeFromCart from "../../cart/api/removeCartItem";
import useCart from "../../cart/model/useCart";

interface ProductVariantClientProps {
  data: ProductPageData;
}

export default function ProductVariantClient({
  data,
}: ProductVariantClientProps) {
  const router = useRouter();
  const { product, variants, selectedVariant } = data;
  const authState = useAuth();
  const redirect = useRedirect("/signup");
  const { cartItems } = useCart(authState);
  const queryClient = useQueryClient();

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isInCart = cartItems.items.some(
    (item) => item.variant.id === selectedVariant?.id,
  );

  useEffect(() => {
    if (!selectedVariant && variants.length > 0) {
      router.replace(`/product/${product.slug}?variant=${variants[0].id}`);
    }
  }, [selectedVariant, product.slug, variants, router]);

  if (!selectedVariant) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (variants.length === 0) {
    return (
      <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-2 text-center">
        <p className="font-montserrat text-xs text-neutral">
          Для данного товара нет доступных вариантов.
        </p>
      </div>
    );
  }

  const handleCartAction = async (action: "add" | "remove") => {
    if (!authState.isAuthenticated) {
      redirect();
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        if (action === "add") {
          await addCartItem(selectedVariant.id, 1);
        } else {
          await removeFromCart(selectedVariant.id);
        }
        await queryClient.invalidateQueries({ queryKey: ["cart_items"] });
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          redirect();
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Произошла ошибка при обновлении корзины");
        }
      }
    });
  };

  const primaryImage = selectedVariant.images?.[0];
  const imageUrl = primaryImage?.url
    ? `${process.env.NEXT_PUBLIC_BACKEND_API}/static/images/${primaryImage.url}`
    : null;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <section className="lg:col-span-7">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-neutral/15 bg-tertiary flex items-center justify-center shadow-xs">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={primaryImage?.alt_text || product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div
                  className="h-44 w-44 rounded-full border border-secondary/10 shadow-lg transition-transform duration-300 hover:scale-105"
                  style={{ backgroundColor: selectedVariant.color.hex_code }}
                />
                <div className="absolute bottom-2 flex items-center gap-2 text-xs font-montserrat text-neutral">
                  <ImageOff className="h-4 w-4" />
                  <span>Фотография отсутствует</span>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="flex flex-col lg:col-span-5">
          <div className="flex items-center gap-2 font-hanken text-xs uppercase tracking-wider text-neutral">
            <span>{product.category?.name ?? "Каталог"}</span>
            {product.brand && (
              <>
                <span className="text-neutral/40">•</span>
                <span className="text-secondary font-semibold">
                  {product.brand.name}
                </span>
              </>
            )}
          </div>
          <h1 className="mt-2 font-montserrat text-lg font-bold text-secondary">
            {product.name}
          </h1>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-hanken text-xl font-bold text-primary">
              {selectedVariant.variant_price.toLocaleString("ru-RU")} ₽
            </span>
          </div>

          <hr className="my-6 border-neutral/10" />
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-hanken text-xs font-semibold uppercase tracking-wider text-secondary">
                Цвет
              </span>
              <span className="font-montserrat text-xs text-neutral">
                {selectedVariant.color.name || selectedVariant.color.slug}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {variants.map((v) => {
                const isSelected = v.id === selectedVariant.id;

                return (
                  <Link
                    key={v.id}
                    href={`/product/${product.slug}?variant=${v.id}`}
                    scroll={false}
                    aria-label={`Выбрать цвет: ${v.color.name || v.color.slug}`}
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      isSelected
                        ? "ring-2 ring-primary ring-offset-2"
                        : "ring-1 ring-black/15 hover:scale-105"
                    }`}
                    style={{ backgroundColor: v.color.hex_code }}
                  >
                    {isSelected && (
                      <Check
                        className={`h-4 w-4 stroke-[2.5] ${
                          v.color.slug === "white"
                            ? "text-secondary"
                            : "text-white"
                        }`}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          {selectedVariant.size && (
            <div className="mt-6 flex flex-col gap-3">
              <span className="font-hanken text-xs font-semibold uppercase tracking-wider text-secondary">
                Размер
              </span>
              <div className="flex h-11 w-16 items-center justify-center rounded-lg border border-primary bg-primary text-xs font-hanken font-medium text-white shadow-xs">
                {selectedVariant.size.name}
              </div>
            </div>
          )}
          <div className="mt-8 flex flex-col gap-3">
            {isInCart ? (
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => handleCartAction("remove")}
                className="h-14 w-full border-red-200 text-xs font-hanken font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-5 w-5" />
                )}
                Удалить из корзины
              </Button>
            ) : (
              <Button
                type="button"
                disabled={isPending}
                onClick={() => handleCartAction("add")}
                className="h-14 w-full bg-primary text-xs font-hanken font-semibold text-white shadow-xs hover:bg-primary/90"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <ShoppingBag className="mr-2 h-5 w-5" />
                )}
                Добавить в корзину
              </Button>
            )}

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-red-800">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <p className="font-montserrat text-xs">{error}</p>
              </div>
            )}
          </div>
          {product.description && (
            <div className="mt-10 border-t border-neutral/10 pt-6">
              <h2 className="font-hanken text-xs font-semibold uppercase tracking-wider text-secondary">
                Описание товара
              </h2>
              <p className="mt-3 font-montserrat text-xs leading-relaxed text-neutral whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
