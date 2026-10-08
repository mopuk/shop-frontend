"use client";

import { Button } from "@/src/components/ui/button";
import { CartItem, CartResponse } from "@/src/entities/cart/model/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import changeQuantity from "../api/changeQuantity";
import removeFromCart from "../api/removeCartItem";

export default function CartItemCard({
  item,
  setItemToRemove,
}: {
  item: CartItem;
  setItemToRemove: (item: CartItem) => void;
}) {
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
    onSuccess: ({
      cart,
      requestId,
    }: {
      cart: CartResponse;
      requestId: number;
    }) => {
      if (requestId !== latestRequestRef.current) return;
      queryClient.setQueryData<CartResponse>(["cart_items"], cart);
      desiredQuantityRef.current = null;
    },
  });

  return (
    <div className="flex gap-4 shadow-lg p-2 rounded-lg">
      {item.variant.thumbnail ? (
        <Image
          src={item.variant.thumbnail}
          width={150}
          height={200}
          alt={item.variant.product.name}
        />
      ) : (
        <div className="w-45 h-50 flex justify-center items-center from-neutral-100 to-neutral-200 bg-linear-to-b rounded-lg">
          Нет изображения
        </div>
      )}
      <div className="flex flex-col justify-between w-full">
        <div>
          <Link
            href={`product/${item.variant.product.slug}?variant=${item.variant.id}`}
          >
            <h2 className="font-montserrat text-sm text-black">
              {item.variant.product.name}
            </h2>
          </Link>
          <h3 className="font-hanken text-sm text-primary">
            {item.variant.variant_price}{" "}
            {item.variant.variant_price != Number(item.price_at_addition) && (
              <del className="text-neutral">{item.price_at_addition}</del>
            )}
          </h3>
        </div>
        <div className="flex items-center self-end gap-2">
          <Button
            variant={"outline"}
            className="w-12 h-12 p-2"
            onClick={() => removeItemMutation.mutate()}
          >
            <Image
              src="/images/trashcan.svg"
              alt="Удалить из корзины"
              width={24}
              height={24}
            />
          </Button>
          <Button
            variant={"outline"}
            className="w-12 h-12 p-2"
            onClick={() => handleChangeQuantity(-1)}
          >
            <Image
              src="/images/minus.svg"
              width={24}
              height={24}
              alt="Уменьшить количество"
            />
          </Button>
          <div className="w-12 h-12 font-hanken text-lg text-neutral text-center align-middle ">
            {item.quantity}
          </div>
          <Button
            variant={"outline"}
            className="w-12 h-12 p-2 text-2xl font-bold text-primary"
            onClick={() => handleChangeQuantity(1)}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
