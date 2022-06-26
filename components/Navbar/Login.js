import { UserContext } from "@lib/context";
import { auth, googleAuthProvider } from "@lib/firebase";
import {
  Button,
  Center,
  Checkbox,
  Group,
  Image,
  Input,
  InputWrapper,
  Modal,
  PasswordInput,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Mail } from "tabler-icons-react";

export default function Login() {
  const [openedLogin, setOpenedLogin] = useState(false);
  const [openedRegister, setOpenedRegister] = useState(false);

  return (
    <div className="flex flex-row justify-end w-full gap-2">
      <Modal
        size="md"
        overlayColor="#333"
        opened={openedLogin}
        onClose={() => setOpenedLogin(false)}
        title={<Logo />}
      >
        {/* Modal content */}

        {openedLogin && <LoginPopUp />}
      </Modal>
      <Button
        className="bg-content text-accent hover:bg-content hover:opacity-75"
        variant="default"
        onClick={() => setOpenedLogin(true)}
      >
        เข้าสู่ระบบ
      </Button>
      <Modal
        size="md"
        overlayColor="#333"
        opened={openedRegister}
        onClose={() => setOpenedRegister(false)}
        title={<Logo />}
      >
        {/* Modal content */}
        {openedRegister && <RegisterPopUp />}
      </Modal>
      <Button
        className="bg-background text-accent hover:bg-foreground hover:opacity-75"
        variant="default"
        onClick={() => setOpenedRegister(true)}
      >
        ลงทะเบียน
      </Button>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/">
      <div className=" font-bold cursor-pointer text-xl">
        <span className="text-[#4C6EF5]">My</span>
        <span className="text-content">A</span>
        <span className="text-title">nimeCommunity</span>
      </div>
    </Link>
  );
}

export function LoginPopUp() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  const googleLogo =
    "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png";

  return (
    <Stack spacing="xl">
      <Title order={4}>เข้าสู่ระบบ!</Title>
      <InputWrapper id="input-demo" required label="อีเมล (Email)">
        <Input
          icon={<Mail size={20} />}
          id="input-demo"
          placeholder="อีเมลของคุณ"
        />
      </InputWrapper>
      <InputWrapper id="input-demo" required label="รหัสผ่าน">
        <PasswordInput placeholder="รหัสผ่านของคุณ" id="your-password" />
      </InputWrapper>
      <Group position="apart">
        <Link href="/register">
          <p className="text-sm hover:underline cursor-pointer">
            ไม่มีบัญชีงั้นเหรอ? ลงทะเบียน
          </p>
        </Link>
        <Link href="/enter">
          <a className="bg-content text-accent px-2 py-1 rounded-sm hover:opacity-75">
            เข้าสู่ระบบ
          </a>
        </Link>
      </Group>
      <Checkbox label="จดจำฉันไว้ในครั้งถัดไป" />
      <Center>
        <div
          onClick={signInWithGoogle}
          className="bg-white shadow-md border-[1px] border-gray-300 py-2 px-4 rounded-sm cursor-pointer hover:opacity-75 group"
        >
          <div className="flex flex-row gap-2 items-center">
            <Image src={googleLogo} width="30px" />

            <p className="text-black">ลงชื่อเข้าใช้ด้วย Google</p>
          </div>
        </div>
      </Center>
    </Stack>
  );
}

export function RegisterPopUp() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  const googleLogo =
    "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png";
  return (
    <Stack spacing="xl">
      <Title order={4}>แนะนำตัวกันหน่อย!</Title>
      <Group grow>
        <InputWrapper id="input-demo" required label="ชื่อจริง">
          <Input id="input-demo" placeholder="ชื่อจริงของคุณ" />
        </InputWrapper>
        <InputWrapper id="input-demo" required label="นามสกุล">
          <Input id="input-demo" placeholder="นามสกุลของคุณ" />
        </InputWrapper>
      </Group>
      <InputWrapper id="input-demo" required label="อีเมล (Email)">
        <Input
          icon={<Mail size={20} />}
          id="input-demo"
          placeholder="อีเมลของคุณ"
        />
      </InputWrapper>
      <InputWrapper id="input-demo" required label="รหัสผ่าน">
        <PasswordInput placeholder="รหัสผ่านของคุณ" id="your-password" />
      </InputWrapper>
      <InputWrapper id="input-demo" required label="ยืนยันรหัสผ่าน">
        <PasswordInput placeholder="ยืนยันรหัสผ่านของคุณ" id="your-password" />
      </InputWrapper>
      <Stack>
        <Checkbox
          size="xs"
          label="ยอมรับ กฎ กติกา และมารยาท ของ MyAnimeCommu"
        />
        <Checkbox
          size="xs"
          label="ยอมรับ นโยบายเกี่ยวกับข้อมูลส่วนบุคคล ของ MyAnimeCommunity"
        />
      </Stack>
      <Group position="apart">
        <Link href="/enter">
          <p className="text-sm hover:underline cursor-pointer">
            มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
          </p>
        </Link>
        <Link href="/enter">
          <a className="bg-content text-accent px-2 py-1 rounded-sm hover:opacity-75">
            ลงทะเบียน
          </a>
        </Link>
      </Group>
      <Center>หรือ</Center>
      <Center>
        <div
          onClick={signInWithGoogle}
          className="bg-white shadow-md border-[1px] border-gray-300 py-2 px-4 rounded-sm cursor-pointer hover:opacity-75 group"
        >
          <div className="flex flex-row gap-2 items-center">
            <Image src={googleLogo} width="30px" />

            <p className="text-black">ลงชื่อเข้าใช้ด้วย Google</p>
          </div>
        </div>
      </Center>
    </Stack>
  );
}
