import React from "react";
// Components
import { InputWrapper, TextInput } from "@mantine/core";
import RichTextEditor from "@components/RichText";

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
      <RichTextEditor
        controls={[["bold", "italic", "underline"], ["link"]]}
        stickyOffset={-50}
        {...props}
        placeholder="ระบุแหล่งที่มาของเนื้อหา"
        classNames={{
          root: "bg-black/5 text-title border-[#fff] border-opacity-20",
          toolbar: "bg-foreground text-title",
          toolbarControl:
            "bg-foreground border-title border-opacity-20 hover:bg-background",
        }}
      />
    </InputWrapper>
  );
}
