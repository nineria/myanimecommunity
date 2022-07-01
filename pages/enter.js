import { auth, firestore, googleAuthProvider } from "@lib/firebase";
import { UserContext } from "@lib/context";
import Navbar from "@components/Navbar";

import { useEffect, useState, useCallback, useContext, useRef } from "react";
import debounce from "lodash.debounce";
import { useThemeContext } from "@lib/useTheme";
import PrivacyPolicyPage from "@components/PrivacyPolicy";
import WebsiteRulePage from "@components/WebsiteRule";
import HomeComponents from "@components/HomeComponents";
import {
  Avatar,
  Button,
  Card,
  Center,
  Checkbox,
  Collapse,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Input,
  InputWrapper,
  Modal,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { Mail } from "tabler-icons-react";
import Link from "next/link";
import { Footer } from "@components/Footer";

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  const [layout, setLayout] = useState("grid");

  const { setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    setTheme(localData);
  }, [setTheme]);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />

  return (
    <main className="bg-background min-h-[1024px] mb-[235px] pb-10">
      {/* <Metatags title="Enter" description="Sign up for this amazing app!" /> */}
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <div>
            <Navbar />
            <HomeComponents />
            <Footer />
          </div>
        )
      ) : (
        <div>
          <Navbar />
          <HomeComponents />
          <Footer />
        </div>
      )}
    </main>
  );
}

// Username form
function UsernameForm() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  const [formUsername, setFormUsername] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openedImage, setOpenImage] = useState(false);
  const [openedAvatar, setOpenAvatar] = useState(false);

  const avatarRef = useRef();
  const imageRef = useRef();

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

  //

  useEffect(() => {
    checkUsername(formUsername);
  }, [formUsername, checkUsername]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    () =>
      debounce(async (username) => {
        if (username.length >= 3) {
          const ref = firestore.doc(`usernames/${username}`);
          const { exists } = await ref.get();
          console.log("Firestore read executed!");
          setIsValid(!exists);
          setLoading(false);
        }
      }, 500),
    []
  );

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      avatar: "",
      image: "",
      email: user?.email || "",
      password: "",
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
    },
  });

  const [openedWebsiteRule, setOpenedWebsiteRule] = useState(false);
  const [openedPrivacyPolicy, setOpenedPrivacyPolicy] = useState(false);

  return (
    !username && (
      <section className="bg-background">
        <Container size="sm">
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Card>
              <Stack spacing="sm">
                <Logo />
                <Title order={3}>สร้างบัญชี</Title>
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

                <Divider
                  label="หรือดำเนินการต่อด้วยอีเมล"
                  labelPosition="center"
                />
                <Group grow>
                  <InputWrapper id="input-demo" required label="ชื่อจริง">
                    <Input
                      {...form.getInputProps("firstName")}
                      placeholder="ชื่อจริงของคุณ"
                      classNames={{
                        input: "bg-accent bg-opacity-50",
                      }}
                    />
                  </InputWrapper>
                  <InputWrapper id="input-demo" required label="นามสกุล">
                    <Input
                      {...form.getInputProps("lastName")}
                      placeholder="นามสกุลของคุณ"
                      classNames={{
                        input: "bg-accent bg-opacity-50",
                      }}
                    />
                  </InputWrapper>
                </Group>
                <InputWrapper id="input-demo" required label="ชื่อผู้ใช้">
                  <Input
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
                </InputWrapper>
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
                        แสดง
                      </Button>
                    </Grid.Col>
                  </Grid>
                  <Collapse in={openedAvatar}>
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
                        placeholder="รูปภาพพื้นหลังของคุณ"
                        ref={imageRef}
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
                        แสดง
                      </Button>
                    </Grid.Col>
                  </Grid>
                  <Collapse in={openedImage}>
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
                <InputWrapper id="input-demo" required label="อีเมล (Email)">
                  <Input
                    icon={<Mail size={20} />}
                    {...form.getInputProps("email")}
                    placeholder="อีเมลของคุณ"
                    classNames={{
                      input: "bg-accent bg-opacity-50",
                    }}
                  />
                </InputWrapper>
                <InputWrapper id="input-demo" required label="รหัสผ่าน">
                  <PasswordInput
                    placeholder="รหัสผ่านของคุณ"
                    {...form.getInputProps("password")}
                    classNames={{
                      input: "bg-accent bg-opacity-50",
                    }}
                  />
                </InputWrapper>
                <InputWrapper id="input-demo" required label="ยืนยันรหัสผ่าน">
                  <PasswordInput
                    placeholder="ยืนยันรหัสผ่านของคุณ"
                    {...form.getInputProps("password")}
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
                    classNames={{
                      modal: "bg-foreground",
                      overlay: "bg-background",
                      title: "text-title",
                    }}
                  >
                    {openedWebsiteRule && <WebsiteRulePage />}
                  </Modal>

                  <Checkbox
                    size="xs"
                    {...form.getInputProps("websiteRule")}
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
                    opened={openedPrivacyPolicy}
                    onClose={() => setOpenedPrivacyPolicy(false)}
                    title={<Logo />}
                    classNames={{
                      modal: "bg-foreground",
                      overlay: "bg-background",
                      title: "text-title",
                    }}
                  >
                    {openedPrivacyPolicy && <PrivacyPolicyPage />}
                  </Modal>
                  <Checkbox
                    size="xs"
                    {...form.getInputProps("privacyPolicy")}
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
                <Button
                  size="sm"
                  type="submit"
                  fullWidth
                  // disabled={!isValid}
                  className="bg-content hover:bg-content hover:opacity-75"
                >
                  ลงทะเบียน
                </Button>
              </Stack>
            </Card>
            <h3>Debug State</h3>
            <div>
              Username: {formUsername}
              <br />
              Loading: {loading.toString()}
              <br />
              Username Valid: {isValid.toString()}
            </div>
          </form>
        </Container>
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

function Logo() {
  return (
    <Link href="/">
      <div className=" font-bold cursor-pointer text-3xl">
        <span className="text-[#4C6EF5]">My</span>
        <span className="text-content">A</span>
        <span className="text-title">nimeCommunity</span>
      </div>
    </Link>
  );
}
