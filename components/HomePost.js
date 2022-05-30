import React, { useState, useEffect } from "react";
import { ChevronUp, Messages, Edit, SquareX } from "tabler-icons-react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import ManageHomePost from "./ManageHomePost";
import { Container } from "@chakra-ui/react";
import { Animate } from "react-simple-animate";

export default function HomePost({ dummyData }) {
  const { user, username } = useContext(UserContext);

  const [toggle, setTogle] = useState(true);

  const [openMenu, setOpenMenu] = useState(false);

  const postData = dummyData;

  const HandleOpenMenu = () => {
    return setOpenMenu(!openMenu);
  };

  const HandlePostDataChange = (data) => {
    console.log(data);
  };

  const Content = ({ header, headerLink, body }) => {
    return (
      <div
        className={`flex lg:flex-row flex-col lg:justify-between lg:items-center px-3 py-2 text-[#ec5555] bg-[#242629]`}
      >
        <div className="flex gap-2">
          <Messages size={45} />
          <div className={`${body ? "flex flex-col" : "flex items-center"}`}>
            <div className="flex flex-row justify-start gap-2 items-center ">
              <Link href={headerLink}>
                <a className="truncate w-full text-white cursor-pointer hover:underline">
                  {header}
                </a>
              </Link>
              <div className="px-1 bg-[#ec5555] w-fit h-fit rounded-sm text-white text-xs">
                ใหม่
              </div>
            </div>
            <p className="truncate w-full text-[#aaa] text-xs">{body}</p>
          </div>
        </div>
        <div className="flex flex-row gap-4 text-white">
          <div className="flex lg:flex-col lg:items-center items-end gap-1">
            <div>25</div>
            <div className="text-sm text-[#aaa]">โพสต์</div>
          </div>
          <div className="lg:border-r-[1px] lg:border-[#aaa]" />
          <div className="flex lg:flex-col lg:items-center items-end gap-1">
            <div>3.6K</div>
            <div className="text-sm text-[#aaa]">ข้อความ</div>
          </div>
          <div className="flex lg:flex-col lg:items-center items-end gap-1">
            <div>แก้ไขล่าสุด</div>
            <div className="text-sm text-[#aaa]">28/5/2565 - Admin</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {openMenu === true ? (
        <ManageHomePost
          handleOpenMenu={HandleOpenMenu}
          open={openMenu}
          postData={postData}
          handlePostDataChange={HandlePostDataChange}
        />
      ) : null}
      <Container maxW="container.xl">
        <Animate
          play
          start={{
            transform: "translateY(1%)",
            opacity: "0",
          }}
          end={{ transform: "translateY(0%)", opacity: "1" }}
        >
          <div className="rounded-sm bg-[#242629] w-full">
            <h2
              className={`flex flex-row justify-between items-center  bg-[#ec5555] py-1 px-3 font-bold text-md text-white ${
                toggle === true ? "rounded-t-sm" : "rounded-sm"
              }`}
            >
              <Link href={postData.titleLink}>
                <a className="truncate cursor-pointer hover:underline">
                  {postData.title}
                </a>
              </Link>
              <div className="flex flex-row gap-2 ">
                {user && (
                  <Edit
                    onClick={() => setOpenMenu(!openMenu)}
                    className="hover:translate-y-[1px] hover:opacity-75 cursor-pointer"
                  />
                )}
                <ChevronUp
                  size={22}
                  onClick={() => setTogle(!toggle)}
                  className={`${
                    toggle === false ? "rotate-180" : ""
                  } cursor-pointer transition-all hover:translate-y-[1px] hover:opacity-75`}
                />
              </div>
            </h2>
            <div className="flex flex-col bg-[#aaa] gap-[1px]">
              {toggle ? (
                <Content
                  header={postData.header}
                  headerLink={postData.headerLink}
                  body={postData.body}
                />
              ) : null}
            </div>
          </div>
        </Animate>
      </Container>
    </div>
  );
}
