import React, { useEffect, useState } from "react";
// Context
import { useThemeContext } from "@lib/useTheme";
// Components
import PostsMenuController from "@components/Post/MenuController";
import PostLayout from "@components/Post/PostLayout";
// Icons
import { Settings } from "tabler-icons-react";

export default function PostLayoutComponent({ data }) {
  const [layout, setLayout] = useState("grid");

  const { setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red-light");
      setTheme("red-light");
    }
    setTheme(localData);
  }, [setTheme]);

  return (
    <div className="bg-foreground my-2 w-full rounded-sm shadow-md">
      {/* Header */}
      <div className="flex flex-row items-center gap-1 px-4 py-2 ">
        <Settings size={20} />
        <h1 className="font-bold">การตั้งค่าเลย์เอาท์</h1>
      </div>
      <div className="py-[0.5px] w-full bg-[#ccc]" />
      {/* Theme */}
      <div className="px-4 py-2 flex flex-row justify-between items-center">
        <div className="w-full">
          <h1>ธีมของเว็บไซต์</h1>
          <h2 className="text-sm text-[#aaa]"></h2>
        </div>
      </div>
      {/* Menu Controller */}
      <PostsMenuController layout={layout} setLayout={setLayout} />
      {/* Posts */}
      <PostLayout property={data} layout={layout} />
    </div>
  );
}
