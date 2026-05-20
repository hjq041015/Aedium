import { createFileRoute } from "@tanstack/react-router";
import Auth from "@/features/article/Auth";

export const Route = createFileRoute("/auth/$pathname")({
  component: Auth,
});
