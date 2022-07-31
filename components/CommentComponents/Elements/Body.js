import React, { useContext, useState } from "react";
import { Button, Group, Modal } from "@mantine/core";
import {
  AlertTriangle,
  Edit as EditIcon,
  ThumbUp,
  Trash,
} from "tabler-icons-react";
import RichTextEditor from "utils/RichText";
import { auth, firestore } from "lib/firebase";
import Edit from "../Edit";
import { UserContext } from "lib/context";
import AuthorCheck from "hooks/AuthorCheck";
import AdminCheck from "hooks/AdminCheck";
import AuthCheck from "hooks/AuthCheck";

export default function Body({
  comment,
  commentRef,
  post,
  likes,
  setLikes,
  likeState,
  setLikeState,
}) {
  const [opened, setOpened] = useState(false);

  const { user } = useContext(UserContext);

  const timestamp = new Date(comment.updatedAt.seconds * 1000);

  const date = timestamp?.toLocaleDateString("th-th", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleLike = async () => {
    const uid = auth.currentUser.uid;

    let exist = false;
    let change = "";

    const userStatistics = firestore
      .collection("users")
      .doc(post.uid)
      .collection("posts")
      .doc(post.slug)
      .collection("comments")
      .doc(comment.slug)
      .collection("likes");

    const userStatisticsPosts = await (
      await userStatistics.get()
    ).docs.map((data) => data.data());

    userStatisticsPosts.map((like) => {
      if (like.uid === uid) {
        exist = true;
        change = like.slug;
        return;
      }
    });

    if (exist) {
      setLikeState(false);

      const userStatistics = firestore.collection("statistics").doc(uid);
      const userStatisticsPosts = (await userStatistics.get()).data();
      await userStatistics.update({
        likes: userStatisticsPosts.likes - 1,
      });

      const ref = firestore
        .collection("users")
        .doc(post.uid)
        .collection("posts")
        .doc(post.slug)
        .collection("comments")
        .doc(comment.slug)
        .collection("likes")
        .doc(change);

      await ref.delete();
      setLikes(likes - 1);
    } else {
      setLikeState(true);
      const userStatistics = firestore.collection("statistics").doc(uid);
      const userStatisticsPosts = (await userStatistics.get()).data();
      await userStatistics.update({
        likes: userStatisticsPosts.likes + 1,
      });

      const ref = firestore
        .collection("users")
        .doc(post.uid)
        .collection("posts")
        .doc(post.slug)
        .collection("comments")
        .doc(comment.slug)
        .collection("likes")
        .doc();

      await ref.set({
        slug: ref.id,
        like: 1,
        uid: uid,
      });

      setLikes(likes + 1);
    }
  };

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
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        title="แก้ไขคอมเมนต์"
      >
        <Edit
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
              leftIcon={<EditIcon size={14} />}
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
            <div
              className={`flex flex-row gap-1 items-end hover:underline cursor-pointer ${
                likeState ? "text-content" : "text-title"
              }`}
              onClick={() => handleLike()}
            >
              <ThumbUp size={14} />
              {likes}{" "}
              {!likeState ? (
                <p>ถูกใจ</p>
              ) : (
                <p className="text-content">เลิกถูกใจ</p>
              )}
            </div>
          </Group>
        </Group>
      </AuthCheck>
      <p className="absolute bottom-4 select-none right-6 leading-none font-bold uppercase opacity-[0.03] text-[120px] md:text-[150px] text-right tracking-tighter">
        REPLY
      </p>
    </div>
  );
}
