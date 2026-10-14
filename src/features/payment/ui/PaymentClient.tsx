"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

export default function PaymentClient({
  orderNumber,
}: {
  orderNumber: string;
}) {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPaymentPending, setIsPaymentPending] = useState(false);

  useEffect(() => {
    const tokenType = localStorage.getItem("token_type");
    const accessToken = localStorage.getItem("access_token");

    if (!tokenType || !accessToken) {
      router.push("/login");
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/payment/create-intent/${orderNumber}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${accessToken}`,
        },
      },
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.detail ?? "Failed to create payment intent");
        }

        if (res.status == 401) {
          router.push("/login");
        }

        return data;
      })
      .then((data) => {
        setClientSecret(data.client_secret);
      })
      .catch((err) => {
        console.error("Payment initialization failed:", err);
        setError(err.message);
      });
  }, [orderNumber, router]);
  if (clientSecret === null) return <div>Загрузка...</div>;
  return (
    <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
      <CheckoutForm orderNumber={orderNumber} isPending={isPaymentPending} />
      {error && <div>{error}</div>}
    </Elements>
  );
}
