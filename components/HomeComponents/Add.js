import React, { useContext } from "react";
// Hooks
import { useForm } from "@mantine/hooks";
// Components
import { Divider, Stack } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import ButtonControl from "./PostComponents/ButtonControl";
import Content from "./PostComponents/Content";
import Header from "./PostComponents/Header";
import TermAndService from "./PostComponents/TermAndService";
import Title from "./PostComponents/Title";
// Icons
import { Check } from "tabler-icons-react";
import { auth, firestore, serverTimestamp } from "@lib/firebase";
import { UserContext } from "@lib/context";
import { useRouter } from "next/router";

export default function Add({ setOpened }) {
  const { username } = useContext(UserContext);

  const router = useRouter();

  const HandleChange = async (values) => {
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("homePosts")
      .doc();

    const data = {
      uid: uid,
      slug: ref.id,
      username: username,
      title: values.title,
      titleLink: values.titleLink,
      header: values.header,
      headerLink: values.headerLink,
      body: values.body,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    };

    showNotification({
      color: "teal",
      title: "สร้างโพสต์แล้ว",
      icon: <Check size={18} />,
      classNames: {
        root: "bg-foreground",
      },
    });

    setOpened(false);

    await ref.set(data);

    router.reload();
  };

  const form = useForm({
    initialValues: {
      title: "",
      titleLink: "",
      header: "",
      headerLink: "",
      body: "",
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => HandleChange(values))}>
      <Stack>
        {/* Main post title */}
        <Title
          titleLink={form.getInputProps("titleLink")}
          title={form.getInputProps("title")}
        />
        <Divider />
        {/* Main post header */}
        <Header
          headerLink={form.getInputProps("headerLink")}
          header={form.getInputProps("header")}
        />
        <Divider />
        {/* Main post content */}
        <Content body={form.getInputProps("body")} />

        <TermAndService />
        {/* Button form Control */}
        <ButtonControl setOpened={setOpened} />
      </Stack>
    </form>
  );
}
