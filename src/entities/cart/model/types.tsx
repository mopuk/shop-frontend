import { ProductVariantWithProduct } from "../../product/model/types";
import { User } from "../../user/model/types";

export type CartItem = {
  id: number;
  quantity: number;
  price_at_addition: string;
  variant: ProductVariantWithProduct;
};

export type CartResponse = {
  user: User;
  items: CartItem[] | [];
  updated_at: Date;
};
