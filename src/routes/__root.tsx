import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { authClient } from "../utils/nenoHelper.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";

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
