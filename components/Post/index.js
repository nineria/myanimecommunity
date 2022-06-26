import { Avatar, Badge, Button, Group, Image, Text } from "@mantine/core";
import React from "react";
import { CalendarMinus, Edit, Eye, ThumbUp } from "tabler-icons-react";

export default function Post({ data }) {
  return (
    <div className="bg-foreground rounded-sm">
      {/* Left menu */}
      <div className="flex flex-row ">
        <LeftMenu data={data} />
        <div className="px-[0.5px] bg-white opacity-50" />
        <MainPost data={data} />
      </div>
    </div>
  );
}

function LeftMenu({ data }) {
  const ranks = data.rank.map((item, index) => (
    <Badge
      radius="sm"
      variant="filled"
      color={item.color}
      rightSection={item.icon}
      key={index}
    >
      {item.name}
    </Badge>
  ));

  return (
    <div className="px-2 py-4">
      <div className="flex flex-col items-center w-[100px] ">
        <Avatar radius="xl" size="lg" src={data.photoURL} alt={data.username} />
        <Text color="red">{data.username}</Text>
        <p className="text-title text-xs">Admin</p>
      </div>
      {/* Ranks */}
      <div className="flex flex-col gap-1 mt-4">{ranks}</div>
      <div className="flex flex-col mt-4 text-title text-opacity-80">
        <div className="flex flex-row items-center text-xs gap-2">
          <CalendarMinus size={14} />
          <p>: 15/08/2018</p>
        </div>
        <div className="flex flex-row items-center text-xs gap-2">
          <Eye size={14} />
          <p>: 12.5K</p>
        </div>
        <div className="flex flex-row items-center text-xs gap-2">
          <ThumbUp size={14} />
          <p>: 182K</p>
        </div>
      </div>
    </div>
  );
}

function MainPost({ data }) {
  return (
    <div className="relative px-2 py-2 text-title text-opacity-90">
      <Group position="apart" pb="xs">
        <p className="text-xs opacity-80 mb-2">แก้ไขล่าสุด : 1 พฤภาคม 2022</p>
        <Button
          leftIcon={<Edit size={14} />}
          className="bg-content text-accent hover:bg-content hover:opacity-75"
          variant="default"
          size="xs"
        >
          แก้ไข
        </Button>
      </Group>
      <Image src={data?.postImageURL} />
      <h1 className="text-lg mt-4 font-bold">{data.header}</h1>
      <p className="text-base">{data.body}</p>
      <p className="absolute bottom-2 right-2 font-bold uppercase opacity-5 text-[8vw] text-right tracking-tighter">
        question
      </p>
      <p className="text-xs mt-20">
        อ้างอิง / แหล่งที่มา :{" "}
        <a className="text-content hover:underline">{data.credit}</a>
      </p>
    </div>
  );
}
