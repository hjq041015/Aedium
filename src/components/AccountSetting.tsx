import { UserAvatar } from "@neondatabase/neon-js/auth/react";
import { Link } from "@tanstack/react-router";
import { useUserInfo } from "../hooks/userInfo.ts";
import RootLayout from "./RootLayout.tsx";

function AccountSetting() {
  const { user, isLoading, username, setUsername, handleUpdate, isPending } =
    useUserInfo();

  return (
    <RootLayout>
      <form className="flex items-center justify-center min-h-screen">
        {isLoading && <div className="skeleton h-32 w-xs"></div>}
        {!isLoading && (
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <UserAvatar
              user={user}
              className="mx-auto size-20 cursor-pointer border-2 border-base-300"
            />

            <label className="label">
              Email
              {!user?.emailVerified && (
                <Link className="link link-error" to="/auth/verify-email">
                  (need to verify)
                </Link>
              )}
            </label>
            <input type="text" disabled className="input" value={user?.email} />

            <label className="label">Username</label>
            <input
              type="text"
              className="input"
              placeholder="set your new username"
              value={username}
              disabled={isPending}
              onChange={(event) => setUsername(event.target.value)}
            />

            <Link
              className="link link-primary text-right"
              to="/auth/$pathname"
              params={{ pathname: "forgot-password" }}
            >
              reset password
            </Link>

            <button
              disabled={isPending}
              onClick={handleUpdate}
              className="btn btn-primary"
            >
              {isPending && <span className="loading loading-spinner"></span>}
              {!isPending && "Update"}
            </button>
          </fieldset>
        )}
      </form>
    </RootLayout>
  );
}
export default AccountSetting;
