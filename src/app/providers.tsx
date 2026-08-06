"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "../components/providers/ThemeProvider";

const client = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
