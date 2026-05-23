import { SignedIn } from '@neondatabase/neon-js/auth/react';
import { GearIcon, HouseLineIcon, NotePencilIcon } from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';

function SideBar() {
  const navigate = useNavigate();
  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        {/* Sidebar content here */}
        <ul className="menu w-full grow">
          {/* List item */}
          <li>
            <button
              onClick={() => navigate({ to: '/' })}
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Home"
            >
              {/* Home icon */}
              <HouseLineIcon size={24} />
              <span className="is-drawer-close:hidden">Home</span>
            </button>
          </li>
          <SignedIn>
            <li>
              <button
                onClick={() => navigate({ to: '/editor' })}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl bg-(--color-secondary) text-secondary-content font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-90 hover:shadow-md"
                data-tip="Write"
              >
                <NotePencilIcon size={24} />
                <span className="is-drawer-close:hidden">Write</span>
              </button>
            </li>
          </SignedIn>

          {/* List item */}
          <li>
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Security Settings"
              onClick={() => navigate({ to: '/account/security' })}
            >
              {/* Settings icon */}
              <GearIcon size={24} />
              <span className="is-drawer-close:hidden">Security Settings</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default SideBar;
