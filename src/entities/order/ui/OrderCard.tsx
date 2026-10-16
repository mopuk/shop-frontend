import Link from "next/link";
import { AlertCircle, Download, Loader2, RotateCcw, Trash } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import { OrderType } from "@/src/entities/order/model";
import OrderProgressbar from "./OrderProgressbar";
import OrderHeader from "./OrderHeader";
import OrderItemsList from "./OrderItemsList";
import removeOrder from "@/src/features/profile/api/removeOrder";
import { useState } from "react";

export default function OrderCard({
  order,
  isActive,
}: {
  order: OrderType;
  isActive: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const handleRemoveOrder = async () => {
    setIsRemoving(true);
    const { status, error } = await removeOrder(order.order_number);
    setIsRemoving(false);
    if (status === 409) {
      setError(error);
      setTimeout(() => setError(null), 3000);
    }
  };
  return (
    <article className="overflow-hidden rounded-2xl border border-neutral/15 bg-background shadow-xs">
      <OrderHeader
        orderNumber={order.order_number}
        orderCreated={order.created_at}
        orderTotal={order.grand_total || order.total}
        status={order.status}
        isActive={isActive}
      />

      <div className="p-6">
        {isActive && (
          <div className="mb-6">
            <OrderProgressbar currentStatus={order.status} />
          </div>
        )}
        <OrderItemsList items={order.items} />
      </div>

      <footer className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-neutral/10 bg-background px-6 py-4">
        <Link
          href={`/orders/${order.order_number}`}
          className="text-xs font-montserrat font-semibold text-secondary hover:text-primary transition-colors"
        >
          Подробнее о заказе
        </Link>
        {isActive ? (
          <Button onClick={handleRemoveOrder}>
            {isRemoving ? (
              <Loader2 width={24} height={24} className="animate-spin" />
            ) : (
              <Trash width={24} height={24} />
            )}
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 border-neutral/20 text-xs font-hanken text-secondary hover:bg-tertiary"
            >
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Скачать чек
            </Button>
            <Button
              type="button"
              size="sm"
              className="h-9 bg-primary hover:bg-primary/90 text-background font-hanken text-xs shadow-xs"
            >
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Заказать заново
            </Button>
          </div>
        )}
      </footer>
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-red-800">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          <p className="font-montserrat text-xs">{error}</p>
        </div>
      )}
    </article>
  );
}
