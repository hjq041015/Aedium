import { createFileRoute, Outlet } from '@tanstack/react-router';

import RequireEmailVerify from '@/ui/RequireEmailVerify';
import RequireLogin from '@/ui/RequireLogin';

export const Route = createFileRoute('/_app/_protect')({
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
