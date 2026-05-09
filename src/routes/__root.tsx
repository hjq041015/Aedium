import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { authClient } from "../auth.ts";

const RootLayout = () => (
  <NeonAuthUIProvider authClient={authClient}>
    <Outlet />
  </NeonAuthUIProvider>
);

export const Route = createRootRoute({ component: RootLayout });
