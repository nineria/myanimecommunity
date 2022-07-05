import React from "react";
// Components
import { Badge, Title } from "@mantine/core";
// Icons
import { User } from "tabler-icons-react";

export default function Top({ data }) {
  const tags = data.tag.map((item, index) => (
    <Badge
      key={index}
      variant="gradient"
      gradient={
        item === "คำถาม"
          ? { from: "indigo", to: "cyan" }
          : item === "รีวิว"
          ? { from: "teal", to: "lime" }
          : item === "ข่าวสาร"
          ? { from: "orange", to: "red" }
          : { from: "gray", to: "gray" }
      }
      radius="sm"
      color="red"
      className="min-w-fit"
    >
      {item}
    </Badge>
  ));

  const genres = data.genre.map((item, index) => (
    <Badge key={index} color="gray" size="xs" radius="sm" variant="filled">
      {item}
    </Badge>
  ));

  return (
    <div className="text-title">
      <div className="flex flex-warp gap-2 items-center mb-2">
        {tags}
        <Title className="truncate" order={4}>
          {data.title}
        </Title>
      </div>
      <div className="flex flex-wrap items-center gap-2 ">
        <div className="flex flex-row items-center gap-1 text-sm">
          <User size={14} />
          {data.username}
        </div>
        {genres}
      </div>
    </div>
  );
}
