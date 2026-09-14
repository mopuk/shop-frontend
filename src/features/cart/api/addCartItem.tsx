import { CartResponse } from "@/src/entities/cart/model/types";

export class UnauthorizedError extends Error {}

export default async function addCartItem(
  variantId: number,
  quantity: number = 1,
): Promise<CartResponse> {
  const tokenType = localStorage.getItem("token_type");
  const accessToken = localStorage.getItem("access_token");

  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + `/api/v1/cart/items`,
    {
      method: "POST",
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ variant_id: variantId, quantity: quantity }),
    },
  );

  if (res.status === 401 || res.status === 403) {
    throw new UnauthorizedError("Sign in required");
  }
  if (!res.ok) {
    throw new Error("Failed to add item to cart");
  }

  return res.json();
}
