"use client";

import { useQuery } from "@tanstack/react-query";
import { OrdersData, OrderStatus, OrderType } from "../model/types";

export default function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async (): Promise<OrdersData> => {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/v1/orders",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenType} ${accessToken}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const json = await response.json();
      const orders = json.orders;
      const activeOrders = orders.filter((order: OrderType) =>
        [
          OrderStatus.created,
          OrderStatus.processing,
          OrderStatus.paid,
        ].includes(order.status),
      );
      const pastOrders = orders.filter(
        (order: OrderType) => order.status === OrderStatus.delivered,
      );
      return { activeOrders, pastOrders };
    },
  });
}
