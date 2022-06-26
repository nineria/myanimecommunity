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
        {stat.value}
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
          height: 240,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Avatar
        src={data.avatar}
        size={120}
        radius={120}
        mx="auto"
        mt={-60}
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
        opened={opened}
        onClose={() => setOpened(false)}
        title="เหตุผลที่รายงาน!"
        overlayColor="#333"
      >
        <Stack>
          <Checkbox label="ชื่อผู้ใช้ไม่เหมาะสม" />
          <Checkbox label="ใช้วาจาไม่เหมาะสม / ทัศนคติเชิงลบ" />
          <Checkbox label="โฆษณาขายของ / การสแปมข้อความ" />
          <Checkbox label="คำพูดแสดงถึงความเกลียดชัง" />
          <Checkbox label="เนื้อหามีการอัพเดท" />
          <Textarea placeholder="โปรดระบุ" label="อื่นๆ" />
        </Stack>
        <Space />
        <Group position="center" mt="sm">
          <Button
            className="bg-content text-accent hover:bg-content hover:opacity-75"
            variant="default"
            onClick={() => setOpened(false)}
          >
            ยกเลิก
          </Button>
          <Button
            className="bg-black/30 text-accent hover:bg-black/30 hover:opacity-75"
            variant="default"
            onClick={() => setOpened(false)}
          >
            ส่งเรื่อง
          </Button>
        </Group>
      </Modal>
      <Grid mt="sm">
        <Grid.Col sm={12} md={6}>
          <Button
            fullWidth
            className="bg-content text-accent hover:bg-content hover:opacity-75"
            variant="default"
            rightIcon={<AlertTriangle size={20} />}
            onClick={() => setOpened(true)}
          >
            รายงานผู้ใช้
          </Button>
        </Grid.Col>
        <Grid.Col sm={12} md={6}>
          <Button
            fullWidth
            className="bg-black/30 text-accent hover:bg-black/30 hover:opacity-75"
            variant="default"
            rightIcon={<Edit size={20} />}
          >
            แก้ไขรายละเอียด
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
}
