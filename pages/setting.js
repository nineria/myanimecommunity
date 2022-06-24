import Navbar from "@components/Navbar";
import React, { useContext, useEffect } from "react";
import Theme from "@components/SettingComponent/Theme";
import { UserContext } from "@lib/context";
import { useThemeContext } from "@lib/useTheme";
import PageNotFound from "./404.js";
import { Animate } from "react-simple-animate";
import { Container } from "@mantine/core";
import { Footer } from "@components/Footer/index.js";

export default function SettingPage() {
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
    <>
      <div className="bg-background text-accent min-h-[1024px]">
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
