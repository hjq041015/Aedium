import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@neondatabase/neon-js/auth/react";
import { NotePencilIcon } from "@phosphor-icons/react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useAtomValue, useSetAtom } from "jotai";
import {
  editorEmptySignalAtom,
  editorPublishSignalAtom,
  isEditorEmptyAtom,
} from "@/atoms/editor.ts";
import { Route as ArticleUpdateRoute } from "@/routes/_app/_protect/article.editor.$articleId.tsx";
import { Route as EditorRoute } from "@/routes/_app/_protect/editor.tsx";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditorPage = location.pathname === EditorRoute.to;
  const isUpdatePage = location.pathname.includes(
    ArticleUpdateRoute.to.split("$")[0],
  );
  const isEditorEmpty = useAtomValue(isEditorEmptyAtom);
  const setEditorEmptySignal = useSetAtom(editorEmptySignalAtom);
  const setEditorPublishSignal = useSetAtom(editorPublishSignalAtom);
  return (
    <div className="max-lg:collapse bg-base-200  shadow-sm w-full rounded-md">
      <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
      <label
        htmlFor="navbar-1-toggle"
        className="fixed inset-0 hidden max-lg:peer-checked:block"
      ></label>
      <div className="collapse-title navbar">
        <div className="navbar-start">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <button
            onClick={() => navigate({ to: "/" })}
            className="btn btn-ghost text-xl lg:btn-lg lg:w-32"
          >
            Aedium
          </button>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-32 lg:input-lg lg:w-50 mr-1"
          />
        </div>
        <div className="navbar-end">
          <SignedIn>
            {!isEditorPage && !isUpdatePage && (
              <button
                className="btn btn-sm hidden sm:inline-flex sm:btn-md mr-1 btn-ghost"
                onClick={() => navigate({ to: "/editor" })}
              >
                <NotePencilIcon size={24} weight="thin" />
                Write
              </button>
            )}
            {isEditorPage && (
              <>
                <button
                  disabled={isEditorEmpty}
                  className="btn btn-accent btn-sm sm:btn-md mr-1"
                  onClick={() => setEditorPublishSignal((pre) => pre + 1)}
                >
                  Publish
                </button>
                <button
                  onClick={() => setEditorEmptySignal((pre) => pre + 1)}
                  disabled={isEditorEmpty}
                  className="btn btn-error btn-sm sm:btn-md mr-1"
                >
                  Discard draft
                </button>
              </>
            )}
            {isUpdatePage && (
              <>
                <button className="btn btn-accent btn-sm sm:btn-md mr-1">
                  Update
                </button>
              </>
            )}
          </SignedIn>

          <SignedOut>
            <button
              onClick={() =>
                navigate({
                  to: "/auth/$pathname",
                  params: { pathname: "sign-in" },
                })
              }
              className="btn  btn-primary  lg:w-24"
            >
              Login
            </button>
          </SignedOut>
          <SignedIn>
            <UserButton size="icon" />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
