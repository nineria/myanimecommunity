import React from "react";
// Components
import { Button, Group } from "@mantine/core";

export default function ButtonControl({ setOpened }) {
  return (
    <Group mt="md" position="apart">
      <Group spacing="xs" position="left">
        <Button
          onClick={() => setOpened(false)}
          className="bg-gray-500 hover:bg-gray-500 hover:opacity-75"
        >
          ยกเลิก
        </Button>
        <Button className="bg-red-500 hover:bg-red-500 hover:opacity-75">
          ลบโพสต์
        </Button>
      </Group>
      <Button
        type="submit"
        className="bg-green-500 hover:bg-green-500 hover:opacity-75"
      >
        ยืนยัน
      </Button>
    </Group>
  );
}
