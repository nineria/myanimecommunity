import React from "react";
// Components
import { Avatar, Stack, Text, ThemeIcon } from "@mantine/core";
// Icons
import { CalendarMinus, ThumbUp } from "tabler-icons-react";
import RichTextEditor from "@components/RichText";

export default function Comment({ data }) {
  return (
    <div className="bg-foreground rounded-sm">
      <div className="flex flex-row ">
        <LeftMenu data={data} />
        <div className="px-[0.5px] bg-white opacity-50"></div>
        <MainPost data={data} />
      </div>
      {/* <BottomComponent /> */}
    </div>
  );
}

function LeftMenu({ data }) {
  const timestamp = new Date(data.createdAt.seconds * 1000);

  const date = timestamp?.toLocaleDateString("th-th", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="px-2 py-4 mt-2">
      <div className="flex flex-col items-center w-[100px] ">
        <Avatar radius="xl" size="lg" src={data?.avatar} alt={data?.username} />
        <Text color="red">{data?.username}</Text>
      </div>
      <div className="flex flex-col mt-4 text-title text-opacity-80">
        <div className="flex flex-row items-center text-xs gap-2">
          <CalendarMinus size={14} />
          <p>: {date}</p>
        </div>
        <div className="flex flex-row items-center text-xs gap-2">
          <ThumbUp size={14} />
          <p>: {data.likes}</p>
        </div>
      </div>
    </div>
  );
}

function MainPost({ data }) {
  const timestamp = new Date(data.updatedAt.seconds * 1000);

  const date = timestamp?.toLocaleDateString("th-th", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative px-2 py-2 text-title text-opacity-90 w-full">
      <p className="text-xs opacity-80 mb-2">แกไขล่าสุด : {date}</p>
      <RichTextEditor
        readOnly
        value={data?.content}
        classNames={{ root: "bg-foreground border-none text-title" }}
      />
      <p className="absolute bottom-2 right-4 leading-none font-bold uppercase opacity-[0.03] text-[8vw] text-right tracking-tighter">
        Answer
      </p>

      <p className="absolute bottom-4 text-xs">
        <div className="flex items-center text-content gap-1 mb-2 border-[1px] border-title border-opacity-10 p-1 rounded-sm">
          <ThemeIcon radius="md" size="xs" color="gray">
            <ThumbUp />
          </ThemeIcon>
          {/* {data?.userLike.map((item, index) => (
            <span
              key={index}
              className="hover:opacity-75 hover:underline cursor-pointer"
            >
              {item},
            </span>
          ))} */}
        </div>
        {/* อ้างอิง / แหล่งที่มา :{" "}
        <a className="text-content hover:underline">{data?.credit}</a> */}
      </p>
    </div>
  );
}
