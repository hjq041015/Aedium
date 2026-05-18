import { createFileRoute, Outlet } from "@tanstack/react-router";
import RootLayout from "../../components/RootLayout.tsx";
import { useUserInfo } from "../../hooks/userInfo.ts";
import { useSetAtom } from "jotai";
import { userAtom } from "../../atoms/user.ts";
import { useEffect } from "react";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useUserInfo();
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}
