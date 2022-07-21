import React from "react";
// Components
import { Grid, Input, InputWrapper, Stack, TextInput } from "@mantine/core";

export default function Header(props) {
  return (
    <Stack>
      <TextInput
        label="เชื่อมโยง"
        description="Link เชื่อมโยงไปยังหน้าที่ต้องการ"
        classNames={{
          input: "bg-accent bg-opacity-50",
        }}
        placeholder="/https"
        {...props.headerLink}
      />

      <TextInput
        label="หัวข้อย่อย"
        classNames={{
          input: "bg-accent bg-opacity-50",
        }}
        placeholder="หัวข้อย่อย"
        {...props.header}
      />
    </Stack>
  );
}
