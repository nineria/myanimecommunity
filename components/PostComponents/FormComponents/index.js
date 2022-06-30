import React from "react";
// Components
import { Input, InputWrapper, Textarea } from "@mantine/core";

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

export function TermAndService() {
  return (
    <div className="flex flex-row items-center gap-2 text-xs">
      <span className="w-4/5">
        ผู้ดูแลระบบขอสงวนสิทธิ์ในการลบโพสต์ของผู้ที่ไม่ปฏิบัติตาม{" "}
        <span className="text-content underline cursor-pointer">
          กฎ กติกา และมารยาท
        </span>{" "}
        ของเว็บไซต์ MyAnimeCommunity
        <p>เพื่อรักษาบรรยากาศการพูดคุยของชุมชนคนรักอนิเมะ</p>
      </span>
    </div>
  );
}
