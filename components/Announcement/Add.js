import AnnouncementControl from "../Announcement/";
import {
  Button,
  Checkbox,
  InputWrapper,
  Modal,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import ButtonControl from "./AnnouncementComponents/ButtonControl";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { showNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";
import { UserContext } from "@lib/context";
import { useRouter } from "next/router";
import { auth, firestore, serverTimestamp } from "@lib/firebase";

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "กรุณาเขียนหัวข้อของประกาศ" })
    .max(100, { message: "หัวข้อต้องไม่เกิน 100 ตัวอักษร" }),
  content: z.string().min(1, { message: "กรุณาเขียนเนื้อหาของประกาศ" }),
});

export default function AddAnnouncement() {
  const [opened, setOpened] = useState(false);

  const { username } = useContext(UserContext);

  const router = useRouter();

  const HandleChange = async (values) => {
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("announcements")
      .doc();
    const data = {
      slug: ref.id,
      type: values.type,
      title: values.title,
      content: values.content,
      author: username,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      uid: uid,
      published: values.published,
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

    setOpened(false);

    router.reload();
  };

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      type: "success",
      title: "",
      content: "",
      published: false,
    },
  });

  return (
    <>
      <Modal
        size="xl"
        classNames={{
          modal: "bg-foreground",
          overlay: "bg-background",
          title: "text-title",
        }}
        opened={opened}
        onClose={() => setOpened(false)}
        title="สร้างประกาศ"
      >
        <form onSubmit={form.onSubmit((values) => HandleChange(values))}>
          <Stack>
            <Select
              label="ประเภท"
              placeholder="เลือกประเภทของประกาศ"
              required
              data={[
                { value: "danger", label: "Danger - ระดับความสำคัญสูงสุด" },
                { value: "warning", label: "Warning - ระดับความสำคัญปานกลาง" },
                { value: "success", label: "Success - ระดับความสำคัญทั่วไป" },
              ]}
              {...form.getInputProps("type")}
            />
            <TextInput
              label="หัวข้อ"
              placeholder="หัวข้อการประกาศ"
              classNames={{
                input: "bg-accent bg-opacity-50",
              }}
              {...form.getInputProps("title")}
            />
            <Textarea
              label="เนื้อหา"
              placeholder="เนื้อหาของประกาศ"
              autosize
              minRows={2}
              classNames={{
                input: "bg-accent bg-opacity-50",
              }}
              {...form.getInputProps("content")}
            />
            <InputWrapper
              label="ตัวอย่างของประกาศ"
              description="ตัวอย่างเมื่อนำไปแสดงบนเว็บไซต์"
            >
              <AnnouncementControl
                type={form.getInputProps("type").value}
                title={form.getInputProps("title").value || "--ใส่หัวข้อ"}
                content={form.getInputProps("content").value || "--ใส่เนื้อหา"}
                disabled
              />
            </InputWrapper>
            <Checkbox
              {...form.getInputProps("published")}
              label="เริ่มประกาศ"
            />
          </Stack>
          <ButtonControl setOpened={setOpened} type="add" />
        </form>
      </Modal>
      <Button
        onClick={() => setOpened(true)}
        className="z-10 bg-content text-[#fff] hover:bg-content hover:opacity-75 max-w-fit"
        variant="default"
        size="xs"
      >
        สร้างประกาศ +
      </Button>
    </>
  );
}
