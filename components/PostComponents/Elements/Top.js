import React from "react";
// Components
import { Badge, Title } from "@mantine/core";
// Icons
import { User } from "tabler-icons-react";

export default function Top({ data }) {
  const tags = data.tag.map((badge, index) => (
    <Badge
      key={index}
      gradient={{ from: badge.color?.from, to: badge.color?.to, deg: 30 }}
      radius="sm"
      variant="gradient"
      className="shadow-md"
    >
      {badge.label}
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
