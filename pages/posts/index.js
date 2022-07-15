import Announcement from "@components/Announcement";
import Navbar from "@components/Navbar";
import React, { useContext, useState } from "react";
import PostsMenuController from "@components/PostComponents/MenuController";
import PostLayout from "@components/PostComponents/PostLayout";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Container,
  Group,
  Pagination,
  Paper,
  Stack,
} from "@mantine/core";
import { Footer } from "@components/Footer";
import { firestore, postToJSON } from "@lib/firebase";
import Loading from "@components/Loading";
import AuthCheck from "@components/AuthCheck";
import AdminCheck from "@components/AdminCheck";
import { Edit } from "tabler-icons-react";
import { UserContext } from "@lib/context";
import Metatags from "@components/Metatags";

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps(context) {
  const postsQuery = firestore.collectionGroup("posts").limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function PostsPage(props) {
  const [layout, setLayout] = useState("grid");

  const { user } = useContext(UserContext);

  const [activePage, setPage] = useState(1);

  const items = [
    { title: "หน้าหลัก", href: "/" },
    { title: "โพสต์ทั้งหมด", href: "/posts" },
  ].map((item, index) => (
    <Anchor size="sm" color="dimmed" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const AnnouncementProperty = {
    type: "danger",
    title: "ประกาศปิดปรับปรุงเว็บไซต์",
    content: `ขออภัยผู้ใช้และสมาชิกชุมชนคนรักอนิเมะทุกท่าน ในวันที่ 21 เมษายน 2022 จะมีการปิดปรับปรุงเพื่อเพิ่มประสบการณ์ใช้เว็บไซต์ของเราให้ดียิ่งขึ้น \n(เพิ่มเติม) ในส่วนของการเขียนโพสต์สามารถใช้ได้ตามปกติแล้ว และ Back-endใหม่ของเราจะมีประสิทธิภาพมากขึ้นกว่าเดิม (รวมถึง UI แบบใหม่) ทั้งนี้ ขอขอบคุณสำหรับความอดทนของทุกคน`,
  };

  return (
    <>
      <div className="bg-background text-white min-h-[1024px] mb-[235px] pb-10">
        <Metatags />
        <Navbar page="/posts" />
        <Container size="lg">
          <Stack spacing="xs">
            <Breadcrumbs separator="→">{items}</Breadcrumbs>
            {/* Create New Announcement */}
            {user && (
              <AdminCheck>
                <Group
                  grow
                  position="apart"
                  className="bg-foreground rounded-sm p-1 shadow-md"
                >
                  <Button
                    className="z-10 bg-content text-[#fff] hover:bg-content hover:opacity-75 max-w-fit"
                    variant="default"
                    size="xs"
                  >
                    สร้างประกาศ +
                  </Button>
                  <div className="bg-background max-w-fit p-[1px] rounded-md">
                    <Button
                      leftIcon={<Edit size={14} />}
                      className="z-10 bg-foreground text-title hover:bg-foreground hover:opacity-75 "
                      variant="default"
                      size="xs"
                    >
                      จัดการประกาศ
                    </Button>
                  </div>
                </Group>
              </AdminCheck>
            )}
            {/* Announcement */}
            <Announcement
              type={AnnouncementProperty.type}
              title={AnnouncementProperty.title}
              content={AnnouncementProperty.content}
            />

            {/* Menu Controller */}
            <PostsMenuController layout={layout} setLayout={setLayout} />
            {/* Posts */}

            <PostLayout posts={props.posts} layout={layout} />
            <Paper className="shadow-md bg-foreground p-1.5">
              <Pagination
                total={1}
                size="sm"
                page={activePage}
                onChange={setPage}
                classNames={{
                  item: "text-title",
                  dots: "text-content",
                  active: "bg-content text-[#fff]",
                }}
              />
            </Paper>
          </Stack>
        </Container>
      </div>
      <Footer />
    </>
  );
}
