"use client";
import { Input } from "@/src/components/ui/input";
import { useState, type SyntheticEvent } from "react";
import login from "../api/login";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useAuth from "../model/useAuth";
import useRedirect from "../model/useRedirect";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const { user, refresh } = useAuth();
  const redirect = useRedirect(redirectUrl);

  useEffect(() => {
    if (user) redirect();
  }, [user, redirect]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      await refresh();
      redirect();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to login");
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1>Login</h1>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
      {error && <span className="text-red-500">{error}</span>}
      <span>
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </span>
    </div>
  );
}
