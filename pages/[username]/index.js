import React, { useContext, useEffect, useState } from "react";
import { Animate } from "react-simple-animate";
import {
  BrandGithub,
  BrandInstagram,
  BrandLinkedin,
  Mail,
} from "tabler-icons-react";
import { UserContext } from "@lib/context";
import Navbar from "@components/Navbar";
import { Container, Skeleton, Stack } from "@mantine/core";
import { Footer } from "@components/Footer";
import UserCardImage from "@components/ProfileComponents/UserCardImage";
import AuthCheck from "@components/AuthCheck";
import { StatsGridIcons } from "@components/ProfileComponents/StatsGridIcons";
import StatsSegments from "@components/ProfileComponents/StatsSegments";
import { TableSort } from "@components/ProfileComponents/TableSort";
import { getUserWithUsername, postToJSON } from "@lib/firebase";
import AdminCheck from "@components/AdminCheck";
import AnnouncementControl from "@components/ProfileComponents/AnnouncementControl";
import Loading from "@components/Loading";

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref.collection("posts").limit(10);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts },
  };
}

export default function UserProfilePage({ user, posts }) {
  // const { userData } = useContext(UserContext);

  // const [totalLikes, setTotalLike] = useState(0);

  // useEffect(() => {
  //   let total = 0;
  //   const setTotal = () => {
  //     posts.map((item) => (total = total + item.likes));
  //   };
  //   setTotal();
  //   setTotalLike(total);
  // }, [posts]);

  // Multiple Percentage Calculator
  // p = ( x / y ) * 100
  // Ex 100 (10 / 73) * 100

  // setTimeout(function () {
  //   setLoading(false);
  // }, 500);

  const typeProps = [
    {
      name: "Action",
      color: {
        from: "indigo",
        to: "cyan",
      },
    },
    {
      name: "Drama",
      color: {
        from: "teal",
        to: "lime",
      },
    },
    {
      name: "School",
      color: {
        from: "teal",
        to: "blue",
      },
    },
    {
      name: "Love",
      color: {
        from: "orange",
        to: "red",
      },
    },
    {
      name: "Comedy",
      color: {
        from: "#ed6ea0",
        to: "#ec8c69",
      },
    },
  ];

  const socialProps = [
    {
      name: user?.email,
      icon: <Mail />,
    },
    {
      name: "Instagram",
      icon: <BrandInstagram />,
    },
    {
      name: "Github",
      icon: <BrandGithub />,
    },
    {
      name: "Linkedin",
      icon: <BrandLinkedin />,
    },
  ];

  return (
    <div className="bg-background text-accent min-h-[1024px] mb-[235px] pb-10">
      <Navbar page="/profile" isBusy />
      <Container size="lg">
        <AuthCheck fallback={<Loading />}>
          <Animate
            play
            start={{
              transform: "translateY(1%)",
              opacity: "0",
            }}
            end={{ transform: "translateY(0%)", opacity: "1" }}
          >
            <Stack spacing="xs">
              <UserCardImage user={user} posts={posts} />
              <StatsGridIcons user={user} posts={posts} />
              <StatsSegments user={user} />
              <TableSort posts={posts} />
              {/* <AdminCheck>
                <AnnouncementControl />
              </AdminCheck> */}
            </Stack>
          </Animate>
        </AuthCheck>
      </Container>
      <Footer />
    </div>
  );
}
