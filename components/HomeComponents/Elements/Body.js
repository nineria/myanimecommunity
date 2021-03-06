import React, { useState, useContext } from "react";
import Link from "next/link";
// Context
import { UserContext } from "lib/context";
// Components
import Edit from "../Edit";
import Status from "./Status";
import { Modal } from "@mantine/core";
// Icons
import { ChevronUp, Edit as EditIcon } from "tabler-icons-react";
import AdminCheck from "hooks/AdminCheck";

export default function Body({ today, homePosts, disabled }) {
  const { user } = useContext(UserContext);

  const [toggle, setTogle] = useState(true);

  const [opened, setOpened] = useState(false);

  const updatedAt =
    typeof homePosts?.updatedAt === "number"
      ? new Date(homePosts.updatedAt)
      : homePosts?.updatedAt?.toDate();

  const date = updatedAt?.toLocaleDateString("th-th", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const todaysPosts =
    today &&
    homePosts.map((item, index) => {
      const regex = /(<([^>]+)>)/gi;
      const description = item.content.replace(regex, "");
      const link = `posts/${item.username}/${item.slug}`;

      const updatedAt =
        typeof item?.updatedAt === "number"
          ? new Date(item.updatedAt)
          : item?.updatedAt?.toDate();

      const date = updatedAt?.toLocaleDateString("th-th", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return (
        <Status
          key={index}
          header={item?.title || "หัวข้อย่อย"}
          headerLink={item?.headerLink || link}
          body={item?.body || description}
          date={date}
          disabled={disabled}
          post={{
            posts: {
              length: 1,
            },
            comments: {
              length: 1,
            },
          }}
        />
      );
    });

  return (
    <div className="rounded-sm shadow-md">
      <div
        className={`bg-content flex flex-row justify-between items-center transition-all py-1 px-3 font-bold md:text-base text-sm text-[#fff] ${
          toggle === true ? "rounded-t-sm" : "rounded-sm"
        }`}
      >
        {/* Title */}
        <Link href={homePosts?.titleLink || "/"}>
          <a className="truncate text-[#fff] max-w-[600px] cursor-pointer hover:underline">
            {today ? "โพสต์ใหม่วันนี้" : homePosts?.title || "หัวข้อหลัก"}
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
                closeOnClickOutside={false}
                title="แก้ไขโพสต์ - หน้าหลัก"
                centered
                classNames={{
                  modal: "bg-foreground",
                  overlay: "bg-background",
                  title: "text-title",
                }}
              >
                <Edit setOpened={setOpened} postData={homePosts} />
              </Modal>
              {!disabled && !today && (
                <AdminCheck>
                  <EditIcon
                    onClick={() => setOpened(true)}
                    className="hover:translate-y-[1px] hover:opacity-75 cursor-pointer"
                  />
                </AdminCheck>
              )}
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

      {today ? (
        <div className="flex flex-col bg-[#aaa] gap-[1px]">
          {toggle && todaysPosts}
        </div>
      ) : (
        <div className="flex flex-col bg-[#aaa] gap-[1px]">
          {toggle && (
            <Status
              header={homePosts?.title || "หัวข้อย่อย"}
              headerLink={homePosts?.headerLink || "/"}
              body={homePosts?.body || "เนื้อหา"}
              date={date}
              disabled={disabled}
              post={{
                posts: {
                  length: 1,
                },
                comments: {
                  length: 1,
                },
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
