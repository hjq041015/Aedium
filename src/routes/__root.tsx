import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { authClient } from "../auth.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const queryClient = new QueryClient();
const RootLayout = () => (
  <NeonAuthUIProvider authClient={authClient}>
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
    <TanStackRouterDevtools />
  </NeonAuthUIProvider>
);

export const Route = createRootRoute({ component: RootLayout });
