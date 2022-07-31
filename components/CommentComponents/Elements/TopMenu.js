import React from "react";
import { Avatar, Text } from "@mantine/core";
import Link from "next/link";

export default function TopMenu({ comment }) {
  const timestamp = new Date(comment.createdAt.seconds * 1000);

  const date = timestamp?.toLocaleDateString("th-th", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="absolute p-2">
      <div className="flex flex-row items-center gap-2">
        <Link href={`/${comment.username}`}>
          <Avatar
            radius="xl"
            size="md"
            src={comment?.avatar}
            alt={comment?.username}
            className="cursor-pointer"
          />
        </Link>
        <div className="flex flex-col">
          <Link href={`/${comment.username}`}>
            <Text
              color="red"
              size="sm"
              className="cursor-pointer hover:underline"
            >
              {comment?.username}
            </Text>
          </Link>
          <div className="flex flex-row items-center text-xs gap-2">{date}</div>
        </div>
      </div>
    </div>
  );
}
