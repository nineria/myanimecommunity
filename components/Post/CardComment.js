import { Avatar, Badge, Divider, Image, Stack, Text } from "@mantine/core";
import { data } from "autoprefixer";
import React from "react";
import { CalendarMinus, Eye, ThumbUp } from "tabler-icons-react";

export default function CardComment({ data }) {
  return (
    <div className="bg-foreground rounded-sm">
      {/* Left menu */}
      <div className="flex flex-row ">
        <LeftMenu data={data} />
        <div className="px-[0.5px] bg-white opacity-50"></div>
        <MainPost data={data} />
      </div>
    </div>
  );
}

function LeftMenu({ data }) {
  return (
    <div className="px-2 py-4 mt-2">
      <div className="flex flex-col items-center w-[150px] ">
        <Avatar radius="xl" size="lg" src={data.photoURL} alt={data.username} />
        <Text color="red">{data.username}</Text>
        <p className="text-title text-xs">Admin</p>
      </div>
      {/* Ranks */}
      <div className="flex flex-col gap-1 mt-4">
        {data.rank.map((item, index) => (
          <Badge
            radius="sm"
            variant="filled"
            color={item.color}
            rightSection={item.icon}
            key={index}
          >
            {item.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function MainPost({ data }) {
  return (
    <div className="relative px-2 py-2 text-title text-opacity-90">
      <p className="text-xs opacity-80 mb-2">แกไขล่าสุด : 1 พฤภาคม 2022</p>
      <h1 className="text-lg mt-4 font-bold">{data?.header}</h1>
      <p className="text-base">{data?.body}</p>
      <p className="absolute bottom-2 right-2 leading-none font-bold uppercase opacity-5 text-[8vw] text-right tracking-tighter">
        Answer
      </p>

      <p className="absolute bottom-4 text-xs">
        <div className="flex items-center text-content gap-1 mb-2 border-2 border-title border-opacity-10 p-1 rounded-sm">
          <ThumbUp size={14} color="cyan" />
          {data?.userLike.map((item, index) => (
            <span
              key={index}
              className="hover:opacity-75 hover:underline cursor-pointer"
            >
              {item},
            </span>
          ))}
        </div>
        อ้างอิง / แหล่งที่มา :{" "}
        <a className="text-content hover:underline">{data?.credit}</a>
      </p>
    </div>
  );
}
