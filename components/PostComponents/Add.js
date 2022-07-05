import React, { useContext, useState } from "react";
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
import { UserContext } from "@lib/context";
import kebabCase from "lodash.kebabcase";
import { auth, firestore, serverTimestamp } from "@lib/firebase";
import { useRouter } from "next/router";

export default function Add({ setOpened }) {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [content, setContent] = useState("");

  const { username } = useContext(UserContext);
  // Validate length
  // const isValid = title.length > 3 && title.length < 100;

  const HandleChange = async (values) => {
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("posts")
      .doc(kebabCase(values.title));

    const data = {
      slug: kebabCase(values.title),
      tag: tags,
      genre: genres,
      title: values.title,
      image: values.image,
      content: content,
      credit: values.credit,
      username: username,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      stars: values.stars,
      likes: values.likes,
      uid: uid,
    };

    await ref.set(data);

    router.reload();
  };

  const form = useForm({
    initialValues: {
      slug: "",
      tag: [],
      genre: [],
      title: "",
      image: "",
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
