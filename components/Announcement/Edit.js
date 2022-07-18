import AnnouncementControl from "../Announcement/";
import {
  Checkbox,
  InputWrapper,
  Modal,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import ButtonControl from "./AnnouncementComponents/ButtonControl";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { showNotification } from "@mantine/notifications";
import { AlertCircle, Check, Edit as EditIcon } from "tabler-icons-react";
import { UserContext } from "@lib/context";
import { useRouter } from "next/router";
import { firestore, serverTimestamp } from "@lib/firebase";

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "กรุณาเขียนหัวข้อของประกาศ" })
    .max(100, { message: "หัวข้อต้องไม่เกิน 100 ตัวอักษร" }),
  content: z.string().min(1, { message: "กรุณาเขียนเนื้อหาของประกาศ" }),
});

export default function EditAnnouncement(props) {
  const [opened, setOpened] = useState(false);

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
            <div
              className={`${
                form.getInputProps("type").value === "danger"
                  ? "border-red-500 bg-red-500"
                  : form.getInputProps("type").value === "warning"
                  ? "border-orange-500 bg-orange-500"
                  : "border-green-500 bg-green-500"
              } border-2 rounded-sm flex flex-row items-center`}
            >
              <div>
                <AlertCircle size={25} className="text-white m-1" />
              </div>
              <div className="flex flex-row px-2 text-title  w-full py-2 bg-foreground rounded-r-sm">
                <div className="w-full">
                  <h1 className="font-bold md:text-base text-sm ">
                    <TextInput
                      placeholder="หัวข้อการประกาศ"
                      classNames={{
                        input: "bg-transparent bg-opacity-50  border-none",
                      }}
                      {...form.getInputProps("title")}
                    />
                  </h1>
                  <p className="text-xs md:text-sm ">
                    <Textarea
                      placeholder="เนื้อหาของประกาศ"
                      autosize
                      classNames={{
                        input: "bg-transparent bg-opacity-50  border-none",
                      }}
                      {...form.getInputProps("content")}
                    />
                  </p>
                </div>
              </div>
            </div>
            <Checkbox
              checked={form.getInputProps("published").value}
              {...form.getInputProps("published")}
              label="เริ่มประกาศทันที"
            />
          </Stack>
          <ButtonControl setOpened={setOpened} postRef={props.postRef} />
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
