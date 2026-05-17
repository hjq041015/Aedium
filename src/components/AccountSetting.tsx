import { useUserInfo } from "../hooks/userInfo.ts";
import AccountSettingForm from "./AccountSettingForm.tsx";

function AccountSetting() {
  const { user, isLoading } = useUserInfo();
  return (
    <form className="flex items-center justify-center min-h-screen">
      {!user || isLoading ? (
        <div className="skeleton h-32 w-xs"></div>
      ) : (
        <AccountSettingForm user={user} />
      )}
    </form>
  );
}

export default AccountSetting;
