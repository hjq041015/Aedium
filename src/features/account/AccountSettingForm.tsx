import { useForm, useStore } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';

import type { User } from '@/types/User.ts';

import { useChangeUserAvatar } from '@/hooks/userAvatar.ts';
import { useUserUpdate } from '@/hooks/userInfo.ts';
import { Route as securityRoute } from '@/routes/_app/_protect/account/security.tsx';
import { profileUpdateSchema } from '@/schemas/UserProfileUpdarte';
import Avatar from '@/ui/Avatar';
import { FieldInfo } from '@/ui/FieldInfo.tsx';
import Loading from '@/ui/Loading';

function AccountSettingForm({ user }: { user: User }) {
  const { imageUrl, handleImageChange, currentAvatarFile } = useChangeUserAvatar(user);

  const { isPending, handleUpdate, isUploading } = useUserUpdate(user, currentAvatarFile);

  const form = useForm({
    validators: {
      onBlur: profileUpdateSchema,
    },
    defaultValues: {
      username: user.name || '',
    },
    onSubmit: ({ value: { username } }) => {
      handleUpdate({ username });
    },
  });

  const username = useStore(form.store, (state) => state.values.username);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
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
        <form.Field
          name="username"
          children={(filed) => (
            <>
              <input
                className="input"
                placeholder="set your new username"
                id={filed.name}
                value={filed.state.value}
                onBlur={filed.handleBlur}
                onChange={(e) => filed.handleChange(e.target.value)}
                disabled={isPending}
                maxLength={15}
              />
              <FieldInfo field={filed} />
            </>
          )}
        />

        <Link className="link link-primary text-right" to={securityRoute.to}>
          reset password
        </Link>

        <button disabled={isPending} className="btn btn-primary">
          {isPending && isUploading && <Loading />}
          {!isPending && !isUploading && 'Update'}
        </button>
      </fieldset>
    </form>
  );
}

export default AccountSettingForm;
