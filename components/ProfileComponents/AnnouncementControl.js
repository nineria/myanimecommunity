import Announcement from "@components/Announcement";
import { Card, Input, InputWrapper, Text, Title } from "@mantine/core";
import React from "react";

export default function AnnouncementControl() {
  return (
    <Card p="md" radius="sm" className="bg-foreground">
      <Title order={3}>ควบคุมประกาศของเว็บไซต์</Title>
      <Text>ประกาศที่กำลังเปิดใช้</Text>
      <Announcement type="warning" title="text" content="text" />
      {/* type, title, content */}
      <InputWrapper id="input-demo" label="ชื่อจริง">
        <Input
          placeholder="ชื่อจริงของคุณ"
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
        />
      </InputWrapper>
    </Card>
  );
}
