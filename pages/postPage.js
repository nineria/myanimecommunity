import {
  Container,
  Flex,
  GridItem,
  layout,
  SimpleGrid,
} from "@chakra-ui/react";
import Announcement from "@components/Announcement";
import Card from "@components/Card";
import Navbar from "@components/Navbar";
import React, { useState } from "react";
import { Animate } from "react-simple-animate";
import { GridDots, LayoutGrid, ListDetails, Menu2 } from "tabler-icons-react";

export default function postPage() {
  const [layout, setLayout] = useState("grid");

  const property = [
    {
      imageUrl:
        "https://www.anime-internet.com/content/images/size/w2000/2021/09/tileburnedin.jpg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, ea?",
      date: "1 เดือน",
      like: "25K",
      star: "4.5",
      badges: [
        {
          name: "อนิเมะ",
          color: "red",
        },
        {
          name: "คำถาม",
          color: "yellow",
        },
        {
          name: "สปอย",
          color: "green",
        },
      ],
      postType: "ANIME",
    },
    {
      imageUrl:
        "https://techxcite.com/topics/38671/thumbnail/1200one-piece-thai-version-by-cartoon-club-stop-broadcasting-due-to-copyright.jpg",
      title: "Lorem ipsum dolor sit amet.",
      date: "10 เดือน",
      like: "25K",
      star: "4.5",
      badges: [
        {
          name: "อนิเมะ",
          color: "red",
        },
        {
          name: "คำถาม",
          color: "yellow",
        },
        {
          name: "สปอย",
          color: "green",
        },
      ],
      postType: "ANIME",
    },
    {
      imageUrl:
        "https://jw-webmagazine.com/wp-content/uploads/2019/08/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2019-08-13-8.16.03-min.png",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae officiis quibusdam rem deleniti obcaecati dignissimos, architecto eveniet vel praesentium quod!",
      date: "2 เดือน",
      like: "25K",
      star: "4.5",
      badges: [
        {
          name: "อนิเมะ",
          color: "red",
        },
        {
          name: "คำถาม",
          color: "yellow",
        },
        {
          name: "สปอย",
          color: "green",
        },
      ],
      postType: "REVIEW",
    },
    {
      imageUrl:
        "https://www.matichon.co.th/wp-content/uploads/2019/07/JAPAN-FIRE2.jpg",
      title:
        "An aerial view shows firefighters battling the fires at the site where a man started a fire after spraying a liquid, at a three-story studio of Kyoto Animation Co. in Kyoto, western Japan, in this photo taken by Kyodo",
      date: "2 เดือน",
      like: "25K",
      star: "4.5",
      badges: [
        {
          name: "ข่าว",
          color: "blue",
        },
      ],
      postType: "NEWS",
    },
    {
      imageUrl:
        "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/09/Attack-on-Titan-Final-Season-Poster-Header.jpg?q=50&fit=contain&w=750&h=&dpr=1.5",
      title:
        "5 Ways Attack On Titan Is The Best Anime Of Winter 2021 (& 5 It's Overhyped)",
      date: "2 เดือน",
      like: "25K",
      star: "4.5",
      badges: [
        {
          name: "ข่าว",
          color: "blue",
        },
      ],
      postType: "NEWS",
    },
  ];

  const AnnoProperty = {
    type: "danger",
    content:
      "ประกาศปิดปรับปรุงเว็บไซต์ในวันที่ 21 เมษายน 2022 ขออภัยผู้ใช้และสมาชิกชุมชนคนรักอนิเมะทุกท่าน การปิดปรับปรุงครั้งนี้มีขึ้นเพื่อเพิ่มประสมการณ์ใช้เว็บไซต์ของเราให้ดยิ่งขึ้น(เพิ่มเติม) ในส่วนของการเขียนโพสต์สามารถใช้ได้ตามปกติแล้ว และ Back-endใหม่ของเราจะมีประสิทธิภาพมากขึ้นกว่าเดิม (รวมถึง UI แบบใหม่) ทั้งนี้ ขอขอบคุณสำหรับความอดทนของทุกคน",
  };

  return (
    <div className="bg-[#181a1d] text-white">
      <Navbar page="/postPage" />
      <Container maxW="container.xl">
        {/* Announcement */}
        <Announcement type={AnnoProperty.type} content={AnnoProperty.content} />
        {/* Menu Controller */}
        <MenuController layout={layout} setLayout={setLayout} />
        {/* Posts */}
        <AllPost property={property} layout={layout} />
      </Container>
    </div>
  );
}

function MenuController({ layout, setLayout }) {
  return (
    <div className="flex flex-row justify-between w-full bg-[#282a2d] rounded-sm mt-2 p-1">
      <div className="flex items-center px-1 bg-[#ec5555] w-fit rounded-sm font-bold text-sm hover:opacity-75 cursor-pointer">
        สร้างโพสต์ +
      </div>
      <div className="flex flex-row gap-2">
        {/* <div className="p-1 bg-[#494d53] w-fit rounded-sm font-bold text-sm hover:opacity-75 cursor-pointer">
          <Menu2 />
        </div> */}
        <div className="p-1 bg-[#494d53] w-fit rounded-sm font-bold text-sm hover:opacity-75 cursor-pointer">
          <LayoutGrid size={17} onClick={() => setLayout("grid")} />
        </div>
        <div className="p-1 bg-[#494d53] w-fit rounded-sm font-bold text-sm hover:opacity-75 cursor-pointer">
          <ListDetails size={17} onClick={() => setLayout("list")} />
        </div>
      </div>
    </div>
  );
}

function AllPost({ property, layout }) {
  return (
    <Animate
      play
      start={{ transform: "translateY(5%)", opacity: "0" }}
      end={{ transform: "translateY(0%)", opacity: "1" }}
    >
      {layout === "grid" ? (
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3 }}
          spacingX={2}
          spacingY={5}
          paddingTop={2}
        >
          {property &&
            property.map((data, index) => (
              <Card layout={layout} key={index} property={data} />
            ))}
        </SimpleGrid>
      ) : (
        <Flex flexDirection="column" gap={1} paddingTop={2}>
          {property &&
            property.map((data, index) => (
              <Card layout={layout} key={index} property={data} />
            ))}
        </Flex>
      )}
    </Animate>
  );
}
