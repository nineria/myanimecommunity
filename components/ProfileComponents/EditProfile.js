import React, { useEffect, useState } from "react";
// Hooks
import { useForm } from "@mantine/hooks";
// Components
import {
  Avatar,
  Button,
  Divider,
  InputWrapper,
  Stack,
  Text,
  PasswordInput,
  Group,
  Card,
  LoadingOverlay,
  TextInput,
} from "@mantine/core";

import { getUserWithUsername } from "@lib/firebase";
import AuthCheck from "@components/AuthCheck";
import { showNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";
import {
  DropzoneProfileAvatar,
  DropzoneProfileImage,
} from "@components/Dropzone";
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
      email: "",
      phoneNumber: "",
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
        <Divider label="ยืนยันตัวตน" labelPosition="center" />
        <Group grow>
          <TextInput
            label="ชื่อจริง"
            required
            {...form.getInputProps("firstName")}
            placeholder="ชื่อจริงของคุณ"
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
          />
          <TextInput
            label="นามสกุล"
            required
            {...form.getInputProps("lastName")}
            placeholder="นามสกุลของคุณ"
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
          />
        </Group>
        <TextInput
          required
          label="ยืนยันอีเมล (Email)"
          {...form.getInputProps("email")}
          placeholder="อีเมลของคุณ"
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
        />

        <TextInput
          label="เบอร์โทรศัพท์"
          required
          {...form.getInputProps("phoneNumber")}
          placeholder="เบอร์โทรศัพท์ของคุณ"
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
        />
        <Divider label="เปลี่ยนรหัสผ่าน" labelPosition="center" />

        <InputWrapper label="รหัสผ่านเดิม">
          <PasswordInput
            disabled
            {...form.getInputProps("password")}
            placeholder="รหัสผ่านเดิมของคุณ"
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
          />
        </InputWrapper>
        <InputWrapper label="รหัสผ่านใหม่">
          <PasswordInput
            disabled
            {...form.getInputProps("password")}
            placeholder="รหัสผ่านใหม่เดิมของคุณ"
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
          />
        </InputWrapper>
        <Text size="xs" color="red">
          ทางเว็บไซต์ MyAnimeCommunity
          ปิดปรับปรุงระบบการเปลี่ยนแปลงรหัสผ่านใหม่ชั่วคราว
        </Text>
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
