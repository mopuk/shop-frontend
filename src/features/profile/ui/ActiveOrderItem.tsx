import {
  Order,
  OrderStatus,
  ORDER_STEP_STATUSES,
  ORDER_STATUS_LABELS,
  OrderItem,
} from "@/src/entities/order/model";
import {
  Check,
  Clock,
  CreditCard,
  Dot,
  Image,
  ImageOff,
  PackageCheck,
  Truck,
} from "lucide-react";
import Link from "next/link";

const STEP_ICONS: Record<OrderStatus, React.ElementType> = {
  [OrderStatus.created]: CreditCard,
  [OrderStatus.processing]: Clock,
  [OrderStatus.paid]: Truck,
  [OrderStatus.delivered]: PackageCheck,
  [OrderStatus.failed]: Clock,
  [OrderStatus.canceled]: Clock,
};

function OrderHeader({
  orderNumber,
  orderCreated,
  orderTotal,
}: {
  orderNumber: string;
  orderCreated: Date;
  orderTotal: number;
}) {
  return (
    <dl className="flex gap-4 font-montserrat">
      <div className="flex gap-2 flex-col ">
        <dt className="text-gray-400  ">Номер заказа</dt>
        <dd className="text-black font-medium">{orderNumber}</dd>
      </div>
      <div className="flex gap-2 flex-col ">
        <dt className="text-gray-400 ">Создан</dt>
        <dd className="text-black">
          {new Date(orderCreated).toLocaleString("ru-RU")}
        </dd>
      </div>
      <div className="flex gap-2 flex-col ">
        <dt className="text-gray-400 ">Сумма</dt>
        <dd className="text-black">{orderTotal} ₽</dd>
      </div>
    </dl>
  );
}

function OrderProgressbar({ currentStatus }: { currentStatus: OrderStatus }) {
  if (currentStatus === OrderStatus.canceled) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-700">
        <p className="text-sm font-semibold">Заказ отменен</p>
      </div>
    );
  }

  if (currentStatus === OrderStatus.failed) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-700">
        <p className="text-sm font-semibold">Ошибка при оплате заказа</p>
      </div>
    );
  }
  const currentInd = ORDER_STEP_STATUSES.indexOf(currentStatus);

  return (
    <div className="w-full py-6">
      <ol className="flex gap-4 ">
        {ORDER_STEP_STATUSES.map((status, ind) => {
          const isCompleted = ind < currentInd;
          const isCurrent = ind === currentInd;
          const isLast = ind === ORDER_STEP_STATUSES.length - 1;

          const StepIcon = STEP_ICONS[status];

          return (
            <li key={ind} className="flex flex-col gap-2 relative flex-1">
              {!isLast && (
                <div
                  aria-hidden="true"
                  className={`absolute top-6 left-1/2 w-full h-1 -translate-y-1/2 transition-colors duration-300 ${
                    ind < currentInd ? "bg-primary" : "bg-slate-200"
                  }`}
                />
              )}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex items-center justify-center z-10 w-12 h-12 rounded-full ${isCurrent ? "border-4 border-green-100/40" : ""} ${currentInd >= ind ? " bg-primary" : "bg-gray-200"}`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 stroke-2.5 stroke-white" />
                  ) : (
                    <StepIcon
                      className={`stroke-2.5 ${isCompleted || isCurrent ? "stroke-white" : ""}`}
                    />
                  )}
                </div>

                <h3
                  className={`font-montserrat ${currentInd >= ind ? "font-medium" : ""}`}
                >
                  {ORDER_STATUS_LABELS[status]}
                </h3>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function OrderItems({ items }: { items: OrderItem[] }) {
  if (!items) return;
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="bg-[#f3f3f6] rounded-md flex gap-4 p-4">
            <div className="h-24 bg-linear-180 rounded-md shadow-sm from-white to-gray-100 flex flex-col justify-center items-center text-[12px] text-center">
              <ImageOff width={20} height={20} />
              Нет изображения
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <h4 className="font-montserrat font-medium">
                <Link
                  href={`/product/${item.variant.product.slug}?variant=${item.variant.id}`}
                >
                  {item.product_name}
                </Link>
              </h4>
              <div className="flex gap-1 text-neutral">
                Количество: {item.quantity}{" "}
                <span>
                  <Dot className="stroke-black" />
                </span>{" "}
                {(item.price_paid * item.quantity).toLocaleString("ru-RU")} ₽
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ActiveOrderItem({ order }: { order: Order }) {
  return (
    <div className="shadow-md p-8">
      <OrderHeader
        orderNumber={order.order_number}
        orderCreated={order.created_at}
        orderTotal={order.total}
      />
      <div>
        <OrderProgressbar currentStatus={order.status} />
        <OrderItems items={order.items} />
      </div>
    </div>
  );
}
