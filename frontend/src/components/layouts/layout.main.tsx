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
        <SidebarMain />
        <div
          style={{
            backgroundImage: "url('/images/JCAR-2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }} className="p-4 overflow-auto w-full">
          <div className="bg-[#fffcfc] overflow-auto w-full sm:p-6 rounded-lg shadow-sm border-4 p-4"><Outlet /></div>
        </div>
      </div>
    </div>
  );
};
export default MainLayout;

// export default MainLayout;
// import { Outlet, useLocation } from "react-router-dom";
// import NavbarMain from "./navbars/navbar.main";
// import SidebarMain from "./sidebars/sidebar.main";
// import { useEffect } from "react";
// import { getAuthStatus } from "@/services/auth.service";
// import { useNavigate } from "react-router-dom";

// const MainLayout = () => {
//   const location = useLocation();
//   const isDrivePage = location.pathname === "/drive";
//   return (
//     <div className=" relative w-screen h-screen">
//       <NavbarMain />
//       <div className=" flex pt-[70px] w-full h-full">
//         <SidebarMain />
//         <div
//           style={{
//             backgroundImage: "url('/images/JCAR-2.jpg')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//           className={`${isDrivePage ? "overflow-auto w-full" : "p-4 overflow-auto w-full"}`}
//         >
//           <div className="bg-[#fffcfc] overflow-auto w-full sm:p-6 rounded-lg shadow-sm border-4 "><Outlet /></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;
