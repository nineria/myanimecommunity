import { UserContext } from "@lib/context";
import { Button, Group, Stack, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useRouter } from "next/router";
import React, { useContext } from "react";

export default function Verify(props) {
  const { username } = useContext(UserContext);

  const modals = useModals();

  const router = useRouter();

  const handleOpenModals = () => {
    const id = modals.openModal({
      title: (
        <Stack>
          <Text size="sm">คุณยังไม่ได้ยืนยันตัวตน!</Text>
          <Text size="xs">
            ผู้ใช้ที่ยังไม่ได้ยืนยันตัวตนจะไม่สามารถโพสต์เนื้อหาใด ๆ
            ลงบนเว็บไซต์ MyAnimeCommunity ได้
          </Text>
          <Text size="xs">
            {`โปรดยืนยันตัวตนที่ \"แก้ไขรายละเอียด\" ณ โปรไฟล์ของผู้ใช้`}
          </Text>
        </Stack>
      ),
      zIndex: "999",
      centered: true,
      classNames: {
        modal: "bg-foreground",
        overlay: "bg-background",
      },
      size: "sm",
      children: (
        <Stack size="xs">
          <Group position="right">
            <Button
              className="bg-background text-title hover:bg-background hover:opacity-75"
              size="xs"
              onClick={() => modals.closeModal(id)}
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-500 hover:opacity-75"
              size="xs"
              onClick={() => {
                modals.closeModal(id);
                router.replace(`/${username}`);
              }}
            >
              ยืนยันตัวตน
            </Button>
          </Group>
        </Stack>
      ),
    });
  };

  return (
    <Button
      className="md:block hidden bg-content text-[#fff] hover:bg-content hover:opacity-75"
      variant="default"
      size="xs"
      onClick={handleOpenModals}
    >
      {props.children}
    </Button>
  );
}
