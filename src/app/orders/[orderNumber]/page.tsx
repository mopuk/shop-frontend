"use client";

import { Button } from "@/src/components/ui/button";
import { Order } from "@/src/entities/order/model/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const orderNumber = Array.isArray(params.orderNumber)
    ? params.orderNumber[0]
    : params.orderNumber;
  const [order, setOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigationPending, setIsNavigationPending] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      if (!tokenType || !accessToken) {
        router.push("/login");
      }

      setIsLoading(true);
      const responce = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + `/api/v1/orders/${orderNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenType} ${accessToken}`,
          },
        },
      );

      if (responce.ok) {
        const order = await responce.json();
        setOrder(order);
      }

      if (responce.status == 401) {
        router.push("/login");
      }

      if (responce.status == 404) {
        router.push("/cart");
      }
      setIsLoading(false);
    }

    fetchOrder();
  }, [orderNumber, router]);

  const handlePayment = () => {
    setIsNavigationPending(true);
    router.push(window.location + "/payment");
    setIsNavigationPending(false);
  };

  return (
    <div>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : order ? (
        <div>
          <h1>Заказ: {order.order_number}</h1>
          <div>Статус: {order.status}</div>
          {(order.status == "processing" || order.status == "created") && (
            <Button
              className={`bg-primary px-4 py-2 font-hanken spinner-container ${isNavigationPending ? "bg-green-200 hover:cursor-wait" : ""}`}
              onClick={handlePayment}
              disabled={isNavigationPending}
            >
              Оплатить
              {isNavigationPending && <span className="spinner"></span>}
            </Button>
          )}
        </div>
      ) : (
        <div>Заказ не найден</div>
      )}
    </div>
  );
}
