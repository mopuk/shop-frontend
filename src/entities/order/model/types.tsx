export enum OrderStatus {
  processing = "processing",
  paid = "paid",
  canceled = "canceled",
  created = "created",
  failed = "failed",
}
export type Order = {
  id: number;
  user_id: number;
  order_number: string;
  subtotal: number;
  shipping_total: number;
  total: number;
  grand_total: number;
  status: OrderStatus;
};
