import Navbar from "@components/Navbar";
import PostLayout from "@components/PostComponent/PostLayout";
import PostsMenuController from "@components/PostComponent/MenuController";
import React, { useEffect, useState } from "react";
import { useThemeContext } from "@lib/useTheme";
import { Container } from "@mantine/core";
import { Footer } from "@components/Footer";

export default function QAndAPage() {
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
          name: "คำถาม",
          color: "green",
        },
      ],
      postType: "ANIME",
    },
  ];

  return (
    <>
      <div className="bg-background text-white min-h-[1024px]">
        <Navbar page="/qanda" />
        <Container size="lg">
          {/* Announcement */}
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
