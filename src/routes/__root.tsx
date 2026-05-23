import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { DevTools } from 'jotai-devtools';

import { authClient } from '@/utils/nenoHelper.ts';
import 'jotai-devtools/styles.css';

const queryClient = new QueryClient();
const RootLayout = () => (
  <NeonAuthUIProvider authClient={authClient}>
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
    <TanStackRouterDevtools />
    <DevTools position="bottom-right" />
  </NeonAuthUIProvider>
);

export const Route = createRootRoute({ component: RootLayout });
