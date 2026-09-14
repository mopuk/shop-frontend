"use client";
import useCart from "../model/useCart";
import CartItemList from "./CartItemList";
import useAuth from "../../auth/model/useAuth";

export default function CartContent() {
  const authState = useAuth();
  const { cartItems, isPending } = useCart(authState);
  if (isPending) return <div>Cart loading</div>;
  return <CartItemList items={cartItems.items} />;
}
