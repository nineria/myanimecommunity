import HomeComponent from "@components/HomeComponent";
import Navbar from "@components/Navbar";
import { UserContext } from "@lib/context";
import { auth, googleAuthProvider } from "@lib/firebase";
import {
  Center,
  Checkbox,
  Group,
  Image,
  Input,
  InputWrapper,
  PasswordInput,
  Stack,
} from "@mantine/core";
import Link from "next/link";
import React, { useContext } from "react";
import { Mail } from "tabler-icons-react";

export default function RegisterPage() {
  const { user } = useContext(UserContext);

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  const googleLogo =
    "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png";

  return (
    <div className="bg-background">
      {!user ? (
        <div className="bg-foreground">
          <div className="relative flex justify-center items-center h-screen">
            <div className="absolute w-full h-full opacity-5 bg-cover bg-[url('https://images8.alphacoders.com/854/854961.png')]" />
            <Link href="/">
              <div className="absolute top-4 left-4 md:text-4xl text-3xl font-bold cursor-pointer">
                <span className="text-[#4C6EF5]">My</span>
                <span className="text-content">A</span>
                <span className="text-white">nimeCommunity</span>
              </div>
            </Link>
            <div className="bg-[#1a1b1e] p-4 rounded-sm flex flex-col gap-4 z-10 shadow-md">
              <h1 className="text-lg">แนะนำตัวกันหน่อย!</h1>
              <Group>
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
                <PasswordInput
                  placeholder="รหัสผ่านของคุณ"
                  id="your-password"
                />
              </InputWrapper>
              <InputWrapper id="input-demo" required label="ยืนยันรหัสผ่าน">
                <PasswordInput
                  placeholder="ยืนยันรหัสผ่านของคุณ"
                  id="your-password"
                />
              </InputWrapper>
              <Stack>
                <Checkbox label="ยอมรับ กฎ กติกา และมารยาท ของ MyAnimeCommu" />
                <Checkbox label="ยอมรับ นโยบายเกี่ยวกับข้อมูลส่วนบุคคล ของ MyAnimeCommu" />
              </Stack>
              <Group position="apart">
                <Link href="/enter">
                  <p className="text-sm hover:underline cursor-pointer">
                    มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
                  </p>
                </Link>
                <Link href="/enter">
                  <a className="bg-content px-2 py-1 rounded-sm hover:opacity-75">
                    ลงทะเบียน
                  </a>
                </Link>
              </Group>
              <Center>หรือ</Center>
              <Center>
                <div
                  onClick={signInWithGoogle}
                  className="bg-white py-2 px-4 rounded-sm cursor-pointer hover:opacity-75 group"
                >
                  <div className="flex flex-row gap-2 items-center">
                    <Image src={googleLogo} width="30px" />

                    <p className="text-black">ลงชื่อเข้าใช้ด้วย Google</p>
                  </div>
                </div>
              </Center>
            </div>
            {/* Sign btn */}
          </div>
        </div>
      ) : (
        <div>
          <Navbar />
          <HomeComponent />
        </div>
      )}
    </div>
  );
}
