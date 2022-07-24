import React, { useContext, useEffect, useState } from "react";
import { Animate } from "react-simple-animate";
import { UserContext } from "@lib/context";
import Navbar from "@components/Navbar";
import { Container, Stack, Title } from "@mantine/core";
import { Footer } from "@components/Footer";
import UserCardImage from "@components/ProfileComponents/UserCardImage";
import AuthCheck from "@components/AuthCheck";
import {
  StatsGridIcons,
  StatsGridIconsAdmin,
} from "@components/ProfileComponents/StatsGridIcons";
import StatsSegments, {
  StatsSegmentsAdmin,
} from "@components/ProfileComponents/StatsSegments";
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
  let statistics = null;
  let statisticsAdmin = null;
  let users = null;
  let posts = null;

  if (userDoc) {
    user = postToJSON(userDoc);
    const postsQuery = userDoc.ref.collection("posts");
    posts = (await postsQuery.get()).docs.map(postToJSON);

    const usersRef = firestore.collection("users");

    users = (await usersRef.get()).docs.map(postToJSON);

    const userStatistics = firestore.collection("statistics").doc(userDoc.id);
    statistics = (await userStatistics.get()).data();

    const usersStatistics = firestore.collection("statistics");
    statisticsAdmin = (await usersStatistics.get()).docs.map((doc) =>
      doc.data()
    );
  }

  return {
    props: { user, statistics, statisticsAdmin, users, posts },
  };
}

export default function UserProfilePage({
  user,
  users,
  statistics,
  statisticsAdmin,
  posts,
}) {
  const { setTheme } = useThemeContext();

  const router = useRouter();

  const { username } = useContext(UserContext);

  const [userRef, setUserRef] = useState();

  useEffect(() => {
    if (!user || !posts) router.push("/404");
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red-light");
      setTheme("red-light");
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
                <UserCardImage
                  user={user}
                  userRef={userRef}
                  posts={posts}
                  statistics={statistics}
                />
                <StatsGridIcons statistics={statistics} />
                <StatsSegments user={user} statistics={statistics} />
                {posts[0] && (
                  <TableSort
                    user={user}
                    posts={posts}
                    statistics={statistics}
                  />
                )}

                {username === user.username && (
                  <AdminCheck>
                    <Title order={2} align="center" className="text-title mt-4">
                      ส่วนของผู้ดูแลระบบ
                    </Title>

                    <StatsGridIconsAdmin statistics={statisticsAdmin} />
                    <StatsSegmentsAdmin statistics={statisticsAdmin} />
                    {users && <UserManagement users={users} />}
                    <div id="announcementControl">
                      <AnnouncementControl />
                    </div>
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
