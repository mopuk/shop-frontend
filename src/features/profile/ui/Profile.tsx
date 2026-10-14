"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, LogOut } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import useOrders from "@/src/entities/order/api/useOrders";
import OrderList from "@/src/entities/order/ui/OrderList";
import logout from "@/src/features/auth/api/logout";
import useAuth from "@/src/features/auth/model/useAuth";

export default function Profile() {
  const { user, isAuthenticated, isLoading, refresh } = useAuth();
  const router = useRouter();
  const { data, isLoading: isOrdersLoading } = useOrders();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    await refresh();
    router.push("/");
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="h-32 w-full animate-pulse rounded-2xl border border-neutral/15 bg-tertiary mb-10" />
        <div className="h-64 w-full animate-pulse rounded-2xl border border-neutral/15 bg-tertiary" />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const registrationDate = new Date(user.created_at).toLocaleDateString(
    "ru-RU",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 font-montserrat">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl border border-neutral/15 bg-background p-6 sm:p-8 shadow-xs mb-10">
        <div className="flex items-center gap-5">
          <div
            className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-tertiary border border-neutral/15 font-hanken text-xl sm:text-2xl font-bold text-primary shadow-inner"
            aria-hidden="true"
          >
            {user.username.charAt(0).toUpperCase()}
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="font-hanken font-bold text-lg text-secondary">
              {user.username}
            </h1>
            <p className="text-xs text-neutral">{user.email}</p>
            <div className="flex items-center gap-1.5 text-xs text-neutral mt-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>На сайте с {registrationDate}</span>
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleLogout}
          className="h-11 border-neutral/20 text-xs font-hanken font-semibold text-secondary hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors self-start sm:self-center"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Выйти из аккаунта
        </Button>
      </header>

      {isOrdersLoading ? (
        <div className="flex flex-col gap-6">
          <div className="h-56 w-full animate-pulse rounded-2xl border border-neutral/15 bg-tertiary" />
          <div className="h-56 w-full animate-pulse rounded-2xl border border-neutral/15 bg-tertiary" />
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          <OrderList orders={data?.activeOrders} isActive={true} />
          <OrderList orders={data?.pastOrders} isActive={false} />
        </div>
      )}
    </main>
  );
}
