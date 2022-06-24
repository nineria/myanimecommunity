import {
  Avatar,
  Badge,
  Button,
  Divider,
  Group,
  Image,
  Stack,
  Tabs,
  Text,
  Textarea,
  ThemeIcon,
} from "@mantine/core";
import { data } from "autoprefixer";
import React from "react";
import { CalendarMinus, Eye, Markdown, ThumbUp } from "tabler-icons-react";

export default function Comment({ data }) {
  return (
    <div className="bg-foreground rounded-sm">
      {/* Left menu */}
      <div className="flex flex-row ">
        <LeftMenu data={data} />
        <div className="px-[0.5px] bg-white opacity-50"></div>
        <MainPost data={data} />
      </div>
      {/* <BottomComponent /> */}
    </div>
  );
}

function LeftMenu({ data }) {
  return (
    <div className="px-2 py-4 mt-2">
      <div className="flex flex-col items-center w-[150px] ">
        <Avatar
          radius="100px"
          size="100px"
          src={data.photoURL}
          alt={data.username}
        />
        <Text color="red">{data.username}</Text>
        <p className="text-title text-xs">Admin</p>
      </div>
      <div className="flex flex-col mt-4 text-title text-opacity-80">
        <div className="flex flex-row items-center text-sm gap-2">
          <CalendarMinus size={14} />
          <p>: 15 เมษายน 2018</p>
        </div>
        <div className="flex flex-row items-center text-sm gap-2">
          <ThumbUp size={14} />
          <p>: 15</p>
        </div>
      </div>
      {/* Ranks */}
      {/* <div className="flex flex-col gap-1 mt-4">
        {data.rank.map((item, index) => (
          <Badge
            radius="sm"
            variant="filled"
            color={item.color}
            rightSection={item.icon}
            key={index}
          >
            {item.name}
          </Badge>
        ))}
      </div> */}
    </div>
  );
}

// function BottomComponent() {
//   return (
//     <div className="p-2 text-title">
//       {/* <div className="flex flex-row gap-4">
//         <div className="bg-background px-4 py-1 ml-2 rounded-t-sm">เขียน</div>
//         <div>ตัวอย่าง</div>
//       </div>
//       <div className="bg-background rounded-sm p-2">Whtie comment</div> */}
//       <Tabs variant="outline">
//         <Tabs.Tab label="เขียน">
//           <Textarea minRows={1} placeholder="เขียนความคิดเห็น…" />
//           <div className="flex flex-row justify-between mt-2">
//             <div className="flex flex-row gap-1 items-center ">
//               <Markdown size={16} />
//               <Text size="xs">รองรับการเขียนด้วย Markdown</Text>
//             </div>
//             <button className="bg-content px-2 rounded-sm hover:opacity-75">
//               โพสต์
//             </button>
//           </div>
//         </Tabs.Tab>
//         <Tabs.Tab label="ตัวอย่าง">Second tab content</Tabs.Tab>
//       </Tabs>
//     </div>
//   );
// }

function MainPost({ data }) {
  return (
    <div className="relative px-2 py-2 text-title text-opacity-90">
      <p className="text-xs opacity-80 mb-2">แกไขล่าสุด : 1 พฤภาคม 2022</p>
      <h1 className="text-lg mt-4 font-bold">{data?.header}</h1>
      <p className="text-base">{data?.body}</p>
      <p className="absolute bottom-2 right-2 leading-none font-bold uppercase opacity-5 text-[8vw] text-right tracking-tighter">
        Answer
      </p>

      {/* <p className="absolute bottom-4 text-xs">
        <div className="flex items-center text-content gap-1 mb-2 border-[1px] border-title border-opacity-10 p-1 rounded-sm">
          <ThemeIcon radius="md" size="xs" color="gray">
            <ThumbUp />
          </ThemeIcon>
          {data?.userLike.map((item, index) => (
            <span
              key={index}
              className="hover:opacity-75 hover:underline cursor-pointer"
            >
              {item},
            </span>
          ))}
        </div>
        อ้างอิง / แหล่งที่มา :{" "}
        <a className="text-content hover:underline">{data?.credit}</a>
      </p> */}
    </div>
  );
}
