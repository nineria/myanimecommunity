import AuthCheck from "hooks/AuthCheck";
import { Footer } from "components/Footer";
import Navbar from "components/Navbar";
import PostComponents from "components/PostComponents";
import Top from "@components/PostComponents/Elements/Top";
import { auth, firestore, getUserWithUsername, postToJSON } from "lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Group,
  Pagination,
  Stack,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import Add from "@components/CommentComponents/Add";
import Comment from "@components/CommentComponents";
import { Check, Refresh, Star, X } from "tabler-icons-react";
import Loading from "@components/Loading";
import Metatags from "components/Metatags";
import LoginRegister from "@components/LoginRegister";
import Logo from "components/Logo";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

export async function getServerSideProps({ query }) {
  try {
    const { username, slug } = query;

    const userDoc = await getUserWithUsername(username);

    let post;
    let path;

    if (userDoc) {
      const postRef = userDoc.ref.collection("posts").doc(slug);

      post = postToJSON(await postRef.get());

      path = postRef.path;
    }

    return {
      props: { post, path },
    };
  } catch (error) {
    return {
      props: null,
    };
  }
}

export default function PostPage(props) {
  const postRef = firestore.doc(props.path);

  const { username } = useContext(UserContext);

  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  const [activePage, setPage] = useState(1);

  const [comments, setComments] = useState();

  useEffect(() => {
    const getComments = async () => {
      const userDoc = await getUserWithUsername(post.username);
      const comments = await userDoc.ref
        .collection("posts")
        .doc(post.slug)
        .collection("comments")
        .get();

      comments = await JSON.stringify(comments.docs.map((doc) => doc.data()));

      comments = JSON.parse(comments);

      setComments(comments);
    };

    getComments();
  }, [post]);

  const items = [
    { title: "หน้าหลัก", href: "/" },
    { title: "โพสต์ทั้งหมด", href: "/posts" },
    { title: post.slug, href: "#" },
  ].map((item, index) => (
    <Anchor size="sm" color="dimmed" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const regex = /(<([^>]+)>)/gi;
  const description = post.content.replace(regex, "");

  return (
    <div className="bg-background min-h-[1024px] mb-[235px] pb-10">
      <Metatags
        title={post.title}
        image={post.image}
        description={description}
      />
      <Navbar />
      <Container size="lg">
        <Stack spacing="xs">
          <Breadcrumbs separator="→" className="truncate">
            {items}
          </Breadcrumbs>
          {/* Top section */}
          <Top data={post} />
          <Group position="apart">
            <Pagination
              total={2}
              size="sm"
              page={activePage}
              onChange={setPage}
              classNames={{
                item: "text-title bg-foreground",
                dots: "text-content bg-content",
                active: "bg-content text-[#fff]",
              }}
            />
            <AuthCheck fallback={<></>}>
              <GivePostStars post={post} />
            </AuthCheck>
          </Group>
          {activePage === 1 ? (
            <Stack spacing="xs">
              {/* Post */}
              <PostComponents post={post} postRef={postRef} />
              {/* Comment */}
              <Stack spacing="xs">
                {comments &&
                  comments.map((item, index) => (
                    <Comment key={index} post={post} comment={item} />
                  ))}
              </Stack>
            </Stack>
          ) : (
            <Stack spacing="xs"></Stack>
          )}
          <Pagination
            total={2}
            size="sm"
            page={activePage}
            onChange={setPage}
            classNames={{
              item: "text-title bg-foreground",
              dots: "text-content bg-content",
              active: "bg-content text-[#fff]",
            }}
          />
          {/* Create comment */}
          <AuthCheck
            fallback={
              username ? (
                <Loading />
              ) : (
                <div className="flex flex-col justify-center bg-foreground rounded-sm py-10">
                  <Text className="text-title text-center">
                    เข้าสู่ระบบ หรือลงทะเบียน เพื่อเป็นส่วนหนึ่งของ
                  </Text>
                  <Text className="text-title text-center mb-5">
                    <Logo />
                    และอื่น ๆ อีกมากมาย!
                  </Text>
                  <LoginRegister center />
                </div>
              )
            }
          >
            <Add post={post} />
          </AuthCheck>
        </Stack>
      </Container>
      <Footer />
    </div>
  );
}

function GivePostStars({ post }) {
  const [_stars, _setStars] = useState("");
  const [stars, setStars] = useState("");
  const [defaultStars, setDefaultStars] = useState("");
  const [opened, setOpened] = useState(false);

  const modals = useModals();

  useEffect(() => {
    const average = (array) => array.reduce((a, b) => a + b) / array.length;

    const getStars = async () => {
      const starsRef = firestore
        .collection("users")
        .doc(post.uid)
        .collection("posts")
        .doc(post.slug)
        .collection("stars");

      const stars = await (
        await starsRef.get()
      ).docs.map((data) => data.data());

      const starsArray = stars.map((stars) => stars.stars);

      if (starsArray.length === 0) {
        _setStars(0);
        setDefaultStars("0");
      } else {
        _setStars(average(starsArray));
        setDefaultStars(starsArray.length);
      }
    };

    getStars();
  }, [post.slug, post.uid]);

  const handleGiveStars = (value) => {
    const handleOnClick = async () => {
      const uid = auth.currentUser.uid;

      let exist = false;
      let change = "";

      const userStatistics = firestore
        .collection("users")
        .doc(post.uid)
        .collection("posts")
        .doc(post.slug)
        .collection("stars");

      const userStatisticsPosts = await (
        await userStatistics.get()
      ).docs.map((data) => data.data());

      userStatisticsPosts.map((star) => {
        if (star.uid === uid) {
          if (star.stars === value) {
            exist = true;
            return;
          }
          change = star.slug;
          return;
        }
      });

      if (exist) {
        showNotification({
          color: "red",
          title: `คุณได้ให้คะแนนโพสต์นี้ไปแล้ว`,
          icon: <X size={18} />,
          classNames: {
            root: "bg-foreground border-red-400",
          },
        });

        modals.closeModal(id);
      } else {
        if (change !== "") {
          showNotification({
            color: "yellow",
            title: `คุณได้เปลี่ยนคะแนนโพสต์นี้เป็น ${value} ดาว`,
            icon: <Refresh size={18} />,
            classNames: {
              root: "bg-foreground border-yellow-400",
            },
          });

          const ref = firestore
            .collection("users")
            .doc(post.uid)
            .collection("posts")
            .doc(post.slug)
            .collection("stars")
            .doc(change);

          await ref.update({
            stars: value,
          });

          modals.closeModal(id);
        } else {
          const uid = auth.currentUser.uid;

          const userStatistics = firestore.collection("statistics").doc(uid);
          const userStatisticsPosts = (await userStatistics.get()).data();
          await userStatistics.update({
            stars: userStatisticsPosts.stars + 1,
          });

          const ref = firestore
            .collection("users")
            .doc(post.uid)
            .collection("posts")
            .doc(post.slug)
            .collection("stars")
            .doc();

          await ref.set({
            stars: value,
            slug: ref.id,
            uid: uid,
          });

          showNotification({
            color: "teal",
            title: `คุณได้ให้คะแนนโพสต์นี้ ${value} ดาว`,
            icon: <Check size={18} />,
            classNames: {
              root: "bg-foreground border-teal-400",
            },
          });

          modals.closeModal(id);
        }
      }
    };

    const id = modals.openModal({
      title: (
        <Stack>
          <Text size="sm">ให้คะแนนโพสต์นี้ {value} ดาวหรือไม่?</Text>
        </Stack>
      ),
      zIndex: "999",
      centered: true,
      classNames: {
        modal: "bg-foreground",
        overlay: "bg-background",
      },
      size: "sm",
      children: (
        <Stack size="xs">
          <Group position="right">
            <Button
              className="bg-background text-title hover:bg-background hover:opacity-75"
              size="xs"
              onClick={() => modals.closeModal(id)}
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-500 hover:opacity-75"
              size="xs"
              onClick={() => handleOnClick()}
            >
              ให้คะแนน
            </Button>
          </Group>
        </Stack>
      ),
    });
  };

  return (
    <>
      <Group position="right" spacing="4px">
        <Text
          size="xs"
          weight={600}
          mx="xs"
          className="text-content text-right hover:underline cursor-pointer"
          onClick={() => setOpened(true)}
        >
          <span>{stars}</span>
        </Text>
        <Star
          size={16}
          className={`cursor-pointer ${
            _stars > 0 ? "text-content" : "text-[#fff] "
          }`}
          onClick={() => handleGiveStars(1)}
          onMouseEnter={() => {
            setStars("แย่มาก"), _setStars(1);
          }}
          onMouseLeave={() => setStars("")}
        />
        <Star
          size={16}
          className={`cursor-pointer ${
            _stars > 1 ? "text-content" : "text-[#fff] "
          }`}
          onClick={() => handleGiveStars(2)}
          onMouseEnter={() => {
            setStars("แย่"), _setStars(2);
          }}
          onMouseLeave={() => setStars("")}
        />
        <Star
          size={16}
          className={`cursor-pointer ${
            _stars > 2 ? "text-content" : "text-[#fff] "
          }`}
          onClick={() => handleGiveStars(3)}
          onMouseEnter={() => {
            setStars("ทั่วไป"), _setStars(3);
          }}
          onMouseLeave={() => setStars("")}
        />
        <Star
          size={16}
          className={`cursor-pointer ${
            _stars > 3 ? "text-content" : "text-[#fff] "
          }`}
          onClick={() => handleGiveStars(4)}
          onMouseEnter={() => {
            setStars("ดี"), _setStars(4);
          }}
          onMouseLeave={() => setStars("")}
        />
        <Star
          size={16}
          className={`cursor-pointer ${
            _stars > 4 ? "text-content" : "text-[#fff] "
          }`}
          onClick={() => handleGiveStars(5)}
          onMouseEnter={() => {
            setStars("ดีมาก"), _setStars(5);
          }}
          onMouseLeave={() => setStars("")}
        />
        <Text
          size="xs"
          weight={600}
          mx="xs"
          className="text-right hover:underline hover:text-content cursor-pointer"
          onClick={() => setOpened(true)}
        >
          <span>• {defaultStars} คน</span>
        </Text>
      </Group>
    </>
  );
}

function UsersStared({ post }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUserStared = async () => {
      let _users = [];
      const starsRef = firestore
        .collection("users")
        .doc(post.uid)
        .collection("posts")
        .doc(post.slug)
        .collection("stars");

      const stars = await (
        await starsRef.get()
      ).docs.map((data) => data.data());

      stars.map(async (stars) => {
        await firestore
          .collection("users")
          .doc(stars.uid)
          .get()
          .then((user) => _users.push(user.data()));
      });

      setUsers(_users);
    };

    getUserStared();
  }, []);

  console.log(users);

  return (
    <Stack size="xs">
      <Divider />
      {/* {users &&
        users.map((data, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center "
          >
            <Group>
              <Avatar radius={100} src={data.user?.avatar} />
              <div className="flex flex-col">
                <Text>{data.user?.username}</Text>
                <Text size="xs">{data.user?.rule}</Text>
              </div>
            </Group>
            <div className="flex flex-row">
              <Star
                size={16}
                className={data.stars > 0 ? "text-content" : "text-[#fff]"}
              />
              <Star
                size={16}
                className={data.stars > 1 ? "text-content" : "text-[#fff]"}
              />
              <Star
                size={16}
                className={data.stars > 2 ? "text-content" : "text-[#fff]"}
              />
              <Star
                size={16}
                className={data.stars > 3 ? "text-content" : "text-[#fff]"}
              />
              <Star
                size={16}
                className={data.stars > 4 ? "text-content" : "text-[#fff]"}
              />
            </div>
          </div>
        ))} */}
    </Stack>
  );
}
