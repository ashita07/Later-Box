import { useNavigate } from "react-router-dom";
import { Boxed } from "../icons/Box";
import { TwitterIcon } from "../icons/Twitter";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function SideBar() {
  const navigate = useNavigate();
  return (
    <div
      className="h-screen bg-white fixed border-r w-72 left-0
      top-0 border-2"
    >
      <div className="flex font-extrabold px-0.5 py-3 text-2xl  ">
        <div className="p-1 pr-2">
          <Boxed />
        </div>
        <h1 className="content-center ">LaterBox</h1>
      </div>
      <div className="pl-2 pr-2 ">
        <SidebarItem
          onClick={() => navigate("/dashboard/twitter")}
          text="Twitter"
          icon={<TwitterIcon />}
        />
        <SidebarItem
          onClick={() => navigate("/dashboard/youtube")}
          text="Youtube"
          icon={<YoutubeIcon />}
        />
      </div>
    </div>
  );
}
