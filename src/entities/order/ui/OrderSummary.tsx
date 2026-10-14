import { OrderType } from "../model/types";

interface OrderSummaryProps {
  order: OrderType;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <div className="rounded-xl border border-neutral/15 bg-background p-6 shadow-2xs">
      <h2 className="font-hanken font-bold text-sm text-secondary mb-4">
        Итог заказа
      </h2>

      <dl className="flex flex-col gap-3 font-montserrat text-xs border-b border-neutral/10 pb-4">
        <div className="flex justify-between items-center text-neutral">
          <dt>Стоимость товаров</dt>
          <dd className="font-hanken font-medium text-secondary">
            {order.subtotal.toLocaleString("ru-RU")} ₽
          </dd>
        </div>

        <div className="flex justify-between items-center text-neutral">
          <dt>Доставка</dt>
          <dd className="font-hanken font-medium text-secondary">
            {order.shipping_total === 0
              ? "Бесплатно"
              : `${order.shipping_total.toLocaleString("ru-RU")} ₽`}
          </dd>
        </div>
      </dl>

      <div className="flex justify-between items-baseline pt-4">
        <span className="font-montserrat font-bold text-xs text-secondary">
          Всего к оплате
        </span>
        <span className="font-hanken font-bold text-lg text-primary">
          {(order.grand_total || order.total).toLocaleString("ru-RU", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          ₽
        </span>
      </div>
    </div>
  );
}
