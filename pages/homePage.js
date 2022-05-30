import React from "react";
import HomePost from "@components/HomePost";
import { Button, Container, Tooltip } from "@chakra-ui/react";
import { BookDownload, SquarePlus } from "tabler-icons-react";
import { ViewOffIcon } from "@chakra-ui/icons";
import ReactTooltip from "react-tooltip";

export default function HomePage() {
  const postDummy = [
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
    <div>
      <div className="h-full text-white">
        <Container maxW="container.xl">
          <div className="flex flex-row justify-between w-full">
            <h1 className="bg-[#ec5555] w-fit px-3 mb-2 rounded-sm cursor-pointer hover:translate-y-[1px] hover:opacity-75">
              สร้าง +
            </h1>
          </div>
        </Container>
        <div className="flex flex-col gap-2">
          <HomePost dummyData={postDummy[0]} />
          <HomePost dummyData={postDummy[1]} />
          <HomePost dummyData={postDummy[2]} />
        </div>
        <div className="h-[400px]"></div>
      </div>
    </div>
  );
}
