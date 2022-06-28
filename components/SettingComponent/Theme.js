import HomePost from "@components/HomePost";
import { useThemeContext } from "@lib/useTheme";
import {
  Divider,
  Group,
  Select,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Settings } from "tabler-icons-react";

export default function ThemeComponent({ samplePost, localTheme }) {
  const { theme, setTheme } = useThemeContext();

  const { toggleColorScheme } = useMantineColorScheme();

  const handleToggleColorScheme = useCallback(() => {
    const localData = localStorage.getItem("themes");
    if (localData === "red-light") toggleColorScheme("light");
    else toggleColorScheme("dark");
  }, [toggleColorScheme]);

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }

    handleToggleColorScheme();

    setTheme(localData);
  }, [setTheme, handleToggleColorScheme]);

  const handleChangeTheme = (value) => {
    if (value === "red-light") toggleColorScheme("light");
    else toggleColorScheme("dark");

    localStorage.setItem("themes", value);
    setTheme(value);
  };

  const filtered = localTheme.filter((employee) => {
    return employee.value === theme;
  });

  const SelectItem = forwardRef(({ label, description, color, value }, ref) => (
    <div
      ref={ref}
      className="hover:bg-content text-title hover:text-[#fff] px-2 cursor-pointer"
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
        <Text size="lg" className="font-bold ">
          การตั้งค่า
        </Text>
      </Group>
      <Divider className="opacity-50" />
      {/* Theme */}
      <div className="px-4 py-2 flex flex-row justify-between items-center">
        <div className="w-full text-title">
          <Text className="font-bold ">การตั้งค่า</Text>
          <Text size="xs" className="font-bold opacity-50">
            ธีมปัจจุบัน : {filtered && filtered[0]?.label}
          </Text>
        </div>
        {/* Select Theme */}
        <div className="w-[50%]">
          <Select
            placeholder="เลือกธีม"
            itemComponent={SelectItem}
            data={localTheme}
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
            classNames={{
              dropdown: "bg-foreground",
              nothingFound: "bg-foreground text-title",
              wrapper: "your-wrapper-class",
              invalid: "your-invalid-class",
              input: "bg-background text-title",
            }}
          />
        </div>
      </div>
      {/* Option menu result changed example */}
      <div className="bg-foreground px-4 py-2">
        <OptionMenuExample samplePost={samplePost} />
      </div>
    </div>
  );
}

function OptionMenuExample({ samplePost }) {
  const samplePosts = samplePost.map((item, index) => (
    <HomePost dummyData={item} key={index} isDisabled={true} />
  ));

  return (
    <div className="bg-background p-4 rounded-sm">
      <div className="flex flex-col gap-2">{samplePosts}</div>
    </div>
  );
}
