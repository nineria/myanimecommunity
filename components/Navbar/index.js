import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import { auth } from "@lib/firebase";
import { Container } from "@chakra-ui/react";
import { useState } from "react";
import MyAniLogo from "./MyAniLogo";
import UserMenu from "./UserMenu";
import LoginRegister from "./LogInRegister";
import NavbarMenu from "./NavbarMenu";

export default function Navbar({ page, isBusy = false }) {
  const { user, username } = useContext(UserContext); // User data

  const [toggle, setToggle] = useState(false);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  const navbarItem = [
    // Dummy data (Temporary)
    {
      name: "โพสต์ใหม่",
      path: "/postPage",
    },
    {
      name: "ข่าวสาร",
      path: "animeNews",
    },
    {
      name: "รีวิวอนิเมะ",
      path: "animeReview",
    },
    {
      name: "Q&A ถามตอบ",
      path: "animeQAndA",
    },
  ];

  return (
    <div className="bg-[#25262B] py-2 sticky top-0 z-50">
      <Container maxW="container.xl">
        <div className="flex items-end justify-between w-full text-md">
          <div className="text-4xl font-bold">
            {/* Website Logo */}
            <MyAniLogo link="/" />
          </div>
          <div className="lg:flex hidden justify-start pl-10 w-full">
            {/* Navbar menu */}
            {/* user is signed-in and has username */}
            {username && <NavbarMenu page={page} menu={navbarItem} />}
            {/* Login or Register */}
            {/* user is not signed OR has not created username */}
            {!username && <LoginRegister login="/enter" register="/register" />}
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
