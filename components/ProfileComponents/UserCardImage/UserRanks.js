import AdminCheck from "hooks/AdminCheck";
import { getUserWithUsername } from "lib/firebase";
import { Badge, Button, Group, Stack, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import React from "react";
import { X } from "tabler-icons-react";
import GiveUserRanks from "../GiveUserRank";

export default function UserRanks({ user, userRanks }) {
  const modals = useModals();

  const router = useRouter();

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
        <GiveUserRanks user={user} userRanks={userRanks} />
      </AdminCheck>
    </div>
  );
}
