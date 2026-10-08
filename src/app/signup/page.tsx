import SignupForm from "@/src/features/auth/ui/SignupForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Suspense>
        <SignupForm />
      </Suspense>
    </div>
  );
}
