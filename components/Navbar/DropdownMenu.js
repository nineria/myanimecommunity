import React, { useContext } from "react";
import Link from "next/link";
// Components
import { Avatar, Group, Indicator, Menu, Text } from "@mantine/core";
import { accessMenuProperty } from "./DummyData";
// Icons
import { Logout, Settings, Users, ZoomQuestion } from "tabler-icons-react";
import { UserContext } from "@lib/context";

export default function UserMenu({ user, isBusy, signOut }) {
  const { username } = useContext(UserContext);

  const settingMenuProperty = [
    {
      name: "โปรไฟล์",
      link: `/${username}`,
      icon: <Users size={14} />,
    },
    {
      name: "ตั้งค่า",
      link: "/setting",
      icon: <Settings size={14} />,
    },
    {
      name: "คำถามที่พบบ่อย",
      link: "/faq",
      icon: <ZoomQuestion size={14} />,
    },
  ];

  return (
    <Group position="center">
      <div className="flex flex-row items-center gap-2">
        <Link href={`/${username}`}>
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
                name={user?.username || "ไม่พบข้อมูล"}
                src={user?.avatar}
                radius="xl"
              />
            </Indicator>
            <div style={{ flex: 1 }}>
              <div className="text-sm font-bold truncate text-title opacity-80">
                {user?.username || "ไม่พบข้อมูล"}
              </div>

              <Text color="dimmed" size="xs">
                {user?.email || "ไม่พบข้อมูล"}
              </Text>
            </div>
          </a>
        </Link>
        <Menu
          withArrow
          placement="end"
          shadow="md"
          classNames={{
            root: "bg-foreground",
            body: "bg-foreground border-background",
            itemHovered: "bg-content",
            arrow: "bg-foreground border-background",
          }}
        >
          {/* Setting */}
          <Menu.Label>การตั้งค่า</Menu.Label>
          {settingMenuProperty &&
            settingMenuProperty.map((item, index) => (
              <Link href={item.link} key={index}>
                <Menu.Item
                  className="hover:bg-content hover:text-[#fff]"
                  icon={item.icon}
                >
                  {item.name}
                </Menu.Item>
              </Link>
            ))}
          {/* Pages */}
          <Menu.Label>การเข้าถึง</Menu.Label>
          {accessMenuProperty &&
            accessMenuProperty.map((item, index) => (
              <Link href={item.link} key={index}>
                <Menu.Item
                  className="hover:bg-content hover:text-[#fff]"
                  icon={item.icon}
                >
                  {item.name}
                </Menu.Item>
              </Link>
            ))}
          {/* Sign out */}
          <Menu.Label>ออกจากระบบ</Menu.Label>
          <Menu.Item
            icon={<Logout size={14} />}
            onClick={signOut}
            className="hover:bg-content hover:text-[#fff]"
            color="red"
          >
            ออกจากระบบ
          </Menu.Item>
        </Menu>
      </div>
    </Group>
  );
}
