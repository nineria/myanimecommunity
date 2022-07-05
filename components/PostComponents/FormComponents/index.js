import React from "react";
// Components
import {
  Button,
  Group,
  Input,
  InputWrapper,
  Stack,
  Textarea,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import WebsiteRule from "@components/WebsiteRule";

export function PostHeader(props) {
  return (
    <InputWrapper label="หัวข้อ" description="หัวข้อของโพสต์">
      <Input
        placeholder="หัวข้อโพสต์"
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
