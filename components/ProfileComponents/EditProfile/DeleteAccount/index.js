import { Button, Group, Stack, Text, Title } from "@mantine/core";
import React from "react";

export default function DeleteAccount({ setOpenedConfirm }) {
  return (
    <div className="border-[1px]  p-4 border-[#ff0000] rounded-md">
      <Stack>
        <Title order={2}>ลบบัญชีส่วนบุคคล</Title>
        <Text>
          ลบบัญชีส่วนบุคคลของคุณ และข้อมูลส่วนบุคคลทั้งหมดออกอย่างถาวร
          จากแพลตฟอร์ม MyAnimeCommunity การกระทำนี้ไม่สามารถย้อนกลับได้
          โปรดดำเนินการต่อด้วยความระมัดระวัง
        </Text>
        <Group>
          <Button
            className="bg-[#ff0000] hover:bg-[#ff0000] hover:opacity-75"
            size="xs"
            onClick={() => setOpenedConfirm(true)}
          >
            ลบบัญชี
          </Button>
        </Group>
      </Stack>
    </div>
  );
}
