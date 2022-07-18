import React, { useState, useEffect, useContext } from "react";
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
import EditProfile from "./EditProfile";
import { UserContext } from "@lib/context";

export default function UserCardImage({ user, posts }) {
  const { username } = useContext(UserContext);

  const [opened, setOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);

  const [totalLikes, setTotalLike] = useState(0);

  useEffect(() => {
    let total = 0;
    const setTotal = () => {
      posts.map((item) => (total = total + item.likes));
    };
    setTotal();
    setTotalLike(total);
  }, [posts]);

  return (
    <Card p="md" radius="sm" className="bg-foreground">
      <Card.Section
        sx={{
          backgroundImage: `url(${user.image})`,
          height: 360,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {username !== user.username && (
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
      )}

      <div className="relative mx-5">
        <div className="relative w-fit">
          <Group>
            <Avatar
              src={user.avatar}
              size={140}
              radius={140}
              mx="auto"
              mt={-70}
              className="border-2 border-title"
            />
            <div className="block">
              <Text align="left" size="xl" weight={500}>
                {user.username}
              </Text>
              <Text align="left" size="md" className="opacity-50">
                {user.firstName} {user.lastName}
              </Text>
            </div>
          </Group>
        </div>
        {username === user.username && (
          <Button
            className="absolute top-2 right-0 border-title text-title hover:opacity-75"
            variant="outline"
            radius="xl"
            rightIcon={<Edit size={20} />}
            onClick={() => setEditOpened(true)}
          >
            แก้ไขรายละเอียด
          </Button>
        )}
      </div>

      <Stack spacing="sm">
        <Group position="center">
          {user &&
            user.ranks.map((rank) => (
              <Badge
                key={rank.label}
                variant="gradient"
                gradient={{ from: rank.color.from, to: rank.color.to, deg: 35 }}
                className="shadow-md"
                size="lg"
              >
                {rank.label}
              </Badge>
            ))}
        </Group>
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

        <Modal
          size="xl"
          opened={editOpened}
          onClose={() => setEditOpened(false)}
          title="แก้ไขข้อมูลส่วนตัว!"
          centered
          classNames={{
            modal: "bg-foreground",
            overlay: "bg-background",
            title: "text-title",
          }}
        >
          {editOpened && <EditProfile user={user} setOpened={setEditOpened} />}
        </Modal>
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
    </>
  );
}
