import { Card, Stack, Title } from "@mantine/core";
import React from "react";

export default function ReportFormUser() {
  return (
    <Card p="md" radius="sm" className="bg-foreground">
      <Stack>
        <Title order={3}>รายงานจากผู้ใช้</Title>
      </Stack>
    </Card>
  );
}
