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
} from "@chakra-ui/react";
import React from "react";
import {
  BrandGithub,
  BrandInstagram,
  BrandLinkedin,
  Mail,
} from "tabler-icons-react";

export default function UserProfile({ user, username }) {
  const backgroundImageTemp =
    "https://images.iphonemod.net/wp-content/uploads/2021/09/california-streaming-apple-event-wallpaper-mac-nologo-1024x603.png";

  const postDummy = [
    {
      postTime: "13 days ago",
      header: "มีข้อสงสัยเกี่ยวกับตอนจบในอนิเมะ Jujutsu Kaisen ครับ",
      body: "ขอออกตัวไว้ก่อนว่าผมอาจจะเก็บรายละเอียดไม่ครบก็ได้ คือผมไม่เข้าใจบทสนทนาตอนจบของฟุชิงุโระกับคุงิซากิที่พูดถึงการที่ไม่ให้อิตาโดริรู้เรื่องการสั่นพ้อง (Resonance) ว่าทำไมถึงไม่อยากให้รู้หรอครับ แล้วการสั่นพ้องที่หมายถึงนี่ใช่การสั่นพ้องเดียวกันกับความสามารถของคุงิซากิรึเปล่ารบกวนด้วยนะครับ ขอบคุณครับ",
    },
    {
      postTime: "13 days ago",
      header: "มีข้อสงสัยเกี่ยวกับตอนจบในอนิเมะ Jujutsu Kaisen ครับ",
      body: "ขอออกตัวไว้ก่อนว่าผมอาจจะเก็บรายละเอียดไม่ครบก็ได้ คือผมไม่เข้าใจบทสนทนาตอนจบของฟุชิงุโระกับคุงิซากิที่พูดถึงการที่ไม่ให้อิตาโดริรู้เรื่องการสั่นพ้อง (Resonance) ว่าทำไมถึงไม่อยากให้รู้หรอครับ แล้วการสั่นพ้องที่หมายถึงนี่ใช่การสั่นพ้องเดียวกันกับความสามารถของคุงิซากิรึเปล่ารบกวนด้วยนะครับ ขอบคุณครับ",
    },
    {
      postTime: "13 days ago",
      header: "มีข้อสงสัยเกี่ยวกับตอนจบในอนิเมะ Jujutsu Kaisen ครับ",
      body: "ขอออกตัวไว้ก่อนว่าผมอาจจะเก็บรายละเอียดไม่ครบก็ได้ คือผมไม่เข้าใจบทสนทนาตอนจบของฟุชิงุโระกับคุงิซากิที่พูดถึงการที่ไม่ให้อิตาโดริรู้เรื่องการสั่นพ้อง (Resonance) ว่าทำไมถึงไม่อยากให้รู้หรอครับ แล้วการสั่นพ้องที่หมายถึงนี่ใช่การสั่นพ้องเดียวกันกับความสามารถของคุงิซากิรึเปล่ารบกวนด้วยนะครับ ขอบคุณครับ",
    },
    {
      postTime: "13 days ago",
      header: "มีข้อสงสัยเกี่ยวกับตอนจบในอนิเมะ Jujutsu Kaisen ครับ",
      body: "ขอออกตัวไว้ก่อนว่าผมอาจจะเก็บรายละเอียดไม่ครบก็ได้ คือผมไม่เข้าใจบทสนทนาตอนจบของฟุชิงุโระกับคุงิซากิที่พูดถึงการที่ไม่ให้อิตาโดริรู้เรื่องการสั่นพ้อง (Resonance) ว่าทำไมถึงไม่อยากให้รู้หรอครับ แล้วการสั่นพ้องที่หมายถึงนี่ใช่การสั่นพ้องเดียวกันกับความสามารถของคุงิซากิรึเปล่ารบกวนด้วยนะครับ ขอบคุณครับ",
    },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex flex-col justify-center py-2">
      <div className="flex flex-col justify-between">
        <h1 className="bg-[#ec5555] rounded-t-md py-1 px-3 font-bold w-full">
          {user?.displayName} - Profile
        </h1>
        <div className="flex flex-col bg-[#25262b] rounded-md pb-4">
          <div className="bg-[url('https://images.iphonemod.net/wp-content/uploads/2021/09/california-streaming-apple-event-wallpaper-mac-nologo-1024x603.png')]">
            <div className="flex flex-row justify-end pt-2 pr-2">
              <Button
                color="#ec5555"
                variant="outline"
                borderColor="#ec5555"
                _hover={{ backgroundColor: "#37383a" }}
                size="xs"
                onClick={onOpen}
              >
                รายงานผู้ใช้
              </Button>
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
                      <Checkbox colorScheme="red">เนื้อหามีการอัพเดท</Checkbox>
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
              <Image src={user?.photoURL} />
              <div className="flex flex-col justify-end gap-2 pl-4 pb-2">
                <p className="text-3xl">{username}</p>
                <div className="flex flex-wrap gap-2 text-white text-sm">
                  <Badge>ผู้ดูแลระบบ</Badge>
                  <Badge>ผู้เฒ่า</Badge>
                  <Badge>นายทุน</Badge>
                  <Badge>อัศวิน</Badge>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="w-full px-4">
              {/* <div className="flex flex-row gap-2 items-center font-bold pt-2">
                แนะนำตัว
                <Users size={20} />
              </div> */}
              <div className="flex flex-col gap-2">
                <div className="pt-5 mt-3">
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

        <div className="flex flex-row justify-around w-full bg-[#25262b] rounded-md pb-4 my-2 p-4">
          <Stat>
            <StatLabel>Post</StatLabel>
            <StatNumber>25</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Comment</StatLabel>
            <StatNumber>2134</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Like</StatLabel>
            <StatNumber>26K</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
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
                      >
                        <Image src={user.photoURL} borderRadius="full" p="2" />
                        <Text textAlign="center" color="yellow.400">
                          nineria
                        </Text>
                        <Text textAlign="center" fontSize="xs" color="#ec5555">
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
                        w="120px"
                        backgroundColor="#323436"
                      >
                        <Image src={user.photoURL} borderRadius="full" p="2" />
                        <Text textAlign="center" color="yellow.400">
                          nineria
                        </Text>
                        <Text textAlign="center" fontSize="xs" color="#ec5555">
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
                        w="120px"
                        backgroundColor="#323436"
                      >
                        <Image src={user.photoURL} borderRadius="full" p="2" />
                        <Text textAlign="center" color="yellow.400">
                          nineria
                        </Text>
                        <Text textAlign="center" fontSize="xs" color="#ec5555">
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
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
