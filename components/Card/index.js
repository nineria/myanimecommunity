import { Image, AspectRatio, Badge } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Clock, Eye, Star, ThumbUp } from "tabler-icons-react";

export default function Card({ property, layout }) {
  const [data, setData] = useState(property);

  return (
    <div>
      {layout === "grid" ? (
        <AspectRatio ratio={16 / 9}>
          <div className="relative flex flex-col rounded-sm shadow-md border-2 border-transparent hover:border-red-500 hover:brightness-110 cursor-pointer">
            <Image
              className="rounded-sm"
              src={data.imageUrl}
              alt={data.title}
              boxSize={{ sm: "800px", md: "500px" }}
            />
            <div className="absolute bottom-14 left-2 flex flex-row gap-1 z-10 text-sm shadow-md">
              {data.badges.map((item, index) => (
                <Badge key={index} variant="solid" colorScheme={item.color}>
                  {item.name}
                </Badge>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-[#242629] px-2 py-2">
              <h1 className="truncate font-bold">{data.title}</h1>
              <div className="flex flex-row justify-start gap-4 text-gray-400">
                <div className="flex flex-row gap-1 items-center">
                  <Clock size={20} className="text-red-500" />
                  <p>{data.date}</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <ThumbUp size={20} className="text-red-500" />
                  <p>{data.like}</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <Star size={20} className="text-red-500" />
                  <p>{data.star}</p>
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
    </div>
  );
}

function ScreenSmall({ data }) {
  return (
    <div className="relative flex flex-col rounded-sm shadow-md border-2 border-transparent hover:border-red-500 hover:brightness-110 cursor-pointer">
      <Image className="rounded-sm" src={data.imageUrl} alt={data.title} />
      <div className="absolute bottom-14 left-2 flex flex-row gap-1 z-10 text-sm shadow-md">
        {data.badges.map((item, index) => (
          <Badge key={index} variant="solid" colorScheme={item.color}>
            {item.name}
          </Badge>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-[#242629] px-2 py-2">
        <h1 className="truncate font-bold ">{data.title}</h1>
        <div className="flex flex-row justify-start gap-4 text-gray-400">
          <div className="flex flex-row gap-1 items-center">
            <Clock size={20} className="text-red-500" />
            <p>{data.date}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <ThumbUp size={20} className="text-red-500" />
            <p>{data.like}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Star size={20} className="text-red-500" />
            <p>{data.star}</p>
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
    <div className="flex flex-row rounded-sm shadow-md  border-2 w-full border-transparent hover:border-red-500 hover:brightness-110 cursor-pointer ">
      <div className="w-[300px] h-[100px] overflow-hidden ">
        <Image className="rounded-sm" src={data.imageUrl} alt={data.title} />
      </div>

      <div className="relative flex flex-col gap-2 justify-center bg-[#242629] px-2 py-2  w-full">
        <div className="flex flex-row gap-1 z-10 text-sm">
          {data.badges.map((item, index) => (
            <Badge key={index} variant="solid" colorScheme={item.color}>
              {item.name}
            </Badge>
          ))}
        </div>
        <h1 className="truncate font-bold md:max-w-[500px] lg:max-w-[700px]">
          {data.title}
        </h1>
        <div className="flex flex-row justify-start gap-4 text-white text-opacity-50 text-sm">
          <div className="flex flex-row gap-1 items-center">
            <Clock size={20} className="text-red-500" />
            <p>{data.date}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <ThumbUp size={20} className="text-red-500" />
            <p>{data.like}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Star size={20} className="text-red-500" />
            <p>{data.star}</p>
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
