import React, { useCallback, useContext, useState } from "react";
import Link from "next/link";
// Context
import {
  auth,
  facebookAuthProvider,
  firestore,
  googleAuthProvider,
} from "@lib/firebase";
// Components
import {
  Button,
  Card,
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
  Title,
} from "@mantine/core";
import WebsiteRulePage from "@components/WebsiteRule";
import PrivacyPolicyPage from "@components/PrivacyPolicy/tmp";
// Icons
import { AlertTriangle, Mail } from "tabler-icons-react";
import { useRouter } from "next/router";
import { UserContext } from "@lib/context";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import AgreeWebsiteRule from "./WebsiteRule/AgreeWebsiteRule";
import PrivacyPolicy from "./PrivacyPolicy";
import { FacebookAuthProvider } from "firebase/auth";

const REGEX = {
  length: /.{8,}/,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  numeric: /.*\d/,
  special: /.*[!@#$%^&*]+/,
};

const schema = z
  .object({
    firstName: z.string().min(1, { message: "กรุณากรอกชื่อจริง" }),
    lastName: z.string().min(1, { message: "กรุณากรอกนามสกุล" }),
    username: z.string().min(1, { message: "กรุณากรอกชื่อผู้ใช้" }),
    email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
    password: z
      .string()
      .regex(REGEX.length, {
        message: "ความยาวของรหัสผ่านต้องมากกว่าหรือเท่ากับ 8 ตัวอักษร",
      })
      .regex(REGEX.uppercase, {
        message: "รหัสผ่านต้องมีตัวพิมพ์ใหญ่อย่างน้อยหนึ่งตัว",
      })
      .regex(REGEX.lowercase, {
        message: "รหัสผ่านต้องมีตัวพิมพ์เล็กอย่างน้อยหนึ่งตัว",
      })
      .regex(REGEX.numeric, {
        message: "รหัสผ่านต้องมีตัวเลขอย่างน้อยหนึ่งตัว",
      })
      .regex(REGEX.special, {
        message: "รหัสผ่านต้องมีอักขระพิเศษอย่างน้อยหนึ่งตัว",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

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

        {openedLogin && <LoginPopUp setOpenedRegister={setOpenedRegister} />}
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
        overlayColor="#333"
        size="lg"
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

export function LoginPopUp({ setOpenedRegister }) {
  // const router = useRouter();

  const { username } = useContext(UserContext);

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);

    if (!username) setOpenedRegister(true);
  };

  const signInWithFacebook = async () => {
    try {
      await auth.signInWithPopup(facebookAuthProvider);

      if (!username) setOpenedRegister(true);
    } catch (error) {
      console.log(error, ": Email นี้ถูกใช้ไปแล้ว");
    }
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
          size="sm"
          radius="lg"
          className="bg-white w-[200px] text-black border-[1px] border-gray-300 hover:bg-white hover:opacity-75"
          onClick={signInWithFacebook}
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
        disabled
        required
        label="อีเมล (Email)"
        icon={<Mail size={20} />}
        placeholder="อีเมลของคุณ"
        classNames={{
          input: "bg-accent bg-opacity-50",
        }}
      />
      <PasswordInput
        disabled
        required
        label="รหัสผ่าน"
        placeholder="รหัสผ่านของคุณ"
        classNames={{
          input: "bg-accent bg-opacity-50",
        }}
      />
      <Checkbox
        disabled
        label="จดจำฉันไว้ในครั้งถัดไป"
        className="content-checkbox"
      />
      <Link href="/">
        <Button
          disabled
          size="sm"
          fullWidth
          className="bg-content hover:bg-content hover:opacity-75"
        >
          เข้าสู่ระบบ
        </Button>
      </Link>
      <div className="flex flex-row gap-2 text-content">
        <AlertTriangle size={14} className="mt-1" />
        <Text size="xs">
          ขออภัยในความไม่สะดวก - ขณะทางเว็บไซต์ MyAnimeCommunity
          กำลังปรับปรุงระบบการเข้าสู่ระบบ
        </Text>
      </div>
      <Text size="xs">
        ผู้ใช้ที่ต้องการลงทะเบียนโปรดลงชื่อเข้าใช้ด้วย Google
      </Text>
    </Stack>
  );
}

export function RegisterPopUp() {
  const [formUsername, setFormUsername] = useState("");

  const { user, username } = useContext(UserContext);

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  const signInWithFacebook = async () => {
    try {
      await auth.signInWithPopup(facebookAuthProvider);

      if (!username) setOpenedRegister(true);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);

  return (
    !username && (
      <section>
        <Stack>
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
                onClick={signInWithFacebook}
              />
              Facebook
            </Button>
          </Group>
          <Divider label="ขั้นตอนการลงทะเบียน" labelPosition="center" />

          {user && <Register />}
        </Stack>
      </section>
    )
  );
}

function Register() {
  const { user, username } = useContext(UserContext);

  const onSubmit = async (values) => {
    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${values.username}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, values);
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormUsername(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormUsername(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  // useEffect(() => {
  //   checkUsername(formUsername);
  // }, [formUsername, checkUsername]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    () =>
      debounce(async (username) => {
        if (username.length >= 3) {
          const ref = firestore.doc(`usernames/${username}`);
          const { exists } = await ref.get();
          setIsValid(!exists);
          setLoading(false);
        }
      }, 500),
    []
  );

  const displayName = user?.displayName.split(" ") || "";

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      firstName: displayName[0] || "",
      lastName: displayName[1] || "",
      username: "",
      avatar: user?.photoURL || "",
      image: "",
      email: user?.email || user?.providerData[0].email || "",
      password: "",
      confirmPassword: "",
      websiteRule: false,
      privacyPolicy: false,
      ranks: [
        {
          color: "blue",
          label: "สมาชิกใหม่",
        },
      ],
      stats: [
        {
          label: "ถูกใจ",
          color: "#47d6ab",
          diff: 0,
          part: 0,
          value: 0,
        },
        {
          label: "โพสต์",
          color: "#7952B3",
          diff: 0,
          part: 0,
          value: 0,
        },
        {
          label: "คอมเมนต์",
          color: "#4fcdf7",
          diff: 0,
          part: 0,
          value: 0,
        },
      ],
      rule: "สมาชิก",
    },
    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      {/* <form onSubmit={form.onSubmit((values) => console.log(values))}> */}
      <Stack spacing="md">
        {/* <Title order={2} align="center" mb="xl">
              สร้างบัญชี
            </Title> */}

        <Group grow>
          <TextInput
            label="ชื่อจริง"
            {...form.getInputProps("firstName")}
            placeholder="ชื่อจริงของคุณ"
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
          />
          <TextInput
            label="นามสกุล"
            {...form.getInputProps("lastName")}
            placeholder="นามสกุลของคุณ"
            classNames={{
              input: "bg-accent bg-opacity-50",
            }}
          />
        </Group>
        <TextInput
          label="ชื่อผู้ใช้"
          {...form.getInputProps("username")}
          placeholder="ชื่อผู้ใช้ของคุณ"
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
          // value={formUsername}
          // onChange={onChange}
        />
        {/* 
          <UsernameMessage
            username={formUsername}
            isValid={isValid}
            loading={loading}
          /> */}

        <TextInput
          label="อีเมล (Email)"
          icon={<Mail size={20} />}
          {...form.getInputProps("email")}
          placeholder="อีเมลของคุณ"
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
        />
        <PasswordInput
          label="รหัสผ่าน"
          placeholder="รหัสผ่านของคุณ"
          {...form.getInputProps("password")}
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
        />
        <PasswordInput
          label="ยืนยันรหัสผ่าน"
          placeholder="ยืนยันรหัสผ่านของคุณ"
          {...form.getInputProps("confirmPassword")}
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
        />
        <Stack my="md">
          <Checkbox
            required
            size="xs"
            {...form.getInputProps("websiteRule")}
            label={<AgreeWebsiteRule />}
          />
          <Checkbox
            required
            size="xs"
            {...form.getInputProps("privacyPolicy")}
            label={<PrivacyPolicy />}
          />
        </Stack>
        <Button
          size="sm"
          type="submit"
          fullWidth
          className="bg-content hover:bg-content hover:opacity-75"
        >
          ลงทะเบียน
        </Button>
      </Stack>
      {/* <h3>Debug State</h3>
            <div>
              Username: {formUsername}
              <br />
              Loading: {loading.toString()}
              <br />
              Username Valid: {isValid.toString()}
            </div> */}
    </form>
  );
}
