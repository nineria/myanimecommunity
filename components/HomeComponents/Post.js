import React, { useState, useContext } from "react";
import Link from "next/link";
// Context
import { UserContext } from "@lib/context";
// Components
import Edit from "./Edit";
import Status from "./PostComponents/Status";
import { Modal } from "@mantine/core";
// Icons
import { ChevronUp, Edit as EditIcon } from "tabler-icons-react";

export default function Post({ dummyData, disabled = false }) {
  const [post, setPost] = useState(dummyData);
  const { user } = useContext(UserContext);

  const [toggle, setTogle] = useState(true);

  const [openMenu, setOpenMenu] = useState(false);

  const [opened, setOpened] = useState(false);

  const HandleOpenMenu = () => {
    return setOpenMenu(!openMenu);
  };

  const HandlePostDataChange = (data) => {
    post = data;
  };

  const updatedAt =
    typeof post?.updatedAt === "number"
      ? new Date(post.updatedAt)
      : post.updatedAt?.toDate();

  const date = updatedAt?.toLocaleDateString("th-th", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="rounded-sm shadow-md">
      <div
        className={`bg-content flex flex-row justify-between items-center transition-all py-1 px-3 font-bold md:text-base text-sm text-[#fff] ${
          toggle === true ? "rounded-t-sm" : "rounded-sm"
        }`}
      >
        {/* Title */}
        <Link href={post?.titleLink || "/"}>
          <a className="truncate text-[#fff] max-w-[600px] cursor-pointer hover:underline">
            {post?.title || "หัวข้อหลัก"}
          </a>
        </Link>
        {/* Edit button */}
        <div className="flex flex-row gap-2 ">
          {user && (
            <div>
              <Modal
                size="lg"
                opened={opened}
                onClose={() => setOpened(false)}
                title="แก้ไขโพสต์ - หน้าหลัก"
                centered
                classNames={{
                  modal: "bg-foreground",
                  overlay: "bg-background",
                  title: "text-title",
                }}
              >
                <Edit
                  setOpened={setOpened}
                  postData={post}
                  handlePostDataChange={HandlePostDataChange}
                />
              </Modal>

              <EditIcon
                onClick={() => {
                  disabled ? null : setOpened(true);
                }}
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
          <Status
            header={post?.header || "หัวข้อย่อย"}
            headerLink={post?.headerLink || "/"}
            body={post?.body || "เนื้อหา"}
            date={date}
          />
        ) : null}
      </div>
    </div>
  );
}
