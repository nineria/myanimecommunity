import React from "react";
// Components
import { Stack, TextInput } from "@mantine/core";

export default function Title(props) {
  return (
    <Stack spacing="xs">
      <TextInput
        label="เชื่อมโยง"
        description="Link เชื่อมโยงไปยังหน้าที่ต้องการ"
        classNames={{
          input: "bg-accent bg-opacity-50",
        }}
        placeholder="/https"
        {...props.titleLink}
      />
      <TextInput
        label="หัวข้อโพสต์"
        classNames={{
          input: "bg-accent bg-opacity-50",
        }}
        placeholder="โพสต์ใหม่ที่น่าสนใจ"
        {...props.title}
      />
    </Stack>
  );
}
