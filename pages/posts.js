import Announcement from "@components/Announcement";
import Navbar from "@components/Navbar";
import React, { useEffect, useState } from "react";
import PostsMenuController from "@components/PostComponent/MenuController";
import PostLayout from "@components/PostComponent/PostLayout";
import { useThemeContext } from "@lib/useTheme";
import { Container } from "@mantine/core";
import { Footer } from "@components/Footer";

export default function PostsPage() {
  const [layout, setLayout] = useState("grid");

  const { setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    setTheme(localData);
  }, []);

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
          color: "",
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
          color: "",
        },
      ],
      postType: "NEWS",
    },
  ];

  const AnnouncementProperty = {
    type: "danger",
    title: "ประกาศปิดปรับปรุงเว็บไซต์",
    content: `ขออภัยผู้ใช้และสมาชิกชุมชนคนรักอนิเมะทุกท่าน ในวันที่ 21 เมษายน 2022 จะมีการปิดปรับปรุงเพื่อเพิ่มประสบการณ์ใช้เว็บไซต์ของเราให้ดียิ่งขึ้น \n(เพิ่มเติม) ในส่วนของการเขียนโพสต์สามารถใช้ได้ตามปกติแล้ว และ Back-endใหม่ของเราจะมีประสิทธิภาพมากขึ้นกว่าเดิม (รวมถึง UI แบบใหม่) ทั้งนี้ ขอขอบคุณสำหรับความอดทนของทุกคน`,
  };

  return (
    <>
      <div className="bg-background text-white pb-4 min-h-[1024px]">
        <Navbar page="/posts" />
        <Container size="lg">
          {/* Announcement */}
          <Announcement
            type={AnnouncementProperty.type}
            title={AnnouncementProperty.title}
            content={AnnouncementProperty.content}
          />
          {/* Menu Controller */}
          <PostsMenuController layout={layout} setLayout={setLayout} />
          {/* Posts */}
          <PostLayout property={property} layout={layout} />
        </Container>
      </div>
      <Footer />
    </>
  );
}
