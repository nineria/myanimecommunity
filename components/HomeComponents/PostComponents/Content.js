import React from "react";
// Components
import { InputWrapper, Textarea } from "@mantine/core";

export default function Content(props) {
  return (
    <InputWrapper label="เนื้อหา" description="รายละเอียดเนื้อหาของโพสต์">
      <Textarea
        placeholder="เขียนรายละเอียด"
        autosize
        minRows={3}
        {...props.body}
      />
    </InputWrapper>
  );
}
