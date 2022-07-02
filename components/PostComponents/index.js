import React, { useContext, useEffect, useState } from "react";
// Components
import {
  Avatar,
  Badge,
  Button,
  Group,
  Image,
  Modal,
  Text,
} from "@mantine/core";
import Edit from "./Edit";
// Icons
import {
  CalendarMinus,
  Edit as EditIcon,
  Star,
  ThumbUp,
} from "tabler-icons-react";
import { getUserWithUsername } from "@lib/firebase";
import AuthCheck from "@components/AuthCheck";
import { UserContext } from "@lib/context";
import RichTextEditor from "@components/RichText";

export default function PostComponents({ post, postRef }) {
  return (
    <AuthCheck>
      <div className="bg-foreground rounded-sm">
        {/* Left menu */}
        <div className="flex flex-row">
          {post && <LeftMenu post={post} />}
          <div className="px-[0.5px] bg-white opacity-50" />
          {post && <MainPost post={post} postRef={postRef} />}
        </div>
      </div>
    </AuthCheck>
  );
}

function LeftMenu({ post }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async (post) => {
      const userDoc = await getUserWithUsername(post);
      setUser(userDoc.data());
    };

    getUser(post.username);
  }, [post.username]);

  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt?.toDate();

  const date = createdAt?.toLocaleDateString("th-th", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="px-2 py-4">
      {user && (
        <div className="flex flex-col items-center w-[100px] ">
          <Avatar radius="xl" size="lg" src={user.avatar} alt={user.username} />
          <Text color="red">{user.username}</Text>
          <p
            className={`${
              user.rule === "ผู้ดูแลระบบ" ? "text-yellow-400" : "text-title"
            } text-xs`}
          >
            {user.rule}
          </p>
        </div>
      )}
      {user && (
        <div className="flex flex-col gap-1 mt-4">
          {user.ranks.map((item, index) => (
            <Badge
              radius="sm"
              variant="filled"
              color={item.color}
              // rightSection={item}
              key={index}
              className="shadow-md"
            >
              {item.label}
            </Badge>
          ))}
        </div>
      )}
      <div className="flex flex-col mt-4 text-title text-opacity-80">
        <div className="flex flex-row items-center text-xs gap-2">
          <CalendarMinus size={14} />
          <p>: {date}</p>
        </div>
        <div className="flex flex-row items-center text-xs gap-2">
          <Star size={14} />
          <p>: {post.stars}</p>
        </div>
        <div className="flex flex-row items-center text-xs gap-2">
          <ThumbUp size={14} />
          <p>: {post.likes}</p>
        </div>
      </div>
    </div>
  );
}

function MainPost({ post, postRef }) {
  const [opened, setOpened] = useState(false);

  const { username } = useContext(UserContext);

  const updatedAt =
    typeof post?.updatedAt === "number"
      ? new Date(post.updatedAt)
      : post.updatedAt?.toDate();

  const date = updatedAt?.toLocaleDateString("th-th", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative px-4 py-2 text-title text-opacity-90 w-full">
      <Group position="apart" pb="xs">
        <p className="text-xs opacity-80 mb-2">แก้ไขล่าสุด : {date}</p>
        <Modal
          size="xl"
          classNames={{
            modal: "bg-foreground",
            overlay: "bg-background",
            title: "text-title",
          }}
          opened={opened}
          onClose={() => setOpened(false)}
          title="แก้ไขโพสต์"
        >
          <Edit post={post} postRef={postRef} setOpened={setOpened} />
        </Modal>
        {username === post.username ? (
          <Button
            onClick={() => setOpened(true)}
            leftIcon={<EditIcon size={14} />}
            className="bg-content text-[#fff] hover:bg-content hover:opacity-75"
            variant="default"
            size="xs"
          >
            แก้ไข
          </Button>
        ) : null}
      </Group>
      <Image src={post.image} alt={post.image} my="xs"></Image>
      <RichTextEditor
        readOnly
        value={post.content}
        classNames={{ root: "bg-foreground border-none text-title" }}
      />
      {/* <RichTextEditor className="!p-0 !m-none" readOnly value={data.content} /> */}

      <p className="absolute bottom-2 right-2 font-bold uppercase opacity-[0.03] text-[8vw] text-right tracking-tighter">
        {post.tag[0] === "คำถาม"
          ? "QUESTION"
          : post.tag[0] === "รีวิว"
          ? "REVIEW"
          : post.tag[0] === "สปอย"
          ? "SPOILER"
          : "OTHER"}
      </p>
      <p className="text-xs mt-20">
        อ้างอิง / แหล่งที่มา :{" "}
        <a className="text-content hover:underline">{post.credit}</a>
      </p>
    </div>
  );
}
