import { kFormatter } from "@components/Calculator";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Grid,
  Group,
  Modal,
  Space,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import React, { useState } from "react";
import { AlertTriangle, Edit } from "tabler-icons-react";

export default function UserCardImage({ data }) {
  const [opened, setOpened] = useState(false);

  const stats = data.stats.map((stat) => (
    <div key={stat.label}>
      <Text align="center" size="lg" weight={500}>
        {kFormatter(stat.value)}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  const ranks = data.ranks.map((rank) => (
    <Badge key={rank.label} variant="outline" color={rank.color} size="lg">
      {rank.label}
    </Badge>
  ));

  return (
    <Card p="md" radius="sm" className="bg-foreground">
      <Card.Section
        sx={{
          backgroundImage: `url(${data.image})`,
          height: 260,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="fixed top-2 right-0 p-[2px] bg-foreground rounded-l-md">
        <Button
          className="border-none mr-2 text-title hover:bg-content hover:text-accent"
          compact
          variant="default"
          rightIcon={<AlertTriangle size={20} />}
          onClick={() => setOpened(true)}
        >
          แจ้งรายงาน
        </Button>
      </div>
      <Avatar
        src={data.avatar}
        size={120}
        radius={120}
        mx="auto"
        mt={-90}
        className="border-2 border-foreground"
      />
      <Stack spacing="sm">
        <div className="block">
          <Text align="center" size="lg" mt="sm" weight={500}>
            {data.username}
          </Text>
          <Text align="center" weight={500}>
            ({data.name})
          </Text>
        </div>
        <Group position="center">{ranks}</Group>
        <Group mt="md" position="center" spacing={50}>
          {stats}
        </Group>
        <ReportUser opened={opened} setOpened={setOpened} />
      </Stack>
    </Card>
  );
}

function ReportUser({ opened, setOpened }) {
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
          overlay: "bg-[#444]",
          title: "text-title",
        }}
      >
        <Stack>
          <Checkbox label="ชื่อผู้ใช้ไม่เหมาะสม" />
          <Checkbox label="ใช้วาจาไม่เหมาะสม / ทัศนคติเชิงลบ" />
          <Checkbox label="โฆษณาขายของ / การสแปมข้อความ" />
          <Checkbox label="คำพูดแสดงถึงความเกลียดชัง" />
          <Checkbox label="เนื้อหามีการอัพเดท" />
          <Textarea placeholder="โปรดระบุ" label="อื่นๆ" minRows={2} autosize />
        </Stack>
        <Space />
        <Group position="center" mt="sm">
          <Button
            className="bg-content text-[#fff] hover:bg-content hover:opacity-75"
            variant="default"
            onClick={() => setOpened(false)}
          >
            ยกเลิก
          </Button>
          <Button
            className="bg-background text-title hover:bg-background hover:opacity-75"
            variant="default"
            onClick={() => setOpened(false)}
          >
            ส่งเรื่อง
          </Button>
        </Group>
      </Modal>

      <Button
        fullWidth
        className="bg-black/30 text-[#fff] hover:bg-black/30 hover:opacity-75"
        variant="default"
        rightIcon={<Edit size={20} />}
      >
        แก้ไขรายละเอียด
      </Button>
    </>
  );
}
