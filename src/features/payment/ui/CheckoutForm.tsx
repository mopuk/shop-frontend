"use client";
import { Button } from "@/src/components/ui/button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ orderNumber }: { orderNumber: string }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders/${orderNumber}`,
      },
    });

    if (result.error) {
      return <div>Ошибка: {result.error.message}</div>;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type="submit" className="bg-primary px-4 py-2">
        Оплатить
      </Button>
    </form>
  );
}
