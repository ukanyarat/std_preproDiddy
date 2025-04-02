import { Avatar, Box, Flex, HoverCard, Link, Text } from "@radix-ui/themes";
import { FaCaretDown } from "react-icons/fa";
import ListMenuNavbarProfile from "./listMenuNavbarProfile.tsx";


const NavbarMain = () => {
  return (
    <Flex 
      className="absolute w-full top-0 h-[70px] shadow-navbar z-20 bg-red-900"
      justify={"center"}
    >
      <Flex 
        className="w-full"
        justify={"between"}
        align={"center"}
        style={{
          boxShadow: "0 2px 4px rgba(0,0,0,.08)",
          padding: "15px 15px",
        }}
      >
        <Box className="flex-1">
          {/* ช่องว่างทางซ้าย */}
        </Box>
        
        <Link href={"/"} className="flex justify-center flex-1">
          <Box className="flex justify-center items-center">
            <img 
              src="/images/Screenshot_2025-04-02_213204-removebg-preview.png"
              alt="logo-main-website"
              className="hover:cursor-pointer hover:opacity-80 opacity-100 transition ease-in-out duration-300 h-[52px]"
            />
          </Box>
        </Link>
        
        <Box className="flex-1 flex justify-end">
        </Box>
      </Flex>
    </Flex>
  );
};

export default NavbarMain;