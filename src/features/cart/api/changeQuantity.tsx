import { UnauthorizedError } from "./addCartItem";

export default async function changeQuantity(
  variantId: number,
  quantity: number,
) {
  const tokenType = localStorage.getItem("token_type");
  const accessToken = localStorage.getItem("access_token");

  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + "/api/v1/cart/items",
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `${tokenType} ${accessToken}`,
      },
      body: JSON.stringify({ variant_id: variantId, quantity: quantity }),
    },
  );

  if (res.status === 401 || res.status === 403) {
    throw new UnauthorizedError("Sign in required");
  }

  if (!res.ok) {
    const err = await res.text();
    console.error("Cart API error:", res.status, err);
    throw new Error(err || "Error changing item's quantity");
  }

  return res.json();
}
