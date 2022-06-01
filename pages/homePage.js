import React, { useState } from "react";
import HomePost from "@components/HomePost";
import { Container } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import { Animate } from "react-simple-animate";
import EditHomePost from "@components/EditHomePost";
import AddHomePost from "@components/AddHomePost";

export default function HomePage() {
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
    console.log(data);
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
    <div>
      <div className="mt-2 text-white w-full">
        {user ? (
          <Animate
            play
            start={{
              transform: "translateY(2%)",
              opacity: "0",
            }}
            end={{ transform: "translateY(0%)", opacity: "1" }}
          >
            <div className="">
              <div className="flex flex-col gap-2">
                {openMenu === true ? (
                  <AddHomePost
                    handleOpenMenu={HandleOpenMenu}
                    open={openMenu}
                    postData={postData}
                    handlePostDataChange={HandlePostDataChange}
                  />
                ) : null}
                <div className="flex flex-row justify-between w-full">
                  <Container maxW="container.xl">
                    <div
                      onClick={() => HandleOpenMenu(!openMenu)}
                      className="bg-[#ec5555] w-fit px-3 rounded-sm cursor-pointer hover:translate-y-[1px] hover:opacity-75"
                    >
                      สร้าง +
                    </div>
                  </Container>
                </div>
                <HomePost dummyData={postDummy[0]} />
                <HomePost dummyData={postDummy[1]} />
                <HomePost dummyData={postDummy[2]} />
              </div>
            </div>
          </Animate>
        ) : (
          <HomePost dummyData={postDummy[0]} />
        )}
        {postData.title === "หัวข้อหลัก" ? null : (
          <HomePost dummyData={postData} />
        )}
      </div>
    </div>
  );
}
