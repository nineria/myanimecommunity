import {
  MoodConfuzed,
  MoodCrazyHappy,
  MoodHappy,
  MoodSuprised,
  Settings,
  Users,
} from "tabler-icons-react";

export const settingMenuProperty = [
  {
    name: "โปรไฟล์",
    link: "/enter",
    icon: <Users />,
  },
  {
    name: "ตั้งค่า",
    link: "/setting",
    icon: <Settings />,
  },
];

export const accessMenuProperty = [
  {
    name: "โพสต์ใหม่",
    link: "/posts",
    icon: <MoodCrazyHappy />,
  },
  {
    name: "ข่าวสาร",
    link: "/news",
    icon: <MoodHappy />,
  },
  {
    name: "รีวิว",
    link: "/review",
    icon: <MoodSuprised />,
  },
  {
    name: "Q&A ถามตอบ",
    link: "/qanda",
    icon: <MoodConfuzed />,
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
    name: "รีวิวอนิเมะ",
    path: "/review",
  },
  {
    name: "Q&A ถามตอบ",
    path: "/qanda",
  },
];
