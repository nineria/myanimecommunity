import "../styles/globals.css";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import ThemeProvider from "@lib/useTheme";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  };

  const theme = extendTheme({ config });

  return (
    <UserContext.Provider value={userData}>
      <ThemeProvider>
        <ChakraProvider theme={theme}>
          <MantineProvider theme={{ colorScheme: "dark" }}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Component {...pageProps} />
          </MantineProvider>
        </ChakraProvider>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
