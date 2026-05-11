import { UserAvatar } from "@neondatabase/neon-js/auth/react";
import { Link } from "@tanstack/react-router";
import { getUser } from "../utils/userHelper.ts";
import { useEffect, useState } from "react";
import type { User } from "../types/User.ts";

function AccountSetting() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function getUserInfo() {
    const user = await getUser();
    if (!user) {
      throw new Error("No user found");
    }
    setCurrentUser(user);
    setEmail(user.email);
    setUsername(user.name);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <form className="flex items-center justify-center min-h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <UserAvatar
          user={currentUser}
          className="mx-auto size-20 cursor-pointer border-2 border-base-300"
        />

        <label className="label">Email</label>
        <input
          disabled
          type="text"
          className="input"
          placeholder="set your new email"
          value={email}
        />

        <label className="label">Username</label>
        <input
          type="text"
          className="input"
          placeholder="set your new username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
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
