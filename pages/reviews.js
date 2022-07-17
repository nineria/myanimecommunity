import Announcement from "@components/Announcement";
import Navbar from "@components/Navbar";
import React, { useState } from "react";
import PostsMenuController from "@components/PostComponents/MenuController";
import PostLayout from "@components/PostComponents/PostLayout";
import {
  Anchor,
  Breadcrumbs,
  Container,
  Pagination,
  Stack,
} from "@mantine/core";
import { Footer } from "@components/Footer";
import { firestore, postToJSON } from "@lib/firebase";
import Metatags from "@components/Metatags";

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps() {
  const postsQuery = firestore
    .collectionGroup("posts")
    .orderBy("createdAt", "desc")
    .where("tag", "array-contains", "รีวิว")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  const announcementsQuery = firestore
    .collectionGroup("announcements")
    .where("published", "==", true)
    .limit(3);

  const announcements = (await announcementsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts, announcements }, // will be passed to the page component as props
  };
}

export default function ReviewsPage(props) {
  const [layout, setLayout] = useState("grid");

  const [activePage, setPage] = useState(1);

  const items = [
    { title: "หน้าหลัก", href: "/" },
    { title: "โพสต์ทั้งหมด", href: "/posts" },
    { title: "รีวิว", href: "#" },
  ].map((item, index) => (
    <Anchor size="sm" color="dimmed" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const announcements = props.announcements.map((item, index) => (
    <Announcement key={index} {...item} />
  ));

  return (
    <>
      <div className="bg-background text-white min-h-[1024px] mb-[235px] pb-10">
        <Metatags />
        <Navbar page="/reviews" />
        <Container size="lg">
          <Stack spacing="xs">
            <Breadcrumbs separator="→">{items}</Breadcrumbs>

            {/* Announcement */}
            {announcements}

            {/* Menu Controller */}
            <PostsMenuController layout={layout} setLayout={setLayout} />
            {/* Posts */}
            <PostLayout posts={props.posts} layout={layout} />
            <Pagination
              total={2}
              size="sm"
              mt="sm"
              page={activePage}
              onChange={setPage}
              classNames={{
                item: "text-title bg-foreground",
                dots: "text-content bg-content",
                active: "bg-content text-[#fff]",
              }}
            />
          </Stack>
        </Container>
      </div>
      <Footer />
    </>
  );
}
