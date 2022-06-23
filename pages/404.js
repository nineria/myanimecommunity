import React from "react";
import { Blockquote, Stack } from "@mantine/core";
import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="h-screen bg-background">
      <Stack align="center">
        <h1 className="clip-image-text md:text-[23vw] text-[43vw]">404</h1>
        <Blockquote cite="– อ๊ะ! ไม่พบหน้าเว็บไซต์ที่ร้องขอ">
          <p className="text-accent md:text-xl text-sm">
            การเดินทางนับพันไมล์ เริ่มต้นได้ด้วยก้าวเดียวเสมอ
          </p>
        </Blockquote>
        <Link href="/">
          <a className="bg-content text-accent px-2 py-1 rounded-sm hover:opacity-75">
            กลับหน้าหลัก
          </a>
        </Link>
      </Stack>
    </div>
  );
}
