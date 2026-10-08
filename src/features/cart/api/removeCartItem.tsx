import { CartResponse } from "@/src/entities/cart/model/types";
import { UnauthorizedError } from "./addCartItem";

export default async function removeFromCart(
  variantId: number,
): Promise<CartResponse> {
  const tokenType = localStorage.getItem("token_type");
  const accessToken = localStorage.getItem("access_token");

  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + `/api/v1/cart/items/${variantId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-type": "application/json",
      },
    },
  );

  if (res.status === 401 || res.status === 403) {
    throw new UnauthorizedError("Sign in required");
  }
  if (!res.ok) {
    const err = await res.text();
    console.error("Cart API error:", res.status, err);
    throw new Error(err || "Error removing item from cart");
  }

  return res.json();
}
