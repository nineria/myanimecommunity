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
import React, { useEffect, useState } from "react";
import CreateComment from "@components/PostComponents/CreateComment";
import Comment from "@components/PostComponents/Comment";

export async function getStaticProps({ params }) {
  const { username, slug } = params;

  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);

    post = postToJSON(await postRef.get());

    // try {
    //   comments = postToJSON(await commentsRef.get());
    // } catch (error) {
    //   comments = null;
    // }

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

  const [comments, setComments] = useState();

  useEffect(() => {
    const getComments = async () => {
      const userDoc = await getUserWithUsername(post.username);
      const comments = await userDoc.ref
        .collection("posts")
        .doc(post.slug)
        .collection("comments")
        .get();

      comments = await JSON.stringify(comments.docs.map((doc) => doc.data()));

      comments = JSON.parse(comments);

      setComments(comments);
    };

    getComments();
  }, [post]);

  const items = [
    { title: "หน้าหลัก", href: "/" },
    { title: "โพสต์ทั้งหมด", href: "/posts" },
    { title: decodeURI(post.slug), href: "#" },
  ].map((item, index) => (
    <Anchor size="sm" color="dimmed" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  setTimeout(function () {
    setLoading(false);
  }, 500);

  return (
    <div className="bg-background min-h-[1024px] mb-[235px] pb-10">
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
                <PostComponents post={post} postRef={postRef} />
              </Skeleton>
              <Stack spacing="xs">
                {comments &&
                  comments.map((item, index) => (
                    <Skeleton key={index} visible={loading}>
                      <Comment post={post} comment={item} />
                    </Skeleton>
                  ))}
              </Stack>
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
          <AuthCheck>
            <CreateComment post={post} />
          </AuthCheck>
        </Stack>
      </Container>
      <Footer />
    </div>
  );
}
