"use client";

import { Button } from "@/src/components/ui/button";
import { ProductPageData } from "@/src/entities/product/model/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import addCartItem, { UnauthorizedError } from "../../cart/api/addCartItem";
import useAuth from "../../auth/model/useAuth";
import useRedirect from "../../auth/model/useRedirect";
import removeFromCart from "../../cart/api/removeCartItem";
import useCart from "../../cart/model/useCart";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductVariantClient({
  data,
}: {
  data: ProductPageData;
}) {
  const router = useRouter();
  const { product, variants, selectedVariant } = data;
  const authState = useAuth();
  const redirect = useRedirect("/signup");
  const { cartItems } = useCart(authState);
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const isInCart = cartItems.items.some(
    (item) => item.variant.id === selectedVariant?.id,
  );

  useEffect(() => {
    if (!selectedVariant) {
      if (variants.length > 0) {
        router.replace(`/product/${product.slug}?variant=${variants[0].id}`);
      }
    }
  }, [selectedVariant, product.slug, variants, router]);

  if (!selectedVariant) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }
  if (variants.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        No variants for this product
      </div>
    );
  }
  const handleAddToCart = async () => {
    if (!authState.isAuthenticated) {
      redirect();
      return;
    }

    try {
      await addCartItem(selectedVariant.id, 1);
      await queryClient.invalidateQueries({ queryKey: ["cart_items"] });
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        redirect();
        return;
      } else if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleRemoveFromCart = async () => {
    if (!authState.isAuthenticated) {
      redirect();
      return;
    }

    try {
      await removeFromCart(selectedVariant.id);
      await queryClient.invalidateQueries({ queryKey: ["cart_items"] });
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        redirect();
        return;
      } else if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  return (
    <div className="min-h-screen relative">
      <div className="grid-cols-3">
        {selectedVariant?.images.length >= 1 ? (
          <Image
            src={
              selectedVariant?.images?.[0]?.url
                ? process.env.NEXT_PUBLIC_BACKEND_API +
                  "/static/images/" +
                  selectedVariant.images[0].url
                : ""
            }
            alt={selectedVariant?.images[0].alt_text}
            width={300}
            height={400}
            unoptimized
          ></Image>
        ) : (
          <div className="w-75 h-100 flex items-center justify-center from-neutral-100 to-neutral-200 bg-linear-to-b rounded-t-lg">
            Нет изображения
          </div>
        )}
        <div>
          <h1>{product.name}</h1>
          <div>{product.description}</div>
        </div>
        <div className="flex">
          {variants &&
            variants.map((v) => (
              <div
                key={v.id}
                className={`rounded-full w-8 h-8`}
                style={{ backgroundColor: v.color.hex_code }}
                onClick={() =>
                  router.push(`/product/${product.slug}?variant=${v.id}`)
                }
              ></div>
            ))}
        </div>
        {isInCart ? (
          <Button onClick={handleRemoveFromCart}>Удалить из корзины</Button>
        ) : (
          <Button onClick={handleAddToCart}>Добавить в корзину</Button>
        )}
      </div>
      {error && <div className="absolute bottom-0 right-0">{error}</div>}
    </div>
  );
}
