import PostsMenuController from "@components/PostComponent/MenuController";
import { useThemeContext } from "@lib/useTheme";
import React, { useEffect, useState } from "react";
import { Settings } from "tabler-icons-react";
import PostLayout from "@components/PostComponent/PostLayout";

export default function PostLayoutComponent() {
  const [layout, setLayout] = useState("grid");

  const { setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    setTheme(localData);
  }, [setTheme]);

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
          name: "สปอย",
          color: "green.400",
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
          color: "red.400",
        },
        {
          name: "คำถาม",
          color: "yellow.400",
        },
        {
          name: "สปอย",
          color: "green.400",
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
          color: "red.400",
        },
        {
          name: "คำถาม",
          color: "yellow.400",
        },
        {
          name: "สปอย",
          color: "green.400",
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
          color: "blue.400",
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
          color: "blue.400",
        },
      ],
      postType: "NEWS",
    },
  ];

  return (
    <div className="bg-foreground my-2 w-full rounded-sm shadow-md">
      {/* Header */}
      <div className="flex flex-row items-center gap-1 px-4 py-2 ">
        <Settings size={20} />
        <h1 className="font-bold">การตั้งค่าเลย์เอาท์</h1>
      </div>
      <div className="py-[0.5px] w-full bg-[#ccc]" />
      {/* Theme */}
      <div className="px-4 py-2 flex flex-row justify-between items-center">
        <div className="w-full">
          <h1>ธีมของเว็บไซต์</h1>
          <h2 className="text-sm text-[#aaa]"></h2>
        </div>
      </div>
      {/* Menu Controller */}
      <PostsMenuController layout={layout} setLayout={setLayout} />
      {/* Posts */}
      <PostLayout property={property} layout={layout} />
    </div>
  );
}
