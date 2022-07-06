import React, { useContext, useEffect, useState } from "react";
// Components
import { Avatar, Button, Group, Modal, Text } from "@mantine/core";
// Icons
import { CalendarMinus, Edit, ThumbUp } from "tabler-icons-react";
import RichTextEditor from "@components/RichText";
import { getUserWithUsername } from "@lib/firebase";
import EditComment from "./EditComment";
import { UserContext } from "@lib/context";
import AuthorCheck from "@components/AuthorCheck";

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
      <div className="flex flex-row ">
        <LeftMenu comment={comment} />
        <div className="px-[0.5px] bg-white opacity-50"></div>
        <MainPost comment={comment} commentRef={commentRef} />
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

function MainPost({ comment, commentRef }) {
  const { username } = useContext(UserContext);
  const [opened, setOpened] = useState(false);

  const timestamp = new Date(comment.updatedAt.seconds * 1000);

  const date = timestamp?.toLocaleDateString("th-th", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative px-4 py-2 text-title text-opacity-90 w-full">
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
        />
      </Modal>
      <Group position="apart">
        {comment.createdAt.seconds !== comment.updatedAt.seconds ? (
          <p className="text-xs opacity-80 mb-2">แกไขล่าสุด : {date}</p>
        ) : (
          <div />
        )}
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
      </Group>
      <RichTextEditor
        readOnly
        value={comment?.content}
        classNames={{ root: "bg-foreground border-none text-title" }}
      />
      <p className="absolute select-none bottom-2 right-4 leading-none font-bold uppercase opacity-[0.03] text-[8vw] text-right tracking-tighter">
        Answer
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
