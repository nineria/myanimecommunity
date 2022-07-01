import Navbar from "@components/Navbar";
import PostLayout from "@components/PostComponents/PostLayout";
import PostsMenuController from "@components/PostComponents/MenuController";
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

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps(context) {
  const postsQuery = firestore.collectionGroup("posts").limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function QAndAPage({ data }) {
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
  }, [setTheme, toggleColorScheme]);

  const items = [
    { title: "หน้าหลัก", href: "/" },
    { title: "โพสต์ทั้งหมด", href: "/posts" },
  ].map((item, index) => (
    <Anchor size="sm" color="dimmed" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

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
            <PostLayout property={data} layout={layout} />
          </Stack>
        </Container>
      </div>
      <Footer />
    </>
  );
}
