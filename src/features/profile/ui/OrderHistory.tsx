import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import removeOrder from "../api/removeOrder";
import { Plus, TrashIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { Order } from "@/src/entities/order/model";

export default function OrderHistory({
  orders,
  ordersError,
}: {
  orders: Order[] | undefined;
  ordersError: Error | null;
}) {
  const [removeError, setRemoveError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleRemoveOrder = async (orderNumber: string) => {
    const { status, error } = await removeOrder(orderNumber);
    if (error) {
      setRemoveError(error);
    }

    if (status === 200) {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    } else if (status === 401) {
      router.push("/login");
    }
  };
  return (
    <div>
      <h2>История заказов: </h2>
      {ordersError && <div>{ordersError.message}</div>}
      <ul className="flex flex-col gap-2">
        {orders &&
          orders.map((order) => (
            <li
              key={order.id}
              className="bg-gray-200 rounded-xl px-4 py-2 flex justify-between"
            >
              <Link href={`/orders/${order.order_number}`} className="">
                <div className="flex flex-col gap-2">
                  <h3>{order.order_number}</h3>
                  <h4>Статус: {order.status}</h4>
                  <time>
                    Создан: {new Date(order.created_at).toLocaleString("ru-RU")}
                  </time>
                  <time>
                    Обновлен:{" "}
                    {new Date(order.updated_at).toLocaleString("ru-RU")}
                  </time>
                </div>{" "}
              </Link>
              <div className="flex gap-2">
                <Button onClick={() => handleRemoveOrder(order.order_number)}>
                  <TrashIcon width={24} height={24} />
                </Button>
              </div>
            </li>
          ))}
      </ul>
      {removeError && (
        <div className="absolute right-4 bottom-4 flex justify-between px-4 py-2 bg-red-500 text-gray-500 font-montserrat rounded-xl">
          Ошибка: {removeError.toLowerCase()}{" "}
          <span className="hover:bg-red-400 rounded-sm">
            <Plus
              width={24}
              height={24}
              onClick={() => setRemoveError(null)}
              className="rotate-45 "
            />
          </span>
        </div>
      )}
    </div>
  );
}
