import { Button, Group } from "@mantine/core";
import React from "react";
import { showNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";

export function ButtonControl({ setOpened }) {
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
        onClick={() => {
          showNotification({
            title: "บันทึกการเปลี่ยนแปลงเรียบร้อย",
            icon: <Check size={18} />,
            classNames: {
              root: "bg-foreground",
            },
          });
          setOpened(false);
        }}
      >
        ยืนยัน
      </Button>
    </Group>
  );
}
