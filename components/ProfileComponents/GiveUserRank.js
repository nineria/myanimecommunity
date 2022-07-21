import {
  auth,
  firestore,
  getUserWithUsername,
  postToJSON,
} from "@lib/firebase";
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Input,
  InputWrapper,
  LoadingOverlay,
  Modal,
  MultiSelect,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useRouter } from "next/router";
import React, { forwardRef, useRef, useState } from "react";
import { useEffect } from "react";
import { MilitaryRank, Plus } from "tabler-icons-react";

export default function GiveUserRank() {
  return (
    <Card p="md" radius="sm" className="bg-foreground">
      <Stack>
        <Title order={3}>จัดการผู้ใช้</Title>
      </Stack>
    </Card>
  );
}

const ranksData = [
  {
    label: "ผู้กล้า",
    value: {
      label: "ผู้กล้า",
      color: {
        from: "#FF416C",
        to: "#FF4B2B",
      },
    },
  },
  {
    label: "นายทุน",
    value: {
      label: "นายทุน",
      color: {
        from: "#FDFC47",
        to: "#24FE41",
      },
    },
  },
  {
    label: "สมาชิกใหม่",
    value: {
      label: "สมาชิกใหม่",
      color: {
        from: "#36D1DC",
        to: "#5B86E5",
      },
    },
  },
  {
    label: "ผู้ดูแลระบบ",
    value: {
      label: "ผู้ดูแลระบบ",
      color: {
        from: "#CAC531",
        to: "#F3F9A7",
      },
    },
  },
  {
    label: "นักเขียนรีวิวมือหนึ่ง",
    value: {
      label: "นักเขียนรีวิวมือหนึ่ง",
      color: {
        from: "#093028",
        to: "#237A57",
      },
    },
  },
];

export function GiveAndRemoveRank({ user, userRanks }) {
  const [opened, setOpened] = useState();

  const [loading, setLoading] = useState(false);

  const [rank, setRank] = useState(null);

  const router = useRouter();

  const handleChangeRank = async () => {
    setLoading(true);

    const batch = firestore.batch();
    const uid = await getUserWithUsername(user.username);

    const setRanks = async (item) => {
      const ref = firestore
        .collection("users")
        .doc(`${uid.id}`)
        .collection("ranks")
        .doc();

      const data = {
        slug: ref.id,
        label: item.label,
        color: item.color,
      };

      await ref.set(data);
    };

    rank &&
      rank.map((item) => {
        setRanks(item);
      });

    setRank(null);

    setLoading(false);

    router.replace(`/${user.username}`);
  };

  const ranks =
    userRanks &&
    userRanks.map((rank) => (
      <Badge
        key={rank.label}
        variant="gradient"
        gradient={{ from: rank.color.from, to: rank.color.to, deg: 35 }}
        className="shadow-md"
        size="lg"
      >
        {rank.label}
      </Badge>
    ));

  return (
    <div>
      <Modal
        opened={opened}
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        title={`เพิ่มแรงค์ของ ${user.username}!`}
        classNames={{
          modal: "bg-foreground",
          overlay: "bg-background",
          title: "text-title",
        }}
      >
        <Stack>
          <LoadingOverlay visible={loading} />
          <InputWrapper
            label={`แรงค์ของ ${user.username}`}
            description="แรงค์ทั้งหมดจะแสดงที่นี่"
          >
            <Group spacing="xs">{ranks}</Group>
          </InputWrapper>
          <InputWrapper>
            <MultiSelect
              required
              data={ranksData}
              onChange={(value) => setRank(value)}
              label="แรงค์ทั้งหมดที่สามารถเพิ่มได้"
              placeholder="เลือกแรงค์ที่นี่"
            />
          </InputWrapper>
          <Group mt="md" position="right">
            <Group spacing="xs" position="right">
              <Button
                size="xs"
                onClick={() => setOpened(false)}
                className="bg-background text-title hover:bg-background hover:opacity-75"
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                size="xs"
                className="bg-green-500 hover:bg-green-500 hover:opacity-75"
                onClick={() => handleChangeRank()}
              >
                ยืนยัน
              </Button>
            </Group>
          </Group>
        </Stack>
      </Modal>

      <Badge
        variant="outline"
        size="lg"
        radius={100}
        className="cursor-pointer active:translate-y-[1px] select-none border-title text-title"
        leftSection={<Plus size={14} />}
        onClick={() => setOpened(true)}
      >
        เพิ่มแรงค์
      </Badge>
    </div>
  );
}
