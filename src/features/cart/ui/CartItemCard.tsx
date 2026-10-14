"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/src/shared/components/ui/button";
import { CartItem, CartResponse } from "@/src/entities/cart/model/types";
import changeQuantity from "../api/changeQuantity";
import removeFromCart from "../api/removeCartItem";

interface CartItemCardProps {
  item: CartItem;
  setItemToRemove: (item: CartItem) => void;
}

export default function CartItemCard({
  item,
  setItemToRemove,
}: CartItemCardProps) {
  const queryClient = useQueryClient();

  const removeItemMutation = useMutation({
    mutationFn: () => removeFromCart(item.variant.id),
    onSuccess: (cart) => {
      queryClient.setQueryData(["cart_items"], cart);
    },
  });

  const desiredQuantityRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestRequestRef = useRef<number>(0);

  const changeQuantityMutation = useMutation({
    mutationFn: async ({
      quantity,
      requestId,
    }: {
      quantity: number;
      requestId: number;
    }) => {
      const cart = await changeQuantity(item.variant.id, quantity);
      return { cart, requestId };
    },
    onSuccess: ({ cart, requestId }) => {
      if (requestId !== latestRequestRef.current) return;
      queryClient.setQueryData<CartResponse>(["cart_items"], cart);
      desiredQuantityRef.current = null;
    },
  });

  const handleChangeQuantity = (delta: number) => {
    const cart = queryClient.getQueryData<CartResponse>(["cart_items"]);
    if (!cart) return;

    const currentItem = cart.items.find(
      (cartItem: CartItem) => cartItem.variant.id === item.variant.id,
    );
    if (!currentItem) return;

    if (desiredQuantityRef.current === null) {
      desiredQuantityRef.current = currentItem.quantity;
    }

    desiredQuantityRef.current += delta;

    if (desiredQuantityRef.current < 1) {
      desiredQuantityRef.current = currentItem.quantity;
      setItemToRemove(item);
      return;
    }

    const newQuantity = desiredQuantityRef.current;

    queryClient.setQueryData<CartResponse>(["cart_items"], {
      ...cart,
      items: cart.items.map((cartItem: CartItem) => {
        if (cartItem.variant.id !== item.variant.id) return cartItem;
        return { ...cartItem, quantity: newQuantity };
      }),
    });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const requestId = ++latestRequestRef.current;
    timeoutRef.current = setTimeout(() => {
      changeQuantityMutation.mutate({ quantity: newQuantity, requestId });
    }, 300);
  };

  const hasPriceChanged =
    Number(item.variant.variant_price) !== Number(item.price_at_addition);

  return (
    <li className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-neutral/15 bg-background shadow-2xs list-none">
      <div className="relative w-full sm:w-32 h-36 rounded-lg overflow-hidden shrink-0 border border-neutral/10 bg-tertiary flex items-center justify-center">
        {item.variant.thumbnail ? (
          <Image
            src={item.variant.thumbnail}
            alt={item.variant.product.name}
            fill
            sizes="128px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div
            className="w-14 h-14 rounded-full border border-secondary/10 shadow-xs"
            style={{ backgroundColor: item.variant.color.hex_code }}
          />
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 gap-4">
        <div className="flex flex-col gap-1">
          <Link
            href={`/product/${item.variant.product.slug}?variant=${item.variant.id}`}
            className="font-montserrat font-medium text-xs text-secondary hover:text-primary transition-colors line-clamp-2"
          >
            {item.variant.product.name}
          </Link>

          <div className="flex items-center gap-2 mt-1">
            <span
              className="w-3 h-3 rounded-full border border-black/10 shrink-0"
              style={{ backgroundColor: item.variant.color.hex_code }}
              aria-hidden="true"
            />
            <span className="font-montserrat text-xs text-neutral">
              {item.variant.color.slug}
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-hanken font-bold text-sm text-primary">
              {item.variant.variant_price.toLocaleString("ru-RU")} ₽
            </span>
            {hasPriceChanged && (
              <del className="font-hanken text-xs text-neutral">
                {Number(item.price_at_addition).toLocaleString("ru-RU")} ₽
              </del>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral/10">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Удалить из корзины"
            disabled={removeItemMutation.isPending}
            onClick={() => removeItemMutation.mutate()}
            className="h-9 w-9 text-neutral hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <div className="flex items-center rounded-lg border border-neutral/20 bg-tertiary">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Уменьшить количество"
              className="h-8 w-8 text-secondary hover:bg-neutral/10 rounded-r-none"
              onClick={() => handleChangeQuantity(-1)}
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <span className="w-10 text-center font-hanken font-semibold text-xs text-secondary select-none">
              {item.quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Увеличить количество"
              className="h-8 w-8 text-secondary hover:bg-neutral/10 rounded-l-none"
              onClick={() => handleChangeQuantity(1)}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}
