import { Select } from "@chakra-ui/react";
import HomePost from "@components/HomePost";
import { useThemeContext } from "@lib/useTheme";
import React, { useEffect, useState } from "react";
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

  const handleChangeTheme = (e) => {
    const tmpTheme = e.target.value;
    localStorage.setItem("themes", tmpTheme);
    setTheme(tmpTheme);
  };

  const options = [
    {
      label: "[DARK] ROSE",
      value: "red",
    },
    {
      label: "[DARK] TIGER",
      value: "tiger",
    },
    {
      label: "[DARK] NAVY BLUE",
      value: "navy",
    },
    {
      label: "[DARK] PINKY SWEAR",
      value: "pinky",
    },
    {
      label: "[DARK] Cyberpunk",
      value: "punk",
    },
    {
      label: "[LIGHT] ROSE",
      value: "red-light",
    },
    {
      label: "[LIGHT] TIGER",
      value: "tiger-light",
    },
    {
      label: "[LIGHT] NAVY BLUE",
      value: "navy-light",
    },
  ];

  const filtered = options.filter((employee) => {
    return employee.value === theme;
  });

  return (
    <div className="bg-foreground my-2 w-full rounded-sm shadow-md">
      {/* Header */}
      <div className="flex flex-row items-center gap-1 px-4 py-2 ">
        <Settings size={20} />
        <h1 className="font-bold">การตั้งค่าธีม</h1>
      </div>
      <div className="py-[0.5px] w-full bg-[#ccc]" />
      {/* Theme */}
      <div className="px-4 py-2 flex flex-row justify-between items-center">
        <div className="w-full">
          <h1>ธีมของเว็บไซต์</h1>
          <h2 className="text-sm text-[#aaa]">
            ธีมปัจจุบัน : {filtered && filtered[0]?.label}
          </h2>
        </div>
        {/* Select option */}
        <Select
          size="sm"
          placeholder="เลือกธีม"
          variant="filled"
          color="#fff"
          onChange={(e) => handleChangeTheme(e)}
        >
          {options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
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
