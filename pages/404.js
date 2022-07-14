import React, { useEffect } from "react";
import { Blockquote, Button, Center, Stack } from "@mantine/core";
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
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-background">
      <Stack align="center">
        <h1 className="clip-image-text md:text-[20vw] text-[43vw]">404</h1>
        <div className="bg-foreground lg:p-8 p-4 rounded-sm ">
          <Blockquote cite="– อ๊ะ! ไม่พบหน้าเว็บไซต์ที่ร้องขอ">
            <p className="text-title md:text-xl text-sm">
              การเดินทางนับพันไมล์ เริ่มต้นได้ด้วยก้าวเดียวเสมอ
            </p>
          </Blockquote>
          <Center>
            <Link href="/">
              <Button
                className="bg-content  text-[#fff] hover:bg-content hover:opacity-75"
                variant="default"
              >
                กลับหน้าหลัก
              </Button>
            </Link>
          </Center>
        </div>
      </Stack>
    </div>
  );
}
