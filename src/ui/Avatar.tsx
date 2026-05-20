function Avatar({
  avatarUrl,
  username,
}: {
  avatarUrl: string;
  username: string;
}) {
  return (
    <>
      <div className={`avatar ${avatarUrl ? "" : "avatar-placeholder"}`}>
        <div className="ring-secondary ring-offset-base-100 w-20 rounded-full ring-2 ring-offset-2">
          {avatarUrl && <img src={avatarUrl} />}
          {!avatarUrl && (
            <span className="text-xs uppercase">{username.slice(0, 2)}</span>
          )}
        </div>
      </div>
    </>
  );
}
export default Avatar;
