import { createRootRoute } from "@tanstack/react-router";
import NavBar from "../components/NavBar.tsx";
import SideBar from "../components/SideBar.tsx";

const RootLayout = () => (
  <>
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <NavBar />
      </div>
      <SideBar />
    </div>
  </>
);

export const Route = createRootRoute({ component: RootLayout });
