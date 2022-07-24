import {
  Button,
  Checkbox,
  Modal,
  Select,
  Stack,
  Textarea,
  TextInput,
  Tooltip,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import ButtonControl from "./AnnouncementComponents/ButtonControl";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { showNotification } from "@mantine/notifications";
import { AlertCircle, Check, Speakerphone } from "tabler-icons-react";
import { UserContext } from "lib/context";
import { useRouter } from "next/router";
import { auth, firestore, serverTimestamp } from "lib/firebase";

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
        closeOnClickOutside={false}
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
              {...form.getInputProps("published")}
              label="เริ่มประกาศ"
            />
          </Stack>
          <ButtonControl setOpened={setOpened} type="add" />
        </form>
      </Modal>
      <Button
        onClick={() => setOpened(true)}
        className="md:block hidden z-10 bg-content text-[#fff] hover:bg-content hover:opacity-75 max-w-fit"
        variant="default"
        size="xs"
      >
        สร้างประกาศ +
      </Button>
      <Tooltip label="สร้างประกาศใหม่" placement="start" withArrow>
        <Button
          onClick={() => setOpened(true)}
          className="md:hidden block z-10 bg-content text-[#fff] hover:bg-content hover:opacity-75 max-w-fit"
          variant="default"
          size="xs"
        >
          <Speakerphone size={14} />
        </Button>
      </Tooltip>
    </>
  );
}
