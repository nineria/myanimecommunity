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
} from "@chakra-ui/react";
import { Logout, Users, Settings, File, Palette } from "tabler-icons-react";
import Link from "next/link";
import { useState } from "react";
import { Animate } from "react-simple-animate";

// Top navbar
export default function Navbar({ pageName }) {
  const { user, username } = useContext(UserContext);

  const [toggle, setToggle] = useState(false);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  const menu = [
    {
      name: "โพสต์ใหม่",
      path: "allPost",
    },
    {
      name: "ข่าวสาร",
      path: "animeNews",
    },
    {
      name: "รีวิว",
      path: "animeReview",
    },
    {
      name: "Q&A ถามตอบ",
      path: "animeQAndA",
    },
  ];

  return (
    <div className="bg-[#25262B] py-2">
      <Container maxW="container.xl">
        <div className="flex justify-start">
          <div className="text-4xl font-bold">
            <Link href="/">
              <a>
                <span className="text-[#4C6EF5]">My</span>
                <span className="text-[#FA5252]">A</span>
                <span className="text-white">nimeCommu</span>
              </a>
            </Link>
          </div>
          <div className="flex items-end w-full text-md">
            <div className="flex justify-start gap-10 pl-10 w-full">
              {/* user is signed-in and has username */}
              {username && (
                <>
                  {menu.map((item) => (
                    <Link key={item.name} href={item.path}>
                      <div
                        className={`border-b-4 border-transparent hover:border-b-4 hover:border-[#FA5252] ${
                          item.name === pageName && active === true
                            ? "border-red-400"
                            : ""
                        } `}
                      >
                        {/* <div className={` outline-2 outline-red-100`}> */}
                        <Animate
                          play
                          start={{ transform: "translateX(5%)", opacity: "0" }}
                          end={{ transform: "translateX(0)", opacity: "1" }}
                        >
                          <div className="text-[#ccc] font-bold cursor-pointer hover:text-[#fff]">
                            {item.name}
                          </div>
                        </Animate>
                      </div>
                    </Link>
                  ))}
                </>
              )}

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
            {username && (
              <div
                className="flex justify-end w-full gap-2 text-white"
                onClick={() => setToggle(!toggle)}
              >
                <Menu>
                  <MenuButton>
                    <div className="flex flex-row gap-3 items-center">
                      <Avatar
                        name={user?.displayName || "username"}
                        src={user?.photoURL}
                        bg="white"
                        size="sm"
                      >
                        <AvatarBadge boxSize="0.9em" bg="green.500" />
                      </Avatar>
                      <div className="flex flex-col text-sm font-bold">
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
                  <Portal>
                    <MenuList
                      fontSize="sm"
                      backgroundColor="#25262b"
                      color="white"
                    >
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
                      <MenuItem
                        _hover={{ bg: "#181a1d" }}
                        _focus={{ bg: "#181a1d" }}
                        className="group"
                      >
                        <div className="flex flex-row gap-2">
                          <File className="group-hover:rotate-12 transition-all" />
                          โพสต์ของฉัน
                        </div>
                      </MenuItem>
                      <MenuItem
                        _hover={{ bg: "#181a1d" }}
                        _focus={{ bg: "#181a1d" }}
                        className="group"
                      >
                        <div className="flex flex-row gap-2">
                          <Palette className="group-hover:rotate-12 transition-all" />
                          เลือกธีม
                        </div>
                      </MenuItem>
                      <MenuDivider />
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
                {/* <Group position="center">
                  <Menu
                    withArrow
                    placement="center"
                    control={<UserButton user={user} />}
                  >
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item
                      icon={<ExternalLink size={14} />}
                      component="a"
                      onClick={signOut}
                    >
                      Sign Out
                    </Menu.Item>
                  </Menu>
                </Group> */}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
