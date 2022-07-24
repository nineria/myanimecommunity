import React, { useState, useEffect, useContext } from "react";
// Components
import { Avatar, Button, Card, Group, Modal, Stack, Text } from "@mantine/core";
// Components
import EditProfile from "../EditProfile";
import { UserContext } from "lib/context";
import { getUserWithUsername } from "lib/firebase";
import Report from "components/Report";
import Statistics from "./Statistics";
import UserRanks from "./UserRanks";
import { Edit } from "tabler-icons-react";

export default function UserCardImage({ user, posts, statistics }) {
  const { username } = useContext(UserContext);

  const [editOpened, setEditOpened] = useState(false);

  const [userRanks, setUserRanks] = useState(null);

  useEffect(() => {
    const getRanks = async () => {
      const userDoc = await getUserWithUsername(user.username);

      let ranks = null;

      const ranksRef = await userDoc.ref.collection("ranks").get();
      ranks = await JSON.stringify(ranksRef.docs.map((doc) => doc.data()));

      ranks = JSON.parse(ranks);

      setUserRanks(ranks);
    };

    getRanks();
  }, [posts, user.username]);

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
          <Report />
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
        <UserRanks user={user} userRanks={userRanks} />

        {statistics && <Statistics statistics={statistics} />}

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
