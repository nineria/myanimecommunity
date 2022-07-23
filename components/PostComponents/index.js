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
  CalendarMinus,
  Edit as EditIcon,
  Star,
  ThumbUp,
  Trash,
} from "tabler-icons-react";
import { auth, firestore, getUserWithUsername } from "@lib/firebase";
import AuthCheck from "@components/AuthCheck";
import RichTextEditor from "@components/RichText";
import AuthorCheck from "@components/AuthorCheck";
import AdminCheck from "@components/AdminCheck";
import { UserContext } from "@lib/context";
import Link from "next/link";

export default function PostComponents({ post, postRef }) {
  const [userRanks, setUserRanks] = useState(null);
  const [stars, setStars] = useState();
  const [likes, setLikes] = useState();
  const [likeState, setLikeState] = useState(false);

  useEffect(() => {
    const getRanks = async () => {
      const userDoc = await getUserWithUsername(post.username);

      let ranks = null;

      const ranksRef = await userDoc.ref.collection("ranks").get();
      ranks = await JSON.stringify(ranksRef.docs.map((doc) => doc.data()));

      ranks = JSON.parse(ranks);

      setUserRanks(ranks);
    };

    const average = (array) => array.reduce((a, b) => a + b) / array.length;

    const getStars = async () => {
      const userStatistics = firestore
        .collection("users")
        .doc(post.uid)
        .collection("posts")
        .doc(post.slug)
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
        .doc(post.uid)
        .collection("posts")
        .doc(post.slug)
        .collection("likes");

      const userStatisticsPosts = await (
        await userStatistics.get()
      ).docs.map((data) => data.data());

      const uid = auth.currentUser.uid;

      userStatisticsPosts.map((like) => {
        if (like.uid === uid) {
          setLikeState(true);
          return;
        }
      });

      if (userStatisticsPosts.length === 0) setLikes(0);
      else setLikes(userStatisticsPosts.length);
    };

    getRanks();
    getStars();
    getLikes();
  }, [post]);

  return (
    <div className="bg-foreground rounded-sm">
      {/* Left menu */}
      <PostLayout>
        {post && (
          <LeftMenu
            post={post}
            userRanks={userRanks}
            stars={stars}
            likes={likes}
          />
        )}
        {post && (
          <TopMenu
            post={post}
            userRanks={userRanks}
            stars={stars}
            likes={likes}
          />
        )}
        {post && (
          <MainPost
            post={post}
            postRef={postRef}
            likes={likes}
            setLikes={setLikes}
            likeState={likeState}
            setLikeState={setLikeState}
          />
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
        <div className="py-[0.5px] bg-white opacity-50" />
        {props.children[2]}
      </div>
    </div>
  );
}

function TopMenu({ post, userRanks, stars, likes }) {
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
        <div className="flex flex-row flex-wrap justify-around items-center w-full">
          <Link href={`/${user.username}`}>
            <Avatar
              radius="xl"
              size="lg"
              src={user.avatar}
              alt={user.username}
              className="border-2 border-title cursor-pointer"
            />
          </Link>
          <div className="flex flex-col ml-4 ">
            <Link href={`/${user.username}`}>
              <Text color="red" className="cursor-pointer hover:underline">
                {user.username}
              </Text>
            </Link>
            <p
              className={`${
                user.rule === "ผู้ดูแลระบบ" ? "text-yellow-400" : "text-title"
              } text-xs`}
            >
              {user.rule}
            </p>
          </div>
          {userRanks && (
            <div className="flex flex-col gap-1 mt-4 ml-4">
              {userRanks.map((item, index) => (
                <Badge
                  radius="none"
                  variant="gradient"
                  gradient={{
                    from: item.color.from,
                    to: item.color.to,
                    deg: 35,
                  }}
                  key={index}
                  className="shadow-md w-full"
                >
                  {item.label}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-row justify-around mt-4 text-title text-opacity-80">
        <div className="flex flex-row flex-wrap items-center text-xs gap-2">
          <CalendarMinus size={14} /> สร้าง : {date}
        </div>
        <div className="flex flex-row flex-wrap items-center text-xs gap-2">
          <Star size={14} /> คะแนน : {stars} ดาว
        </div>
        <div className="flex flex-row flex-wrap items-center text-xs gap-2">
          <ThumbUp size={14} />
          ถูกใจ : {likes} คน
        </div>
      </div>
    </div>
  );
}

function LeftMenu({ post, userRanks, stars, likes }) {
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

  // const stars =

  return (
    <div className="px-2 py-4">
      {user && (
        <div className="flex flex-col items-center w-[100px] ">
          <Link href={`/${user.username}`}>
            <Avatar
              radius="xl"
              size="lg"
              src={user.avatar}
              alt={user.username}
              className="cursor-pointer"
            />
          </Link>
          <Link href={`/${user.username}`}>
            <Text color="red" className="cursor-pointer hover:underline">
              {user.username}
            </Text>
          </Link>
        </div>
      )}
      <div className="flex flex-col gap-1 mt-4">
        {userRanks &&
          userRanks.map((rank, index) => (
            <Badge
              key={index}
              variant="gradient"
              radius="none"
              gradient={{
                from: rank.color.from,
                to: rank.color.to,
                deg: 35,
              }}
              className="shadow-md"
            >
              <p className="drop-shadow-md">{rank.label}</p>
            </Badge>
          ))}
      </div>
      <div className="flex flex-col mt-4 gap-1 text-title text-opacity-80">
        <div className="flex flex-row items-center text-xs gap-1">
          <CalendarMinus size={14} /> : <p> {date}</p>
        </div>
        <div className="flex flex-row items-center text-xs gap-1">
          <Star size={14} /> : <p> {stars}</p>
        </div>
        <div className="flex flex-row items-center text-xs gap-1">
          <ThumbUp size={14} /> : <p> {likes}</p>
        </div>
      </div>
    </div>
  );
}

function MainPost({ post, postRef, likes, setLikes, likeState, setLikeState }) {
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

  const handleLike = async () => {
    const uid = auth.currentUser.uid;

    let exist = false;
    let change = "";

    const userStatistics = firestore
      .collection("users")
      .doc(post.uid)
      .collection("posts")
      .doc(post.slug)
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
    <div className="relative p-2 text-title text-opacity-90 w-full ">
      <Group position="apart">
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
          closeOnClickOutside={false}
          opened={opened}
          onClose={() => setOpened(false)}
          title="แก้ไขโพสต์"
        >
          <Edit post={post} postRef={postRef} setOpened={setOpened} />
        </Modal>
        <Group spacing="xs" className="z-20">
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
      <Image src={post.image} alt={post.image} my="xs" radius="sm" />
      <RichTextEditor
        readOnly
        value={post.content}
        classNames={{
          root: "bg-transparent border-none text-title z-10",
        }}
      />

      <Space h="50px" />
      <p className="absolute select-none bottom-20 right-6 font-bold leading-none uppercase opacity-[0.03] text-[120px] md:text-[150px] text-right tracking-tighter">
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
      <span className="text-title text-sm">
        ที่มา: {post.credit === "<p><br></p>" && "Original"}
      </span>
      <RichTextEditor
        readOnly
        value={post.credit}
        classNames={{
          root: "bg-transparent border-none text-title z-10",
        }}
      />
      <AuthCheck fallback={<div />}>
        <Group position="apart" className="text-xs px-2" my="xs">
          <div className="flex flex-row gap-1 items-end hover:underline cursor-pointer ">
            <AlertTriangle size={14} />
            รายงานโพสต์
          </div>
          <Group position="right">
            {/* <Like postRef={postRef} /> */}
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
    </div>
  );
}
