import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SummarySidebar({ totalPrice }: { totalPrice: number }) {
  const router = useRouter();
  const handleCheckout = async () => {
    const token_type = localStorage.getItem("token_type");
    const accessToken = localStorage.getItem("access_token");
    const responce = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + "/api/v1/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_type} ${accessToken}`,
        },
      },
    );

    if (responce.ok) {
      const order = await responce.json();
      router.push(`/payment/${order.order_number}`);
    }
  };

  return (
    <div className="flex flex-col shadow-lg px-4 py-2 rounded-lg gap-4">
      <h2 className="font-hanken font-semibold text-lg text-primary">
        Ваш заказ
      </h2>
      <div className="flex justify-between items-end text-secondary font-bold">
        <h3 className="">Итого: </h3>
        <div className="text-primary text-xl font-bold">
          {totalPrice.toLocaleString("ru-RU", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          ₽
        </div>
      </div>
      <Button onClick={handleCheckout} className="h-12 font-bold font-hanken ">
        Заказать
        <ArrowRight size={24} />
      </Button>
    </div>
  );
}
