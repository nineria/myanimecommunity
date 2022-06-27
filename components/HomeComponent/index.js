import HomePost from "@components/HomePost";
import AddPost from "@components/HomePost/Add";
import { UserContext } from "@lib/context";
import { Button, Container, Modal, Skeleton } from "@mantine/core";
import { useContext, useState } from "react";
import { Animate } from "react-simple-animate";
import { FilePlus, Plus } from "tabler-icons-react";

export default function HomeComponent() {
  const { user, username } = useContext(UserContext);

  const [opened, setOpened] = useState(false);

  const [loading, setLoading] = useState(true);

  const [postData, setPostData] = useState({
    title: "",
    titleLink: "",
    header: "",
    headerLink: "",
    body: "",
  });

  const HandleOpenMenu = () => {
    return setOpenMenu(!openMenu);
  };

  const HandlePostDataChange = (data) => {
    setPostData(data);
  };

  setTimeout(function () {
    setLoading(false);
  }, 500);

  const postDummy = [
    {
      title: "อัพเดทข่าวสาร",
      titleLink: "/news",
      header: "ข่าวสารอนิเมะอนิเมะ & ประกาศจากเว็บไซต์",
      headerLink: "/news",
      body: "โพสต์รวบรวมอนิเมะเปิดตัวใหม่ และข่าวสารต่างๆ เกี่ยวกับอนิเมะ",
    },
    {
      title: "รีวิว อนิเมะ มังงะ สปอย",
      titleLink: "/review",
      header: "รีวิวอนิเมะเปิดตัวใหม่ และข้อมูลที่เกี่ยวข้อง",
      headerLink: "/news",
      body: "โพสต์รวบรวมรีวิวอนิเมะก่อนไปรับชม และเรื่องย่อต่างๆ พร้อมข้อมูลจำเพราะของตัวละคร ฯลฯ",
    },
    {
      title: "Q&A ถาม-ตอบ ข้อสงสัยต่างๆ",
      titleLink: "/qAndA",
      header: "โพสต์ ถาม-ตอบ ข้อสงสัยเกี่ยวกับ อนิเมะ มังงะ",
      headerLink: "/news",
      body: "โพสต์รวบรวมรีวิวอนิเมะก่อนไปรับชม และเรื่องย่อต่างๆ พร้อมข้อมูลจำเพราะของตัวละคร ฯลฯ",
    },
  ];

  const posts = postDummy.map((item, index) => (
    <HomePost dummyData={item} key={index} />
  ));

  return (
    <Container size="lg">
      <div className={` mt-2 text-white w-full`}>
        {user ? (
          <Animate
            play
            start={{
              transform: "translateY(1%)",
              opacity: "0",
            }}
            end={{ transform: "translateY(0%)", opacity: "1" }}
          >
            <div className="">
              <div className="flex flex-col gap-2">
                {/* Add home post */}
                <div className="flex flex-row justify-between w-full bg-foreground rounded-sm p-1 shadow-md">
                  <Modal
                    size="lg"
                    overlayColor="#333"
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="สร้างโพสต์ - หน้าหลัก"
                  >
                    <AddPost
                      setOpened={setOpened}
                      postData={postData}
                      handlePostDataChange={HandlePostDataChange}
                    />
                  </Modal>
                  <Button
                    onClick={() => setOpened(true)}
                    className="bg-content text-accent hover:bg-content hover:opacity-75"
                    variant="default"
                    size="xs"
                  >
                    สร้างโพสต์ +
                  </Button>
                </div>
                {/* Display home post */}
                <div className="flex flex-col gap-2">{posts}</div>
              </div>
            </div>
          </Animate>
        ) : (
          <Skeleton visible={loading}>
            <HomePost dummyData={postDummy[0]} />
          </Skeleton>
        )}
      </div>
    </Container>
  );
}
