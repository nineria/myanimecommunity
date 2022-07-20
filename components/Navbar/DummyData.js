import { UserContext } from "@lib/context";
import { useContext } from "react";
import {
  MoodConfuzed,
  MoodCrazyHappy,
  MoodHappy,
  MoodSuprised,
  Settings,
  Users,
  ZoomQuestion,
} from "tabler-icons-react";

export const accessMenuProperty = [
  {
    name: "โพสต์ใหม่",
    link: "/posts",
    icon: <MoodCrazyHappy size={14} />,
  },
  {
    name: "ข่าวสาร",
    link: "/news",
    icon: <MoodHappy size={14} />,
  },
  {
    name: "รีวิว",
    link: "/reviews",
    icon: <MoodSuprised size={14} />,
  },
  {
    name: "Q&A ถามตอบ",
    link: "/qandas",
    icon: <MoodConfuzed size={14} />,
  },
];

export const navbarProperty = [
  // Dummy data (Temporary)
  {
    name: "โพสต์ใหม่",
    path: "/posts",
  },
  {
    name: "ข่าวสาร",
    path: "/news",
  },
  {
    name: "รีวิว",
    path: "/reviews",
  },
  {
    name: "Q&A ถามตอบ",
    path: "/qandas",
  },
];
