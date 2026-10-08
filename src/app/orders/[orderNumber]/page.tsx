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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      const responce = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + `/api/v1/orders/${orderNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("access_token")}`,
          },
        },
      );

      if (responce.ok) {
        const order = await responce.json();
        setOrder(order);
      }

      setLoading(false);

      if (responce.status == 401) {
        router.push("/login");
      }

      if (responce.status == 404) {
        router.push("/cart");
      }
    }

    fetchOrder();
  }, [orderNumber, router]);

  const handlePayment = () => {
    router.push(window.location + "/payment");
  };

  return (
    <div>
      {loading ? (
        <div>Загрузка...</div>
      ) : order ? (
        <div>
          <h1>Заказ: {order.order_number}</h1>
          <div>Статус: {order.status}</div>
          {order.status == "processing" ||
            (order.status == "created" && (
              <Button
                className="bg-primary px-4 py-2 font-hanken"
                onClick={handlePayment}
              >
                Оплатить
              </Button>
            ))}
        </div>
      ) : (
        <div>Заказ не найден</div>
      )}
    </div>
  );
}
