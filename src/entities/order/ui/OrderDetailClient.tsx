"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import { OrderSummary } from "@/src/entities/order/ui/OrderSummary";
import { OrderStatus, OrderType } from "@/src/entities/order/model/types";
import OrderProgressbar from "@/src/entities/order/ui/OrderProgressbar";
import OrderItemsList from "./OrderItemsList";

interface OrderDetailClientProps {
  orderNumber: string;
}

export default function OrderDetailClient({
  orderNumber,
}: OrderDetailClientProps) {
  const router = useRouter();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      if (!tokenType || !accessToken) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/orders/${orderNumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenType} ${accessToken}`,
            },
          },
        );

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        if (response.status === 404) {
          router.push("/cart");
          return;
        }

        if (response.ok) {
          const data: OrderType = await response.json();
          setOrder(data);
        }
      } catch (error) {
        console.error("Ошибка при получении заказа:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrder();
  }, [orderNumber, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h2 className="font-hanken font-bold text-sm text-secondary">
          Заказ не найден
        </h2>
        <p className="font-montserrat text-xs text-neutral mt-2 mb-6">
          Проверьте правильность номера заказа или перейдите в список покупок.
        </p>
        <Button className="bg-primary text-background font-hanken text-xs">
          <Link href="/catalog">В каталог</Link>
        </Button>
      </div>
    );
  }

  const isPayable =
    order.status === OrderStatus.created ||
    order.status === OrderStatus.processing;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 font-montserrat text-xs text-neutral hover:text-secondary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться в каталог
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
          <div>
            <h1 className="font-hanken font-bold text-lg text-secondary">
              Заказ #{order.order_number}
            </h1>
            <p className="font-montserrat text-xs text-neutral mt-0.5">
              Оформлен{" "}
              {new Date(order.created_at).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {isPayable && (
            <Link
              href={`/orders/${order.order_number}/payment`}
              className="h-11 flex gap-2 items-center rounded-xl bg-primary hover:bg-primary/90 text-background font-hanken text-xs px-6 shadow-xs"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Оплатить заказ
            </Link>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-neutral/15 bg-background p-6 shadow-2xs mb-8">
        <OrderProgressbar currentStatus={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <section className="lg:col-span-8 rounded-xl border border-neutral/15 bg-background p-6 shadow-2xs">
          <h2 className="font-hanken font-bold text-sm text-secondary mb-4">
            Состав заказа ({order.items.length})
          </h2>
          <ul className="divide-y divide-neutral/10">
            <OrderItemsList items={order.items} />
          </ul>
        </section>

        <aside className="lg:col-span-4 sticky top-6">
          <OrderSummary order={order} />
        </aside>
      </div>
    </main>
  );
}
