import LoginForm from "@/src/features/auth/ui/LoginForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
