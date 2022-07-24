import React, { useCallback, useContext, useEffect, useState } from "react";
import { firestore, serverTimestamp } from "lib/firebase";
// Components
import {
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
// Icons
import { Mail } from "tabler-icons-react";
import { UserContext } from "lib/context";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import AgreeWebsiteRule from "../WebsiteRule/AgreeWebsiteRule";
import PrivacyPolicy from "../PrivacyPolicy";
import debounce from "lodash.debounce";
import { UsernameMessage } from ".";

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

export function RegisterForm() {
  const { user } = useContext(UserContext);

  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const setDefaultRank = async (uid) => {
    const ref = firestore
      .collection("users")
      .doc(`${uid}`)
      .collection("ranks")
      .doc();

    const setRank = {
      slug: ref.id,
      color: {
        form: "#36D1DC",
        to: "#5B86E5",
      },
      label: "สมาชิกใหม่",
    };

    await ref.set(setRank);
  };

  const onSubmit = async (values) => {
    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);

    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    const userStatistics = firestore.collection("statistics").doc(user.uid);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, {
      ...values,
      firstName: displayName[0],
      lastName: displayName[1],
      username: formValue,
      email: values.email || "",
      avatar: user?.photoURL,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    batch.set(usernameDoc, { uid: user.uid });
    batch.set(userStatistics, { comments: 0, likes: 0, posts: 0, stars: 0 });
    await batch.commit();

    setDefaultRank(user.uid);
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value;
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        // console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  const displayName = user?.displayName.split(" ") || "";

  const form = useForm({
    schema: !user && zodResolver(schema),
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      avatar: "",
      image: "",
      email: user?.email || user?.providerData[0].email || "",
      password: "",
      confirmPassword: "",
      websiteRule: false,
      privacyPolicy: false,
      rule: "สมาชิก",
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Stack spacing="md">
        {!user && (
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
        )}

        <TextInput
          required
          label="ชื่อผู้ใช้"
          // {...form.getInputProps("username")}
          placeholder="ชื่อผู้ใช้ของคุณ"
          classNames={{
            input: "bg-accent bg-opacity-50",
          }}
          value={formValue}
          onChange={onChange}
        />

        <UsernameMessage
          username={formValue}
          isValid={isValid}
          loading={loading}
        />

        {!user && (
          <>
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
          </>
        )}
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
    </form>
  );
}
