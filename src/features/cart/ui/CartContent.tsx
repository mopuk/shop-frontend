"use client";

import useAuth from "../../auth/model/useAuth";
import useCart from "../model/useCart";
import CartItemList from "./CartItemList";
import SummarySidebar from "./SummarySidebar";

export default function CartContent() {
  const authState = useAuth();
  const { cartItems, isPending } = useCart(authState);

  const totalPrice = cartItems.items.reduce(
    (sum, item) => sum + Number(item.price_at_addition) * item.quantity,
    0,
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-hanken font-bold text-xl text-secondary mb-6">
        Корзина
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {isPending ? (
          <>
            <div className="lg:col-span-8 flex flex-col gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-36 w-full animate-pulse rounded-xl border border-neutral/15 bg-tertiary"
                />
              ))}
            </div>
            <div className="lg:col-span-4 h-56 w-full animate-pulse rounded-xl border border-neutral/15 bg-tertiary" />
          </>
        ) : (
          <>
            <section className="lg:col-span-8">
              <CartItemList items={cartItems.items} />
            </section>
            <aside className="lg:col-span-4 sticky top-6">
              <SummarySidebar totalPrice={totalPrice} />
            </aside>
          </>
        )}
      </div>
    </main>
  );
}
