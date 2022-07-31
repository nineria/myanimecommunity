import { InputWrapper, PasswordInput, Text } from "@mantine/core";
import React from "react";

export default function ChangePassword(props) {
  return (
    <>
      <Text size="xs" color="red">
        ทางเว็บไซต์ MyAnimeCommunity
        ปิดปรับปรุงระบบการเปลี่ยนแปลงรหัสผ่านใหม่ชั่วคราว
      </Text>
      <InputWrapper label="รหัสผ่านเดิม">
        <PasswordInput
          disabled
          {...props.password}
          placeholder="รหัสผ่านเดิมของคุณ"
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
        />
      </InputWrapper>
      <InputWrapper label="รหัสผ่านใหม่">
        <PasswordInput
          disabled
          {...props.password}
          placeholder="รหัสผ่านใหม่เดิมของคุณ"
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
        />
      </InputWrapper>
    </>
  );
}
