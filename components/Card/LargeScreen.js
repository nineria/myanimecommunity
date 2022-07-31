import React from "react";
import { Card, Tooltip } from "@mantine/core";
import { Clock, Star, ThumbUp } from "tabler-icons-react";
import { kFormatter } from "@utils/Calculator";

export default function LargeScreen({ data, badges, date, likes, stars }) {
  return (
    <div className="flex flex-row rounded-sm shadow-md w-full cursor-pointer hover:brightness-90">
      <div className="relative w-[300px] h-[100px] overflow-hidden">
        <Card radius="none" className="bg-foreground rounded-l-sm">
          <Card.Section
            sx={{
              backgroundImage: `url(${data.image})`,
              height: 100,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Card>
      </div>

      <div className="relative flex flex-col gap-2 justify-center bg-foreground px-2 py-2 text-title w-full">
        <div className="absolute top-2 left-2 flex flex-row gap-1 z-10 text-sm">
          {badges}
        </div>
        <Tooltip
          label={data.title}
          position="top"
          placement="start"
          withArrow
          className="absolute top-9 left-2 right-2  z-10"
        >
          <h1 className="truncate font-bold text-base">{data.title}</h1>
        </Tooltip>
        <div className="absolute bottom-4 left-2 flex flex-row justify-start gap-4 text-sm">
          <div className="flex flex-row gap-1 items-center">
            <Clock size={14} className="text-content" />
            <p className="opacity-80">{date}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <ThumbUp size={14} className="text-content" />
            <p className="opacity-80">{kFormatter(likes)}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Star size={14} className="text-content" />
            <p className="opacity-80">{kFormatter(stars)}</p>
          </div>
        </div>
        <div className="absolute right-2 bottom-2">
          <h1 className="text-8xl font-bold tracking-tighter opacity-5 uppercase">
            {data.tag[0]?.label === "คำถาม"
              ? "QUESTION"
              : data.tag[0]?.label === "รีวิว"
              ? "REVIEW"
              : data.tag[0]?.label === "สปอย"
              ? "SPOILER"
              : data.tag[0]?.label === "ข่าวสาร"
              ? "NEWS"
              : "OTHER"}
          </h1>
        </div>
      </div>
    </div>
  );
}
