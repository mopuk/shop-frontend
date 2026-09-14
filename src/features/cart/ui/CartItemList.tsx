"use client";

import { CartItem } from "@/src/entities/cart/model/types";
import CartItemCard from "./CartItemCard";

export default function CartItemList({ items }: { items: CartItem[] }) {
  return (
    <div>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <div>No items in cart</div>
      )}
    </div>
  );
}
