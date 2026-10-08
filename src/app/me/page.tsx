"use client";
import { Button } from "@/src/components/ui/button";
import logout from "@/src/features/auth/api/logout";
import useAuth from "@/src/features/auth/model/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user, isAuthenticated, isLoading, refresh } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );

  const handleLogout = async () => {
    await logout();
    await refresh();
    router.push("/");
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      {user && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
          <Button onClick={handleLogout}>Log out</Button>
        </div>
      )}
    </div>
  );
}
