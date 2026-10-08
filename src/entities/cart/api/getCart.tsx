import { CartResponse } from "../model/types";

export default async function getCart(): Promise<CartResponse> {
  const token_type = localStorage.getItem("token_type");
  const accessToken = localStorage.getItem("access_token");
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + "/api/v1/cart/items",
    {
      headers: {
        Authorization: `${token_type} ${accessToken}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch cart");
  }
  return res.json();
}
