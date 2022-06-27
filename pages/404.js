import React, { useEffect } from "react";
import { Blockquote, Stack, useMantineColorScheme } from "@mantine/core";
import Link from "next/link";
import { useThemeContext } from "@lib/useTheme";

export default function PageNotFound() {
  const { setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    setTheme(localData);
  }, [setTheme]);

  return (
    <div className="h-screen bg-background">
      <Stack align="center">
        <h1 className="clip-image-text md:text-[20vw] text-[43vw]">404</h1>
        <Stack align="center" className="bg-foreground lg:p-8 p-4 rounded-sm">
          <Blockquote cite="– อ๊ะ! ไม่พบหน้าเว็บไซต์ที่ร้องขอ">
            <p className="text-title md:text-xl text-sm">
              การเดินทางนับพันไมล์ เริ่มต้นได้ด้วยก้าวเดียวเสมอ
            </p>
          </Blockquote>
          <Link href="/">
            <a className="bg-content md:text-base text-xs text-accent px-2 py-1 w-fit rounded-sm hover:opacity-75">
              กลับหน้าหลัก
            </a>
          </Link>
        </Stack>
      </Stack>
    </div>
  );
}
