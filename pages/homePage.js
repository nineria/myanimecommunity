import React from "react";
import HomePost from "@components/HomePost";
import { Container } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "@lib/context";

export default function HomePage() {
  const { user, username } = useContext(UserContext);

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

  const publicPostDummy = [
    {
      title: "อัพเดทข่าวสาร",
      titleLink: "/news",
      header: "ข่าวสารอนิเมะอนิเมะ & ประกาศจากเว็บไซต์",
      headerLink: "/news",
      body: "โพสต์รวบรวมอนิเมะเปิดตัวใหม่ และข่าวสารต่างๆ เกี่ยวกับอนิเมะ",
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
          {user ? (
            <div className="flex flex-col gap-1">
              <HomePost dummyData={postDummy[0]} />
              <HomePost dummyData={postDummy[1]} />
              <HomePost dummyData={postDummy[2]} />
            </div>
          ) : (
            <HomePost dummyData={postDummy[0]} />
          )}
        </div>
      </div>
    </div>
  );
}
