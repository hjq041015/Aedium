import { useUserInfo } from "../hooks/userInfo.ts";
import AccountSettingForm from "./AccountSettingForm.tsx";
import RequireLogin from "./RequireLogin.tsx";
import RootLayout from "./RootLayout.tsx";

function AccountSetting() {
  const { user, isLoading } = useUserInfo();
  return (
    <RequireLogin>
      <RootLayout>
        <form className="flex items-center justify-center min-h-screen">
          {!user || isLoading ? (
            <div className="skeleton h-32 w-xs"></div>
          ) : (
            <AccountSettingForm user={user} />
          )}
        </form>
      </RootLayout>
    </RequireLogin>
  );
}

export default AccountSetting;
