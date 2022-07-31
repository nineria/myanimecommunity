import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/hooks";
import { Divider, Stack, LoadingOverlay, Modal } from "@mantine/core";
import { getUserWithUsername } from "lib/firebase";
import AuthCheck from "hooks/AuthCheck";
import { showNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";
import { useRouter } from "next/router";
import AvatarAndBanner from "./AvatarAndBanner";
import VerifyUser from "./VerifyUser";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import ButtonControl from "./ButtonControl";
import DeleteAccountForm from "./DeleteAccount/DeleteAccountForm";

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

  const [editOpened, setEditOpened] = useState(false);
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
          <DeleteAccountForm user={user} setOpenedConfirm={setOpenedConfirm} />
        )}
      </Modal>
      <Stack spacing="sm">
        <AvatarAndBanner
          avatar={avatar}
          setAvatar={setAvatar}
          image={image}
          setImage={setImage}
          user={user}
        />
        <Divider label="ยืนยันตัวตน" labelPosition="center" />
        <VerifyUser
          firstName={form.getInputProps("firstName")}
          lastName={form.getInputProps("lastName")}
          email={form.getInputProps("email")}
          phoneNumber={form.getInputProps("phoneNumber")}
        />
        <Divider label="เปลี่ยนรหัสผ่าน" labelPosition="center" />
        <ChangePassword password={form.getInputProps("password")} />
        <Divider label="ลบบัญชีส่วนบุคคล" labelPosition="center" />
        <DeleteAccount setOpenedConfirm={setOpenedConfirm} />
        <ButtonControl setOpened={setOpened} />
      </Stack>
    </form>
  );
}
