import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type SidebarItemProps = {
  icon: ReactNode;
  name: string;
  path: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const SidebarItem = (props: SidebarItemProps) => {
  const location = useLocation();
  const pathWithIndex = location.pathname.split("/")[1];
  const path = props.path.replace("/", "");
  const isActivePath = pathWithIndex ? path.includes(pathWithIndex) : false;

  const activeClassName = isActivePath
    ? "text-text_main_blue border-l-[#074E9F] bg-bg_main"
    : "border-l-white";

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <Link
      to={props.path}
      className={twMerge(
        `sm:w-[256px] w-[60px] h-[48px] p-2 flex gap-2 items-center hover:bg-red-700  active:text-black cursor-pointer ${props.disabled ? "pointer-events-none bg-gray-800" : ""
        }`,
        activeClassName
      )}
      onClick={handleClick}
    >
      {props.icon}
      <div className=" text-4 leading-6 font-normal hidden sm:block  text-white hover:text-slate-400 ">
        {props.name}
      </div>
    </Link>
  );
};
