import { ProductVariant } from "../../product/model/types";

export enum OrderStatus {
  processing = "processing",
  paid = "paid",
  canceled = "canceled",
  created = "created",
  failed = "failed",
  delivered = "delivered",
}

export type OrderProductSchema = {
  id: number;
  name: string;
  description: string;
  short_description: string;
  slug: string;
  thumbnail: string;
  tags: string[];
  is_featured: boolean;
  created_at: Date;
  gender: "men" | "women" | "unisex";
  base_price: number;
};

export type OrderProductVariantSchema = {
  id: number;
  variant_price: number;
  stock: number;
  is_available: boolean;
  product: OrderProductSchema;
};

export type OrderItem = {
  id: number;
  variant: OrderProductVariantSchema;
  product_name: string;
  quantity: number;
  price_paid: number;
};
export type Order = {
  id: number;
  user_id: number;
  order_number: string;
  subtotal: number;
  shipping_total: number;
  total: number;
  grand_total: number;
  status: OrderStatus;
  created_at: Date;
  updated_at: Date;
  items: OrderItem[];
};

export type OrdersData = {
  activeOrders: Order[];
  pastOrders: Order[];
};
