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
  Modal,
  Title,
  Paper,
} from "@mantine/core";

import {
  auth,
  firestore,
  getUserWithUsername,
  postToJSON,
} from "@lib/firebase";
import AuthCheck from "@components/AuthCheck";
import { showNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";
import {
  DropzoneProfileAvatar,
  DropzoneProfileImage,
} from "@components/Dropzone";
import { useRouter } from "next/router";
import { deleteUser } from "firebase/auth";
import { useModals } from "@mantine/modals";

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

  const [usernameValid, setUsernameValid] = useState(false);
  const [confirmValid, setConfirmValid] = useState(false);
  const [deleteUsername, setDeleteUsername] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [openedConfirm, setOpenedConfirm] = useState(false);

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

  const modals = useModals();

  const form = useForm({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      email: user.email,
      phoneNumber: user?.phoneNumber || "",
      password: user.password,
    },
  });

  const loginAgain = () => {
    const id = modals.openModal({
      title: (
        <Stack>
          <Text size="sm">
            คุณจำเป็นต้อง <b>เข้าสู่ระบบ</b> ใหม่อีกครั้งเพื่อยืนยันตัวตน
            และดำเนินการต่อ
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
              onClick={() => {
                modals.closeModal(id);
                setOpenedConfirm(false);
              }}
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-500 hover:opacity-75"
              size="xs"
              onClick={() => {
                auth.signOut();
                router.push("/");
              }}
            >
              ออกจากระบบ
            </Button>
          </Group>
        </Stack>
      ),
    });
  };

  const deleteAccount = async () => {
    const uid = auth.currentUser.uid;

    auth.currentUser
      .delete()
      .then(() => {
        firestore.collection("usernames").doc(user.username).delete();
        firestore.collection("users").docs(uid).delete();
      })
      .catch(() => {
        loginAgain();
      });
  };

  const checkUsername = (e) => {
    if (e.target.value !== user.username) setUsernameValid(false);
    else setUsernameValid(true);
  };

  const checkConfirm = (e) => {
    if (e.target.value !== "ลบบัญชีส่วนบุคคลของฉัน") setConfirmValid(false);
    else setConfirmValid(true);
  };

  return (
    <form onSubmit={form.onSubmit((values) => HandleChange(values))}>
      <LoadingOverlay visible={loading} />
      <Modal
        size="lg"
        opened={openedConfirm}
        onClose={() => setOpenedConfirm(false)}
        withCloseButton={false}
        closeOnClickOutside={false}
        centered
        classNames={{
          modal: "bg-foreground",
          overlay: "bg-background",
          title: "text-title",
        }}
      >
        {openedConfirm && (
          <Stack spacing="xl">
            <Stack>
              <Title order={2} align="center" mb="sm">
                ลบบัญชีส่วนบุคคล
              </Title>
              <Text align="center">
                MyAnimeCommunity จะลบบัญชี และข้อมูลส่วนบุคคลทั้งหมดของคุณ
                แต่โพสต์ของคุณอาจยังปรากฏอยู่
              </Text>
              <Text align="center">
                MyAnimeCommunity
                แนะนำให้คุณลบโพสต์ทั้งหมดออกด้วยตนเองก่อนลบบัญชี
              </Text>
              <div className="bg-[#ff0000] rounded-md py-2">
                <Text align="center" color="white">
                  การดำเนินการนี้ไม่สามารถย้อนกลับได้ โปรดตรวจสอบให้แน่ใจ
                </Text>
              </div>
            </Stack>
            <Divider />
            <Stack>
              <Text>
                กรอกชื่อ <b>{user.username}</b> เพื่อดำเนินการต่อ:
              </Text>
              <TextInput onChange={checkUsername} />
              <Text>
                เพื่อทำการยืนยัน ให้พิมพ์ <b>ลบบัญชีส่วนบุคคลของฉัน</b>{" "}
                ด้านล่าง:
              </Text>
              <TextInput onChange={checkConfirm} />
            </Stack>
            <Stack size="xs">
              <Group position="right">
                <Button
                  className="bg-background text-title hover:bg-background hover:opacity-75"
                  size="xs"
                  onClick={() => setOpenedConfirm(false)}
                >
                  ยกเลิก
                </Button>
                <Button
                  disabled={usernameValid && confirmValid ? false : true}
                  type="submit"
                  className="bg-[#ff0000] hover:bg-[#ff0000] hover:opacity-75"
                  size="xs"
                  onClick={() => deleteAccount()}
                >
                  ลบบัญชี
                </Button>
              </Group>
            </Stack>
          </Stack>
        )}
      </Modal>
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
          {...form.getInputProps("phoneNumber")}
          placeholder="เบอร์โทรศัพท์ของคุณ"
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
        />
        <Divider label="เปลี่ยนรหัสผ่าน" labelPosition="center" />
        <Text size="xs" color="red">
          ทางเว็บไซต์ MyAnimeCommunity
          ปิดปรับปรุงระบบการเปลี่ยนแปลงรหัสผ่านใหม่ชั่วคราว
        </Text>
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
        <Divider label="ลบบัญชีส่วนบุคคล" labelPosition="center" />

        <div className="border-[1px]  p-4 border-[#ff0000] rounded-md">
          <Stack>
            <Title order={2}>ลบบัญชีส่วนบุคคล</Title>
            <Text>
              ลบบัญชีส่วนบุคคลของคุณ และข้อมูลส่วนบุคคลทั้งหมดออกอย่างถาวร
              จากแพลตฟอร์ม MyAnimeCommunity การกระทำนี้ไม่สามารถย้อนกลับได้
              โปรดดำเนินการต่อด้วยความระมัดระวัง
            </Text>
            <Group>
              <Button
                type="submit"
                className="bg-[#ff0000] hover:bg-[#ff0000] hover:opacity-75"
                size="xs"
                onClick={() => setOpenedConfirm(true)}
              >
                ลบบัญชี
              </Button>
            </Group>
          </Stack>
        </div>
        <Group spacing="xs" position="right" mt="xl">
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
