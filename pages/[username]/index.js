import React, { useContext, useEffect, useState } from "react";
import { Animate } from "react-simple-animate";
import { UserContext } from "lib/context";
import Navbar from "@components/Navbar";
import { Container } from "@mantine/core";
import { Footer } from "@components/Footer";
import AuthCheck from "hooks/AuthCheck";
import { firestore, getUserWithUsername, postToJSON } from "@lib/firebase";
import Loading from "@components/Loading";
import { useThemeContext } from "@lib/useTheme";
import { useRouter } from "next/router";
import Metatags from "@components/Metatags";
import ProfileComponents from "@components/ProfileComponents";

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
              <ProfileComponents
                user={user}
                userRef={userRef}
                users={users}
                statistics={statistics}
                statisticsAdmin={statisticsAdmin}
                posts={posts}
              />
            </Animate>
          )}
        </Container>
        <Footer />
      </div>
    </AuthCheck>
  );
}
