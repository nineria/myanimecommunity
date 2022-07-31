import React from "react";
import { AspectRatio, Image, Tooltip } from "@mantine/core";
import { Clock, Star, ThumbUp } from "tabler-icons-react";
import { kFormatter } from "utils/Calculator";

export default function SmallScreen({ data, badges, date, likes, stars }) {
  return (
    <AspectRatio ratio={16 / 9}>
      <div className="relative flex flex-col rounded-sm shadow-md cursor-pointer hover:brightness-90">
        <Image className="mb-16" src={data.image} alt={data.title} />
        <div className="absolute bottom-14 left-2 flex flex-row gap-1 z-10 text-sm">
          {badges}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-foreground px-2 py-2 text-title h-[65px]">
          <Tooltip
            label={data.title}
            position="top"
            withArrow
            className="absolute top-3 left-2 right-2  z-10"
          >
            <h1 className="truncate font-bold text-base">{data.title}</h1>
          </Tooltip>
          <div className="absolute top-10 left-2 flex flex-row justify-start gap-4 text-sm">
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
        </div>
        <div className="absolute bottom-1 right-2">
          <h1 className="text-6xl text-title font-bold tracking-tighter opacity-5 uppercase">
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
    </AspectRatio>
  );
}
