import React, { useContext, useEffect, useState } from "react";
import { Animate } from "react-simple-animate";
import {
  AlertOctagon,
  BrandGithub,
  BrandInstagram,
  BrandLinkedin,
  Edit,
  Mail,
  User,
} from "tabler-icons-react";
import { UserContext } from "@lib/context";
import Navbar from "@components/Navbar";
import {
  Container,
  Divider,
  Group,
  Paper,
  ThemeIcon,
  Title,
  List,
  Badge,
  Button,
  Avatar,
  Modal,
  Textarea,
  Checkbox,
  Stack,
  Space,
  Center,
  Image,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Footer } from "@components/Footer";
import PageNotFound from "./404";
import { useThemeContext } from "@lib/useTheme";

export default function UserProfilePage() {
  const { user, username } = useContext(UserContext); // User data

  const postDummy = [
    // Dummy data (Temporary)
    {
      postTime: "13 days ago",
      header:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem, dolores.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, necessitatibus, exercitationem porro voluptatibus est tempore itaque nemo aperiam accusantium rerum, dolore ex nisi. Inventore, quia temporibus consectetur laborum ea saepe.",
    },
    {
      postTime: "16 days ago",
      header:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, rem.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ab ratione amet cumque a quisquam. Atque fugiat repellat voluptate assumenda!",
    },
    {
      postTime: "25 days ago",
      header: "Lorem ipsum dolor sit amet.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, mollitia?",
    },
    {
      postTime: "1 days ago",
      header:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore molestias cum excepturi voluptatem quidem accusamus eveniet praesentium aliquid, vel mollitia?",
      body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, facilis, a tempore omnis odio dolor corrupti nemo atque ducimus voluptate modi dolorum inventore assumenda eligendi molestiae alias accusamus magnam veritatis dolore. Minima laboriosam similique, ullam non aliquid perspiciatis ad aspernatur error, pariatur, fuga incidunt dicta dolorum. Alias corporis necessitatibus totam.",
    },
  ];

  const typeProps = [
    {
      name: "Action",
      color: {
        from: "indigo",
        to: "cyan",
      },
    },
    {
      name: "Drama",
      color: {
        from: "teal",
        to: "lime",
      },
    },
    {
      name: "School",
      color: {
        from: "teal",
        to: "blue",
      },
    },
    {
      name: "Love",
      color: {
        from: "orange",
        to: "red",
      },
    },
    {
      name: "Comedy",
      color: {
        from: "#ed6ea0",
        to: "#ec8c69",
      },
    },
  ];

  const socialProps = [
    {
      name: user?.email,
      icon: <Mail />,
    },
    {
      name: "Instagram",
      icon: <BrandInstagram />,
    },
    {
      name: "Github",
      icon: <BrandGithub />,
    },
    {
      name: "Linkedin",
      icon: <BrandLinkedin />,
    },
  ];

  const paperProps = {
    date: "13 days ago",
    title: "New Year, New Beginnings: Smashing Workshops & Audits",
    content:
      "Catch up on what’s been cookin’ at Smashing and explore some of the most popular community resources.",
  };

  const rankProps = ["ผู้ดูแลระบบ", "ผู้เฒ่า", "นายทุน", "อัศวิน"];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className="bg-background text-accent min-h-[1024px]">
        <Navbar page="/profile" isBusy />
        {user ? (
          <Container size="lg">
            <Animate
              play
              start={{
                transform: "translateY(1%)",
                opacity: "0",
              }}
              end={{ transform: "translateY(0%)", opacity: "1" }}
            >
              <div className="flex flex-col justify-between mt-2 text-title text-opacity-80">
                <Group className="bg-foreground rounded-t-sm py-2 px-4 font-bold w-full">
                  <User size={18} />
                  {user?.displayName} ({username || "username"})
                </Group>
                {/* Background Image */}
                <div className="h-56 bg-[#25262b] -z-10 overflow-hidden">
                  <Image
                    className="-translate-y-1/2 "
                    src="https://i.pinimg.com/originals/d2/e2/80/d2e280b67f661783fb70ba721c6f2b8e.png" // Temporary
                  />
                </div>

                {/* Button -> Edit bg-image, Report user */}
                <div className="fixed top-12 right-2">
                  <div className="flex flex-col gap-2 text-accent">
                    <div className="text-sm justify-end flex flex-row items-center gap-1 cursor-pointer hover:opacity-75">
                      <Edit size={16} /> แก้ไขรูปภาพพื้นหลัง
                    </div>

                    <Modal
                      opened={opened}
                      onClose={() => setOpened(false)}
                      title="เหตุผลที่รายงาน!"
                    >
                      <Stack>
                        <Checkbox label="ชื่อผู้ใช้ไม่เหมาะสม" />
                        <Checkbox label="ใช้วาจาไม่เหมาะสม / ทัศนคติเชิงลบ" />
                        <Checkbox label="โฆษณาขายของ / การสแปมข้อความ" />
                        <Checkbox label="คำพูดแสดงถึงความเกลียดชัง" />
                        <Checkbox label="เนื้อหามีการอัพเดท" />
                        <Textarea placeholder="โปรดระบุ" label="อื่นๆ" />
                      </Stack>
                      <Space />
                      <Center mt="md">
                        <Group>
                          <div
                            onClick={() => setOpened(false)}
                            className="text-base bg-content w-fit px-4 py-1 text-accent rounded-sm cursor-pointer hover:opacity-75"
                          >
                            ยกเลิก
                          </div>
                          <div
                            onClick={() => setOpened(false)}
                            className="text-base text-title bg-foreground w-fit px-4 py-1 rounded-sm cursor-pointer hover:opacity-75"
                          >
                            ส่งเรื่อง
                          </div>
                        </Group>
                      </Center>
                    </Modal>
                    <div
                      onClick={() => setOpened(true)}
                      className="text-sm justify-end flex flex-row items-center gap-1 cursor-pointer hover:opacity-75 rounded-sm"
                    >
                      <AlertOctagon size={16} /> รายงานผู้ใช้
                    </div>
                  </div>
                </div>

                <div className="flex flex-col pb-4 bg-foreground rounded-b-sm">
                  <div className="fixed top-32 bg-foreground text-title text-opacity-80 bg-opacity-70 rounded-sm ml-4">
                    <div className="flex flex-row px-3 my-2">
                      {/* Profile image */}
                      <Avatar
                        name={user?.displayName || "username"}
                        src={user?.photoURL}
                        size="xxl"
                        radius="xs"
                      />
                      {/* Button Edit -> User profile image */}
                      <div className="flex flex-col justify-end gap-2 pl-4 pb-2">
                        <p className="text-3xl font-bold">{username}</p>
                        <Button
                          variant="outline"
                          className="text-title border-title text-opacity-80 border-opacity-80"
                          compact
                        >
                          แก้ไขรูปภาพประจำตัว
                        </Button>
                        <Group spacing="xs">
                          {rankProps &&
                            rankProps.map((item, index) => (
                              <Badge
                                key={index}
                                variant="filled"
                                color="yellow"
                              >
                                {item}
                              </Badge>
                            ))}
                        </Group>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="w-full px-4">
                      {/* Description */}
                      <div className="flex flex-col gap-2">
                        <Divider
                          my="xs"
                          label="คำอธิบายตัวเอง"
                          labelPosition="center"
                        />
                        <Paper
                          shadow="xs"
                          p="md"
                          className="bg-background text-title text-opacity-80"
                        >
                          <Text>{paperProps.date}</Text>
                          <Title order={3}>{paperProps.title}</Title>
                          <Text>{paperProps.content}</Text>
                          <div className="bg-foreground text-title text-opacity-80 text-sm text-center py-1 rounded-sm hover:opacity-75 cursor-pointer mt-4">
                            แก้ไขคำอธิบายตัวเอง
                          </div>
                        </Paper>
                        <Divider
                          my="xs"
                          label="รายละเอียด"
                          labelPosition="center"
                        />
                        {/* Information */}
                        <List spacing="xs" size="sm">
                          {socialProps &&
                            socialProps.map((item, index) => (
                              <List.Item
                                key={index}
                                className="text-title text-opacity-80"
                                icon={
                                  <ThemeIcon
                                    className="bg-background"
                                    size={24}
                                    radius="xl"
                                  >
                                    {item.icon}
                                  </ThemeIcon>
                                }
                              >
                                {item.name}
                              </List.Item>
                            ))}
                        </List>

                        <div className="bg-background text-title text-opacity-80 text-sm text-center py-1 rounded-sm hover:opacity-75 cursor-pointer mt-4">
                          แก้ไขรายละเอียด
                        </div>

                        <Divider
                          my="xs"
                          label="แนวที่ชอบ"
                          labelPosition="center"
                        />
                        {/* Favorite tag */}
                        <Group spacing="xs">
                          {typeProps &&
                            typeProps.map((item, index) => (
                              <Badge
                                key={index}
                                variant="gradient"
                                gradient={{
                                  from: item.color.from,
                                  to: item.color.to,
                                  deg: 105,
                                }}
                              >
                                {item.name}
                              </Badge>
                            ))}
                        </Group>
                        <div className="bg-background text-title text-opacity-80 text-sm text-center py-1 rounded-sm hover:opacity-75 cursor-pointer mt-4">
                          แก้ไขแนวที่ชอบ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stat -> Post, Like, Comment */}
                {/* <div className="flex flex-row justify-around w-full bg-[#25262b] rounded-md pb-4 mt-2 p-4">
              <Flex justifyContent="space-around" w="full">
                <Stat textAlign="center">
                  <StatLabel>โพสต์</StatLabel>
                  <StatNumber>25</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    10.25%
                  </StatHelpText>
                </Stat>
                <Stat textAlign="center">
                  <StatLabel>ถูกใจ</StatLabel>
                  <StatNumber>26K</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    58.29%
                  </StatHelpText>
                </Stat>
                <Stat textAlign="center">
                  <StatLabel>คอมเมนต์</StatLabel>
                  <StatNumber>2.1K</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    1.26%
                  </StatHelpText>
                </Stat>
              </Flex>
            </div> */}

                {/* Created post, Liked post, My comment */}
                {/* <div className="w-full bg-[#25262b] rounded-md pb-4 my-2">
              <Tabs isFitted variant="enclosed">
                <TabList>
                  <Tab>โพสต์ของฉัน</Tab>
                  <Tab>โพสต์ที่ชื่นชอบ</Tab>
                  <Tab>คอมเมนต์</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {postDummy.map((item, key) => (
                      <LinkBox
                        borderWidth="1px"
                        borderRadius="sm"
                        overflow="hidden"
                        key={key}
                        my="1"
                      >
                        <Flex gap="2">
                          <Flex
                            flexDir="column"
                            backgroundColor="#323436"
                            minWidth="100px"
                            maxWidth="100px"
                            py="2"
                          >
                            <Avatar
                              margin="auto"
                              name={user?.displayName || "username"}
                              src={user?.photoURL}
                              bg="white"
                            />
                            <Text textAlign="center" color="yellow.400">
                              {username || "username"}
                            </Text>
                            <Text
                              textAlign="center"
                              fontSize="xs"
                              color="#ec5555"
                            >
                              Admin
                            </Text>
                          </Flex>
                          <Flex flexDir="column" pt="2">
                            <Text fontSize="x-small" color="#bbb">
                              {item.postTime}
                            </Text>
                            <Heading size="md" noOfLines={1}>
                              <LinkOverlay href="#">{item.header}</LinkOverlay>
                            </Heading>
                            <Text
                              fontSize="sm"
                              overflow="hidden"
                              h="10"
                              noOfLines={3}
                            >
                              {item.body}
                            </Text>
                          </Flex>
                        </Flex>
                      </LinkBox>
                    ))}
                    <div className="bg-[#37383a] text-center py-1 rounded-md hover:opacity-75 cursor-pointer mt-2">
                      โหลดข้อมูลเพิ่มเติม...
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div> */}
              </div>
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
