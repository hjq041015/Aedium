import { createFileRoute } from '@tanstack/react-router';

import AccountSetting from '@/features/account/AccountSetting';

export const Route = createFileRoute('/_app/_protect/account/settings')({
  component: AccountSetting,
});
