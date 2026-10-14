"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

interface PaymentClientProps {
  orderNumber: string;
}

export default function PaymentClient({ orderNumber }: PaymentClientProps) {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const tokenType = localStorage.getItem("token_type");
    const accessToken = localStorage.getItem("access_token");

    if (!tokenType || !accessToken) {
      router.push("/login");
      return;
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
        if (res.status === 401) {
          router.push("/login");
          return;
        }

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.detail ?? "Не удалось инициализировать оплату");
        }

        setClientSecret(data.client_secret);
      })
      .catch((err) => {
        setInitError(err instanceof Error ? err.message : "Неизвестная ошибка");
      });
  }, [orderNumber, router]);

  const appearance: StripeElementsOptions["appearance"] = {
    theme: "stripe",
    variables: {
      colorPrimary: "#126c40",
      colorBackground: "#ffffff",
      colorText: "#1a1c1e",
      colorDanger: "#dc2626",
      fontFamily: "Montserrat, sans-serif",
      spacingUnit: "4px",
      borderRadius: "8px",
    },
  };

  if (initError) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-900">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <h2 className="font-hanken font-bold text-sm">
            Ошибка инициализации оплаты
          </h2>
          <p className="font-montserrat text-xs text-red-700">{initError}</p>
          <Link
            href={`/orders/${orderNumber}`}
            className="inline-flex items-center gap-2 font-montserrat text-xs font-semibold text-secondary hover:underline mt-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Вернуться к деталям заказа
          </Link>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="font-montserrat text-xs text-neutral">
          Подготовка безопасного платежного шлюза...
        </span>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <div className="mb-6">
        <Link
          href={`/orders/${orderNumber}`}
          className="inline-flex items-center gap-1.5 font-montserrat text-xs text-neutral hover:text-secondary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к заказу #{orderNumber}
        </Link>
        <h1 className="mt-3 font-hanken font-bold text-lg text-secondary">
          Оплата заказа #{orderNumber}
        </h1>
      </div>

      <div className="rounded-2xl border border-neutral/15 bg-background p-6 sm:p-8 shadow-xs">
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance,
          }}
        >
          <CheckoutForm orderNumber={orderNumber} />
        </Elements>
      </div>
    </main>
  );
}
