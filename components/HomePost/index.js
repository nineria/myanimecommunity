import React, { useState, useEffect } from "react";
import { ChevronUp, Messages, Edit, SquareX } from "tabler-icons-react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import EditPost from "./Edit";
import { Animate } from "react-simple-animate";
import Content from "./Content";
import { Modal } from "@mantine/core";

export default function HomePost({ dummyData, isDisabled = false }) {
  const { user } = useContext(UserContext);

  const [toggle, setTogle] = useState(true);

  const [openMenu, setOpenMenu] = useState(false);

  const [opened, setOpened] = useState(false);

  const postData = dummyData;

  const HandleOpenMenu = () => {
    return setOpenMenu(!openMenu);
  };

  const HandlePostDataChange = (data) => {
    postData = data;
  };

  return (
    <div className="">
      <div className="rounded-sm w-full">
        <div
          className={`bg-content flex flex-row justify-between items-center transition-all py-1 px-3 font-bold md:text-base text-sm text-accent ${
            toggle === true ? "rounded-t-sm" : "rounded-sm"
          }`}
        >
          {/* Title */}
          <Link href={postData?.titleLink || "/"}>
            <a className="truncate text-accent max-w-[600px] cursor-pointer hover:underline">
              {postData?.title || "หัวข้อหลัก"}
            </a>
          </Link>
          {/* Edit button */}
          <div className="flex flex-row gap-2 ">
            {user && (
              <div>
                <Modal
                  size="lg"
                  overlayColor="#333"
                  opened={opened}
                  onClose={() => setOpened(false)}
                  title="แก้ไขโพสต์ - หน้าหลัก"
                >
                  <EditPost
                    setOpened={setOpened}
                    postData={postData}
                    handlePostDataChange={HandlePostDataChange}
                  />
                </Modal>

                <Edit
                  onClick={() => setOpened(true)}
                  className="hover:translate-y-[1px] hover:opacity-75 cursor-pointer"
                />
              </div>
            )}
            {/* Show-hide content */}
            <ChevronUp
              size={22}
              onClick={() => setTogle(!toggle)}
              className={`${
                toggle === false ? "rotate-180" : ""
              } cursor-pointer transition-all hover:translate-y-[1px] hover:opacity-75`}
            />
          </div>
        </div>
        {/* Post */}
        <div className="flex flex-col bg-[#aaa] gap-[1px]">
          {toggle ? (
            <Content
              header={postData?.header || "หัวข้อย่อย"}
              headerLink={postData?.headerLink || "/"}
              body={postData?.body || "เนื้อหา"}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
