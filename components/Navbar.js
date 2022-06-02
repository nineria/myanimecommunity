import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import { auth } from "@lib/firebase";
import {
  Container,
  Button,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
  Avatar,
  AvatarBadge,
  MenuDivider,
  MenuGroup,
} from "@chakra-ui/react";
import {
  Logout,
  Users,
  Settings,
  File,
  Palette,
  News,
  MoodHappy,
  QuestionMark,
  MoodSuprised,
  MoodConfuzed,
} from "tabler-icons-react";
import Link from "next/link";
import { useState } from "react";
import { Animate } from "react-simple-animate";

export default function Navbar({ page, isBusy = false }) {
  const { user, username } = useContext(UserContext); // User data

  const [toggle, setToggle] = useState(false);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  const menu = [
    // Dummy data (Temporary)
    {
      name: "โพสต์ใหม่",
      path: "allPost",
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
            <Link href="/">
              <a>
                <div className="md:flex md:visible hidden ">
                  <span className="text-[#4C6EF5]">My</span>
                  <span className="text-[#FA5252]">A</span>
                  <span className="text-white">nimeCommunity</span>
                </div>
                <div className="md:hidden visible">
                  <span className="text-[#4C6EF5]">My</span>
                  <span className="text-[#FA5252]">A</span>
                  <span className="text-white">niCommu</span>
                </div>
              </a>
            </Link>
          </div>
          <div className="lg:flex hidden justify-start pl-10 w-full">
            {/* Navbar menu */}
            {/* user is signed-in and has username */}
            {username && (
              <div className="flex flex-row gap-5">
                {menu.map((item) => (
                  <Link key={item.name} href={item.path}>
                    <div
                      className={`border-b-4 border-transparent hover:border-b-4 hover:border-[#FA5252] ${
                        item.name === page && active === true
                          ? "border-red-400"
                          : ""
                      } `}
                    >
                      <Animate
                        play
                        start={{ transform: "translateX(5%)", opacity: "0" }}
                        end={{ transform: "translateX(0)", opacity: "1" }}
                      >
                        <div className="truncate text-[#ccc] font-bold cursor-pointer hover:text-[#fff]">
                          {item.name}
                        </div>
                      </Animate>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {/* Login or Register */}
            {/* user is not signed OR has not created username */}
            {!username && (
              <div className="flex flex-row justify-end w-full gap-2">
                <Link href="/enter">
                  <Button colorScheme="red" size="sm">
                    เข้าสู่ระบบ
                  </Button>
                </Link>
                <Link href="/register">
                  <Button colorScheme="whiteAlpha" size="sm">
                    ลงทะเบียน
                  </Button>
                </Link>
              </div>
            )}
          </div>
          {/* User Information (Image, Name, Email etc.) */}
          {username && (
            <div
              className="justify-end gap-2 text-white"
              onClick={() => setToggle(!toggle)}
            >
              <Menu>
                <MenuButton>
                  <div className="flex flex-row gap-3 items-center">
                    <div className="">
                      <Avatar
                        name={user?.displayName || "username"}
                        src={user?.photoURL}
                        bg="white"
                        size="sm"
                      >
                        {isBusy === true ? (
                          <AvatarBadge boxSize="0.9em" bg="red.500" />
                        ) : (
                          <AvatarBadge boxSize="0.9em" bg="green.500" />
                        )}
                      </Avatar>
                    </div>

                    <div className="hidden md:flex flex-col text-sm font-bold">
                      <div className="text-left">
                        {user?.displayName || "username"}
                      </div>
                      <div className="text-left text-gray-400 text-xs">
                        {user?.email || "username"}
                      </div>
                    </div>
                    <div
                      className={`${
                        toggle === true ? "rotate-90" : ""
                      } transition-all`}
                    >
                      <Settings />
                    </div>
                  </div>
                </MenuButton>
                {/* Dropdown menu */}
                <Portal>
                  <MenuList
                    mt="2"
                    fontSize="sm"
                    backgroundColor="#25262b"
                    color="white"
                  >
                    <MenuGroup title="การตั้งค่า" color="gray.400">
                      <MenuItem
                        _hover={{ bg: "#181a1d" }}
                        className="group"
                        _focus={{ bg: "#181a1d" }}
                      >
                        <Link href="/enter">
                          <a className="flex flex-row gap-2">
                            <Users className="group-hover:rotate-12 transition-all" />
                            โปรไฟล์
                          </a>
                        </Link>
                      </MenuItem>
                      <MenuItem
                        _hover={{ bg: "#181a1d" }}
                        _focus={{ bg: "#181a1d" }}
                        className="group"
                      >
                        <div className="flex flex-row gap-2">
                          <Settings className="group-hover:rotate-90 transition-all" />
                          ตั้งค่า
                        </div>
                      </MenuItem>
                      <MenuDivider />
                    </MenuGroup>
                    <MenuGroup title="การเข้าถึง" color="gray.400">
                      <MenuItem
                        _hover={{ bg: "#181a1d" }}
                        _focus={{ bg: "#181a1d" }}
                        className="group"
                      >
                        <div className="flex flex-row gap-2">
                          <MoodSuprised className="group-hover:rotate-12 transition-all" />
                          ข่าวสาร
                        </div>
                      </MenuItem>
                      <MenuItem
                        _hover={{ bg: "#181a1d" }}
                        _focus={{ bg: "#181a1d" }}
                        className="group"
                      >
                        <div className="flex flex-row gap-2">
                          <MoodHappy className="group-hover:rotate-12 transition-all" />
                          รีวิว
                        </div>
                      </MenuItem>
                      <MenuItem
                        _hover={{ bg: "#181a1d" }}
                        _focus={{ bg: "#181a1d" }}
                        className="group"
                      >
                        <div className="flex flex-row gap-2">
                          <MoodConfuzed className="group-hover:rotate-12 transition-all" />
                          Q&A ถามตอบ
                        </div>
                      </MenuItem>
                      <MenuDivider />
                    </MenuGroup>
                    <MenuItem
                      color="red.400"
                      onClick={signOut}
                      _hover={{ bg: "#181a1d" }}
                      _focus={{ bg: "#181a1d" }}
                      className="group"
                    >
                      <div className="flex flex-row gap-2">
                        <Logout className="group-hover:rotate-12 transition-all" />
                        ออกจากระบบ
                      </div>
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
