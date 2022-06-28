import { Divider, Stack } from "@mantine/core";
import { useForm } from "@mantine/hooks";

import React, { useEffect, useState } from "react";
import TagHeader from "./EditPostComponents/TagHeader";
import TagGenre from "./EditPostComponents/TagGenre";
import { PostHeader, RefCredit, TermAndService } from "./EditPostComponents";
import PostImage from "./EditPostComponents/PostImage";
import PostContent from "./EditPostComponents/PostContent";
import { ButtonControl } from "./EditPostComponents/ButtonControl";

export default function EditPost({ postData, setOpened }) {
  const [data, setData] = useState(postData);

  useEffect(() => {
    setData(postData); // This is be executed when `loading` state changes
  }, [postData]);

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
