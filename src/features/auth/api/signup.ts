import { Token } from "../model/types";

export default async function signup(
  username: string,
  email: string,
  password: string,
): Promise<Token> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    },
  );

  if (response.ok) {
    const token: Token = await response.json();
    localStorage.setItem("access_token", token.access_token);
    localStorage.setItem("token_type", token.token_type);
    return token;
  } else {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to register");
  }
}
