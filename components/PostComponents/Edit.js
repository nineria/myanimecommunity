import React, { useState } from "react";
// Components
import { LoadingOverlay, Stack } from "@mantine/core";
import TagHeader from "./FormComponents/TagHeader";
import TagGenre from "./FormComponents/TagGenre";
import { PostHeader, RefCredit } from "./FormComponents";
import PostImage from "./FormComponents/PostImage";
import PostContent from "./FormComponents/PostContent";
import { ButtonControl } from "./FormComponents/ButtonControl";
import { serverTimestamp } from "lib/firebase";
import AuthCheck from "hooks/AuthCheck";
import WebsiteRule from "components/WebsiteRule";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { showNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";
import { useRouter } from "next/router";

const schema = z.object({
  title: z
    .string()
    .min(10, { message: "หัวข้อโพสต์ต้องมีอย่างน้อย 10 ตัวอักษร" })
    .max(120, { message: "หัวข้อโพสต์ต้องไม่เกิน 120 ตัวอักษร" }),
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
  const [image, setImage] = useState(post.image);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const HandleChange = async (values) => {
    setLoading(true);
    await postRef.update({
      tag: tags,
      genre: genres,
      title: values.title,
      image: image,
      content: values.content,
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

    setLoading(false);

    router.reload();
  };

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      tag: post.tag,
      genre: post.genre,
      title: post.title,
      content: post.content,
      credit: post.credit,
    },
  });

  return (
    <AuthCheck>
      <form onSubmit={form.onSubmit((values) => HandleChange(values))}>
        <LoadingOverlay visible={loading} />
        <Stack spacing="sm">
          <TagHeader data={tags} setData={setTags} />
          <TagGenre data={genres} setData={setGenres} />
          <PostHeader {...form.getInputProps("title")} />
          <PostImage image={image} setImage={setImage} />
          <PostContent
            {...form.getInputProps("content")}
            value={form.getInputProps("content").value}
          />
          <RefCredit {...form.getInputProps("credit")} />
          <WebsiteRule />
          <ButtonControl setOpened={setOpened} post={post} postRef={postRef} />
        </Stack>
      </form>
    </AuthCheck>
  );
}
