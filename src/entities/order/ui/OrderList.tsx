import { Package } from "lucide-react";
import { OrderType } from "@/src/entities/order/model";
import OrderCard from "./OrderCard";

interface OrderListProps {
  orders: OrderType[] | undefined;
  isActive: boolean;
}

export default function OrderList({ orders, isActive }: OrderListProps) {
  const count = orders?.length ?? 0;
  const title = isActive ? "Активные заказы" : "История заказов";

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between border-b border-neutral/10 pb-3">
        <h2 className="font-hanken font-bold text-sm text-secondary">
          {title}
        </h2>
        <span className="font-montserrat text-xs text-neutral">
          {count}{" "}
          {count === 1
            ? "заказ"
            : count > 1 && count < 5
              ? "заказа"
              : "заказов"}
        </span>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral/30 py-12 px-4 text-center">
          <Package className="h-8 w-8 text-neutral/60 mb-2 stroke-[1.5]" />
          <p className="font-montserrat text-xs font-medium text-secondary">
            {isActive
              ? "Нет текущих активных заказов"
              : "История заказов пуста"}
          </p>
          <p className="font-montserrat text-xs text-neutral mt-1">
            {isActive
              ? "Оформленные заказы, находящиеся в обработке или доставке, появятся здесь."
              : "Завершенные и отмененные заказы будут отображаться в этом списке."}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-6 list-none p-0">
          {orders.map((order) => (
            <li key={order.id}>
              <OrderCard order={order} isActive={isActive} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
