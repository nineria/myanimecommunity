import Announcement from "@components/Announcement";
import Navbar from "@components/Navbar";
import React, { useState } from "react";
import PostsMenuController from "@components/PostComponents/MenuController";
import PostLayout from "@components/PostComponents/PostLayout";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Container,
  Group,
  Stack,
} from "@mantine/core";
import { Footer } from "@components/Footer";
import { firestore, fromMillis, postToJSON } from "@lib/firebase";
import Metatags from "@components/Metatags";
import Loading from "@components/Loading";

// Max post to query per page
const LIMIT = 12;

export async function getServerSideProps() {
  const postsQuery = firestore
    .collectionGroup("posts")
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  const announcementsQuery = firestore
    .collectionGroup("announcements")
    .orderBy("createdAt", "desc")
    .where("published", "==", true)
    .limit(3);

  const announcements = (await announcementsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts, announcements }, // will be passed to the page component as props
  };
}

export default function PostsPage(props) {
  const [layout, setLayout] = useState("grid");

  const [posts, setPosts] = useState(props.posts);

  const [postsEnd, setPostsEnd] = useState(false);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const showNext = ({ item }) => {
    setLoading(true);
    setPostsEnd(false);
    const fetchNextData = async () => {
      const cursor =
        typeof item.createdAt === "number"
          ? fromMillis(item.createdAt)
          : item.createdAt;

      const query = firestore
        .collectionGroup("posts")
        .orderBy("createdAt", "desc")
        .startAfter(cursor)
        .limit(LIMIT);

      const newPosts = (await query.get()).docs.map((doc) => doc.data());

      if (newPosts.length <= LIMIT) setPostsEnd(true);

      setPosts(newPosts);
      setPage(page + 1);
    };
    fetchNextData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const showPrevious = ({ item }) => {
    setLoading(true);
    setPostsEnd(false);
    const fetchNextData = async () => {
      const cursor =
        typeof item.createdAt === "number"
          ? fromMillis(item.createdAt)
          : item.createdAt;

      const query = firestore
        .collectionGroup("posts")
        .orderBy("createdAt", "desc")
        .endBefore(cursor)
        .limitToLast(LIMIT);

      const newPosts = (await query.get()).docs.map((doc) => doc.data());
      setPosts(newPosts);
      setPage(page - 1);
    };
    fetchNextData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const items = [
    { title: "หน้าหลัก", href: "/" },
    { title: "โพสต์ทั้งหมด", href: "/posts" },
    { title: "โพสต์ใหม่", href: "#" },
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
        {/* <div className="bg-background text-white "> */}
        <Metatags />
        <Navbar page="/posts" />
        <Container size="lg">
          <Stack spacing="xs">
            <Breadcrumbs separator="→">{items}</Breadcrumbs>
            {/* Announcement */}
            {announcements}
            {/* Posts Controller */}
            <PostsMenuController layout={layout} setLayout={setLayout} />
            {/* Posts */}
            {loading ? (
              <Loading />
            ) : (
              <>
                <PostLayout posts={posts} layout={layout} />
                <Group>
                  <Button
                    type="submit"
                    className="bg-content hover:bg-content hover:opacity-75"
                    size="xs"
                    onClick={() => showPrevious({ item: posts[0] })}
                    disabled={page === 1 ? true : false}
                  >
                    ก่อนหน้า
                  </Button>
                  <Button
                    type="submit"
                    className="bg-content hover:bg-content hover:opacity-75"
                    size="xs"
                    onClick={() => showNext({ item: posts[posts.length - 1] })}
                    disabled={postsEnd}
                  >
                    ถัดไป
                  </Button>
                </Group>
              </>
            )}
          </Stack>
        </Container>
      </div>
      <Footer />
    </>
  );
}
