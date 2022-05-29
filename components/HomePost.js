import React, { useState } from "react";
import { ChevronUp, Messages } from "tabler-icons-react";
import Link from "next/link";

export default function HomePost(props) {
  const [toggle, setTogle] = useState(true);

  return (
    <div className="rounded-sm bg-[#242629] w-full ">
      <h2
        className={`flex flex-row justify-between items-center bg-[#ec5555] py-1 px-3 font-bold text-md text-white ${
          toggle === true ? "rounded-t-sm" : "rounded-sm"
        }`}
      >
        {props.children[0]}
        <div onClick={() => setTogle(!toggle)}>
          <ChevronUp
            size={22}
            className={`${
              toggle === false ? "rotate-180" : ""
            } cursor-pointer transition-all`}
          />
        </div>
      </h2>
      <div className="flex flex-col bg-[#aaa] gap-[1px]">
        {toggle === true ? props.children.slice(1) : null}
      </div>
    </div>
  );
}

export function Title(props) {
  return (
    <Link href={props.link}>
      <a>
        <span className="cursor-pointer hover:underline">{props.children}</span>
      </a>
    </Link>
  );
}

export function Body(props) {
  return (
    <div
      className={`flex lg:flex-row flex-col lg:justify-between lg:items-center px-3 py-2 text-[#ec5555] bg-[#242629]`}
    >
      <div className="flex gap-2">
        <Messages size={45} />
        <div
          className={`${
            props.children[1] ? "flex  flex-col" : "flex items-center"
          }`}
        >
          {props.children}
        </div>
      </div>
      <div className="flex flex-row gap-4 text-white">
        <div className="flex lg:flex-col lg:items-center items-end gap-1">
          <div>25</div>
          <div className="text-sm text-[#aaa]">โพสต์</div>
        </div>
        <div className="lg:border-r-[1px] lg:border-[#aaa]" />
        <div className="flex lg:flex-col lg:items-center items-end gap-1">
          <div>3.6K</div>
          <div className="text-sm text-[#aaa]">ข้อความ</div>
        </div>
        <div className="flex lg:flex-col lg:items-center items-end gap-1">
          <div>แก้ไขล่าสุด</div>
          <div className="text-sm text-[#aaa]">28/5/2565 - Admin</div>
        </div>
      </div>
    </div>
  );
}

export function Header(props) {
  return (
    <div className="flex flex-row justify-start gap-2 items-center ">
      <Link href={props.link}>
        <a className="truncate text-white cursor-pointer hover:underline w-fit">
          {props.children}
        </a>
      </Link>
      <Badged text="ใหม่" />
    </div>
  );
}

export function Content(props) {
  return (
    <p className="truncate w-full text-[#aaa] text-xs">{props.children}</p>
  );
}

function Badged({ text }) {
  return (
    <div className="px-1 bg-[#ec5555] w-fit h-fit rounded-sm text-white text-xs">
      {text}
    </div>
  );
}
