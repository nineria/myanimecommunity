import React, { useContext, useEffect, useState } from "react";
import { Animate } from "react-simple-animate";
import {
  AlertOctagon,
  BrandGithub,
  BrandInstagram,
  BrandLinkedin,
  Edit,
  Mail,
  User,
} from "tabler-icons-react";
import { UserContext } from "@lib/context";
import Navbar from "@components/Navbar";
import {
  Container,
  Divider,
  Group,
  Paper,
  ThemeIcon,
  Title,
  List,
  Badge,
  Button,
  Avatar,
  Modal,
  Textarea,
  Checkbox,
  Stack,
  Space,
  Center,
  Image,
  Text,
  useMantineColorScheme,
  Card,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Footer } from "@components/Footer";
import PageNotFound from "./404";
import { useThemeContext } from "@lib/useTheme";
import UserCardImage from "@components/ProfileComponent/UserCardImage";
import StatsSegments from "@components/ProfileComponent/StatsSegments";
import { StatsGridIcons } from "@components/ProfileComponent/StatsGridIcons";
import { TableReviews } from "@components/ProfileComponent/TableReviews";
import { TableSort } from "@components/ProfileComponent/TableSort";

export default function UserProfilePage() {
  const { user, username } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState({
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
        value: "34K",
        label: "ถูกใจ",
      },
      {
        value: "187",
        label: "โพสต์",
      },
      {
        value: "1.6K",
        label: "คอมเมนต์",
      },
    ],
  });

  // Multiple Percentage Calculator
  // p = ( x / y ) * 100
  // Ex 100 (10 / 73) * 100

  const [userStatsSegments, setUserStatsSegments] = useState({
    total: "73",
    diff: 18,
    data: [
      {
        label: "โพสต์",
        count: "10",
        part: 13.6986,
        color: "#7952B3",
      },
      {
        label: "คอมเมนต์",
        count: "56",
        part: 76.7123,
        color: "#343A40",
      },
      {
        label: "รีวิว",
        count: "7",
        part: 9.589,
        color: "#FFC107",
      },
    ],
  });

  const [userStatsGridIcons, setUserStatsGridIcons] = useState({
    data: [
      {
        title: "โพสต์",
        value: "10",
        diff: 34,
      },
      {
        title: "คอมเมนต์",
        value: "56",
        diff: -13,
      },
      {
        title: "รีวิว",
        value: "7",
        diff: 100,
      },
    ],
  });

  const [userTablePostReviews, setUserTablePostReviews] = useState({
    data: [
      {
        title: "มีข้อสงสัยเกี่ยวกับตอนจบในอนิเมะ Jujutsu Kaisen ครับ",
        author: "nineria",
        date: "13/05/2022",
        reviews: {
          positive: 2223,
          negative: 259,
        },
      },
      {
        title: "อนิเมะที่ดังและครองใจคนดูทุกเพศทุกวัย",
        author: "nineria",
        date: "13/05/2022",
        reviews: {
          positive: 5677,
          negative: 1265,
        },
      },
      {
        title: "หนังที่ใช้เวลาเพียงแค่ 10 นาที น้ำตาแตก",
        author: "nineria",
        date: "13/05/2022",
        reviews: {
          positive: 3487,
          negative: 1845,
        },
      },
      {
        title: "อัศวินแห่ง “สวนหลวง” กับสาว “ผักสวนครัว”",
        author: "nineria",
        date: "13/05/2022",
        reviews: {
          positive: 8576,
          negative: 663,
        },
      },
      {
        title: "พาทุกคนมาไปยิ้มแก้มปริกับความน่ารักสาวแฟนเช่า",
        author: "nineria",
        date: "13/05/2022",
        reviews: {
          positive: 6631,
          negative: 993,
        },
      },
      {
        title: "สปอยอนิเมะภรรยาของผมยังไงก็น่ารักภาค 1",
        author: "nineria",
        date: "13/05/2022",
        reviews: {
          positive: 1492,
          negative: 1847,
        },
      },
    ],
  });

  const postDummy = [
    // Dummy data (Temporary)
    {
      postTime: "13 days ago",
      header:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem, dolores.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, necessitatibus, exercitationem porro voluptatibus est tempore itaque nemo aperiam accusantium rerum, dolore ex nisi. Inventore, quia temporibus consectetur laborum ea saepe.",
    },
    {
      postTime: "16 days ago",
      header:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, rem.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ab ratione amet cumque a quisquam. Atque fugiat repellat voluptate assumenda!",
    },
    {
      postTime: "25 days ago",
      header: "Lorem ipsum dolor sit amet.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, mollitia?",
    },
    {
      postTime: "1 days ago",
      header:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore molestias cum excepturi voluptatem quidem accusamus eveniet praesentium aliquid, vel mollitia?",
      body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, facilis, a tempore omnis odio dolor corrupti nemo atque ducimus voluptate modi dolorum inventore assumenda eligendi molestiae alias accusamus magnam veritatis dolore. Minima laboriosam similique, ullam non aliquid perspiciatis ad aspernatur error, pariatur, fuga incidunt dicta dolorum. Alias corporis necessitatibus totam.",
    },
  ];

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

  const paperProps = {
    date: "13 days ago",
    title: "New Year, New Beginnings: Smashing Workshops & Audits",
    content:
      "Catch up on what’s been cookin’ at Smashing and explore some of the most popular community resources.",
  };

  return (
    <>
      <div className="bg-background text-accent min-h-[1024px]">
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
                <StatsGridIcons data={userStatsGridIcons.data} />
                <StatsSegments
                  total={userStatsSegments.total}
                  diff={userStatsSegments.diff}
                  data={userStatsSegments.data}
                />
                <TableReviews data={userTablePostReviews.data} />
                {/* <TableSort data={tmpData} /> */}
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
