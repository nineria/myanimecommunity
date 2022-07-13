import React, { useContext, useEffect, useState } from "react";
// Components
import {
  Avatar,
  Badge,
  Button,
  Group,
  Image,
  Modal,
  Space,
  Text,
} from "@mantine/core";
import Edit from "./Edit";
// Icons
import {
  AlertTriangle,
  ArrowBackUp,
  CalendarMinus,
  Edit as EditIcon,
  Star,
  ThumbUp,
  Trash,
  X,
} from "tabler-icons-react";
import { getUserWithUsername } from "@lib/firebase";
import AuthCheck from "@components/AuthCheck";
import RichTextEditor from "@components/RichText";
import AuthorCheck from "@components/AuthorCheck";
import AdminCheck from "@components/AdminCheck";
import { UserContext } from "@lib/context";

export default function PostComponents({ post, postRef }) {
  return (
    <div className="bg-foreground rounded-sm">
      {/* Left menu */}
      <div className="flex flex-row">
        {post && <LeftMenu post={post} />}
        <div className="px-[0.5px] bg-white opacity-50" />
        {post && <MainPost post={post} postRef={postRef} />}
      </div>
    </div>
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

  const { user } = useContext(UserContext);

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
        {post.createdAt?.seconds !== post.updatedAt?.seconds ? (
          <p className="text-xs opacity-80 mb-2">แก้ไขล่าสุด : {date}</p>
        ) : (
          <div />
        )}
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
        <Group spacing="xs">
          <AuthorCheck username={post.username}>
            <Button
              onClick={() => setOpened(true)}
              leftIcon={<EditIcon size={14} />}
              compact
              className="bg-foreground text-title hover:bg-content hover:text-[#fff]"
              variant="default"
              size="xs"
            >
              แก้ไข
            </Button>
          </AuthorCheck>
          {user && (
            <AdminCheck>
              <Button
                leftIcon={<Trash size={14} />}
                compact
                className="bg-red-500 text-[#fff] hover:bg-red-500 hover:opacity-75"
                variant="default"
                size="xs"
              >
                ลบเนื้อหา
              </Button>
            </AdminCheck>
          )}
        </Group>
      </Group>
      <Image src={post.image} alt={post.image} my="xs"></Image>
      <RichTextEditor
        readOnly
        value={post.content}
        classNames={{ root: "bg-foreground border-none text-title" }}
      />
      <Space h="50px" />
      <p className="absolute bottom-20 right-4 font-bold leading-none uppercase opacity-[0.03] text-[7vw] text-right tracking-tighter">
        {post.tag[0] === "คำถาม"
          ? "QUESTION"
          : post.tag[0] === "รีวิว"
          ? "REVIEW"
          : post.tag[0] === "สปอย"
          ? "SPOILER"
          : post.tag[0] === "ข่าวสาร"
          ? "NEWS"
          : "OTHER"}
      </p>
      <p className="text-xs ">
        อ้างอิง / แหล่งที่มา :{" "}
        <a className="text-content hover:underline">{post.credit}</a>
      </p>
      <AuthCheck fallback={<div />}>
        <Group position="apart" className="text-xs" my="xs">
          <div className="flex flex-row gap-1 items-end hover:underline cursor-pointer ">
            <AlertTriangle size={14} />
            รายงานโพสต์
          </div>
          <Group position="right">
            {/* <Like postRef={postRef} /> */}
            <div className="flex flex-row gap-1 items-end hover:underline cursor-pointer ">
              <ThumbUp size={14} />
              ถูกใจ
            </div>
            <div className="flex flex-row gap-1 items-end hover:underline cursor-pointer ">
              <ArrowBackUp size={14} />
              ตอบกลับ
            </div>
          </Group>
        </Group>
      </AuthCheck>
    </div>
  );
}
