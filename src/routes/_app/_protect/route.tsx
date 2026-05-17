import { createFileRoute, Outlet } from "@tanstack/react-router";
import RequireLogin from "../../../components/RequireLogin.tsx";

export const Route = createFileRoute("/_app/_protect")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RequireLogin>
      <Outlet />
    </RequireLogin>
  );
}
