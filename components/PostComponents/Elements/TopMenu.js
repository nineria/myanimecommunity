import React, { useEffect, useState } from "react";
// Components
import { Avatar, Badge, Text } from "@mantine/core";
// Icons
import { CalendarMinus, Star, ThumbUp } from "tabler-icons-react";
import { getUserWithUsername } from "lib/firebase";

import Link from "next/link";

export default function TopMenu({ post, userRanks, stars, likes }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async (post) => {
      const userDoc = await getUserWithUsername(post);
      setUser(userDoc.data());
    };

    getUser(post.username);
  }, [post.username]);

  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt?.toDate();

  const date = createdAt?.toLocaleDateString("th-th", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="px-2 py-4">
      {user && (
        <div className="flex flex-row flex-wrap justify-around items-center w-full">
          <Link href={`/${user.username}`}>
            <Avatar
              radius="xl"
              size="lg"
              src={user.avatar}
              alt={user.username}
              className="border-2 border-title cursor-pointer"
            />
          </Link>
          <div className="flex flex-col ml-4 ">
            <Link href={`/${user.username}`}>
              <Text color="red" className="cursor-pointer hover:underline">
                {user.username}
              </Text>
            </Link>
            <p
              className={`${
                user.rule === "ผู้ดูแลระบบ" ? "text-yellow-400" : "text-title"
              } text-xs`}
            >
              {user.rule}
            </p>
          </div>
          {userRanks && (
            <div className="flex flex-col gap-1 mt-4 ml-4">
              {userRanks.map((item, index) => (
                <Badge
                  radius="none"
                  variant="gradient"
                  gradient={{
                    from: item.color.from,
                    to: item.color.to,
                    deg: 35,
                  }}
                  key={index}
                  className="shadow-md w-full"
                >
                  {item.label}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-row justify-around mt-4 text-title text-opacity-80">
        <div className="flex flex-row flex-wrap items-center text-xs gap-2">
          <CalendarMinus size={14} /> สร้าง : {date}
        </div>
        <div className="flex flex-row flex-wrap items-center text-xs gap-2">
          <Star size={14} /> คะแนน : {stars} ดาว
        </div>
        <div className="flex flex-row flex-wrap items-center text-xs gap-2">
          <ThumbUp size={14} />
          ถูกใจ : {likes} คน
        </div>
      </div>
    </div>
  );
}
