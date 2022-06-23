// import {
//   Avatar,
//   AvatarBadge,
//   Menu,
//   MenuButton,
//   MenuDivider,
//   MenuGroup,
//   MenuItem,
//   MenuList,
//   Portal,
// } from "@chakra-ui/react";
import {
  Avatar,
  Group,
  Indicator,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";

import Link from "next/link";
import React, { forwardRef } from "react";
import { ChevronRight, Logout, Photo } from "tabler-icons-react";
import { settingMenuProperty, accessMenuProperty } from "./DummyData";

export default function UserMenu({ user, isBusy, toggle, signOut }) {
  return (
    <Group position="center">
      <div className="flex flex-row items-center gap-2">
        <Link href="/profile">
          <a className="md:flex hidden flex-row gap-2 items-center cursor-pointer">
            <Indicator
              inline
              size={12}
              offset={5}
              position="bottom-end"
              color={isBusy ? "red" : "green"}
              withBorder
            >
              <Avatar
                name={user?.displayName || "username"}
                src={user?.photoURL}
                radius="xl"
              />
            </Indicator>
            <div style={{ flex: 1 }}>
              <div className="text-sm font-bold truncate text-title opacity-80">
                {user?.displayName || "username"}
              </div>

              <Text color="dimmed" size="xs">
                {user?.email || "email"}
              </Text>
            </div>
          </a>
        </Link>
        <Menu withArrow placement="end">
          {/* Setting */}
          <Menu.Label>การตั้งค่า</Menu.Label>
          {settingMenuProperty &&
            settingMenuProperty.map((item, index) => (
              <Link href={item.link} key={index}>
                <Menu.Item className="hover:bg-content" icon={item.icon}>
                  {item.name}
                </Menu.Item>
              </Link>
            ))}
          {/* Pages */}
          <Menu.Label>การเข้าถึง</Menu.Label>
          {accessMenuProperty &&
            accessMenuProperty.map((item, index) => (
              <Link href={item.link} key={index}>
                <Menu.Item className="hover:bg-content" icon={item.icon}>
                  {item.name}
                </Menu.Item>
              </Link>
            ))}
          {/* Sign out */}
          <Menu.Label>ออกจากระบบ</Menu.Label>
          <Menu.Item
            icon={<Logout size={14} />}
            onClick={signOut}
            className="hover:bg-accent"
            color="red"
          >
            ออกจากระบบ
          </Menu.Item>
        </Menu>
      </div>
    </Group>
    // <Menu>
    //   {/* Profile */}
    //   <MenuButton>
    //     <Profile user={user} isBusy={isBusy} toggle={toggle} />
    //   </MenuButton>
    //   {/* Dropdown menu */}
    //   <DropdownMenu
    //     settingMenu={settingMenuProperty}
    //     accessMenu={accessMenuProperty}
    //     signOut={signOut}
    //   />
    // </Menu>
  );
}

const UserButton = forwardRef(({ user, icon }, ref) => (
  <UnstyledButton
    ref={ref}
    sx={(theme) => ({
      display: "block",
      width: "100%",
      padding: theme.spacing.md,
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
      },
    })}
  >
    <Group></Group>
  </UnstyledButton>
));

function Profile({ user, isBusy, toggle }) {
  return (
    <div className="flex flex-row gap-3 items-center">
      {/* Profile Image */}
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
      {/* Name and Email */}
      <div className="hidden md:flex flex-col text-sm font-bold">
        <div className="text-left min-w-max">
          {user?.displayName || "username"}
        </div>
        <div className="text-left text-gray-400 text-xs">
          {user?.email || "username"}
        </div>
      </div>
      {/* Open dropdown menu */}
      <div className={`${toggle === true ? "rotate-90" : ""} transition-all`}>
        <Settings />
      </div>
    </div>
  );
}

function DropdownMenu({ settingMenu, accessMenu, signOut }) {
  return (
    <Portal>
      <MenuList mt="2" fontSize="sm" backgroundColor="#25262b" color="white">
        <MenuGroup title="การตั้งค่า" color="gray.400">
          {settingMenu &&
            settingMenu.map((item, index) => (
              <Link href={item.link} key={index}>
                <MenuItem
                  _hover={{ bg: "#181a1d" }}
                  className="group"
                  _focus={{ bg: "#181a1d" }}
                >
                  <a className="flex flex-row gap-2">
                    {item.icon}
                    {item.name}
                  </a>
                </MenuItem>
              </Link>
            ))}
          <MenuDivider />
          <MenuGroup title="การเข้าถึง" color="gray.400">
            {accessMenu &&
              accessMenu.map((item, index) => (
                <Link href={item.link} key={index}>
                  <MenuItem
                    _hover={{ bg: "#181a1d" }}
                    className="group"
                    _focus={{ bg: "#181a1d" }}
                  >
                    <a className="flex flex-row gap-2">
                      {item.icon}
                      {item.name}
                    </a>
                  </MenuItem>
                </Link>
              ))}
            <MenuDivider />
          </MenuGroup>
        </MenuGroup>
        <MenuItem
          color="red.400"
          onClick={signOut}
          _hover={{ bg: "#181a1d" }}
          _focus={{ bg: "#181a1d" }}
        >
          <div className="flex flex-row gap-2">
            <Logout />
            ออกจากระบบ
          </div>
        </MenuItem>
      </MenuList>
    </Portal>
  );
}
