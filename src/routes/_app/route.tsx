import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { userAtom } from '@/atoms/user.ts';
import { useUserInfo } from '@/hooks/userInfo.ts';
import RootLayout from '@/ui/RootLayout';

export const Route = createFileRoute('/_app')({
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
