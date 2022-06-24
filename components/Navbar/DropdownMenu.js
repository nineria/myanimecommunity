import { Avatar, Group, Indicator, Menu, Text } from "@mantine/core";

import Link from "next/link";
import React from "react";
import { Logout } from "tabler-icons-react";
import { settingMenuProperty, accessMenuProperty } from "./DummyData";

export default function UserMenu({ user, isBusy, signOut }) {
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
  );
}
