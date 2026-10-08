"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import signup from "../api/signup";
import useAuth from "../model/useAuth";
import useRedirect from "../model/useRedirect";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const { user, refresh } = useAuth();
  const redirect = useRedirect(redirectUrl);

  useEffect(() => {
    if (user) redirect();
  }, [user, redirect]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(username, email, password);
      await refresh();
      redirect();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-4">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <Button type="submit">Sign Up</Button>
      </form>
      {error && <span className="text-red-500">{error}</span>}
      <span>
        Have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </span>
    </div>
  );
}
