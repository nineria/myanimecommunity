import React, { useState, useEffect } from "react";
// Components
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Group,
  Modal,
  Space,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
// Icons
import { AlertTriangle, Edit } from "tabler-icons-react";
// Tools
import { kFormatter } from "@components/Calculator";

export default function UserCardImage({ user, posts }) {
  const [opened, setOpened] = useState(false);

  const [totalLikes, setTotalLike] = useState(0);

  useEffect(() => {
    posts.map((item) => setTotalLike(totalLikes + item.likes));
  }, [posts, totalLikes]);

  const ranks = user.ranks.map((rank) => (
    <Badge key={rank.label} variant="outline" color={rank.color} size="lg">
      {rank.label}
    </Badge>
  ));

  return (
    <Card p="md" radius="sm" className="bg-foreground">
      <Card.Section
        sx={{
          backgroundImage: `url(${user.image})`,
          height: 260,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="fixed top-2 right-0 p-[2px] bg-foreground rounded-l-md">
        <Button
          className="border-none mr-2 text-title hover:bg-content hover:text-[#fff]"
          compact
          variant="default"
          rightIcon={<AlertTriangle size={20} />}
          onClick={() => setOpened(true)}
        >
          แจ้งรายงาน
        </Button>
      </div>
      <Avatar
        src={user.avatar}
        size={120}
        radius={120}
        mx="auto"
        mt={-90}
        className="border-2 border-foreground"
      />
      <Stack spacing="sm">
        <div className="block">
          <Text align="center" size="lg" mt="sm" weight={500}>
            {user.firstName} {user.lastName}
          </Text>
          <Text align="center" weight={500}>
            ({user.username})
          </Text>
        </div>
        <Group position="center">{ranks}</Group>
        <Group mt="md" position="center" spacing={50}>
          <div>
            <Text align="center" size="lg" weight={500}>
              {kFormatter(totalLikes)}
            </Text>
            <Text align="center" size="sm" color="dimmed">
              ถูกใจ
            </Text>
          </div>
          <div>
            <Text align="center" size="lg" weight={500}>
              {kFormatter(posts.length)}
            </Text>
            <Text align="center" size="sm" color="dimmed">
              โพสต์
            </Text>
          </div>
          <div>
            <Text align="center" size="lg" weight={500}>
              {kFormatter(0)}
            </Text>
            <Text align="center" size="sm" color="dimmed">
              คอมเมนต์
            </Text>
          </div>
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
          overlay: "bg-background",
          title: "text-title",
        }}
      >
        <Stack>
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
