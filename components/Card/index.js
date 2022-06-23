import { AspectRatio, Badge, Image } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import { Clock, Star, ThumbUp } from "tabler-icons-react";

export default function Card({ property, layout }) {
  const [data, setData] = useState(property);

  return (
    <Link href="/post">
      {layout === "grid" ? (
        <AspectRatio ratio={16 / 9}>
          <div className="relative flex flex-col rounded-sm shadow-md cursor-pointer hover:brightness-90">
            <Image className="h-full" src={data.imageUrl} alt={data.title} />
            <div className="absolute bottom-14 left-2 flex flex-row gap-1 z-10 text-sm shadow-md">
              {data.badges.map((item, index) => (
                <Badge
                  key={index}
                  color={item.color}
                  radius="sm"
                  variant="filled"
                >
                  {item.name}
                </Badge>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-foreground px-2 py-2 text-title h-[65px]">
              <h1 className="truncate font-bold md:text-base text-sm opacity-80">
                {data.title}
              </h1>
              <div className="flex flex-row justify-start gap-4 md:text-sm text-xs">
                <div className="flex flex-row gap-1 items-center">
                  <Clock size={14} className="text-content" />
                  <p className="opacity-80">{data.date}</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <ThumbUp size={14} className="text-content" />
                  <p className="opacity-80">{data.like}</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <Star size={14} className="text-content" />
                  <p className="opacity-80">{data.star}</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-1 right-2">
              <h1 className="text-6xl font-bold opacity-5 uppercase">
                {data.postType}
              </h1>
            </div>
          </div>
        </AspectRatio>
      ) : (
        <div>
          <div className="md:flex md:visible hidden w-full">
            <ScreenLarge data={data} />
          </div>
          <div className="md:hidden visible w-full">
            <ScreenSmall data={data} />
          </div>
        </div>
      )}
    </Link>
  );
}

function ScreenSmall({ data }) {
  return (
    <div className="relative flex flex-col rounded-sm shadow-md cursor-pointer hover:brightness-90">
      <Image className="rounded-sm" src={data.imageUrl} alt={data.title} />
      <div className="absolute bottom-14 left-2 flex flex-row gap-1 z-10 text-sm shadow-md">
        {data.badges.map((item, index) => (
          <Badge key={index} color={item.color} radius="sm" variant="filled">
            {item.name}
          </Badge>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-foreground px-2 py-2 text-title">
        <h1 className="truncate font-bold ">{data.title}</h1>
        <div className="flex flex-row justify-start gap-4">
          <div className="flex flex-row gap-1 items-center">
            <Clock size={20} className="text-content" />
            <p className="opacity-80">{data.date}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <ThumbUp size={20} className="text-content" />
            <p className="opacity-80">{data.like}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Star size={20} className="text-content" />
            <p className="opacity-80">{data.star}</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-1 right-2">
        <h1 className="text-6xl font-bold opacity-5 uppercase">
          {data.postType}
        </h1>
      </div>
    </div>
  );
}

function ScreenLarge({ data }) {
  return (
    <div className="flex flex-row rounded-sm shadow-md w-full cursor-pointer hover:brightness-90">
      <div className="w-[300px] h-[100px] overflow-hidden ">
        <Image className="rounded-sm" src={data.imageUrl} alt={data.title} />
      </div>

      <div className="relative flex flex-col gap-2 justify-center bg-foreground px-2 py-2 text-title w-full">
        <div className="flex flex-row gap-1 z-10 text-sm">
          {data.badges.map((item, index) => (
            <Badge key={index} color={item.color} radius="sm" variant="filled">
              {item.name}
            </Badge>
          ))}
        </div>
        <h1 className="truncate font-bold opacity-80 md:max-w-[500px] lg:max-w-[700px]">
          {data.title}
        </h1>
        <div className="flex flex-row justify-start gap-4 text-title text-sm">
          <div className="flex flex-row gap-1 items-center">
            <Clock size={20} className="text-content" />
            <p className="opacity-80">{data.date}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <ThumbUp size={20} className="text-content" />
            <p className="opacity-80">{data.like}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Star size={20} className="text-content" />
            <p className="opacity-80">{data.star}</p>
          </div>
        </div>
        <div className="absolute right-2 bottom-2">
          <h1 className="text-8xl font-bold opacity-5 uppercase">
            {data.postType}
          </h1>
        </div>
      </div>
    </div>
  );
}
