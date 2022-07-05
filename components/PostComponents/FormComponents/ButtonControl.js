import React from "react";
// Components
import { Button, Group, Stack, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
// import { useModals } from "@mantine/modals";
// Icons
import { Check, X } from "tabler-icons-react";
import { useModals } from "@mantine/modals";
import { useRouter } from "next/router";

export function ButtonControl({ setOpened, postRef, disabled }) {
  const modals = useModals();
  const router = useRouter();
  const handleOnClick = () => {
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
      postRef.delete();

      showNotification({
        color: "red",
        title: "ลบโพสต์แล้ว",
        icon: <X size={18} />,
        classNames: {
          root: "bg-foreground border-red-400",
        },
      });
      modals.closeModal(id);
      setOpened(false);

      router.push("/posts");
    };
    const id = modals.openModal({
      title: (
        <Stack>
          <Text size="sm">คุณต้องการลบโพสต์นี้หรือไม่?</Text>
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
    <Group mt="md" position="apart">
      <Button
        size="xs"
        className="bg-red-500 hover:bg-red-500 hover:opacity-75"
        onClick={() => handleDelete()}
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
          disabled={disabled}
          className="bg-green-500 hover:bg-green-500 hover:opacity-75"
          onClick={() => handleOnClick()}
        >
          ยืนยัน
        </Button>
      </Group>
    </Group>
  );
}
