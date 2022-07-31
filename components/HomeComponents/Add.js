import React, { useContext } from "react";
// Hooks
import { useForm } from "@mantine/hooks";
// Components
import { Divider, Stack } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import ButtonControl from "./Elements/ButtonControl";
import Content from "./Elements/Content";
import Header from "./Elements/Header";
import Title from "./Elements/Title";
// Icons
import { Check } from "tabler-icons-react";
import { auth, firestore, serverTimestamp } from "lib/firebase";
import { UserContext } from "lib/context";
import { useRouter } from "next/router";
import WebsiteRule from "components/WebsiteRule";

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
      <Stack spacing="sm">
        <Title
          titleLink={form.getInputProps("titleLink")}
          title={form.getInputProps("title")}
        />
        <Divider label="หัวข้อย่อย และเนื้อหา" labelPosition="center" />
        <Header
          headerLink={form.getInputProps("headerLink")}
          header={form.getInputProps("header")}
        />
        <Content body={form.getInputProps("body")} />
        <WebsiteRule />
        <ButtonControl setOpened={setOpened} type="add" />
      </Stack>
    </form>
  );
}
