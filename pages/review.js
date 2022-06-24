import Announcement from "@components/Announcement";
import Navbar from "@components/Navbar";
import PostLayout from "@components/PostComponent/PostLayout";
import PostsMenuController from "@components/PostComponent/MenuController";
import { Container } from "@mantine/core";

import React, { useEffect, useState } from "react";
import { useThemeContext } from "@lib/useTheme";
import { Footer } from "@components/Footer";

export default function ReviewPage() {
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
          name: "รีวิว",
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
          name: "รีวิว",
          color: "green",
        },
      ],
      postType: "ANIME",
    },
  ];

  // Announcement property
  const AnmProperty = {
    type: "warning",
    header: "เนื้อหาอาจมีการสปอย!",
    content:
      'โปรดทราบว่าในหมวดหมู่ "รีวิวอนิเมะ" อาจมีการเปิดเผย(สปอย)เนื้อหาบางส่วนหรือทั้งหมด เช่น ฉากจบ, ชะตากรรมของตัวละคร, เหตุการณ์สําคัญ ฯลฯ',
  };

  return (
    <>
      <div className="bg-background text-white min-h-[1024px]">
        <Navbar page="/review" />
        <Container size="lg">
          {/* Announcement */}
          <Announcement
            type={AnmProperty.type}
            title={AnmProperty.header}
            content={AnmProperty.content}
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
