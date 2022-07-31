import React from "react";
import { Avatar, Text } from "@mantine/core";
import { CalendarMinus } from "tabler-icons-react";
import Link from "next/link";

export default function LeftMenu({ comment }) {
  const timestamp = new Date(comment.createdAt.seconds * 1000);

  const date = timestamp?.toLocaleDateString("th-th", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="px-2 py-4 mt-2">
      <div className="flex flex-col items-center w-[100px] ">
        <Link href={`/${comment.username}`}>
          <Avatar
            radius="xl"
            size="lg"
            src={comment?.avatar}
            alt={comment?.username}
            className="cursor-pointer"
          />
        </Link>
        <Link href={`/${comment.username}`}>
          <Text color="red" className="cursor-pointer hover:underline">
            {comment?.username}
          </Text>
        </Link>
      </div>
      <div className="flex flex-col mt-4 text-title text-opacity-80">
        <div className="flex flex-row items-center text-xs gap-2">
          <CalendarMinus size={14} />
          <p>: {date}</p>
        </div>
      </div>
    </div>
  );
}
