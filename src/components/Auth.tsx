import { AuthView, SignedIn } from "@neondatabase/neon-js/auth/react";
import { Route } from "../routes/auth/$pathname.tsx";
import { Route as indexRoute } from "../routes/_app/index.tsx";
import RediretToHome from "./RediretToHome.tsx";

function Auth() {
  const { pathname } = Route.useParams();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <AuthView
          className="auth-page"
          pathname={pathname}
          redirectTo={pathname === "sign-out" ? indexRoute.to : undefined}
        />
      </div>

      <SignedIn>
        <RediretToHome />
      </SignedIn>
    </>
  );
}

export default Auth;
