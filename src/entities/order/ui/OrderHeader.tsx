import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  CreditCard,
  XCircle,
} from "lucide-react";
import { OrderStatus } from "../model";
import Link from "next/link";

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  switch (status) {
    case OrderStatus.delivered:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-primary border border-emerald-200/60">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Доставлен
        </span>
      );
    case OrderStatus.canceled:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-neutral border border-neutral/20">
          <XCircle className="h-3.5 w-3.5" />
          Отменен
        </span>
      );
    case OrderStatus.failed:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
          <AlertTriangle className="h-3.5 w-3.5" />
          Ошибка оплаты
        </span>
      );
    case OrderStatus.paid:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-primary border border-emerald-200/60">
          <Clock className="h-3.5 w-3.5" />
          Оплачен
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
          <Clock className="h-3.5 w-3.5" />
          Ожидает оплаты
        </span>
      );
  }
}

export default function OrderHeader({
  orderNumber,
  orderCreated,
  orderTotal,
  status,
  isActive,
}: {
  orderNumber: string;
  orderCreated: Date;
  orderTotal: number;
  status: OrderStatus;
  isActive: boolean;
}) {
  const isPayable =
    status === OrderStatus.created || status === OrderStatus.processing;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral/10 bg-tertiary px-6 py-4">
      <dl className="flex flex-wrap items-center gap-6 font-montserrat">
        <div className="flex flex-col">
          <dt className="text-xs text-neutral">Номер заказа</dt>
          <dd className="font-hanken font-bold text-xs text-secondary mt-0.5">
            #{orderNumber}
          </dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-xs text-neutral">Оформлен</dt>
          <dd className="font-medium text-xs text-secondary mt-0.5">
            {new Date(orderCreated).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-xs text-neutral">Сумма</dt>
          <dd className="font-hanken font-bold text-xs text-primary mt-0.5">
            {orderTotal.toLocaleString("ru-RU")} ₽
          </dd>
        </div>
      </dl>

      <div className="flex items-center gap-3 self-start sm:self-auto">
        {isActive && isPayable && (
          <Link
            href={`/orders/${orderNumber}/payment`}
            className="h-8 flex gap-2 items-center bg-primary hover:bg-primary/90 rounded-xl text-background font-bold font-hanken text-xs shadow-xs px-4"
          >
            <CreditCard className="mr-1.5 h-4 w-4" />
            Оплатить
          </Link>
        )}

        <OrderStatusBadge status={status} />
      </div>
    </div>
  );
}
