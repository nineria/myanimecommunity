import { Footer } from "@components/Footer";
import Navbar from "@components/Navbar";
import PostComponents from "@components/PostComponents";
import Comment from "@components/PostComponents/Comment";
import CreateComment from "@components/PostComponents/CreateComment";
import TestComment from "@components/PostComponents/TestComment";
import Top from "@components/PostComponents/Top";
import { UserContext } from "@lib/context";
import { useThemeContext } from "@lib/useTheme";
import {
  Anchor,
  Breadcrumbs,
  Container,
  Pagination,
  Paper,
  Skeleton,
  Stack,
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import PageNotFound from "./404";

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const data = await {
    tag: ["คำถาม", "สปอย"],
    title: "มีข้อสงสัยเกี่ยวกับตอนจบในอนิเมะ Jujutsu Kaisen ครับ",
    image:
      "https://www.anime-internet.com/content/images/size/w2000/2021/09/tileburnedin.jpg",
    content: `<img src="https://www.anime-internet.com/content/images/size/w2000/2021/09/tileburnedin.jpg"/><h3>มีข้อสงสัยเกี่ยวกับตอนจบในอนิเมะ Jujutsu Kaisen ครับ</h3> 
    <p>ขอออกตัวไว้ก่อนว่าผมอาจจะเก็บรายละเอียดไม่ครบก็ได้ คือผมไม่เข้าใจบทสนทนาตอนจบของฟุชิงุโระกับคุงิซากิที่พูดถึงการที่ไม่ให้อิตาโดริรู้เรื่องการสั่นพ้อง (Resonance) ว่าทำไมถึงไม่อยากให้รู้หรอครับ แล้วการสั่นพ้องที่หมายถึงนี่ใช่การสั่นพ้องเดียวกันกับความสามารถของคุงิซากิรึเปล่า รบกวนด้วยนะครับ ขอบคุณครับ</p>`,
    credit:
      "https://clubsister.com/entertainment/review-jujutsu-kaisen-on-netfli, https://clubsister.com/entertainment/review-jujutsu-kaisen-on-netfli",

    username: "violet",
    photoURL:
      "https://lh3.googleusercontent.com/a-/AOh14GgpcOtIZr-xUa4-CbVz-hDFAoiDBSjOg4W6NUNmsg=s96-c",

    rank: [
      {
        name: "นายทุน",
        color: "yellow",
      },
      {
        name: "ผู้เฒ่า",
        color: "gray",
      },
      {
        name: "อัศวิน",
        color: "red",
      },
    ],
    genre: [
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
    comments: {
      tag: ["คำถาม", "สปอย"],
      body: "สั่นพ้องในที่นี้คือการที่ยูจิกินนิ้วของสุคุนะเข้าไป จึงทำให้มีเหล่าวิญญาณคำสาปออกมาเพ่นพ่านมากมายค่ะ ยูจิไปปลุกราชาคำสาปอย่างสุคุนะขึ้นมา จึงทำให้พลังคำสาปตื่นขึ้นมาด้วย เมงุมิไม่อยากให้ยูจิรู้เรื่องนี้เพราะอาจจะทำให้ยูจิโทษตัวเองว่าเรื่องทั้งหมดที่มันเกิดขึ้น ความตายมั้งหมดที่มันเกิดขึ้น มันเป็นเพราะเค้า เมงุมิเลยบอกโนบาระว่าอย่าให้ยูจิรู้เรื่องนี้เด็ดขาดค่ะ",
      credit:
        "https://clubsister.com/entertainment/review-jujutsu-kaisen-on-netflix",
      username: "violet",
      photoURL:
        "https://lh3.googleusercontent.com/a-/AOh14GgpcOtIZr-xUa4-CbVz-hDFAoiDBSjOg4W6NUNmsg=s96-c",

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
          color: "yellow",
        },
        {
          name: "ผู้เฒ่า",
          color: "gray",
        },
        {
          name: "อัศวิน",
          color: "red",
        },
      ],
    },
  };

  const comment = await [
    {
      postedAt: "10 minutes ago",
      body: '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
      author: {
        name: "Jacob Warnhalter",
        image:
          "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      },
    },
    {
      postedAt: "10 minutes ago",
      body: '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
      author: {
        name: "Jacob Warnhalter",
        image:
          "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      },
    },
    {
      postedAt: "10 minutes ago",
      body: '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
      author: {
        name: "Jacob Warnhalter",
        image:
          "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      },
    },
  ];

  // Pass data to the page via props
  return { props: { data, comment } };
}

export default function PostPage({ data, comment }) {
  const { user } = useContext(UserContext);
  const [activePage, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    setTheme(localData);
  }, [setTheme]);

  const items = [
    { title: "หน้าหลัก", href: "/" },
    { title: "โพสต์ทั้งหมด", href: "/posts" },
    { title: "Q&A ถามตอบ", href: "/qanda" },
  ].map((item, index) => (
    <Anchor size="sm" color="dimmed" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  setTimeout(function () {
    setLoading(false);
  }, 500);

  const comments = comment.map((item, index) => (
    <Skeleton key={index} visible={loading}>
      <TestComment
        postedAt={item.postedAt}
        body={item.body}
        author={item.author}
      />
    </Skeleton>
  ));

  return (
    <>
      <div className="bg-background min-h-[1024px] mb-[235px] pb-10">
        <Navbar />
        <Container size="lg" py="xs">
          {user && user ? (
            <Stack spacing="xs">
              <Breadcrumbs separator="→">{items}</Breadcrumbs>
              <Top data={data} />
              <Paper p="xs" className="shadow-md bg-foreground">
                <Pagination
                  total={10}
                  size="sm"
                  page={activePage}
                  onChange={setPage}
                  withEdges
                  classNames={{
                    item: "text-title",
                    dots: "text-content",
                    active: "bg-content text-[#fff]",
                  }}
                />
              </Paper>
              {activePage === 1 ? (
                <Stack spacing="xs">
                  <Skeleton visible={loading}>
                    <PostComponents data={data} />
                  </Skeleton>
                  <Skeleton visible={loading}>
                    <Comment data={data.comments} />
                  </Skeleton>
                </Stack>
              ) : (
                <Stack spacing="xs">
                  <Comment data={data.comments} />
                  <Comment data={data.comments} />
                  <Comment data={data.comments} />
                  <Comment data={data.comments} />
                  <Comment data={data.comments} />
                </Stack>
              )}
              <Paper p="xs" className="shadow-md bg-foreground">
                <Pagination
                  total={10}
                  size="sm"
                  page={activePage}
                  onChange={setPage}
                  withEdges
                  classNames={{
                    item: "text-title",
                    dots: "text-content",
                    active: "bg-content text-[#fff]",
                  }}
                />
              </Paper>

              {user && <CreateComment data={data} />}
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
