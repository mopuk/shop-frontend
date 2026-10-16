"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { Button } from "../ui/button";
import useAuth from "@/src/features/auth/model/useAuth";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral/15 bg-background/80 backdrop-blur-md transition-all">
      <nav className="mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-85">
          <Image
            src="/images/Logo.svg"
            alt="MOXPOKE"
            height={32}
            width={160}
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-6 font-montserrat text-xs font-semibold uppercase tracking-wider text-secondary">
            <Link
              href="/catalog"
              className="transition-colors hover:text-primary"
            >
              Каталог
            </Link>
            <Link
              href="/brands"
              className="transition-colors hover:text-primary"
            >
              Бренды
            </Link>
          </div>

          <div className="hidden sm:block h-5 w-px bg-neutral/20" />

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Поиск"
              className="h-10 w-10 text-secondary hover:bg-tertiary hover:text-primary"
            >
              <Search className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Корзина"
              className="h-10 w-10 text-secondary hover:bg-tertiary hover:text-primary"
            >
              <Link href="/cart">
                <ShoppingBag className="h-4 w-4" />
              </Link>
            </Button>

            {isAuthenticated ? (
              <Link
                href="/me"
                aria-label="Профиль"
                className="ml-2 flex h-9 w-9 items-center justify-center rounded-xl bg-tertiary border border-neutral/15 font-montserrat text-xs font-bold text-primary shadow-xs transition-transform hover:scale-105"
              >
                {user?.username ? (
                  user.username.charAt(0).toUpperCase()
                ) : (
                  <User className="h-4 w-4" />
                )}
              </Link>
            ) : (
              <Button
                variant="ghost"
                className="font-hanken text-xs font-semibold text-secondary hover:bg-tertiary hover:text-primary"
              >
                <Link href="/login">Войти</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
