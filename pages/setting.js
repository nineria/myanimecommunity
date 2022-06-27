import Navbar from "@components/Navbar";
import React, { useContext, useEffect } from "react";
import Theme from "@components/SettingComponent/Theme";
import { UserContext } from "@lib/context";
import { useThemeContext } from "@lib/useTheme";
import PageNotFound from "./404.js";
import { Animate } from "react-simple-animate";
import { Container, useMantineColorScheme } from "@mantine/core";
import { Footer } from "@components/Footer/index.js";

export default function SettingPage() {
  const { user } = useContext(UserContext);

  const { setTheme } = useThemeContext();

  const { toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    if (localData === "red-light") toggleColorScheme("light");
    else toggleColorScheme("dark");
    setTheme(localData);
  }, [setTheme]);

  return (
    <>
      <div className="bg-background text-accent min-h-[1024px] mb-[235px] pb-10">
        <Navbar page="/setting" isBusy />
        {user && user ? (
          <Container size="lg">
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
      <Footer />
    </>
  );
}
