import { createFileRoute, Outlet } from "@tanstack/react-router";
import RequireLogin from "@/components/RequireLogin.tsx";
import RequireEmailVerify from "@/components/RequireEmailVerify.tsx";

export const Route = createFileRoute("/_app/_protect")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RequireLogin>
      <RequireEmailVerify>
        <Outlet />
      </RequireEmailVerify>
    </RequireLogin>
  );
}
