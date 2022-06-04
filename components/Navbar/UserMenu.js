import {
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import {
  Logout,
  Users,
  Settings,
  MoodHappy,
  MoodSuprised,
  MoodConfuzed,
} from "tabler-icons-react";

export default function UserMenu({ user, isBusy, toggle, signOut }) {
  const settingMenu = [
    {
      name: "โปรไฟล์",
      link: "/profile",
      icon: <Users className="group-hover:rotate-12 transition-all" />,
    },
    {
      name: "ตั้งค่า",
      link: "/setting",
      icon: <Settings className="group-hover:rotate-12 transition-all" />,
    },
  ];

  const accessMenu = [
    {
      name: "ข่าวสาร",
      link: "/news",
      icon: <MoodHappy className="group-hover:rotate-12 transition-all" />,
    },
    {
      name: "รีวิว",
      link: "/review",
      icon: <MoodSuprised className="group-hover:rotate-12 transition-all" />,
    },
    {
      name: "Q&A ถามตอบ",
      link: "/qAndA",
      icon: <MoodConfuzed className="group-hover:rotate-12 transition-all" />,
    },
  ];

  return (
    <Menu>
      <MenuButton>
        <div className="flex flex-row gap-3 items-center">
          <div className="">
            <Avatar
              name={user?.displayName || "username"}
              src={user?.photoURL}
              bg="white"
              size="sm"
            >
              {isBusy === true ? (
                <AvatarBadge boxSize="0.9em" bg="red.500" />
              ) : (
                <AvatarBadge boxSize="0.9em" bg="green.500" />
              )}
            </Avatar>
          </div>

          <div className="hidden md:flex flex-col text-sm font-bold">
            <div className="text-left">{user?.displayName || "username"}</div>
            <div className="text-left text-gray-400 text-xs">
              {user?.email || "username"}
            </div>
          </div>
          <div
            className={`${toggle === true ? "rotate-90" : ""} transition-all`}
          >
            <Settings />
          </div>
        </div>
      </MenuButton>
      {/* Dropdown menu */}
      <Portal>
        <MenuList mt="2" fontSize="sm" backgroundColor="#25262b" color="white">
          <MenuGroup title="การตั้งค่า" color="gray.400">
            {settingMenu &&
              settingMenu.map((item, index) => (
                <MenuItem
                  key={index}
                  _hover={{ bg: "#181a1d" }}
                  className="group"
                  _focus={{ bg: "#181a1d" }}
                >
                  <Link href="/enter">
                    <a className="flex flex-row gap-2">
                      {item.icon}
                      {item.name}
                    </a>
                  </Link>
                </MenuItem>
              ))}
            <MenuDivider />
            <MenuGroup title="การเข้าถึง" color="gray.400">
              {accessMenu &&
                accessMenu.map((item, index) => (
                  <MenuItem
                    key={index}
                    _hover={{ bg: "#181a1d" }}
                    className="group"
                    _focus={{ bg: "#181a1d" }}
                  >
                    <Link href="/enter">
                      <a className="flex flex-row gap-2">
                        {item.icon}
                        {item.name}
                      </a>
                    </Link>
                  </MenuItem>
                ))}
              <MenuDivider />
            </MenuGroup>
          </MenuGroup>
          <MenuItem
            color="red.400"
            onClick={signOut}
            _hover={{ bg: "#181a1d" }}
            _focus={{ bg: "#181a1d" }}
            className="group"
          >
            <div className="flex flex-row gap-2">
              <Logout className="group-hover:rotate-12 transition-all" />
              ออกจากระบบ
            </div>
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
}
