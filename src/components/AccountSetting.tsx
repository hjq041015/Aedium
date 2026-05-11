import { UserAvatar } from "@neondatabase/neon-js/auth/react";
import { Link } from "@tanstack/react-router";

function AccountSetting() {
  return (
    <form className="flex items-center justify-center min-h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <UserAvatar className="mx-auto size-20 cursor-pointer border-2 border-base-300" />

        <label className="label">Email</label>
        <input
          disabled
          type="text"
          className="input"
          placeholder="set your new email"
        />

        <label className="label">Username</label>
        <input
          type="text"
          className="input"
          placeholder="set your new username"
        />

        <Link
          className="link link-primary text-right"
          to="/auth/$pathname"
          params={{ pathname: "forgot-password" }}
        >
          reset password
        </Link>

        <button className="btn btn-primary">Save</button>
      </fieldset>
    </form>
  );
}
export default AccountSetting;
