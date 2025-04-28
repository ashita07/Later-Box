import { Outlet } from "react-router-dom";
import { SideBar } from "../Components/Sidebar";

export function DashboardLayout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="ml-72 w-full min-h-screen bg-grey-300 p-4">
        <Outlet />
      </div>
    </div>
  );
}
