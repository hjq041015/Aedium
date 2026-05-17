import { createFileRoute } from "@tanstack/react-router";
import AccountSecurity from "../../../../components/AccountSecurity.tsx";

export const Route = createFileRoute("/_app/_protect/account/security")({
  component: AccountSecurity,
});
