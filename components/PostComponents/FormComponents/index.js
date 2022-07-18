import React from "react";
// Components
import { InputWrapper, Textarea, TextInput } from "@mantine/core";

export function PostHeader(props) {
  return (
    <InputWrapper required label="หัวข้อ" description="หัวข้อของโพสต์">
      <TextInput
        placeholder="หัวข้อที่น่าสนใจของคุณ!"
        classNames={{
          input: "bg-accent bg-opacity-50",
        }}
        {...props}
      />
    </InputWrapper>
  );
}

export function RefCredit(props) {
  return (
    <InputWrapper
      required
      label="อ้างอิง"
      description="โปรดระบุแหล่งที่มาของเนื้อหา เช่น รูปภาพ, ข้อความ ก่อนโพสต์ลงบนเว็บไซต์ MyAnimeCommunity"
    >
      <Textarea
        placeholder="ระบุแหล่งที่มาของเนื้อหา"
        classNames={{
          input: "bg-accent bg-opacity-50",
        }}
        autosize
        minRows={1}
        {...props}
      />
    </InputWrapper>
  );
}
