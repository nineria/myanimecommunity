import HomePost from "@components/HomePost";
import { useThemeContext } from "@lib/useTheme";
import { Divider, Group, Select, Text } from "@mantine/core";
import React, { forwardRef, useEffect, useState } from "react";
import { Settings } from "tabler-icons-react";

export default function ThemeComponent() {
  const { theme, setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    setTheme(localData);
  }, []);

  const handleChangeTheme = (value) => {
    localStorage.setItem("themes", value);
    setTheme(value);
  };

  const data = [
    {
      color: ["bg-[#ec5555]", "bg-[#181a1d]"],
      label: "ROSE",
      value: "red",
      description: "Dark theme",
    },
    {
      color: ["bg-[#ff7315]", "bg-[#232020]"],
      label: "TIGER",
      value: "tiger",
      description: "Dark theme",
    },
    {
      color: ["bg-[#3382b8]", "bg-[#1b262c]"],
      label: "NAVY BLUE",
      value: "navy",
      description: "Dark theme",
    },
    {
      color: ["bg-[#ff5d8d]", "bg-[#323232]"],
      label: "PINKY SWEAR",
      value: "pinky",
      description: "Dark theme",
    },
    {
      color: ["bg-[#00adb5]", "bg-[#222831]"],
      label: "Cyberpunk",
      value: "punk",
      description: "Dark theme",
    },
    {
      color: ["bg-[#ec5555]", "bg-[#eeeeee]"],
      label: "MOON ROSE",
      value: "red-light",
      description: "Light theme",
    },
  ];

  const filtered = data.filter((employee) => {
    return employee.value === theme;
  });

  const SelectItem = forwardRef(({ label, description, color, value }, ref) => (
    <div
      ref={ref}
      className="hover:bg-content px-4 rounded-sm cursor-pointer"
      onClick={() => handleChangeTheme(value)}
    >
      <Group noWrap>
        <div className="flex flex-col rotate-45 rounded-full border-2 border-white">
          <div
            className={`h-2 w-4 ${color[0]} 
            rounded-tl-full rounded-tr-full`}
          />
          <div
            className={`h-2 w-4 ${color[1]} 
            rounded-bl-full rounded-br-full`}
          />
        </div>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  ));

  SelectItem.displayName = "SelectItem";

  return (
    <div className="bg-foreground my-2 w-full rounded-sm shadow-md">
      {/* Header */}
      <Group className="py-2 px-4 font-bold w-full text-title">
        <Settings size={18} />
        <h1 className="font-bold">การตั้งค่า</h1>
      </Group>
      <Divider className="opacity-50" />
      {/* Theme */}
      <div className="px-4 py-2 flex flex-row justify-between items-center">
        <div className="w-full text-title">
          <h1>ธีมของเว็บไซต์</h1>
          <h2 className="text-sm opacity-60">
            ธีมปัจจุบัน : {filtered && filtered[0]?.label}
          </h2>
        </div>
        {/* Select Theme */}
        <div className="w-[50%]">
          <Select
            placeholder="เลือกธีม"
            itemComponent={SelectItem}
            data={data}
            searchable
            value={theme}
            maxDropdownHeight={400}
            nothingFound="ไม่พบธีมที่ต้องการ"
            filter={(value, item) =>
              item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
              item.description
                .toLowerCase()
                .includes(value.toLowerCase().trim())
            }
          />
        </div>
      </div>
      {/* Option menu result changed example */}
      <div className="bg-foreground px-4 py-2">
        <OptionMenuExample />
      </div>
    </div>
  );
}

function OptionMenuExample() {
  const property = [
    {
      title: "อัพเดทข่าวสาร",
      titleLink: "/news",
      header: "ข่าวสารอนิเมะอนิเมะ & ประกาศจากเว็บไซต์",
      headerLink: "/news",
      body: "โพสต์รวบรวมอนิเมะเปิดตัวใหม่ และข่าวสารต่างๆ เกี่ยวกับอนิเมะ",
    },
    {
      title: "รีวิว อนิเมะ มังงะ สปอย",
      titleLink: "/review",
      header: "รีวิวอนิเมะเปิดตัวใหม่ และข้อมูลที่เกี่ยวข้อง",
      headerLink: "/news",
      body: "โพสต์รวบรวมรีวิวอนิเมะก่อนไปรับชม และเรื่องย่อต่างๆ พร้อมข้อมูลจำเพราะของตัวละคร ฯลฯ",
    },
    {
      title: "Q&A ถาม-ตอบ ข้อสงสัยต่างๆ",
      titleLink: "/qAndA",
      header: "โพสต์ ถาม-ตอบ ข้อสงสัยเกี่ยวกับ อนิเมะ มังงะ",
      headerLink: "/news",
      body: "โพสต์รวบรวมรีวิวอนิเมะก่อนไปรับชม และเรื่องย่อต่างๆ พร้อมข้อมูลจำเพราะของตัวละคร ฯลฯ",
    },
  ];
  return (
    <div className="bg-background p-4 rounded-sm">
      <div className="flex flex-col gap-2">
        {property.map((item, index) => (
          <HomePost dummyData={item} key={index} isDisabled={true} />
        ))}
      </div>
    </div>
  );
}
