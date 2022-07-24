import {
  Button,
  Checkbox,
  Group,
  Modal,
  Space,
  Stack,
  Textarea,
} from "@mantine/core";
import React, { useState } from "react";
import { AlertTriangle } from "tabler-icons-react";

export default function Report() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        size="md"
        opened={opened}
        onClose={() => setOpened(false)}
        title="เหตุผลที่รายงาน!"
        centered
        classNames={{
          modal: "bg-foreground",
          overlay: "bg-background",
          title: "text-title",
        }}
      >
        <Stack spacing="sm">
          <Checkbox
            label="ชื่อผู้ใช้ไม่เหมาะสม"
            classNames={{
              input: "bg-black/20",
            }}
          />
          <Checkbox
            classNames={{
              input: "bg-black/20",
            }}
            label="ใช้วาจาไม่เหมาะสม / ทัศนคติเชิงลบ"
          />
          <Checkbox
            classNames={{
              input: "bg-black/20",
            }}
            label="โฆษณาขายของ / การสแปมข้อความ"
          />
          <Checkbox
            classNames={{
              input: "bg-black/20",
            }}
            label="คำพูดแสดงถึงความเกลียดชัง"
          />
          <Checkbox
            classNames={{
              input: "bg-black/20",
            }}
            label="เนื้อหามีการอัพเดท"
          />
          <Textarea
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
            placeholder="โปรดระบุ"
            label="อื่นๆ"
            minRows={2}
            autosize
          />
        </Stack>
        <Space />
        <Group position="center" mt="sm">
          <Button
            className="bg-content text-[#fff] hover:bg-content hover:opacity-75"
            variant="default"
            size="xs"
            onClick={() => setOpened(false)}
          >
            ยกเลิก
          </Button>
          <Button
            className="bg-background text-title hover:bg-background hover:opacity-75"
            variant="default"
            size="xs"
            onClick={() => setOpened(false)}
          >
            ส่งเรื่อง
          </Button>
        </Group>
      </Modal>
      <Button
        className="border-none mr-2 text-title hover:bg-content hover:text-[#fff]"
        compact
        variant="default"
        rightIcon={<AlertTriangle size={20} />}
        onClick={() => setOpened(true)}
      >
        แจ้งรายงาน
      </Button>
    </>
  );
}
