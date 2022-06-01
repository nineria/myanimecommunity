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
  Tag,
  Text,
  Box,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Checkbox,
  Textarea,
  StatArrow,
  AvatarBadge,
} from "@chakra-ui/react";
import React from "react";
import { Animate } from "react-simple-animate";
import {
  BrandGithub,
  BrandInstagram,
  BrandLinkedin,
  Mail,
} from "tabler-icons-react";

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
        <div className="flex flex-col justify-between">
          <h1 className="bg-[#ec5555] rounded-t-md py-1 px-3 font-bold w-full">
            {user?.displayName} - Profile
          </h1>
          <div className="w-full h-56 overflow-hidden bg-[#25262b] opacity-75">
            <Image src="https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg" />
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

          <div className="flex flex-col pb-4 bg-[#25262b] rounded-md">
            <div className="fixed top-32 bg-[#25262b] text-white bg-opacity-40 rounded-md ml-4">
              <div className="flex flex-row justify-end pt-2 pr-2">
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>เหตุผลที่รายงาน</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Flex flexDir="column">
                        <Checkbox colorScheme="red">
                          ชื่อผู้ใช้ไม่เหมาะสม
                        </Checkbox>
                        <Checkbox colorScheme="red">
                          ใช้วาจาไม่เหมาะสม / ทัศนคติเชิงลบ
                        </Checkbox>
                        <Checkbox colorScheme="red">
                          โฆษณาขายของ / การสแปมข้อความ
                        </Checkbox>
                        <Checkbox colorScheme="red">
                          คำพูดแสดงถึงความเกลียดชัง
                        </Checkbox>
                        <Checkbox colorScheme="red">
                          เนื้อหามีการอัพเดท
                        </Checkbox>
                        <Checkbox colorScheme="red" mt="4">
                          อื่นๆ
                        </Checkbox>
                        <Textarea
                          placeholder="โปรดระบุข้อมูลเพิ่มเติม"
                          my="8px"
                        />
                      </Flex>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="red" mr={3} onClick={onClose}>
                        ยกเลิก
                      </Button>
                      <Button variant="ghost">ส่งเรื่อง</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
              <div className="flex flex-row px-3 mb-2">
                <Image src={user?.photoURL} rounded="full" bgColor="#25262b" />
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
                  <div className="pt-5 mb-4">
                    <LinkBox
                      as="article"
                      w="full"
                      p="5"
                      borderWidth="1px"
                      rounded="md"
                    >
                      <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
                        13 days ago
                      </Box>
                      <Heading size="md" my="2">
                        <LinkOverlay href="#">
                          New Year, New Beginnings: Smashing Workshops & Audits
                        </LinkOverlay>
                      </Heading>
                      <Text>
                        Catch up on what’s been cookin’ at Smashing and explore
                        some of the most popular community resources.
                      </Text>
                    </LinkBox>
                  </div>
                  <div className="bg-[#37383a] text-center py-1 rounded-md hover:opacity-75 cursor-pointer">
                    แก้ไขคำอธิบายตัวเอง
                  </div>
                  <div className="h-[1px] bg-neutral-500 mt-2"></div>

                  <p className="flex flex-row gap-2 items-center mt-3">
                    <Mail /> {user?.email}
                  </p>
                  <p className="flex flex-row gap-2 items-center">
                    <BrandInstagram /> Instagram
                  </p>
                  <p className="flex flex-row gap-2 items-center">
                    <BrandGithub /> Github
                  </p>
                  <p className="flex flex-row gap-2 items-center">
                    <BrandLinkedin /> Linkedin
                  </p>

                  <div className="bg-[#37383a] text-center py-1 rounded-md hover:opacity-75 cursor-pointer">
                    แก้ไขรายละเอียด
                  </div>
                  <div className="h-[1px] bg-neutral-500 mt-2"></div>

                  <div className="flex flex-row gap-2 items-center mt-3">
                    <Tag>Action</Tag>
                    <Tag>Drama</Tag>
                    <Tag>School</Tag>
                    <Tag>Love</Tag>
                    <Tag>Comedy</Tag>
                  </div>
                  <div className="bg-[#37383a] text-center py-1 rounded-md hover:opacity-75 cursor-pointer">
                    แก้ไขแนวอนิเมะหรือมังงะที่ชอบ
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-around w-full bg-[#25262b] rounded-md pb-4 mt-2 p-4">
            <Flex justifyContent="space-around" w="full">
              <Stat textAlign="center">
                <StatLabel>Post</StatLabel>
                <StatNumber>25</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  10.25%
                </StatHelpText>
              </Stat>
              <Stat textAlign="center">
                <StatLabel>Comment</StatLabel>
                <StatNumber>2.1K</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  1.26%
                </StatHelpText>
              </Stat>
              <Stat textAlign="center">
                <StatLabel>Like</StatLabel>
                <StatNumber>26K</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  58.29%
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
                          w="120px"
                          backgroundColor="#323436"
                          minWidth="100px"
                          maxWidth="100px"
                        >
                          <Image
                            src={user.photoURL}
                            borderRadius="full"
                            p="2"
                          />
                          <Text textAlign="center" color="yellow.400">
                            nineria
                          </Text>
                          <Text
                            textAlign="center"
                            fontSize="xs"
                            color="#ec5555"
                          >
                            Admin
                          </Text>
                        </Flex>
                        <Flex flexDir="column">
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

                <TabPanel>
                  {postDummy.slice(3).map((item, key) => (
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
                        >
                          <Image
                            src={user.photoURL}
                            borderRadius="full"
                            p="2"
                          />
                          <Text textAlign="center" color="yellow.400">
                            nineria
                          </Text>
                          <Text
                            textAlign="center"
                            fontSize="xs"
                            color="#ec5555"
                          >
                            Admin
                          </Text>
                        </Flex>
                        <Flex flexDir="column">
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
                <TabPanel>
                  {postDummy.slice(1).map((item, key) => (
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
                        >
                          <Image
                            src={user.photoURL}
                            borderRadius="full"
                            p="2"
                          />
                          <Text textAlign="center" color="yellow.400">
                            nineria
                          </Text>
                          <Text
                            textAlign="center"
                            fontSize="xs"
                            color="#ec5555"
                          >
                            Admin
                          </Text>
                        </Flex>
                        <Flex flexDir="column">
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
