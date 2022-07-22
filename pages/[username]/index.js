import React, { useContext, useEffect, useState } from "react";
import { Animate } from "react-simple-animate";
import { UserContext } from "@lib/context";
import Navbar from "@components/Navbar";
import { Container, Stack, Title } from "@mantine/core";
import { Footer } from "@components/Footer";
import UserCardImage from "@components/ProfileComponents/UserCardImage";
import AuthCheck from "@components/AuthCheck";
import { StatsGridIcons } from "@components/ProfileComponents/StatsGridIcons";
import StatsSegments from "@components/ProfileComponents/StatsSegments";
import { TableSort } from "@components/ProfileComponents/TableSort";
import { firestore, getUserWithUsername, postToJSON } from "@lib/firebase";
import Loading from "@components/Loading";
import { useThemeContext } from "@lib/useTheme";
import { useRouter } from "next/router";
import Metatags from "@components/Metatags";
import AdminCheck from "@components/AdminCheck";
import AnnouncementControl from "@components/ProfileComponents/AnnouncementControl";
import ReportFormUser from "@components/ProfileComponents/ReportFormUser";
import UserManagement from "@components/ProfileComponents/UserManagement";

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  let user = null;
  let users = null;
  let posts = null;

  if (userDoc) {
    user = postToJSON(userDoc);
    const postsQuery = userDoc.ref.collection("posts").limit(10);
    posts = (await postsQuery.get()).docs.map(postToJSON);

    const usersRef = firestore.collection("users");
    users = (await usersRef.get()).docs.map(postToJSON);
  }

  return {
    props: { user, users, posts },
  };
}

export default function UserProfilePage({ user, users, posts }) {
  const { setTheme } = useThemeContext();

  const router = useRouter();

  const { username } = useContext(UserContext);

  const [userRef, setUserRef] = useState();

  useEffect(() => {
    if (!user || !posts) router.push("/404");
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }

    const getUserRef = async () => {
      const userDoc = await getUserWithUsername(username);

      setUserRef(userDoc);
    };

    setTheme(localData);
    getUserRef();
  }, [setTheme, posts, router, user, username]);

  // Multiple Percentage Calculator
  // p = ( x / y ) * 100
  // Ex 100 (10 / 73) * 100

  // const socialProps = [
  //   {
  //     name: user?.email,
  //     icon: <Mail />,
  //   },
  //   {
  //     name: "Instagram",
  //     icon: <BrandInstagram />,
  //   },
  //   {
  //     name: "Github",
  //     icon: <BrandGithub />,
  //   },
  //   {
  //     name: "Linkedin",
  //     icon: <BrandLinkedin />,
  //   },
  // ];

  return (
    <AuthCheck fallback={username ? <Loading /> : null}>
      <div className="bg-background text-accent min-h-[1024px] mb-[235px] pb-10">
        <Navbar page="/profile" isBusy />
        <Metatags />
        <Container size="lg">
          {username && user && posts && (
            <Animate
              play
              start={{
                transform: "translateY(1%)",
                opacity: "0",
              }}
              end={{ transform: "translateY(0%)", opacity: "1" }}
            >
              <Stack spacing="xs">
                <UserCardImage user={user} userRef={userRef} posts={posts} />
                <StatsGridIcons user={user} posts={posts} />
                <StatsSegments user={user} />
                {posts[0] && <TableSort user={user} posts={posts} />}

                {username === user.username && (
                  <AdminCheck>
                    <Title order={2} align="center" className="text-title mt-4">
                      ส่วนของผู้ดูแลระบบ
                    </Title>
                    <div id="announcementControl">
                      <AnnouncementControl />
                    </div>
                    {users && <UserManagement users={users} />}
                    <ReportFormUser />
                  </AdminCheck>
                )}
              </Stack>
            </Animate>
          )}
        </Container>
        <Footer />
      </div>
    </AuthCheck>
  );
}
