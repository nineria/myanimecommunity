import { Button, Group } from "@mantine/core";
import React from "react";

export default function ButtonControl({ setOpened }) {
  return (
    <Group spacing="xs" position="right" mt="xl">
      <Button
        size="xs"
        onClick={() => setOpened(false)}
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
  );
}
