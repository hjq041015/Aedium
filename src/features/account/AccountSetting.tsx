import AccountSettingForm from '@/features/account/AccountSettingForm';
import { useUserInfo } from '@/hooks/userInfo.ts';

function AccountSetting() {
  const { user, isLoading } = useUserInfo();
  return (
    <main className="flex items-center justify-center content-layout-h">
      {!user || isLoading ? (
        <div className="skeleton h-32 w-xs"></div>
      ) : (
        <AccountSettingForm user={user} />
      )}
    </main>
  );
}

export default AccountSetting;
