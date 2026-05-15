import Avatar from "./Avatar.tsx";
import type { User } from "../types/User.ts";
import { Link } from "@tanstack/react-router";
import { useUserUpdate } from "../hooks/userInfo.ts";
import { useChangeUserAvatar } from "../hooks/userAvatar.ts";

function AccountSettingForm({ user }: { user: User }) {
  const { imageUrl, handleImageChange, currentAvatarFile } =
    useChangeUserAvatar(user);

  const { username, setUsername, isPending, handleUpdate, isUploading } =
    useUserUpdate(user, currentAvatarFile);

  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <label htmlFor="avatar" className="mx-auto cursor-pointer">
          <Avatar avatarUrl={imageUrl} username={username} />
        </label>

        <input
          id="avatar"
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
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
          onChange={(event) => setUsername(event.target.value.trim())}
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
          onClick={(event) => {
            event.preventDefault();
            handleUpdate();
          }}
          className="btn btn-primary"
        >
          {isPending && isUploading && (
            <span className="loading loading-spinner"></span>
          )}
          {!isPending && !isUploading && "Update"}
        </button>
      </fieldset>
    </>
  );
}

export default AccountSettingForm;
