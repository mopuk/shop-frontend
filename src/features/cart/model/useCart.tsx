"use client";

import getCart from "@/src/entities/cart/api/getCart";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { AuthState } from "../../auth/model/types";
import syncLocalCart from "./syncLocalCart";

export default function useCart(authState: AuthState) {
  const { data: cartItems = { items: [] }, isPending } = useQuery({
    queryKey: ["cart_items"],
    queryFn: getCart,
    enabled: authState.isAuthenticated,
  });

  useEffect(() => {
    if (localStorage.getItem("cartItems")) {
      syncLocalCart();
    }
  }, []);

  if (authState.isAuthenticated) {
  }

  return {
    cartItems,
    isPending,
  };
}
