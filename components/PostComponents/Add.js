import React, { useContext, useState } from "react";
// Hooks
import { useForm, zodResolver } from "@mantine/form";
// Components
import {
  Button,
  Group,
  Input,
  InputWrapper,
  LoadingOverlay,
  Stack,
  TextInput,
} from "@mantine/core";
import TagHeader from "./FormComponents/TagHeader";
import TagGenre from "./FormComponents/TagGenre";
import { PostHeader, RefCredit } from "./FormComponents";
import PostImage from "./FormComponents/PostImage";
import PostContent from "./FormComponents/PostContent";
import { ButtonControl } from "./FormComponents/ButtonControl";
import { UserContext } from "@lib/context";
import kebabCase from "lodash.kebabcase";
import { auth, firestore, serverTimestamp } from "@lib/firebase";
import { useRouter } from "next/router";
import WebsiteRule from "@components/WebsiteRule";
import { z } from "zod";
import { showNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";

const schema = z.object({
  title: z
    .string()
    .min(10, { message: "หัวข้อโพสต์ต้องมีอย่างน้อย 10 ตัวอักษร" })
    .max(120, { message: "หัวข้อโพสต์ต้องไม่เกิน 120 ตัวอักษร" }),
  credit: z.string().min(1, {
    message:
      "กรุณาใส่แหล่งที่มาหรืออ้างอิง กรณีข้อมูลในโพสต์เป็นของท่านเองให้เขียนว่า Original",
  }),
});

export default function Add({ setOpened }) {
  const { username } = useContext(UserContext);

  const router = useRouter();

  const [loading, setLoading] = useState();

  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [image, setImage] = useState();

  const HandleChange = async (values) => {
    setLoading(true);
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("posts")
      .doc();
    const data = {
      slug: kebabCase(values.title),
      tag: tags,
      genre: genres,
      title: values.title,
      image: image,
      content: values.content,
      credit: values.credit,
      username: username,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      stars: values.stars,
      likes: values.likes,
      uid: uid,
    };
    await ref.set(data);

    showNotification({
      color: "teal",
      title: "บันทึกการเปลี่ยนแปลงเรียบร้อย",
      icon: <Check size={18} />,
      classNames: {
        root: "bg-foreground border-teal-400",
      },
    });

    setLoading(false);

    router.replace(`posts/${username}/${ref.id}`);
  };

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      slug: "",
      tag: [],
      genre: [],
      title: "",
      content: "",
      credit: "",
      username: "",
      updatedAt: "",
      createdAt: "",
      stars: 0,
      likes: 0,
      uid: "",
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => HandleChange(values))}>
      <LoadingOverlay visible={loading} />
      <Stack spacing="sm">
        <TagHeader data={tags} setData={setTags} />
        <TagGenre data={genres} setData={setGenres} />
        <PostHeader {...form.getInputProps("title")} />
        <PostImage image={image} setImage={setImage} />
        <PostContent {...form.getInputProps("content")} />
        <RefCredit {...form.getInputProps("credit")} />
        <WebsiteRule />
        <ButtonControl setOpened={setOpened} type="add" />
      </Stack>
    </form>
  );
}
