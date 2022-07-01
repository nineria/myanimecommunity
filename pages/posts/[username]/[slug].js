import AuthCheck from "@components/AuthCheck";
import { Footer } from "@components/Footer";
import Navbar from "@components/Navbar";
import PostComponents from "@components/PostComponents";

import Top from "@components/PostComponents/Top";
import { firestore, getUserWithUsername, postToJSON } from "@lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import {
  Anchor,
  Breadcrumbs,
  Container,
  Pagination,
  Paper,
  Skeleton,
  Stack,
} from "@mantine/core";
import React, { useState } from "react";

export async function getStaticProps({ params }) {
  const { username, slug } = params;

  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(encodeURI(slug));
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup("posts").get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: {
        username,
        slug,
      },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: "blocking",
  };
}

export default function PostPage(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  const [activePage, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // const { setTheme } = useThemeContext();

  // useEffect(() => {
  //   const localData = localStorage.getItem("themes");
  //   if (localData == null) {
  //     localStorage.setItem("themes", "red");
  //     setTheme("red");
  //   }
  //   setTheme(localData);
  // }, [setTheme]);

  // console.log(username);

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

  //   const comments = comment.map((item, index) => (
  //     <Skeleton key={index} visible={loading}>
  //       <TestComment
  //         postedAt={item.postedAt}
  //         body={item.body}
  //         author={item.author}
  //       />
  //     </Skeleton>
  //   ));

  return (
    <div className="bg-background min-h-[1024px] mb-[235px] pb-10">
      <AuthCheck>
        <Navbar />
        <Container size="lg" py="xs">
          <Stack spacing="xs">
            <Breadcrumbs separator="→">{items}</Breadcrumbs>
            <Top data={post} />
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
                  <PostComponents data={post} />
                </Skeleton>
                <Skeleton visible={loading}>
                  {/* <Comment data={data.comments} /> */}
                </Skeleton>
              </Stack>
            ) : (
              <Stack spacing="xs">
                {/* <Comment data={data.comments} />
                <Comment data={data.comments} />
                <Comment data={data.comments} />
                <Comment data={data.comments} />
                <Comment data={data.comments} /> */}
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

            {/* {user && <CreateComment data={posts} />} */}
          </Stack>
        </Container>
        <Footer />
      </AuthCheck>
    </div>
  );
}
