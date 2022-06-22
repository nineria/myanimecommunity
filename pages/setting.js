import { Container } from "@chakra-ui/react";
import Navbar from "@components/Navbar";
import React, { useContext, useEffect } from "react";
import Theme from "@components/SettingComponent/Theme";
import { UserContext } from "@lib/context";
import { useThemeContext } from "@lib/useTheme";
import PageNotFound from "../pages/_error";

export default function settingPage() {
  const { user } = useContext(UserContext);

  const { setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    setTheme(localData);
  }, []);

  return (
    <div className="bg-background text-accent h-screen">
      <Navbar page="/setting" isBusy />
      {user && user ? (
        <Container maxW="container.xl">
          {/* Option menu */}
          {/* Theme */}
          <Theme />
          {/* Post layout */}
          {/* <PostLayout /> */}
        </Container>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
}
