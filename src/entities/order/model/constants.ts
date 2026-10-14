import { Clock, CreditCard, PackageCheck, Truck } from "lucide-react";
import { OrderStatus } from "./types";

export const ALL_ORDER_STATUSES: readonly OrderStatus[] = [
  OrderStatus.created,
  OrderStatus.processing,
  OrderStatus.paid,
  OrderStatus.delivered,
  OrderStatus.failed,
  OrderStatus.canceled,
] as const;

export const ORDER_STEP_STATUSES: readonly OrderStatus[] = [
  OrderStatus.created,
  OrderStatus.processing,
  OrderStatus.paid,
  OrderStatus.delivered,
] as const;

export const STATUSES: OrderStatus[] = [
  OrderStatus.created,
  OrderStatus.processing,
  OrderStatus.paid,
  OrderStatus.delivered,
  OrderStatus.failed,
  OrderStatus.canceled,
];
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.created]: "Создан",
  [OrderStatus.processing]: "В обработке",
  [OrderStatus.paid]: "Оплачен",
  [OrderStatus.delivered]: "Доставлен",
  [OrderStatus.canceled]: "Отменен",
  [OrderStatus.failed]: "Ошибка оплаты",
};

export const STEP_ICONS: Record<OrderStatus, React.ElementType> = {
  [OrderStatus.created]: CreditCard,
  [OrderStatus.processing]: Clock,
  [OrderStatus.paid]: Truck,
  [OrderStatus.delivered]: PackageCheck,
  [OrderStatus.failed]: Clock,
  [OrderStatus.canceled]: Clock,
};
