const avatarSizes = {
  sm: 'sm:w-15',
  md: 'sm:w-20',
};

function Avatar({
  avatarUrl,
  username,
  size = 'md',
  className = 'w-15',
}: {
  avatarUrl: string;
  username: string;
  size?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <>
      <div className={`avatar ${avatarUrl ? '' : 'avatar-placeholder'}`}>
        <div
          className={`ring-secondary ring-offset-base-100 ${avatarSizes[size]} rounded-full ring-2 ring-offset-2 ${className}`}
        >
          {avatarUrl && <img src={avatarUrl} />}
          {!avatarUrl && <span className="text-xs uppercase">{username.slice(0, 2)}</span>}
        </div>
      </div>
    </>
  );
}
export default Avatar;
