import { Container, useToast } from "@chakra-ui/react";
import Announcement from "@components/Announcement";
import Navbar from "@components/Navbar";
import PostLayout from "@components/Posts/PostLayout";
import PostsMenuController from "@components/Posts/MenuController";

import React, { useEffect, useState } from "react";

export default function ReviewPage() {
  const [layout, setLayout] = useState("grid");

  const [showToast, setShowToast] = useState(true);

  const toast = useToast();

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

  useEffect(() => {
    const notify = () => {
      toast({
        title: "เนื้อหาอาจมีการสปอย!",
        description:
          "โปรดทราบว่าเนื้อหาในหน้านี้อาจมีการสปอย สำหรับผู้ที่อาจเข้ามาที่นี่โดยไม่ได้ตั้งใจ หรือโดยจุดประสงค์อื่น",
        status: "warning",
        variant: "left-accent",
        duration: 5000,
        isClosable: true,
      });
      setShowToast(false);
    };

    if (showToast) {
      notify();
    }
  }, [showToast]);

  return (
    <div className="bg-[#181a1d] text-white">
      <Navbar page="/review" />
      <Container maxW="container.xl">
        {/* Announcement */}
        {/* <Announcement
          type="warning"
          content={`โปรดทราบว่าในหมวดหมู่ \"รีวิวอนิเมะ\" อาจมีการเปิดเผย(สปอย)เนื้อหาบางส่วนหรือทั้งหมด เช่น ฉากจบ, ชะตากรรมของตัวละคร, เหตุการณ์สําคัญ ฯลฯ`}
        /> */}
        {/* Menu Controller */}
        <PostsMenuController layout={layout} setLayout={setLayout} />
        {/* Posts */}
        <PostLayout property={property} layout={layout} />
      </Container>
    </div>
  );
}
