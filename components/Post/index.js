import { UserContext } from "@lib/context";
import {
  Anchor,
  Breadcrumbs,
  Container,
  Pagination,
  Stack,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import { CurrencyBitcoin, Flag3, Old } from "tabler-icons-react";
import Card from "./Card";
import CardComment from "./CardComment";
import Top from "./Top";

export default function Post() {
  const { user, username } = useContext(UserContext);
  const [activePage, setPage] = useState(1);

  const dummy = {
    tag: ["คำถาม", "สปอย"],
    title: "มีข้อสงสัยเกี่ยวกับตอนจบในอนิเมะ Jujutsu Kaisen ครับ",
    header: "มีข้อสงสัยเกี่ยวกับตอนจบในอนิเมะ Jujutsu Kaisen ครับ",
    body: "ขอออกตัวไว้ก่อนว่าผมอาจจะเก็บรายละเอียดไม่ครบก็ได้ คือผมไม่เข้าใจบทสนทนาตอนจบของฟุชิงุโระกับคุงิซากิที่พูดถึงการที่ไม่ให้อิตาโดริรู้เรื่องการสั่นพ้อง (Resonance) ว่าทำไมถึงไม่อยากให้รู้หรอครับ แล้วการสั่นพ้องที่หมายถึงนี่ใช่การสั่นพ้องเดียวกันกับความสามารถของคุงิซากิรึเปล่า รบกวนด้วยนะครับ ขอบคุณครับ",
    credit:
      "https://clubsister.com/entertainment/review-jujutsu-kaisen-on-netflix",
    username: username,
    photoURL: user?.photoURL,
    postImageURL:
      "https://www.anime-internet.com/content/images/size/w2000/2021/09/tileburnedin.jpg",

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

  const items = [
    { title: "หน้าหลัก", href: "/" },
    { title: "โพสต์ทั้งหมด", href: "/posts" },
    { title: "Q&A ถามตอบ", href: "/qanda" },
  ].map((item, index) => (
    <Anchor size="sm" color="dimmed" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <Container size="xl">
      <Stack spacing="xs" mt={10}>
        <Breadcrumbs separator="→">{items}</Breadcrumbs>
        <Top data={dummy} />
        <div className="p-1 bg-foreground rounded-sm">
          <Pagination
            total={2}
            size="sm"
            page={activePage}
            onChange={setPage}
          />
        </div>
        {activePage === 1 ? (
          <Stack spacing="xs">
            <Card data={dummy} />
            <CardComment data={dummyComment} />
          </Stack>
        ) : (
          <Stack spacing="xs">
            <CardComment data={dummyComment} />
            <CardComment data={dummyComment} />
            <CardComment data={dummyComment} />
            <CardComment data={dummyComment} />
            <CardComment data={dummyComment} />
          </Stack>
        )}
        <div className="p-1 bg-foreground rounded-sm mb-10">
          <Pagination
            total={2}
            size="sm"
            page={activePage}
            onChange={setPage}
          />
        </div>
      </Stack>
    </Container>
  );
}
