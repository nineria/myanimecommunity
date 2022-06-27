import { auth, googleAuthProvider } from "@lib/firebase";
import {
  Button,
  Center,
  Checkbox,
  Divider,
  Group,
  Image,
  Input,
  InputWrapper,
  Modal,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import Link from "next/link";
import WebsiteRulePage from "@components/WebsiteRule";
import PrivacyPolicyPage from "@components/PrivacyPolicy";
import React, { useState } from "react";
import { Mail } from "tabler-icons-react";

export default function LoginRegister() {
  const [openedLogin, setOpenedLogin] = useState(false);
  const [openedRegister, setOpenedRegister] = useState(false);

  return (
    <div className="flex flex-row justify-end w-full gap-2">
      <Modal
        size="md"
        overlayColor="#333"
        opened={openedLogin}
        onClose={() => setOpenedLogin(false)}
        title={
          <Text size="lg" weight={500}>
            เข้าสู่ระบบ
          </Text>
        }
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
        title={
          <Text size="lg" weight={500}>
            ลงทะเบียน
          </Text>
        }
      >
        {/* Modal content */}
        {openedRegister && <RegisterPopUp />}
      </Modal>
      <Button
        className="bg-background text-accent hover:bg-background hover:opacity-75"
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

  return (
    <Stack spacing="xl">
      <Group grow>
        <Button
          size="sm"
          radius="lg"
          className="bg-white w-[200px] text-black border-[1px] border-gray-300 hover:bg-white hover:opacity-75"
          onClick={signInWithGoogle}
        >
          <Image src="/google-logo.png" width="15px" className="mr-2" />
          Google
        </Button>
        <Button
          disabled
          size="sm"
          radius="lg"
          className="bg-white w-[200px] text-black border-[1px] border-gray-300 hover:bg-white hover:opacity-75"
        >
          <Image src="/facebook-logo.png" width="15px" className="mr-2" />
          Facebook
        </Button>
      </Group>
      <Divider label="หรือดำเนินการต่อด้วยอีเมล" labelPosition="center" />
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
      <Checkbox label="จดจำฉันไว้ในครั้งถัดไป" />
      <Link href="/">
        <Button
          size="sm"
          fullWidth
          className="bg-content hover:bg-content hover:opacity-75"
        >
          เข้าสู่ระบบ
        </Button>
      </Link>
    </Stack>
  );
}

export function RegisterPopUp() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  const [openedWebsiteRule, setOpenedWebsiteRule] = useState(false);
  const [openedPrivacyPolicy, setOpenedPrivacyPolicy] = useState(false);

  return (
    <Stack spacing="xl">
      <Group grow>
        <Button
          size="sm"
          radius="lg"
          className="bg-white w-[200px] text-black border-[1px] border-gray-300 hover:bg-white hover:opacity-75"
          onClick={signInWithGoogle}
        >
          <Image src="/google-logo.png" width="15px" className="mr-2" />
          Google
        </Button>
        <Button
          disabled
          size="sm"
          radius="lg"
          className="bg-white w-[200px] text-black border-[1px] border-gray-300 hover:bg-white hover:opacity-75"
        >
          <Image src="/facebook-logo.png" width="15px" className="mr-2" />
          Facebook
        </Button>
      </Group>
      <Divider label="หรือดำเนินการต่อด้วยอีเมล" labelPosition="center" />
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
        <Modal
          size="xl"
          overlayColor="#333"
          opened={openedWebsiteRule}
          onClose={() => setOpenedWebsiteRule(false)}
          title={<Logo />}
        >
          {/* Modal content */}

          {openedWebsiteRule && <WebsiteRulePage />}
        </Modal>
        <Checkbox
          size="xs"
          label={
            <div>
              ยอมรับ{" "}
              <span
                onClick={() => setOpenedWebsiteRule(true)}
                className="text-content cursor-pointer hover:underline"
              >
                กฎ กติกา และมารยาท
              </span>{" "}
              ของ MyAnimeCommunity
            </div>
          }
        />

        <Modal
          size="xl"
          overlayColor="#333"
          opened={openedPrivacyPolicy}
          onClose={() => setOpenedPrivacyPolicy(false)}
          title={<Logo />}
        >
          {/* Modal content */}

          {openedPrivacyPolicy && <PrivacyPolicyPage />}
        </Modal>
        <Checkbox
          size="xs"
          label={
            <div>
              ยอมรับ{" "}
              <span
                onClick={() => setOpenedPrivacyPolicy(true)}
                className="text-content cursor-pointer hover:underline"
              >
                นโยบายเกี่ยวกับข้อมูลส่วนบุคคล
              </span>{" "}
              ของ MyAnimeCommunity
            </div>
          }
        />
      </Stack>
      <Link href="/">
        <Button
          size="sm"
          fullWidth
          className="bg-content hover:bg-content hover:opacity-75"
        >
          ลงทะเบียน
        </Button>
      </Link>
    </Stack>
  );
}
