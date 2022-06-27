import Navbar from "@components/Navbar";
import PostLayout from "@components/PostComponent/PostLayout";
import PostsMenuController from "@components/PostComponent/MenuController";
import React, { useEffect, useState } from "react";
import { useThemeContext } from "@lib/useTheme";
import {
  Anchor,
  Breadcrumbs,
  Container,
  Stack,
  useMantineColorScheme,
} from "@mantine/core";
import { Footer } from "@components/Footer";

export default function QAndAPage() {
  const [layout, setLayout] = useState("grid");

  const { setTheme } = useThemeContext();

  const { toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    if (localData === "red-light") toggleColorScheme("light");
    else toggleColorScheme("dark");
    setTheme(localData);
  }, [setTheme]);

  const items = [
    { title: "หน้าหลัก", href: "/" },
    { title: "โพสต์ทั้งหมด", href: "/posts" },
  ].map((item, index) => (
    <Anchor size="sm" color="dimmed" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

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
      <div className="bg-background text-white min-h-[1024px] mb-[235px] pb-10">
        <Navbar page="/qanda" />
        <Container size="lg">
          <Stack spacing="xs">
            <Breadcrumbs separator="→">{items}</Breadcrumbs>
            {/* Announcement */}

            {/* Menu Controller */}
            <PostsMenuController layout={layout} setLayout={setLayout} />
            {/* Posts */}
            <PostLayout property={property} layout={layout} />
          </Stack>
        </Container>
      </div>
      <Footer />
    </>
  );
}
