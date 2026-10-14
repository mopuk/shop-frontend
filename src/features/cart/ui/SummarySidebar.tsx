"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";

export default function SummarySidebar({ totalPrice }: { totalPrice: number }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsPending(true);
    setError(null);

    const tokenType = localStorage.getItem("token_type");
    const accessToken = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenType} ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Не удалось создать заказ. Попробуйте еще раз.");
      }

      const order = await response.json();
      router.push(`/orders/${order.order_number}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-neutral/15 bg-background p-5 shadow-2xs gap-5">
      <h2 className="font-hanken font-bold text-sm text-secondary">
        Ваш заказ
      </h2>

      <div className="flex flex-col gap-2 border-y border-neutral/10 py-4 font-montserrat text-xs">
        <div className="flex justify-between text-neutral">
          <span>Сумма заказа:</span>
          <span>{totalPrice.toLocaleString("ru-RU")} ₽</span>
        </div>
        <div className="flex justify-between text-neutral">
          <span>Доставка:</span>
          <span className="text-secondary font-medium">Бесплатно</span>
        </div>
      </div>

      <div className="flex justify-between items-baseline">
        <span className="font-montserrat font-bold text-xs text-secondary">
          Итого к оплате:
        </span>
        <span className="font-hanken text-lg font-bold text-primary">
          {totalPrice.toLocaleString("ru-RU", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          ₽
        </span>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-red-800">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          <p className="font-montserrat text-xs">{error}</p>
        </div>
      )}

      <Button
        type="button"
        disabled={isPending || totalPrice <= 0}
        onClick={handleCheckout}
        className="h-12 w-full font-hanken text-xs font-semibold text-white bg-primary hover:bg-primary/90 shadow-xs flex items-center justify-center gap-2"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Оформить заказ
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
