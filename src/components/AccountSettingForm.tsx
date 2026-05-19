import Avatar from "@/components/Avatar.tsx";
import Loading from "@/components/Loading.tsx";
import { useChangeUserAvatar } from "@/hooks/userAvatar.ts";
import { useUserUpdate } from "@/hooks/userInfo.ts";
import { Route as securityRoute } from "@/routes/_app/_protect/account/security.tsx";
import type { User } from "@/types/User.ts";
import { Link } from "@tanstack/react-router";

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
        <Link className="link link-primary text-right" to={securityRoute.to}>
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
          {isPending && isUploading && <Loading />}
          {!isPending && !isUploading && "Update"}
        </button>
      </fieldset>
    </>
  );
}

export default AccountSettingForm;
