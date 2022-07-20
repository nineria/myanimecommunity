import Announcement from "@components/Announcement";
import Navbar from "@components/Navbar";
import React, { useState } from "react";
import PostsMenuController from "@components/PostComponents/MenuController";
import PostLayout from "@components/PostComponents/PostLayout";
import {
  Anchor,
  Breadcrumbs,
  Container,
  Divider,
  Pagination,
  Stack,
} from "@mantine/core";
import { Footer } from "@components/Footer";
import { firestore, fromMillis, postToJSON } from "@lib/firebase";
import Metatags from "@components/Metatags";
import { Checkbox } from "tabler-icons-react";
import Loading from "@components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

// Max post to query per page
const LIMIT = 12;

export async function getServerSideProps() {
  const postsQuery = firestore
    .collectionGroup("posts")
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const rawPosts = (await postsQuery.get()).docs.map(postToJSON);

  const posts = rawPosts.filter((post) => {
    const tag = post.tag.some((item) => item.label === "รีวิว");
    if (tag) return post;
  });

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

export default function ReviewsPage(props) {
  const [layout, setLayout] = useState("grid");

  const [posts, setPosts] = useState(props.posts);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newRawPosts = (await query.get()).docs.map((doc) => doc.data());

    const newPosts = newRawPosts.filter((post) => {
      const tag = post.tag.some((item) => item.label === "รีวิว");
      if (tag) return post;
    });

    setPosts(posts.concat(newPosts));
    // setPosts(newPosts);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  const items = [
    { title: "หน้าหลัก", href: "/" },
    { title: "โพสต์ทั้งหมด", href: "/posts" },
    { title: "รีวิว อนิเมะ มังงะ ไลต์โนเวล", href: "#" },
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
        <Navbar page="/reviews" />
        <Container size="lg">
          <Stack spacing="xs">
            <Breadcrumbs separator="→">{items}</Breadcrumbs>

            {/* Announcement */}
            {announcements}

            {/* Menu Controller */}
            <PostsMenuController layout={layout} setLayout={setLayout} />
            {/* Posts */}

            <InfiniteScroll
              dataLength={posts.length} //This is important field to render the next data
              next={getMorePosts}
              hasMore={!postsEnd}
              loader={<Loading />}
              endMessage={
                <Divider
                  label={
                    <div className="flex flex-row gap-1 text-xs text-title my-5">
                      <Checkbox size={16} />
                      <span>นั่นคือโพสต์ทั้งหมดของวันนี้!</span>
                    </div>
                  }
                  labelPosition="center"
                />
              }
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {posts && <PostLayout posts={posts} layout={layout} />}
            </InfiniteScroll>
          </Stack>
        </Container>
      </div>
      <Footer />
    </>
  );
}
