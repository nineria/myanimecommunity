import React, { useEffect, useState } from "react";
import Link from "next/link";
// Components
import { AspectRatio, Badge, Image, Tooltip } from "@mantine/core";
// Icons
import { Clock, Star, ThumbUp } from "tabler-icons-react";
import { kFormatter } from "@components/Calculator";

export default function Card({ posts, layout }) {
  const [data, setData] = useState(posts);

  useEffect(() => {
    setData(posts);
  }, [posts]);

  const createdAt =
    typeof data?.createdAt === "number"
      ? new Date(data.createdAt)
      : data?.createdAt.toDate();

  const date = createdAt?.toLocaleDateString("th-th", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const badges = data.tag.map((badge) => (
    <Badge
      key={badge}
      gradient={
        badge === "คำถาม"
          ? { from: "indigo", to: "cyan" }
          : badge === "รีวิว"
          ? { from: "teal", to: "lime" }
          : badge === "ข่าวสาร"
          ? { from: "orange", to: "red" }
          : badge === "สปอย"
          ? { from: "red", to: "red" }
          : { from: "gray", to: "gray" }
      }
      radius="sm"
      variant="gradient"
      className="shadow-md"
    >
      {badge}
    </Badge>
  ));

  return (
    <Link href={`posts/${data.username}/${data.slug}`}>
      {layout === "grid" ? (
        <AspectRatio ratio={16 / 9}>
          <div className="relative flex flex-col rounded-sm shadow-md cursor-pointer hover:brightness-90">
            <Image
              className="w-full h-full"
              src={data.image}
              alt={data.title}
            />
            <div className="absolute bottom-14 left-2 flex flex-row gap-1 z-10 text-sm">
              {badges}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-foreground px-2 py-3 text-title h-[65px]">
              <h1 className="truncate font-bold text-base opacity-80 z-20">
                {data.title}
              </h1>

              <div className="flex flex-row justify-start gap-4 text-sm">
                <div className="flex flex-row gap-1 items-center">
                  <Clock size={14} className="text-content" />
                  <p className="opacity-80">{date}</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <ThumbUp size={14} className="text-content" />
                  <p className="opacity-80">{kFormatter(data.likes)}</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <Star size={14} className="text-content" />
                  <p className="opacity-80">{kFormatter(data.stars)}</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-1 right-2">
              <h1 className="text-6xl text-title tracking-tighter font-bold opacity-5 uppercase">
                {data.tag[0] === "คำถาม"
                  ? "QUESTION"
                  : data.tag[0] === "รีวิว"
                  ? "REVIEW"
                  : data.tag[0] === "สปอย"
                  ? "SPOILER"
                  : "OTHER"}
              </h1>
            </div>
          </div>
        </AspectRatio>
      ) : (
        <div>
          <div className="md:flex md:visible hidden w-full">
            <ScreenLarge data={data} badges={badges} date={date} />
          </div>
          <div className="md:hidden visible w-full">
            <ScreenSmall data={data} badges={badges} date={date} />
          </div>
        </div>
      )}
    </Link>
  );
}

function ScreenSmall({ data, badges, date }) {
  return (
    <AspectRatio ratio={16 / 9}>
      <div className="relative flex flex-col rounded-sm shadow-md cursor-pointer hover:brightness-90">
        <Image className="w-full h-full" src={data.image} alt={data.title} />
        <div className="absolute bottom-14 left-2 flex flex-row gap-1 z-10 text-sm">
          {badges}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-foreground px-2 py-2 text-title h-[65px]">
          <h1 className="truncate font-bold text-base opacity-80">
            {data.title}
          </h1>
          <div className="flex flex-row justify-start gap-4 text-sm">
            <div className="flex flex-row gap-1 items-center">
              <Clock size={14} className="text-content" />
              <p className="opacity-80">{date}</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <ThumbUp size={14} className="text-content" />
              <p className="opacity-80">{kFormatter(data.likes)}</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <Star size={14} className="text-content" />
              <p className="opacity-80">{kFormatter(data.stars)}</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-1 right-2">
          <h1 className="text-6xl text-title font-bold tracking-tighter opacity-5 uppercase">
            {data.tag[0] === "คำถาม"
              ? "QUESTION"
              : data.tag[0] === "รีวิว"
              ? "REVIEW"
              : data.tag[0] === "สปอย"
              ? "SPOILER"
              : "OTHER"}
          </h1>
        </div>
      </div>
    </AspectRatio>
  );
}

function ScreenLarge({ data, badges, date }) {
  return (
    <div className="flex flex-row rounded-sm shadow-md w-full cursor-pointer hover:brightness-90">
      <div className="w-[300px] h-[100px] overflow-hidden ">
        <Image className="rounded-sm" src={data.image} alt={data.title} />
      </div>

      <div className="relative flex flex-col gap-2 justify-center bg-foreground px-2 py-2 text-title w-full">
        <div className="flex flex-row gap-1 z-10 text-sm">{badges}</div>
        <h1 className="truncate font-bold opacity-80 text-base md:max-w-[500px] lg:max-w-[700px]">
          {data.title}
        </h1>
        <div className="flex flex-row justify-start gap-4 text-sm">
          <div className="flex flex-row gap-1 items-center">
            <Clock size={14} className="text-content" />
            <p className="opacity-80">{date}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <ThumbUp size={14} className="text-content" />
            <p className="opacity-80">{kFormatter(data.likes)}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Star size={14} className="text-content" />
            <p className="opacity-80">{kFormatter(data.stars)}</p>
          </div>
        </div>
        <div className="absolute right-2 bottom-2">
          <h1 className="text-8xl font-bold tracking-tighter opacity-5 uppercase">
            {data.tag[0] === "คำถาม"
              ? "QUESTION"
              : data.tag[0] === "รีวิว"
              ? "REVIEW"
              : data.tag[0] === "สปอย"
              ? "SPOILER"
              : "OTHER"}
          </h1>
        </div>
      </div>
    </div>
  );
}
