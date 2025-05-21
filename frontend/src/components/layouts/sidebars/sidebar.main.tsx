import "./sidebar.css";
import { SidebarItemLogout } from "./sidebarItemLogout";
import { SidebarItem } from "./sidebarItem";
import { IoHomeOutline } from "react-icons/io5";
import { PiGooglePhotosLogo } from "react-icons/pi";
import { FaWpforms } from "react-icons/fa";
import { SidebarMenuItem } from "./sidebarMenuItem";
import { MdDriveEta } from "react-icons/md";
import { CgMenuRound } from "react-icons/cg";
import { useState, useEffect } from "react";
import { FaBookOpen } from "react-icons/fa6";
import { Text } from "@radix-ui/themes";
import ExternalRedirect from "@/components/customs/alert/ExternalRedirect";

const driveNgrokUrl = "https://f996-2405-9800-b661-12c3-a266-8b9d-17b6-1d3f.ngrok-free.app/";

// กำหนด interface สำหรับ MenuItem
interface MenuItem {
  icon: JSX.Element;
  name: string;
  path: string;
}

// กำหนด interface สำหรับ SidebarItem
interface SidebarItemType {
  icon: JSX.Element;
  name: string;
  path: string;
  menu?: MenuItem[];
  disabled?: boolean;

}

const SidebarMain = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const ListSidebarItems: SidebarItemType[] = [
    {
      icon: <IoHomeOutline className="text-red-500" style={{ width: "24px", height: "24px" }} />,
      name: "หน้าหลัก",
      path: `/`,
    },
    {
      icon: <FaBookOpen className="text-red-500" style={{ width: "24px", height: "24px" }} />,
      name: "คู่มือการใช้งาน",
      path: `/manual`,
    },
    {
      icon: <MdDriveEta className="text-red-500" style={{ width: "24px", height: "24px" }} />,
      name: "ขับรถ",
      path: driveNgrokUrl,
    },

  ];

  // ฟังก์ชันสลับสถานะการแสดงเมนู
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleMenuItemClick = () => {
    setIsSidebarOpen(false);
  };
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  return (
    <div className="flex flex-col h-[calc(100vh-118px)] relative">
      <button
        onClick={toggleSidebar}
        className="absolute top-[-60px] left-4 z-20 bg-red-800 text-white p-2 rounded-full hover:bg-red-700 transition-colors flex "
        aria-label={isSidebarOpen ? "ปิดเมนู" : "เปิดเมนู"}
      >
        <CgMenuRound size={36} />
      </button>

      {/* Sidebar */}
      <section
        style={{
          boxShadow: isSidebarOpen ? "none" : "none",
          width: isSidebarOpen ? (isMobile ? "60px" : "200px") : "0px",
          transition: "width 0.3s ease",
          overflow: "hidden",
        }}
        className="relative z-10 h-full top-[-55px]"
      >
        <div
          className="overflow-y-auto overflow-x-hidden h-full top-[60px] text-black pt-50  sm:pl-0 "
        >

          <div className="h-16"></div>

          {ListSidebarItems.map((item) => {
            return item.menu && item.menu.length > 0 ? (
              <SidebarMenuItem
                key={item.name}
                icon={item.icon}
                name={item.name}
                path={item.path}
                menu={item.menu}
                disabled={item.disabled}
                onClick={handleMenuItemClick}
              />
            ) : (
              <SidebarItem
                key={item.name}
                icon={item.icon}
                name={item.name}
                path={item.path}
                disabled={item.disabled}
                onClick={handleMenuItemClick}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default SidebarMain;