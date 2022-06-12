import { Container } from "@chakra-ui/react";
import Announcement from "@components/Announcement";
import Navbar from "@components/Navbar";
import PostLayout from "@components/Posts/PostLayout";
import PostsMenuController from "@components/Posts/MenuController";
import React, { useState } from "react";

export default function QAndAPage() {
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
          name: "คำถาม",
          color: "green",
        },
      ],
      postType: "ANIME",
    },
  ];

  return (
    <div className="bg-[#181a1d] text-white">
      <Navbar page="/qanda" />
      <Container maxW="container.xl">
        {/* Announcement */}
        {/* <Announcement
          type="success"
          content="Attack on Titan ประกาศสร้าง The Final Season Part 3 ฉบับซีรีส์ พร้อมวางกำหนดฉายภายในปี 2023 โดย Attack on Titan The Final Season Part 3 จะยังคงได้สตูดิโอ MAPPA มารับหน้าที่ดูแลการผลิตเช่นเดิม พร้อมด้วย ยูอิจิโระ ฮายาชิ ผู้กำกับจาก The Final Season Part 1-2 มารับหน้าที่ปิดฉากสงครามระหว่างมนุษยชาติและเหล่าไททันในครั้งนี้"
        /> */}
        {/* Menu Controller */}
        <PostsMenuController layout={layout} setLayout={setLayout} />
        {/* Posts */}
        <PostLayout property={property} layout={layout} />
      </Container>
    </div>
  );
}
