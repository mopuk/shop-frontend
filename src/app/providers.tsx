"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "../components/providers/ThemeProvider";
import AuthProvider from "../features/auth/model/AuthProvider";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <QueryClientProvider client={client}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
