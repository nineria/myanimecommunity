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
import { AlertTriangle, Edit, X } from "tabler-icons-react";
// Tools
import { kFormatter } from "@components/Calculator";
import EditProfile from "./EditProfile";
import { UserContext } from "@lib/context";
import { GiveAndRemoveRank } from "./GiveUserRank";
import { getUserWithUsername } from "@lib/firebase";
import { useRouter } from "next/router";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import AdminCheck from "@components/AdminCheck";

export default function UserCardImage({ user, userRef, posts }) {
  const { username } = useContext(UserContext);

  const [opened, setOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);

  const [totalLikes, setTotalLike] = useState(0);

  const [userRanks, setUserRanks] = useState(null);

  const router = useRouter();

  const modals = useModals();

  useEffect(() => {
    let total = 0;
    const setTotal = () => {
      posts.map((item) => (total = total + item.likes));
    };

    const getRanks = async () => {
      const userDoc = await getUserWithUsername(user.username);

      let ranks = null;

      const ranksRef = await userDoc.ref.collection("ranks").get();
      ranks = await JSON.stringify(ranksRef.docs.map((doc) => doc.data()));

      ranks = JSON.parse(ranks);

      setUserRanks(ranks);
    };

    getRanks();

    setTotal();
    setTotalLike(total);
  }, [posts, user.username]);

  const removeUserRank = (slug, label) => {
    const handleOnClick = async () => {
      const userDoc = await getUserWithUsername(user.username);
      const ranksRef = await userDoc.ref.collection("ranks").doc(slug);
      await ranksRef.delete();

      router.replace(`/${user.username}`);

      showNotification({
        color: "red",
        title: `ถอดแรงค์ ${label} ของ ${user.username} ออกแล้ว`,
        icon: <X size={18} />,
        classNames: {
          root: "bg-foreground border-red-400",
        },
      });
      modals.closeModal(id);

      setOpened(false);

      router.replace(`/${user.username}`);
    };
    const id = modals.openModal({
      title: (
        <Stack>
          <Text size="sm">
            คุณต้องการถอดแรงค์ <span className="text-content">{label}</span> ของ{" "}
            <span className="text-content">{user.username}</span> ออกหรือไม่?
          </Text>
        </Stack>
      ),
      withCloseButton: false,
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
              onClick={() => handleOnClick()}
            >
              ถอดแรงค์
            </Button>
          </Group>
        </Stack>
      ),
    });
  };

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

      <div className="flex md:flex-row flex-col md:justify-between justify-center py-4">
        <Group spacing="xl">
          <Avatar
            src={user.avatar}
            size={130}
            radius={130}
            mt={-80}
            className="border-2 border-[#fff]"
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
        {username === user.username && (
          <Button
            className="border-title md:my-0 my-10 text-title hover:opacity-75"
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
        <div className="flex flex-row flex-wrap justify-center items-center gap-2">
          {userRanks &&
            userRanks.map((rank, index) => (
              <AdminCheck
                key={index}
                fallback={
                  <Badge
                    variant="gradient"
                    gradient={{
                      from: rank.color.from,
                      to: rank.color.to,
                      deg: 35,
                    }}
                    className="shadow-md"
                    size="lg"
                  >
                    {rank.label}
                  </Badge>
                }
              >
                <Badge
                  key={index}
                  rightSection={
                    <X
                      size={16}
                      className="cursor-pointer"
                      onClick={() => removeUserRank(rank.slug, rank.label)}
                    />
                  }
                  variant="gradient"
                  gradient={{
                    from: rank.color.from,
                    to: rank.color.to,
                    deg: 35,
                  }}
                  className="shadow-md"
                  size="lg"
                >
                  {rank.label}
                </Badge>
              </AdminCheck>
            ))}

          {/* Give User rank */}
          <AdminCheck fallback={<></>}>
            <GiveAndRemoveRank user={user} userRanks={userRanks} />
          </AdminCheck>
        </div>
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
          closeOnClickOutside={false}
          title="แก้ไขข้อมูลส่วนตัว"
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
