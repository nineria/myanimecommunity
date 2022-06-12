import { Container } from "@chakra-ui/react";
import Announcement from "@components/Announcement";
import Navbar from "@components/Navbar";
import PostLayout from "@components/Posts/PostLayout";
import PostsMenuController from "@components/Posts/MenuController";
import React, { useState } from "react";

export default function NewsPage() {
  const [layout, setLayout] = useState("grid");

  const property = [
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

  return (
    <div className="bg-[#181a1d] text-white">
      <Navbar page="/news" />
      <Container maxW="container.xl">
        {/* Announcement */}
        <Announcement
          type="success"
          content="Attack on Titan ประกาศสร้าง The Final Season Part 3 ฉบับซีรีส์ พร้อมวางกำหนดฉายภายในปี 2023 โดย Attack on Titan The Final Season Part 3 จะยังคงได้สตูดิโอ MAPPA มารับหน้าที่ดูแลการผลิตเช่นเดิม พร้อมด้วย ยูอิจิโระ ฮายาชิ ผู้กำกับจาก The Final Season Part 1-2 มารับหน้าที่ปิดฉากสงครามระหว่างมนุษยชาติและเหล่าไททันในครั้งนี้"
        />
        {/* Menu Controller */}
        <PostsMenuController layout={layout} setLayout={setLayout} />
        {/* Posts */}
        <PostLayout property={property} layout={layout} />
      </Container>
    </div>
  );
}
