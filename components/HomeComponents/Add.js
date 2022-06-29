import { Divider, Stack } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { Check } from "tabler-icons-react";
import ButtonControl from "./PostComponents/ButtonControl";
import Content from "./PostComponents/Content";
import Header from "./PostComponents/Header";
import TermAndService from "./PostComponents/TermAndService";
import Title from "./PostComponents/Title";

export default function Add(props) {
  const data = props.postData;

  const HandleChange = (values) => {
    data = values;
    props.handlePostDataChange(values);
    props.setOpened(false);
    showNotification({
      color: "teal",
      title: "สร้างโพสต์แล้ว",
      icon: <Check size={18} />,
      classNames: {
        root: "bg-foreground",
      },
    });
    console.log(data);
  };

  const form = useForm({
    initialValues: {
      title: data.title,
      titleLink: data.titleLink,
      header: data.header,
      headerLink: data.headerLink,
      body: data.body,
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
        <ButtonControl setOpened={props.setOpened} />
      </Stack>
    </form>
  );
}
