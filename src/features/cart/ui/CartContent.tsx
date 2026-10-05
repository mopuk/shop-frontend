"use client";
import useCart from "../model/useCart";
import CartItemList from "./CartItemList";
import useAuth from "../../auth/model/useAuth";
import SummarySidebar from "./SummarySidebar";

export default function CartContent() {
  const authState = useAuth();
  const { cartItems, isPending } = useCart(authState);
  const totalPrice = cartItems.items.reduce(
    (sum, item) => sum + Number(item.price_at_addition) * item.quantity,
    0,
  );
  return (
    <div className="w-full h-full px-10 py-5 ">
      <h1 className="font-hanken font-semibold text-xl text-primary ml-6 mb-2">
        Корзина
      </h1>
      <div className="grid grid-cols-[2fr_1fr] gap-4">
        {isPending ? (
          <div>Корзина загружается...</div>
        ) : (
          <>
            <CartItemList items={cartItems.items} />
            <SummarySidebar totalPrice={totalPrice} />
          </>
        )}
      </div>
    </div>
  );
}
