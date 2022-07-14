import { firestore } from "@lib/firebase";
import { UserContext } from "@lib/context";
import Navbar from "@components/Navbar";

import { useEffect, useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";
import { useThemeContext } from "@lib/useTheme";
import HomeComponents from "@components/HomeComponents";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Mail } from "tabler-icons-react";
import { Footer } from "@components/Footer";
import Logo from "@components/Logo";
import { z } from "zod";
import AgreeWebsiteRule from "@components/WebsiteRule/AgreeWebsiteRule";
import PrivacyPolicy from "@components/PrivacyPolicy";
import { useRouter } from "next/router";

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

export default function Enter() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const { setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");

    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }

    if (username) {
      router.push("/");
    }

    setTheme(localData);
  }, [setTheme, username]);

  return (
    <main>
      {/* <Metatags title="Enter" description="Sign up for this amazing app!" /> */}
      {user ? (
        !username ? (
          <div className="min-h-[1024px] flex flex-col justify-center">
            <UsernameForm />
          </div>
        ) : (
          <div className="bg-background min-h-[1024px] mb-[235px] pb-10">
            <Navbar />
            <HomeComponents />
            <Footer />
          </div>
        )
      ) : (
        <Box>
          <div className="absolute z-10 left-2 top-2">
            <Logo />
          </div>
          <div className="bg-background fixed top-0 right-0 bottom-0 left-0">
            <UsernameForm />
          </div>
        </Box>
      )}
    </main>
  );
}

// Username form
function UsernameForm() {
  const [formUsername, setFormUsername] = useState("");

  const router = useRouter();

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

    router.push("/");
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
      email: user?.email || "",
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
    !username && (
      <section className="flex h-full justify-center items-center">
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          {/* <form onSubmit={form.onSubmit((values) => console.log(values))}> */}
          <Card className="min-w-[600px]">
            <Stack spacing="md">
              <Title order={2} align="center" mb="xl">
                สร้างบัญชี
              </Title>

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
          </Card>
          {/* <h3>Debug State</h3>
            <div>
              Username: {formUsername}
              <br />
              Loading: {loading.toString()}
              <br />
              Username Valid: {isValid.toString()}
            </div> */}
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) return <p>กำลังตรวจสอบชื่อผู้ใช้...</p>;
  else if (isValid)
    return (
      <p className="text-success">ชื่อผู้ใช้ {username} สามารถใช้งานได้!</p>
    );
  else if (username && !isValid)
    return <p className="text-danger">ชื่อผู้ใช้นั้นถูกใช้แล้ว!</p>;
  else return <p></p>;
}
