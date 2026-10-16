"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, AlertCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/src/shared/components/ui/button";
import { CartItem } from "@/src/entities/cart/model/types";
import removeFromCart from "../api/removeCartItem";
import CartItemCard from "./CartItemCard";

export default function CartItemList({ items }: { items: CartItem[] }) {
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const removeItemMutation = useMutation({
    mutationFn: (variantId: number) => removeFromCart(variantId),
    onSuccess: (cart) => {
      queryClient.setQueryData(["cart_items"], cart);
      setItemToRemove(null);
    },
    onError: (err: Error) => {
      setError(err.message || "Не удалось удалить товар");
    },
  });

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl border border-dashed border-neutral/30 text-center">
        <div className="w-12 h-12 rounded-full bg-tertiary flex items-center justify-center text-neutral mb-3">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h3 className="font-hanken font-bold text-sm text-secondary">
          Ваша корзина пуста
        </h3>
        <p className="font-montserrat text-xs text-neutral mt-1 mb-6">
          Выберите товары в каталоге, чтобы оформить заказ.
        </p>
        <Button className="bg-primary text-white hover:bg-primary/90 font-hanken text-xs">
          <Link href="/catalog">Перейти к покупкам</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      {itemToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-xl border border-neutral/20 bg-background p-6 shadow-xl">
            <h3 className="font-hanken font-bold text-sm text-secondary">
              Удалить товар?
            </h3>
            <p className="font-montserrat text-xs text-neutral mt-2">
              Вы действительно хотите убрать «
              {itemToRemove.variant.product.name}» из корзины?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="font-hanken text-xs border-neutral/20"
                onClick={() => setItemToRemove(null)}
              >
                Отмена
              </Button>
              <Button
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white font-hanken text-xs"
                disabled={removeItemMutation.isPending}
                onClick={() =>
                  removeItemMutation.mutate(itemToRemove.variant.id)
                }
              >
                Удалить
              </Button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-red-800">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          <p className="font-montserrat text-xs">{error}</p>
        </div>
      )}

      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            setItemToRemove={setItemToRemove}
          />
        ))}
      </ul>
    </div>
  );
}
