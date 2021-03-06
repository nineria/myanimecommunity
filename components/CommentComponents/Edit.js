import React, { useContext } from "react";
import { useForm } from "@mantine/hooks";
import { Button, Group, InputWrapper, Stack, Text } from "@mantine/core";
import AuthCheck from "hooks/AuthCheck";
import { firestore, serverTimestamp } from "lib/firebase";
import RichTextEditor from "utils/RichText";
import { showNotification } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { useModals } from "@mantine/modals";
import WebsiteRule from "components/WebsiteRule";
import { UserContext } from "lib/context";
import { useRouter } from "next/router";

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

export default function Edit({ comment, commentRef, setOpened, post }) {
  return (
    <AuthCheck>
      {comment && (
        <CommentForm
          comment={comment}
          commentRef={commentRef}
          setOpened={setOpened}
          post={post}
        />
      )}
    </AuthCheck>
  );
}

function CommentForm({ comment, commentRef, setOpened }) {
  const router = useRouter();
  console.log(comment);
  const { userData } = useContext(UserContext);

  const modals = useModals();

  const form = useForm({
    initialValues: {
      content: comment.content,
    },
  });

  const HandleChange = async (values) => {
    await commentRef.update({
      content: values.content,
      username: userData.username,
      avatar: userData.avatar,
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

    router.reload();

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
    const handleOnClick = async () => {
      const userStatistics = firestore
        .collection("statistics")
        .doc(comment.uid);
      const userStatisticsPosts = (await userStatistics.get()).data();
      await userStatistics.update({
        comments: userStatisticsPosts.comments - 1,
      });

      await commentRef.delete();

      showNotification({
        color: "red",
        title: "ลบคอมเมนต์แล้ว",
        icon: <X size={18} />,
        classNames: {
          root: "bg-foreground border-red-400",
        },
      });
      modals.closeModal(id);

      router.reload();

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
              size="xs"
              onClick={() => modals.closeModal(id)}
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-500 hover:opacity-75"
              size="xs"
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
    <form onSubmit={form.onSubmit((values) => HandleChange(values))}>
      <InputWrapper
        label="คอมเมนต์"
        description="แก้ไขรายระเอียดคอมเมนต์ เช่น ข้อความ รูปภาพ วิดีโอ รวมไปถึง Link ต่างๆ"
      >
        <RichTextEditor
          controls={[
            ["bold", "italic", "underline", "link"],
            ["h3", "h4"],
            ["image", "video"],
          ]}
          sticky={true}
          stickyOffset={-55}
          {...form.getInputProps("content")}
          placeholder="รายระเอียดเนื้อหาของโพตส์ เช่น รูปภาพ หรือ วิดีโอ รวมไปถึง Link ต่างๆ"
          onImageUpload={handleImageUpload}
          classNames={{
            root: "bg-black/5 text-title border-[#fff] border-opacity-20",
            toolbar: "bg-foreground text-title",
            toolbarControl:
              "bg-foreground border-title border-opacity-20 hover:bg-background",
          }}
        />
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
            className="bg-background text-title hover:bg-background hover:opacity-75"
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
