import React, { useEffect, useState } from "react";
import Link from "next/link";
// Components
import {
  AspectRatio,
  Badge,
  Image,
  Tooltip,
  Card as CardSection,
} from "@mantine/core";
// Icons
import { Clock, Star, ThumbUp } from "tabler-icons-react";
import { kFormatter } from "utils/Calculator";
import { firestore } from "lib/firebase";

export default function Card({ posts, layout }) {
  const [data, setData] = useState(posts);
  const [stars, setStars] = useState();
  const [likes, setLikes] = useState();

  useEffect(() => {
    const average = (array) => array.reduce((a, b) => a + b) / array.length;

    const getStars = async () => {
      const userStatistics = firestore
        .collection("users")
        .doc(posts.uid)
        .collection("posts")
        .doc(posts.slug)
        .collection("stars");

      const userStatisticsPosts = await (
        await userStatistics.get()
      ).docs.map((data) => data.data());

      const starsArray = userStatisticsPosts.map((stars) => stars.stars);

      if (starsArray.length === 0) setStars(0);
      else setStars(average(starsArray));
    };

    const getLikes = async () => {
      const userStatistics = firestore
        .collection("users")
        .doc(posts.uid)
        .collection("posts")
        .doc(posts.slug)
        .collection("likes");

      const userStatisticsPosts = await (
        await userStatistics.get()
      ).docs.map((data) => data.data());

      if (userStatisticsPosts.length === 0) setLikes(0);
      else setLikes(userStatisticsPosts.length);
    };

    getStars();
    getLikes();
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

  const badges = data.tag.map((badge, index) => (
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

  return (
    <Link href={`posts/${data.username}/${data.slug}`}>
      {layout === "grid" ? (
        <AspectRatio ratio={16 / 9}>
          <div className="relative flex flex-col rounded-sm shadow-md cursor-pointer hover:brightness-90">
            <Image
              className="h-full w-full mb-16"
              src={data.image}
              alt={data.title}
            />
            <div className="absolute bottom-14 left-2 flex flex-row gap-1 z-10 text-sm">
              {badges}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-foreground px-2 py-3 text-title h-[65px]">
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
              <h1 className="text-6xl text-title tracking-tighter font-bold opacity-5 uppercase">
                {data.tag[0] === "คำถาม"
                  ? "QUESTION"
                  : data.tag[0] === "รีวิว"
                  ? "REVIEW"
                  : data.tag[0] === "สปอย"
                  ? "SPOILER"
                  : data.tag[0] === "ข่าวสาร"
                  ? "NEWS"
                  : "OTHER"}
              </h1>
            </div>
          </div>
        </AspectRatio>
      ) : (
        <div>
          <div className="md:flex md:visible hidden w-full">
            <ScreenLarge
              data={data}
              badges={badges}
              date={date}
              likes={likes}
              stars={stars}
            />
          </div>
          <div className="md:hidden visible w-full">
            <ScreenSmall
              data={data}
              badges={badges}
              date={date}
              likes={likes}
              stars={stars}
            />
          </div>
        </div>
      )}
    </Link>
  );
}

function ScreenSmall({ data, badges, date, likes, stars }) {
  return (
    <AspectRatio ratio={16 / 9}>
      <div className="relative flex flex-col rounded-sm shadow-md cursor-pointer hover:brightness-90">
        <Image
          className="h-full w-full mb-16"
          src={data.image}
          alt={data.title}
        />
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
            {data.tag[0] === "คำถาม"
              ? "QUESTION"
              : data.tag[0] === "รีวิว"
              ? "REVIEW"
              : data.tag[0] === "สปอย"
              ? "SPOILER"
              : data.tag[0] === "ข่าวสาร"
              ? "NEWS"
              : "OTHER"}
          </h1>
        </div>
      </div>
    </AspectRatio>
  );
}

function ScreenLarge({ data, badges, date, likes, stars }) {
  return (
    <div className="flex flex-row rounded-sm shadow-md w-full cursor-pointer hover:brightness-90">
      <div className="relative w-[300px] h-[100px] overflow-hidden">
        {/* <Image
          className="absolute bottom-0"
          src={data.image}
          alt={data.title}
        /> */}
        <CardSection radius="none" className="bg-foreground rounded-l-sm">
          <CardSection.Section
            sx={{
              backgroundImage: `url(${data.image})`,
              height: 100,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </CardSection>
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
            {data.tag[0] === "คำถาม"
              ? "QUESTION"
              : data.tag[0] === "รีวิว"
              ? "REVIEW"
              : data.tag[0] === "สปอย"
              ? "SPOILER"
              : data.tag[0] === "ข่าวสาร"
              ? "NEWS"
              : "OTHER"}
          </h1>
        </div>
      </div>
    </div>
  );
}
