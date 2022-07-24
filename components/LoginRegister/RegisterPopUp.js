import React, { useContext } from "react";
import { auth, facebookAuthProvider, googleAuthProvider } from "lib/firebase";
import { Button, Divider, Group, Image, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { UserContext } from "lib/context";
import { RegisterForm } from "./RegisterForm";

export function RegisterPopUp() {
  const router = useRouter();

  const { username } = useContext(UserContext);

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (error) {
      console.log(error);
      router.push("/");
    }
  };

  const signInWithFacebook = async () => {
    try {
      await auth.signInWithPopup(facebookAuthProvider);
      console.log("in");
    } catch (error) {
      console.log(error);
      router.push("/");
    }
  };

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

          <Divider label="ขั้นตอนการลงทะเบียน" labelPosition="center" />
          <RegisterForm />
        </Stack>
      </section>
    )
  );
}
