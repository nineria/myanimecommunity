import React, { useState } from "react";
// Hooks
import { useForm } from "@mantine/hooks";
// Components
import { Stack } from "@mantine/core";
import TagHeader from "./FormComponents/TagHeader";
import TagGenre from "./FormComponents/TagGenre";
import { PostHeader, RefCredit } from "./FormComponents";
import PostImage from "./FormComponents/PostImage";
import PostContent from "./FormComponents/PostContent";
import { ButtonControl } from "./FormComponents/ButtonControl";
import { serverTimestamp } from "@lib/firebase";
import AuthCheck from "@components/AuthCheck";
import WebsiteRule from "@components/WebsiteRule";
import { useRouter } from "next/router";

export default function Edit({ post, postRef, setOpened }) {
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

  const router = useRouter();

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

    router.reload();
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
        <Stack spacing="sm">
          <TagHeader data={tags} setData={setTags} />
          <TagGenre data={genres} setData={setGenres} />
          <PostHeader {...form.getInputProps("title")} />
          <PostImage {...form.getInputProps("image")} />
          <PostContent content={content} setContent={setContent} />
          <RefCredit {...form.getInputProps("credit")} />
          <WebsiteRule />
          <ButtonControl setOpened={setOpened} postRef={postRef} />
        </Stack>
      </form>
    </AuthCheck>
  );
}
