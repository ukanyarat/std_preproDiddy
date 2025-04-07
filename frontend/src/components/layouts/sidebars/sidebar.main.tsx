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
  // State เพื่อควบคุมการแสดงเมนู
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // State เพื่อตรวจสอบว่าเป็นหน้าจอมือถือหรือไม่
  const [isMobile, setIsMobile] = useState(false);

  const ListSidebarItems: SidebarItemType[] = [
    {
      icon: <IoHomeOutline className="text-black" style={{ width: "24px", height: "24px" }} />,
      name: "หน้าหลัก",
      path: `/`,
    },
    {
      icon: <MdDriveEta className="hover:text-text_main_blue text-white" style={{ width: "24px", height: "24px" }} />,
      name: "ขับรถ",
      path: `/drive`,
    },
    {
      icon: <FaBookOpen className="hover:text-text_main_blue text-white" style={{ width: "24px", height: "24px" }} />,
      name: "คู่มือการใช้งาน",
      path: `/manual`,
    },
  ];

  // ฟังก์ชันสลับสถานะการแสดงเมนู
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // ตรวจสอบขนาดหน้าจอเมื่อ component โหลดและเมื่อมีการ resize
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 640; // sm breakpoint ใน tailwind คือ 640px
      setIsMobile(mobile);
      // ถ้าเป็นหน้าจอมือถือและเพิ่งโหลดครั้งแรก ให้ปิดเมนูไว้ก่อน
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };

    // เรียกใช้ฟังก์ชันตรวจสอบขนาดหน้าจอครั้งแรก
    checkScreenSize();

    // เพิ่ม event listener สำหรับการปรับขนาดหน้าจอ
    window.addEventListener("resize", checkScreenSize);

    // ลบ event listener เมื่อ component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-118px)] relative">
      {/* ปุ่มเปิด/ปิดเมนู - แสดงตลอดเวลา */}
      <button
        onClick={toggleSidebar}
        className="absolute top-[-60px] left-4 z-20 bg-red-900 text-white p-2 rounded-full hover:bg-red-800 transition-colors"
        aria-label={isSidebarOpen ? "ปิดเมนู" : "เปิดเมนู"}
      >
        <CgMenuRound size={36} />
      </button>

      {/* Sidebar */}
      <section
        style={{
          boxShadow: isSidebarOpen ? "4px 2px 12px 0px #0A0A100F " : "none",
          width: isSidebarOpen ? (isMobile ? "256px" : "256px") : "0px",
          transition: "width 0.3s ease",
          overflow: "hidden",
        }}
        className="relative z-10 h-full top-[-60px]"
      >
        <div
          // style={{
          //   backgroundImage: "url('/images/JCAR-2.jpg')",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
          className="overflow-y-auto overflow-x-hidden h-[1280px] top-[-55px] text-black pt-50 pl-16 sm:pl-0 bg-red-900"
        >
          {/* พื้นที่ว่างสำหรับปุ่มเมนูในโหมดมือถือ */}
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
              />
            ) : (
              <SidebarItem
                key={item.name}
                icon={item.icon}
                name={item.name}
                path={item.path}
                disabled={item.disabled}
              />
            );
          })}
        </div>
      </section>

      {/* Background overlay เมื่อเปิดเมนูบนมือถือ */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default SidebarMain;