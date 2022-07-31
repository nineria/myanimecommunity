import React from "react";
import { Avatar, Text } from "@mantine/core";
import Link from "next/link";

export default function LeftMenuAdd({ data }) {
  return (
    <div className="px-2 md:py-4 pb-2 mt-2">
      <div className="flex md:flex-col flex-row gap-2 items-center md:w-[100px]">
        <div className="md:block hidden">
          <Link href={`/${data?.username}`}>
            <Avatar
              radius="xl"
              size="lg"
              src={data?.avatar}
              alt={data?.username}
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div className="md:hidden visible">
          <Link href={`/${data?.username}`}>
            <Avatar
              radius="xl"
              size="md"
              src={data?.avatar}
              alt={data?.username}
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div className="block  md:text-center text-left">
          <Link href={`/${data?.username}`}>
            <Text
              color="red"
              className="md:text-base text-sm cursor-pointer hover:underline"
            >
              {data?.username}
            </Text>
          </Link>
          <p
            className={`${
              data?.rule === "ผู้ดูแลระบบ" ? "text-yellow-400" : "text-title"
            } text-xs`}
          >
            {data?.rule}
          </p>
        </div>
      </div>
    </div>
  );
}
