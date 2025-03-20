// import "./sidebar.css";
// import { SidebarItemLogout } from "./sidebarItemLogout";
// import { SidebarItem } from "./sidebarItem";
// import { IoHomeOutline } from "react-icons/io5";
// import { RiProductHuntLine } from "react-icons/ri";
// import { FaWpforms } from "react-icons/fa";
// import { PiGooglePhotosLogo } from "react-icons/pi";
// import { BiCategory } from "react-icons/bi";
// import { SidebarMenuItem } from "./sidebarMenuItem";

// const SidebarMain = () => {
//   const ListSidebarItems: {
//     icon: JSX.Element;
//     name: string;
//     path: string;
//     menu?: { icon: JSX.Element; name: string; path: string }[];
//     disabled?: boolean;
//   }[] = [
//     {
//       icon: <IoHomeOutline className="text-white" style={{ width: "24px", height: "24px" }} />,
//       name: "หน้าหลัก(เติมเกม)",
//       path: `/`,
//       disabled: true,
//     },
//     {
//       icon: <PiGooglePhotosLogo className="text-white" style={{ width: "24px", height: "24px" }} />,
//       name: "ข้อมูลการเติม",
//       path: `/`,
//       disabled: true,
//     },
    
//     {
//       icon: <FaWpforms className="text-white" style={{ width: "24px", height: "24px" }} />,
//       name: "มาสเตอร์",
//       path: `/`,
//       menu: [
//         {
//           icon: <FaWpforms className="text-white" style={{ width: "24px", height: "24px" }} />,
//           name: "ชื่อเกม",
//           path: `/`,
//         },
//         {
//           icon: <FaWpforms className="text-white" style={{ width: "24px", height: "24px" }} />,
//           name: "แก้ไขราคา",
//           path: `/`,
//         },
//         {
//           icon: <FaWpforms className="text-white" style={{ width: "24px", height: "24px" }} />,
//           name: "เกม-เหรียญ/แพ็ค",
//           path: `/`,
//         },
//       ],
//     },
//   ];

//   return (
//     <section
//       style={{ boxShadow: "4px 2px 12px 0px #0A0A100F" }}
//       className=" sm:w-[256px] w-[64px]  relative z-10 h-[calc(100vh-118px)] "
//     >
//       <div className="overflow-y-auto overflow-x-hidden h-full bg-gray-800 text-gray-100">
//         {ListSidebarItems.map((item) => {
//           return item.menu && item.menu.length > 0 ? (
//             <SidebarMenuItem
//               key={item.name}
//               icon={item.icon}
//               name={item.name}
//               path={item.path}
//               menu={item.menu}
//               disabled={item.disabled}
//             />
//           ) : (
//             <SidebarItem
//               key={item.name}
//               icon={item.icon}
//               name={item.name}
//               path={item.path}
//               disabled={item.disabled}
//             />
//           );
//         })}
//       </div>

//       <div className=" fixed bottom-0 border-t-[1px] border-[#f6f7f9] ">
//         <SidebarItemLogout />
//       </div>
//     </section>
//   );
// };

// export default SidebarMain;

import "./sidebar.css";
import { SidebarItemLogout } from "./sidebarItemLogout";
import { SidebarItem } from "./sidebarItem";
import { IoHomeOutline } from "react-icons/io5";
import { PiGooglePhotosLogo } from "react-icons/pi";
import { FaWpforms } from "react-icons/fa";
import { SidebarMenuItem } from "./sidebarMenuItem";

const SidebarMain = () => {
  const ListSidebarItems: {
    icon: JSX.Element;
    name: string;
    path: string;
    menu?: { icon: JSX.Element; name: string; path: string }[];
    disabled?: boolean;
  }[] = [
    {
      icon: <IoHomeOutline className="text-white" style={{ width: "24px", height: "24px" }} />,
      name: "หน้าหลัก(เติมเกม)",
      path: `/`,
      
    },
    {
      icon: <PiGooglePhotosLogo className="text-white" style={{ width: "24px", height: "24px" }} />,
      name: "ข้อมูลการเติม",
      path: `/`,
      
    },
    {
      icon: <FaWpforms className="text-white" style={{ width: "24px", height: "24px" }} />,
      name: "มาสเตอร์",
      path: `/`,
      menu: [
        {
          icon: <FaWpforms className="text-white" style={{ width: "24px", height: "24px" }} />,
          name: "ชื่อเกม",
          path: `/`,
        },
        {
          icon: <FaWpforms className="text-white" style={{ width: "24px", height: "24px" }} />,
          name: "แก้ไขราคา",
          path: `/`,
        },
        {
          icon: <FaWpforms className="text-white" style={{ width: "24px", height: "24px" }} />,
          name: "เกม-เหรียญ/แพ็ค",
          path: `/`,
        },
      ],
    },
  ];

  return (
    <section
      style={{ boxShadow: "4px 2px 12px 0px #0A0A100F" }}
      className="sm:w-[256px] w-[64px] relative z-10 h-[calc(100vh-118px)]"
    >
      <div className="overflow-y-auto overflow-x-hidden h-full bg-gray-900 text-stone-50">
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

      {/* Sidebar logout section at the bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 ">
        <SidebarItemLogout />
      </div>
    </section>
  );
};

export default SidebarMain;
