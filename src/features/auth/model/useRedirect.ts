"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

function safeRedirect(redirectUrl: string | null): string {
  if (redirectUrl && redirectUrl.startsWith("/") && !redirectUrl.startsWith("//")) {
    return redirectUrl;
  }
  return "/";
}

export default function useRedirect(redirectUrl: string | null) {
  const router = useRouter();

  const redirect = useCallback(() => {
    router.push(safeRedirect(redirectUrl));
  }, [router, redirectUrl]);

  return redirect;
}
