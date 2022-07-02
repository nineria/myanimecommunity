import React, { useEffect, useState } from "react";
// Hooks
import { useForm } from "@mantine/hooks";
// Components
import { Divider, Stack } from "@mantine/core";
import TagHeader from "./FormComponents/TagHeader";
import TagGenre from "./FormComponents/TagGenre";
import { PostHeader, RefCredit, TermAndService } from "./FormComponents";
import PostImage from "./FormComponents/PostImage";
import PostContent from "./FormComponents/PostContent";
import { ButtonControl } from "./FormComponents/ButtonControl";
import { auth, firestore, serverTimestamp } from "@lib/firebase";
import AuthCheck from "@components/AuthCheck";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

export default function Edit({ post, postRef, setOpened }) {
  // const [data, setData] = useState(postData);
  // const [tags, setTags] = useState([...postData.tag]);
  // const [genres, setGenres] = useState([...postData.genre]);
  // const [content, setContent] = useState(postData.content);

  return (
    <AuthCheck>
      {post && <PostForm post={post} postRef={postRef} setOpened={setOpened} />}
    </AuthCheck>
  );
}

function PostForm({ post, postRef, setOpened }) {
  const [tags, setTags] = useState([...post.tag]);
  const [genres, setGenres] = useState([...post.genre]);
  const [content, setContent] = useState(post.content);

  const HandleChange = async (values) => {
    await postRef.update({
      tag: tags,
      genre: genres,
      title: values.title,
      image: values.image,
      content: content,
      credit: values.credit,
      updatedAt: serverTimestamp(),
    });
  };

  const form = useForm({
    initialValues: {
      tag: post.tag,
      genre: post.genre,
      title: post.title,
      image: post.image,
      content: post.content,
      credit: post.credit,
    },
  });

  return (
    <AuthCheck>
      <form onSubmit={form.onSubmit((values) => HandleChange(values))}>
        <Stack>
          <TagHeader data={tags} setData={setTags} />
          <TagGenre data={genres} setData={setGenres} />
          <PostHeader {...form.getInputProps("title")} />
          <Divider />
          <PostImage {...form.getInputProps("image")} />
          <PostContent content={content} setContent={setContent} />
          <Divider />
          <RefCredit {...form.getInputProps("credit")} />
          <Divider />
          <TermAndService />
          <ButtonControl setOpened={setOpened} />
        </Stack>
      </form>
    </AuthCheck>
  );
}
