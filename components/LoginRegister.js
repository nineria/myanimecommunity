import React, { useState } from "react";
import Link from "next/link";
// Context
import { auth, googleAuthProvider } from "@lib/firebase";
// Components
import {
  Button,
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
  TextInput,
} from "@mantine/core";
import WebsiteRulePage from "@components/WebsiteRule";
import PrivacyPolicyPage from "@components/PrivacyPolicy/tmp";
// Icons
import { Mail } from "tabler-icons-react";
import { useRouter } from "next/router";

export default function LoginRegister() {
  const [openedLogin, setOpenedLogin] = useState(false);
  const [openedRegister, setOpenedRegister] = useState(false);

  const router = useRouter();

  return (
    <div className="flex flex-row justify-end w-full gap-2">
      <Modal
        centered
        size="md"
        opened={openedLogin}
        onClose={() => setOpenedLogin(false)}
        classNames={{
          modal: "bg-foreground",
          overlay: "bg-background",
          title: "text-title",
        }}
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
        className="bg-content text-[#fff] hover:bg-content hover:opacity-75"
        variant="default"
        onClick={() => setOpenedLogin(true)}
      >
        เข้าสู่ระบบ
      </Button>
      <Modal
        centered
        size="md"
        overlayColor="#333"
        opened={openedRegister}
        onClose={() => setOpenedRegister(false)}
        classNames={{
          modal: "bg-foreground",
          overlay: "bg-background",
          title: "text-title",
        }}
        title={
          <Text size="lg" weight={500} className="text-title">
            ลงทะเบียน
          </Text>
        }
      >
        {/* Modal content */}
        {openedRegister && <RegisterPopUp />}
      </Modal>
      <Button
        className="bg-background text-title hover:bg-background hover:opacity-75"
        variant="default"
        onClick={() => router.push("/enter")}
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
  const router = useRouter();

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);

    router.push("/enter");
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
          <Image
            src="/google-logo.png"
            alt="google"
            width="15px"
            className="mr-2"
          />
          Google
        </Button>
        <Button
          disabled
          size="sm"
          radius="lg"
          className="bg-white w-[200px] text-black border-[1px] border-gray-300 hover:bg-white hover:opacity-75"
        >
          <Image
            src="/facebook-logo.png"
            alt="facebook"
            width="15px"
            className="mr-2"
          />
          Facebook
        </Button>
      </Group>
      <Divider label="หรือดำเนินการต่อด้วยอีเมล" labelPosition="center" />
      <TextInput
        required
        label="อีเมล (Email)"
        icon={<Mail size={20} />}
        placeholder="อีเมลของคุณ"
        classNames={{
          input: "bg-accent bg-opacity-50",
        }}
      />
      <PasswordInput
        required
        label="รหัสผ่าน"
        placeholder="รหัสผ่านของคุณ"
        classNames={{
          input: "bg-accent bg-opacity-50",
        }}
      />
      <Checkbox label="จดจำฉันไว้ในครั้งถัดไป" className="content-checkbox" />
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
          <Image
            src="/google-logo.png"
            alt="google"
            width="15px"
            className="mr-2"
          />
          Google
        </Button>
        <Button
          disabled
          size="sm"
          radius="lg"
          className="bg-white w-[200px] text-black border-[1px] border-gray-300 hover:bg-white hover:opacity-75"
        >
          <Image
            src="/facebook-logo.png"
            alt="facebook"
            width="15px"
            className="mr-2"
          />
          Facebook
        </Button>
      </Group>
      <Divider label="หรือดำเนินการต่อด้วยอีเมล" labelPosition="center" />
      <Group grow>
        <InputWrapper id="input-demo" required label="ชื่อจริง">
          <Input
            id="input-demo"
            placeholder="ชื่อจริงของคุณ"
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
          />
        </InputWrapper>
        <InputWrapper id="input-demo" required label="นามสกุล">
          <Input
            id="input-demo"
            placeholder="นามสกุลของคุณ"
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
          />
        </InputWrapper>
      </Group>
      <InputWrapper id="input-demo" required label="อีเมล (Email)">
        <Input
          icon={<Mail size={20} />}
          id="input-demo"
          placeholder="อีเมลของคุณ"
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
        />
      </InputWrapper>
      <InputWrapper id="input-demo" required label="รหัสผ่าน">
        <PasswordInput
          placeholder="รหัสผ่านของคุณ"
          id="your-password"
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
        />
      </InputWrapper>
      <InputWrapper id="input-demo" required label="ยืนยันรหัสผ่าน">
        <PasswordInput
          placeholder="ยืนยันรหัสผ่านของคุณ"
          id="your-password"
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
        />
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
