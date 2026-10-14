"use client";
import { Button } from "@/src/components/ui/button";
import useOrders from "@/src/entities/order/api/useOrders";
import logout from "@/src/features/auth/api/logout";
import useAuth from "@/src/features/auth/model/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import OrderHistory from "./OrderHistory";
import ActiveOrders from "./ActiveOrders";

export default function Profile() {
  const { user, isAuthenticated, isLoading, refresh } = useAuth();
  const router = useRouter();
  const { data, error: ordersError, isLoading: isOrdersLoading } = useOrders();

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

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-8em)] px-16">
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        user && (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-montserrat">
              Здравствуйте,{" "}
              <span className="text-primary font-bold ">{user.username}</span>!
            </h1>
            {isOrdersLoading ? (
              <div className="spinner-container">
                <div className="spinner"></div>
              </div>
            ) : (
              <>
                <ActiveOrders orders={data?.activeOrders} />
                <OrderHistory
                  orders={data?.pastOrders}
                  ordersError={ordersError}
                />
              </>
            )}
            <Button onClick={handleLogout}>Log out</Button>
          </div>
        )
      )}
    </div>
  );
}
