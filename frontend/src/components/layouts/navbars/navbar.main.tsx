import { Avatar, Box, Flex, HoverCard, Link, Text } from "@radix-ui/themes";
import { FaCaretDown } from "react-icons/fa";
import ListMenuNavbarProfile from "./listMenuNavbarProfile.tsx";

const NavbarProfileInfo = () => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Flex className="text-gray-700 mr-8" align={"center"} gap={"4"}>
          <Box className="relative">
            <Box className="w-3 h-3 rounded-full bg-green-600 absolute border-white border-2 bottom-0 right-0"></Box>
            <Avatar
              src="/images/avatar2.png"
              fallback={"/images/avatar2.png"}
              size={"2"}
            />
          </Box>
          <Text className="text-sm text-white">Admin</Text>
          <FaCaretDown className="text-white" />
        </Flex>
      </HoverCard.Trigger>
      <HoverCard.Content maxWidth="300px">
        <Flex gap={"2"} direction={"column"} width={"140px"}>
          <ListMenuNavbarProfile title={"ออกจากระบบ"} />
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

const NavbarMain = () => {
  return (
    <Flex
      className="absolute w-full top-0 h-[70px] shadow-navbar  z-20  bg-red-900" // ใช้สีพื้นหลังเทาอ่อน
      justify={"center"}
    >
      <Flex
        className="w-full"
        justify={"between"}
        style={{
          boxShadow: "0 2px 4px rgba(0,0,0,.08)", // ลดความเข้มของเงา
          padding: "15px 15px",
        }}
      >
        <Link href={"/"}>
          <Box className="overflow-hidden sm:w-[320px] w-[320px]">
            <Box className="relative w-[320px] h-[70px]">
              <img
                src="/images/supersixnav.png"
                alt="logo-main-website"
                className="hover:cursor-pointer hover:opacity-80 opacity-100 transition ease-in-out duration-300 h-[40px]"
              />
            </Box>
          </Box>
        </Link>
        <NavbarProfileInfo />
      </Flex>
    </Flex>
  );
};

export default NavbarMain;
