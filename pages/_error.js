import { Button, Center, Container, Image, Stack } from "@chakra-ui/react";
import React from "react";
import { Blockquote } from "@mantine/core";
import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="h-screen bg-background">
      <Stack align="center">
        <h1 className="clip-image-text md:text-[20vw] text-[40vw]">404</h1>
        {/* <Image
          className="absolute"
          src=""
        /> */}
        <Blockquote cite="– อ๊ะ! ไม่พบหน้าเว็บไซต์ที่ร้องขอ">
          <p className="text-accent md:text-xl text-sm">
            การเดินทางนับพันไมล์ เริ่มต้นได้ด้วยก้าวเดียวเสมอ
          </p>
        </Blockquote>
        <Button>
          <Link href="/">
            <a>กลับหน้าหลัก</a>
          </Link>
        </Button>
      </Stack>
    </div>
  );
}
