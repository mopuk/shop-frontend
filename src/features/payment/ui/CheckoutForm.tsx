"use client";

import { useState } from "react";
import { AlertCircle, Loader2, Lock } from "lucide-react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "@/src/shared/components/ui/button";

interface CheckoutFormProps {
  orderNumber: string;
}

export default function CheckoutForm({ orderNumber }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders/${orderNumber}`,
      },
    });

    if (error) {
      setErrorMessage(
        error.message ?? "Произошла ошибка при обработке платежа",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <PaymentElement />

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-red-800">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          <p className="font-montserrat text-xs">{errorMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        className="h-12 w-full bg-primary font-hanken text-xs font-semibold text-white shadow-xs transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Обработка транзакции...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Оплатить заказ
          </span>
        )}
      </Button>

      <div className="flex items-center justify-center gap-1.5 text-neutral font-montserrat text-xs">
        <Lock className="h-3.5 w-3.5" />
        <span>Платежные данные защищены сквозным шифрованием 256-bit SSL</span>
      </div>
    </form>
  );
}
