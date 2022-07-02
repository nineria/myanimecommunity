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
  const avatarRef = useRef();
  const imageRef = useRef();

  const [openedImage, setOpenImage] = useState(false);
  const [openedAvatar, setOpenAvatar] = useState(false);

  const HandleChange = async (values) => {
    await userRef.update({
      firstName: values.firstName,
      lastName: values.lastName,
      avatar: values.avatar,
      image: values.image,
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
    setOpened(false);
  };

  const handleCancel = () => {
    showNotification({
      color: "yellow",
      title: "ยกเลิกการแก้ไขแล้ว",
      icon: <X size={18} />,
      classNames: {
        root: "bg-foreground border-yellow-400",
      },
    });
    setOpened(false);
  };

  const form = useForm({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      image: user.image,
      email: user.email,
      password: user.password,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => HandleChange(values))}>
      <Stack>
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
        <InputWrapper id="input-demo" label="รูปภาพประจำตัว">
          <Grid>
            <Grid.Col sm={10}>
              <Input
                {...form.getInputProps("avatar")}
                ref={avatarRef}
                placeholder="รูปภาพประจำตัวของคุณ"
                classNames={{
                  input: "bg-accent bg-opacity-50",
                }}
              />
            </Grid.Col>
            <Grid.Col sm={2}>
              <Button
                fullWidth
                className="bg-background hover:bg-background hover:opacity-75 "
                onClick={() => {
                  setOpenAvatar((e) => !e);
                }}
              >
                {openedAvatar === false ? "แสดง" : "ซ่อน"}
              </Button>
            </Grid.Col>
          </Grid>
          <Collapse in={openedAvatar} mt="xs">
            {avatarRef.current?.value ? (
              <Stack spacing="xs">
                <Center m="sm">
                  <Avatar size="xl" src={avatarRef.current?.value} />
                </Center>
                <InputWrapper description="หากรูปภาพไม่แสดงให้ลองเปลี่ยน Link" />
              </Stack>
            ) : (
              <Text color="red" size="xs">
                เกิดข้อผิดพลาด ในการโหลดรูปภาพกรุณาลองใหม่อีกครั้ง
              </Text>
            )}
          </Collapse>
        </InputWrapper>
        <InputWrapper id="input-demo" label="รูปภาพพื้นหลัง">
          <Grid>
            <Grid.Col sm={10}>
              <Input
                {...form.getInputProps("image")}
                ref={imageRef}
                placeholder="รูปภาพพื้นหลังของคุณ"
                classNames={{
                  input: "bg-accent bg-opacity-50",
                }}
              />
            </Grid.Col>
            <Grid.Col sm={2}>
              <Button
                fullWidth
                className="bg-background hover:bg-background hover:opacity-75 "
                onClick={() => {
                  setOpenImage((e) => !e);
                }}
              >
                {openedImage === false ? "แสดง" : "ซ่อน"}
              </Button>
            </Grid.Col>
          </Grid>
          <Collapse in={openedImage} mt="xs">
            {imageRef.current?.value ? (
              <Stack spacing="xs">
                <Image
                  src={imageRef.current?.value}
                  alt={imageRef.current?.value}
                />
                <InputWrapper description="หากรูปภาพไม่แสดงให้ลองเปลี่ยน Link" />
              </Stack>
            ) : (
              <Text color="red" size="xs">
                เกิดข้อผิดพลาด ในการโหลดรูปภาพกรุณาลองใหม่อีกครั้ง
              </Text>
            )}
          </Collapse>
        </InputWrapper>
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
            onClick={() => handleCancel()}
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
