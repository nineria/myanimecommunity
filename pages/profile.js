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
import { Container, Stack } from "@mantine/core";
import { Footer } from "@components/Footer";
import PageNotFound from "./404";
import UserCardImage from "@components/ProfileComponent/UserCardImage";
import StatsSegments from "@components/ProfileComponent/StatsSegments";
import { StatsGridIcons } from "@components/ProfileComponent/StatsGridIcons";
import { TableSort } from "@components/ProfileComponent/TableSort";

export default function UserProfilePage() {
  const { user, username } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState();

  // Multiple Percentage Calculator
  // p = ( x / y ) * 100
  // Ex 100 (10 / 73) * 100

  const [userStatsSegments, setUserStatsSegments] = useState();

  const [userTablePost, setUserTablePost] = useState();

  useEffect(() => {
    setUserInfo({
      image: "https://i.imgur.com/T8MOpCp_d.webp?maxwidth=760&fidelity=grand",
      avatar: user?.photoURL || "",
      username: username || "Username",
      name: user?.displayName || "Name",
      ranks: [
        {
          color: "red",
          label: "อัศวิน",
        },
        {
          color: "yellow",
          label: "ผู้ดูแลระบบ",
        },
        {
          color: "gray",
          label: "ผู้เฒ่า",
        },
        {
          color: "cyan",
          label: "นายทุน",
        },
      ],
      stats: [
        {
          value: 34200,
          label: "ถูกใจ",
        },
        {
          value: 187,
          label: "โพสต์",
        },
        {
          value: 1657,
          label: "คอมเมนต์",
        },
      ],
    });
    setUserStatsSegments({
      total: 73,
      diff: 18,
      data: [
        {
          label: "ถูกใจ",
          count: 34200,
          diff: 70,
          part: 13.6986,
          color: "#47d6ab",
        },
        {
          label: "โพสต์",
          count: 187,
          diff: -13,
          part: 76.7123,
          color: "#7952B3",
        },
        {
          label: "คอมเมนต์",
          count: 1657,
          diff: -58,
          part: 9.589,
          color: "#4fcdf7",
        },
      ],
    });
    setUserTablePost({
      data: [
        {
          title: "มีข้อสงสัยเกี่ยวกับตอนจบในอนิเมะ Jujutsu Kaisen ครับ",
          author: "nineria",
          date: "07/09/2022",
          view: 2482,
          reviews: {
            positive: 2223,
            negative: 259,
          },
        },
        {
          title: "อนิเมะที่ดังและครองใจคนดูทุกเพศทุกวัย",
          author: "nineria",
          date: "23/05/2022",
          view: 6942,
          reviews: {
            positive: 5677,
            negative: 1265,
          },
        },
        {
          title: "หนังที่ใช้เวลาเพียงแค่ 10 นาที น้ำตาแตก",
          author: "nineria",
          date: "12/05/2022",
          view: 5332,
          reviews: {
            positive: 3487,
            negative: 1845,
          },
        },
        {
          title: "อัศวินแห่ง “สวนหลวง” กับสาว “ผักสวนครัว”",
          author: "nineria",
          date: "13/01/2022",
          view: 9239,
          reviews: {
            positive: 8576,
            negative: 663,
          },
        },
        {
          title: "พาทุกคนมาไปยิ้มแก้มปริกับความน่ารักสาวแฟนเช่า",
          author: "nineria",
          date: "13/07/2022",
          view: 7624,
          reviews: {
            positive: 6631,
            negative: 993,
          },
        },
        {
          title: "สปอยอนิเมะภรรยาของผมยังไงก็น่ารักภาค 1",
          author: "nineria",
          date: "01/05/2022",
          view: 3339,
          reviews: {
            positive: 1492,
            negative: 1847,
          },
        },
      ],
    });
  }, [user, username]);

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
    <>
      <div className="bg-background text-accent min-h-[1024px] mb-[235px] pb-10">
        <Navbar page="/profile" isBusy />
        {user ? (
          <Container size="lg">
            <Animate
              play
              start={{
                transform: "translateY(1%)",
                opacity: "0",
              }}
              end={{ transform: "translateY(0%)", opacity: "1" }}
            >
              <Stack spacing="xs">
                <UserCardImage data={userInfo} />
                <StatsGridIcons data={userStatsSegments.data} />
                <StatsSegments
                  total={userStatsSegments.total}
                  diff={userStatsSegments.diff}
                  data={userStatsSegments.data}
                />
                {/* <TableReviews data={userTablePostReviews.data} /> */}
                <TableSort data={userTablePost.data} />
              </Stack>
            </Animate>
          </Container>
        ) : (
          <PageNotFound />
        )}
      </div>
      <Footer />
    </>
  );
}
