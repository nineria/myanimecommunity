import { Container, Skeleton, useMantineColorScheme } from "@mantine/core";
import SettingComponents from "@components/SettingComponents/index.js";
import React, { useContext, useEffect, useState } from "react";
import { Footer } from "@components/Footer/index.js";
import { useThemeContext } from "@lib/useTheme";
import { Animate } from "react-simple-animate";
import { UserContext } from "@lib/context";
import Navbar from "@components/Navbar";
import PageNotFound from "./404.js";
import AuthCheck from "@components/AuthCheck.js";
import Loading from "@components/Loading.js";

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const samplePost = await [
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

  const localTheme = await [
    {
      color: ["bg-[#ec5555]", "bg-[#181a1d]"],
      label: "ROSE",
      value: "red",
      description: "Dark theme",
    },
    {
      color: ["bg-[#ff7315]", "bg-[#232020]"],
      label: "TIGER",
      value: "tiger",
      description: "Dark theme",
    },
    {
      color: ["bg-[#3382b8]", "bg-[#1b262c]"],
      label: "NAVY BLUE",
      value: "navy",
      description: "Dark theme",
    },
    {
      color: ["bg-[#ff5d8d]", "bg-[#323232]"],
      label: "PINKY SWEAR",
      value: "pinky",
      description: "Dark theme",
    },
    {
      color: ["bg-[#00adb5]", "bg-[#222831]"],
      label: "Cyberpunk",
      value: "punk",
      description: "Dark theme",
    },
    {
      color: ["bg-[#ec5555]", "bg-[#eeeeee]"],
      label: "MOON ROSE",
      value: "red-light",
      description: "Light theme",
    },
  ];
  // Pass data to the page via props
  return { props: { samplePost, localTheme } };
}

export default function SettingPage({ samplePost, localTheme }) {
  const { user } = useContext(UserContext);

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
  }, [setTheme, toggleColorScheme]);

  return (
    <>
      <div className="bg-background text-accent min-h-[1024px] mb-[235px] pb-10">
        {/* Navar */}
        <Navbar page="/setting" isBusy />
        {/* Check user and Setting*/}
        <Container size="lg">
          <AuthCheck fallback={<Loading />}>
            <Animate
              play
              start={{ transform: "translateY(1%)", opacity: "0" }}
              end={{ transform: "translateY(0%)", opacity: "1" }}
            >
              <SettingComponents
                samplePost={samplePost}
                localTheme={localTheme}
              />
            </Animate>
          </AuthCheck>
        </Container>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}
