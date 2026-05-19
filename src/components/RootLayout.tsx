import NavBar from "@/components/NavBar.tsx";
import SideBar from "@/components/SideBar.tsx";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <NavBar />
          {children}
        </div>
        <SideBar />
      </div>
    </>
  );
}
export default RootLayout;
