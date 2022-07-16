import React, { useContext, useEffect, useState } from "react";
// Components
import {
  Avatar,
  Button,
  Group,
  Modal,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
// Icons
import {
  AlertTriangle,
  CalendarMinus,
  Edit,
  ThumbUp,
  Trash,
} from "tabler-icons-react";
import RichTextEditor from "@components/RichText";
import { getUserWithUsername } from "@lib/firebase";
import EditComment from "./EditComment";
import { UserContext } from "@lib/context";
import AuthorCheck from "@components/AuthorCheck";
import AdminCheck from "@components/AdminCheck";
import AuthCheck from "@components/AuthCheck";

export default function Comment({ post, comment }) {
  const [commentRef, setCommentRef] = useState();

  useEffect(() => {
    const getComments = async () => {
      const userDoc = await getUserWithUsername(post.username);
      const comments = await userDoc.ref
        .collection("posts")
        .doc(post.slug)
        .collection("comments")
        .doc(comment.slug);

      setCommentRef(comments);
    };

    getComments();
  }, [post, comment]);

  return (
    <div className="bg-foreground rounded-sm">
      <PostLayout>
        {post && <LeftMenu comment={comment} />}
        {post && <TopMenu comment={comment} />}
        {post && (
          <MainPost comment={comment} commentRef={commentRef} post={post} />
        )}
      </PostLayout>
    </div>
  );
}

function PostLayout(props) {
  return (
    <div>
      <div className="md:flex flex-row hidden">
        {props.children[0]}
        <div className="px-[0.5px] bg-white opacity-50" />
        {props.children[2]}
      </div>

      <div className="flex md:hidden flex-col">
        {props.children[1]}
        {props.children[2]}
      </div>
    </div>
  );
}

function LeftMenu({ comment }) {
  const timestamp = new Date(comment.createdAt.seconds * 1000);

  const date = timestamp?.toLocaleDateString("th-th", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="px-2 py-4 mt-2">
      <div className="flex flex-col items-center w-[100px] ">
        <Avatar
          radius="xl"
          size="lg"
          src={comment?.avatar}
          alt={comment?.username}
        />
        <Text color="red">{comment?.username}</Text>
      </div>
      <div className="flex flex-col mt-4 text-title text-opacity-80">
        <div className="flex flex-row items-center text-xs gap-2">
          <CalendarMinus size={14} />
          <p>: {date}</p>
        </div>
        <div className="flex flex-row items-center text-xs gap-2">
          <ThumbUp size={14} />
          <p>: {comment.likes}</p>
        </div>
      </div>
    </div>
  );
}

function TopMenu({ comment }) {
  const timestamp = new Date(comment.createdAt.seconds * 1000);

  const date = timestamp?.toLocaleDateString("th-th", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="absolute p-2">
      <div className="flex flex-row items-center gap-2">
        <Avatar
          radius="xl"
          size="md"
          src={comment?.avatar}
          alt={comment?.username}
        />
        <div className="flex flex-col">
          <Text color="red" size="sm">
            {comment?.username}
          </Text>
          <div className="flex flex-row items-center text-xs gap-2">{date}</div>
        </div>
      </div>
    </div>
  );
}

function MainPost({ comment, commentRef, post }) {
  const [opened, setOpened] = useState(false);

  const { user } = useContext(UserContext);

  const timestamp = new Date(comment.updatedAt.seconds * 1000);

  const date = timestamp?.toLocaleDateString("th-th", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative mt-11 md:mt-0 text-title text-opacity-90 w-full min-h-[100px]">
      <Modal
        size="xl"
        classNames={{
          modal: "bg-foreground",
          overlay: "bg-background",
          title: "text-title",
        }}
        opened={opened}
        onClose={() => setOpened(false)}
        title="แก้ไขคอมเมนต์"
      >
        <EditComment
          comment={comment}
          commentRef={commentRef}
          setOpened={setOpened}
          post={post}
        />
      </Modal>
      <Group position="apart">
        {comment.createdAt.seconds !== comment.updatedAt.seconds ? (
          <p className="text-xs opacity-80 mb-2">แกไขล่าสุด : {date}</p>
        ) : (
          <div />
        )}
        <Group spacing="xs" className="absolute md:top-2 -top-9 right-2 z-20">
          <AuthorCheck username={comment.username}>
            <Button
              onClick={() => setOpened(true)}
              compact
              leftIcon={<Edit size={14} />}
              className="bg-foreground z-10 text-title hover:bg-content hover:text-[#fff]"
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
                className="z-10 bg-red-500 text-[#fff] hover:bg-red-500 hover:opacity-75"
                variant="default"
                size="xs"
              >
                ลบเนื้อหา
              </Button>
            </AdminCheck>
          )}
        </Group>
      </Group>

      <RichTextEditor
        readOnly
        value={comment?.content}
        classNames={{
          root: "bg-transparent border-none text-title z-10 mb-2 md:mt-6",
        }}
      />
      <AuthCheck fallback={<div />}>
        <Group
          position="apart"
          className="absolute bottom-0 right-0 left-0 text-xs z-10 "
          my="xs"
          mx="md"
        >
          <div className="flex flex-row gap-1 items-end hover:underline cursor-pointer ">
            <AlertTriangle size={14} />
            รายงานโพสต์
          </div>
          <Group position="right">
            <div className="flex flex-row gap-1 items-end hover:underline cursor-pointer ">
              <ThumbUp size={14} />
              {comment.likes} ถูกใจ
            </div>
          </Group>
        </Group>
      </AuthCheck>
      <p className="absolute bottom-4 select-none right-6 leading-none font-bold uppercase opacity-[0.03] text-[120px] md:text-[150px] text-right tracking-tighter">
        REPLY
      </p>
      {/* <p className="absolute bottom-4 text-xs">
        <div className="flex items-center text-content gap-1 mb-2 border-[1px] border-title border-opacity-10 p-1 rounded-sm">
          <ThemeIcon radius="md" size="xs" color="gray">
            <ThumbUp />
          </ThemeIcon>
        </div>
      </p> */}
    </div>
  );
}
