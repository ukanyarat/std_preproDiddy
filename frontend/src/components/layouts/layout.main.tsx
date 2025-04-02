import { Outlet } from "react-router-dom";
import NavbarMain from "./navbars/navbar.main";
import SidebarMain from "./sidebars/sidebar.main";
import { useEffect } from "react";
import { getAuthStatus } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className=" relative w-screen h-screen">
      <NavbarMain />
      <div className=" flex pt-[70px] w-full h-full">
        <SidebarMain  />
        <div className="bg-[#f9f7f6] overflow-auto w-full sm:p-6"><Outlet /></div>
      </div>
    </div>
  );
};

export default MainLayout;
