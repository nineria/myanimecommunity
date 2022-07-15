import AnnouncementControl from "../Announcement/";
import {
  Checkbox,
  InputWrapper,
  Modal,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import ButtonControl from "./AnnouncementComponents/ButtonControl";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { showNotification } from "@mantine/notifications";
import { Check, Edit as EditIcon } from "tabler-icons-react";
import { UserContext } from "@lib/context";
import { useRouter } from "next/router";
import {
  auth,
  firestore,
  getUserWithUsername,
  serverTimestamp,
} from "@lib/firebase";

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "กรุณาเขียนหัวข้อของประกาศ" })
    .max(100, { message: "หัวข้อต้องไม่เกิน 100 ตัวอักษร" }),
  content: z.string().min(1, { message: "กรุณาเขียนเนื้อหาของประกาศ" }),
});

export default function EditAnnouncement(props) {
  const [opened, setOpened] = useState(false);

  const [postRef, setPostRef] = useState();

  useEffect(() => {
    const uid = props.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("announcements")
      .doc(props.slug);
    setPostRef(ref);
  }, [props.uid, props.slug]);

  const router = useRouter();

  const HandleChange = async (values) => {
    const uid = props.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("announcements")
      .doc(props.slug);

    const data = {
      type: values.type,
      title: values.title,
      content: values.content,
      updatedAt: serverTimestamp(),
      published: values.published,
    };
    await ref.update(data);

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
      type: props.type,
      title: props.title,
      content: props.content,
      published: props.published,
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
            <TextInput
              label="เนื้อหา"
              placeholder="เนื้อหาของประกาศ"
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
              checked={form.getInputProps("published").value}
              {...form.getInputProps("published")}
              label="เริ่มประกาศทันที"
            />
          </Stack>
          <ButtonControl setOpened={setOpened} postRef={postRef} />
        </form>
      </Modal>
      <div
        onClick={() => setOpened(true)}
        className="cursor-pointer bg-foreground"
      >
        <EditIcon size={18} color="#aaa" />
      </div>
    </>
  );
}
