import Navbar from "@components/Navbar";
import React, { useContext, useEffect } from "react";
import Theme from "@components/SettingComponent/Theme";
import { UserContext } from "@lib/context";
import { useThemeContext } from "@lib/useTheme";
import PageNotFound from "./404.js";
import { Animate } from "react-simple-animate";
import { Container } from "@mantine/core";

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
        <Container size="xl">
          {/* Option menu */}
          {/* Theme */}
          <Animate
            play
            start={{ transform: "translateY(1%)", opacity: "0" }}
            end={{ transform: "translateY(0%)", opacity: "1" }}
          >
            <Theme />
          </Animate>
        </Container>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
}
