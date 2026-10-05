"use client";

import { CheckoutElementsProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useMemo, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

export default function PaymentClient({
  orderNumber,
}: {
  orderNumber: string;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tokenType = localStorage.getItem("token_type");
    const accessToken = localStorage.getItem("access_token");

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

        return data;
      })
      .then((data) => {
        console.log("client secret:", data.client_secret);
        setClientSecret(data.client_secret);
      })
      .catch((err) => {
        console.error("Payment initialization failed:", err);
        setError(err.message);
      });
  }, [orderNumber]);
  if (clientSecret === null) return <div>Загрузка...</div>;
  return (
    <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
      <CheckoutForm orderNumber={orderNumber} />
    </Elements>
  );
}
