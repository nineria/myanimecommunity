import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import { auth } from "@lib/firebase";
import { Container } from "@chakra-ui/react";
import { useState } from "react";
import MyAniLogo from "./MyAniLogo";
import UserMenu from "./DropdownMenu";
import Login from "./Login";
import NavbarMenu from "./NavbarMenu";
import { navbarProperty } from "./DummyData";
import { Settings } from "tabler-icons-react";
import DropdownLoginRegisterMenu from "./DropdownLoginRegisterMenu";

export default function Navbar({ page, isBusy = false }) {
  const { user, username } = useContext(UserContext); // User data

  const [toggle, setToggle] = useState(false);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  return (
    <div className="bg-foreground py-2 sticky top-0 z-50">
      <Container maxW="container.xl">
        <div className="flex items-end justify-between w-full text-md">
          <div className="text-4xl font-bold">
            {/* Website Logo */}
            <MyAniLogo link="/" />
          </div>
          <div className="lg:flex hidden justify-start pl-10 w-full">
            {/* Navbar menu */}
            {/* user is signed-in and has username */}
            {username && <NavbarMenu page={page} menu={navbarProperty} />}
            {/* Login or Register */}
            {/* user is not signed OR has not created username */}
            {!username && <Login login="/enter" register="/register" />}
          </div>
          <div className="lg:hidden flex justify-end pl-10 w-full">
            {/* {!username && <Login login="/enter" register="/register" />} */}
            {!username && (
              <div
                className="justify-end gap-2 text-white"
                onClick={() => setToggle(!toggle)}
              >
                <DropdownLoginRegisterMenu
                  login="/enter"
                  register="/register"
                  toggle={toggle}
                />
              </div>
            )}
          </div>
          {/* User Information (Image, Name, Email etc.) */}
          {username && (
            <div
              className="justify-end gap-2 text-white"
              onClick={() => setToggle(!toggle)}
            >
              <UserMenu
                user={user}
                isBusy={isBusy}
                toggle={toggle}
                signOut={signOut}
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
