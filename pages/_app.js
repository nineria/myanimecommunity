import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import ThemeProvider from "@lib/useTheme";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  const theme = extendTheme({
    config: {
      useSystemColorMode: false,
      initialColorMode: "dark",
    },
  });

  return (
    <UserContext.Provider value={userData}>
      <ThemeProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
