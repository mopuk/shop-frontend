import { Token } from "../model/types";

export default async function login(
  email: string,
  password: string,
): Promise<Token> {
  const body = new URLSearchParams({
    username: email,
    password,
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );
  if (response.ok) {
    const token: Token = await response.json();
    localStorage.setItem("access_token", token.access_token);
    localStorage.setItem("token_type", token.token_type);
    return token;
  } else {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to login");
  }
}
