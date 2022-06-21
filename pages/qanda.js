import { Container } from "@chakra-ui/react";
import Announcement from "@components/Announcement";
import Navbar from "@components/Navbar";
import PostLayout from "@components/Posts/PostLayout";
import PostsMenuController from "@components/Posts/MenuController";
import React, { useEffect, useState } from "react";
import { useThemeContext } from "@lib/useTheme";

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
          color: "red.400",
        },
        {
          name: "คำถาม",
          color: "yellow.400",
        },
        {
          name: "คำถาม",
          color: "green.400",
        },
      ],
      postType: "ANIME",
    },
  ];

  return (
    <div className="bg-background text-white h-screen">
      <Navbar page="/qanda" />
      <Container maxW="container.xl">
        {/* Announcement */}
        {/* Menu Controller */}
        <PostsMenuController layout={layout} setLayout={setLayout} />
        {/* Posts */}
        <PostLayout property={property} layout={layout} />
      </Container>
    </div>
  );
}
