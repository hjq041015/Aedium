import { createFileRoute } from "@tanstack/react-router";
import AccountSetting from "@/components/AccountSetting.tsx";

export const Route = createFileRoute("/_app/_protect/account/settings")({
  component: AccountSetting,
});
