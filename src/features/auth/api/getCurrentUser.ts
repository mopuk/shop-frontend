import { User } from "../model/types";

export default async function getCurrentUser(): Promise<User | null> {
  const accessToken = localStorage.getItem("access_token");
  const tokenType = localStorage.getItem("token_type");

  if (!accessToken || !tokenType) {
    return null;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/auth/me`,
    {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    },
  );
  if (response.status == 401) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }

  return (await response.json()) as Promise<User>;
}
