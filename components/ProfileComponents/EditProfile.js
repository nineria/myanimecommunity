import React, { useEffect, useRef, useState } from "react";
// Hooks
import { useForm } from "@mantine/hooks";
// Components
import {
  Avatar,
  Button,
  Center,
  Collapse,
  Divider,
  Grid,
  Input,
  InputWrapper,
  Stack,
  Text,
  Image,
  PasswordInput,
  Group,
  Card,
  LoadingOverlay,
} from "@mantine/core";

import {
  auth,
  firestore,
  getUserWithUsername,
  serverTimestamp,
} from "@lib/firebase";
import AuthCheck from "@components/AuthCheck";
import { showNotification } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import {
  DropzoneProfileAvatar,
  DropzoneProfileImage,
} from "@components/ProfileComponents/Dropzone";
import { useRouter } from "next/router";

export default function EditProfile({ user, setOpened }) {
  const [userRef, setUserRef] = useState();

  useEffect(() => {
    const userRef = async () => {
      const userDoc = await getUserWithUsername(user.username);
      const Ref = await userDoc.ref;

      setUserRef(Ref);
    };

    userRef();
  }, [user]);

  return (
    <AuthCheck>
      {user && (
        <ProfileForm user={user} userRef={userRef} setOpened={setOpened} />
      )}
    </AuthCheck>
  );
}

function ProfileForm({ user, userRef, setOpened }) {
  const router = useRouter();

  const [image, setImage] = useState();
  const [avatar, setAvatar] = useState();

  const [loading, setLoading] = useState(false);

  const HandleChange = async (values) => {
    setLoading(true);
    await userRef.update({
      firstName: values.firstName,
      lastName: values.lastName,
      avatar: avatar || user.avatar,
      image: image || user.image,
      email: values.email,
      password: values.password,
    });

    showNotification({
      color: "teal",
      title: "บันทึกการเปลี่ยนแปลงเรียบร้อย",
      icon: <Check size={18} />,
      classNames: {
        root: "bg-foreground border-teal-400",
      },
    });

    setLoading(false);

    setOpened(false);

    router.replace(router.asPath);
  };

  const form = useForm({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      email: user.email,
      password: user.password,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => HandleChange(values))}>
      <LoadingOverlay visible={loading} />
      <Stack spacing="sm">
        <Card p="md" radius="sm" className="bg-foreground">
          <Card.Section
            sx={{
              backgroundImage: `url(${image || user.image})`,
              height: 260,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <DropzoneProfileImage setImage={setImage} />
          </Card.Section>
          <div className="relative w-fit">
            <Avatar
              src={avatar || user.avatar}
              size={120}
              radius={120}
              mx="auto"
              mt={-60}
              className="border-2 border-foreground"
            />
            <DropzoneProfileAvatar setImage={setAvatar} />
          </div>
        </Card>
        <Group grow>
          <InputWrapper id="input-demo" label="ชื่อจริง">
            <Input
              {...form.getInputProps("firstName")}
              placeholder="ชื่อจริงของคุณ"
              classNames={{
                input: "bg-accent bg-opacity-50",
              }}
            />
          </InputWrapper>
          <InputWrapper id="input-demo" label="นามสกุล">
            <Input
              {...form.getInputProps("lastName")}
              placeholder="นามสกุลของคุณ"
              classNames={{
                input: "bg-accent bg-opacity-50",
              }}
            />
          </InputWrapper>
        </Group>
        <InputWrapper id="input-demo" label="อีเมล (email)">
          <Input
            {...form.getInputProps("email")}
            placeholder="อีเมลของคุณ"
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
          />
        </InputWrapper>
        <Text mt="sm">เปลี่ยนรหัสผ่าน</Text>
        <InputWrapper id="input-demo" label="รหัสผ่านเดิม">
          <PasswordInput
            {...form.getInputProps("password")}
            placeholder="รหัสผ่านเดิมของคุณ"
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
          />
        </InputWrapper>
        <InputWrapper id="input-demo" label="รหัสผ่านใหม่">
          <PasswordInput
            {...form.getInputProps("password")}
            placeholder="รหัสผ่านใหม่เดิมของคุณ"
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
          />
        </InputWrapper>
        <Group spacing="xs" position="right">
          <Button
            size="xs"
            onClick={() => setOpened(false)}
            className="bg-gray-500 hover:bg-gray-500 hover:opacity-75"
          >
            ยกเลิก
          </Button>
          <Button
            type="submit"
            size="xs"
            className="bg-green-500 hover:bg-green-500 hover:opacity-75"
          >
            ยืนยัน
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
