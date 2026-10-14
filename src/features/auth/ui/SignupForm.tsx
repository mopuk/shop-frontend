"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import signup from "../api/signup";
import useAuth from "../model/useAuth";
import useRedirect from "../model/useRedirect";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const { user, refresh } = useAuth();
  const redirect = useRedirect(redirectUrl);

  useEffect(() => {
    if (user) {
      redirect();
    }
  }, [user, redirect]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signup(username, email, password);
      await refresh();
      redirect();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось зарегистрироваться",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const loginHref = redirectUrl
    ? `/login?redirect=${encodeURIComponent(redirectUrl)}`
    : "/login";

  return (
    <div className="flex min-h-[calc(100vh-12rem)] w-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-neutral/15 bg-white p-6 sm:p-8 shadow-xs font-montserrat">
        <div className="mb-6 text-center">
          <h1 className="font-hanken font-bold text-xl text-secondary">
            Создать аккаунт
          </h1>
          <p className="mt-1 text-xs text-neutral">
            Зарегистрируйтесь для оформления и отслеживания заказов
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-username"
              className="text-xs font-semibold text-secondary font-hanken uppercase tracking-wider"
            >
              Имя пользователя
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral/70 pointer-events-none" />
              <Input
                id="signup-username"
                name="username"
                type="text"
                autoComplete="username"
                required
                disabled={isSubmitting}
                placeholder="ivanov"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11 pl-10 pr-4 text-xs font-montserrat border-neutral/20 focus-visible:ring-primary placeholder:text-neutral/40"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-email"
              className="text-xs font-semibold text-secondary font-hanken uppercase tracking-wider"
            >
              Электронная почта
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral/70 pointer-events-none" />
              <Input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isSubmitting}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 pl-10 pr-4 text-xs font-montserrat border-neutral/20 focus-visible:ring-primary placeholder:text-neutral/40"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-password"
              className="text-xs font-semibold text-secondary font-hanken uppercase tracking-wider"
            >
              Пароль
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral/70 pointer-events-none" />
              <Input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                disabled={isSubmitting}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 pl-10 pr-11 text-xs font-montserrat border-neutral/20 focus-visible:ring-primary placeholder:text-neutral/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral/70 hover:text-secondary focus:outline-none transition-colors"
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-red-800">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <p className="text-xs leading-relaxed">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 h-11 w-full bg-primary font-hanken text-xs font-semibold text-white shadow-xs hover:bg-primary/90 transition-colors"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Регистрация...
              </span>
            ) : (
              "Зарегистрироваться"
            )}
          </Button>
        </form>

        <div className="mt-6 border-t border-neutral/10 pt-4 text-center">
          <p className="text-xs text-neutral">
            Уже есть учетная запись?{" "}
            <Link
              href={loginHref}
              className="font-semibold text-secondary hover:text-primary transition-colors hover:underline"
            >
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
