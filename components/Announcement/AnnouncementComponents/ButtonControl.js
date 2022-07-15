import React from "react";
// Components
import { Button, Group, Stack, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { X } from "tabler-icons-react";
import { useRouter } from "next/router";

export default function ButtonControl({ setOpened, postRef, type }) {
  const modals = useModals();

  const router = useRouter();

  const handleCancel = () => {
    showNotification({
      color: "yellow",
      title: "ยกเลิกแล้ว",
      icon: <X size={18} />,
      classNames: {
        root: "bg-foreground border-yellow-400",
      },
    });
    setOpened(false);
  };

  const handleDelete = () => {
    const handleOnClick = async () => {
      await postRef.delete();

      showNotification({
        color: "red",
        title: "ลบประกาศแล้ว",
        icon: <X size={18} />,
        classNames: {
          root: "bg-foreground border-red-400",
        },
      });
      modals.closeModal(id);
      setOpened(false);

      router.reload();
    };
    const id = modals.openModal({
      title: (
        <Stack>
          <Text size="sm">คุณต้องการลบประกาศนี้หรือไม่?</Text>
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
              size="xs"
              className="bg-background text-title hover:bg-background hover:opacity-75"
              onClick={() => modals.closeModal(id)}
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              size="xs"
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
    <Group mt="md" position="apart">
      {type === "add" ? (
        <div />
      ) : (
        <Button
          size="xs"
          className="bg-red-500 hover:bg-red-500 hover:opacity-75"
          onClick={() => handleDelete()}
        >
          ลบ
        </Button>
      )}

      <Group spacing="xs" position="right">
        <Button
          size="xs"
          onClick={() => handleCancel()}
          className="bg-background text-title hover:bg-background hover:opacity-75"
        >
          ยกเลิก
        </Button>
        <Button
          size="xs"
          type="submit"
          className="bg-green-500 hover:bg-green-500 hover:opacity-75"
        >
          ยืนยัน
        </Button>
      </Group>
    </Group>
  );
}
