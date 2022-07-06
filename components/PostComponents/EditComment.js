import React, { useState } from "react";
// Hooks
import { useForm } from "@mantine/hooks";
// Components
import { Button, Group, InputWrapper, Stack, Tabs, Text } from "@mantine/core";
import AuthCheck from "@components/AuthCheck";
import { serverTimestamp } from "@lib/firebase";
import RichTextEditor from "@components/RichText";
import { showNotification } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { useModals } from "@mantine/modals";
import WebsiteRule from "@components/WebsiteRule";

const handleImageUpload = (image) =>
  new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image", image);

    fetch(
      "https://api.imgbb.com/1/upload?key=c87f45db6d1d5ccc1b31d0f69d380463",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => resolve(result.data.url))
      .catch(() => reject(new Error("Upload failed")));
  });

export default function EditComment({ comment, commentRef, setOpened }) {
  return (
    <AuthCheck>
      {comment && (
        <CommentForm
          comment={comment}
          commentRef={commentRef}
          setOpened={setOpened}
        />
      )}
    </AuthCheck>
  );
}

function CommentForm({ comment, commentRef, setOpened }) {
  const [content, setContent] = useState(comment.content);

  const modals = useModals();

  const form = useForm({
    initialValues: {
      content: content,
    },
  });

  const HandleChange = async () => {
    await commentRef.update({
      content: content,
      updateAt: serverTimestamp(),
    });

    showNotification({
      color: "teal",
      title: "บันทึกการเปลี่ยนแปลงเรียบร้อย",
      icon: <Check size={18} />,
      classNames: {
        root: "bg-foreground border-teal-400",
      },
    });
    setOpened(false);
  };

  const handleCancel = () => {
    showNotification({
      color: "yellow",
      title: "ยกเลิกการแก้ไขแล้ว",
      icon: <X size={18} />,
      classNames: {
        root: "bg-foreground border-yellow-400",
      },
    });
    setOpened(false);
  };

  const handleDelete = () => {
    const handleOnClick = () => {
      commentRef.delete();

      showNotification({
        color: "red",
        title: "ลบคอมเมนต์แล้ว",
        icon: <X size={18} />,
        classNames: {
          root: "bg-foreground border-red-400",
        },
      });
      modals.closeModal(id);
      setOpened(false);
    };
    const id = modals.openModal({
      title: (
        <Stack>
          <Text size="sm">คุณต้องการลบคอมเมนต์นี้หรือไม่?</Text>
          <Text size="xs">การดำเนินการต่อไปนี้จะไม่สามารถกลับมาแก้ไขได้</Text>
        </Stack>
      ),
      zIndex: "999",
      centered: true,
      classNames: {
        modal: "bg-foreground",
        overlay: "bg-background",
      },
      size: "sm",
      children: (
        <Stack size="xs">
          <Group position="right">
            <Button
              className="bg-background text-title hover:bg-background hover:opacity-75"
              onClick={() => modals.closeModal(id)}
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-500 hover:opacity-75"
              onClick={() => handleOnClick()}
            >
              ยืนยัน
            </Button>
          </Group>
        </Stack>
      ),
    });
  };

  return (
    <form onSubmit={form.onSubmit(() => HandleChange())}>
      <InputWrapper
        label="คอมเมนต์"
        description="แก้ไขรายระเอียดคอมเมนต์ เช่น ข้อความ รูปภาพ วิดีโอ รวมไปถึง Link ต่างๆ"
      >
        <Tabs
          variant="default"
          classNames={{
            tabLabel: "text-title",
          }}
        >
          <Tabs.Tab label="เขียน">
            <RichTextEditor
              controls={[
                ["bold", "italic", "underline", "link"],
                ["h3", "h4"],
                ["image", "video"],
              ]}
              sticky={true}
              stickyOffset={-55}
              {...form.getInputProps("content")}
              onChange={setContent}
              placeholder="รายระเอียดเนื้อหาของโพตส์ เช่น รูปภาพ หรือ วิดีโอ รวมไปถึง Link ต่างๆ"
              onImageUpload={handleImageUpload}
              classNames={{
                root: "bg-black/5 text-title border-[#fff] border-opacity-20",
                toolbar: "bg-foreground text-title",
                toolbarControl:
                  "bg-foreground border-title border-opacity-20 hover:bg-background",
              }}
            />
          </Tabs.Tab>
          <Tabs.Tab label="ตัวอย่าง">
            <RichTextEditor
              readOnly
              value={content}
              classNames={{
                root: "bg-black/10 text-title border-[#fff] border-opacity-20",
              }}
            />
          </Tabs.Tab>
        </Tabs>
      </InputWrapper>

      <WebsiteRule />

      <Group mt="sm" position="apart">
        <Button
          size="xs"
          className="bg-red-500 hover:bg-red-500 hover:opacity-75"
          onClick={handleDelete}
        >
          ลบ
        </Button>
        <Group spacing="xs" position="right">
          <Button
            size="xs"
            onClick={() => handleCancel()}
            className="bg-gray-500 hover:bg-gray-500 hover:opacity-75"
          >
            ยกเลิก
          </Button>
          <Button
            type="submit"
            size="xs"
            className="bg-green-500 hover:bg-green-500 hover:opacity-75"
          >
            ยืนยัน
          </Button>
        </Group>
      </Group>
    </form>
  );
}
