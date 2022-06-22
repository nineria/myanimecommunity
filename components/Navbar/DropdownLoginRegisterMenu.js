import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Portal,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { DeviceGamepad, Login, Settings, UserPlus } from "tabler-icons-react";

export default function DropdownLoginRegisterMenu({ login, register, toggle }) {
  return (
    <Menu>
      <Tooltip
        label="คลิกที่นี่! เพื่อเข้าสู่ระบบหรือลงทะเบียน"
        aria-label="login or Register"
      >
        <MenuButton
          className={`${toggle === true ? "rotate-90" : ""} transition-all`}
        >
          <DeviceGamepad />
        </MenuButton>
      </Tooltip>
      <Portal>
        <MenuList mt="2" fontSize="sm" backgroundColor="#25262b" color="white">
          <MenuGroup title="เข้าสู่ระบบหรือลงทะเบียน" color="gray.400">
            <Link href={login}>
              <MenuItem
                _hover={{ bg: "#181a1d" }}
                className="group"
                _focus={{ bg: "#181a1d" }}
              >
                <a className="flex flex-row gap-2">
                  <Login />
                  เข้าสู่ระบบ
                </a>
              </MenuItem>
            </Link>
            <Link href={register}>
              <MenuItem
                _hover={{ bg: "#181a1d" }}
                className="group"
                _focus={{ bg: "#181a1d" }}
              >
                <a className="flex flex-row gap-2">
                  <UserPlus />
                  ลงทะเบียน
                </a>
              </MenuItem>
            </Link>
          </MenuGroup>
        </MenuList>
      </Portal>
    </Menu>
  );
}
