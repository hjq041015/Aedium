import { createFileRoute, Outlet } from "@tanstack/react-router";
import RequireLogin from "@/ui/RequireLogin";
import RequireEmailVerify from "@/ui/RequireEmailVerify";

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
