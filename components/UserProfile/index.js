import {
  Badge,
  Button,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Flex,
  StatArrow,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";

import React from "react";
import { Animate } from "react-simple-animate";
import {
  BrandGithub,
  BrandInstagram,
  BrandLinkedin,
  Mail,
} from "tabler-icons-react";
import Description from "./Description";
import Favorite from "./Favorite";
import Information from "./Information";
import Report from "./Report";

export default function UserProfile({ user, username }) {
  const postDummy = [
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex flex-col justify-center py-2">
      <Animate
        play
        start={{
          transform: "translateY(1%)",
          opacity: "0",
        }}
        end={{ transform: "translateY(0%)", opacity: "1" }}
      >
        <div className="flex flex-col justify-between ">
          <h1 className="bg-[#ec5555] rounded-t-md py-1 px-3 font-bold w-full">
            {user?.displayName} - Profile
          </h1>
          <div className="h-56 bg-[#25262b] -z-10 overflow-hidden">
            <Image
              className="-translate-y-1/2 "
              src="https://i.pinimg.com/originals/d2/e2/80/d2e280b67f661783fb70ba721c6f2b8e.png"
            />
          </div>

          <div className="fixed top-10 right-2">
            <div className="flex flex-row gap-2">
              <Button
                colorScheme="blackAlpha"
                _hover={{ opacity: "0.7" }}
                size="xs"
              >
                แก้ไขรูปภาพพื้นหลัง
              </Button>
              <Button
                color="#ec5555"
                variant="outline"
                borderColor="#ec5555"
                _hover={{ opacity: "0.7" }}
                size="xs"
                onClick={onOpen}
              >
                รายงานผู้ใช้
              </Button>
            </div>
          </div>

          <div className="flex flex-col pb-4 bg-[#25262b] rounded-b-md">
            <div className="fixed top-32 bg-[#25262b] text-white bg-opacity-40 rounded-md ml-4">
              <div className="flex flex-row justify-end pt-2 pr-2">
                <Report isOpen={isOpen} onClose={onClose} />
              </div>
              <div className="flex flex-row px-3 mb-2">
                <Avatar
                  name={user?.displayName || "username"}
                  src={user?.photoURL}
                  bg="white"
                  size="xl"
                />
                <div className="flex flex-col justify-end gap-2 pl-4 pb-2">
                  <p className="text-3xl font-bold">{username}</p>
                  <Button
                    colorScheme="whiteAlpha"
                    _hover={{ opacity: "0.7" }}
                    size="xs"
                  >
                    แก้ไขรูปภาพประจำตัว
                  </Button>
                  <div className="flex flex-wrap gap-2 text-white text-sm">
                    <Badge colorScheme="purple">ผู้ดูแลระบบ</Badge>
                    <Badge colorScheme="pink">ผู้เฒ่า</Badge>
                    <Badge colorScheme="green">นายทุน</Badge>
                    <Badge colorScheme="yellow">อัศวิน</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="h-[1px] bg-neutral-500 mt-2"></div>
              <div className="w-full px-4">
                <div className="flex flex-col gap-2">
                  <Description>
                    <Description.CreateDate>13 days ago</Description.CreateDate>
                    <Description.Header>
                      New Year, New Beginnings: Smashing Workshops & Audits
                    </Description.Header>
                    <Description.Body>
                      Catch up on what’s been cookin’ at Smashing and explore
                      some of the most popular community resources.
                    </Description.Body>
                    <Description.Button>แก้ไขคำอธิบายตัวเอง</Description.Button>
                  </Description>
                  <div className="h-[1px] bg-neutral-500 mt-2"></div>
                  <Information>
                    <Information.Detail>
                      <Mail /> {user?.email}
                    </Information.Detail>
                    <Information.Detail>
                      <BrandInstagram /> Instagram
                    </Information.Detail>
                    <Information.Detail>
                      <BrandGithub /> Github
                    </Information.Detail>
                    <Information.Detail>
                      <BrandLinkedin /> Linkedin
                    </Information.Detail>
                    <Information.Button>แก้ไขรายละเอียด</Information.Button>
                  </Information>
                  <div className="h-[1px] bg-neutral-500 mt-2"></div>
                  <Favorite>
                    <Favorite.Detail>Action</Favorite.Detail>
                    <Favorite.Detail>Drama</Favorite.Detail>
                    <Favorite.Detail>School</Favorite.Detail>
                    <Favorite.Detail>Love</Favorite.Detail>
                    <Favorite.Detail>Comedy</Favorite.Detail>
                    <Favorite.Button>
                      แก้ไขแนวอนิเมะหรือมังงะที่ชอบ
                    </Favorite.Button>
                  </Favorite>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-around w-full bg-[#25262b] rounded-md pb-4 mt-2 p-4">
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
          </div>

          <div className="w-full bg-[#25262b] rounded-md pb-4 my-2">
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
          </div>
        </div>
      </Animate>
    </div>
  );
}
