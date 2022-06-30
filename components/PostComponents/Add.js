import React, { useState } from "react";
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

export default function Add({ setOpened }) {
  const [data, setData] = useState({
    tag: [],
    title: "",
    image: "",
    content: ``,
    credit: "",
    genre: [],
    comments: {},
  });

  const HandleChange = (values) => {
    setData(values);
    console.log(values);
  };

  const form = useForm({
    initialValues: {
      tag: data.tag,
      title: data.title,
      image: data.image,
      content: data.content,
      credit: data.credit,
      username: data.username,
      photoURL: data.photoURL,
      rank: data.rank,
      genre: data.genre,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => HandleChange(values))}>
      <Stack>
        {/* Post tag */}
        <TagHeader data={data} setData={setData} />
        {/* Post genre */}
        <TagGenre data={data} setData={setData} />
        {/* Header */}
        <PostHeader {...form.getInputProps("title")} />
        <Divider />
        {/* Image */}
        <PostImage {...form.getInputProps("image")} />
        {/* Post content editor */}
        <PostContent />
        <Divider />
        {/* Reference, Credit */}
        <RefCredit {...form.getInputProps("credit")} />
        <Divider />
        {/* Term And Service */}
        <TermAndService />
        {/* Button control group */}
        <ButtonControl setOpened={setOpened} />
      </Stack>
    </form>
  );
}
