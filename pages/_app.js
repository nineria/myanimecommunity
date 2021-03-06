import "../styles/globals.css";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import ThemeProvider, { useThemeContext } from "@lib/useTheme";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  const [colorScheme, setColorScheme] = useState("dark");

  // const toggleColorScheme = (value) =>
  //   setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const toggleColorScheme = useCallback(
    (value) => {
      setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    },
    [colorScheme]
  );

  const { setTheme } = useThemeContext();

  const handleToggleColorScheme = useCallback(
    (localData) => {
      if (localData === "red-light") toggleColorScheme("light");
      else toggleColorScheme("dark");
    },
    [toggleColorScheme]
  );

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red-light");
      setTheme("red-light");
    }
    handleToggleColorScheme(localData);
    setTheme(localData);
  }, [setTheme, handleToggleColorScheme]);

  return (
    <UserContext.Provider value={userData}>
      <ThemeProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{ colorScheme }}
            withGlobalStyles
            withNormalizeCSS
          >
            <NotificationsProvider>
              <ModalsProvider>
                <Component {...pageProps} />
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
