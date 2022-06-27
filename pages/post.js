import { Footer } from "@components/Footer";
import Navbar from "@components/Navbar";
import Post from "@components/Post";
import Comment from "@components/Post/Comment";
import CreateComment from "@components/Post/CreateComment";
import Top from "@components/Post/Top";
import { UserContext } from "@lib/context";
import { useThemeContext } from "@lib/useTheme";
import {
  Anchor,
  Breadcrumbs,
  Container,
  Pagination,
  Stack,
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { CurrencyBitcoin, Flag3, Old } from "tabler-icons-react";
import PageNotFound from "./404";

export default function PostPage() {
  const { user, username } = useContext(UserContext);
  const [activePage, setPage] = useState(1);

  const { setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    setTheme(localData);
  }, []);

  const items = [
    { title: "หน้าหลัก", href: "/" },
    { title: "โพสต์ทั้งหมด", href: "/posts" },
    { title: "Q&A ถามตอบ", href: "/qanda" },
  ].map((item, index) => (
    <Anchor size="sm" color="dimmed" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const dummy = {
    tag: ["คำถาม", "สปอย"],
    title: "มีข้อสงสัยเกี่ยวกับตอนจบในอนิเมะ Jujutsu Kaisen ครับ",
    image:
      "https://www.anime-internet.com/content/images/size/w2000/2021/09/tileburnedin.jpg",
    content: `<h1>มีข้อสงสัยเกี่ยวกับตอนจบในอนิเมะ Jujutsu Kaisen ครับ</h1> 
    <p>ขอออกตัวไว้ก่อนว่าผมอาจจะเก็บรายละเอียดไม่ครบก็ได้ คือผมไม่เข้าใจบทสนทนาตอนจบของฟุชิงุโระกับคุงิซากิที่พูดถึงการที่ไม่ให้อิตาโดริรู้เรื่องการสั่นพ้อง (Resonance) ว่าทำไมถึงไม่อยากให้รู้หรอครับ แล้วการสั่นพ้องที่หมายถึงนี่ใช่การสั่นพ้องเดียวกันกับความสามารถของคุงิซากิรึเปล่า รบกวนด้วยนะครับ ขอบคุณครับ</p>`,
    credit:
      "https://clubsister.com/entertainment/review-jujutsu-kaisen-on-netfli, https://clubsister.com/entertainment/review-jujutsu-kaisen-on-netfli",
    username: username,
    photoURL: user?.photoURL,

    rank: [
      {
        name: "นายทุน",
        icon: <CurrencyBitcoin size={14} />,
        color: "yellow",
      },
      {
        name: "ผู้เฒ่า",
        icon: <Old size={14} />,
        color: "gray",
      },
      {
        name: "อัศวิน",
        icon: <Flag3 size={14} />,
        color: "red",
      },
    ],
    genres: [
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Girls Love",
      "Gourmet",
      "Horror",
      "Mystery",
      "Romance",
      "Sci-Fi",
      "Slice of Life",
      "Sports",
      "Supernatural",
      "Suspense",
      "Boys Love",
    ],
  };

  const dummyComment = {
    tag: ["คำถาม", "สปอย"],
    body: "สั่นพ้องในที่นี้คือการที่ยูจิกินนิ้วของสุคุนะเข้าไป จึงทำให้มีเหล่าวิญญาณคำสาปออกมาเพ่นพ่านมากมายค่ะ ยูจิไปปลุกราชาคำสาปอย่างสุคุนะขึ้นมา จึงทำให้พลังคำสาปตื่นขึ้นมาด้วย เมงุมิไม่อยากให้ยูจิรู้เรื่องนี้เพราะอาจจะทำให้ยูจิโทษตัวเองว่าเรื่องทั้งหมดที่มันเกิดขึ้น ความตายมั้งหมดที่มันเกิดขึ้น มันเป็นเพราะเค้า เมงุมิเลยบอกโนบาระว่าอย่าให้ยูจิรู้เรื่องนี้เด็ดขาดค่ะ",
    credit:
      "https://clubsister.com/entertainment/review-jujutsu-kaisen-on-netflix",
    username: username,
    photoURL: user?.photoURL,
    userLike: [
      "newMember",
      "ผู้ใหญ่หมู่10",
      "อย่าโอนนนน",
      "XtreamMan",
      "Tonyกะต๊าก",
      "ILIOEYOU",
      "DekDoyy",
    ],
    rank: [
      {
        name: "นายทุน",
        icon: <CurrencyBitcoin size={14} />,
        color: "yellow",
      },
      {
        name: "ผู้เฒ่า",
        icon: <Old size={14} />,
        color: "gray",
      },
      {
        name: "อัศวิน",
        icon: <Flag3 size={14} />,
        color: "red",
      },
    ],
  };

  return (
    <>
      <div className="bg-background min-h-[1024px] mb-[235px] pb-10">
        <Navbar />
        <Container size="lg" py="xs">
          {user && user ? (
            <Stack spacing="xs">
              <Breadcrumbs separator="→">{items}</Breadcrumbs>
              <Top data={dummy} />
              <Pagination
                total={2}
                size="sm"
                page={activePage}
                onChange={setPage}
              />
              {activePage === 1 ? (
                <Stack spacing="xs">
                  <Post data={dummy} />
                  <Comment data={dummyComment} />
                </Stack>
              ) : (
                <Stack spacing="xs">
                  <Comment data={dummyComment} />
                  <Comment data={dummyComment} />
                  <Comment data={dummyComment} />
                  <Comment data={dummyComment} />
                  <Comment data={dummyComment} />
                </Stack>
              )}

              <Pagination
                total={2}
                size="sm"
                page={activePage}
                onChange={setPage}
              />
              {user && <CreateComment data={dummyComment} />}
            </Stack>
          ) : (
            <PageNotFound />
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}
