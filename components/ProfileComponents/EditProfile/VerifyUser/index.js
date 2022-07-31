import { Group, TextInput } from "@mantine/core";
import React from "react";

export default function VerifyUser(props) {
  return (
    <>
      <Group grow>
        <TextInput
          label="ชื่อจริง"
          required
          {...props.firstName}
          placeholder="ชื่อจริงของคุณ"
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
        />
        <TextInput
          label="นามสกุล"
          required
          {...props.lastName}
          placeholder="นามสกุลของคุณ"
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
        />
      </Group>
      <TextInput
        required
        label="ยืนยันอีเมล (Email)"
        {...props.email}
        placeholder="อีเมลของคุณ"
        classNames={{
          input: "bg-accent bg-opacity-50",
        }}
      />
      <TextInput
        label="เบอร์โทรศัพท์"
        {...props.phoneNumber}
        placeholder="เบอร์โทรศัพท์ของคุณ"
        classNames={{
          input: "bg-accent bg-opacity-50",
        }}
      />
    </>
  );
}
