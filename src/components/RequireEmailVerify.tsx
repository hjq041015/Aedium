import { useEffect } from "react";
import { useUserInfo } from "@/hooks/userInfo.ts";
import { useNavigate } from "@tanstack/react-router";

function RequireEmailVerify({ children }: { children: React.ReactNode }) {
  const { isLoading, user } = useUserInfo();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && user && !user?.emailVerified) {
      navigate({ to: "/auth/verify-email" });
    }
  }, [isLoading, user?.emailVerified]);

  if (isLoading) {
    return (
      <span className="flex mx-auto min-h-screen loading loading-spinner loading-xl"></span>
    );
  }

  return children;
}
export default RequireEmailVerify;
