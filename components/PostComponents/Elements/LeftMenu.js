import React, { useEffect, useState } from "react";
// Components
import { Avatar, Badge, Text } from "@mantine/core";
// Icons
import { CalendarMinus, Star, ThumbUp } from "tabler-icons-react";
import { getUserWithUsername } from "lib/firebase";

import Link from "next/link";

export default function LeftMenu({ post, userRanks, stars, likes }) {
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

  // const stars =

  return (
    <div className="px-2 py-4">
      {user && (
        <div className="flex flex-col items-center w-[100px] ">
          <Link href={`/${user.username}`}>
            <Avatar
              radius="xl"
              size="lg"
              src={user.avatar}
              alt={user.username}
              className="cursor-pointer"
            />
          </Link>
          <Link href={`/${user.username}`}>
            <Text color="red" className="cursor-pointer hover:underline">
              {user.username}
            </Text>
          </Link>
        </div>
      )}
      <div className="flex flex-col gap-1 mt-4">
        {userRanks &&
          userRanks.map((rank, index) => (
            <Badge
              key={index}
              variant="gradient"
              radius="none"
              gradient={{
                from: rank.color.from,
                to: rank.color.to,
                deg: 35,
              }}
              className="shadow-md"
            >
              <p className="drop-shadow-md">{rank.label}</p>
            </Badge>
          ))}
      </div>
      <div className="flex flex-col mt-4 gap-1 text-title text-opacity-80">
        <div className="flex flex-row items-center text-xs gap-1">
          <CalendarMinus size={14} /> : <p> {date}</p>
        </div>
        <div className="flex flex-row items-center text-xs gap-1">
          <Star size={14} /> : <p> {stars}</p>
        </div>
        <div className="flex flex-row items-center text-xs gap-1">
          <ThumbUp size={14} /> : <p> {likes}</p>
        </div>
      </div>
    </div>
  );
}
