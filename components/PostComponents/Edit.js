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
import { serverTimestamp } from "@lib/firebase";

export default function Edit({ postData, setOpened }) {
  const [data, setData] = useState(postData);
  const [tags, setTags] = useState([...postData.tag]);
  const [genres, setGenres] = useState([...postData.genre]);
  const [content, setContent] = useState(postData.content);

  const HandleChange = (values) => {
    setData(values);
    console.log(values);
  };

  const form = useForm({
    initialValues: {
      tag: data.tag,
      genre: data.genre,
      title: data.title,
      image: data.image,
      content: data.content,
      credit: data.credit,
      updatedAt: serverTimestamp(),
      createdAt: data.createdAt,
      stars: data.stars,
      likes: data.likes,
    },
  });

  return (
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
  );
}
