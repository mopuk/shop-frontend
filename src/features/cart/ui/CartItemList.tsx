"use client";

import { CartItem } from "@/src/entities/cart/model/types";
import CartItemCard from "./CartItemCard";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import removeFromCart from "../api/removeCartItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UnauthorizedError } from "../api/addCartItem";

export default function CartItemList({ items }: { items: CartItem[] }) {
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const queryClient = useQueryClient();
  const removeItemMutation = useMutation({
    mutationFn: (variantId: number) => removeFromCart(variantId),
    onSuccess: (cart) => {
      queryClient.setQueryData(["cart_items"], cart);
      setItemToRemove(null);
    },
  });
  return (
    <div className="relative">
      {itemToRemove && (
        <div className="absolute top-1/2 left-1/2 translate-1/2 bg-white shadow-2xl">
          <h2>Вы уверены, что хотите удалить товар из корзины?</h2>
          <div className="flex justify-between">
            <Button
              className="bg-neutral"
              onClick={() => setItemToRemove(null)}
            >
              Отмена
            </Button>
            <Button
              className="bg-red-500"
              onClick={async () => {
                try {
                  removeItemMutation.mutate(itemToRemove.variant.id);
                } catch (err) {
                  if (
                    err instanceof Error ||
                    err instanceof UnauthorizedError
                  ) {
                    setError({ message: err.message });
                  }
                }
              }}
            >
              Удалить
            </Button>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute bottom-0 right-0 bg-gray-200 shadow-lg">
          {error.message}
        </div>
      )}
      {items.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              setItemToRemove={setItemToRemove}
            />
          ))}
        </ul>
      ) : (
        <div>No items in cart</div>
      )}
    </div>
  );
}
