import { createFileRoute } from '@tanstack/react-router';

import AccountSecurity from '@/features/account/AccountSecurity';

export const Route = createFileRoute('/_app/_protect/account/security')({
  component: AccountSecurity,
});
