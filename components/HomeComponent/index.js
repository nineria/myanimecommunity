import HomePost from "@components/HomePost";
import AddPost from "@components/HomePost/Add";
import { UserContext } from "@lib/context";
import { Container } from "@mantine/core";
import { useContext, useState } from "react";
import { Animate } from "react-simple-animate";

export default function HomeComponent() {
  const { user, username } = useContext(UserContext);

  const [openMenu, setOpenMenu] = useState(false);

  const [postData, setPostData] = useState({
    title: "หัวข้อหลัก",
    titleLink: "/",
    content: [
      {
        header: "หัวข้อย่อย",
        headerLink: "/news",
        body: "เนื้อหา",
      },
    ],
  });

  const HandleOpenMenu = () => {
    return setOpenMenu(!openMenu);
  };

  const HandlePostDataChange = (data) => {
    setPostData(data);
  };

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

  return (
    <Container size="xl">
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
                {openMenu === true ? (
                  <AddPost
                    handleOpenMenu={HandleOpenMenu}
                    open={openMenu}
                    postData={postData}
                    handlePostDataChange={HandlePostDataChange}
                  />
                ) : null}
                {/* Create home post */}
                <CreateHomePost
                  HandleOpenMenu={HandleOpenMenu}
                  openMenu={openMenu}
                />
                {/* Display home post */}
                <div className="flex flex-col gap-2">
                  {postDummy.map((item, index) => (
                    <HomePost dummyData={item} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </Animate>
        ) : (
          <HomePost dummyData={postDummy[0]} />
        )}
        {postData.title === "หัวข้อหลัก" ? null : <HomePost data={postData} />}
      </div>
    </Container>
  );
}

function CreateHomePost({ HandleOpenMenu, openMenu }) {
  return (
    <div className="bg-content w-fit px-3 rounded-sm cursor-pointer hover:translate-y-[1px] hover:opacity-75 md:text-base text-sm text-[#fff]">
      <div
        onClick={() => {
          HandleOpenMenu(!openMenu);
        }}
      >
        สร้าง +
      </div>
    </div>
  );
}
