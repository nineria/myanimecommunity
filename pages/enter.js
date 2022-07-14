import { auth, firestore, googleAuthProvider } from "@lib/firebase";
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
  Image,
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
import { RegisterPopUp } from "@components/LoginRegister";
import PageNotFound from "./404";

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
  }, [setTheme, router, username]);

  return (
    <PageNotFound />
    // <main>
    //   {/* <Metatags title="Enter" description="Sign up for this amazing app!" /> */}
    //   {user ? (
    //     !username ? (
    //       <div className="min-h-[1024px] flex flex-col justify-center">
    //         <RegisterPopUp />
    //       </div>
    //     ) : (
    //       <div className="bg-background min-h-[1024px] mb-[235px] pb-10">
    //         <Navbar />
    //         <HomeComponents />
    //         <Footer />
    //       </div>
    //     )
    //   ) : (
    //     <Box>
    //       <div className="absolute z-10 left-2 top-2">
    //         <Logo />
    //       </div>
    //       <div className="bg-background fixed top-0 right-0 bottom-0 left-0">
    //         <RegisterPopUp />
    //       </div>
    //     </Box>
    //   )}
    // </main>
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
