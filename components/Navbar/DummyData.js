import {
  MoodConfuzed,
  MoodCrazyHappy,
  MoodHappy,
  MoodSuprised,
  Settings,
  Users,
  ZoomQuestion,
} from "tabler-icons-react";

export const settingMenuProperty = [
  {
    name: "โปรไฟล์",
    link: "/profile",
    icon: <Users size={14} />,
  },
  {
    name: "ตั้งค่า",
    link: "/setting",
    icon: <Settings size={14} />,
  },
  {
    name: "คำถามที่พบบ่อย",
    link: "/faq",
    icon: <ZoomQuestion size={14} />,
  },
];

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
    link: "/review",
    icon: <MoodSuprised size={14} />,
  },
  {
    name: "Q&A ถามตอบ",
    link: "/qanda",
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
    name: "รีวิวอนิเมะ",
    path: "/review",
  },
  {
    name: "Q&A ถามตอบ",
    path: "/qanda",
  },
];
