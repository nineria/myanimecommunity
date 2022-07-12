import React, { useState } from "react";
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
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { showNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";

const schema = z.object({
  title: z
    .string()
    .min(10, { message: "หัวข้อโพสต์ต้องมีอย่างน้อย 10 ตัวอักษร" })
    .max(120, { message: "หัวข้อโพสต์ต้องไม่เกิน 120 ตัวอักษร" }),
  image: z.string().min(1, { message: "กรุณาใส่รูปภาพประจำโพสต์" }),
  credit: z.string().min(1, {
    message:
      "กรุณาใส่แหล่งที่มาหรืออ้างอิง กรณีข้อมูลในโพสต์เป็นของท่านเองให้เขียนว่า Original",
  }),
});

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

    showNotification({
      color: "teal",
      title: "บันทึกการเปลี่ยนแปลงเรียบร้อย",
      icon: <Check size={18} />,
      classNames: {
        root: "bg-foreground border-teal-400",
      },
    });

    setOpened(false);

    router.reload();
  };

  const form = useForm({
    schema: zodResolver(schema),
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
