"use client";
import { AuthContext, useAuthLoader } from "./useAuth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const authState = useAuthLoader();

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}
