import React from "react";
// Components
import { Button, Group, Stack, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useModals } from "@mantine/modals";
// Icons
import { Check } from "tabler-icons-react";

export function ButtonControl({ setOpened }) {
  const modals = useModals();

  const openModal = () => {
    const handleOnClick = () => {
      showNotification({
        color: "teal",
        title: "บันทึกการเปลี่ยนแปลงเรียบร้อย",
        icon: <Check size={18} />,
        classNames: {
          root: "bg-foreground",
        },
      });
      setOpened(false);
      modals.closeModal(id);
    };
    const id = modals.openModal({
      title: (
        <Text size="sm">
          การดำเนินการต่อไปนี้จะไม่สามารถกลับมาแก้ไขได้
          ต้องการดำเนินการต่อหรือไม่?
        </Text>
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
              className="bg-green-500 hover:bg-green-500 hover:opacity-75"
              onClick={() => handleOnClick()}
            >
              ตกลง
            </Button>
          </Group>
        </Stack>
      ),
    });
  };

  return (
    <Group mt="md" position="apart">
      <Group spacing="xs" position="left">
        <Button
          size="xs"
          onClick={() => setOpened(false)}
          className="bg-gray-500 hover:bg-gray-500 hover:opacity-75"
        >
          ยกเลิก
        </Button>
        <Button
          size="xs"
          className="bg-red-500 hover:bg-red-500 hover:opacity-75"
        >
          ลบโพสต์
        </Button>
      </Group>

      <Button
        type="submit"
        size="xs"
        className="bg-green-500 hover:bg-green-500 hover:opacity-75"
        onClick={() => openModal()}
      >
        ยืนยัน
      </Button>
    </Group>
  );
}
