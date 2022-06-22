import "../styles/globals.css";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import ThemeProvider from "@lib/useTheme";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <ThemeProvider>
        <MantineProvider theme={{ colorScheme: "dark" }}>
          <Component {...pageProps} />
        </MantineProvider>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
