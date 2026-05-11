import { UserAvatar } from "@neondatabase/neon-js/auth/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../utils/userHelper.ts";

function AccountSetting() {
  const [username, setUsername] = useState("");

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getUser();
      if (!user) {
        throw new Error("No user found");
      }
      setUsername(user.name);
      return user;
    },
  });

  return (
    <form className="flex items-center justify-center min-h-screen">
      {isLoading && <div className="skeleton h-32 w-xs"></div>}
      {!isLoading && (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <UserAvatar
            user={user}
            className="mx-auto size-20 cursor-pointer border-2 border-base-300"
          />

          <label className="label">Email</label>
          <input
            disabled
            type="text"
            className="input"
            placeholder="set your new email"
            value={user?.email}
          />

          <label className="label">Username</label>
          <input
            type="text"
            className="input"
            placeholder="set your new username"
            defaultValue={user?.name}
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
      )}
    </form>
  );
}
export default AccountSetting;
